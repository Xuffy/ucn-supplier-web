export default {
    id: {
        _hide:true
    },
    skuBarCode:{
    },
    skuCode:{
        key:'skuCode',
        sortable: true
    },
    skuNameCn:{
        key:'skuNameCn',
        sortable: true
    },
    skuNameEn:{
        key:'skuNameEn',
        sortable: true
    },
    skuNameCustomer: {
        sortable: true
    },
    skuMaterialCn:{
        key:'skuMaterialCn',
        sortable: true
    },
    skuMaterialEn:{
        key:'skuMaterialEn',
        sortable: true
    },
    factorySkuCode:{
        key:'factorySkuCode',
    },
    customerSkuCode:{
        key:'customerSkuCode',
        sortable: true
    },

    skuUnitDictCode:{
        key:'skuUnitDictCode',
        showType:'select',
        sortable: true,
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
  lengthUnitDictCode:{
        key:'lengthUnitDictCode',
    },
  volumeUnitDictCode:{
        key:'volumeUnitDictCode',
    },
  weightUnitDictCode:{
        key:'weightUnitDictCode',
    },
    outboundSkuTotalQty:{   //出库产品总数量
        key:'outboundSkuTotalQty',
        showType:'number',
        sortable: true,
        computed:true
    },
    outboundOutCartonTotalQty:{
        key:'outboundOutCartonTotalQty',        //需要传的参数
        showType:'number',
        sortable: true,
        isNeed:true,
        _rules:{
            required:true,
            type:'Number'
        }
    },
    outboundSkuTotalVolume:{
        key:'outboundSkuTotalVolume',
        showType:'number',
        sortable: true,
        computed:true
    },
    outboundSkuTotalNetWeight:{
        key:'outboundSkuTotalNetWeight',
        showType:'number',
        sortable: true,
        computed:true
    },
    outboundSkuTotalGrossWeight:{
        key:'outboundSkuTotalGrossWeight',
        sortable: true,
        showType:'number',
        computed:true
    },
    outerCartonSkuQty:{         //外箱产品数
        key:'outerCartonSkuQty',
        sortable: true,
    },
    outerCartonVolume:{
        key:'outerCartonVolume',
        sortable: true,
    },
    outerCartonGrossWeight:{
        key:'outerCartonGrossWeight',
        sortable: true,
    },
    outerCartonNetWeight:{
        key:'outerCartonNetWeight',
        sortable: true,
    },
    inboundNo:{ //入库单号
        key:'inboundNo',
        sortable: true,
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
    skuLabel:{
        key:'skuLabel',
    },
    orderNo:{
        key:'orderNo',
        sortable: true,
    },
    warehouseNo:{
        key:'warehouseNo',
        sortable: true,
    },
    warehouseName:{
        key:'warehouseName',
        sortable: true,
    },
    inboundDate:{
        key:'inboundDate',
        sortable: true
    },
    inventoryDays:{
        key:'inventoryDays',
        showType:'number',
        sortable: true,
    },
    inventorySkuPrice:{        //需要传的参数
        key:'inventorySkuPrice',
        showType:'number',
        sortable: true,
    },
    inventoryServiceFee:{        //需要传的参数
        key:'inventoryServiceFee',
        showType:'number',
        sortable: true,
    },
    // skuBarCode:{
    //     key:'skuBarCode'
    // },
    // skuNameCustomer:{
    //     key:'skuNameCustomer',
    // }
}
