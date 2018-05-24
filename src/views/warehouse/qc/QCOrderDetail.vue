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
                            <el-input
                                    v-model="qcDetail.qcTypeDictCode"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item prop="11" :label="$i.warehouse.qcDate">
                            <el-input
                                    v-model="qcDetail.qcDate"
                                    :disabled="true">
                            </el-input>
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
                            <el-input
                                    v-model="qcDetail.qcMethodDictCode"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item prop="11" :label="$i.warehouse.surveyor">
                            <el-input
                                    v-model="qcDetail.surveyor"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item prop="11" :label="$i.warehouse.serviceFee">
                            <el-input
                                    v-model="qcDetail.serviceFee"
                                    :disabled="true">
                            </el-input>
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
                    <!--<el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">-->
                        <!--<el-form-item prop="11" :label="$i.warehouse.timeZone">-->
                            <!--<el-input-->
                                    <!--v-model="qcDetail.timeZone"-->
                                    <!--:disabled="true">-->
                            <!--</el-input>-->
                        <!--</el-form-item>-->
                    <!--</el-col>-->
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
            <v-table
                    :loading="loadingProductInfoTable"
                    :data="productInfoData"
                    :buttons="[{'label': $i.warehouse.detail, type: 1}]"
                    @action="btnClick"
                    @change-checked="changeChecked"
                    :totalRow="true"
            >
                <template slot="header">
                    <div class="second-title">
                        {{$i.warehouse.productInfo}}
                    </div>
                </template>
            </v-table>
        </div>

        <div class="footBtn">
            <el-button @click="edit" v-if="qcDetail.qcStatusDictCode==='WAITING_QC'" type="primary">{{$i.warehouse.edit}}</el-button>
            <el-button @click="cancel">{{$i.warehouse.cancel}}</el-button>
        </div>
    </div>
</template>
<script>

    import {VTable } from '@/components/index';

    export default {
        name:'qc-detail',
        components:{
            VTable
        },
        data(){
            return{
                qcDetail:{},
                loadingData:false,
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
                    this.productInfoData = this.$getDB(this.$db.warehouse.qcDetailProductInfo, res.datas);
                    this.loadingProductInfoTable=false;
                }).catch(err=>{
                    this.loadingProductInfoTable=false;
                });
            },


            /**
             * product info表格事件
             * */
            btnClick(e){
                // this.$windowOpen({
                //     url:'/product/sourcingDetail',
                //     params:{
                //         id:e.skuId.value
                //     }
                // });
                console.log(e.skuId.value)
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

            cancel(){
                window.close();
            },
        },
        created(){
            this.getQcOrderDetail();
            this.getProductInfo();
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