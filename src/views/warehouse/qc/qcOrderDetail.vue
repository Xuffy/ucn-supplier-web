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
                    <el-col v-for="v in $db.warehouse.qcOrderDetailBasicInfo" :key="v.key" class="speCol" :xs="24" :sm="v.fullLine?24:12" :md="v.fullLine?24:12" :lg="v.fullLine?24:8" :xl="v.fullLine?24:8">
                        <el-form-item :label="$i.warehouse[v.key]">
                            <div v-if="v.type==='input'">
                                <el-input
                                        v-model="qcDetail[v.key]"
                                        :disabled="true">
                                </el-input>
                            </div>
                            <div v-else-if="v.type==='select'">
                                <el-select
                                        class="speInput"
                                        v-model="qcDetail[v.key]"
                                        clearable
                                        :disabled="true"
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
                                        :disabled="true"
                                        :placeholder="$i.warehouse.pleaseChoose"
                                        :picker-options="pickerOptions1">
                                </el-date-picker>
                            </div>
                            <div v-else-if="v.type==='number'">
                                <el-input-number
                                        :controls="false"
                                        v-model="qcDetail[v.key]"
                                        :disabled="true"
                                        class="speInput speNumber"></el-input-number>
                            </div>
                            <div v-else-if="v.type==='textarea'">
                                <el-input
                                        :disabled="true"
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
        <div class="second-title">
            {{$i.warehouse.payment}}
        </div>
        <div class="payment-table">
            <el-button class="payment-btn" @click="dunningPay" :disabled="loadingPaymentTable" :loading="disableDunning" type="primary">{{$i.warehouse.pressMoney}}</el-button>
            <el-table
                    :data="paymentData"
                    border
                    :row-class-name="tableRowClassName"
                    v-loading="loadingPaymentTable"
                    show-summary
                    :summary-method="getSummaries"
                    style="width: 100%">
                <el-table-column
                        label="#"
                        align="center"
                        width="60">
                    <template slot-scope="scope">
                        {{scope.$index+1}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="no"
                        :label="$i.warehouse.paymentNumber"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="name"
                        :label="$i.warehouse.paymentName"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="planPayDt"
                        :label="$i.warehouse.estPayDate">
                    <template slot-scope="scope">
                        {{$dateFormat(scope.row.planPayDt,'yyyy-mm-dd')}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="planPayAmount"
                        :label="$i.warehouse.estAmount">
                </el-table-column>
                <el-table-column
                        prop="actualPayDt"
                        :label="$i.warehouse.actPayDate">
                    <template slot-scope="scope">
                        {{$dateFormat(scope.row.actualPayDt,'yyyy-mm-dd')}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="actualPayAmount"
                        :label="$i.warehouse.actAmount">
                </el-table-column>
                <el-table-column
                        prop="currencyCode"
                        :label="$i.warehouse.currency">
                </el-table-column>
                <el-table-column
                        prop="status"
                        :label="$i.warehouse.available">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status===-1">{{$i.warehouse.abandon}}</span>
                        <span v-if="scope.row.status===10">{{$i.warehouse.waitCustomerConfirm}}</span>
                        <span v-if="scope.row.status===20">{{$i.warehouse.waitSupplierConfirm}}</span>
                        <span v-if="scope.row.status===30">{{$i.warehouse.waitServiceConfirm}}</span>
                        <span v-if="scope.row.status===40">{{$i.warehouse.confirm}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="Action"
                        align="center"
                        width="100">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.status!==40 && scope.row.status!==-1" @click="confirmPay(scope.row)" type="text" size="small">{{$i.warehouse.confirm}}</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="product-info">
            <v-table
                    :height="500"
                    code="uwarehouse_qc_order_detail"
                    :loading="loadingProductInfoTable"
                    :data="productInfoData"
                    :buttons="[{'label': $i.warehouse.detail, type: 1}]"
                    @action="btnClick"
                    @change-checked="changeChecked"
                    :totalRow="totalRow">
                <template slot="header">
                    <div class="second-title">
                        {{$i.warehouse.productInfo}}
                    </div>
                </template>
            </v-table>
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
            <el-button @click="edit" v-if="qcDetail.qcStatusDictCode==='WAITING_QC'" type="primary">{{$i.warehouse.edit}}</el-button>
            <el-button @click="cancel"  v-if="qcDetail.qcStatusDictCode==='WAITING_QC'" >{{$i.warehouse.cancel}}</el-button>
            <el-button @click="cancel"  v-if="qcDetail.qcStatusDictCode!=='WAITING_QC'" >{{$i.warehouse.exit}}</el-button>
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
                qcDetail:{},
                loadingData:false,
                loadingPaymentTable:false,
                pickerOptions1: {
                    disabledDate(time) {
                        return time.getTime()+3600 * 1000 * 24  < Date.now();
                    },
                },
                disableDunning:false,
                /**
                 * 字典数据
                 * */
                serviceList:[],
                qcTypeOption:[],
                qcMethodOption:[],
                surveyorOption:[],
                qcResultOption:[],
                barCodeResult:[],
                qcStatusOption:[],
                currencyOptions:[],
                skuUnitOption:[],       //计量单位
                lengthOption:[],
                volumeOption:[],
                weightOption:[],


                /**
                 * summary Data
                 * */
                summaryData:{
                    skuQuantity:0
                },


                /**
                 * paymentTable data
                 * */
                paymentData: [],

                /**
                 * product info data
                 * */
                totalRow:[],
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
            }
        },
        methods:{
            ...mapActions(['setLog']),
            getQcOrderDetail(){
                this.loadingData=true;
                this.$ajax.get(`${this.$apis.get_serviceOrderDetail}?id=${this.$route.query.id}`)
                    .then(res=>{
                        this.qcDetail=res;
                        this.getPaymentInfo();
                    }).finally(err=>{
                        this.loadingData=false;
                    }
                );
            },
            getProductInfo(){
                this.loadingProductInfoTable=true;
                this.$ajax.post(this.$apis.get_serviceQcOrderProduct,this.productInfoConfig).then(res=>{
                    this.productInfoData = this.$getDB(this.$db.warehouse.qcDetailProductInfo, res.datas,e=>{
                        e.deliveryDate._value=this.$dateFormat(e.deliveryDate.value,'yyyy-mm-dd');
                        e.skuUnitDictCode._value=_.findWhere(this.skuUnitOption,{code:e.skuUnitDictCode.value}).name;
                        e.volumeUnitDictCode._value=_.findWhere(this.volumeOption,{code:e.volumeUnitDictCode.value}).name;
                        e.weightUnitDictCode._value=_.findWhere(this.weightOption,{code:e.weightUnitDictCode.value}).name;
                        e.lengthUnitDictCode._value=_.findWhere(this.lengthOption,{code:e.lengthUnitDictCode.value}).name;
                    });

                    let diffData=[];
                    _.map(this.productInfoData,v=>{
                        diffData.push(v.skuId.value+v.orderNo.value);
                    });
                    this.summaryData.skuQuantity=_.uniq(diffData).length;

                    if(res.datas.length>0){
                        let obj=Object.assign({},res.datas[0]);
                        _.map(obj,(v,key)=>{
                            if(key==='orderSkuQty' || key==='expectQcQty' || key==='outerCartonTotalQty' || key==='actSkuCartonTotalQty' || key==='qualifiedSkuCartonTotalQty' || key==='unqualifiedSkuCartonTotalQty' || key==='actSkuQty' || key==='qualifiedSkuQty' || key==='unqualifiedSkuQty' || key==='qualifiedSkuNetWeight' || key==='unqualifiedSkuNetWeight' || key==='qualifiedSkuVolume' || key==='unqualifiedSkuVolume' || key==='qualifiedSkuGrossWeight' || key==='unqualifiedSkuGrossWeight' || key==='checkOuterCartonQty'){
                                obj[key]=0;
                            }else{
                                obj[key]=null;
                            }
                        })

                        _.map(res.datas,data=>{
                            _.map(data,(v,key)=>{
                                if(key==='orderSkuQty' || key==='expectQcQty' || key==='outerCartonTotalQty' || key==='actSkuCartonTotalQty' || key==='qualifiedSkuCartonTotalQty' || key==='unqualifiedSkuCartonTotalQty' || key==='actSkuQty' || key==='qualifiedSkuQty' || key==='unqualifiedSkuQty' || key==='qualifiedSkuNetWeight' || key==='unqualifiedSkuNetWeight' || key==='qualifiedSkuVolume' || key==='unqualifiedSkuVolume' || key==='qualifiedSkuGrossWeight' || key==='unqualifiedSkuGrossWeight' || key==='checkOuterCartonQty'){
                                    obj[key]+=Number(data[key]);
                                }

                            })
                        })
                        this.totalRow = this.$getDB(this.$db.warehouse.qcDetailProductInfo, [obj],item=>{

                        });
                    }


                    this.loadingProductInfoTable=false;
                }).catch(err=>{
                    this.loadingProductInfoTable=false;
                });
            },
            getPaymentInfo(){
                this.loadingPaymentTable=true;
                this.$ajax.post(this.$apis.PAYMENT_LIST,{
                    orderNo:this.qcDetail.qcOrderNo,
                    orderType:20
                }).then(res=>{
                    this.paymentData=res.datas;
                }).finally(()=>{
                    this.loadingPaymentTable=false;
                })
            },

            /**
             * product info表格事件
             * */
            btnClick(e){
                this.$windowOpen({
                    url:'/product/detail',
                    params:{
                        id:e.skuId.value
                    }
                });

            },
            changeChecked(e){
                this.selectList=e;
            },
            edit(){
                this.$router.push({
                    path:'/warehouse/editQc',
                    query:{
                        id:this.$route.query.id
                    }
                });
            },

            /**
             * payment事件
             * */
            tableRowClassName({row}) {
                if(row.status===-1){
                    return 'warning-row';
                }
                return '';
            },
            dunningPay(){
                let params=[];
                _.map(this.paymentData,v=>{
                    if(v.status===40 && v.planPayAmount>v.actualPayAmount){
                        params.push({
                            id:v.id
                        })
                    }
                });

                if(params.length===0){
                    return this.$message({
                        message: this.$i.warehouse.nothingDunning,
                        type: 'warning'
                    });
                }

                this.disableDunning=true;
                this.$ajax.post(this.$apis.PAYMENT_DUNNING,params).then(res=>{
                    this.$message({
                        message: this.$i.warehouse.dunningSuccess,
                        type: 'success'
                    });
                }).finally(()=>{
                    this.disableDunning=false;
                })
            },
            confirmPay(data){
                this.$confirm(this.$i.warehouse.sureConfirm, this.$i.warehouse.prompt, {
                    confirmButtonText: this.$i.warehouse.sure,
                    cancelButtonText: this.$i.warehouse.cancel,
                    type: 'warning'
                }).then(() => {
                    this.$ajax.post(this.$apis.PAYMENT_ACCEPT,{
                        id:data.id,
                        version:data.version
                    }).then(res=>{
                        this.$message({
                            message: this.$i.warehouse.confirmSuccess,
                            type: 'success'
                        });
                        this.getPaymentInfo();
                    }).finally(()=>{

                    });
                }).catch(() => {

                });
            },
            getSummaries(param) {
                const { columns, data } = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = this.$i.warehouse.totalMoney;
                        return;
                    }else if(index===4 || index===6){
                        const values = data.map(item => {
                            if(item.status===40){
                                return Number(item[column.property])
                            }
                        });

                        if (!values.every(value => isNaN(value))) {
                            sums[index] = values.reduce((prev, curr) => {
                                const value = Number(curr);
                                if (!isNaN(value)) {
                                    return prev + curr;
                                } else {
                                    return prev;
                                }
                            }, 0);
                        }else{
                            sums[index]=0;
                        }
                    }
                });

                return sums;
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
                this.$ajax.post(this.$apis.get_partUnit,['QC_TYPE','QC_MD','SKU_QC_RS','PB_CODE','QC_STATUS','SKU_UNIT','LH_UNIT','VE_UNIT','WT_UNIT'],{cache:true}).then(res=>{
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
                        }else if(v.code==='SKU_UNIT'){
                            this.skuUnitOption=v.codes;
                        }else if(v.code==='LH_UNIT'){
                            this.lengthOption=v.codes;
                        }else if(v.code==='VE_UNIT'){
                            this.volumeOption=v.codes;
                        }else if(v.code==='WT_UNIT'){
                            this.weightOption=v.codes;
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
            cancel(){
                window.close();
            },
        },
        created(){
            this.getQcOrderDetail();
            this.getProductInfo();
            this.getService();
            this.getUnit();
        },
        mounted(){
            this.setLog({query: {code: 'WAREHOUSE'}});
        },
    }
</script>
<style scoped>
    .el-table >>> .warning-row {
        background: #f5f7fa;
    }
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
        width: 100%;
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
        z-index:5;
    }
</style>
