/**
 * 用于create inbound页面展示的table格式
 * */

export default {
    skuBarCode:{
        key:'skuBarCode',
        belong:'skuList'
    },
    skuCode:{
        key:'skuCode',
        belong:'skuList'
    },
    skuNameCn:{
        key:'skuNameCn',
        belong:'skuList'
    },
    skuNameCustomer:{
        key:'skuNameCustomer',
        belong:'skuList'
    },
    skuNameEn:{
        key:'skuNameEn',
        belong:'skuList'
    },
    skuMaterialCn:{
        key:'skuMaterialCn',
        belong:'skuList'
    },
    skuMaterialEn:{
        key:'skuMaterialEn',
        belong:'skuList'
    },
    factorySkuCode:{
        key:'factorySkuCode',           //save时需要传的值
        showType:'input'
    },
    skuCustomsCode:{
        key:'skuCustomsCode',
        belong:'skuList'
    },
    skuUnit:{
        key:'skuUnit',          //字典
        belong:'skuList',
        // showType:'select',
        // options:[
        //     {
        //         label:'kg',
        //         value:1
        //     },
        //     {
        //         label:'g',
        //         value:2
        //     }
        // ],
    },
    totalQty:{
        key:'totalQty'
    },
    inboundSkuTotalQty:{        //入库产品总数量
        key:'inboundSkuTotalQty',       //需要计算
        computed:true,
        showType:'number'
    },
    inboundOutCartonTotalQty:{      //入库产品总箱数
        key:'inboundOutCartonTotalQty',     //需要填写
        showType:'number',
        needInput:true
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
        belong:'skuList'
    },
    skuOuterCartonVolume:{
        key:'skuOuterCartonVolume',         //可修改，必填
        // belong:'skuList',
        showType:'number'
    },
    skuOuterCartonRoughWeight:{
        key:'skuOuterCartonRoughWeight',        //可修改，必填
        // belong:'skuList',
        showType:'number'
    },
    skuOuterCartonNetWeight:{
        key:'skuOuterCartonNetWeight',        //可修改，必填
        // belong:'skuList',
        showType:'number'
    },
    unqualifiedType:{   //不合格类型====>>>默认为0，页面上只展示0即可
        key:'unqualifiedType',
    },
    skuMethodPkgCn:{
        key:'skuMethodPkgCn',
        belong:'skuList',
    },
    skuInnerCartonMethodCn:{
        key:'skuInnerCartonMethodCn',
        belong:'skuList',
    },
    skuDescEn:{
        key:'skuDescEn',
        belong:'skuList',
    },
    skuDescCn:{
        key:'skuDescCn',
        belong:'skuList',
    },
    skuDescCustomer:{
        key:'skuDescCustomer',
        belong:'skuList',
    },
    skuLength:{
        key:'skuLength',
        belong:'skuList',
    },
    skuWidth:{
        key:'skuWidth',
        belong:'skuList',
    },
    skuHeight:{
        key:'skuHeight',
        belong:'skuList',
    },
    skuNetWeight:{
        key:'skuNetWeight',         //可修改，必填
        belong:'skuList',
        showType:'input'
    },
    skuInnerCartonLength:{
        key:'skuInnerCartonLength',         //可修改，必填
        belong:'skuList',
        showType:'input'
    },
    skuInnerCartonWidth:{
        key:'skuInnerCartonWidth',         //可修改，必填
        belong:'skuList',
        showType:'input'
    },
    skuInnerCartonHeight:{
        key:'skuInnerCartonHeight',         //可修改，必填
        belong:'skuList',
        showType:'input'
    },
    skuInnerCartonWeightNet:{
        key:'skuInnerCartonWeightNet',         //可修改，必填
        belong:'skuList',
        showType:'input'
    },
    skuInnerCartonRoughWeight:{
        key:'skuInnerCartonRoughWeight',         //可修改，必填
        belong:'skuList',
        showType:'input'
    },
    skuBrand:{
        key:'skuBrand',
        belong:'skuList',
    },
    skuInnerCartonVolume:{
        key:'skuInnerCartonVolume',
        belong:'skuList',
        showType:'input'
    },
    skuLabel:{
        key:'skuLabel',
        belong:'skuList',
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
        key:'skuCustomsNameCn',
    },
    supplierName:{
        key:'supplierName',
    },
    supplierNo:{
        key:'supplierNo',
    },
    supplierOrderNo:{
        key:'supplierOrderNo',
    },
}