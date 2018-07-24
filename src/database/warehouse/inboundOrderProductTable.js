/**
 * 用于create inbound页面展示的table格式
 * */

export default {
    skuId:{
        _hide:true
    },
    orderId:{
        _hide:true
    },
    skuSupplierId:{
        _hide:true
    },
    skuSupplierName:{
        _hide:true
    },
    skuSupplierCode:{
        _hide:true
    },
    skuBarCode:{
        key:'skuBarCode',
    },
    skuCode:{
        key:'skuCode',
    },
    skuNameCn:{
        key:'skuNameCn',
    },
    skuNameCustomer:{
        key:'skuNameCustomer',
    },
    skuNameEn:{
        key:'skuNameEn',
    },
    skuMaterialCn:{
        key:'skuMaterialCn',
    },
    skuMaterialEn:{
        key:'skuMaterialEn',
    },
    factorySkuCode:{
        key:'factorySkuCode',           //save时需要传的值
        showType:'input'
    },
    skuCustomsCode:{
        key:'skuCustomerSkuCode',
    },
    skuUnit:{
        key:'skuUnit',          //字典
    },
    skuUnitLength:{
        key:'skuUnitLength',          //字典
    },
    skuUnitVolume:{
        key:'skuUnitVolume',          //字典
    },
    skuUnitWeight:{
        key:'skuUnitWeight',          //字典
    },
    skuQty:{
        key:'skuQty'
    },
    inboundSkuTotalQty:{        //入库产品总数量
        key:'inboundSkuTotalQty',       //需要计算
        computed:true,
        showType:'number',
        must:true,
        _rules:{
            required:true,
        }
    },
    inboundOutCartonTotalQty:{      //入库产品总箱数
        key:'inboundOutCartonTotalQty',     //需要填写
        showType:'number',
        needInput:true,
        must:true,
        _rules:{
            required:true,
        }
    },
    inboundSkuTotalVolume:{     //入库产品总体积
        key:'inboundSkuTotalVolume',    //需要计算
        showType:'number',
        computed:true,
    },
    inboundSkuTotalNetWeight:{      //入库产品总净重
        key:'inboundSkuTotalNetWeight',    //需要计算
        showType:'number',
        computed:true,
    },
    inboundSkuTotalGrossWeight:{        //入库产品总毛重
        key:'inboundSkuTotalGrossWeight',    //需要计算
        showType:'number',
        computed:true,
    },
    skuOuterCartonQty:{
        key:'skuOuterCartonQty',
    },
    skuOuterCartonVolume:{
        key:'skuOuterCartonVolume',         //可修改，必填
        showType:'number',
        must:true,
        _rules:{
            required:true,
        }
    },
    skuOuterCartonRoughWeight:{
        key:'skuOuterCartonRoughWeight',        //可修改，必填
        showType:'number',
        must:true,
        _rules:{
            required:true,
        }
    },
    skuOuterCartonNetWeight:{
        key:'skuOuterCartonNetWeight',        //可修改，必填
        showType:'number',
        must:true,
        _rules:{
            required:true,
        }
    },
    unqualifiedType:{   //不合格类型====>>>默认为0，页面上只展示0即可
        key:'unqualifiedType',
    },
    skuMethodPkgCn:{
        key:'skuMethodPkgCn',
    },
    skuInnerCartonMethodCn:{
        key:'skuInnerCartonMethodCn',
    },
    skuDescEn:{
        key:'skuDescEn',
    },
    skuDescCn:{
        key:'skuDescCn',
    },
    skuDescCustomer:{
        key:'skuDescCustomer',
    },
    skuLength:{
        key:'skuLength',
    },
    skuWidth:{
        key:'skuWidth',
    },
    skuHeight:{
        key:'skuHeight',
    },
    skuNetWeight:{
        key:'skuNetWeight',         //可修改，必填
        showType:'number',
        must:true
    },
    skuInnerCartonLength:{
        key:'skuInnerCartonLength',         //可修改，必填
        showType:'number',
        must:true,
        _rules:{
            required:true,
        }
    },
    skuInnerCartonWidth:{
        key:'skuInnerCartonWidth',         //可修改，必填
        showType:'number',
        must:true,
        _rules:{
            required:true,
        }
    },
    skuInnerCartonHeight:{
        key:'skuInnerCartonHeight',         //可修改，必填
        showType:'number',
        must:true
    },
    skuInnerCartonWeightNet:{
        key:'skuInnerCartonWeightNet',         //可修改，必填
        showType:'number',
        must:true
    },
    skuInnerCartonRoughWeight:{
        key:'skuInnerCartonRoughWeight',         //可修改，必填
        showType:'number',
        must:true,
        _rules:{
            required:true,
        }
    },
    skuBrand:{
        key:'skuBrand',
    },
    skuInnerCartonVolume:{
        key:'skuInnerCartonVolume',
        showType:'number',
        must:true,
        _rules:{
            required:true,
        }
    },
    skuLabel:{
        key:'skuLabel',
    },
    orderNo:{
        key:'orderNo',
    },
    customerOrderNo:{
        key:'customerOrderNo'
    },
    customerNo:{
        key:'customerNo'
    },
    customerName:{
        key:'customerName',
    },
    supplierName:{
        key:'supplierName',
    },
    supplierCode:{
        key:'supplierCode',
    },
    supplierOrderNo:{
        key:'supplierOrderNo',
    },
}
