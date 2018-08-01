<template>
    <div class="Details" v-loading="loadingTable">
        <div class="head">
            <div class="title">
                {{productForm.nameCn}}
            </div>
            <div class="detail">
                <el-row>
                    <el-col :span="6">
                        <el-carousel class="banner" :autoplay="false" indicator-position="none" arrow="always" trigger="click" height="300px">
                            <el-carousel-item v-for="item in productForm.pictures" :key="item">
                                <v-image :src="item"></v-image>
                            </el-carousel-item>
                        </el-carousel>
                    </el-col>
                    <el-col :span="18">
                        <el-form :modal="productForm" ref="sourcingDetail" label-width="190px">
                            <el-row>
                                <el-col  v-for="v in $db.product.detailTop" :key="v.key" class="list" :xs="24" :sm="v.fullLine?24:12" :md="v.fullLine?24:12" :lg="v.fullLine?24:12" :xl="v.fullLine?24:12">
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
                                                {{productForm[v.key]===0?'下架':'上架'}}
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
                <div class="btns">
                    <el-button @click="editProduct">{{$i.product.edit}}</el-button>
                    <el-button :loading="disabledSetupBtn" @click="setUpDown">{{btnInfo}}</el-button>
                    <el-button @click="addNewProduct">{{$i.product.addNewProduct}}</el-button>
                    <el-button @click="()=>$refs.importCategory.show()">{{$i.product.upload}}</el-button>
                    <el-button
                            :loading="disabledDeleteBtn"
                            type="danger"
                            @click="deleteProduct">{{$i.product.delete}}</el-button>
                </div>
            </div>
        </div>
        <div class="body">
            <el-tabs v-model="tabName" type="border-card" @tab-click="handleClick">
                <el-tab-pane :label="$i.product.basicInformation" name="Basic Info">
                    <el-form class="speForm" label-width="200px" :label-position="labelPosition">
                        <el-row>
                            <el-col v-if="v.belongTab==='basicInfo'" v-for="v in $db.product.detailNewTab" :key="v.key" class="list" :xs="24" :sm="24" :md="v.fullLine?24:12" :lg="v.fullLine?24:12" :xl="v.fullLine?24:12">
                                <el-form-item :label="v.label+' :'">
                                    <span v-if="v.key==='status'">
                                        {{productForm[v.key]===1?'上架':'下架'}}
                                    </span>
                                    <span v-else>
                                        {{productForm[v.key]}}
                                    </span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane :label="$i.product.customersInfo" name="Customer Info">
                    <el-form class="speForm" label-width="290px" :label-position="labelPosition">
                        <el-row>
                            <el-col v-if="v.belongTab==='customerInfo'" v-for="v in $db.product.detailNewTab" :key="v.key" class="list" :xs="24" :sm="24" :md="v.fullLine?24:12" :lg="v.fullLine?24:12" :xl="v.fullLine?24:12">
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
                            <el-col v-if="v.belongTab==='packingInfo'" v-for="v in $db.product.detailNewTab" :key="v.key" class="list" :xs="24" :sm="24" :md="v.fullLine?24:12" :lg="v.fullLine?24:12" :xl="v.fullLine?24:12">
                                <el-form-item :label="v.label+':'">
                                    {{productForm[v.key]}}
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane :label="$i.product.logisticInfo" name="Logistic">
                    <el-form class="speForm" label-width="260px" :label-position="labelPosition">
                        <el-row>
                            <el-col v-if="v.belongTab==='logisticInfo'" v-for="v in $db.product.detailNewTab" :key="v.key" class="list" :xs="24" :sm="24" :md="v.fullLine?24:12" :lg="v.fullLine?24:12" :xl="v.fullLine?24:12">
                                <el-form-item :label="v.label+':'">
                                    {{productForm[v.key]}}
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane :label="$i.product.otherInfo" name="Other Info">
                    <el-form class="speForm" label-width="250px" :label-position="labelPosition">
                        <el-row>
                            <el-col v-if="v.belongTab==='otherInfo'" v-for="v in $db.product.detailNewTab" :key="v.key" class="list" :xs="24" :sm="24" :md="v.fullLine?24:12" :lg="v.fullLine?24:12" :xl="v.fullLine?24:12">
                                <el-form-item :label="v.label+':'">
                                    {{productForm[v.key]}}
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane :label="$i.product.tradeHistory" name="History">
                    <v-table
                            :height="500"
                            :loading="loadingHistoryTable"
                            :data="historyData">
                    </v-table>
                </el-tab-pane>
                <el-tab-pane :label="$i.product.attachment" name="Attachment">
                    <span v-if="!productForm.attachments" class="noData">{{$i.product.noData}}</span>
                    <v-upload :limit="20" readonly :list="productForm.attachments" ref="uploadAttachmemt"></v-upload>
                </el-tab-pane>
                <!--<el-tab-pane :label="$t('productSeller.page.remark')" name="Remark">-->
                    <!--<span style="color:red">暂时接口还没做</span>-->
                    <!--<add-table></add-table>-->
                <!--</el-tab-pane>-->
            </el-tabs>
        </div>

        <v-import-template ref="importCategory" code="BIZ_SKU_SUPPLIER_IMPORT" biz-code="BIZ_SKU_SUPPLIER_IMPORT" :tips="$i.product.uploadTips"></v-import-template>
    </div>
