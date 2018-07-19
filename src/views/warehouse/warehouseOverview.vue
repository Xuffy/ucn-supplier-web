<template>
    <div class="inbound-overview">
        <div class="title">
            <span>{{$i.warehouse.warehouseOverview}}</span>
        </div>
        <div class="body">
            <div class="head">
                <span>{{$i.warehouse.status}}</span>
                <el-radio-group class="radioGroup" @change="changeStatus" v-model="warehouseConfig.skuInventoryStatusDictCode" size="mini">
                    <el-radio-button label="">{{$i.warehouse.all}}</el-radio-button>
                    <el-radio-button v-for="v in warehouseStatusOption" :key="v.id" :label="v.code">{{v.name}}</el-radio-button>
                </el-radio-group>
                <select-search
                        class="search"
                        @inputEnter="searchInbound"
                        v-model="searchId"
                        :options="searchOptions"></select-search>
            </div>
            <div class="section">
                <v-table
                        code="uwarehouse_overview"
                        :height="500"
                        :loading="loadingTable"
                        :data="tableDataList"
                        :buttons="[{label: $i.warehouse.detail, type: 1}]"
                        @change-checked="changeChecked"
                        @change-sort="val=>{getWarehouseData(val)}"
                        @action="btnClick">
                    <template slot="header">
                        <div class="btns">
                            <el-button
                                    v-authorize="'WAREHOUSE:DOWNLOAD'"
                                    @click="download">{{$i.warehouse.download}}({{selectList.length?selectList.length:$i.warehouse.all}})</el-button>
                        </div>
                    </template>
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
    import {mapActions} from 'vuex'

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
                    orderNo: "",
                    pn: 1,
                    ps: 50,
                    skuCode: "",
                    skuInventoryStatusDictCode: '',
                    sorts:[{orderBy:"entryDt",orderType:"desc"}]
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
                ],


                //字典配置
                skuUnitOption:[],
                warehouseStatusOption:[],
            }
        },
        methods:{
            ...mapActions(['setMenuLink']),
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
            getWarehouseData(e){
                this.loadingTable=true;
                Object.assign(this.warehouseConfig,e);
                this.selectList=[];
                this.$ajax.post(this.$apis.get_warehouseOverviewData,this.warehouseConfig).then(res=>{
                    this.tableDataList = this.$getDB(this.$db.warehouse.warehouseOverview, res.datas,(e)=>{
                        e.inboundDate.value=this.$dateFormat(e.inboundDate.value,'yyyy-mm-dd');
                        e.skuUnitDictCode._value=e.skuUnitDictCode.value?_.findWhere(this.skuUnitOption,{code:e.skuUnitDictCode.value}).name:'';
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
                if(!e.id){
                    this.$message({
                        message: this.$i.warehouse.pleaseChooseAType,
                        type: 'warning'
                    });
                    return;
                }else if(e.id===1){    //订单号
                    this.warehouseConfig.inboundNo='';
                    this.warehouseConfig.orderNo=e.value;
                    this.warehouseConfig.skuCode='';
                }else if(e.id===2){    //供应商货号
                    this.warehouseConfig.inboundNo='';
                    this.warehouseConfig.orderNo='';
                    this.warehouseConfig.skuCode=e.value;
                }else if(e.id===3){    //入库单号
                    this.warehouseConfig.inboundNo=e.value;
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
            download(){
                let ids=_.pluck(_.pluck(this.selectList,'id'),'value');
                let params=this.$depthClone(this.warehouseConfig);
                params.inboundSkuIds=ids;
                this.$fetch.export_task('WAREHOUES',params);
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
            },

            getUnit(){
                this.loadingTable=true;
                this.$ajax.post(this.$apis.get_partUnit,['SKU_UNIT','SKU_INVENTORY_STATUS'],{cache:true}).then(res=>{
                    res.forEach(v=>{
                        if(v.code==='SKU_UNIT'){
                            this.skuUnitOption=v.codes;
                        }else if(v.code==='SKU_INVENTORY_STATUS'){
                            this.warehouseStatusOption=v.codes;
                        }
                    });
                    this.getWarehouseData();
                }).catch(err=>{
                    this.loadingTable=false;
                });
            },
        },
        created(){
            this.getUnit();
        },
        mounted(){
            this.setMenuLink({
                path: '/logs/index',
                query: {code: 'WAREHOUSE'},
                type: 10,
                auth:'WAREHOUSE:LOG',
                label: this.$i.common.log
            });
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
