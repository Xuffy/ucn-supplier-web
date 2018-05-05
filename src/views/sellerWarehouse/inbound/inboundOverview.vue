<template>
    <div class="inbound-overview">
        <!--<div class="title">-->
            <!--<span>{{$i.warehouse.inboundOverview}}</span>-->
        <!--</div>-->
        <div class="body">
            <div class="head">
                <span>{{$i.warehouse.inboundType}}</span>
                <el-radio-group class="radioGroup" @change="changeStatus" v-model="inboundStatus" size="mini">
                    <el-radio-button label="0">全部</el-radio-button>
                    <el-radio-button label="1">采购入库</el-radio-button>
                    <el-radio-button label="2">验货入库</el-radio-button>
                    <el-radio-button label="3">客户退货入库</el-radio-button>
                    <el-radio-button label="4">预发货退货入库</el-radio-button>
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
                    <el-button @click="createInbound">新建</el-button>
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
                inboundConfig:{
                    inboundNo: "",
                    pn: 1,
                    ps: 50,
                    // sorts: [
                    //     {
                    //         orderBy: "",
                    //         orderType: "",
                    //     }
                    // ],
                    inboundTypeDictCode: null
                },

                searchId:1,

                searchOptions:[
                    {
                        label:'入库单号',
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
            getInboundData(){
                this.loadingTable=true;
                this.$ajax.post(this.$apis.get_inboundData,this.inboundConfig).then(res=>{
                    this.tableDataList = this.$getDB(this.$db.warehouse.inboundTable, res.datas,(e)=>{
                        e.entryDt.value=this.$dateFormat(e.entryDt.value,'yyyy-mm-dd');
                        e.inboundDate.value=this.$dateFormat(e.inboundDate.value,'yyyy-mm-dd');
                        e.updateDt.value=this.$dateFormat(e.updateDt.value,'yyyy-mm-dd');
                        return e;
                    });
                    this.loadingTable=false;
                }).catch(err=>{
                    this.loadingTable=false;
                });
            },

            //新建入库单
            createInbound(){
                this.$windowOpen({
                    url:'/sellerWarehouse/createInbound'
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
                    url:'/sellerWarehouse/inboundDetail',
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
            this.getInboundData();
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