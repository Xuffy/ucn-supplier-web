

export default {
    /**
     * Basic Info
     * */
    saleStatus:{
        key:'status',
        type: 'Boolean',
        showType:'select',
        belongTab:'basicInfo',
        isSaleStatus:true,
        options:[
            {
                code:0,
                label:'下架'
            },
            {
                code:1,
                label:'上架'
            }
        ]
    },
    code:{
        key:'code',
        type: 'Boolean',
        showType:'input',
        // disabledInput:true,             //是否禁止输入
        belongTab:'basicInfo'
    },
    nameCn:{
        key: 'nameCn',
        type: 'String',
        showType:'input',
        belongTab:'basicInfo',
    },
    descCn:{
        key: 'descCn',
        type: 'String',
        showType:'textarea',
        length: 10,
        belongTab:'basicInfo',          //特别用于
        fullLine:true
    },
    nameEn:{
        key: 'nameEn',
        type: 'String',
        showType:'input',
        belongTab:'basicInfo',
    },
    descEn:{
        key: 'descEn',
        type: 'String',
        showType:'textarea',
        belongTab:'basicInfo',          //特别用于
        fullLine:true
    },
    nameCustomer:{
        key:'nameCustomer',
        type: 'String',
        showType:'input',
        belongTab:'basicInfo',
    },
    descCustomer:{
        key:'descCustomer',
        type: 'String',
        showType:'textarea',
        belongTab:'basicInfo',
        fullLine:true
    },
    customerSkuCode:{
        key:'customerSkuCode',
        type: 'String',
        showType:'input',
        belongTab:'basicInfo',
    },
    supplierName:{
        key:'supplierName',
        type: 'String',
        showType:'input',
        belongTab:'basicInfo',
        isHide:true
    },
    supplierNo:{
        key:'supplierCode',
        type: 'String',
        showType:'input',
        belongTab:'basicInfo',
        isHide:true
    },
    unit:{
        key:'unit',
        type: 'String',
        showType:'select',
        belongTab:'basicInfo',
        isWeight:true,

    },
    formation:{
        key:'formation',
        type: 'String',
        showType:'input',
        belongTab:'basicInfo',
    },
    materialEn:{
        key:'materialEn',
        type: 'String',
        showType:'input',
        belongTab:'basicInfo',
    },
    materialCn:{
        key:'materialCn',
        type: 'String',
        showType:'input',
        belongTab:'basicInfo',
    },
    colourEn:{
        key:'colourEn',
        type: 'String',
        showType:'input',
        belongTab:'basicInfo',
    },
    colourCn:{
        key:'colourCn',
        type: 'String',
        showType:'input',
        belongTab:'basicInfo',
    },
    minOrderQty:{
        key:'minOrderQty',
        type: 'String',
        showType:'number',
        belongTab:'basicInfo',
    },
    deliveryDates:{
        key:'deliveryDates',
        type: 'String',
        showType:'number',
        belongTab:'basicInfo',
    },
    design:{
        key:'design',
        type: 'String',
        showType:'input',
        belongTab:'basicInfo',
    },
    categoryId:{            //分类名称
        key:'categoryId',
        type: 'String',
        showType:'dropdown',
        belongTab:'basicInfo',
    },
    barcode:{
        key:'barcode',
        type: 'String',
        showType:'input',
        belongTab:'basicInfo',
    },
    readilyAvailable:{
        key:'readilyAvailable',
        type: 'String',
        showType:'select',
        belongTab:'basicInfo',
        isReadily:true,
    },
    availableQty:{
        key:'availableQty',
        type: 'String',
        showType:'number',
        belongTab:'basicInfo',
        isAvailableQty:true
    },
    noneSellCountry:{
        key:'noneSellCountry',
        type: 'String',
        showType:'select',
        belongTab:'basicInfo',
        isCountry:true
    },
    applicableAge:{
        key:'applicableAge',
        type: 'String',
        showType:'number',
        belongTab:'basicInfo',
    },
    expireDates:{
        key:'expireDates',
        type: 'String',
        showType:'number',
        belongTab:'basicInfo',
    },
    expireUnit:{
        key:'expireUnit',
        type: 'String',
        showType:'select',
        belongTab:'basicInfo',
        isDateUnit:true,
    },
    comments:{
        key:'comments',
        type: 'String',
        showType:'textarea',
        belongTab:'basicInfo',
        fullLine:true
    },

    /**
     * Customer Info
     * */
    rateValueAddedTax:{
        key:'rateValueAddedTax',
        type: 'String',
        showType:'number',
        belongTab:'customerInfo',
    },
    taxRefundRate:{
        key:'taxRefundRate',
        type: 'String',
        showType:'number',
        belongTab:'customerInfo',
    },
    customsCode:{
        key:'customsCode',
        type: 'String',
        showType:'input',
        belongTab:'customerInfo',
    },
    customsNameCn:{
        key:'customsNameCn',
        type: 'String',
        showType:'input',
        belongTab:'customerInfo',
    },
    customsNameEn:{
        key:'customsNameEn',
        type: 'String',
        showType:'input',
        belongTab:'customerInfo',
    },
    tradeMarkCn:{
        key:'tradeMarkCn',
        type: 'String',
        showType:'input',
        belongTab:'customerInfo',
    },
    tradeMarkEn:{
        key:'tradeMarkEn',
        type: 'String',
        showType:'input',
        belongTab:'customerInfo',
    },
    commodityInspectionCn:{
        key:'commodityInspectionCn',
        type: 'String',
        showType:'input',
        belongTab:'customerInfo',
    },
    commodityInspectionEn:{
        key:'commodityInspectionEn',
        type: 'String',
        showType:'input',
        belongTab:'customerInfo',
    },
    declareElement:{
        key:'declareElement',
        type: 'String',
        showType:'input',
        belongTab:'customerInfo',
    },
    origin:{
        key:'origin',
        type: 'String',
        showType:'input',
        belongTab:'customerInfo',
    },
    inspectQuarantineCategory:{
        key:'inspectQuarantineCategory',
        type: 'String',
        showType:'input',
        belongTab:'customerInfo',
    },
    brand:{
        key:'brand',
        type: 'String',
        showType:'input',
        belongTab:'customerInfo',
    },
    brandRemark:{
        key:'brandRemark',
        type: 'String',
        showType:'textarea',
        belongTab:'customerInfo',
        fullLine:true,
    },
    brandRelated:{
        key:'brandRelated',
        type: 'String',
        showType:'input',
        belongTab:'customerInfo',
    },
    certificat:{
        key:'certificat',
        type: 'String',
        showType:'input',
        belongTab:'customerInfo',
    },

    /**
     * priceInfo
     * */

    fobCurrency:{
        key:'fobCurrency',
        showType:'select',
        belongTab:'priceInfo',
        options:[
            {
                label:'USD',
                value:0,
            },
            {
                label:'CNY',
                value:1,
            },
            {
                label:'EUR',
                value:2,
            },
        ],
    },
    fobPrice:{
        key:'fobPrice',
        showType:'number',
        belongTab:'priceInfo',
    },






    fobPort:{
        key:'fobPort',
        showType:'input',
        belongTab:'priceInfo',
    },
    exwPrice:{
        key:'exwPrice',
        showType:'number',
        belongTab:'priceInfo',
    },
    exwCurrency:{
        key:'exwCurrency',
        showType:'select',
        belongTab:'priceInfo',
        options:[
            {
                label:'USD',
                value:0,
            },
            {
                label:'CNY',
                value:1,
            },
            {
                label:'EUR',
                value:2,
            },
        ],
    },


    cifPrice:{
        key:'cifPrice',
        showType:'number',
        belongTab:'priceInfo',
    },
    cifCurrency:{
        key:'cifCurrency',
        showType:'select',
        belongTab:'priceInfo',
        options:[
            {
                label:'USD',
                value:0,
            },
            {
                label:'CNY',
                value:1,
            },
            {
                label:'EUR',
                value:2,
            },
        ],
    },
    cifArea:{
        key:'cifArea',
        showType:'input',
        belongTab:'priceInfo',
    },
    dduPrice:{
        key:'dduPrice',
        showType:'number',
        belongTab:'priceInfo',
    },
    dduCurrency:{
        key:'dduCurrency',
        showType:'select',
        belongTab:'priceInfo',
        options:[
            {
                label:'USD',
                value:0,
            },
            {
                label:'CNY',
                value:1,
            },
            {
                label:'EUR',
                value:2,
            },
        ],
    },
    dduArea:{
        key:'dduArea',
        showType:'input',
        belongTab:'priceInfo',
    },




    /**
     * Packing Info
     * */
    unitWeight:{
        key:'unitWeight',
        type: 'String',
        showType:'select',
        belongTab:'packingInfo',
        isWeight:true,
    },
    unitLength:{
        key:'unitLength',
        type: 'String',
        showType:'select',
        belongTab:'packingInfo',
        isLength:'true'
    },
    unitVolume:{
        key:'unitVolume',
        type: 'String',
        showType:'select',
        belongTab:'packingInfo',
        isVolume:true,
    },
    length:{
        key:'length',
        type: 'String',
        showType:'number',
        belongTab:'packingInfo',
    },
    width:{
        key:'width',
        type: 'String',
        showType:'number',
        belongTab:'packingInfo',
    },
    height:{
        key:'height',
        type: 'String',
        showType:'number',
        belongTab:'packingInfo',
    },
    netWeight:{
        key:'netWeight',
        type: 'String',
        showType:'number',
        belongTab:'packingInfo',
    },
    volume:{
        key:'volume',
        type: 'String',
        showType:'number',
        belongTab:'packingInfo',
    },
    methodPkgCn:{
        key:'methodPkgCn',
        type: 'String',
        showType:'input',
        belongTab:'packingInfo',
    },
    methodPkgEn:{
        key:'methodPkgEn',
        type: 'String',
        showType:'input',
        belongTab:'packingInfo',
    },
    innerCartonUnit:{
        key:'innerCartonUnit',
        type: 'String',
        showType:'input',
        belongTab:'packingInfo',
    },
    innerCartonQty:{
        key:'innerCartonQty',
        type: 'String',
        showType:'number',
        belongTab:'packingInfo',
    },
    innerCartonLength:{
        key:'innerCartonLength',
        type: 'String',
        showType:'number',
        belongTab:'packingInfo',
    },
    innerCartonWidth:{
        key:'innerCartonWidth',
        type: 'String',
        showType:'number',
        belongTab:'packingInfo',
    },
    innerCartonHeight:{
        key:'innerCartonHeight',
        type: 'String',
        showType:'number',
        belongTab:'packingInfo',
    },
    innerCartonWeightNet:{
        key:'innerCartonWeightNet',
        type: 'String',
        showType:'number',
        belongTab:'packingInfo',
    },
    innerCartonRoughWeight:{
        key:'innerCartonRoughWeight',
        type: 'String',
        showType:'number',
        belongTab:'packingInfo',
    },
    innerCartonVolume:{
        key:'innerCartonVolume',
        type: 'String',
        showType:'number',
        belongTab:'packingInfo',
    },
    innerCartonDesc:{
        key:'innerCartonDesc',
        type: 'String',
        showType:'textarea',
        belongTab:'packingInfo',
        fullLine:true
    },
    innerCartonMethodCn:{
        key:'innerCartonMethodCn',
        type: 'String',
        showType:'input',
        belongTab:'packingInfo',
    },
    innerCartonMethodEn:{
        key:'innerCartonMethodEn',
        type: 'String',
        showType:'input',
        belongTab:'packingInfo',
    },
    outerCartonUnit:{
        key:'outerCartonUnit',
        type: 'String',
        showType:'input',
        belongTab:'packingInfo',
    },
    outerCartonDesc:{
        key:'outerCartonDesc',
        type: 'String',
        showType:'textarea',
        belongTab:'packingInfo',
        fullLine:true
    },
    innerCartonOuterNum:{
        key:'innerCartonOuterNum',
        type: 'String',
        showType:'number',
        belongTab:'packingInfo',
    },
    outerCartonQty:{
        key:'outerCartonQty',
        type: 'String',
        showType:'number',
        belongTab:'packingInfo',
    },
    outerCartonLength:{
        key:'outerCartonLength',
        type: 'String',
        showType:'number',
        belongTab:'packingInfo',
    },
    outerCartonWidth:{
        key:'outerCartonWidth',
        type: 'String',
        showType:'number',
        belongTab:'packingInfo',
    },
    outerCartonHeight:{
        key:'outerCartonHeight',
        type: 'String',
        showType:'number',
        belongTab:'packingInfo',
    },
    outerCartonNetWeight:{
        key:'outerCartonNetWeight',
        type: 'String',
        showType:'number',
        belongTab:'packingInfo',
    },
    outerCartonRoughWeight:{
        key:'outerCartonRoughWeight',
        type: 'String',
        showType:'number',
        belongTab:'packingInfo',
    },
    outerCartonVolume:{
        key:'outerCartonVolume',
        type: 'String',
        showType:'number',
        belongTab:'packingInfo',
    },
    outerCartonMethodCn:{
        key:'outerCartonMethodCn',
        type: 'String',
        showType:'input',
        belongTab:'packingInfo',
    },
    outerCartonMethodEn:{
        key:'outerCartonMethodEn',
        type: 'String',
        showType:'input',
        belongTab:'packingInfo',
    },
    oem:{
        key:'oem',
        type: 'String',
        showType:'select',
        belongTab:'packingInfo',
        isOem:true,
    },

    /**
     * Logistic Info
     * */
    gp20SkuQty:{
        key:'gp20SkuQty',
        type: 'String',
        showType:'number',
        belongTab:'logisticInfo',
    },
    gp40SkuQty:{
        key:'gp40SkuQty',
        type: 'String',
        showType:'number',
        belongTab:'logisticInfo',
    },
    hq40SkuQty:{
        key:'hq40SkuQty',
        type: 'String',
        showType:'number',
        belongTab:'logisticInfo',
    },
    tryDimension:{
        key:'tryDimension',
        type: 'String',
        showType:'number',
        belongTab:'logisticInfo',
    },
    skuQtyPerTray:{
        key:'skuQtyPerTray',
        type: 'String',
        showType:'number',
        belongTab:'logisticInfo',
    },
    specialTransportRequire:{
        key:'specialTransportRequire',
        type: 'String',
        showType:'input',
        belongTab:'logisticInfo',
    },
    inventoryCostMethod:{
        key:'inventoryCostMethod',
        type: 'String',
        showType:'input',
        belongTab:'logisticInfo',
    },
    warehourceDefault:{
        key:'warehourceDefault',
        type: 'String',
        showType:'input',
        belongTab:'logisticInfo',
    },
    inventory:{
        key:'inventory',
        type: 'String',
        showType:'number',
        belongTab:'logisticInfo',
    },
    safeInventory:{
        key:'safeInventory',
        type: 'String',
        showType:'number',
        belongTab:'logisticInfo',
    },
    minInventory:{
        key:'minInventory',
        type: 'String',
        showType:'number',
        belongTab:'logisticInfo',
    },

    /**
     * Other Info
     * */
    mainSaleCountry:{
        key:'mainSaleCountry',
        type: 'String',
        showType:'select',
        belongTab:'otherInfo',
        isCountry:true,
    },
    mainSaleArea:{
        key:'mainSaleArea',
        type: 'String',
        showType:'input',
        belongTab:'otherInfo',
    },
    productionDates:{
        key:'productionDates',
        type: 'String',
        showType:'number',
        belongTab:'otherInfo',
    },
    qualityStander:{
        key:'qualityStander',
        type: 'String',
        showType:'input',
        belongTab:'otherInfo',
    },
    yearListed:{
        key:'yearListed',
        type: 'String',
        showType:'date',
        belongTab:'otherInfo',
    },
    useDisplayBox:{
        key:'useDisplayBox',
        type: 'String',
        showType:'select',
        belongTab:'otherInfo',
        isUDB:true,
    },
    displayBoxQty:{
        key:'displayBoxQty',
        type: 'String',
        showType:'number',
        belongTab:'otherInfo',
    },
    lengthWidthHeight:{
        key:'lengthWidthHeight',
        type: 'String',
        showType:'number',
        belongTab:'otherInfo',
    },
    otherPackInfoCn:{
        key:'otherPackInfoCn',
        type: 'String',
        showType:'input',
        belongTab:'otherInfo',
    },
    otherPackInfoEn:{
        key:'otherPackInfoEn',
        type: 'String',
        showType:'input',
        belongTab:'otherInfo',
    },
    adjustPackage:{
        key:'adjustPackage',
        type: 'String',
        showType:'select',
        belongTab:'otherInfo',
        isSkuPkg:true,
    },



}