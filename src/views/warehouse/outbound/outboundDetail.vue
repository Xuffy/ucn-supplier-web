<template>
    <div class="inbound-detail" v-loading="loadingTable">
        <div class="title">
            {{$i.warehouse.basicInfo}}
        </div>
        <el-form :modal="outboundData" ref="basicInfo" class="speForm" label-width="200px" :label-position="labelPosition">
            <el-row>
                <el-col class="speCol" v-for="v in $db.warehouse.outbound" v-if="v.belong==='basicInfo'" :key="v.key" :xs="24" :sm="v.fullLine?24:8" :md="v.fullLine?24:8" :lg="v.fullLine?24:8" :xl="v.fullLine?24:8">
                    <el-form-item :prop="v.key" :label="v.label">
                        <div v-if="v.showType==='input'">
                            <el-input
                                    class="speInput"
                                    size="mini"
                                    :disabled="true"
                                    v-model="outboundData[v.key]"
                                    placeholder="请填写"></el-input>
                        </div>
                        <div v-else-if="v.showType==='select'">
                            <el-select :disabled="true" class="speInput" size="mini" v-model="outboundData[v.key]" :placeholder="$i.warehouse.pleaseChoose">
                                <el-option
                                        v-for="item in outboundOption"
                                        :key="item.value"
                                        :label="item.name"
                                        :value="item.code">
                                </el-option>
                            </el-select>
                        </div>
                        <div v-else-if="v.showType==='textarea'">
                            <el-input
                                    :disabled="true"
                                    class="speInput"
                                    type="textarea"
                                    :autosize="{ minRows: 2}"
                                    :placeholder="$i.warehouse.pleaseInput"
                                    v-model="outboundData[v.key]">
                            </el-input>
                        </div>
                        <div v-else-if="v.showType==='number'">
                            <el-input-number
                                    :disabled="true"
                                    class="speInput"
                                    size="mini"
                                    v-model="outboundData[v.key]"
                                    :controls="false"
                                    :min="0"></el-input-number>
                        </div>
                        <div v-else-if="v.showType==='dropdown'">
                            <drop-down
                                    class="speInput"
                                    :list="dropData"
                                    :defaultProps="defaultProps"
                                    v-model="outboundData[v.key]"
                                    ref="dropDown"></drop-down>
                        </div>
                        <div v-else-if="v.showType==='date'">
                            <el-date-picker
                                    :disabled="true"
                                    class="speInput"
                                    size="mini"
                                    v-model="outboundData[v.key]"
                                    align="right"
                                    type="date"
                                    :placeholder="$i.warehouse.pleaseChoose">
                            </el-date-picker>
                        </div>
                        <div v-else-if="v.isAttachment">
                            <v-upload readonly :limit="20" :list="outboundData[v.key]" ref="attachmentUpload"></v-upload>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <div class="title">
            {{$i.warehouse.productInfo}}
        </div>

        <v-table
                v-loading="loadProductTable"
                class="speTable"
                :total-row="totalRow"
                :data="productTable"
                :buttons="[{label:'Detail',type:1}]"
                @action="btnClick"
                @change-checked="changeChecked"></v-table>

        <div class="footBtn">
            <el-button @click="closeWindow" type="primary">{{$i.warehouse.close}}</el-button>
        </div>

    </div>
</template>

<script>

    import { VUpload, VTable} from '@/components/index'

    export default {
        name: "inboundDetail",
        components:{
            VTable,
            VUpload
        },
        data(){
            return{
                /**
                 * 页面基础配置
                 * */
                labelPosition:'right',
                addOrderDialogVisible:false,
                loadingTable:false,
                outboundOption:[],

                outboundData:{
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
                },

                /**
                 * productTable配置
                 * */
                loadProductTable:false,
                productTable:[],
                totalRow:[],
            }
        },
        methods:{
            getData(){
                this.loadingTable=true;
                this.$ajax.get(`${this.$apis.get_outBoundDetail}?id=${this.$route.query.id}`).then(res=>{
                    this.outboundData=res;
                    this.$ajax.post(this.$apis.get_outboundDetailProductData,{
                        outboundId: this.$route.query.id,
                        pn: 1,
                        ps: 50,

                        // sorts: [
                        //     {
                        //         orderBy: "",
                        //         orderType: "",
                        //     }
                        // ],
                    }).then(res=>{
                        this.productTable = this.$getDB(this.$db.warehouse.outboundDetailProductData, res.datas);
                        _.map(res.datas,v=>{
                            _.map(v,(val,key)=>{
                                if(key==='outboundSkuTotalQty' || key==='outboundOutCartonTotalQty' || key==='outboundSkuTotalVolume' || key==='outboundSkuTotalNetWeight' || key==='outboundSkuTotalGrossWeight'){
                                }else{
                                    v[key]=null;
                                }
                            })
                        })

                        this.totalRow=this.$getDB(this.$db.warehouse.outboundDetailProductData, res.datas);
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
                this.$windowOpen({
                    url:'/product/detail',
                    params:{
                        id:e.skuId.value
                    }
                })
            },
            changeChecked(e){

            },

            //关闭窗口
            closeWindow(){
                window.close();
            },

            getUnit(){
                this.$ajax.post(this.$apis.get_partUnit,['OBD_STATUS'],{cache:true}).then(res=>{
                    this.outboundOption=res[0].codes;
                    console.log(this.outboundOption,'this.outboundOption')
                    this.getData();
                }).catch(err=>{

                })

            },
        },
        created(){
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
    }


</style>