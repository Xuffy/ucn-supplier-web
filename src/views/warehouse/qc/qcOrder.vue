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
                                    autosize
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
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>


        <div class="title" style="display: inline">
            {{$i.warehouse.payment}}
        </div>

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
                        <template slot-scope="scope">{{ scope.row[v.key] }}</template>
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
                        <template slot-scope="scope">{{ scope.row[v.key] }}</template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane :label="$i.warehouse.applyReturn">
                <el-button type="primary">{{$i.warehouse.acceptReturn}}</el-button>
            </el-tab-pane>
        </el-tabs>




        <div class="title" style="margin-top: 50px">
            {{$i.warehouse.summary}}
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




    </div>
</template>

<script>

    import {VTimeZone,VTable} from '@/components/index'

    export default {
        name: "qcOrder",
        components:{
            VTable,
            VTimeZone
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
                summaryData:{
                    cartonOfProducts:0,
                    grossWeightOfProducts:0,
                    volumeOfProducts:0,
                    netWeightOfProducts:0,
                    quantityOfProducts:0,
                },

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
                 * 弹出框data
                 * */
                checkAll:true,
                isIndeterminate: false,
                totalCheckList:['innerCartonLength','innerCartonWidth','innerCartonHeight','innerCartonNetWeight','innerCartonGrossWeight','innerCartonVolume','outerCartonLength','outerCartonWidth','outerCartonHeight','outerCartonNetWeight','outerCartonGrossWeight','outerCartonVolume'],
            }
        },
        methods:{
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
                this.$ajax.post(this.$apis.get_qcOrderProductData,this.tableConfig)
                    .then(res=>{
                        this.productTable=res.datas;
                        this.tableConfig.skuInventoryStatusDictCode='APPLY_FOR_REWORK';
                        this.$ajax.post(this.$apis.get_qcOrderProductData,this.tableConfig).then(res=>{
                            this.productTable1=res.datas;
                            this.tableConfig.skuInventoryStatusDictCode='APPLY_FOR_RETURN';
                            this.$ajax.post(this.$apis.get_qcOrderProductData,this.tableConfig).then(res=>{
                                this.productTable2=res.datas;
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

            checkboxInit(row,index){
                if(row.skuQcResultDictCode === 'WAIT_FOR_QC'){
                    return 0;
                }else{
                    return 1;
                }
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

            },
            //接受验货结果
            accept(){
                if(this.selectFirst.length===0){
                    this.$message({
                        message: '请选择产品',
                        type: 'warning'
                    });
                }else{
                    this.dialogFormVisible=true;
                }
            },
            //接受返工
            acceptRework(){
                console.log(this.selectSecond)
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
            this.$ajax.post(this.$apis.get_partUnit,['QC_MD','QC_TYPE'],{cache:true}).then(res=>{
                res.forEach(v=>{
                    if(v.code==='QC_MD'){
                        this.qcMethodOption=v.codes;
                    }else if(v.code==='QC_TYPE'){
                        this.qcTypeOption=v.codes;
                    }
                });
                this.getData();
                this.getTableData();
            });
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
</style>
