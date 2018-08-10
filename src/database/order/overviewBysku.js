export default {
    id:{
        _hide:true,
    },
    orderNo:{},
    customerOrderNo:{
        mustShowColumn:true
    },
    supplierOrderNo:{
        mustShowColumn:true
    },
    skuPictures:{
        mustShowColumn:true,
        _image:true,
        _upload: {
            readonly:true,
        }
    },
    skuCustomerSkuCode:{},
    skuCode:{},
    skuSupplierName:{},
    skuNameCn:{},
    skuNameEn:{},
    skuDescEn:{},
    skuDescCn:{},
    skuRemarkOne:{},        //??
    skuRemarkTwo:{},        //??
    skuRemarkThree:{},      //??
    skuUnit:{},
    skuOuterCartonQty:{
        mustShowColumn:true
    },
    skuUndeliveredQty:{
        mustShowColumn:true
    },
    skuUntestedQty:{
        mustShowColumn:true
    },
    skuMaterialCn:{},
    skuMaterialEn:{},
    skuMethodPkgCn:{
        mustShowColumn:true
    },
    skuMethodPkgEn:{
        mustShowColumn:true
    },
    skuCartonQty:{
        mustShowColumn:true
    },
    skuFobCurrency:{},
    skuFobPrice:{},
    skuFobPort:{},
    skuExwCurrency:{},
    skuExwPrice:{},
    skuCifCurrency:{},
    skuCifPrice:{},
    skuCifPort:{},
    skuDduCurrency:{},
    skuDduPrice:{},
    skuDduPort:{},
    incoterm:{
        key:'skuIncoterm'
    },
    skuQty:{},
    skuInnerCartonQty:{
        mustShowColumn:true
    },
    skuPrice:{},
    entryDt:{},
    deliveryDt:{},
    skuDeliveredQty:{},
    skuStatus:{},
    updateDt:{},
    supplierAbbr:{
        mustShowColumn:true
    },
}
