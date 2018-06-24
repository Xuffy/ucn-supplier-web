<template>
    <div class="inbound-overview">
        <div class="title">
            <span>{{$i.warehouse.warehouseOverview}}</span>
        </div>
        <div class="body">
            <div class="head">
                <span>{{$i.warehouse.status}}</span>
                <el-radio-group class="radioGroup" @change="changeStatus" v-model="inboundStatus" size="mini">
                    <el-radio-button label="0">全部</el-radio-button>
                    <el-radio-button label="WAIT_FOR_QC">待验货</el-radio-button>
                    <el-radio-button label="APPLY_FOR_REWORK">申请返工</el-radio-button>
                    <el-radio-button label="CONFIRMATION_OF_REWORK">确认返工</el-radio-button>
                    <el-radio-button label="APPLY_FOR_RETURN">申请退货</el-radio-button>
                    <el-radio-button label="CONFIRMATION_OF_RETURN">确认退货</el-radio-button>
                    <el-radio-button label="CONFIRMED">已确认</el-radio-button>
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
                    <!--<template slot="header">-->
                        <!--<div class="btns">-->
                            <!--<el-button>{{$i.warehouse.download}}({{selectList.length?selectList.length:'全部'}})</el-button>-->
                        <!--</div>-->
                    <!--</template>-->
                </v-table>
                <page
                        :page-sizes="[50,100,200,500]"
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
        name: "warehouseOverview",
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
                tableDataList:[],
                downloadBtnInfo:'All',
                selectList:[],
                pageData:{},
                warehouseConfig:{
                    inboundNo: "",
                    operatorFilters: [
                    //     {
                    //         columnName: "",
                    //         operator: "",
                    //         property: "",
                    //         resultMapId: "",
                    //         value: {}
                    //     }
                    ],
                    orderNo: "",
                    pn: 1,
                    ps: 10,
                    skuCode: "",
                    skuInventoryStatusDictCode: null,
                    sorts: [
                    //     {
                    //         orderBy: "",
                    //         orderType: "",
                    //     }
                    ],
                },

                searchId:1,

                searchOptions:[
                    {
                        label:'订单号',
                        id:1
                    },
                    {
                        label:'供应商货号',
                        id:2
                    },
                    {
                        label:'入库单号',
                        id:3
                    },
                ]
            }
        },
        methods:{
            changeStatus(e){
                this.warehouseConfig.pn=1;
                if(e==='0'){
                    this.warehouseConfig.skuInventoryStatusDictCode=null;
                }else{
                    this.warehouseConfig.skuInventoryStatusDictCode=e;
                }
                this.getWarehouseData();
            },

            //获取表格数据
            getWarehouseData(){
                this.loadingTable=true;
                this.$ajax.post(this.$apis.get_warehouseOverviewData,this.warehouseConfig).then(res=>{
                    this.tableDataList = this.$getDB(this.$db.warehouse.warehouseOverview, res.datas,(e)=>{
                        e.inboundDate.value=this.$dateFormat(e.inboundDate.value,'yyyy-mm-dd');
                        return e;
                    });
                    this.pageData=res;
                    this.loadingTable=false;
                }).catch(err=>{
                    this.loadingTable=false;
                });
            },


            searchInbound(e){
                // this.warehouseConfig.inboundNo=e.key;
                if(!e.keyType){
                    this.$message({
                        message: '请至少选择一个类别',
                        type: 'warning'
                    });
                    return;
                }else if(e.keyType===1){    //订单号
                    this.warehouseConfig.inboundNo='';
                    this.warehouseConfig.orderNo=e.key;
                    this.warehouseConfig.skuCode='';
                }else if(e.keyType===2){    //供应商货号
                    this.warehouseConfig.inboundNo='';
                    this.warehouseConfig.orderNo='';
                    this.warehouseConfig.skuCode=e.key;
                }else if(e.keyType===3){    //入库单号
                    this.warehouseConfig.inboundNo=e.key;
                    this.warehouseConfig.orderNo='';
                    this.warehouseConfig.skuCode='';
                }
                this.getWarehouseData();
            },

            btnClick(e){
                this.$windowOpen({
                    url:'/product/detail',
                    params:{
                        id:e.skuId.value
                    }
                })
            },

            changeChecked(e){
                this.selectList=e;
            },


            /**
             * 分页操作
             * */
            changePage(e){
                this.warehouseConfig.pn=e;
                this.getWarehouseData();
            },
            changeSize(e){
                this.warehouseConfig.ps=e;
                this.getWarehouseData();
            }
        },
        created(){
            this.getWarehouseData();
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
    }

    .radioGroup{
        margin-left: 10px;
    }
    .head{
        padding: 10px 0;
    }
    .head .search{
        float: right;

    }
    .section{
        margin-top: 10px;
    }
</style>