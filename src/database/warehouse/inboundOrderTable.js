export default {
    /**
     * 需要隐藏的字段
     * */
    id:{
        _hide:true
    },
    skuId:{
        _hide:true
    },
    orderNo:{
        key:'orderNo',
    },
    skuBarCode:{
        key:'skuBarCode',
        _sort:false
    },
    skuNameCn:{
        key:'skuNameCn'
    },
    skuNameEn:{
        key:'skuNameEn'
    },
    // skuCustomsNameCn:{
    //     key:'skuNameCustomer'
    // },
    skuMaterialCn:{
        key:'skuMaterialCn'
    },
    skuMaterialEn:{
        key:'skuMaterialEn'
    },
    customerSkuCode:{
        key:'customerSkuCode',
        _sort:false
    },
    skuCode:{},
    // skuDescCn:{
    //     key:'skuDescCn'
    // },
    skuDescEn:{
        key:'skuDescEn'
    },
    skuBrand:{
        key:'skuBrand'
    },

    /**
     * 需要传递的字段
     * */
    customerNo:{
        key:'skuCustomsCode',
        _hide:true
    },
    customerOrderNo:{
        _hide:true
    },

}