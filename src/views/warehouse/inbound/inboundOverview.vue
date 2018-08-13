<template>
    <div class="inbound-overview">
        <div class="title">
            <span>{{$i.warehouse.inboundOverview}}</span>
        </div>
        <div class="body">
            <div class="head">
                <span>{{$i.warehouse.inboundType}}</span>
                <el-radio-group class="radios" @change="changeStatus" v-model="inboundConfig.inboundTypeDictCode" size="mini">
                    <el-radio-button label="">{{$i.warehouse.all}}</el-radio-button>
                    <el-radio-button v-for="v in inboundType" :key="v.id" :label="v.value">{{v.name}}</el-radio-button>
                </el-radio-group>
                <select-search
                        class="search"
                        @inputEnter="searchInbound"
                        v-model="searchId"
                        :options="searchOptions"></select-search>
            </div>
            <br>
            <br>
            <div class="section">
                <v-table
                        code="uwarehouse_inbound_overview"
                        :height="500"
                        :loading="loadingTable"
                        :data="tableDataList"
                        :buttons="[{label: $i.warehouse.detail, type: 1}]"
                        @change-checked="changeChecked"
                        @change-sort="val=>{getInboundData(val)}"
                        @action="btnClick">
                    <template slot="header">
                        <div class="btns">
                            <el-button
                                    v-authorize="'WAREHOUSE:DOWNLOAD'"
                                    @click="createInbound">{{$i.warehouse.create}}</el-button>
                            <el-button
                                    v-authorize="'WAREHOUSE:DOWNLOAD'"
                                    @click="download">{{$i.warehouse.download}}({{selectList.length===0?$i.warehouse.all:selectList.length}})</el-button>
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
                inboundType:[],         //入库类型
                tableDataList:[],
                selectList:[],
                pageData:{},
                inboundConfig:{
                    inboundNo: "",
                    pn: 1,
                    ps: 50,
                    inboundTypeDictCode: '',
                    sorts:[{orderBy:"updateDt",orderType:"desc"}]
                },

                searchId:1,

                searchOptions:[
                    {
                        label:'入库单号',
                        id:1
                    },
                ]
            }
        },
        methods:{
            ...mapActions(['setMenuLink']),
            changeStatus(){
                this.inboundConfig.pn=1;
                this.getInboundData();
            },
            //获取表格数据
            getInboundData(e){
                this.loadingTable=true;
                this.selectList=[];
                Object.assign(this.inboundConfig,e);
                this.$ajax.post(this.$apis.get_inboundData,this.inboundConfig).then(res=>{
                    this.tableDataList = this.$getDB(this.$db.warehouse.inboundOverviewTable, res.datas,e=>{

                        e.inboundTypeDictCode.value=this.$change(this.inboundType,'inboundTypeDictCode',e).name;

                        e.inboundDate.value=this.$dateFormat(e.inboundDate.value,'yyyy-mm-dd');
                        e.entryDt.value=this.$dateFormat(e.entryDt.value,'yyyy-mm-dd');
                        e.updateDt.value=this.$dateFormat(e.updateDt.value,'yyyy-mm-dd');
                        return e;
                    });
                    this.pageData=res;
                    this.loadingTable=false;
                }).catch(err=>{
                    this.loadingTable=false;
                });
            },
            download(){
                let inboundNos=_.pluck(_.pluck(this.selectList,'inboundNo'),'value');
                let params=this.$depthClone(this.inboundConfig);
                params.inboundNos=inboundNos;
                this.$fetch.export_task('INBOUND',params);
            },

            //新建入库单
            createInbound(){
                this.$windowOpen({
                    url:'/warehouse/createInbound'
                });
            },

            searchInbound(e){
                if(!e.id){
                    this.$message({
                        message: this.$i.warehouse.pleaseChooseAType,
                        type: 'warning'
                    });
                    return;
                }
                this.inboundConfig.inboundNo=e.value;
                this.getInboundData();
            },

            btnClick(e){
                console.log(e)
                this.$windowOpen({
                    url:'/warehouse/inboundDetail',
                    params:{
                        id:e.id.value
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
                this.inboundConfig.pn=e;
                this.getInboundData();
            },
            changeSize(e){
                this.inboundConfig.ps=e;
                this.getInboundData();
            }
        },
        created(){
            this.$ajax.post(this.$apis.get_partUnit,['IBD_TYPE']).then(res=>{
                this.inboundType=res[0].codes;
                this.getInboundData();
            });
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
        font-size: 18px;
        height: 32px;
        line-height: 32px;
        color:#666666;
        margin-bottom: 5px;
    }
    .radios{
        margin-left: 10px;
    }

    .head .search{
        float: right;
    }
    .section{
        margin-top: 10px;
    }
</style>
