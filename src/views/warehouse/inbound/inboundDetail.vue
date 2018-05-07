<template>
    <div class="inbound-detail" v-loading="loadingTable">
        <div class="title">
            {{$i.warehouse.basicInfo}}
        </div>
        <el-form :modal="inboundData" ref="basicInfo" class="speForm" label-width="200px" :label-position="labelPosition">
            <el-row>
                <el-col class="speCol" v-for="v in $db.warehouse.inbound" v-if="v.belong==='basicInfo'" :key="v.key" :xs="24" :sm="v.fullLine?24:8" :md="v.fullLine?24:8" :lg="v.fullLine?24:8" :xl="v.fullLine?24:8">
                    <el-form-item :prop="v.key" :label="v.label">
                        <div v-if="v.showType==='input'">
                            <el-input
                                    class="speInput"
                                    size="mini"
                                    :disabled="true"
                                    v-model="inboundData[v.key]"></el-input>
                        </div>
                        <div v-else-if="v.showType==='select'">
                            <el-select :disabled="true" class="speInput" size="mini" v-model="inboundData[v.key]">
                                <el-option
                                        v-for="item in inboundTypeOption"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div v-else-if="v.showType==='textarea'">
                            <el-input
                                    :disabled="true"
                                    class="speInput"
                                    type="textarea"
                                    autosize
                                    v-model="inboundData[v.key]">
                            </el-input>
                        </div>
                        <div v-else-if="v.showType==='number'">
                            <el-input-number
                                    :disabled="true"
                                    class="speInput"
                                    size="mini"
                                    v-model="inboundData[v.key]"
                                    :controls="false"
                                    :min="0"></el-input-number>
                        </div>
                        <div v-else-if="v.showType==='dropdown'">
                            <drop-down
                                    class="speInput"
                                    :list="dropData"
                                    :defaultProps="defaultProps"
                                    v-model="inboundData[v.key]"
                                    ref="dropDown"></drop-down>
                        </div>
                        <div v-else-if="v.showType==='timezone'">
                            <el-input
                                    class="speInput"
                                    size="mini"
                                    :disabled="true"
                                    v-model="inboundData[v.key]"></el-input>
                        </div>
                        <div v-else-if="v.showType==='date'">
                            <el-date-picker
                                    :disabled="true"
                                    class="speInput"
                                    size="mini"
                                    v-model="inboundData[v.key]"
                                    align="right"
                                    type="date"
                                    :picker-options="pickerOptions1">
                            </el-date-picker>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <v-table
                v-loading="loadProductTable"
                class="speTable"
                :data="productTable"
                :buttons="[{label:'详情',type:1}]"
                @action="btnClick"
                @change-checked="changeChecked">
            <template slot="header">
                <div class="title" style="display: inline">
                    {{$i.warehouse.productInfo}}
                </div>
            </template>
        </v-table>

        <div class="title" style="margin-top: 50px">
            {{$i.warehouse.summary}}
        </div>


        <el-form class="speForm" label-width="200px" :label-position="labelPosition">
            <el-row>
                <el-col class="speCol" :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                    <el-form-item prop="v" :label="$i.warehouse.cartonOfProducts">
                        <el-input
                                size="mini"
                                v-model="inboundData.skuTotalCartonQty"
                                :disabled="true">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col class="speCol" :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                    <el-form-item prop="v" :label="$i.warehouse.grossWeightOfProducts">
                        <el-input
                                size="mini"
                                v-model="inboundData.skuTotalGrossWeight"
                                :disabled="true">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col class="speCol" :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                    <el-form-item prop="v" :label="$i.warehouse.volumeOfProducts">
                        <el-input
                                size="mini"
                                v-model="inboundData.skuTotalVolume"
                                :disabled="true">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col class="speCol" :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                    <el-form-item prop="v" :label="$i.warehouse.netWeightOfProducts">
                        <el-input
                                size="mini"
                                v-model="inboundData.skuTotalNetWeight"
                                :disabled="true">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col class="speCol" :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                    <el-form-item prop="v" :label="$i.warehouse.quantityOfProducts">
                        <el-input
                                size="mini"
                                v-model="inboundData.skuTotalQty"
                                :disabled="true">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <div class="footBtn">
            <el-button @click="closeWindow" type="primary">{{$i.warehouse.close}}</el-button>
        </div>

    </div>
</template>

<script>

    import {VTimeZone,VTable} from '@/components/index'

    export default {
        name: "inboundDetail",
        components:{
            VTable,
            VTimeZone
        },
        data(){
            return{
                value:'',
                /**
                 * 页面基础配置
                 * */
                labelPosition:'right',
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
                addOrderDialogVisible:false,
                loadingTable:false,
                inboundTypeOption:[],
                inboundData:{
                    inboundNo:'',
                    inboundDate:'',
                    warehouseNo:'',
                    warehouseName:'',
                    storageType:null,
                    warehouseManager:'',
                    remark:'',
                    purchaser:'',
                    carrier:'',
                    carrierPhone:'',
                    timeZone:'',
                    skuTotalCartonQty: null,
                    skuTotalGrossWeight: null,
                    skuTotalNetWeight: null,
                    skuTotalQty: null,
                    skuTotalVolume: null
                },
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
                productTable:[],
            }
        },
        methods:{
            getData(){
                this.loadingTable=true;
                this.$ajax.get(`${this.$apis.get_inboundDetail}?id=${this.$route.query.id}`).then(res=>{
                    this.inboundData=res;
                    console.log(this.inboundData,'???')
                    this.$ajax.post(this.$apis.get_inboundSku,{
                        inboundId: this.$route.query.id,
                        pn: 1,
                        ps: 50,
                        // sorts: [
                        //     {
                        //         orderBy: "",
                        //         orderType: "",
                        //     }
                        // ],
                    }).then(res=>{
                        this.productTable = this.$getDB(this.$db.warehouse.inboundDetailProductTable, res.datas,(e)=>{

                        });
                        /**
                         * 计算统计数据
                         * */
                        res.datas.forEach(v=>{
                            this.summaryData.cartonOfProducts+=v.inboundOutCartonTotalQty;
                            this.summaryData.grossWeightOfProducts+=v.inboundSkuTotalGrossWeight;
                            this.summaryData.volumeOfProducts+=v.inboundSkuTotalVolume;
                            this.summaryData.netWeightOfProducts+=v.inboundSkuTotalNetWeight;
                            this.summaryData.quantityOfProducts+=v.inboundSkuTotalQty;
                        });
                        this.loadingTable=false;
                    }).catch(err=>{
                        this.loadingTable=false;
                    });


                }).catch(err=>{
                    this.loadingTable=false;
                });
            },


            /**
             * product table事件
             * */
            btnClick(e){
                console.log(e)
            },
            changeChecked(e){

            },

            //关闭窗口
            closeWindow(){
                window.close();
            },
            /**
             * 获取字典
             * */
            getUnit(){
                this.$ajax.post(this.$apis.get_partUnit,['IBD_TYPE'],{_cache:true}).then(res=>{
                    this.inboundTypeOption=res[0].codes;
                });
                // this.$ajax.get(this.$apis.get_allUnit,).then(res=>{
                //     console.log(res)
                // });
            },
        },
        created(){
            this.getData();
            this.getUnit();
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

    .footBtn{
        border-top: 1px solid #e0e0e0;
        height: 40px;
        line-height: 40px;
        background-color: #ffffff;
        position: sticky;
        left: 0;
        bottom: 0;
        width: 100%;
    }

    .speInput{
        width: 80%;
        max-width: 1000px !important;
    }
    .speInput >>> .el-select{
        display: block;
    }


</style>