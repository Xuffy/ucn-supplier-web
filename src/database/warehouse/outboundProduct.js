export default {
    skuCode:{
        key:'skuCode',
    },
    skuNameCn:{
        key:'skuNameCn',
    },
    skuNameEn:{
        key:'skuNameEn',
    },
    customerSkuCode:{
        key:'customerSkuCode',
    },
    factorySkuCode:{
        key:'factorySkuCode',
    },
    skuMaterialCn:{
        key:'skuMaterialCn',
    },
    skuMaterialEn:{
        key:'skuMaterialEn',
    },
    skuUnitDictCode:{
        key:'skuUnitDictCode',
        showType:'select',
        options:[
            {
                label:'kg',
                value:1
            },
            {
                label:'g',
                value:2
            }
        ]
    },
    outboundSkuTotalQty:{   //出库产品总数量
        key:'outboundSkuTotalQty',
        showType:'number',
        computed:true
    },
    outboundOutCartonTotalQty:{
        key:'outboundOutCartonTotalQty',        //需要传的参数
        showType:'number',
        isNeed:true
    },
    outboundSkuTotalVolume:{
        key:'outboundSkuTotalVolume',
        showType:'number',
        computed:true
    },
    outboundSkuTotalNetWeight:{
        key:'outboundSkuTotalNetWeight',
        showType:'number',
        computed:true
    },
    outboundSkuTotalGrossWeight:{
        key:'outboundSkuTotalGrossWeight',
        showType:'number',
        computed:true
    },
    outerCartonSkuQty:{         //外箱产品数
        key:'outerCartonSkuQty',
    },
    outerCartonVolume:{
        key:'outerCartonVolume',
    },
    outerCartonGrossWeight:{
        key:'outerCartonGrossWeight',
    },
    outerCartonNetWeight:{
        key:'outerCartonNetWeight',
    },
    inboundDate:{
        key:'inboundDate',
    },
    inventoryDays:{
        key:'inventoryDays'
    },
    inventorySkuPrice:{        //需要传的参数
        key:'inventorySkuPrice',
        showType:'number',
    },
    inventoryServiceFee:{        //需要传的参数
        key:'inventoryServiceFee',
        showType:'number',
    },
    inboundNo:{
        key:'inboundNo',
    },
    skuBarCode:{
        key:'skuBarCode'
    },
    skuNameCustomer:{
        key:'skuNameCustomer'
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
    orderNo:{
        key:'orderNo',
    },
    warehouseNo:{
        key:'warehouseNo'
    },
    warehouseName:{
        key:'warehouseName'
    },
    skuLabel:{
        key:'skuLabel',
    },
}