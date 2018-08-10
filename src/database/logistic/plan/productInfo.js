export default {
  "id": {
    type: 'String',
    _disabled: true,
    typeSlef: 'text',
    _hide: true
  },
  "vId": {
    type: 'String',
    _disabled: true,
    typeSlef: 'text',
    _hide: true
  },
  "argID": {
    type: 'String',
    _disabled: true,
    typeSlef: 'text',
    _hide: true
  },
  "skuSupplierId": {
    type: 'String',
    _disabled: true,
    typeSlef: 'text',
    _hide: true
  },
  "skuSupplierAbbr": {
    type: 'String',
    _disabled: true,
    typeSlef: 'text',
    _hide: true
  },
  "entryDt": {
    type: 'String',
    _disabled: true,
    typeSlef: 'text',
    _hide: true
  },
  "entryName": {
    type: 'String',
    _disabled: true,
    typeSlef: 'text',
    _hide: true
  },
  "skuPictures":{
    type: 'String',
    _image:true,
    _upload:{
      readonly:true
    },
    typeSlef: 'text'
  },
  "orderNo": {
    type: 'String',
    _disabled: true,
    typeSlef: 'text'
  },
  "skuCode": {
    type: 'String',
    _disabled: true,
    typeSlef: 'text'
  },
  "orderId": {
    type: 'String',
    _disabled: true,
    typeSlef: 'text',
    _hide: true
  },
  "skuId": {
    type: 'String',
    _disabled: true,
    typeSlef: 'text',
    _hide: true
  },
  "fieldDisplay": {
    type: 'String',
    _disabled: true,
    typeSlef: 'text',
    _hide: true
  },
  "skuNameEn": {
    type: 'String',
    _disabled: true,
    typeSlef: 'text',
  },
  "skuNameCn": {
    type: 'String',
    _disabled: true,
    typeSlef: 'text'
  },
  "productDescription": {
    type: 'String',
    _disabled: true,
    typeSlef: 'text'
  },
  "blSkuName": {
    type: 'String',
    _disabled: true,
    typeSlef: 'text'
  },
  "customsDeclarationNameCn": {
    type: 'String',
    _disabled: true,
    typeSlef: 'text'
  },
  "customsDeclarationNameEn": {
    type: 'String',
    _disabled: true,
    typeSlef: 'text'
  },
  "hsCode": {
    type: 'String',
    _disabled: true,
    typeSlef: 'text'
  },
  "reportElement": {
    type: 'String',
    _disabled: true,
    typeSlef: 'text'
  },
  "skuOuterCartonQty": {
    type: 'String',
    _disabled: true,
    typeSlef: 'text',
    _important: true
  },
  "skuNameCustomer": {
    type: 'String',
    _disabled: true,
    typeSlef: 'text'
  },
  "skuCustomsNameCn": {
    type: 'String',
    _disabled: true,
    typeSlef: 'text'
  },
  "skuCustomsNameEn": {
    type: 'String',
    _disabled: true,
    typeSlef: 'text'
  },
  "skuSupplierCode": {
    type: 'String',
    _disabled: true,
    typeSlef: 'text'
  },
  "skuCustomerSkuCode": {
    type: 'String',
    _disabled: true,
    typeSlef: 'text'
  },
  "skuUnit": {
    type: 'String',
    _disabled: true,
    typeSlef: 'text'
  },
  "unitExportPrice": {
    type: 'String',
    _disabled: true,
    typeSlef: 'text',
    _important: true
  },
  "totalExportPrice": {
    type: 'String',
    _disabled: true,
    typeSlef: 'text',
    _important: true
  },
  "currency": {
    type: 'String',
    _disabled: true,
    typeSlef: 'text'
  },
  "skuQty": {
    type: 'String',
    _disabled: true,
    typeSlef: 'text'
  },
  "skuCartonQty": {
    type: 'String',
    _disabled: true,
    typeSlef: 'text'
  },
  "containerNo": {
    type: 'Select',
    correlationKey:"containerType",
    _optionLabel:'containerNo',
    _optionValue:'containerNo',
    _option:[],
    typeSlef: 'text'
  },
  "containerId": {
    type: 'String',
    _disabled: true,
    typeSlef: 'text',
    _hide: true
  },
  "containerType": {
    type: 'String',
    _disabled: true,
    typeSlef: 'text'
  },
  "totalContainerGrossWeight": {
    type: 'String',
    _toFixed:2,
    typeSlef: 'text',
    _important: true
  },
  "totalQuantityInContainer": {
    key: 'totalContainerQty',
    _filed: 'totalContainerQty',
    _toFixed:1,
    type: 'String',
    typeSlef: 'text',
    _important: true
  },
  "totalVolumeInContainer": {
    key: 'totalContainerVolume',
    _filed: 'totalContainerVolume',
    type: 'String',
    _toFixed:3,
    typeSlef: 'text',
    _important: true
  },
  "totalNetWeightInContainer": {
    key: 'totalContainerNetWeight',
    _filed: 'totalContainerNetWeight',
    type: 'String',
    _toFixed:2,
    typeSlef: 'text',
    _important: true
  },
  "totalQuantityOfOuterCartonsInContainer": {
    key: 'totalContainerOuterCartonsQty',
    _filed: 'totalContainerOuterCartonsQty',
    type: 'String',
    _toFixed:1,
    typeSlef: 'text',
    _important: true
  },
  "skuOuterCartonLength": {
    type: 'String',
    _disabled: true,
    typeSlef: 'text'
  },
  "skuOuterCartonWidth": {
    type: 'String',
    _disabled: true,
    typeSlef: 'text'
  },
  "skuOuterCartonHeight": {
    type: 'String',
    _disabled: true,
    typeSlef: 'text'
  },
  "skuOuterCartonNetWeight": {
    type: 'String',
    _disabled: true,
    typeSlef: 'text'
  },
  "skuOuterCartonRoughWeight": {
    type: 'String',
    _disabled: true,
    typeSlef: 'text'
  },
  "skuOuterCartonVolume": {
    type: 'String',
    _disabled: true,
    typeSlef: 'text'
  },
  "skuShippingMarks": {
    type: 'String',
    _disabled: true,
    typeSlef: 'text'
  },
  "skuOuterCartonBarCode": {
    type: 'String',
    _disabled: true,
    typeSlef: 'text'
  },
  "skuOuterCartonCode": {
    type: 'String',
    _disabled: true,
    typeSlef: 'text'
  },
  "skuSupplierCompanyId": {
    type: 'String',
    _disabled: true,
    typeSlef: 'text',
    _hide: true
  },
  "skuSupplierTenantId": {
    type: 'String',
    _disabled: true,
    typeSlef: 'text',
    _hide: true
  }
}
