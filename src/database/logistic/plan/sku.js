export default {
  id: {
    type: 'text',
    _hide: true
  },
  logisticsNo: {
    type: 'text'
  },
  orderNo: {
    type: 'text'
  },
  containerNo: {
    type: 'String'
  },
  totalQuantityOfOuterCartonsInContainer: {
    key: 'totalContainerOuterCartonsQty',
    _filed: 'totalContainerOuterCartonsQty',
    type: 'String',
  },
  totalQuantityInContainer: {
    key: 'totalContainerQty',
    _filed: 'totalContainerQty',
    type: 'String',
  },
  totalVolumeInContainer: {
    key: 'totalCtnCbm',
    _filed: 'totalContainerVolume',
    type: 'String'
  },
  totalNetWeightInContainer: {
    key: 'totalCtnNw',
    _filed: 'totalContainerNetWeight',
    type: 'String'
  },
  totalContainerGrossWeight: {
    key:'totalCtnGw',
    type: 'String'
  },
  unitExportPrice: {
    type: 'String'
  },
  totalExportPrice: {
    type: 'String'
  },
  currency: {
    type: 'String'
  },
  skuQty: {
    type: 'String'
  },
  lcNo: {
    type: 'text'
  },
  customerOrderNo: {
    type: 'text'
  },
  supplierOrderNo: {
    type: 'text'
  },
  skuCode: {
    type: 'text'
  },
  skuBarCode: {
    type: 'text'
  },
  skuNameCn: {
    type: 'text'
  },
  skuNameEn: {
    type: 'text'
  },
  skuDescriptionCn: {
    type: 'text'
  },
  skuDescriptionEN: {
    type: 'text'
  },
  supplierSerialNumber: {
    key:'supplierSerialNo',
    type: 'text'
  },
  customerSkuCode: {
    type: 'text'
  },
  vendorSkuCode: {
    type: 'text'
  },
  blSkuName: {
    type: 'text'
  },
  customsDeclarationNameCn: {
    key:'customDeclarationNameCn',
    type: 'text'
  },
  customsDeclarationNameEn: {
    key:'customDeclarationNameEn',
    type: 'String'
  },
  hsCode: {
    type: 'String'
  },
  unitPrice: {
    type: 'text'
  },
  totalPrice: {
    type: 'text'
  },
  unit: {
    type: 'text'
  },
  skuQuantityOfOuterCarton: {
    key:'outerCartonQty',
    type: 'text'
  },
  outerCartonVolume: {
    type: 'text'
  },
  outerCartonNetWeight: {
    type: 'text'
  },
  outerCartonGrossWeight: {  
    type: 'text'
  },
  inboundDate: {
    type: 'text'
  },
  inboundNo: {
    type: 'text'
  },
  warehouseName: {
    type: 'text'
  },
  warehouseNo: {
    type: 'text'
  },
  estDelivaryDate: {
    type: 'textDate'
  },
  actDeliveryDate: {
    type: 'textDate'
  },
  departurePort: {
    key:'deliveryPort',
    type: 'text'
  },
  destinationPort: {
    type: 'text'
  },
  destinationCountry: {
    type: 'text'
  },
  transportCompany: {
    type: 'text'
  },
  logisticsStatus: {
    type: 'text',
    _hide:true
  }
}
