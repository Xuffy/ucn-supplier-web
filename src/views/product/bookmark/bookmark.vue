<template>
    <div class="bookmark">
        <div class="title">
            <span>Product Bookmark</span>
            <el-button class="title-btn"
                       @click="switchDisplay"
                       type="text">{{btnInfo}}
            </el-button>
        </div>
        <div>
            <el-form ref="productFormTop" :model="productForm" :rules="productFormRules" label-width="190px">
                <el-row class="speZone">
                    <el-col v-if="v.isDefaultShow && v.belongPage==='sellerProductOverview'" v-for="v in $db.product.buyerBasic" :key="v.key" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item :prop="v.key" :label="v.label">
                            <drop-down v-model="productForm[v.key]" v-if="v.showType==='dropdown'" :list="dropData" :defaultProps="defaultProps" ref="dropDown" :expandOnClickNode="false"></drop-down>
                            <el-input v-if="v.showType==='input'" size="mini" v-model="productForm[v.key]"></el-input>
                            <el-select class="speSelect" v-if="v.showType==='select'" size="mini" v-model="productForm[v.key]" placeholder="不限">
                                <el-option
                                        v-for="item in v.options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                </el-row>
            </el-form>
        </div>
        <div class="body" :class="{hide:hideBody}">
            <el-form ref="productForm" :rule="productFormRules" :model="productForm" label-width="190px">
                <el-row class="speZone">
                    <el-col v-if="!v.isDefaultShow && v.belongPage==='sellerProductOverview'" v-for="v in $db.product.buyerBasic" :key="v.key" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item :prop="v.key" :label="v.label">
                            <drop-down v-if="v.showType==='dropdown'" class="" :list="dropData" ref="dropDown"></drop-down>
                            <el-input v-if="v.showType==='input'" size="mini" v-model="productForm[v.key]"></el-input>
                            <el-select class="speSelect" v-if="v.showType==='select'" size="mini" v-model="productForm[v.key]" placeholder="请选择">
                                <el-option
                                        v-for="item in v.options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                            <div v-if="v.showType==='exwNumber'" class="section-number">
                                <el-input size="mini" class="section-input" v-model="productForm.minExwPrice"></el-input>
                                <div class="section-line">--</div>
                                <el-input size="mini" class="section-input" v-model="productForm.maxExwPrice"></el-input>
                            </div>
                            <div v-if="v.showType==='fobNumber'" class="section-number">
                                <el-input size="mini" class="section-input" v-model="productForm.minFobPrice"></el-input>
                                <div class="section-line">--</div>
                                <el-input size="mini" class="section-input" v-model="productForm.maxFobPrice"></el-input>
                            </div>
                            <el-input v-if="v.showType==='number'" size="mini" v-model="productForm[v.key]"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="btn-group">
            <el-button @click="search" :loading="disabledSearch" type="primary">{{$i.product.search}}</el-button>
            <el-button @click="clear" type="info" plain>{{$i.product.clear}}</el-button>
        </div>
        <div class="footer">
            <div class="btns">
                <el-button @click="createInquiry">{{$i.product.createInquiry}}</el-button>
                <el-button @click="createOrder">{{$i.product.createOrder}}</el-button>
                <el-button @click="compare" :disabled="disabledCompare">{{$i.product.compare}}</el-button>
                <el-button @click="addProduct">{{$i.product.addNewProductEn}}</el-button>
                <el-button @click="manuallyAddProduct">{{$i.product.manuallyAdd}}</el-button>
                <el-button>{{$i.product.download+'('+downloadBtnInfo+')'}}</el-button>
                <el-button @click="deleteBookmark" :loading="disableClickDelete" :disabled="disabledRemove" type="danger">{{$i.product.delete}}</el-button>
                <el-button>{{$i.product.upload}}</el-button>
                <!--<el-button type="danger">{{$i.product.delete}}</el-button>-->
            </div>

            <v-table
                    v-loading="loadingTable"
                    :data="tableDataList"
                    :buttons="[{label: 'Detail', type: 1}]"
                    @change-checked="changeChecked"
                    @action="btnClick"></v-table>
        </div>


        <el-dialog title="Add Product" :visible.sync="addProductDialogVisible" width="80%">
            <product
                    :forceUpdateNumber="forceUpdateNumber"
                    :title="addProductTitle"
                    :type="addProductType"
                    :disabledOkBtn="disabledOkBtn"
                    :hideBtn="true"
                    @handleCancel="handleCancel"
                    @handleOK="handleOkClick"></product>
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
    import {dropDownSingle} from '@/components/index'
    import sectionNumber from '../../product/sectionNumber'
    import product from '../addProduct'

    export default {
        name: "overview",
        components:{
            dropDown:dropDownSingle,
            sectionNumber,
            VTable,
            product
        },

        data(){
            return{
                hideBody:true,            //是否显示body
                btnInfo:this.$i.product.advanced,     //按钮默认文字显示
                disabledSearch:false,
                loadingTable:false,                     //是否让table处于加载状态
                selectList:[],
                downloadBtnInfo:'All',
                //btn禁用状态
                disabledCompare:true,
                disabledRemove:true,
                addProductDialogVisible:false,      //新增产品弹出框显示隐藏
                addProductTitle:'',
                addProductType:'product',
                disabledOkBtn:false,
                disableClickDelete:false,
                forceUpdateNumber:11,               //改变数值以驱动内部更新
                disabledOrderList:[],               //不能添加到order的list
                dialogFormVisible:false,
                //表格字段绑定
                productForm: {
                    categoryId: null,
                    nameCnLike: "",
                    readilyAvailable: null,
                    customerSkuCodeLike: "",
                    minExwPrice: '',
                    maxExwPrice: '',
                    codeLike: "",
                    nameEnLike: "",
                    minFobPrice: '',
                    maxFobPrice: '',
                    materialEnLike: "",
                    country: null,
                    supplierNameLike: "",
                    outerCartonMethodEnLike: "",
                    methodPkgEnLike: "",
                    deliveryDates: null,
                    descEnLike: "",
                    descCnLike: "",

                    pn: 1,
                    ps: 50,

                    recycle: false,         //是否是在recycle bin里请求
                    //初始搜索的时候不传，当有筛选条件之后再传
                    // operatorFilters: [
                    //     {
                    //         operator: "",
                    //         property: "",
                    //         value: {}
                    //     }
                    // ],

                    //初始搜索的时候不传，当有筛选条件之后再传
                    // sorts: [
                    //     {
                    //         orderBy: "",
                    //         orderType: "",
                    //     }
                    // ],
                },
                //表格验证参数
                productFormRules:{
                    nameCn: [
                        { max: 10, message: `长度在 3 到 10 个字符`, trigger: 'blur' }
                    ],
                },

                //Category下拉组件数据
                dropData:[],
                defaultProps:{
                    label:'name',
                    children:'children'
                },

                //底部table数据
                tableDataList:[],
                dataColumn:[]
            }
        },
        methods:{
            //切换body的收缩展开状态
            switchDisplay(){
                this.hideBody=!this.hideBody;
            },

            //清除填写的表格数据
            clear(){
                this.$refs['productFormTop'].resetFields();
                this.$refs['productForm'].resetFields();
                this.$set(this.productForm,'categoryId','');
                this.$set(this.productForm,'minExwPrice','');
                this.$set(this.productForm,'maxExwPrice','');
                this.$set(this.productForm,'minFobPrice','');
                this.$set(this.productForm,'maxFobPrice','');
            },

            //搜查
            search(){
                this.disabledSearch=true;

                if(!this.productForm.maxExwPrice){
                    this.productForm.maxExwPrice=null;
                }else{
                    this.productForm.maxExwPrice=Number(this.productForm.maxExwPrice);
                }
                if(!this.productForm.minExwPrice){
                    this.productForm.minExwPrice=null;
                }else{
                    this.productForm.minExwPrice=Number(this.productForm.minExwPrice);
                }
                if(!this.productForm.maxFobPrice){
                    this.productForm.maxFobPrice=null;
                }else{
                    this.productForm.maxFobPrice=Number(this.productForm.maxFobPrice);
                }
                if(!this.productForm.minFobPrice){
                    this.productForm.minFobPrice=null;
                }else{
                    this.productForm.minFobPrice=Number(this.productForm.minFobPrice);
                }

                this.$ajax.post(this.$apis.get_buyerBookmarkList,this.productForm).then(res=>{
                    // res.datas.forEach(v=>{
                    //     if(v.status===0){
                    //         v.status='下架(暂时中文)';
                    //     }else if(v.status===1){
                    //         v.status='上架';
                    //     }
                    // });
                    this.tableDataList = this.$getDB(this.$db.product.indexTable, res.datas);
                    this.disabledSearch=false;
                    this.selectList=[];
                }).catch(err=>{
                    this.disabledSearch=false;
                });

            },

            handleChange(value) {
                console.log(value);
            },

            //切换check状态
            changeChecked(e){
                this.selectList=e;
            },

            //emit数据
            postData(){
                this.$emit('handleOK',this.selectList);
            },
            cancel(){
                this.$emit('handleCancel');
            },

            //获取类别数据
            getCategoryId(){
                this.$ajax.get(this.$apis.getCategory,{}).then(res=>{
                    this.dropData=res;
                }).catch(err=>{
                    console.log(err)
                });
            },

            //获取table数据
            getData() {
                this.$ajax.post(this.$apis.get_buyerBookmarkList,{
                    recycle:false,
                    ps:100
                }).then(res=>{
                    this.tableDataList = this.$getDB(this.$db.product.indexTable, res.datas);
                }).catch(err=>{
                    console.log(err)
                });
            },

            handleOkClick(e){
                if(e.length===0){
                    //表示一个都没选
                    this.$message({
                        message: '请选择一条商品',
                        type: 'warning'
                    });
                }else{
                    this.disabledOkBtn=true;

                    this.$ajax.post(this.$apis.add_buyerBookmark,e).then(res=>{
                        this.$ajax.post(this.$apis.get_buyerBookmarkList,{
                            recycle:false
                        }).then(res=>{
                            this.tableDataList = this.$getDB(this.$db.product.indexTable, res.datas);
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            });
                            this.disabledOkBtn=false;
                            this.addProductDialogVisible=false;
                        }).catch(err=>{
                            console.log(err)
                        });
                    }).catch(err=>{
                        console.log(err)
                        this.disabledOkBtn=false;
                        this.addProductDialogVisible=false;
                    });
                }
            },

            //处理取消
            handleCancel(){
                this.addProductDialogVisible=false;
            },
            /**
             * 按钮组操作
             * */

            //表格按钮点击
            btnClick(item){
                if(!item._disabled){
                    this.$windowOpen({
                        url:'/product/bookmarkDetail',
                        params:{
                            id:item.skuId.value
                        }
                    })
                }
            },

            createInquiry(){

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


            compare(){
                let id='';
                this.selectList.forEach((v,k)=>{
                    let item=_.findWhere(v,{key:'skuId'});
                    if(k===this.selectList.length-1){
                        id+=item.value;
                    }else{
                        id+=(item.value+',');
                    }
                });

                this.$windowOpen({
                    url:'product/compareDetail/{type}',
                    params:{
                        type:'new',
                        id:id,
                    }
                });
            },

            addProduct(){
                this.forceUpdateNumber=Math.random();
                this.addProductDialogVisible=true;
            },
            manuallyAddProduct(){
                this.$windowOpen({
                    url:'/product/bookmarkManuallyAdd'
                });
            },
            deleteBookmark(){
                this.$confirm('是否确认删除？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let id=[];
                    this.disableClickDelete=true;
                    this.loadingTable=true;
                    this.selectList.forEach(v=>{
                        id.push(v.id.value);
                    });
                    this.$ajax.post(this.$apis.delete_buyerProductBookmark,id).then(res=>{
                        this.selectList=[];
                        this.$ajax.post(this.$apis.get_buyerBookmarkList,{
                            recycle:false
                        }).then(res=>{
                            this.tableDataList = this.$getDB(this.$db.product.indexTable, res.datas);
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.disableClickDelete=false;
                            this.loadingTable=false;
                        }).catch(err=>{
                            this.disableClickDelete=false;
                            this.loadingTable=false;
                        });
                    });

                }).catch(() => {

                });



            },

        },
        created(){
            this.getData();
            this.getCategoryId();
        },

        watch:{
            hideBody(n){
                if(n){
                    this.btnInfo=this.$i.product.advanced;
                }else{
                    this.btnInfo=this.$i.product.hideTheAdvanced;
                }
            },
            selectList(n){
                if(n.length===0){
                    this.downloadBtnInfo='All';
                    this.disabledRemove=true;
                }else{
                    this.downloadBtnInfo=n.length;
                    this.disabledRemove=false;
                }

                if(n.length>=2){
                    this.disabledCompare=false;
                }else{
                    this.disabledCompare=true;
                }
            }
        }
    }
