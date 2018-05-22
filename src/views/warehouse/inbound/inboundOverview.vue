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
                    <el-radio-button v-for="v in inboundType" :key="v.id" :label="v.value">{{v.label}}</el-radio-button>
                </el-radio-group>
                <select-search
                        class="search"
                        @inputEnter="searchInbound"
                        v-model="searchId"
                        :options="searchOptions"></select-search>
            </div>
            <div class="section">
                <v-table
                        :loading="loadingTable"
                        :data="tableDataList"
                        :buttons="[{label: '详情', type: 1}]"
                        @change-checked="changeChecked"
                        @action="btnClick">
                    <template slot="header">
                        <div class="btns">
                            <el-button>{{$i.warehouse.download}}({{selectList.length===0?'All':selectList.length}})</el-button>
                            <el-button @click="createInbound">新建</el-button>
                        </div>
                    </template>
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
                inboundType:[],         //入库类型
                tableDataList:[],
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
                    inboundTypeDictCode: ''
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
            changeStatus(){
                this.getInboundData();
            },

            //获取表格数据
            getInboundData(){
                this.loadingTable=true;
                this.$ajax.post(this.$apis.get_inboundData,this.inboundConfig).then(res=>{
                    this.tableDataList = this.$getDB(this.$db.warehouse.inboundOverviewTable, res.datas,e=>{
                        e.inboundDate.value=this.$dateFormat(e.inboundDate.value,'yyyy-mm-dd');
                        e.entryDt.value=this.$dateFormat(e.entryDt.value,'yyyy-mm-dd');
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
                    url:'/warehouse/createInbound'
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
                    url:'/warehouse/inboundDetail',
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
            this.$ajax.post(this.$apis.get_partUnit,['IBD_TYPE']).then(res=>{
                this.inboundType=res[0].codes;
                this.inboundType.forEach(v=>{
                    if(v.value==='1'){
                        v.label=this.$i.warehouse.purchaseInbound;
                    }else if(v.value==='2'){
                        v.label=this.$i.warehouse.checkInbound;
                    }else if(v.value==='3'){
                        v.label=this.$i.warehouse.customerReturnInbound;
                    }else if(v.value==='4'){
                        v.label=this.$i.warehouse.preDeliveryInbound;
                    }
                })
            });
        },
        watch:{
            selectList(n){

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

    .head .search{
        float: right;
    }
    .section{
        margin-top: 10px;
    }
</style>