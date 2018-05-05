<template>
    <div class="compare-overview">
        <div class="title">
            <span>{{$i.product.compareDetail}}</span>
        </div>
        <div class="name">
            <span>Compare Name</span>
            <el-input
                    :disabled="$route.params.type==='modify' && !isModify"
                    size="mini"
                    class="compare-name"
                    placeholder="please input"
                    v-model="compareName">
            </el-input>
        </div>
        <div class="btns" v-show="hasLoading">
            <span v-if="$route.params.type==='new'">
                <el-button>{{$i.product.createInquiry}}</el-button>
                <el-button @click="createOrder">{{$i.product.createOrder}}</el-button>
                <el-button @click="addNewProduct">{{$i.product.addNew}}</el-button>
                <el-button @click="deleteProduct" :disabled="disableDelete" type="danger">{{$i.product.delete}}</el-button>
            </span>
            <span v-if="$route.params.type==='modify'">
                <el-button v-if="!isModify">{{$i.product.createInquiry}}</el-button>
                <el-button @click="createOrder" v-if="!isModify">{{$i.product.createOrder}}</el-button>

                <el-button v-if="!isModify" @click="modifyCompare">Modify</el-button>

                <el-button v-if="isModify" @click="addNewProduct">{{$i.product.addNew}}</el-button>
                <el-button v-if="isModify" @click="deleteProduct" :disabled="disableDelete" type="danger">{{$i.product.delete}}</el-button>
            </span>
            <el-checkbox-group v-model="screenTableStatus" class="compare-checkbox">
                <el-checkbox label="1">{{$i.product.hideTheSame}}</el-checkbox>
                <el-checkbox label="2">{{$i.product.highlightTheDifferent}}</el-checkbox>
            </el-checkbox-group>
        </div>

        <v-table
                v-loading="loadingTable"
                :data="tableDataList"
                :buttons="[{label: 'Detail', type: 1}]"
                @action="btnClick"
                @change-checked="changeChecked"></v-table>

        <div class="footBtn">
            <div v-if="$route.params.type==='new'">
                <el-button @click="saveCompare" :loading="disabledSaveCompare" type="primary">{{$i.product.saveTheCompare}}</el-button>
            </div>
            <div v-if="$route.params.type==='modify'">
                <el-button v-if="!isModify" @click="deleteCompare" :loading="disabledSaveCompare" :disabled="allowDeleteCompare" type="danger">{{$i.product.deleteTheCompare}}</el-button>
                <el-button @click="saveModify" :loading="disableClickSaveModify" :disabled="allowBottomClick" type="primary" v-if="isModify">Save</el-button>
                <el-button :disabled="allowBottomClick" :loading="disableClickCancel" @click="cancelModify" v-if="isModify">Cancel</el-button>
            </div>
        </div>

        <el-dialog title="Add Product" :visible.sync="addProductDialogVisible" width="80%">

            <el-tabs v-model="addProductTabName" type="card" @tab-click="handleClick">
                <el-tab-pane label="Add From Product" name="1">
                    <product
                            :isInModify="$route.params.type==='modify'?true:false"
                            :disabledOkBtn="false"
                            :hideBtn="true"
                            :disabledLine="disabledLine"
                            :forceUpdateNumber="forceUpdateNumber"
                            @handleOK="handleOkClick"
                            @handleCancel="handleCancel"></product>
                </el-tab-pane>
                <el-tab-pane label="Add From Bookmark" name="2">
                    <product
                            :isInModify="$route.params.type==='modify'?true:false"
                            :disabledOkBtn="false"
                            :hideBtn="true"
                            :type="'bookmark'"
                            :disabledLine="disabledLine"
                            :forceUpdateNumber="forceUpdateNumber"
                            @handleOK="handleOkClick"
                            @handleCancel="handleCancel"></product>
                </el-tab-pane>
            </el-tabs>


        </el-dialog>

        <el-dialog title="以下商品不能添加order" :visible.sync="dialogFormVisible" width="50%">
            <el-table
                    :data="disabledOrderList"
                    border
                    style="width: 100%">
                <el-table-column
                        label="#"
                        width="180">
                    <template slot-scope="scope">
                        {{scope.$index+1}}
                    </template>
                </el-table-column>
                <el-table-column
                        :label="$i.product.skuNameEn"
                        width="180">
                    <template slot-scope="scope">
                        {{scope.row.nameEn.value}}
                    </template>
                </el-table-column>
                <el-table-column
                        :label="$i.product.skuCode">
                    <template slot-scope="scope">
                        {{scope.row.code.value}}
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import VTable from '@/components/common/table/index'
    import product from '../addProduct'


    export default {
        name: "compare",
        components:{
            VTable,
            product
        },
        data(){
            return{
                forceUpdateNumber:1,
                compareName:'',         //对比的名称
                screenTableStatus:[],   //表格筛选状态
                tableDataList:[],       //表格数据展示
                addProductTitle:'哇哈哈',
                totalDataList:[],       //因为要分页，所以先取一个全部数据
                disabledLine:[],        //在弹出框中默认置灰不能操作的条目
                selectList:[],          //保存选择的数剧
                disabledOrderList:[],   //不能添加到order的数据
                isModify:false,         //是否处于编辑状态，默认为false
                hasLoading:false,       //加载完成才让按钮显示出来
                //弹出框显示状态
                addProductDialogVisible:false,
                dialogFormVisible:false,
                addProductTabName:'1',
                loadingTable:false,
                //btns状态
                disabledSaveCompare:false,
                disableDelete:true,            //是否禁止删除
                allowDeleteCompare:true,      //是否可以点击delete，在数据还没加载完的时候不能点击
                allowBottomClick:true,          //是否禁止点击底部操作按钮
                disableClickCancel:false,
                disableClickSaveModify:false,

                isChangeData:false,             //是否在最原始的基础上modify过数据
            }
        },
        methods:{
            getList() {
                if(this.$route.params.type==='new'){
                    //表示是新建detail还未保存
                    let id=[];
                    this.$route.query.id.split(',').forEach(v=>{
                        id.push(Number(v));
                    });
                    let time=new Date();
                    this.compareName=this.$dateFormat(time,'yyyymmdd')+Date.parse(time);
                    this.$ajax.post(this.$apis.get_skuListByIds,id).then(res=>{
                        this.tableDataList = this.$getDB(this.$db.product.indexTable, res,(e)=>{
                            if(e.status.value===1){
                                e.status.value='上架';
                            }else if(e.status.value===0){
                                e.status.value='下架';
                            }
                            return e;
                        });
                        this.hasLoading=true;
                        this.disabledLine=this.tableDataList;
                    }).catch(err=>{

                    });
                }
                else if(this.$route.params.type==='modify'){
                    //表示这里已经生成对应的compare单，直接获取该单数据即可
                    this.compareName=this.$route.query.compareName;
                    if(this.$route.query.isModify){
                        this.isModify=true;
                    }
                    let params={
                        id: Number(this.$route.query.compareId),
                        // operatorFilters: [
                        //     {
                        //         "columnName": "string",
                        //         "operator": "string",
                        //         "property": "string",
                        //         "resultMapId": "string",
                        //         "value": {}
                        //     }
                        // ],
                        pn: 1,
                        ps: 100,
                        recycle: false,
                        // sorts: [
                        //     {
                        //         orderBy: "string",
                        //         orderType: "string",
                        //     }
                        // ]
                    };
                    this.$ajax.post(this.$apis.get_buyerProductCompareDetail,params).then(res=>{
                        this.tableDataList = this.$getDB(this.$db.product.indexTable, res.datas,(e)=>{
                            if(e.status.value===1){
                                e.status.value='上架';
                            }else if(e.status.value===0){
                                e.status.value='下架';
                            }
                            return e;
                        });
                        this.hasLoading=true;
                        this.disabledLine=this.tableDataList;
                        this.allowDeleteCompare=false;
                        this.allowBottomClick=false;
                    }).catch(err=>{

                    });
                }
            },

            btnClick(e){
                let id;
                if(this.$route.params.type==='new'){
                    id=e.id.value;
                }else if(this.$route.params.type==='modify'){
                    id=e.skuId.value;
                }
                if(e.bookmarkId.value){
                    //跳bookmark detail
                    this.$windowOpen({
                        url:'/product/bookmarkDetail',
                        params:{
                            id:id
                        }
                    })
                }else{
                    //跳product detail
                    this.$windowOpen({
                        url:'/product/sourcingDetail',
                        params:{
                            id:id
                        }
                    })
                }
            },

            changeChecked(e){
                this.selectList=e;
            },

            //编辑单子
            modifyCompare(){
                this.isModify=true;
            },

            //取消编辑
            cancelModify(){
                this.disableClickCancel=true;
                this.loadingTable=true;
                this.compareName=this.$route.query.compareName;
                let params={
                    id: Number(this.$route.query.compareId),
                    // operatorFilters: [
                    //     {
                    //         "columnName": "string",
                    //         "operator": "string",
                    //         "property": "string",
                    //         "resultMapId": "string",
                    //         "value": {}
                    //     }
                    // ],
                    pn: 1,
                    ps: 100,
                    recycle: false,
                    // sorts: [
                    //     {
                    //         orderBy: "string",
                    //         orderType: "string",
                    //     }
                    // ]
                };
                this.$ajax.post(this.$apis.get_buyerProductCompareDetail,params).then(res=>{
                    this.tableDataList = this.$getDB(this.$db.product.indexTable, res.datas,(e)=>{
                        if(e.status.value===1){
                            e.status.value='上架';
                        }else if(e.status.value===0){
                            e.status.value='下架';
                        }
                        return e;
                    });
                    this.hasLoading=true;
                    this.disabledLine=this.tableDataList;
                    this.allowDeleteCompare=false;
                    this.allowBottomClick=false;

                    //额外操作
                    this.isModify=false;
                    this.disableClickCancel=false;
                    this.loadingTable=false;
                }).catch(err=>{
                    this.disableClickCancel=false;
                    this.loadingTable=false;
                });



            },

            //勾选的商品创建order
            createOrder(){
                this.disabledOrderList=[];
                this.selectList.forEach(v=>{
                    //如果customerCreate值为true,那么就代表是用户自己创建的不能添加到order
                    if(v.customerCreate.value){
                        this.disabledOrderList.push(v);
                    }
                });
                if(this.disabledOrderList.length>0){
                    console.log(this.disabledOrderList)
                    this.dialogFormVisible=true;
                }else{

                }
            },

            //新增product
            addNewProduct(){
                this.addProductDialogVisible=true;
                this.forceUpdateNumber=Math.random();
            },

            //删除product
            deleteProduct(){
                this.$confirm('确定删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.selectList.forEach(v=>{
                        let id=_.findWhere(v,{key:'id'}).value;
                        this.tableDataList.forEach(m=>{
                            let newId=_.findWhere(m,{key:'id'}).value;
                            if(id===newId){
                                this.$set(m,'_disabled',true);
                                this.$set(m,'_checked',false);
                            }
                        })
                    });
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.$nextTick(()=>{
                        this.disableDelete=true;
                        this.disabledLine=[];
                        this.selectList=[];
                        this.tableDataList.forEach(v=>{
                            if(!v._disabled){
                                this.disabledLine.push(v);
                            }
                        });
                    });
                }).catch(() => {

                });
            },

            handleOkClick(e){
                //如果总条数>100，则进行提示
                let totalLen=0;
                this.tableDataList.forEach(v=>{
                    if(!v._disabled){
                        totalLen++;
                    }
                });
                if(totalLen+e.length>100){
                    this.$message({
                        message: '警告哦，这是一条警告消息',
                        type: 'warning'
                    });
                }else{
                    //现在跑出来的东西只是一个productId数组
                    console.log(e,'抛出的数据')
                    if(this.$route.params.type==='new'){
                        //在新建状态的情况下，直接拿id重新请求获取表格数据
                        let id=[];
                        this.tableDataList.forEach(v=>{
                            id.push(v.id.value);
                        });
                        e.forEach(v=>{
                            id.push(v);
                        });
                        this.loadingTable=true;
                        this.$ajax.post(this.$apis.get_skuListByIds,id).then(res=>{
                            this.tableDataList = this.$getDB(this.$db.product.indexTable, res,(e)=>{
                                if(e.status.value===1){
                                    e.status.value='上架';
                                }else if(e.status.value===0){
                                    e.status.value='下架';
                                }
                                return e;
                            });
                            this.hasLoading=true;
                            this.disabledLine=this.tableDataList;
                            this.loadingTable=false;
                        }).catch(err=>{
                            this.loadingTable=false;
                        });
                    }
                    else if(this.$route.params.type==='modify'){
                        //modify状态下，要把拿出来的数据先进行对比，对比之后没有的再请求接口塞进去
                        //如果丢出来的数据的id有table里面产品的id，则把这个id对于的商品从置灰还原
                        console.log(this.tableDataList,'table')
                        let ids=[];
                        this.tableDataList.forEach(v=>{
                            if(!v._disabled){
                                if(!this.isChangeData){
                                    ids.push(v.skuId.value);
                                }else{
                                    ids.push(v.id.value);
                                }
                            }
                        });
                        e.forEach(v=>{
                            ids.push(v);
                        });
                        this.loadingTable=true;
                        this.$ajax.post(this.$apis.get_skuListByIds,ids).then(res=>{
                            this.tableDataList = this.$getDB(this.$db.product.indexTable, res,(e)=>{
                                if(e.status.value===1){
                                    e.status.value='上架';
                                }else if(e.status.value===0){
                                    e.status.value='下架';
                                }
                                e.skuId.value=e.id.value;       //把id的值给skuId
                                return e;
                            });
                            this.hasLoading=true;
                            this.isChangeData=true;
                            this.disabledLine=this.tableDataList;
                            this.loadingTable=false;
                        }).catch(err=>{
                            this.loadingTable=false;
                        });

                        console.log(ids,'ids')
                    }
                }
                this.addProductDialogVisible=false;
            },

            handleCancel(){
                this.addProductDialogVisible=false;
            },

            //保存该compare list
            saveCompare(){
                if(!this.compareName){
                    this.$message({
                        message: 'Please Input Compare Name',
                        type: 'warning'
                    });
                    return;
                }
                this.disabledSaveCompare=true;
                let params={
                    compares: [],
                    name: this.compareName
                };
                console.log(this.tableDataList,'this.tableDataList')
                this.tableDataList.forEach(v=>{
                    let id,name;
                    if(v.speProduct){
                        if(_.findWhere(v,{key:'skuId'}).value){
                            id=_.findWhere(v,{key:'skuId'}).value;
                        }else{
                            id=_.findWhere(v,{key:'id'}).value;
                        }
                    }else{
                        id=_.findWhere(v,{key:'id'}).value;
                    }
                    name=_.findWhere(v,{key:'nameEn'}).value;
                    params.compares.push({
                        id:id,
                        name:name
                    });
                });
                this.$ajax.post(this.$apis.add_buyerProductCompare,params).then(res=>{
                    let compareId=res;
                    this.$router.push({
                        name:'productCompareDetail',
                        params:{
                            type:'modify'
                        },
                        query:{
                            compareId:compareId,
                            compareName:this.compareName
                        }
                    });
                    this.disabledSaveCompare=false;
                }).catch(err=>{
                    this.disabledSaveCompare=false;
                });
            },

            //删除该compare
            deleteCompare(){
                this.$confirm('确认删除该compare?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.disabledSaveCompare=true;
                    let id=[];
                    id.push(Number(this.$route.query.compareId));
                    this.$ajax.post(this.$apis.delete_buyerProductCompare,id).then(res=>{
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.disabledSaveCompare=false;
                        this.$router.push('/product/compare');
                    }).catch(err=>{
                        this.disabledSaveCompare=false;
                    });
                }).catch(() => {

                });
            },

            //保存修改
            saveModify(){
                this.disableClickSaveModify=true;
                let params={
                    compares: [],
                    id: Number(this.$route.query.compareId),
                    name: this.compareName
                };
                this.tableDataList.forEach(v=>{
                    if(!v._disabled){
                        let id='';
                        if(!this.isChangeData){
                            id=v.skuId.value;
                        }else{
                            id=v.id.value;
                        }
                        params.compares.push({
                            id:id,
                            name:v.nameEn.value
                        });
                    }
                });
                this.$ajax.post(this.$apis.update_buyerProductCompare,params).then(res=>{
                    this.$router.push({
                        name:'productCompareDetail',
                        params:{
                            type:'modify',
                        },
                        query:{
                            compareId:this.$route.query.compareId,
                            compareName:this.compareName,
                            forceChange:Math.random().toFixed(3)
                        }
                    });
                    this.disableClickSaveModify=false;
                }).catch(err=>{
                    this.disableClickSaveModify=false;
                });
            },


            handleClick(e){
                e.isActive=!e.isActive;
                this.keylist.forEach(v=>{
                    if(v.isActive){
                        this.selectList.push(v);
                    }
                });
            },

            //切换tab页
            handleClick(){

            },
        },
        created(){
            this.getList();
        },
        watch:{
            selectList(n){
                let len=0;
                this.tableDataList.forEach(v=>{
                    if(!v._disabled){
                        len++;
                    }
                });

                if(n.length>0 && (len-n.length)>=2){
                    this.disableDelete=false;
                }else{
                    this.disableDelete=true;
                }
            }
        },
    }
</script>

<style scoped>
    .compare-overview{

    }
    .title{
        font-weight: bold;
        font-size: 18px;
        height: 32px;
        line-height: 32px;
        color:#666666;
    }
    .name{
        padding: 15px 0;
    }
    .name span{
        font-size: 14px;
    }
    .compare-name{
        display: inline-block;
        width: 250px;
        margin-left: 10px;
    }
    .compare-checkbox{
        display: inline-block;
    }
    .footBtn{
        margin-top: 10px;
        border-top: 1px solid #e0e0e0;
        height: 40px;
        line-height: 40px;
        background-color: #ffffff;
        position: sticky;
        left: 0;
        bottom: 0;
        width: 100%;
    }

</style>