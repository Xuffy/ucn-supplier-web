<template>
    <div class="inbound-overview">
        <div class="title">
            <span>{{$i.warehouse.outboundOverview}}</span>
        </div>
        <div class="body">
            <div class="head">
                <span>{{$i.warehouse.outBoundType}}</span>
                <el-radio-group class="radios" @change="changeStatus" v-model="outboundConfig.outboundTypeDictCode" size="mini">
                    <el-radio-button label="">{{$i.warehouse.all}}</el-radio-button>
                    <el-radio-button v-for="v in outboundType" :key="v.id" :label="v.code">{{v.name}}</el-radio-button>
                </el-radio-group>
                <select-search
                        class="search"
                        @inputEnter="searchInbound"
                        v-model="searchId"
                        :options="searchOptions"></select-search>
            </div>
            <div class="section">
                <v-table
                        :height="500"
                        :loading="loadingTable"
                        :data="tableDataList"
                        :buttons="[{label: $i.warehouse.detail, type: 1}]"
                        @change-checked="changeChecked"
                        @action="btnClick">
                    <template slot="header">
                        <div class="btns">
                            <!--<el-button>{{$i.warehouse.download}}({{selectList.length?selectList.length:'All'}})</el-button>-->
                            <el-button @click="createOutbound">{{$i.warehouse.create}}</el-button>
                        </div>
                    </template>
                </v-table>
                <page
                        @size-change="changeSize"
                        @change="changePage"
                        :page-data="pageData"></page>
            </div>
        </div>
    </div>
</template>

<script>
    import {VPagination,VTable} from '@/components/index'
    import selectSearch from '@/components/common/fnCompon/selectSearch'

    export default {
        name: "inboundOverview",
        components:{
            selectSearch,
            VTable,
            page:VPagination
        },
        data(){
            return{
                /**
                 * 页面基本配置
                 * */
                loadingTable:false,
                inboundStatus:'0',
                pageData:{},
                tableDataList:[],
                downloadBtnInfo:'All',
                selectList:[],
                outboundType:[],
                outboundConfig:{
                    outboundNo: "",
                    pn: 1,
                    ps: 10,
                    // sorts: [
                    //     {
                    //         orderBy: "",
                    //         orderType: "",
                    //     }
                    // ],
                    outboundTypeDictCode: ''
                },
                searchId:1,
                searchOptions:[
                    {
                        label:'出库编号',
                        id:1
                    },
                ]
            }
        },
        methods:{
            changeStatus(){
                this.outboundConfig.pn=1;
                this.getOutboundData();
            },

            //获取表格数据
            getOutboundData(){
                this.loadingTable=true;
                this.$ajax.post(this.$apis.get_outboundData,this.outboundConfig).then(res=>{
                    this.tableDataList = this.$getDB(this.$db.warehouse.outboundOverviewTable, res.datas,(e)=>{
                        e.outboundTypeDictCode.value=this.$change(this.outboundType,'outboundTypeDictCode',e).label;
                        e.outboundDate.value=this.$dateFormat(e.outboundDate.value,'yyyy-mm-dd');
                        e.updateDt.value=this.$dateFormat(e.updateDt.value,'yyyy-mm-dd');
                        e.entryDt.value=this.$dateFormat(e.entryDt.value,'yyyy-mm-dd');
                        return e;
                    });
                    this.pageData=res;
                    this.loadingTable=false;
                }).catch(err=>{
                    this.loadingTable=false;
                });
            },

            //新建入库单
            createOutbound(){
                this.$windowOpen({
                    url:'/warehouse/createOutbound'
                });
            },

            searchInbound(e){
                if(!e.keyType){
                    this.$message({
                        message: '请选择一个类别',
                        type: 'warning'
                    });
                    return;
                }
                this.outboundConfig.outboundNo=e.key;
                this.getOutboundData();
            },

            btnClick(e){
                this.$windowOpen({
                    url:'/warehouse/outboundDetail',
                    params:{
                        id:e.id.value
                    }
                })
            },

            changeChecked(e){
                this.selectList=e;
            },


            /**
             * 获取字典
             * */
            getUnit(){
                this.$ajax.post(this.$apis.get_partUnit,['OBD_STATUS']).then(res=>{
                    this.outboundType=res[0].codes;
                    console.log(this.outboundType)
                    // this.outboundType.forEach(v=>{
                    //     if(v.value==='1'){
                    //         v.label=this.$i.warehouse.sellingOutOfTheTreasury;
                    //     }else if(v.value==='2'){
                    //         v.label=this.$i.warehouse.collectionOfMaterialsFromTheWarehouse;
                    //     }else if(v.value==='3'){
                    //         v.label=this.$i.warehouse.stockTransfer;
                    //     }else if(v.value==='4'){
                    //         v.label=this.$i.warehouse.returnToSupplier;
                    //     }
                    // });

                    this.getOutboundData();

                });
                // this.$ajax.get(this.$apis.get_allUnit).then(res=>{
                //     console.log(res,'???')
                // });
            },


            /**
             * 分页操作
             * */
            changePage(e){
                this.outboundConfig.pn=e;
                this.getOutboundData();
            },
            changeSize(e){
                this.outboundConfig.ps=e;
                this.getOutboundData();
            }
        },
        created(){
            this.getUnit();
        },
        watch:{
            selectList(n){
                if(n.length>0){
                    this.downloadBtnInfo=n.length;
                }else{
                    this.downloadBtnInfo='All';
                }
            }
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
        margin-bottom: 5px;
    }
    .radios{
        margin-left: 10px;
    }

    .radioGroup{
        margin-left: 10px;
    }

    .head .search{
        float: right;
    }
    .section{
        margin-top: 10px;
    }
</style>