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
            <br>
            <br>
            <div class="section">
                <v-table
                        code="uwarehouse_outbound_overview"
                        :height="500"
                        :loading="loadingTable"
                        :data="tableDataList"
                        :buttons="[{label: $i.warehouse.detail, type: 1}]"
                        @change-sort="val=>{getOutboundData(val)}"
                        @change-checked="changeChecked"
                        @action="btnClick">
                    <template slot="header">
                        <div class="btns">
                            <el-button @click="createOutbound">{{$i.warehouse.create}}</el-button>
                            <el-button @click="download">{{$i.warehouse.download}}({{selectList.length?selectList.length:$i.warehouse.all}})</el-button>
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
                pageData:{},
                tableDataList:[],
                downloadBtnInfo:'All',
                selectList:[],
                outboundType:[],
                outboundConfig:{
                    outboundNo: "",
                    pn: 1,
                    ps: 50,
                    outboundTypeDictCode: '',
                    sorts:[{orderBy:"updateDt",orderType:"desc"}]
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
            ...mapActions(['setMenuLink']),
            changeStatus(){
                this.outboundConfig.pn=1;
                this.getOutboundData();
            },

            //获取表格数据
            getOutboundData(e){
                this.loadingTable=true;
                this.selectList=[];
                Object.assign(this.outboundConfig,e);
                this.$ajax.post(this.$apis.get_outboundData,this.outboundConfig).then(res=>{
                    this.tableDataList = this.$getDB(this.$db.warehouse.outboundOverviewTable, res.datas,(e)=>{
                        e.outboundTypeDictCode.value=this.$change(this.outboundType,'outboundTypeDictCode',e).name;
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
            download(){
                let outboundNos=_.pluck(_.pluck(this.selectList,'outboundNo'),'value');
                let params=this.$depthClone(this.outboundConfig);
                params.outboundNos=outboundNos;
                this.$fetch.export_task('OUTBOUND',params);
            },
            //新建入库单
            createOutbound(){
                this.$windowOpen({
                    url:'/warehouse/createOutbound'
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
                this.outboundConfig.outboundNo=e.value;
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
                    this.getOutboundData();
                });
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
        mounted(){
            this.setMenuLink({
                path: '/logs/index',
                query: {code: 'WAREHOUSE'},
                type: 10,
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