</script>

<style scoped>
    .bookmark{
        padding-right: 20px;
    }

    .title{
        font-weight: bold;
        font-size: 18px;
        height: 32px;
        line-height: 32px;
        color:#666666;
    }

    .title-btn{
        float: right;
        margin-right: 5px;
    }

    .head-list{

    }
    .head-list label{
        width: 190px;
        display: inline-block;
        height: 42px;
        line-height: 42px;
        text-align: right;
        font-size: 14px;
        color:#606266;
        padding: 0 12px 0 0;
        box-sizing: border-box;
        float: left;
    }
    .head-list .content{
        margin-left: 190px;
        height: 42px;
    }
    .head-list .content >>> input{
        height: 42px;
    }


    .speZone >>> label{

    }
    .speZone >>> input{

    }

    .section-number{

    }
    .section-number .section-input{
        float: left;
        width: 40%;
    }
    .section-number .section-line{
        float: left;
    }

    .outGroup{

    }
    .outGroup .label{
        width: 190px;
        float: left;
    }

    .body{
        overflow: hidden;
        max-height: 320px;
        display: block;
        transition: max-height .5s cubic-bezier(.445,.05,.55,.95);
    }
    .body .numberInput{
        width: 80px;
        text-align: left;
    }
    .body .numberInput >>> input{
        padding: 0;
    }
    .hide{
        max-height: 0;
    }

    .form-spelist{
        margin-bottom: 10px !important;
    }
    .form-spelist >>> .ivu-form-item-content{
        line-height: normal;
    }

    .form-list{
        margin-bottom: 10px;
    }


    .speSelect{
        width: 100%;
    }




    .btn-group{
        text-align: center;
        margin-top: 10px;
        padding-bottom: 15px;
        border-bottom: 1px solid #e0e0e0;
    }
    .btn-group .search{
        margin-right: 30px;
    }

    .footer{

    }
    .footer .btns{
        padding: 10px 0;
    }
    .footer-btn{
        text-align: center;
    }
</style>
