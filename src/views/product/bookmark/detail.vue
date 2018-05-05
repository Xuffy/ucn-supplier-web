<template>
    <div class="Details">
        <div class="head">
            <div class="title">
                {{productForm.nameEn}}
            </div>
            <div class="detail head-detail" v-loading="notLoadingDone">
                <el-row>
                    <el-col :span="6">
                        <el-carousel class="banner" :autoplay="false" indicator-position="none" arrow="always" trigger="click" height="150px">
                            <el-carousel-item v-for="item in 3" :key="item">
                                <img src="../../../assets/images/login-back.jpg" style="width: 100%" alt="">
                            </el-carousel-item>
                        </el-carousel>
                    </el-col>
                    <el-col :span="18">
                        <el-form :modal="productForm" ref="sourcingDetail" label-width="190px">
                            <el-row>
                                <el-col  v-for="v in $db.product.buyerDetailTop" :key="v.key" class="list" :xs="24" :sm="v.fullLine?24:12" :md="v.fullLine?24:12" :lg="v.fullLine?24:12" :xl="v.fullLine?24:12">
                                    <el-form-item :prop="v.key" :label="v.label +' :'">
                                        <span v-if="v.key==='incoterm'">
                                            FOB
                                        </span>
                                        <span v-else>
                                            <span v-if="v.key==='incotermArea'">
                                                {{fobPort}}
                                            </span>
                                            <span v-if="v.key==='incotermPrice'">
                                                {{fobPrice}}
                                            </span>
                                            <span v-if="v.key==='status'">
                                                {{productForm[v.key]===1?'上架':'下架'}}
                                            </span>
                                            <span v-else>
                                                {{productForm[v.key]}}
                                            </span>
                                        </span>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                    </el-col>
                </el-row>
                <div class="btns" v-show="!notLoadingDone" v-if="notEdit">
                    <el-button>{{$i.product.createInquiry}}</el-button>
                    <el-button>{{$i.product.createOrder}}</el-button>
                    <el-button @click="addCompare">{{$i.product.addToCompare}}</el-button>
                    <el-button @click="editProduct">{{$i.product.editEn}}</el-button>
                    <el-button type="danger" :loading="disableClickDelete" @click="deleteBookmark">{{$i.product.delete}}</el-button>
                    <el-button @click="addProduct">{{$i.product.addNewProductEn}}</el-button>
                    <el-button @click="manuallyAddProduct">{{$i.product.manuallyAdd}}</el-button>
                    <el-button>{{$i.product.downloadTheProduct}}</el-button>
                    <el-button>{{$i.product.uploadProduct}}</el-button>
                </div>
                <div class="btns" v-else>
                    <el-button @click="saveEdit" :loading="disabledClickSaveEdit" type="primary">{{$i.product.ok}}</el-button>
                    <el-button @click="cancelEdit">{{$i.product.cancel}}</el-button>
                </div>
            </div>
        </div>
        <div class="body">
            <el-tabs v-model="tabName" type="border-card" @tab-click="handleClick">
                <el-tab-pane :label="$i.product.basicInformation" name="Basic Info">
                    <el-form class="speForm" label-width="300px" :label-position="labelPosition">
                        <el-row>
                            <el-row>
                                <el-col v-if="v.belongTab==='basicInfo'" v-for="v in $db.product.detailTab" :key="v.key" class="list" :xs="24" :sm="24" :md="v.fullLine?24:12" :lg="v.fullLine?24:12" :xl="v.fullLine?24:12">
                                    <el-form-item :prop="v.key" :label="v.label+' :'">
                                        <div v-if="v.key==='status'">
                                           {{productForm[v.key]===1?'上架':'下架'}}
                                        </div>
                                        <div v-else>
                                            <div v-if="v.key==='descCustomer'">
                                                <el-input
                                                        :disabled="notEdit"
                                                        type="textarea"
                                                        autosize
                                                        placeholder="please input"
                                                        v-model="productForm[v.key]">
                                                </el-input>
                                            </div>
                                            <div v-else>
                                                <div v-if="v.key==='customerSkuCode' || v.key==='nameCustomer'">
                                                    <el-input :disabled="notEdit" v-model="productForm[v.key]" placeholder="please input"></el-input>
                                                </div>
                                                <div v-else>
                                                    {{productForm[v.key]}}
                                                </div>
                                            </div>
                                        </div>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-row>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane :label="$i.product.customerInfo" name="Customer Info">
                    <el-form class="speForm" label-width="290px" :label-position="labelPosition">
                        <el-row>
                            <el-col v-if="v.belongTab==='customerInfo'" v-for="v in $db.product.detailTab" :key="v.key" class="list" :xs="24" :sm="24" :md="v.fullLine?24:12" :lg="v.fullLine?24:12" :xl="v.fullLine?24:12">
                                <el-form-item :label="v.label+':'">
                                    {{productForm[v.key]}}
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane :label="$i.product.priceInfo" name="Price Info">
                    <v-table
                            class="tabVtable"
                            :selection="false"
                            :data="tableData"></v-table>
                </el-tab-pane>
                <el-tab-pane :label="$i.product.packingInfo" name="Packing Info">
                    <el-form class="speForm" label-width="300px" :label-position="labelPosition">
                        <el-row>
                            <el-col v-if="v.belongTab==='packingInfo'" v-for="v in $db.product.detailTab" :key="v.key" class="list" :xs="24" :sm="24" :md="v.fullLine?24:12" :lg="v.fullLine?24:12" :xl="v.fullLine?24:12">
                                <el-form-item :label="v.label+':'">
                                    {{productForm[v.key]}}
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane :label="$i.product.logisticInfo" name="Logistic">
                    <el-form class="speForm" label-width="280px" :label-position="labelPosition">
                        <el-row>
                            <el-col v-if="v.belongTab==='logisticInfo'" v-for="v in $db.product.detailTab" :key="v.key" class="list" :xs="24" :sm="24" :md="v.fullLine?24:12" :lg="v.fullLine?24:12" :xl="v.fullLine?24:12">
                                <el-form-item :label="v.label+':'">
                                    {{productForm[v.key]}}
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane :label="$i.product.otherInfo" name="Other Info">
                    <el-form class="speForm" label-width="310px" :label-position="labelPosition">
                        <el-row>
                            <el-col v-if="v.belongTab==='otherInfo'" v-for="v in $db.product.detailTab" :key="v.key" class="list" :xs="24" :sm="24" :md="v.fullLine?24:12" :lg="v.fullLine?24:12" :xl="v.fullLine?24:12">
                                <el-form-item :label="v.label+':'">
                                    {{productForm[v.key]}}
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane :label="$i.product.tradeHistory" name="History">
                    <span style="color:red">暂时接口还没做</span>
                </el-tab-pane>
                <el-tab-pane :label="$i.product.attachment" name="Attachment">

                </el-tab-pane>
                <el-tab-pane :label="$i.product.remark" name="Remark">
                    <!--<add-table-->
                    <!--:get_url="getRemarkUrl"-->
                    <!--:id="parseInt($route.query.id)"></add-table>-->
                    <div>
                        <el-button @click="createRemark" type="primary" size="mini">{{$i.product.add}}</el-button>
                    </div>
                    <br>
                    <el-table
                            :data="remarkTableData"
                            border
                            style="width: 100%">
                        <el-table-column
                                prop="remark"
                                :label="$i.product.remark"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="operatorName"
                                :label="$i.product.operator"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="operatorDate"
                                :label="$i.product.time"
                                align="center">
                            <template slot-scope="scope">
                                {{$dateFormat(scope.row.operatorDate,'yyyy-mm-dd hh:mm:ss')}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                fixed="right"
                                :label="$i.product.action"
                                align="center">
                            <template slot-scope="scope">
                                <el-button @click="editRemark(scope.$index, scope.row)" type="text" size="small">{{$i.product.modify}}</el-button>
                                <el-button @click="deleteRemark(scope.$index, scope.row)" type="text" size="small">{{$i.product.delete}}</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <br>
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage1"
                            :page-sizes="[100, 200, 300, 400]"
                            :page-size="100"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="400">
                    </el-pagination>
                    <el-dialog title="新增备注" :visible.sync="addRemarkFormVisible" center width="500px">
                        <el-form :model="addRemarkData">
                            <el-form-item label="备注:" :label-width="formLabelWidth">
                                <el-input
                                        type="textarea"
                                        :rows="4"
                                        placeholder="请输入内容"
                                        v-model="addRemarkData.remark">
                                </el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button :loading="disableCreateRemark" type="primary" @click="createRemarkSubmit">提交</el-button>
                            <el-button @click="addRemarkFormVisible = false">取 消</el-button>
                        </div>
                    </el-dialog>
                </el-tab-pane>
            </el-tabs>
        </div>
        <compare-list
                v-if="showCompareList"
                :data="compareData"
                @clearData="clearData"
                @goCompare="goCompare"
                @closeTag="handleClose"></compare-list>


        <el-dialog title="修改备注" :visible.sync="editRemarkFormVisible" center width="500px">
            <el-form :model="editRemarkData">
                <el-form-item label="备注:" :label-width="formLabelWidth">
                    <el-input
                            type="textarea"
                            :rows="4"
                            placeholder="请输入内容"
                            v-model="editRemarkData.remark">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button :loading="disableModifyRemark" type="primary" @click="editRemarkSubmit">提交</el-button>
                <el-button @click="editRemarkFormVisible = false">取 消</el-button>
            </div>
        </el-dialog>

        <el-dialog title="Add Product" :visible.sync="addProductDialogVisible" width="80%">
            <product
                    :forceUpdateNumber="forceNumber"
                    :title="addProductTitle"
                    :type="addProductType"
                    :disabledOkBtn="disabledOkBtn"
                    :hideBtn="true"
                    @handleCancel="handleCancel"
                    @handleOK="handleOkClick"></product>
        </el-dialog>
    </div>
</template>

<script>
    import VTable from '@/components/common/table/index'
    import addTable from '../addlineTable'
    import compareList from '../compareList'
    import product from '../addProduct'

    export default {
        name: "detail",
        components:{
            addTable,
            compareList,
            VTable,
            product
        },
        data(){
            return{
                /**
                 * 页面配置
                 * */
                notEdit:true,          //是否不在编辑状态,默认为true
                value1: 0,
                tabName:'Basic Info',
                labelPosition:'left',               //文字靠边参数，left或者right
                notLoadingDone:true,
                addProductDialogVisible:false,      //新增产品弹出框显示隐藏
                addProductTitle:'',
                addProductType:'product',
                disabledOkBtn:false,
                disabledClickSaveEdit:false,
                disableClickDelete:false,
                forceNumber:0,
                editRemarkFormVisible:false,
                disableModifyRemark:false,

                editRemarkData:{
                    id: null,
                    remark: "",
                    skuId: 0,
                },

                productForm:{
                    id: null,                         //新增传空
                    pic: "thisIsAPicture",
                    status: null,                      //0下架 1上架
                    nameEn: "",
                    barcode: "",                    //产品条码
                    nameCn: "",
                    descEn: "",
                    descCn: "",
                    descCustomer: "",
                    nameCustomer: "",
                    customerSkuCode: "",
                    supplierCode: "",
                    supplierName: "",
                    code: "",                       //新增时系统生成，传空
                    unit: "2",
                    formation: "",
                    materialEn: "",
                    materialCn: "",
                    colourEn: "",
                    colourCn: "",
                    minOrderQty: 1,
                    deliveryDates: 1,               //交期(做完需要多少天)
                    design: "",
                    noneSellCountry: 1,             //禁售国家，暂时传1
                    applicableAge: 1,
                    expireDates: 1,
                    expireUnit: 1,                  //保质期单位，暂时传1
                    comments: "",
                    readilyAvailable: 1,
                    availableQty: 1,
                    mainSaleCountry: 1,
                    mainSaleArea: "",
                    productionDates: 1,             //开发时间
                    qualityStander: "",
                    yearListed: "2018-02-23",
                    useDisplayBox: 1,
                    displayBoxQty: 0,
                    otherPackInfoCn: "",
                    otherPackInfoEn: "",
                    adjustPackage: 2,
                    lengthWidthHeight: "",
                    recycle: 2,
                    categoryId: '',                      //类型id
                    rateValueAddedTax: 1,               //增值税率
                    taxRefundRate: 1,
                    customsCode: "",
                    customsNameCn: "",
                    customsNameEn: "",
                    tradeMarkCn: "",
                    tradeMarkEn: "",
                    commodityInspectionCn: "",
                    commodityInspectionEn: "",
                    declareElement: "",
                    origin: "",
                    inspectQuarantineCategory: "",      //检疫类别
                    brand: "",
                    brandRemark: "",
                    brandRelated: "",
                    certificat: "",
                    gp20SkuQty: 0,
                    gp40SkuQty: 0,
                    hq40SkuQty: 0,
                    tryDimension: 1,                    //托盘尺寸？？？
                    skuQtyPerTray: 0,
                    specialTransportRequire: "",
                    inventoryCostMethod: "",
                    warehourceDefault: "",
                    inventory: 0,
                    safeInventory: 0,
                    minInventory: 0,
                    unitWeight: 1,                      //重量单位,暂时传1
                    unitLength: 1,                      //长度单位,暂时传1
                    unitVolume: 1,                      //提及单位，暂时传1
                    length: 0,
                    width: 0,
                    height: 0,
                    netWeight: 0,
                    volume: 0,
                    methodPkgCn: "",
                    methodPkgEn: "",
                    innerCartonUnit: "",                //中包单位
                    innerCartonQty: 0,
                    innerCartonLength: 0,
                    innerCartonWidth: 0,
                    innerCartonHeight: 0,
                    innerCartonWeightNet: 0,
                    innerCartonRoughWeight: 0,
                    innerCartonVolume: 0,
                    innerCartonDesc: "",
                    innerCartonMethodCn: "",
                    innerCartonMethodEn: "",
                    outerCartonUnit: "",                //外箱单位
                    outerCartonDesc: "",
                    innerCartonOuterNum: 0,
                    outerCartonQty: 0,
                    outerCartonLength: 0,
                    outerCartonWidth: 0,
                    outerCartonHeight: 0,
                    outerCartonNetWeight: 0,
                    outerCartonRoughWeight: 0,
                    outerCartonVolume: 0,
                    outerCartonMethodCn: "",
                    outerCartonMethodEn: "",
                    oem: 1,
                    logisticId: 1,
                    version: 1,
                    pkgId: 1,
                    price: [
                        {
                            fobCurrency: 1,
                            fobPrice: 1,                    //价格起始是多少
                            fobPort: "",
                            exwPrice: 1,                    //价格起始是多少
                            exwCurrency: 1,
                            otherIncoterm: 1,
                            otherIncotermPrice: 1,
                            otherIncotermArea: '',
                            otherIncotermCurrency: 1,
                            status: 1                       //1成本价，2基础报价
                        },
                        {
                            fobCurrency: 1,
                            fobPrice: 1,
                            fobPort: "",
                            exwPrice: 1,
                            exwCurrency: 1,
                            otherIncoterm: 1,
                            otherIncotermPrice: 1,
                            otherIncotermArea: '',
                            otherIncotermCurrency: 1,
                            status: 2
                        },
                    ]
                },
                //三个copy字段
                copyDescCustomer:'',
                copyNameCustomer:'',
                copyCustomerSkuCode:'',

                //特别取出来显示的几个变量
                fobPort:'',
                fobPrice:'',
                //用于展示的table数据
                tableData:[],

                /**
                 * compareList配置
                 * */
                showCompareList:false,      //是否显示比较列表
                compareData:[

                ],

                /**
                 * remark data
                 * */
                formLabelWidth:'50px',
                remarkTableData:[],
                addRemarkData:{
                    id: null,
                    remark: "",
                    skuId: 0,
                },
                currentPage1:1,
                addRemarkFormVisible:false,
                disableCreateRemark:false,      //是否禁用提交按钮
            }
        },
        methods:{
            /**
             * 中间按钮组事件
             * */
            editProduct(){
                this.tabName='Basic Info';
                this.notEdit=false;
                this.copyCustomerSkuCode=this.productForm.customerSkuCode;
                this.copyDescCustomer=this.productForm.descCustomer;
                this.copyNameCustomer=this.productForm.nameCustomer;
            },

            saveEdit(){
                let params={
                    customerCode: "",
                    descCustomer: "",
                    id: null,
                    nameCustomer: "",
                };
                params.nameCustomer=this.productForm.nameCustomer;
                params.id=this.productForm.id;
                params.descCustomer=this.productForm.descCustomer;
                params.customerCode=this.productForm.customerSkuCode;
                this.disabledClickSaveEdit=true;
                this.$ajax.post(this.$apis.edit_buyerProductBookmark,params).then(res=>{
                    this.notEdit=true;
                    this.disabledClickSaveEdit=false;
                    this.$message({
                        message: 'Edit Successfully!',
                        type: 'success'
                    });
                }).catch(err=>{
                    this.disabledClickSaveEdit=false;
                });
            },



            cancelEdit(){
                this.notEdit=true;
                this.productForm.customerSkuCode=this.copyCustomerSkuCode;
                this.productForm.descCustomer=this.copyDescCustomer;
                this.productForm.nameCustomer=this.copyNameCustomer;
            },

            //删除bookmark
            deleteBookmark(){
                this.$confirm('是否确认删除？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.disableClickDelete=true;
                    this.$ajax.post(this.$apis.delete_buyerProductBookmark,[this.productForm.id]).then(res=>{
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.disableClickDelete=false;
                        this.$router.push('/product/bookmark');
                    }).catch(err=>{
                        this.disableClickDelete=false;
                        this.$message.error('delete failed!');
                    });

                }).catch(() => {

                });

            },
            //新增product
            addProduct(){
                this.forceNumber=Math.random();
                this.addProductDialogVisible=true;
            },
            manuallyAddProduct(){
                this.$windowOpen({
                    url:'/product/bookmarkManuallyAdd'
                });
            },

            handleCancel(){
                this.addProductDialogVisible=false;
            },

            handleOkClick(e){
                if(e.length===0){
                    //表示一个都没选
                    this.$message({
                        message: '请选择一条商品',
                        type: 'warning'
                    });
                }else{
                    let id=[];
                    e.forEach(v=>{
                        id.push(v.id.value);
                    });
                    this.disabledOkBtn=true;
                    this.$ajax.post(this.$apis.add_buyerBookmark,id).then(res=>{
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                        this.disabledOkBtn=false;
                        this.addProductDialogVisible=false;
                    }).catch(err=>{
                        console.log(err)
                        this.disabledOkBtn=false;
                        this.addProductDialogVisible=false;
                    });
                }
            },

            handleClick(){
                //切换tab页
            },

            getTableData(){
                this.$ajax.get(this.$apis.get_buyerProductDetail,{
                    id:Number(this.$route.query.id)
                }).then(res=>{
                    this.productForm=res;
                    this.notLoadingDone=false;
                }).catch(err=>{
                    this.notLoadingDone=false;
                })
            },

            /**
             *  remark操作
             * */
            getRemarkData(){
                this.$ajax.post(this.$apis.get_buyerRemarkList,{
                    id:Number(this.$route.query.id),
                    pn: 1,
                    ps: 50,
                }).then(res=>{
                    this.remarkTableData=res.datas;
                });
            },

            editRemark(index,row){
                this.editRemarkData.id=row.id;
                this.editRemarkData.skuId=this.productForm.id;
                this.editRemarkData.remark=row.remark;
                this.editRemarkFormVisible=true;
            },

            //确定编辑remark
            editRemarkSubmit(){
                this.disableModifyRemark=true;
                this.$ajax.post(this.$apis.update_buyerProductRemark,this.editRemarkData)
                    .then(res=>{
                        this.$ajax.post(this.$apis.get_buyerRemarkList,{
                            id:Number(this.$route.query.id),
                            pn: 1,
                            ps: 50,
                        }).then(res=>{
                            this.remarkTableData=res.datas;
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                            this.disableModifyRemark=false;
                            this.editRemarkFormVisible=false;
                        });
                    }).catch(err=>{
                    this.disableModifyRemark=false;
                    this.editRemarkFormVisible=false;
                });
            },


            handleSizeChange(e){

            },
            handleCurrentChange(e){

            },
            createRemark(){
                this.addRemarkFormVisible=true;
                this.addRemarkData.id=null;     //新增的时候要置为null
                this.addRemarkData.skuId=this.productForm.id;
                this.addRemarkData.remark='';

            },
            createRemarkSubmit(){
                this.disableCreateRemark=true;
                this.$ajax.post(this.$apis.add_buyerProductRemark,this.addRemarkData).then(res=>{
                    this.disableCreateRemark=false;
                    this.addRemarkFormVisible=false;
                    this.$message({
                        message: '新增成功',
                        type: 'success'
                    });
                    this.getRemarkData();
                }).catch(err=>{
                    this.disableCreateRemark=false;
                    this.addRemarkFormVisible=false;
                });

            },
            deleteRemark(index, row){
                this.$confirm('确定删除该备注?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$ajax.post(this.$apis.delete_buyerProductRemark,{
                        id:row.id
                    }).then(res=>{
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getRemarkData();
                    }).catch(err=>{
                        console.log(err)
                    });
                }).catch(() => {

                });
            },

            //添加比较
            addCompare(){
                this.showCompareList=true;
                let compareList=this.$localStore.get('compareProductList');
                let hasAdd=false;
                if(!compareList){
                    compareList=[];
                }
                compareList.forEach(v=>{
                    if(v.id===this.productForm.id){
                        //代表该商品已经添加了
                        hasAdd=true;
                    }
                });
                if(hasAdd){
                    this.$message({
                        message: '该商品已经添加到列表了',
                        type: 'warning'
                    });
                }else{
                    compareList.push({
                        name:this.productForm.nameEn,
                        id:this.productForm.id
                    });
                    this.compareData=compareList;
                    this.$localStore.set('compareProductList',compareList)
                }
            },

            addToBookmark(){

                this.$ajax.post(this.$apis.add_buyerBookmark,[this.productForm.id]).then(res=>{
                    console.log(res)
                }).catch(err=>{
                    console.log(err)
                });



                // this.$router.push({
                //     path:'/product/bookmark/detail',
                //     query:{
                //
                //     }
                // });
            },

            /**
             * compare-list操作
             * */
            getCompareList(){
                let data=this.$localStore.get('compareProductList');
                if(!data){
                    this.compareData=[];
                }else{
                    this.compareData=data;
                }
            },
            handleClose(e){
                let key;
                this.compareData.forEach((v,k)=>{
                    if(v.id===e.id){
                        key=k;
                    }
                });
                this.compareData.splice(key,1);
                this.$localStore.set('compareProductList',this.compareData);
            },

            //去比较
            goCompare(){
                let data=this.$localStore.get('compareProductList');
                let id='';
                data.forEach((v,k)=>{
                    if(k===data.length-1){
                        id+=v.id;
                    }else{
                        id+=(v.id+',');
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

            //清空数据
            clearData(){
                this.$localStore.remove('compareProductList');
                this.compareData=[];
            },
        },
        created(){
            this.getTableData();
            this.getRemarkData();
            this.getCompareList();
        },
    }
</script>

<style scoped>
    .Details{
        background-color: #f4f4f4;
    }
    .Details .head{
        background-color: #FFFFFF;
        padding:0 20px;

    }
    .Details .head .title{
        position: relative;
        height: 40px;
        line-height: 40px;
        font-weight: bold;
        font-size: 18px;
        color:#666666;
    }

    .Details .head .title .btn{
        position: absolute;
        right: 10px;
        top:4px;
    }
    .Details .head .detail{
        margin-top: 8px;
    }
    .Details .head .detail .carousel-img{
        height: 170px;
    }
    .Details .head .detail .carousel-img img{
        width: 100%;
        height: 100%;
    }
    .Details .head .detail .right{
        /*padding-top: 10px;*/
    }
    .Details .head .detail .list{
        /*padding-left: 30px;*/
        /*font-size: 14px;*/
        /*line-height: 2.5;*/
        /*border-bottom: 1px dotted #e0e0e0;*/
    }
    .Details .head .detail .list >>> .el-form-item.el-form-item--small{
        margin-bottom: 6px;
    }
    .Details .head .detail .btns{
        text-align: center;
        padding: 15px 0;
    }
    .Details .head .detail .btns>Button{
        margin-right: 10px;
    }

    .Details .body{
        margin-top: 10px;
        margin-bottom: 35px;
        background-color: #FFFFFF;
    }
    .Details .body .list{
        line-height: 35px;
        font-size: 13px;
        min-height: 35px;
    }
    .Details .body .list >>> label{
        /*text-align: right;*/
    }

    .speForm .el-form-item--small.el-form-item{
        margin-bottom: 0;
    }
    .speForm .el-row .list .el-input{
        width: 80%;
    }
</style>