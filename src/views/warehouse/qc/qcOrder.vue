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
                            <el-select placeholder="服务商选择" :disabled="true" class="speInput" size="mini" v-model="qcOrderData[v.key]">
                                <el-option
                                        v-for="item in options"
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
                                    placeholder="服务商填写"
                                    :picker-options="pickerOptions1">
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
                <el-button type="primary">{{$i.warehouse.accept}}</el-button>
            </el-tab-pane>
            <el-tab-pane :label="$i.warehouse.applyRework">
                <el-button type="primary">{{$i.warehouse.acceptRework}}</el-button>
            </el-tab-pane>
            <el-tab-pane :label="$i.warehouse.applyReturn">
                <el-button type="primary">{{$i.warehouse.acceptReturn}}</el-button>
            </el-tab-pane>
        </el-tabs>




        <div class="title" style="margin-top: 50px">
            {{$i.warehouse.summary}}
        </div>




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
                value:'',
                /**
                 * 页面基础配置
                 * */
                options:[],
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
                qcOrderData:{},
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

                },
                productTable:[],
            }
        },
        methods:{
            getData(){
                this.loadingTable=true;
                this.$ajax.get(`${this.$apis.get_qcOrderDetail}?id=${this.$route.query.id}`).then(res=>{
                    this.qcOrderData=res;
                    this.loadingTable=false;
                }).catch(err=>{
                    this.loadingTable=false;
                });
            },
            getTableData(){
                // this.$ajax.post(this.$apis.get_qcOrderProductData,tableConfig);
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
            this.getTableData();
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


    .speInput{
        width: 80%;
        max-width: 1000px !important;
    }
    .speInput >>> .el-select{
        display: block;
    }


</style>