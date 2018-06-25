<template>
    <div class="qc-detail" v-loading="loadingData">
        <div class="title">
            <span>{{$i.warehouse.qcOrderDetail}}</span>
        </div>
        <div class="second-title">
            {{$i.warehouse.basicInfo}}
        </div>
        <div>
            <el-form label-width="190px">
                <el-row class="speZone">
                    <el-col v-for="(v,k) in $db.warehouse.qcOrderDetailBasicInfo" :key="v.key" class="speCol" :xs="24" :sm="v.fullLine?24:12" :md="v.fullLine?24:12" :lg="v.fullLine?24:8" :xl="v.fullLine?24:8">
                        <el-form-item :label="$i.warehouse[v.key]">
                            <div v-if="v.type==='input'">
                                <el-input
                                        class="speInput"
                                        v-model="qcDetail[v.key]"
                                        :disabled="v.disabled">
                                </el-input>
                            </div>
                            <div v-else-if="v.type==='select'">
                                <el-select
                                        class="speInput"
                                        v-model="qcDetail[v.key]"
                                        clearable
                                        :disabled="v.disabled"
                                        :placeholder="$i.warehouse.pleaseChoose">
                                    <div v-if="v.isQcType">
                                        <el-option
                                                v-for="item in qcTypeOption"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.code">
                                        </el-option>
                                    </div>
                                    <div v-else-if="v.isQcStatus">
                                        <el-option
                                                v-for="item in qcStatusOption"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.code">
                                        </el-option>
                                    </div>
                                    <div v-else-if="v.isQcMethod">
                                        <el-option
                                                v-for="item in qcMethodOption"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.code">
                                        </el-option>
                                    </div>
                                    <div v-else-if="v.isSurveyor">
                                        <el-option
                                                v-for="item in surveyorOption"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.code">
                                        </el-option>
                                    </div>
                                    <div v-else-if="v.isServiceName">
                                        <el-option
                                                v-for="item in serviceList"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.name">
                                        </el-option>
                                    </div>
                                    <div v-else-if="v.isCurrency">
                                        <el-option
                                                v-for="item in currencyOptions"
                                                :key="item.id"
                                                :label="item.code"
                                                :value="item.code">
                                        </el-option>
                                    </div>

                                </el-select>
                            </div>
                            <div v-else-if="v.type==='date'">
                                <el-date-picker
                                        class="speInput"
                                        v-model="qcDetail[v.key]"
                                        align="right"
                                        type="date"
                                        :placeholder="$i.warehouse.pleaseChoose"
                                        :picker-options="pickerOptions1">
                                </el-date-picker>
                            </div>
                            <div v-else-if="v.type==='number'">
                                <el-input-number
                                        :controls="false"
                                        v-model="qcDetail[v.key]"
                                        :disabled="v.disabled"
                                        class="speInput speNumber"></el-input-number>
                            </div>
                            <div v-else-if="v.type==='textarea'">
                                <el-input
                                        :disabled="v.disabled"
                                        type="textarea"
                                        :autosize="{ minRows: 2}"
                                        :placeholder="$i.warehouse.pleaseInput"
                                        v-model="qcDetail[v.key]">
                                </el-input>
                            </div>
                            <div v-else-if="v.type==='attachment'">
                                <v-upload readonly :limit="20" ref="upload" :list="qcDetail[v.key]"></v-upload>
                            </div>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>

        <!--<div class="second-title">-->
            <!--{{$i.warehouse.payment}}-->
        <!--</div>-->
        <!--<div class="payment-table">-->
            <!--<el-button class="payment-btn" type="primary">{{$i.warehouse.pressMoney}}</el-button>-->
            <!--<el-table-->
                    <!--:data="tableData"-->
                    <!--border-->
                    <!--style="width: 100%">-->
                <!--<el-table-column-->
                        <!--label="No."-->
                        <!--align="center"-->
                        <!--width="60">-->
                    <!--<template slot-scope="scope">-->
                        <!--{{scope.$index+1}}-->
                    <!--</template>-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                        <!--prop="date"-->
                        <!--label="Payment Number"-->
                        <!--width="180">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                        <!--prop="name"-->
                        <!--label="Payment Item"-->
                        <!--width="180">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                        <!--prop="address"-->
                        <!--label="Est. Pay Date">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                        <!--prop="address"-->
                        <!--label="Act. Pay Date">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                        <!--prop="address"-->
                        <!--label="Est. Amount">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                        <!--prop="address"-->
                        <!--label="Act. Amount">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                        <!--prop="address"-->
                        <!--label="Currency">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                        <!--prop="address"-->
                        <!--label="Available">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                        <!--fixed="right"-->
                        <!--label="Action"-->
                        <!--width="100">-->
                    <!--<template slot-scope="scope">-->
                        <!--<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>-->
                        <!--<el-button type="text" size="small">编辑</el-button>-->
                    <!--</template>-->
                <!--</el-table-column>-->
            <!--</el-table>-->
        <!--</div>-->

        <div class="product-info">
            <div class="second-title">
                {{$i.warehouse.productInfo}}
            </div>
            <el-table
                    class="product-table"
                    v-loading="loadingProductInfoTable"
                    :data="productInfoData"
                    height="300"
                    :summary-method="getSummaries"
                    show-summary
                    border
                    style="width: 100%">
                <el-table-column
                        align="center"
                        fixed="left"
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        v-for="v in $db.warehouse.qcDetailProductInfo"
                        v-if="!v._hide"
                        :prop="v.key"
                        align="center"
                        :key="v.value"
                        :label="$i.warehouse[v.key]"
                        width="180">
                    <template slot-scope="scope">
                        <div v-if="v.showType==='select'">
                            <div v-if="v.isQcResult">
                                <el-select clearable v-model="scope.row[v.key]" :placeholder="$i.warehouse.pleaseChoose">
                                    <el-option
                                            v-for="item in qcResultOption"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.code">
                                    </el-option>
                                </el-select>
                            </div>
                            <div v-else-if="v.isBarCodeResult">
                                <el-select clearable v-model="scope.row[v.key]" :placeholder="$i.warehouse.pleaseChoose">
                                    <el-option
                                            v-for="item in barCodeResult"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div v-else>

                            </div>
                        </div>
                        <div v-else-if="v.showType==='number'">
                            <el-input-number
                                    :controls="false"
                                    v-model="scope.row[v.key]"></el-input-number>
                        </div>
                        <div v-else-if="v.showType==='input'">
                            <el-input
                                    :placeholder="$i.warehouse.pleaseInput"
                                    v-model="scope.row[v.key]"
                                    clearable>
                            </el-input>
                        </div>
                        <div v-else-if="v.showType==='attachment'">
                            <v-upload :limit="20" :onlyImage="true" :ref="'pictureUpload'+scope.$index"></v-upload>
                        </div>
                        <div v-else>
                            {{scope.row[v.key]}}
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
        </div>


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
                                    v-model="qcDetail.qualifiedSkuCartonTotalQty"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item :label="$i.warehouse.quantityOfQualifiedProducts">
                            <el-input
                                    class="summaryInput"
                                    size="mini"
                                    v-model="qcDetail.qualifiedSkuQty"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item :label="$i.warehouse.volumeOfQualifiedProducts">
                            <el-input
                                    class="summaryInput"
                                    size="mini"
                                    v-model="qcDetail.qualifiedSkuVolume"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item :label="$i.warehouse.netWeightOfQualifiedProducts">
                            <el-input
                                    class="summaryInput"
                                    size="mini"
                                    v-model="qcDetail.qualifiedSkuNetWeight"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item :label="$i.warehouse.grossWeightOfQualifiedProducts">
                            <el-input
                                    class="summaryInput"
                                    size="mini"
                                    v-model="qcDetail.qualifiedSkuGrossWeight"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item :label="$i.warehouse.quantityOfSubQualityProducts">
                            <el-input
                                    class="summaryInput"
                                    size="mini"
                                    v-model="qcDetail.unqualifiedSkuQty"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item :label="$i.warehouse.cartonOfSubQualityProducts">
                            <el-input
                                    class="summaryInput"
                                    size="mini"
                                    v-model="qcDetail.unqualifiedSkuCartonTotalQty"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item :label="$i.warehouse.netWeightOfSubQualityProducts">
                            <el-input
                                    class="summaryInput"
                                    size="mini"
                                    v-model="qcDetail.unqualifiedSkuNetWeight"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item :label="$i.warehouse.volumeOfSubQualityProducts">
                            <el-input
                                    class="summaryInput"
                                    size="mini"
                                    v-model="qcDetail.unqualifiedSkuVolume"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item :label="$i.warehouse.grossWeightOfSubQualityProducts">
                            <el-input
                                    class="summaryInput"
                                    size="mini"
                                    v-model="qcDetail.unqualifiedSkuGrossWeight"
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
            <el-button :disabled="loadingData" :loading="disableClickSubmit" @click="submit" type="primary">{{$i.warehouse.submit}}</el-button>
            <el-button :disabled="loadingData" @click="cancel">{{$i.warehouse.cancel}}</el-button>
        </div>

        <v-message-board module="warehouse" code="qcDetail" :id="$route.query.id"></v-message-board>
    </div>