</template>

<script>
    import {VTable,VImage,VUpload,VImportTemplate} from '@/components/index'
    import addTable from '../product/addlineTable'
    import {mapActions} from 'vuex'

    export default {
        name: "detail",
        components:{
            addTable,
            VTable,
            VImage,
            VUpload,
            VImportTemplate
        },
        data(){
            return{
                value1: 0,
                tabName:'Basic Info',
                labelPosition:'left',               //文字靠边参数，left或者right
                loadingTable:false,
                loadingHistoryTable:false,
                //页面数据
                productForm:{
                    id: '',                         //新增传空
                    pictures:[],
                    status: 0,                      //0下架 1上架
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
                //特别取出来显示的几个变量
                fobPort:'',
                fobPrice:'',
                //用于展示的table数据
                tableData:[],
                //上下架按钮文字切换
                btnInfo:this.$i.product.setUp,

                //btn禁用状态组
                disabledDeleteBtn:false,
                disabledSetupBtn:false,

                currentPage1:1,

                //compareList配置
                compareConfig:{
                    showCompareList:false,      //是否显示比较列表
                },
                incotermOption:[],
                historyData:[],
                tradeHistory:{
                    pn:1,
                    ps:100,
                    skuCode:'',
                    sorts:[

                    ],
                },


                /**
                 * 字典配置
                 * */
                skuUnitOption:[],       //计量单位
                expirationOption:[],    //保质期单位
                quarantineTypeOption:[],//检疫类别
                weightOption:[],
                volumeOption:[],
                lengthOption:[],
                oemOption:[],
                udbOption:[],
                skuPkgOption:[],
                countryOption:[],
            }
        },
        methods:{
            ...mapActions(['setMenuLink']),
            handleClick(){
                //切换tab页
            },
            //获取产品详情
            getGoodsData(){
                this.loadingTable=true;
                this.$ajax.get(this.$apis.get_productDetail,{id:this.$route.query.id}).then(res=>{
                    this.productForm=res;

                    //处理国家显示
                    if(this.productForm.noneSellCountry){
                        let noneSellCountry=this.productForm.noneSellCountry.split(',');
                        this.productForm.noneSellCountry='';
                        _.map(noneSellCountry,v=>{
                            this.productForm.noneSellCountry+=(_.findWhere(this.countryOption,{code:v}).name+',');
                        });
                        this.productForm.noneSellCountry=this.productForm.noneSellCountry.slice(0,this.productForm.noneSellCountry.length-1);
                    }
                    if(this.productForm.mainSaleCountry){
                        let mainSaleCountry=this.productForm.mainSaleCountry.split(',');
                        this.productForm.mainSaleCountry='';
                        _.map(mainSaleCountry,v=>{
                            this.productForm.mainSaleCountry+=(_.findWhere(this.countryOption,{code:v}).name+',');
                        });
                        this.productForm.mainSaleCountry=this.productForm.mainSaleCountry.slice(0,this.productForm.mainSaleCountry.length-1);
                    }

                    //字典转换
                    this.productForm.unit=this.productForm.unit?_.findWhere(this.skuUnitOption,{code:String(this.productForm.unit)}).name:'';
                    this.productForm.expireUnit=this.productForm.expireUnit?_.findWhere(this.expirationOption,{code:String(this.productForm.expireUnit)}).name:'';
                    this.productForm.inspectQuarantineCategory=this.productForm.inspectQuarantineCategory?_.findWhere(this.quarantineTypeOption,{code:this.productForm.inspectQuarantineCategory}).name:'';
                    this.productForm.unitLength=this.productForm.unitLength?_.findWhere(this.lengthOption,{code:String(this.productForm.unitLength)}).name:'';
                    this.productForm.unitVolume=this.productForm.unitVolume?_.findWhere(this.volumeOption,{code:String(this.productForm.unitVolume)}).name:'';
                    this.productForm.unitWeight=this.productForm.unitWeight?_.findWhere(this.weightOption,{code:String(this.productForm.unitWeight)}).name:'';
                    this.productForm.oem=_.findWhere(this.oemOption,{code:String(Number(this.productForm.oem))}).name;
                    this.productForm.yearListed=this.$dateFormat(this.productForm.yearListed,'yyyy-mm');
                    this.productForm.useDisplayBox=_.findWhere(this.udbOption,{code:String(Number(this.productForm.useDisplayBox))}).name;
                    this.productForm.adjustPackage=_.findWhere(this.skuPkgOption,{code:String(Number(this.productForm.adjustPackage))}).name;

                    this.productForm.price.forEach(v=>{
                        if(v.status===2){
                            this.fobPort=v.fobPort;
                            this.fobPrice=v.fobPrice;
                        }
                    });
                    if(this.productForm.status===1){
                        this.btnInfo=this.$i.product.setDown;
                    }
                    else if(this.productForm.status===0){
                        this.btnInfo=this.$i.product.setUp;
                    }
                    this.tableData = this.$getDB(this.$db.product.detailPriceTable, this.productForm.price,e=>{
                        console.log(e,'e')
                        e.status._value=e.status.value===1?this.$i.warehouse.costPrice:this.$i.warehouse.basicQuotation;
                        return e;
                    });
                    this.tradeHistory.skuCode=this.productForm.sysCode;
                    this.loadingHistoryTable=true;
                    this.$ajax.post(this.$apis.get_productTradeHistory,this.tradeHistory).then(res=>{
                        if(res){
                            this.historyData=this.$getDB(this.$db.product.tradeHistory,res.datas,e=>{
                                e.incoterm._value=_.findWhere(this.incotermOption,{code:e.incoterm.value}).name;
                                e.actDeliveryDt._value=this.$dateFormat(e.actDeliveryDt.value,'yyyy-mm-dd');
                                e.confirmQcDt._value=this.$dateFormat(e.confirmQcDt.value,'yyyy-mm-dd');
                                e.actDepartureDt._value=this.$dateFormat(e.actDepartureDt.value,'yyyy-mm-dd');
                            });
                        }
                    }).finally(()=>{
                        this.loadingTable=false;
                        this.loadingHistoryTable=false;
                    });
                }).catch(err=>{
                    this.loadingTable=false;
                });
            },

            //编辑产品
            editProduct(){
                this.$windowOpen({
                    url:"/product/addNewProduct",
                    params:{
                        id:this.$route.query.id,
                        isEdit:true
                    }
                });
            },
            setUpDown(){
                let info,status,successInfo,url;
                if(this.productForm.status===1){
                    info='确定下架该商品?';
                    successInfo='下架成功';
                    status=0;
                    url=this.$apis.set_sellerProductPutDown;
                }else if(this.productForm.status===0){
                    info='确定上架该商品?';
                    successInfo='上架成功';
                    status=1;
                    url=this.$apis.set_sellerProductPutAway;
                }

                this.$confirm(info, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.disabledSetupBtn=true;

                    this.$ajax.post(url,[this.$route.query.id]).then(res=>{
                        this.disabledSetupBtn=false;
                        this.$message({
                            message: successInfo,
                            type: 'success'
                        });
                        if(status===1){
                            this.$set(this.productForm,'status',1);
                            this.btnInfo=this.$i.product.setDown;
                        }else if(status===0){
                            this.$set(this.productForm,'status',0);
                            this.btnInfo=this.$i.product.setUp;
                        }
                    }).catch(err=>{
                        this.disabledSetupBtn=false;
                    });
                }).catch(() => {

                });
            },
            addNewProduct(){
                this.$windowOpen({
                    url:"/product/addNewProduct",
                })
            },
            deleteProduct(){
                this.$confirm(this.$i.product.sureDelete, this.$i.product.prompt, {
                    confirmButtonText: this.$i.product.sure,
                    cancelButtonText: this.$i.product.cancel,
                    type: 'warning'
                }).then(() => {
                    this.disabledDeleteBtn=true;
                    this.$ajax.post(this.$apis.delete_product,{id:this.productForm.id}).then(res=>{
                        this.$message({
                            type: 'success',
                            message: this.$i.product.deleteSuccess
                        });
                        this.$router.push('/product/overview');
                    }).finally(()=>{
                        this.disabledDeleteBtn=false;
                    });
                }).catch(() => {

                });
            },

            filterSelection(params) {
                return false;
            },
        },
        mounted(){
            this.loadingTable=true;
            this.$ajax.post(this.$apis.get_partUnit,['ITM','SKU_UNIT','ED_UNIT','QUARANTINE_TYPE','WT_UNIT','VE_UNIT','LH_UNIT','OEM_IS','UDB_IS','SKU_PG_IS'],{cache:true}).then(res=>{
                res.forEach(v => {
                    if(v.code === 'ITM'){
                        this.incotermOption = v.codes;
                    }else if (v.code === 'SKU_UNIT') {
                        this.skuUnitOption = v.codes;
                    }else if (v.code === 'ED_UNIT') {
                        this.expirationOption = v.codes;
                    }else if(v.code==='QUARANTINE_TYPE'){
                        this.quarantineTypeOption=v.codes;
                    }else if(v.code==='WT_UNIT'){
                        this.weightOption=v.codes;
                    }else if(v.code==='VE_UNIT'){
                        this.volumeOption=v.codes;
                    }else if(v.code==='LH_UNIT'){
                        this.lengthOption=v.codes;
                    }else if(v.code==='OEM_IS'){
                        this.oemOption=v.codes;
                    }else if(v.code==='UDB_IS'){
                        this.udbOption=v.codes;
                    }else if(v.code==='SKU_PG_IS'){
                        this.skuPkgOption=v.codes;
                    }
                });
                this.$ajax.get(this.$apis.get_country,{},{cache:true}).then(res=>{
                    this.countryOption=res;
                    this.getGoodsData();
                }).catch(()=>{
                    this.loadingTable=false;
                });
            }).finally(()=>{
                this.loadingTable=false;
            });
            this.setMenuLink([{
                path: "/logs/index",
                query: { code: "PRODUCT" },
                type: 10,
                auth: "PRODUCT:LOG",
                label: this.$i.common.log
            },
                {
                    path: "archive",
                    type: 20,
                    auth: "PRODUCT:ARCHIVE",
                    label: this.$i.common.archive
                }
            ]);
        },
    }
</script>

<style scoped>
    >>> .el-form-item__content{
        word-wrap: break-word;
    }


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
        height: 35px;
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
    .noData{
        font-size: 14px;
        color: #606266;
    }


    /*.tabVtable >>> .table-container .fixed-left.show{*/
        /*left: 18px;*/
    /*}*/
</style>
