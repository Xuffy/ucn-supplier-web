<template>
    <div class="inbound-overview">
        <!--<div class="title">-->
            <!--<span>{{$i.warehouse.inboundOverview}}</span>-->
        <!--</div>-->
        <div class="body">
            <div class="head">
                <span>{{$i.warehouse.status}}</span>
                <el-radio-group class="radioGroup" @change="changeStatus" v-model="qcOrderStatus" size="mini">
                    <el-radio-button label="0">待验货</el-radio-button>
                    <el-radio-button label="1">已验货</el-radio-button>
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
                </div>
                <v-table
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
        name: "qcOverview",
        components:{
            selectSearch,
            VTable
        },
        data(){
            return{
                /**
                 * 页面基本配置
                 * */
                qcOrderStatus:'0',
                tableDataList:[],
                downloadBtnInfo:'All',
                selectList:[],
                qcOrderConfig:{
                    pn: 1,
                    ps: 50,
                    purchaseId: null,
                    qcOrderNo: '',
                    qcStatusDictCode: '',
                    // sorts: [
                    //     {
                    //         orderBy: "string",
                    //         orderType: "string",
                    //     }
                    // ],
                },
                searchId:1,
                searchOptions:[
                    {
                        label:'验货单号',
                        id:1
                    },
                    {
                        label:'入库单号',
                        id:2
                    },
                    {
                        label:'订单号',
                        id:3
                    },
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
                this.$ajax.post(this.$apis.get_qcOrderData,this.qcOrderConfig).then(res=>{
                    console.log(res)
                    this.tableDataList = this.$getDB(this.$db.warehouse.inboundTable, res.datas,(e)=>{
                        e.entryDt.value=this.$dateFormat(e.entryDt.value,'yyyy-mm-dd');
                        e.inboundDate.value=this.$dateFormat(e.inboundDate.value,'yyyy-mm-dd');
                        e.updateDt.value=this.$dateFormat(e.updateDt.value,'yyyy-mm-dd');
                        return e;
                    });
                }).catch(err=>{
                    console.log(err)
                });
            },


            searchInbound(e){
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