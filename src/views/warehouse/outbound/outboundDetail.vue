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
                :height="500"
                code="uwarehouse_outbound_sku"
                v-loading="loadProductTable"
                class="speTable"
                :data="productTable"
                :buttons="[{label:'Detail',type:1}]"
                @action="btnClick"
                :totalRow="totalRow"
                @change-checked="changeChecked"></v-table>

        <div class="footBtn">
            <el-button @click="download" type="primary">{{$i.warehouse.download}}</el-button>
            <el-button @click="closeWindow" type="primary">{{$i.warehouse.close}}</el-button>
        </div>

    </div>
</template>

<script>

    import { VUpload, VTable} from '@/components/index'
    import {mapActions} from 'vuex'

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
               dataDicts:{}
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
                this.$ajax.get(`${this.$apis.get_outBoundDetail}?id=${this.$route.query.id}`).then(res=>{
                    this.outboundData=res;
                    this.$ajax.post(this.$apis.get_outboundDetailProductData,{
                        outboundId: this.$route.query.id,
                        pn: 1,
                        ps: 50,
                    }).then(res=>{
                        this.productTable = this.$getDB(this.$db.warehouse.outboundDetailProductData, res.datas,e=>{
                          e.skuUnitDictCode._value=e.skuUnitDictCode.value?_.findWhere(this.getDict('SKU_UNIT'),{code:e.skuUnitDictCode.value}).name:'';
                          e.lengthUnitDictCode._value=e.lengthUnitDictCode.value?_.findWhere(this.getDict('LH_UNIT'),{code:e.lengthUnitDictCode.value}).name:'';
                          e.volumeUnitDictCode._value=e.volumeUnitDictCode.value?_.findWhere(this.getDict('VE_UNIT'),{code:e.volumeUnitDictCode.value}).name:'';
                          e.weightUnitDictCode._value=e.weightUnitDictCode.value?_.findWhere(this.getDict('WT_UNIT'),{code:e.weightUnitDictCode.value}).name:'';

                          e.inboundDate._value = e.inboundDate.value?this.$dateFormat(e.inboundDate.value, "yyyy-mm-dd"):'';
                        });
                        _.map(res.datas,v=>{
                            _.map(v,(val,key)=>{
                                if(key==='outboundSkuTotalQty' || key==='outboundOutCartonTotalQty' || key==='outboundSkuTotalVolume' || key==='outboundSkuTotalNetWeight' || key==='outboundSkuTotalGrossWeight'){
                                }else{
                                    v[key]=null;
                                }
                            })

                        })
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
                this.$fetch.export_task('OUTBOUND',{outboundNos:[this.outboundData.outboundNo]});
            },
            //关闭窗口
            closeWindow(){
                window.close();
            },

            getDataDicts(){
                this.$ajax.post(this.$apis.get_partUnit,['OBD_STATUS','SKU_UNIT','WT_UNIT','LH_UNIT','VE_UNIT'],{cache:true}).then(res=>{
                  console.log(res,"getDataDicts");
                  this.dataDicts={};
                  res.forEach(v => {
                    this.dataDicts[v.code]=v.codes;
                  });
                  this.outboundOption=this.dataDicts['OBD_STATUS'];
                    this.getData();
                }).catch(err=>{

                })
            },
          getDict(type,code){
              if(!code){
                return this.dataDicts[type];
              }
              let v;
              this.dataDicts[type].forEach(o=>{
                if(o.code==code){
                  v=o;
                }
              })
              if(!v){
                console.log('未找到数据字典：'+type+'='+code);
              }
              return v;
          }
        },
        created(){
            this.getDataDicts();
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
    }


</style>
