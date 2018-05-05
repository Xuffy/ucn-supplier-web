import * as db from './db.js'

const page={
    //btns
    addNewProduct:'添加新产品',    //Add New Product
    setUp:'设为上架',              //Set Up
    setDown:'设为下架',            //Set Down
    downloadSelectProducts:'下载选中的商品',//Download Select Products
    delete:'删除',                //Delete
    edit:'编辑',                  //Edit




    //title
    basicInformation:'Basic Information',
    customInformation:'Custom Information',
    priceInfo:'Price',
    packingInfo:'Packing Info',
    logisticInfo:'Logistic Info',
    otherInfo:'Other Info',
    attachment:'Attachment',
    tradeHistory:'Trade History',
    remark:'Remark',



    /**
     * overview sourcing
     * */
    category:'分类',
    // skuNameEN:'',
    // readilyAvailable:'',
    // customerSkuCode:'',
    exwPrice:'EXW价格',
    fobPrice:'FOB价格',
    skuMaterialsEN:'产品英文材质',
    country:'国家',
    deliveryDays:'交期',


    /**
     * add New Product
     * */
    //basic info
    pic:'图片',
    skuSaleStatus:'销售状态',
    skuCode:'供应商货号',
    skuNameCN:'产品中文名',
    skuDescriptionCN:'产品中文描述',
    skuNameEN:'产品英文名',
    skuDescriptionEN:'产品英文描述',
    skuNameInCustomerLanguage:'产品客户语言名',
    skuDescriptionInCustomerLanguage:'产品客户语言描述',
    customerSkuCode:'客户货号',
    supplierName:'供应商名称',
    supplierCode:'供应商编号',
    unit:'计量单位',
    productFormation:'产品组成',
    martialEN:'英文材质',
    martialCN:'中文材质',
    colourEN:'英文颜色',
    colourCN:'中文颜色',
    minimumOrderQuantity:'起订量',
    deliveryDays:'交期',
    productDesign:'产品设计',
    categoryLevel:'分类名称',
    categoryLevel1:'一级分类名称',
    categoryLevel2:'二级分类名称',
    categoryLevel3:'三级分类名称',
    categoryLevel4:'四级分类名称',
    barCode:'产品条码',
    readilyAvailable:'是否现货',
    skuAvailable:'现货数量',
    restrictedSellingCountry:'不可销售国家',
    applicableAge:'适用年龄',
    expirationDate:'保质期',
    expirationDateUnit:'保质期单位',
    explain:'说明',


    //custom information
    rateOfValueAddedTax:'增值税率%',
    taxRefundRate:'退税率%',
    hsCode:'海关编码',
    customsDeclarationNameCN:'报关中文品名',
    customsDeclarationNameEN:'报关英文品名',
    chineseTradeMark:'中文商标',
    englishTradeMark:'英文商标',
    commodityInspectionChineseName:'商检中文品名',
    commodityInspectionEnglishName:'商检英文品名',
    declareElements:'申报要素',
    origin:'原产地',
    inspectionAndQuarantineCategory:'检验检疫类别',
    brand:'品牌',
    brandRemark:'品牌备注',
    relatedBrand:'相关品牌',
    certificat:'认证',

    //Packing Info
    unitOfWeight:'重量单位',
    unitOfLength:'长度单位',
    unitOfVolume:'体积单位',
    skuLength:'产品长',
    skuBreadth:'产品宽',
    skuHeight:'产品高',
    skuNetWeight:'产品净重',
    skuVolume:'产品体积',
    packingMethodCN:'产品包装方式CN',
    packingMethodEN:'产品包装方式EN',
    unitOfInnerCarton:'中包单位',
    skuQuantityOfInnerCarton:'中包产品数',
    lengthOfInnerCarton:'中包长',
    breadthOfInnerCarton:'中包宽',
    heightOfInnerCarton:'中包高',
    netWeightOfInnerCarton:'中包净重',
    grossWeightOfInnerCarton:'中包毛重',
    volumeOfInnerCarton:'中包体积',
    descriptionOfInnerCarton:'中包描述',
    packingMethodOfInnerCartonCN:'中包包装方式CN',
    packingMethodOfInnerCartonEN:'中包包装方式EN',
    unitOfOuterCarton:'外箱单位',
    descriptionOfOuterCarton:'外箱描述',
    quantityOfInnerBoxInOuterCarton:'外箱中包数',
    skuQuantityOfOuterCarton:'外箱产品数',
    lengthOfOuterCarton:'外箱长',
    breadthOfOuterCarton:'外箱宽',
    heightOfOuterCarton:'外箱高',
    netWeightOfOuterCarton:'外箱净重',
    grossWeightOfOuterCarton:'外箱毛重',
    volumeOfOuterCarton:'外箱体积',
    packingMethodOfOuterCartonCN:'外包装方式CN',
    packingMethodOfOuterCartonEN:'外包装方式EN',
    oem:'可否贴牌',


    //logistic info
    gpSKUQuantity20:'20GP产品数量',
    gpSKUQuantity40:'40GP产品数量',
    hqSKUQuantity40:'40HQ产品数量',
    trayDimension:'托盘尺寸',
    skuQuantityPerTray:'每托盘产品数量',
    specialTransportRequirements:'特殊运输要求',
    inventoryCostCalculationMethod:'库存成本计算方式',
    defaultWarehouse:'默认仓库',
    supplierInventoryQuantity:'自有库存',
    supplierSafeInventoryQuantity:'安全库存',
    supplierMinimumInventory:'最低库存量',


    //other info
    mainSaleCountry:'主销国家',
    mainSaleArea:'主销区域',
    productionDays:'开发时间',
    qualityStander:'质量标准',
    yearOfListed:'上市年份',
    useDisplayBoxOrNot:'是否展示盒包装',
    skuQuantityInDisplayBox:'展示盒内产品数',
    lengthBreadthAndHeight:'展示盒长宽高',
    otherPackingInformationCN:'其他包装信息CN',
    otherPackingInformationEN:'其他包装信息EN',
    adjustSKUAndPackageOrNot:'产品或包装可否调整',

    /**
     *  detail页面
     * */
    // skuNameCN:'产品中文名',
    // skuSaleStatus:'销售状态',
    // skuCode:'供应商货号',
    // colour EN:'颜色 EN',
    incoterm:'价格条款',
    incotermArea:'价格条款区域',
    incotermPrice:'价格',
    // unit:'计量单位',
    // Supplier Name:'供应商名称',
















};




export default {
    page,
    ...db
}
