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
  productDescription: {
    key:'skuNameCustomer',
    type: 'text'
  },
  skuDescriptionCn: {
    type: 'text'
  },
  skuDescriptionEN: {
    type: 'text'
  },
  supplierName: {
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
