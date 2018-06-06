export default {
  _firstColumn: {
    key: 'updateDt',
    label: ' 2',
    type: 'text',
    _disabled: true,
    _title: 'remark',
    transForm: 'time'
  },
  skuSysCode: {
    key: 'skuSysCode',
    _hide: true
  },
  skuMethodPkgEn: {
    _hide: true
  },
  skuWarehourceDefault: {
    _hide: true
  },
  tenantId: {
    _hide: true
  },
  skuId: {
    _hide: true
  },
  _remark: {
    _hide: true
  },
  fieldDisplay: {
    _hide: true
  },
  id: {
    key: 'id',
    _hide: true
  },
  _id: {
    _hide: true
  },
  displayStyle: {
    _hide: true
  },
  skuCustomerCreate: {
    _hide: true
  },
  operater: {
    key: 'updateName',
    _disabled: true
  },
  pic: {
    key: 'skuPic',
    type: 'attachment',
    _disabled: true
  },
  skuSaleStatus: {
    key: 'skuStatus',
    _disabled: true,
    transForm: 'SKU_SALE_STATUS'
  },
  deleteOrNotRecycle: {
    key: 'skuRecycle',
    _disabled: true
  },
  skuCode: {
    key: 'skuCode',
    _disabled: true
  },
  skuNameCn: {
    key: 'skuNameCn',
    _disabled: true
  },
  skuDescriptionCn: {
    key: 'skuDescCn',
    _disabled: true
  },
  skuNameEn: {
    key: 'skuNameEn',
    _disabled: true
  },
  skuDescriptionEn: {
    key: 'skuDescEn',
    _disabled: true
  },
  skuNameInCustomerLanguage: {
    key: 'skuNameCustomer',
    _disabled: true
  },
  skuDescriptionInCustomerLanguage: {
    key: 'skuDescCustomer',
    _disabled: true
  },
  customerSkuCode: {
    key: 'skuCustomerSkuCode',
    _disabled: true
  },
  supplierName: {
    key: 'skuSupplierName',
    _disabled: true
  },
  supplierNo: {
    key: 'skuSupplierCode',
    _disabled: true
  },
  unit: {
    key: 'skuUnit',
    type: 'Select',
    _slot: 'unit',
    transForm: 'SKU_UNIT'
  },
  productFormation: {
    key: 'skuFormation',
    type: 'String'
  },
  martialEn: {
    key: 'skuMaterialEn',
    type: 'String'
  },
  martialCn: {
    key: 'skuMaterialCn',
    type: 'String'
  },
  colourEn: {
    key: 'skuColourEn',
    type: 'String'
  },
  colourCn: {
    key: 'skuColourCn',
    type: 'String'
  },
  minimumOrderQuantity: {
    key: 'skuMinOrderQty',
    type: 'Number'
  },
  deliveryDays: {
    key: 'skuDeliveryDates',
    type: 'Number'
  },
  productDesign: {
    key: 'skuDesign',
    type: 'String'
  },
  category: {
    key: 'skuCategoryId',
    type: 'Select',
    _slot: 'category',
    state: 'category'
  },
  barcode: {
    key: 'skuBarcode',
    type: 'String'
  },
  readilyAvailable: {
    key: 'skuReadilyAvailable',
    type: 'Select',
    _slot: 'readilyAvailable'
  },
  skuAvailable: {
    key: 'skuAvailableQty',
    type: 'Number'
  },
  restrictedSellingCountry: {
    key: 'skuNoneSellCountry',
    _disabled: true,
    transForm: 'COUNTRY'
  },
  applicableAge: {
    key: 'skuApplicableAge',
    type: 'Number',
    max: 200,
    min: 0
  },
  expirationDate: {
    key: 'skuExpireDates',
    type: 'Number'
  },
  expirationDateUnit: {
    key: 'skuExpireUnit',
    type: 'Select',
    state: 'Date',
    time: 'yyyy-mm-dd',
    _slot: 'expirationDateUnit'
  },
  explain: {
    key: 'skuComments',
    type: 'String',
    max: 300
  },
  fobCurrency: {
    key: 'skuFobCurrency',
    type: 'Select',
    _slot: 'fobCurrency',
    transForm: 'CY_UNIT'
  },
  fobPrice: {
    key: 'skuFobPrice',
    type: 'Number'
  },
  referenceFobPriceUsd: {
    key: 'skuRefFobPrice',
    _disabled: true
  },
  fobPort: {
    key: 'skuFobPort',
    type: 'String'
  },
  exwPrice: {
    key: 'skuExwPrice',
    type: 'Number'
  },
  exwCurrency: {
    key: 'skuExwCurrency',
    type: 'Select',
    _slot: 'exwCurrency',
    transForm: 'CY_UNIT'
  },
  cifPrice: {
    key: 'skuCifPrice',
    type: 'Number'
  },
  referenceCifPriceUsd: {
    key: 'skuRefCifPrice',
    _disabled: true
  },
  otherIncotermCurrency: {
    key: 'skuOtherIncotermCurrency',
    type: 'Select',
    _slot: 'otherIncotermCurrency',
    transForm: 'CY_UNIT'
  },
  cifArea: {
    key: 'skuCifArea',
    type: 'String'
  },
  dduOrice: {
    key: 'skuDduPrice',
    type: 'Number'
  },
  referenceDdupriceUsd: {
    key: 'skuRefDduPrice',
    _disabled: true
  },
  dduCurrency: {
    key: 'skuDduCurrency',
    type: 'Select',
    _slot: 'dduCurrency',
    transForm: 'CY_UNIT'
  },
  dduArea: {
    key: 'skuDduArea',
    type: 'String'
  },
  rateOfValueAddedTax: {
    key: 'skuRateValueAddedTax',
    type: 'Number',
    state: 'rate',
    max: 100,
    min: 0
  },
  taxRefundRate: {
    key: 'skuTaxRefundRate',
    type: 'Number',
    state: 'rate',
    max: 100,
    min: 0
  },
  hsCode: {
    key: 'skuCustomsCode',
    type: 'String'
  },
  customsDeclarationNameCn: {
    key: 'skuCustomsNameCn',
    type: 'String',
    max: 100
  },
  customsDeclarationNameEn: {
    key: 'skuCustomsNameEn',
    type: 'String',
    max: 100
  },
  chineseTradeMark: {
    key: 'skuTradeMarkCn',
    type: 'String'
  },
  englishTradeMark: {
    key: 'skuTradeMarkEn',
    type: 'String'
  },
  commodityInspectionChineseName: {
    key: 'skuCommodityInspectionCn',
    type: 'String'
  },
  commodityInspectionEnglishName: {
    key: 'skuCommodityInspectionEn',
    type: 'String'
  },
  declareElements: {
    key: 'skuDeclareElement',
    type: 'String'
  },
  origin: {
    key: 'skuOrigin',
    type: 'String'
  },
  inspectionAndQuarantineCategory: {
    key: 'skuInspectQuarantineCategory',
    type: 'String'
  },
  brand: {
    key: 'skuBrand',
    type: 'String'
  },
  brandRemark: {
    key: 'skuBrandRemark',
    type: 'String'
  },
  relatedBrand: {
    key: 'skuBrandRelated',
    type: 'String'
  },
  certificat: {
    key: 'skuCertificat',
    type: 'String',
    max: 45
  },
  unitOfWeight: {
    key: 'skuUnitWeight',
    type: 'Select',
    _slot: 'unitOfWeight',
    transForm: 'WT_UNIT'
  },
  unitOfLength: {
    key: 'skuUnitLength',
    type: 'Select',
    _slot: 'unitOfLength',
    transForm: 'LH_UNIT'
  },
  unitOfVolume: {
    key: 'skuUnitVolume',
    type: 'Select',
    _slot: 'unitOfVolume',
    transForm: 'VE_UNIT'
  },
  skuLength: {
    key: 'skuLength',
    type: 'Number'
  },
  skuBreadth: {
    key: 'skuWidth',
    type: 'Number'
  },
  skuHeight: {
    key: 'skuHeight',
    type: 'Number'
  },
  skuNetWeight: {
    key: 'skuNetWeight',
    type: 'Number'
  },
  skuVolume: {
    key: 'skuVolume',
    type: 'Number'
  },
  packingMethodCn: {
    key: 'skuMethodPkgCn',
    type: 'String',
    max: 45
  },
  packingMethodEn: {
    key: 'skuMethodPkgE',
    type: 'String',
    max: 45
  },
  unitOfInnerCarton: {
    key: 'skuInnerCartonUnit',
    type: 'String',
    max: 45
  },
  skuQuantityOfInnerCarton: {
    key: 'skuInnerCartonQty',
    type: 'Number'
  },
  lengthOfInnerCarton: {
    key: 'skuInnerCartonLength',
    type: 'Number'
  },
  breadthOfInnerCarton: {
    key: 'skuInnerCartonWidth',
    type: 'Number'
  },
  heightOfInnerCarton: {
    key: 'skuInnerCartonHeight',
    type: 'Number'
  },
  netWeightOfInnerCarton: {
    key: 'skuInnerCartonWeightNet',
    type: 'Number'
  },
  grossWeightofInnerCarton: {
    key: 'skuInnerCartonRoughWeight',
    type: 'Number'
  },
  volumeOfInnerCarton: {
    key: 'skuInnerCartonVolume',
    type: 'Number'
  },
  descriptionOfInnerCarton: {
    key: 'skuInnerCartonDesc',
    type: 'String',
    max: 100
  },
  packingMethodOfInnerCartonCn: {
    key: 'skuInnerCartonMethodCn',
    type: 'String',
    max: 30
  },
  packingMethodOfInnerCartonEn: {
    key: 'skuInnerCartonMethodEn',
    type: 'String',
    max: 45
  },
  unitOfOuterCarton: {
    key: 'skuOuterCartonUnit',
    type: 'String',
    max: 20
  },
  descriptionOfOuterCarton: {
    key: 'skuOuterCartonDesc',
    type: 'String',
    max: 100
  },
  innerCartonOfOuterCarton: {
    key: 'skuInnerCartonOuterNum',
    type: 'Number'
  },
  skuQuantityOfOuterCarton: {
    key: 'skuOuterCartonQty',
    type: 'Number'
  },
  lengthOfOuterCarton: {
    key: 'skuOuterCartonLength',
    type: 'Number'
  },
  breadthOfOuterCarton: {
    key: 'skuOuterCartonWidth',
    type: 'Number'
  },
  heightOfOuterCarton: {
    key: 'skuOuterCartonHeight',
    type: 'Number'
  },
  netWeightOfOuterCarton: {
    key: 'skuOuterCartonNetWeight',
    type: 'Number'
  },
  grossWeightOfOuterCarton: {
    key: 'skuOuterCartonRoughWeight',
    type: 'Number'
  },
  volumeOfOuterCarton: {
    key: 'skuOuterCartonVolume',
    type: 'Number'
  },
  packingMethodOfOuterCartonCn: {
    key: 'skuOuterCartonMethodCn',
    max: 45
  },
  packingMethodOfOuterCartonEn: {
    key: 'skuOuterCartonMethodEn',
    max: 45
  },
  OEM: {
    key: 'skuOem',
    type: 'Select',
    _slot: 'OEM',
    transForm: 'OEM_IS'
  },
  gp20SkuQuantity: {
    key: 'skuGp20SkuQty',
    type: 'Number'
  },
  gp40SkuQuantity: {
    key: 'skuGp40SkuQty',
    type: 'Number'
  },
  hq40SkuQuantity: {
    key: 'skuHq40SkuQty',
    type: 'Number'
  },
  trayDimension: {
    key: 'skuTryDimension',
    type: 'Number'
  },
  skuQuantityPerTray: {
    key: 'skuSkuQtyPerTray',
    type: 'Number'
  },
  specialTransportRequirements: {
    key: 'skuSpecialTransportRequire',
    type: 'String',
    max: 100
  },
  inventoryCostCalculationMethod: {
    key: 'skuInventoryCostMethod',
    type: 'String',
    max: 100
  },
  defaultWarehouse: {
    key: 'skuWarehourceDefaul',
    type: 'String',
    max: 100
  },
  supplierInventoryQuantity: {
    key: 'skuInventory',
    type: 'Number',
    min: 0
  },
  supplierSafeInventoryQuantity: {
    key: 'skuSafeInventory',
    type: 'Number'
  },
  supplierMinimumInventory: {
    key: 'skuMinInventory',
    type: 'Number'
  },
  mainsaleCountry: {
    key: 'skuMainSaleCountry',
    type: 'Select',
    _slot: 'mainsaleCountry',
    transForm: 'COUNTRY'
  },
  mainsalearea: {
    key: 'skuMainSaleArea',
    type: 'String'
  },
  prductiondays: {
    key: 'skuProductionDates',
    type: 'Number'
  },
  qualityStander: {
    key: 'skuQualityStander',
    type: 'String'
  },
  yearOfListed: {
    key: 'skuYearListed',
    type: 'Select',
    state: 'Date',
    _slot: 'yearOfListed',
    time: 'yyyy-mm-dd'
  },
  useDisplayBoxOrNot: {
    key: 'skuUseDisplayBox',
    type: 'Select',
    _slot: 'useDisplayBoxOrNot',
    transForm: 'UDB_IS'
  },
  skuQuantityInDisplayBox: {
    key: 'skuDisplayBoxQty',
    type: 'Number'
  },
  lengthBreadthAndHeightOfDisplayBox: {
    key: 'skuLengthWidthHeight',
    type: 'Number'
  },
  otherPackingInformationCn: {
    key: 'skuOtherPackInfoCn',
    type: 'String'
  },
  otherPackingInformationEn: {
    key: 'skuOtherPackInfoEn',
    type: 'String',
    max: 100
  },
  adjustSkuAndPackageOrNot: {
    key: 'skuAdjustPackage',
    type: 'Select',
    _slot: 'adjustSkuAndPackageOrNot',
    transForm: 'SKU_PG_IS'
  }
};
