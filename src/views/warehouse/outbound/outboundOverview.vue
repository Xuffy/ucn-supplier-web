<template>
    <div class="inbound-overview">
        <!--<div class="title">-->
            <!--<span>{{$i.warehouse.inboundOverview}}</span>-->
        <!--</div>-->
        <div class="body">
            <div class="head">
                <span>{{$i.warehouse.outBoundType}}</span>
                <el-radio-group class="radioGroup" @change="changeStatus" v-model="inboundStatus" size="mini">
                    <el-radio-button label="0">全部</el-radio-button>
                    <el-radio-button label="1">销售出库</el-radio-button>
                    <el-radio-button label="2">组装领料出库</el-radio-button>
                    <el-radio-button label="3">转库</el-radio-button>
                    <el-radio-button label="4">退回供应商</el-radio-button>
                </el-radio-group>
                <select-search
                        class="search"
                        @inputEnter="searchInbound"
                        v-model="searchId"
                        :options="searchOptions"></select-search>
            </div>
            <div class="section">
                <div class="btns">
                    <el-button>{{$i.warehouse.download+' ('+downloadBtnInfo+')'}}</el-button>
                    <el-button @click="createOutbound">新建</el-button>
                </div>
                <v-table
                        :loading="loadingTable"
                        :data="tableDataList"
                        :buttons="[{label: '详情', type: 1}]"
                        @change-checked="changeChecked"
                        @action="btnClick">
                </v-table>
            </div>
        </div>
    </div>
</template>

<script>
    import VTable from '@/components/common/table/index'
    import selectSearch from '@/components/common/fnCompon/selectSearch'

    export default {
        name: "inboundOverview",
        components:{
            selectSearch,
            VTable
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
                outboundConfig:{
                    outboundNo: "",
                    pn: 1,
                    ps: 50,
                    // sorts: [
                    //     {
                    //         orderBy: "",
                    //         orderType: "",
                    //     }
                    // ],
                    // outboundTypeDictCode: null
                },

                searchId:1,

                searchOptions:[
                    {
                        label:'出库编号',
                        id:1
                    },
                    // {
                    //     label:'供应商货号',
                    //     id:2
                    // },
                    // {
                    //     label:'订单号',
                    //     id:3
                    // },
                ]
            }
        },
        methods:{
            changeStatus(e){
                let num=Number(e);
                if(num===0){
                    this.inboundConfig.inboundTypeDictCode=null;
                }else{
                    this.inboundConfig.inboundTypeDictCode=num;
                }
                this.getInboundData();
            },

            //获取表格数据
            getOutboundData(){
                this.loadingTable=true;
                this.$ajax.post(this.$apis.get_outboundData,this.outboundConfig).then(res=>{
                    this.tableDataList = this.$getDB(this.$db.warehouse.outboundOverviewTable, res.datas,(e)=>{
                        e.outboundDate.value=this.$dateFormat(e.outboundDate.value,'yyyy-mm-dd');
                        e.updateDt.value=this.$dateFormat(e.updateDt.value,'yyyy-mm-dd');
                        e.entryDt.value=this.$dateFormat(e.entryDt.value,'yyyy-mm-dd');
                        return e;
                    });
                    this.loadingTable=false;
                }).catch(err=>{
                    this.loadingTable=false;
                });
            },

            //新建入库单
            createOutbound(){
                this.$windowOpen({
                    url:'/sellerWarehouse/createOutbound'
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
                this.inboundConfig.inboundNo=e.key;
                this.getInboundData();
            },

            btnClick(e){
                this.$windowOpen({
                    url:'/sellerWarehouse/outboundDetail',
                    params:{
                        id:e.id.value
                    }
                })
            },

            changeChecked(e){
                this.selectList=e;
            },
        },
        created(){
            this.getOutboundData();
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

    .head .search{
        float: right;
    }
    .section{
        margin-top: 10px;
    }
</style>