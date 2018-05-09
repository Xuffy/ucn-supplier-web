<template>
    <div class="inbound-overview">
        <div class="title">
            <span>{{$i.warehouse.qcOverview}}</span>
        </div>
        <div class="body">
            <div class="head">
                <span>{{$i.warehouse.status}}</span>
                <el-radio-group class="radioGroup" @change="changeStatus" v-model="qcOrderConfig.qcStatusDictCode" size="mini">
                    <el-radio-button label="">{{$i.warehouse.all}}</el-radio-button>
                    <el-radio-button v-for="v in qcStatusOption" :key="v.id" :label="v.code">{{v.label}}</el-radio-button>
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
                            <el-button>{{$i.warehouse.download}}({{selectList.length?selectList.length:'All'}})</el-button>
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
                loadingTable:false,
                qcOrderStatus:'0',
                tableDataList:[],
                downloadBtnInfo:'All',
                selectList:[],
                qcStatusOption:[],
                qcOrderConfig:{
                    pn: 1,
                    ps: 50,
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
                ]
            }
        },
        methods:{
            changeStatus(){
                this.getQcData();
            },

            //获取表格数据
            getQcData(){
                this.loadingTable=true;
                this.$ajax.post(this.$apis.get_qcOrderData,this.qcOrderConfig).then(res=>{
                    this.tableDataList = this.$getDB(this.$db.warehouse.qcOverview, res.datas);
                    this.loadingTable=false;
                }).catch(err=>{
                    this.loadingTable=false;
                });
            },


            searchInbound(e){
                if(!e.keyType){
                    return this.$message({
                        message: '请选择搜索类别',
                        type: 'warning'
                    });
                }else{
                    this.qcOrderConfig.qcOrderNo=e.key;
                    this.getQcData();
                }
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


            /**
             * 字典获取
             * */
            getUnit(){
                this.$ajax.post(this.$apis.get_partUnit,['QC_STATUS'],{_cache:true}).then(res=>{
                    this.qcStatusOption=res[0].codes;
                    this.qcStatusOption.forEach(v=>{
                        if(v.code==='1'){
                            v.label='已验货';
                        }else if(v.code==='2'){
                            v.label='待验货';
                        }
                    })
                }).catch(err=>{

                });
            },
        },
        created(){
            this.getQcData();
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