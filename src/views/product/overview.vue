<template>
    <div class="bookmark">
        <div class="title">
            <span>{{$i.product.title}}</span>
            <el-button class="title-btn"
                       @click="switchDisplay"
                       type="text">{{btnInfo}}
            </el-button>
        </div>
        <div>
            <el-form ref="productFormTop" :model="productForm" :rules="productFormRules" label-width="190px">
                <el-row class="speZone">
                    <el-col v-if="v.isDefaultShow && v.belongPage==='sellerProductOverview'" v-for="v in $db.product.overview" :key="v.key" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item :prop="v.key" :label="v.label">
                            <drop-down v-model="productForm[v.key]" v-if="v.showType==='dropdown'" :list="categoryList" :defaultProps="defaultProps"
                                       ref="dropDown" :expandOnClickNode="false"></drop-down>
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
                    <el-col v-if="!v.isDefaultShow && v.belongPage==='sellerProductOverview'" v-for="v in $db.product.overview" :key="v.key" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
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
                <el-button @click="addNewProduct">{{$i.product.addNewProduct}}</el-button>
                <el-button :disabled="disabledDeleteGoods" @click="setUp">{{$i.product.setUp}}</el-button>
                <el-button :disabled="disabledDeleteGoods" @click="setDown">{{$i.product.setDown}}</el-button>
                <el-button>{{$i.product.downloadSelected}}({{selectList.length?selectList.length:'All'}})</el-button>
                <el-button @click="deleteGood" :disabled="disabledDeleteGoods" type="danger">{{$i.product.delete}}</el-button>
            </div>

            <v-table
                    :loading="loadingTable"
                    :data="tableDataList"
                    :buttons="[{label: 'Detail', type: 1}]"
                    @change-checked="changeChecked"
                    @action="btnClick"></v-table>
        </div>

        <el-dialog
                class="speDialog"
                title="提示"
                :visible.sync="partDialogVisible"
                width="30%">
            <span>当前所选有上架产品，是否下架该产品?</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="partDialogVisible = false">取 消</el-button>
                <el-button @click="putdownExcept" type="primary">跳过上架产品</el-button>
                <el-button type="primary" @click="partDialogVisible = false">下架产品</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import VTable from '@/components/common/table/index'
    import {dropDownSingle} from '@/components/index'
    import sectionNumber from '../product/sectionNumber'

    export default {
        name: "overview",
        components:{
            dropDown:dropDownSingle,
            sectionNumber,
            VTable
        },
        props:{

        },
        data(){
            return{
                loadingTable:false,
                partDialogVisible:false,       //弹出框显示隐藏
                allDialogVisible:false,        //弹出框显示隐藏
                hideBody:true,            //是否显示body
                btnInfo:this.$i.product.advanced,     //按钮默认文字显示
                disabledSearch:false,                 //是否禁止搜索，默认false
                disabledDeleteGoods:true,             //默认没有选中商品的时候是不能点击删除的
                //表格字段绑定
                productForm: {
                    categoryId: '',
                    codeLike: "",
                    country: '',
                    customerSkuCodeLike: "",
                    deliveryDates: '',
                    descCnLike: "",
                    descEnLike: "",
                    materialEnLike: "",
                    maxExwPrice: '',
                    maxFobPrice: '',
                    methodPkgEnLike: "",
                    minExwPrice: '',
                    minFobPrice: '',
                    nameCnLike: "",
                    // nameCustomerLike: "",    没有发现这个字段
                    nameEnLike: "",
                    //初始搜索的时候不传，当有筛选条件之后再传
                    // operatorFilters: [
                    //     {
                    //         operator: "",
                    //         property: "",
                    //         value: {}
                    //     }
                    // ],
                    outerCartonMethodEnLike: "",
                    pn: 1,
                    ps: 50,
                    readilyAvailable: true,
                    recycle: false,             //recycleBin里传true,其他地方传false
                    //初始搜索的时候不传，当有筛选条件之后再传
                    // sorts: [
                    //     {
                    //         orderBy: "",
                    //         orderType: "",
                    //     }
                    // ],
                    supplierNameLike: "",
                },
                //表格验证参数
                productFormRules:{
                    nameCnLike: [
                        { max: 10, message: `长度在 3 到 10 个字符`, trigger: 'blur' }
                    ],
                },
                defaultProps:{
                    label:'name',
                    children:'children'
                },
                //Category下拉组件数据
                categoryList:[
                    {
                        id:123,
                        name:"系统分类",
                        children:[],
                        _disableClick:true,
                    },
                    {
                        id:5125,
                        name:"自己的分类",
                        children:[],
                        _disableClick:true,
                    },
                ],

                //表格选中的条目
                selectList:[],

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

            //表格check状态变更时触发事件
            changeChecked(e){
                this.selectList=e;
            },

            //清除填写的表格数据
            clear(){
                this.$refs.dropDown[0].selectedList=[];
                this.$refs['productFormTop'].resetFields();
                this.$refs['productForm'].resetFields();
                this.$set(this.productForm,'minExwPrice','');
                this.$set(this.productForm,'maxExwPrice','');
                this.$set(this.productForm,'minFobPrice','');
                this.$set(this.productForm,'maxFobPrice','');
            },

            //搜索
            search(){
                this.disabledSearch=true;
                this.loadingTable=true;
                this.$ajax.post(this.$apis.get_productList,this.productForm).then(res=>{
                    res.datas.forEach(v=>{
                        if(v.status===0){
                            v.status='下架';
                        }else if(v.status===1){
                            v.status='上架';
                        }
                    });
                    this.tableDataList = this.$getDB(this.$db.product.overviewTable, res.datas);
                    this.disabledSearch=false;
                    this.loadingTable=false;
                }).catch(err=>{
                    this.disabledSearch=false;
                    this.loadingTable=false;
                });

            },

            handleChange(value) {
                console.log(value);
            },

            //获取table数据
            getData() {
                this.loadingTable=true;
                this.$ajax.post(this.$apis.get_productList,{
                    recycle:false,
                }).then(res=>{
                    // res.datas.forEach(v=>{
                    //     if(v.status===0){
                    //         v.status='下架';
                    //     }else if(v.status===1){
                    //         v.status='上架';
                    //     }
                    // });
                    this.tableDataList = this.$getDB(this.$db.product.overviewTable, res.datas,e=>{
                        if(e.status.value===0){
                            e.status.value='下架';
                        }else if(e.status.value===1){
                            e.status.value='上架';
                        }

                        e.yearListed.value=this.$dateFormat(e.yearListed.value,'yyyy-mm-dd');
                        return e;
                    });
                    this.selectList=[];
                    this.loadingTable=false;
                }).catch(err=>{
                    this.loadingTable=false;
                });
            },

            //获取类别数据
            getCategoryId(){
                this.$ajax.get(this.$apis.get_buyer_sys_category,{}).then(res=>{
                    this.categoryList[0].children=res;
                }).catch(err=>{

                });
                this.$ajax.get(this.$apis.get_buyer_my_category,{}).then(res=>{
                    this.categoryList[1].children=res;
                }).catch(err=>{

                });
            },

            //表格按钮点击
            btnClick(item){
                this.$windowOpen({
                    url:'/product/detail',
                    params:{
                        id:item.id.value
                    }
                })
            },

            //设为上架
            setUp(){
                let id=[];
                this.selectList.forEach(v=>{
                    id.push(v.id.value);
                });
                this.$ajax.post(this.$apis.set_sellerProductPutAway,id).then(res=>{
                    this.getData();
                    this.$message({
                        message: '上架成功',
                        type: 'success'
                    });
                }).catch(err=>{

                });
            },

            //设为下架
            setDown(){
                let id=[];
                this.selectList.forEach(v=>{
                    id.push(v.id.value);
                });
                this.$ajax.post(this.$apis.set_sellerProductPutDown,id).then(res=>{
                    this.getData();
                    this.$message({
                        message: '下架成功',
                        type: 'success'
                    });
                }).catch(err=>{

                });
            },

            //删除商品
            deleteGood(){
                this.$confirm('确定删除选中商品?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let hasUp=false;            //是否有上架商品，默认为false
                    this.selectList.forEach(v=>{
                        if(v.status.value==='上架'){
                            hasUp=true;
                        }
                    })
                    if(hasUp){
                        this.partDialogVisible=true;
                    }else{
                        this.$message({
                            message: '删除成功，被删除的产品可在回收站中找回',
                            type: 'success'
                        });
                    }
                }).catch(() => {

                });
            },

            //删除商品(跳过上架产品,只删除选中的列表中已经下架的商品)
            putdownExcept(){
                let id=[];
                this.selectList.forEach(v=>{
                    if(v.status.value==='下架'){
                        id.push(v.id.value);
                    }
                });
                if(id.length===0){
                    //当前没有已经下架了的产品
                    this.$message({
                        message: '当前选择中没有已下架的产品',
                        type: 'warning'
                    });
                    this.partDialogVisible=false;
                }else{
                    // this.$ajax.post(this.$apis.set_sellerProductPutDown,id).then(res=>{
                    //     this.getData();
                    // }).catch(err=>{
                    //
                    // });
                }
            },

            //表格check状态改变
            handleCheckChange(e){
                console.log(e)
            },

            check(e){
                console.log(e)
            },

            addNewProduct(){
                this.$windowOpen({
                    url:'/product/addNewProduct'
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
                if(n.length>=1){
                    this.disabledDeleteGoods=false;
                }else{
                    this.disabledDeleteGoods=true;
                }
            }
        }
    }
</script>

<style scoped>
    .speDropDown{
        height: 32px;
    }
    .speDropDown >>> .checkInputBox{
        height: 28px;
    }
    .speDropDown >>> .checkInputBox .dataBox{
        height: 28px;
        line-height: 28px;
    }



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
    .speDialog >>> .el-dialog__footer{
        text-align: center;
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
</style>
