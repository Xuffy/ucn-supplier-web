<template>
    <div class="inbound-detail" v-loading="loadingTable">
        <div class="title">
            {{$i.warehouse.basicInfo}}
        </div>
        <el-form :modal="qcOrderData" ref="basicInfo" class="speForm" label-width="200px" :label-position="labelPosition">
            <el-row>
                <el-col class="speCol" v-for="v in $db.warehouse.qcOrder" :key="v.key" :xs="24" :sm="v.fullLine?24:8" :md="v.fullLine?24:8" :lg="v.fullLine?24:8" :xl="v.fullLine?24:8">
                    <el-form-item :prop="v.key" :label="v.label">
                        <div v-if="v.showType==='input'">
                            <el-input
                                    class="speInput"
                                    size="mini"
                                    :disabled="true"
                                    :placeholder="v.isServiceFill?'服务商填写':''"
                                    v-model="qcOrderData[v.key]"></el-input>
                        </div>
                        <div v-else-if="v.showType==='select'">
                            <div v-if="v.isQcType">
                                <el-select placeholder="服务商选择" :disabled="true" class="speInput" size="mini" v-model="qcOrderData[v.key]">
                                    <el-option
                                            v-for="item in qcTypeOption"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div v-else-if="v.isQcMethod">
                                <el-select placeholder="服务商选择" :disabled="true" class="speInput" size="mini" v-model="qcOrderData[v.key]">
                                    <el-option
                                            v-for="item in qcMethodOption"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div v-else>
                                <el-select placeholder="服务商选择" :disabled="true" class="speInput" size="mini" v-model="qcOrderData[v.key]">
                                    <el-option
                                            v-for="item in options"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>

                        </div>
                        <div v-else-if="v.showType==='textarea'">
                            <el-input
                                    :disabled="true"
                                    class="speInput"
                                    type="textarea"
                                    :autosize="{ minRows: 2}"
                                    v-model="qcOrderData[v.key]">
                            </el-input>
                        </div>
                        <div v-else-if="v.showType==='date'">
                            <el-date-picker
                                    :disabled="true"
                                    class="speInput"
                                    size="mini"
                                    v-model="qcOrderData[v.key]"
                                    align="right"
                                    type="date"
                                    placeholder="服务商填写">
                            </el-date-picker>
                        </div>
                        <div v-else-if="v.showType==='attachment'">
                            <v-upload readonly :limit="20" ref="upload" :list="qcOrderData[v.key]"></v-upload>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <div class="title" style="margin-top: 50px">
            {{$i.warehouse.productInfo}}
        </div>
        <el-tabs type="border-card">
            <el-tab-pane :label="$i.warehouse.qcResult">
                <el-button :disabled="selectFirst.length===0" type="primary" @click="accept">{{$i.warehouse.accept}}</el-button>
                <el-table
                        v-loading="loadingProductTable"
                        class="speTable"
                        :data="productTable"
                        style="width: 100%;margin-top: 10px"
                        border
                        :summary-method="getSummaries"
                        show-summary
                        @selection-change="handleFirstTable">
                    <el-table-column
                            align="center"
                            type="selection"
                            :selectable='checkboxInit'
                            width="55">
                    </el-table-column>
                    <el-table-column
                            v-for="v in $db.warehouse.qcOrderTable"
                            :label="$i.warehouse[v.key]"
                            :key="v.key"
                            :prop="v.key"
                            width="160">
                        <template slot-scope="scope">
                            <div v-if="v.key==='qcPics' && scope.row[v.key]">
                                <v-image :src="scope.row[v.key][0]" height="60px" width="80px"  @click="$refs.pics.show(scope.row[v.key])"></v-image>
                            </div>
                            <div v-else>
                                {{ scope.row[v.key] }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            align="center"
                            :label="$i.warehouse.detail"
                            width="100">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="text" size="small">{{$i.warehouse.detail}}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane :label="$i.warehouse.applyRework">
                <el-button :disabled="selectSecond.length===0" @click="acceptRework" type="primary">{{$i.warehouse.acceptRework}}</el-button>
                <el-table
                        v-loading="loadingProductTable"
                        class="speTable"
                        :data="productTable1"
                        style="width: 100%;margin-top: 10px"
                        border
                        @selection-change="handleSecondTable">
                    <el-table-column
                            align="center"
                            type="selection"
                            :selectable='checkboxInit'
                            width="55">
                    </el-table-column>
                    <el-table-column
                            v-for="v in $db.warehouse.qcOrderTable"
                            :label="$i.warehouse[v.key]"
                            :key="v.key"
                            :prop="v.key"
                            width="160">
                        <template slot-scope="scope">
                          <div v-if="v.key==='qcPics' && scope.row[v.key]">
                                <v-image :src="scope.row[v.key][0]" height="60px" width="80px"  @click="$refs.pics.show(scope.row[v.key])"></v-image>
                            </div>
                            <div v-else>
                                {{ scope.row[v.key] }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            align="center"
                            :label="$i.warehouse.detail"
                            width="100">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="text" size="small">{{$i.warehouse.detail}}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane :label="$i.warehouse.applyReturn">
                <el-button :disabled="selectThird.length===0" @click="acceptReturn" type="primary">{{$i.warehouse.acceptReturn}}</el-button>
                <el-table
                        v-loading="loadingProductTable"
                        class="speTable"
                        :data="productTable2"
                        style="width: 100%;margin-top: 10px"
                        border
                        @selection-change="handleThirdTable">
                    <el-table-column
                            align="center"
                            type="selection"
                            :selectable='checkboxInit'
                            width="55">
                    </el-table-column>
                    <el-table-column
                            v-for="v in $db.warehouse.qcOrderTable"
                            :label="$i.warehouse[v.key]"
                            :key="v.key"
                            :prop="v.key"
                            width="160">
                        <template slot-scope="scope">
                            <div v-if="v.key==='qcPics' && scope.row[v.key]">
                                <v-image :src="scope.row[v.key][0]" height="60px" width="80px"  @click="$refs.pics.show(scope.row[v.key])"></v-image>
                            </div>
                            <div v-else>
                                {{ scope.row[v.key] }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            align="center"
                            :label="$i.warehouse.detail"
                            width="100">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="text" size="small">{{$i.warehouse.detail}}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>


        <div class="summary">
            <div class="second-title">
                {{$i.warehouse.summary}}
            </div>
            <el-form label-width="280px">
                <el-row class="speZone">
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item :label="$i.warehouse.cartonOfQualifiedProducts">
                            <el-input
                                    class="summaryInput"
                                    size="mini"
                                    v-model="qcOrderData.qualifiedSkuCartonTotalQty"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item :label="$i.warehouse.quantityOfQualifiedProducts">
                            <el-input
                                    class="summaryInput"
                                    size="mini"
                                    v-model="qcOrderData.qualifiedSkuQty"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item :label="$i.warehouse.volumeOfQualifiedProducts">
                            <el-input
                                    class="summaryInput"
                                    size="mini"
                                    v-model="qcOrderData.qualifiedSkuVolume"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item :label="$i.warehouse.netWeightOfQualifiedProducts">
                            <el-input
                                    class="summaryInput"
                                    size="mini"
                                    v-model="qcOrderData.qualifiedSkuNetWeight"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item :label="$i.warehouse.grossWeightOfQualifiedProducts">
                            <el-input
                                    class="summaryInput"
                                    size="mini"
                                    v-model="qcOrderData.qualifiedSkuGrossWeight"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item :label="$i.warehouse.quantityOfSubQualityProducts">
                            <el-input
                                    class="summaryInput"
                                    size="mini"
                                    v-model="qcOrderData.unqualifiedSkuQty"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item :label="$i.warehouse.cartonOfSubQualityProducts">
                            <el-input
                                    class="summaryInput"
                                    size="mini"
                                    v-model="qcOrderData.unqualifiedSkuCartonTotalQty"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item :label="$i.warehouse.netWeightOfSubQualityProducts">
                            <el-input
                                    class="summaryInput"
                                    size="mini"
                                    v-model="qcOrderData.unqualifiedSkuNetWeight"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item :label="$i.warehouse.volumeOfSubQualityProducts">
                            <el-input
                                    class="summaryInput"
                                    size="mini"
                                    v-model="qcOrderData.unqualifiedSkuVolume"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item :label="$i.warehouse.grossWeightOfSubQualityProducts">
                            <el-input
                                    class="summaryInput"
                                    size="mini"
                                    v-model="qcOrderData.unqualifiedSkuGrossWeight"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item :label="$i.warehouse.skuQuantity">
                            <el-input
                                    class="summaryInput"
                                    size="mini"
                                    v-model="summaryData.skuQuantity"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>


        <div class="footBtn">
            <el-button :disabled="loadingTable" type="danger" @click="cancel">{{$i.warehouse.exit}}</el-button>
        </div>



        <el-dialog width="40%" title="将QC数据更新到产品库" :visible.sync="dialogFormVisible">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAll">全选</el-checkbox>
            <el-checkbox-group v-model="acceptConfig.fields" @change="handleCheckedCitiesChange">
                <el-row>
                    <el-col :span="6"><el-checkbox label="innerCartonLength">中包长</el-checkbox></el-col>
                    <el-col :span="6"><el-checkbox label="innerCartonWidth">中包宽</el-checkbox></el-col>
                    <el-col :span="6"><el-checkbox label="innerCartonHeight">中包高</el-checkbox></el-col>
                    <el-col :span="6"><el-checkbox label="innerCartonNetWeight">中包净重</el-checkbox></el-col>
                    <el-col :span="6"><el-checkbox label="innerCartonGrossWeight">中包毛重</el-checkbox></el-col>
                    <el-col :span="6"><el-checkbox label="innerCartonVolume">中包体积</el-checkbox></el-col>
                    <el-col :span="6"><el-checkbox label="outerCartonLength">外箱长度</el-checkbox></el-col>
                    <el-col :span="6"><el-checkbox label="outerCartonWidth">外箱宽度</el-checkbox></el-col>
                    <el-col :span="6"><el-checkbox label="outerCartonHeight">外箱高度</el-checkbox></el-col>
                    <el-col :span="6"><el-checkbox label="outerCartonNetWeight">外箱净重</el-checkbox></el-col>
                    <el-col :span="6"><el-checkbox label="outerCartonGrossWeight">外箱毛重</el-checkbox></el-col>
                    <el-col :span="6"><el-checkbox label="outerCartonVolume">外箱体积</el-checkbox></el-col>
                </el-row>
            </el-checkbox-group>
            <div slot="footer" class="dialog-footer">
                <el-button :loading="disableClickSave" type="primary" @click="saveAccept">保存</el-button>
                <el-button @click="dialogFormVisible = false">关闭</el-button>
            </div>
        </el-dialog>


        <v-message-board module="warehouse" code="qcDetail" :id="$route.query.id"></v-message-board>

        <v-view-picture ref="pics"></v-view-picture>



    </div>
</template>

<script>

    import {VTimeZone,VTable,VMessageBoard,VUpload,VImage,VViewPicture} from '@/components/index'
    import {mapActions} from 'vuex'

    export default {
        name: "qcOrder",
        components:{
            VTable,
            VTimeZone,
            VMessageBoard,
            VUpload,
            VImage,
            VViewPicture
        },
        data(){
            return{
                checkList:[],
                /**
                 * 页面基础配置
                 * */
                options:[],
                loadingTable:false,
                dialogFormVisible:false,
                disableClickSave:false,
                loadingProductTable:false,
                labelPosition:'right',
                qcOrderData:{},
                qcTypeOption:[],
                qcMethodOption:[],

                /**
                 * productTable配置
                 * */
                loadProductTable:false,
                tableConfig:{
                    pn: 1,
                    ps: 100,
                    qcOrderId: this.$route.query.id,
                    skuInventoryStatusDictCode: "",

                    // "sorts": [
                    //     {
                    //         "orderBy": "string",
                    //         "orderType": "string",
                    //     }
                    // ],
                },
                productTable:[],
                productTable1:[],
                productTable2:[],
                selectFirst:[],
                selectSecond:[],
                selectThird:[],
                acceptConfig:{
                    fields: ['innerCartonLength','innerCartonWidth','innerCartonHeight','innerCartonNetWeight','innerCartonGrossWeight','innerCartonVolume','outerCartonLength','outerCartonWidth','outerCartonHeight','outerCartonNetWeight','outerCartonGrossWeight','outerCartonVolume'],
                    qcOrderDetailIds: [],
                },

                /**
                 * payment data
                 * */
                paymentData:[],


                /**
                 * summary Data
                 * */
                summaryData:{
                    skuQuantity:0
                },


                /**
                 * 弹出框data
                 * */
                checkAll:true,
                isIndeterminate: false,
                totalCheckList:['innerCartonLength','innerCartonWidth','innerCartonHeight','innerCartonNetWeight','innerCartonGrossWeight','innerCartonVolume','outerCartonLength','outerCartonWidth','outerCartonHeight','outerCartonNetWeight','outerCartonGrossWeight','outerCartonVolume'],

                /**
                 * 字典数据
                 * */
                skuUnitOption:[],       //计量单位
                lengthOption:[],
                volumeOption:[],
                weightOption:[],
            }
        },
        methods:{
            ...mapActions(['setLog']),
            getData(){
                this.$ajax.get(`${this.$apis.get_qcOrderDetail}?id=${this.$route.query.id}`).then(res=>{
                    this.qcOrderData=res;
                    this.loadingTable=false;
                }).catch(err=>{
                    this.loadingTable=false;
                });
            },
            getTableData(){
                this.loadingProductTable=true;
                this.tableConfig.skuInventoryStatusDictCode='';
                this.$ajax.post(this.$apis.get_qcOrderProductData,this.tableConfig)
                    .then(res=>{
                        console.log(res.datas,'????')
                        this.productTable=res.datas;
                        let diffData=[];
                        _.map(this.productTable,v=>{
                            diffData.push(v.skuId+v.orderNo);
                            v.deliveryDate=this.$dateFormat(v.deliveryDate,'yyyy-mm-dd');
                            v.skuUnitDictCode=_.findWhere(this.skuUnitOption,{code:v.skuUnitDictCode}).name;
                            v.volumeUnitDictCode=_.findWhere(this.volumeOption,{code:v.volumeUnitDictCode}).name;
                            v.weightUnitDictCode=_.findWhere(this.weightOption,{code:v.weightUnitDictCode}).name;
                            v.lengthUnitDictCode=_.findWhere(this.lengthOption,{code:v.lengthUnitDictCode}).name;
                        });
                        this.summaryData.skuQuantity=_.uniq(diffData).length;
                        this.tableConfig.skuInventoryStatusDictCode='APPLY_FOR_REWORK';
                        this.$ajax.post(this.$apis.get_qcOrderProductData,this.tableConfig).then(res=>{
                            this.productTable1=res.datas;
                            _.map(this.productTable1,v=>{
                                v.deliveryDate=this.$dateFormat(v.deliveryDate,'yyyy-mm-dd');
                                v.skuUnitDictCode=_.findWhere(this.skuUnitOption,{code:v.skuUnitDictCode}).name;
                                v.volumeUnitDictCode=_.findWhere(this.volumeOption,{code:v.volumeUnitDictCode}).name;
                                v.weightUnitDictCode=_.findWhere(this.weightOption,{code:v.weightUnitDictCode}).name;
                                v.lengthUnitDictCode=_.findWhere(this.lengthOption,{code:v.lengthUnitDictCode}).name;
                            });
                            this.tableConfig.skuInventoryStatusDictCode='APPLY_FOR_RETURN';
                            this.$ajax.post(this.$apis.get_qcOrderProductData,this.tableConfig).then(res=>{
                                this.productTable2=res.datas;
                                _.map(this.productTable2,v=>{
                                    console.log('====',v)
                                    v.deliveryDate=this.$dateFormat(v.deliveryDate,'yyyy-mm-dd');
                                    v.skuUnitDictCode=_.findWhere(this.skuUnitOption,{code:v.skuUnitDictCode}).name;
                                    v.volumeUnitDictCode=_.findWhere(this.volumeOption,{code:v.volumeUnitDictCode}).name;
                                    v.weightUnitDictCode=_.findWhere(this.weightOption,{code:v.weightUnitDictCode}).name;
                                    v.lengthUnitDictCode=_.findWhere(this.lengthOption,{code:v.lengthUnitDictCode}).name;
                                });
                                this.loadingProductTable=false;
                            }).catch(err=>{
                                this.loadingProductTable=false;
                            })
                        }).catch(err=>{
                            this.loadingProductTable=false;
                        })
                    })
                    .catch(err=>{
                        this.loadingProductTable=false;
                    });
            },
            getPaymentData(){
                this.$ajax.post(this.$apis.PAYMENT_LIST,{
                    orderNo:this.qcOrderData.qcOrderNo,
                    orderType:20
                }).then(res=>{
                    console.log(res)
                }).finally(()=>{

                })
            },
            checkboxInit(row,index){
                if(row.skuQcResultDictCode === 'WAIT_FOR_QC'){
                    return 0;
                }else{
                    return 1;
                }
            },
            cancel(){
                window.close();
            },


            /**
             * product table事件
             * */
            handleFirstTable(e){
                this.selectFirst=e;
            },
            handleSecondTable(e){
                this.selectSecond=e;
            },
            handleThirdTable(e){
                this.selectThird=e;
            },
            //接受验货结果
            accept(){
                this.dialogFormVisible=true;
            },
            //接受返工
            acceptRework(){
                let ids=[];
                _.map(this.selectSecond,v=>{
                    ids.push(v.id);
                });
                this.$ajax.post(this.$apis.REWORK_HANDLE,{
                    accept: true,
                    qcOrderDetailIds: ids,
                }).then(res=>{
                    this.getTableData();
                    this.$message({
                        type: 'success',
                        message: this.$i.warehouse.reworkSuccess
                    });
                }).finally(()=>{

                });
            },
            //接受退货
            acceptReturn(){
                this.$confirm(this.$i.warehouse.sureReturn, this.$i.warehouse.prompt, {
                    confirmButtonText: this.$i.warehouse.sure,
                    cancelButtonText: this.$i.warehouse.cancel,
                    type: 'warning'
                }).then(() => {
                    let ids=[];
                    _.map(this.selectThird,v=>{
                        ids.push(v.id);
                    });
                    this.$ajax.post(this.$apis.RETURN_HANDLE,ids)
                      .then(res=>{
                        this.getTableData();
                        this.$message({
                            type: 'success',
                            message: this.$i.warehouse.returnSuccess
                        });
                    }).finally(()=>{

                    })




                }).catch(() => {

                });




            },
            handleClick(data){
                this.$windowOpen({
                    url:'/product/detail',
                    params:{
                        id:data.skuId
                    }
                });
            },
            getSummaries(param) {
                const { columns, data } = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = this.$i.warehouse.totalMoney;
                        return;
                    }else if(index===17 || index===18 || index===21 || index===44 || index===45 || index===46 || index===47 || index===48 || index===49 || index===50 || index===51 || index===52 || index===53 || index===54 || index===67){
                        const values = data.map(item => Number(item[column.property]));
                        if (!values.every(value => isNaN(value))) {
                            sums[index] = values.reduce((prev, curr) => {
                                const value = Number(curr);
                                if (!isNaN(value)) {
                                    return prev + curr;
                                } else {
                                    return prev;
                                }
                            }, 0);
                        } else {

                        }
                    }

                });

                return sums;
            },

            /**
             * 弹出框事件
             * */
            handleCheckAll(val){
                this.acceptConfig.fields=val?this.totalCheckList:[];
                this.isIndeterminate=false;
            },
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.totalCheckList.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.totalCheckList.length;
            },
            saveAccept(){
                this.selectFirst.forEach(v=>{
                    this.acceptConfig.qcOrderDetailIds.push(v.id);
                });
                this.disableClickSave=true;
                this.$ajax.post(this.$apis.accept_qcResult,this.acceptConfig).then(res=>{
                    this.disableClickSave=false;
                    this.dialogFormVisible=false;
                    this.$message({
                        message: '保存成功',
                        type: 'success'
                    });
                    this.getTableData();
                }).catch(err=>{
                    this.disableClickSave=false;
                    this.dialogFormVisible=false;
                });
            },

            /**
             * 获取字典
             * */
            // getUnit(){
            //     this.$ajax.post(this.$apis.get_partUnit,['IBD_TYPE'],{cache:true}).then(res=>{
            //         this.inboundTypeOption=res[0].codes;
            //     });
            //     // this.$ajax.get(this.$apis.get_allUnit,).then(res=>{
            //     //     console.log(res)
            //     // });
            // },
        },
        created(){
            this.loadingTable=true;
            this.$ajax.post(this.$apis.get_partUnit,['QC_MD','QC_TYPE','SKU_UNIT','LH_UNIT','VE_UNIT','WT_UNIT'],{cache:true}).then(res=>{
                res.forEach(v=>{
                    if(v.code==='QC_MD'){
                        this.qcMethodOption=v.codes;
                    }else if(v.code==='QC_TYPE'){
                        this.qcTypeOption=v.codes;
                    }else if(v.code==='SKU_UNIT'){
                        this.skuUnitOption=v.codes;
                    }else if(v.code==='LH_UNIT'){
                        this.lengthOption=v.codes;
                    }else if(v.code==='VE_UNIT'){
                        this.volumeOption=v.codes;
                    }else if(v.code==='WT_UNIT'){
                        this.weightOption=v.codes;
                    }
                });
                this.getData();
                this.getTableData();
            });
        },
        mounted(){
            this.setLog({query: {code: 'WAREHOUSE'}});
        },
        watch:{
            dialogFormVisible(n){
                if(n){
                    this.isIndeterminate=false;
                    this.checkAll=true;
                    this.acceptConfig.fields=['innerCartonLength','innerCartonWidth','innerCartonHeight','innerCartonNetWeight','innerCartonGrossWeight','innerCartonVolume','outerCartonLength','outerCartonWidth','outerCartonHeight','outerCartonNetWeight','outerCartonGrossWeight','outerCartonVolume'];
                }
            }
        },
    }
</script>

<style scoped>
    .title{
        font-weight: bold;
        font-size: 16px;
        height: 32px;
        line-height: 32px;
        color:#666666;
    }
    .second-title{
        font-weight: bold;
        font-size: 16px;
        color: #666666;
        padding: 10px 0;
    }

    .speInput{
        width: 80%;
        max-width: 1000px !important;
    }
    .speInput >>> .el-select{
        display: block;
    }
    .dialog-footer{
        text-align: center;
    }
    .speTable >>> .el-checkbox{
        margin-right: 0;
    }
    .footBtn{
        border-top: 1px solid #e0e0e0;
        height: 40px;
        line-height: 40px;
        background-color: #ffffff;
        position: sticky;
        left: 0;
        bottom: 0;
        width: 100%;
        z-index:1000;
    }
</style>
