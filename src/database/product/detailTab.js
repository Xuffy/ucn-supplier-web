

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
    },
    code:{
        key:'code',
        type: 'Boolean',
        showType:'input',
        // disabledInput:true,             //是否禁止输入
        belongTab:'basicInfo',
        _rules:{
            required:true
        }
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
        accuracy:1
    },
    deliveryDates:{
        key:'deliveryDates',
        type: 'String',
        showType:'number',
        belongTab:'basicInfo',
        accuracy:0
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
        isAvailableQty:true,
        accuracy:1
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
        accuracy:0
    },
    expireDates:{
        key:'expireDates',
        type: 'String',
        showType:'number',
        belongTab:'basicInfo',
        accuracy:0
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
        accuracy:2
    },
    taxRefundRate:{
        key:'taxRefundRate',
        type: 'String',
        showType:'number',
        belongTab:'customerInfo',
        accuracy:2
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
        showType:'select',
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
    },
    fobPrice:{
        key:'fobPrice',
        showType:'number',
        belongTab:'priceInfo',
        accuracy:4
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
        accuracy:4
    },
    exwCurrency:{
        key:'exwCurrency',
        showType:'select',
        belongTab:'priceInfo',
    },
    cifPrice:{
        key:'cifPrice',
        showType:'number',
        belongTab:'priceInfo',
        accuracy:4
    },
    cifCurrency:{
        key:'cifCurrency',
        showType:'select',
        belongTab:'priceInfo',
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
        accuracy:4
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
        accuracy:2
    },
    width:{
        key:'width',
        type: 'String',
        showType:'number',
        belongTab:'packingInfo',
        accuracy:2
    },
    height:{
        key:'height',
        type: 'String',
        showType:'number',
        belongTab:'packingInfo',
        accuracy:2
    },
    netWeight:{
        key:'netWeight',
        type: 'String',
        showType:'number',
        belongTab:'packingInfo',
        accuracy:2
    },
    volume:{
        key:'volume',
        type: 'String',
        showType:'number',
        belongTab:'packingInfo',
        accuracy:6
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
    innerCartonQty:{
        key:'innerCartonQty',
        type: 'String',
        showType:'number',
        belongTab:'packingInfo',
        accuracy:2
    },
    innerCartonLength:{
        key:'innerCartonLength',
        type: 'String',
        showType:'number',
        belongTab:'packingInfo',
        accuracy:2
    },
    innerCartonWidth:{
        key:'innerCartonWidth',
        type: 'String',
        showType:'number',
        belongTab:'packingInfo',
        accuracy:2
    },
    innerCartonHeight:{
        key:'innerCartonHeight',
        type: 'String',
        showType:'number',
        belongTab:'packingInfo',
        accuracy:2
    },
    innerCartonWeightNet:{
        key:'innerCartonWeightNet',
        type: 'String',
        showType:'number',
        belongTab:'packingInfo',
        accuracy:2
    },
    innerCartonRoughWeight:{
        key:'innerCartonRoughWeight',
        type: 'String',
        showType:'number',
        belongTab:'packingInfo',
        accuracy:2
    },
    innerCartonVolume:{
        key:'innerCartonVolume',
        type: 'String',
        showType:'number',
        belongTab:'packingInfo',
        accuracy:3
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
        accuracy:2
    },
    outerCartonQty:{
        key:'outerCartonQty',
        type: 'String',
        showType:'number',
        belongTab:'packingInfo',
        accuracy:1
    },
    outerCartonLength:{
        key:'outerCartonLength',
        type: 'String',
        showType:'number',
        belongTab:'packingInfo',
        accuracy:2
    },
    outerCartonWidth:{
        key:'outerCartonWidth',
        type: 'String',
        showType:'number',
        belongTab:'packingInfo',
        accuracy:2
    },
    outerCartonHeight:{
        key:'outerCartonHeight',
        type: 'String',
        showType:'number',
        belongTab:'packingInfo',
        accuracy:2
    },
    outerCartonNetWeight:{
        key:'outerCartonNetWeight',
        type: 'String',
        showType:'number',
        belongTab:'packingInfo',
        accuracy:2
    },
    outerCartonRoughWeight:{
        key:'outerCartonRoughWeight',
        type: 'String',
        showType:'number',
        belongTab:'packingInfo',
        accuracy:2
    },
    outerCartonVolume:{
        key:'outerCartonVolume',
        type: 'String',
        showType:'number',
        belongTab:'packingInfo',
        accuracy:3
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
        accuracy:1
    },
    gp40SkuQty:{
        key:'gp40SkuQty',
        type: 'String',
        showType:'number',
        belongTab:'logisticInfo',
        accuracy:1
    },
    hq40SkuQty:{
        key:'hq40SkuQty',
        type: 'String',
        showType:'number',
        belongTab:'logisticInfo',
        accuracy:1
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
        accuracy:1
    },
    specialTransportRequire:{
        key:'specialTransportRequire',
        type: 'String',
        showType:'input',
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