</template>
<script>

    import {VTable,VMessageBoard,VUpload } from '@/components/index';
    import {mapActions} from 'vuex'

    export default {
        name:'qc-detail',
        components:{
            VTable,
            VMessageBoard,
            VUpload
        },
        data(){
            return{
                options:[],
                qcDetail:{},
                loadingData:false,
                pickerOptions1: {
                    disabledDate(time) {
                        return time.getTime()+3600 * 1000 * 24  < Date.now();
                    },
                },
                disableClickSubmit:false,
                /**
                 * 字典数据
                 * */
                qcTypeOption:[],
                qcMethodOption:[],
                surveyorOption:[],
                qcResultOption:[],
                barCodeResult:[],
                qcStatusOption:[],
                currencyOptions:[],

                /**
                 * paymentTable data
                 * */
                tableData: [
                    {
                        date: '2016-05-02',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }
                ],

                /**
                 * summary Data
                 * */
                summaryData:{
                    skuQuantity:0
                },

                /**
                 * product info data
                 * */
                loadingProductInfoTable:false,
                productInfoConfig:{
                    pn: 1,
                    ps: 200,
                    qcOrderId: this.$route.query.id,

                    // sorts: [
                    //     {
                    //         orderBy: "",
                    //         orderType: "",
                    //     }
                    // ],
                },
                productInfoData:[],
                selectList:[],

                /**
                 * qcOrder Config
                 * */
                qcOrderConfig:{
                    qcDate:'',
                    qcMethodDictCode: "",
                    qcOrderId: null,
                    qcOrderNo: "",
                    qcResultDetailParams: [],
                    qcTypeDictCode: "",
                    serviceFee: 0,
                    surveyor: "",
                },

            }
        },
        methods:{
            ...mapActions(['setLog']),
            getQcOrderDetail(){
                this.loadingData=true;
                this.$ajax.get(`${this.$apis.get_sellerOrderDetail}?id=${this.$route.query.id}`)
                    .then(res=>{
                        this.qcDetail=res;
                        this.loadingData=false;
                    }).catch(err=>{
                        this.loadingData=false;
                    }
                );
            },
            getProductInfo(){
                this.loadingProductInfoTable=true;
                this.$ajax.post(this.$apis.get_sellerQcOrderProduct,this.productInfoConfig).then(res=>{
                    this.productInfoData = res.datas;
                    this.productInfoData.forEach(v=>{
                        v.skuQcResultDictCode='';
                    });
                    let diffData=[];
                    _.map(this.productInfoData,v=>{
                        diffData.push(v.skuId+v.orderNo);
                    });
                    this.summaryData.skuQuantity=_.uniq(diffData).length;
                    this.loadingProductInfoTable=false;
                }).catch(err=>{
                    this.loadingProductInfoTable=false;
                });
            },

            /**
             * product info表格事件
             * */
            btnClick(e){
                console.log(e)
            },
            changeChecked(e){
                this.selectList=e;
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
                    }else if(index===17 || index===18 || index===21 || index===44 || index===45 || index===46 || index===47 || index===48 || index===49 || index===50 || index===51 || index===52 || index===53 || index===54 || index===68){
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

            submit(){
                this.qcOrderConfig.qcDate=this.qcDetail.qcDate;
                this.qcOrderConfig.qcMethodDictCode=this.qcDetail.qcMethodDictCode;
                this.qcOrderConfig.qcOrderId=this.$route.query.id;
                this.qcOrderConfig.qcOrderNo=this.qcDetail.qcOrderNo;
                this.qcOrderConfig.qcTypeDictCode=this.qcDetail.qcTypeDictCode;
                this.qcOrderConfig.surveyor=this.qcDetail.surveyor;
                this.qcOrderConfig.serviceFee=this.qcDetail.serviceFee;
                let allow=true;
                this.productInfoData.forEach(v=>{
                    if(v.actOuterCartonSkuQty || v.actOuterCartonInnerBoxQty || v.actInnerCartonSkuQty || v.innerCartonLength || v.innerCartonWidth || v.innerCartonHeight || v.innerCartonNetWeight || v.innerCartonGrossWeight || v.innerCartonVolume || v.outerCartonLength || v.outerCartonWidth || v.outerCartonHeight || v.outerCartonNetWeight || v.outerCartonGrossWeight || v.qualifiedSkuCartonTotalQty || v.unqualifiedSkuCartonTotalQty || v.unqualifiedType || v.skuBarCodeResultDictCode || v.skuLabelResultDictCode || v.innerPackingBarCodeResultDictCode || v.outerCartonBarCodeResultDictCode || v.shippingMarkResultDictCode || v.remarks){
                        if(!v.skuQcResultDictCode){
                            allow=false;
                        }
                    }
                });
                if(!allow){
                    return this.$message({
                        message: this.$i.warehouse.mustHaveQcResult,
                        type: 'warning'
                    });
                }
                this.qcOrderConfig.qcResultDetailParams=[];
                this.productInfoData.forEach(v=>{
                    let skuQcResultDictCode;
                    if(v.skuQcResultDictCode){
                        skuQcResultDictCode=v.skuQcResultDictCode;
                    }else{
                        skuQcResultDictCode='WAIT_FOR_QC';
                    }

                    this.qcOrderConfig.qcResultDetailParams.push({
                        actInnerCartonSkuQty: v.actInnerCartonSkuQty,
                        actOuterCartonInnerBoxQty: v.actOuterCartonInnerBoxQty,
                        actOuterCartonSkuQty: v.actOuterCartonSkuQty,
                        checkOuterCartonQty: v.checkOuterCartonQty,
                        innerCartonGrossWeight: v.innerCartonGrossWeight,
                        innerCartonHeight: v.innerCartonHeight,
                        innerCartonLength: v.innerCartonLength,
                        innerCartonNetWeight: v.innerCartonNetWeight,
                        innerCartonVolume: v.innerCartonVolume,
                        innerCartonWidth: v.innerCartonWidth,
                        innerPackingBarCodeResultDictCode: v.innerPackingBarCodeResultDictCode,
                        outerCartonBarCodeResultDictCode: v.outerCartonBarCodeResultDictCode,
                        outerCartonGrossWeight: v.outerCartonGrossWeight,
                        outerCartonHeight: v.outerCartonHeight,
                        outerCartonLength: v.outerCartonHeight,
                        outerCartonNetWeight: v.outerCartonNetWeight,
                        outerCartonWidth: v.outerCartonWidth,
                        qcOrderDetailId: v.id,
                        qcPic: v.qcPic,
                        qualifiedSkuCartonTotalQty: v.qualifiedSkuCartonTotalQty,
                        remark: v.remark,
                        shippingMarkResultDictCode: v.shippingMarkResultDictCode,
                        skuBarCodeResultDictCode: v.skuBarCodeResultDictCode,
                        skuLabelResultDictCode: v.skuLabelResultDictCode,
                        skuQcResultDictCode: skuQcResultDictCode,
                        unqualifiedSkuCartonTotalQty: v.unqualifiedSkuCartonTotalQty,
                        unqualifiedType: v.unqualifiedType
                    });
                });
                _.map(this.qcOrderConfig.qcResultDetailParams,(v,k)=>{
                    v.qcPics=this.$refs['pictureUpload'+k][0].getFiles();
                });
                this.disableClickSubmit=true;
                this.$ajax.post(this.$apis.save_sellerQcOrder,this.qcOrderConfig).then(res=>{
                    this.disableClickSubmit=false;
                    this.$message({
                        message: this.$i.warehouse.submitSuccess,
                        type: 'success'
                    });
                    this.$router.push('/warehouse/qcOverview');
                }).catch(err=>{
                    this.disableClickSubmit=false;
                });
            },

            cancel(){
                window.close();
            },

            /**
             * 选择服务商的方法
             * */
            getService(name){
                this.serviceList=[];
                if(!name){
                    name='';
                }
                this.$ajax.get(`${this.$apis.get_supplyProviders}?name=${name}`).then(res=>{
                    res.forEach(v=>{
                        this.serviceList.push(v);
                    });
                    this.$ajax.get(`${this.$apis.get_serviceProviders}?name=${name}`).then(res=>{
                        res.forEach(v=>{
                            this.serviceList.push(v);
                        });
                    }).catch(err=>{

                    });

                }).catch(err=>{

                });
            },

            /**
             * 获取字典
             * */
            getUnit(){
                this.$ajax.post(this.$apis.get_partUnit,['QC_TYPE','QC_MD','SKU_QC_RS','PB_CODE','QC_STATUS'],{cache:true}).then(res=>{
                    res.forEach(v=>{
                        if(v.code==='QC_TYPE'){
                            this.qcTypeOption=v.codes;
                        }else if(v.code==='QC_MD'){
                            this.qcMethodOption=v.codes;
                        }else if(v.code==='SKU_QC_RS'){
                            v.codes=_.filter(v.codes, e=>{
                                return e.code!=='WAIT_FOR_QC' && e.code!=='CONFIRMED';
                            });
                            this.qcResultOption=v.codes;
                        }else if(v.code==='PB_CODE'){
                            this.barCodeResult=v.codes;
                        }else if(v.code==='QC_STATUS'){
                            this.qcStatusOption=v.codes;
                        }
                    })
                });

                this.$ajax.get(this.$apis.get_currencyUnit,{},{cache:true}).then(res=>{
                    this.currencyOptions=res;

                }).catch(err=>{

                });

                //获取验货员
                // this.$ajax.get(this.$apis.get_serviceQcSurveyor).then(res=>{
                //     console.log(res,'???????xxxx')
                // }).catch(err=>{
                //
                // });


                // this.$ajax.post(this.$apis.get_partUnit,[]).then(res=>{
                //     console.log(res)
                // });
            },
        },
        created(){
            this.getQcOrderDetail();
            this.getProductInfo();
            this.getUnit();
            this.getService();
        },
        mounted(){
            this.setLog({query: {code: 'WAREHOUSE'}});
        },
    }
</script>
<style scoped>
    .title{
        font-weight: bold;
        font-size: 18px;
        height: 32px;
        line-height: 32px;
        color:#666666;
    }
    .second-title{
        font-size: 16px;
        color: #999999;
        padding: 10px 0;
    }
    .payment-btn{
        margin: 5px 0 10px 0;
    }
    .product-info{
        margin-top: 10px;
    }

    .speInput{
        width: 80%;
    }

    .product-table >>> .el-checkbox{
        margin: 0;
    }
    .speNumber >>> input{
        text-align: left;
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
