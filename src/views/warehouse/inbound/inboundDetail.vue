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
                                    :autosize="{ minRows: 2}"
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
                        <div v-else-if="v.showType==='attachment'">
                            <v-upload :limit="20" :list="inboundData[v.key]" ref="attachmentUpload" readonly></v-upload>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <v-table
                code="uwarehouse_inbound_sku"
                v-loading="loadProductTable"
                class="speTable"
                :data="productTable"
                :totalRow="totalRow"
                :buttons="[{label:$i.warehouse.detail,type:1}]"
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
            <el-button @click="download" type="primary">{{$i.warehouse.download}}</el-button>
            <el-button @click="closeWindow" type="primary">{{$i.warehouse.close}}</el-button>
        </div>

    </div>
</template>

<script>

    import {VTimeZone,VTable,VUpload} from '@/components/index'
    import {mapActions} from 'vuex'

    export default {
        name: "inboundDetail",
        components:{
            VTable,
            VTimeZone,
            VUpload
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

                /**
                 * productTable配置
                 * */
                loadProductTable:false,
                productTable:[],


                //字典
                skuUnitOption:[],
              lengthUnitOption:[],
              volumeUnitOption:[],
              weightUnitOption:[],
            }
        },
        computed:{
            totalRow(){
                let obj={};
                if(this.productTable.length<=0){
                    return;
                }
                _.map(this.productTable,v=>{
                    _.mapObject(v,(item,key)=>{
                        if(item._calculate){
                            obj[key]={
                                value: Number(item.value)  + (Number(obj[key] ? obj[key].value : 0) || 0),
                            };
                        }else{
                            obj[key] = {
                                value: ''
                            };
                        }
                    })
                });
                return [obj];

            }
        },
        methods:{
            ...mapActions(['setMenuLink']),
            getData(){
                this.loadingTable=true;
                this.$ajax.get(`${this.$apis.get_inboundDetail}?id=${this.$route.query.id}`).then(res=>{
                    this.inboundData=res;
                    this.$ajax.post(this.$apis.get_inboundSku,{
                        inboundId: this.$route.query.id,
                        pn: 1,
                        ps: 50,
                    }).then(res=>{
                        this.productTable = this.$getDB(this.$db.warehouse.inboundDetailProductTable, res.datas,(e)=>{
                            e.skuUnitDictCode._value=e.skuUnitDictCode.value?_.findWhere(this.skuUnitOption,{code:e.skuUnitDictCode.value}).name:'';
                            e.lengthUnitDictCode._value=e.lengthUnitDictCode.value?_.findWhere(this.lengthUnitOption,{code:e.lengthUnitDictCode.value}).name:'';
                            e.volumeUnitDictCode._value=e.volumeUnitDictCode.value?_.findWhere(this.volumeUnitOption,{code:e.volumeUnitDictCode.value}).name:'';
                            e.weightUnitDictCode._value=e.weightUnitDictCode.value?_.findWhere(this.weightUnitOption,{code:e.weightUnitDictCode.value}).name:'';
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
                this.$windowOpen({
                    url:'/product/detail',
                    params:{
                        id:e.skuId.value
                    }
                })
            },
            changeChecked(e){

            },
            download(){
                this.$fetch.export_task('INBOUND',{inboundNos:[this.inboundData.inboundNo]});
            },
            //关闭窗口
            closeWindow(){
                window.close();
            },
            /**
             * 获取字典
             * */
            getUnit(){
                this.$ajax.post(this.$apis.get_partUnit,['IBD_TYPE','SKU_UNIT','WT_UNIT','LH_UNIT','VE_UNIT'],{cache:true}).then(res=>{
                    res.forEach(v=>{
                        if(v.code==='IBD_TYPE'){
                            this.inboundTypeOption=v.codes;
                        }else if(v.code==='SKU_UNIT'){
                            this.skuUnitOption=v.codes;
                        }else if(v.code==='WT_UNIT'){
                            this.weightUnitOption=v.codes;
                        }else if(v.code==='LH_UNIT'){
                            this.lengthUnitOption=v.codes;
                        }else if(v.code==='VE_UNIT'){
                            this.volumeUnitOption=v.codes;
                        }
                    });
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
        mounted(){
            this.setMenuLink({
                path: '/logs/index',
                query: {code: 'WAREHOUSE'},
                type: 10,
                label: this.$i.common.log
            });
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
