<template>
    <div class="compare-overview">
        <div class="title">
            <span>{{$i.product.compareOverview}}</span>
        </div>
        <div class="btns">
            <el-button>{{$i.product.download+' ('+downloadBtnInfo+')'}}</el-button>
            <el-button @click="deleteCompare" :disabled="disableDelete" :loading="disableClickDeleteBtn" type="danger">{{$i.product.delete}}</el-button>
            <select-search
                    :options="searchOptions"
                    @inputEnter="searchCompare"
                    class="search"></select-search>
        </div>

        <v-table
                v-loading="loadingTable"
                class="speTable"
                :data="tableDataList"
                :buttons="[{label:'Modify',type:1},{label: 'Detail', type: 2}]"
                @action="btnClick"
                @change-checked="changeChecked"></v-table>

    </div>
</template>
<script>
    import {dropDown} from '@/components/index'
    import selectSearch from '@/components/common/fnCompon/selectSearch'
    import VTable from '@/components/common/table/index'

    export default {
        name: '',
        components: {
            dropDown,
            selectSearch,
            VTable
        },
        data() {
            return {
                /**
                 * 页面基本配置
                 * */
                loadingTable:false,         //是否让表格处于loading状态
                disableDelete:true,
                tableDataList:[],
                selectList:[],
                downloadBtnInfo:'All',
                disableClickDeleteBtn:false,
                searchOptions:[
                    {
                        label:'Compare Name',
                        id:1
                    },
                    {
                        label:'Compare Item',
                        id:2
                    },
                ],
                queryParam:{
                    name: '',
                    compareItem:'',
                    // operatorFilters: [
                    //     {
                    //         columnName: "",
                    //         operator: "",
                    //         property: "",
                    //     }
                    // ],
                    pn: 1,
                    ps: 50,
                    recycle: false,
                    // sorts: [
                    //     {
                    //         orderBy: "",
                    //         orderType: "",
                    //     }
                    // ]
                }
            }
        },
        methods: {
            selectChange() {

            },
            hiddenDropDown() {
                this.showdropDown = !this.showdropDown
            },

            //获取data数据
            getList() {
                this.$ajax.post(this.$apis.get_compareList,this.queryParam).then(res=>{
                    this.tableDataList = this.$getDB(this.$db.product.compareTable, res.datas,(e)=>{
                        e.updateDt.value=this.$dateFormat(e.updateDt.value,'yyyy-mm-dd');
                        return e;
                    });
                    this.selectList=[];
                    this.loadingTable=false;
                }).catch(err=>{
                    this.loadingTable=false;
                });
            },


            //table操作
            pageChange(page) {
                console.log(page)
            },
            getSort(val, key) {
                console.log(val, key)
            },

            btnClick(e,type){
                if(type===1){
                    //modify
                    this.$windowOpen({
                        url:'/product/compareDetail/{type}',
                        params:{
                            type:'modify',
                            isModify:true,
                            compareId:e.id.value,
                            compareName:e.name.value
                        },
                    });
                }else if(type===2){
                    //Detail
                    this.$windowOpen({
                        url:'/product/compareDetail/{type}',
                        params:{
                            type:'modify',
                            compareId:e.id.value,
                            compareName:e.name.value
                        },
                    });
                }
            },

            changeChecked(e){
                this.selectList=e;
            },

            //搜索compare
            searchCompare(e){
                this.loadingTable=true;
                if(e.keyType===1){
                    //compareName
                    this.queryParam.compareItem='';
                    this.queryParam.name=e.key;
                    this.getList();
                }else if(e.keyType===2){
                    //compareItem
                    this.queryParam.name='';
                    this.queryParam.compareItem=e.key;
                    this.getList();
                }
            },

            //删除选中的compare，加入到recycle bin
            deleteCompare(){
                this.$confirm('是否确认删除？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let id=[];
                    this.disableClickDeleteBtn=true;
                    this.selectList.forEach(v=>{
                        id.push(v.id.value);
                    });
                    this.$ajax.post(this.$apis.delete_buyerProductCompare,id).then(res=>{
                        this.getList();
                        this.$message({
                            type: 'success',
                            message: 'successfully delete!'
                        });
                        this.disableClickDeleteBtn=false;
                    }).catch(err=>{
                        this.disableClickDeleteBtn=false;
                    });

                }).catch(() => {

                });
            },

        },
        created(){
            this.getList();
        },
        watch:{
            selectList(n){
                if(n.length>0){
                    this.disableDelete=false;
                    this.downloadBtnInfo=n.length;
                }else{
                    this.disableDelete=true;
                    this.downloadBtnInfo='All';
                }
            }
        }
    }

</script>
<style lang="less" scoped>
    .compare-overview {

        .title{
            font-weight: bold;
            font-size: 18px;
            height: 32px;
            line-height: 32px;
            color:#666666;
        }
        .btns{
            .search{
                float: right;
            }
        }
        .speTable{
            margin-top: 10px;
        }



    }

</style>
