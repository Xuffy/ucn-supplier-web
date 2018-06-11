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
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item :label="$i.warehouse.qcOrderNo">
                            <el-input
                                    v-model="qcDetail.qcOrderNo"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item :label="$i.warehouse.qcTypeDictCode">
                            <el-select size="mini" class="speInput" v-model="qcDetail.qcTypeDictCode" clearable placeholder="请选择">
                                <el-option
                                        v-for="item in qcTypeOption"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item prop="11" :label="$i.warehouse.qcDate">
                            <el-date-picker
                                    size="mini"
                                    class="speInput"
                                    v-model="qcDetail.qcDate"
                                    align="right"
                                    type="date"
                                    placeholder="选择日期"
                                    :picker-options="pickerOptions1">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item prop="11" :label="$i.warehouse.factoryAddress">
                            <el-input
                                    v-model="qcDetail.factoryAddress"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item prop="11" :label="$i.warehouse.factoryContactPhone">
                            <el-input
                                    v-model="qcDetail.factoryContactPhone"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item prop="11" :label="$i.warehouse.qcStatusDictCode">
                            <el-input
                                    v-model="qcDetail.qcStatusDictCode"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item prop="11" :label="$i.warehouse.qcMethodDictCode">
                            <el-select size="mini" class="speInput" v-model="qcDetail.qcMethodDictCode" clearable placeholder="请选择">
                                <el-option
                                        v-for="item in qcMethodOption"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item prop="11" :label="$i.warehouse.surveyor">
                            <el-select size="mini" class="speInput" v-model="qcDetail.surveyor" clearable placeholder="请选择">
                                <el-option
                                        v-for="item in surveyorOption"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item prop="11" :label="$i.warehouse.serviceFee">
                            <el-input-number
                                    :controls="false"
                                    size="mini"
                                    class="speInput"
                                    v-model="qcDetail.serviceFee"
                                    label="描述文字"></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item prop="11" :label="$i.warehouse.serviceName">
                            <el-input
                                    v-model="qcDetail.serviceName"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item prop="11" :label="$i.warehouse.exchangeCurrencyDictCode">
                            <el-input
                                    v-model="qcDetail.exchangeCurrencyDictCode"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item prop="11" :label="$i.warehouse.timeZone">
                            <el-input
                                    v-model="qcDetail.timeZone"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item prop="11" :label="$i.warehouse.remark">
                            <el-input
                                    v-model="qcDetail.remark"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item prop="11" :label="$i.warehouse.attachment">
                            <el-input
                                    v-model="qcDetail.attachment"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="second-title">
            {{$i.warehouse.payment}}
        </div>
        <div class="payment-table">
            <el-button class="payment-btn" type="primary">{{$i.warehouse.pressMoney}}</el-button>
            <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                <el-table-column
                        label="No."
                        align="center"
                        width="60">
                    <template slot-scope="scope">
                        {{scope.$index+1}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="date"
                        label="Payment Number"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="Payment Item"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="Est. Pay Date">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="Act. Pay Date">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="Est. Amount">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="Act. Amount">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="Currency">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="Available">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="Action"
                        width="100">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                        <el-button type="text" size="small">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div class="product-info">
            <div class="second-title">
                {{$i.warehouse.productInfo}}
            </div>

            <el-table
                    class="product-table"
                    v-loading="loadingProductInfoTable"
                    :data="productInfoData"
                    height="250"
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
                                <el-select clearable v-model="scope.row[v.key]" placeholder="请选择">
                                    <el-option
                                            v-for="item in qcResultOption"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.code">
                                    </el-option>
                                </el-select>
                            </div>
                            <div v-else-if="v.isBarCodeResult">
                                <el-select clearable v-model="scope.row[v.key]" placeholder="请选择">
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
                                    v-model="scope.row[v.key]"
                                    label="描述文字"></el-input-number>
                        </div>
                        <div v-else-if="v.showType==='input'">
                            <el-input
                                    placeholder="请输入内容"
                                    v-model="scope.row[v.key]"
                                    clearable>
                            </el-input>
                        </div>
                        <div v-else>
                            {{scope.row[v.key]}}
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div class="footBtn">
            <el-button :disabled="loadingData" :loading="disableClickSubmit" @click="submit" type="primary">{{$i.warehouse.submit}}</el-button>
            <el-button :disabled="loadingData" @click="cancel">{{$i.warehouse.cancel}}</el-button>
        </div>

        <v-message-board module="qc" code="orderService" id="asdasf"></v-message-board>
    </div>
</template>
<script>

    import {VTable,VMessageBoard } from '@/components/index';

    export default {
        name:'qc-detail',
        components:{
            VTable,
            VMessageBoard
        },
        data(){
            return{
                options:[],
                qcDetail:{},
                loadingData:false,
                pickerOptions1: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
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
                    })
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

            submit(){
                this.qcOrderConfig.qcDate=this.qcDetail.qcDate;
                this.qcOrderConfig.qcMethodDictCode=this.qcDetail.qcMethodDictCode;
                this.qcOrderConfig.qcOrderId=this.$route.query.id;
                this.qcOrderConfig.qcOrderNo=this.qcDetail.qcOrderNo;
                this.qcOrderConfig.qcTypeDictCode=this.qcDetail.qcTypeDictCode;
                this.qcOrderConfig.surveyor=this.qcDetail.surveyor;
                this.qcOrderConfig.serviceFee=this.qcDetail.serviceFee;

                // console.log(this.productInfoData,'productInfoData')
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
                        message: '产品填了数值之后必须选择验货结果',
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
                this.disableClickSubmit=true;
                this.$ajax.post(this.$apis.save_sellerQcOrder,this.qcOrderConfig).then(res=>{
                    this.disableClickSubmit=false;
                    this.$message({
                        message: '提交成功',
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
             * 获取字典
             * */
            getUnit(){
                this.$ajax.post(this.$apis.get_partUnit,['QC_TYPE','QC_MD','SKU_QC_RS','PB_CODE'],{cache:true}).then(res=>{
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
                        }
                    })
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
        }
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
        width: 100%;
    }

    .product-table >>> .el-checkbox{
        margin: 0;
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
