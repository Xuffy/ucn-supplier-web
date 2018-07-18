export default {
  updateDt: {
    key: 'updateDt',
    type: 'text',
    _disabled: true,
    _title: 'remark',
    transForm: 'time'
  },
  skuSysCode: {
    key: 'skuSysCode',
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
    key: 'skuPictures',
    _image: true,
    _upload: {
      readonly: true
    }
  },
  skuSaleStatus: {
    key: 'skuStatus',
    _disabled: true,
    transForm: 'SKU_SALE_STATUS'
  },
  deleteOrNotRecycle: {
    key: 'skuRecycle',
    _disabled: true,
    transForm: 'AE_IS'
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
    state: 'category',
    transForm: 'SKU_CATEGORY',
    _disabled: true
  },
  barcode: {
    key: 'skuBarcode',
    type: 'String'
  },
  readilyAvailable: {
    key: 'skuReadilyAvailable',
    type: 'Select',
    transForm: 'RA_IS'
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
    transForm: 'ED_UNIT'
  },
  explain: {
    key: 'skuComments',
    type: 'String',
    max: 300
  },
  fobCurrency: {
    key: 'skuFobCurrency',
    type: 'Select',
    transForm: 'CY_UNIT'
  },
  fobPrice: {
    key: 'skuFobPrice',
    type: 'Number',
    _totalRow: true
  },
  referenceFobPriceUsd: {
    key: 'skuRefFobPrice',
    type: 'Number',
    _disabled: true,
    _totalRow: true
  },
  fobPort: {
    key: 'skuFobPort',
    type: 'String'
  },
  exwPrice: {
    key: 'skuExwPrice',
    type: 'Number',
    _totalRow: true
  },
  exwCurrency: {
    key: 'skuExwCurrency',
    type: 'Select',
    transForm: 'CY_UNIT'
  },
  cifPrice: {
    key: 'skuCifPrice',
    type: 'Number',
    _totalRow: true
  },
  referenceCifPriceUsd: {
    key: 'skuRefCifPrice',
    type: 'Number',
    _disabled: true,
    _totalRow: true
  },
  cifCurrency: {
    key: 'skuCifCurrency',
    type: 'Select',
    transForm: 'CY_UNIT'
  },
  cifArea: {
    key: 'skuCifArea',
    type: 'String'
  },
  dduOrice: {
    key: 'skuDduPrice',
    type: 'Number',
    _totalRow: true
  },
  referenceDdupriceUsd: {
    key: 'skuRefDduPrice',
    type: 'Number',
    _disabled: true,
    _totalRow: true
  },
  dduCurrency: {
    key: 'skuDduCurrency',
    type: 'Select',
    transForm: 'CY_UNIT'
  },
  dduArea: {
    key: 'skuDduArea',
    type: 'String'
  },
  rateOfValueAddedTax: {
    key: 'skuRateValueAddedTax',
    type: 'Number',
    unit: '%',
    max: 100,
    min: 0
  },
  taxRefundRate: {
    key: 'skuTaxRefundRate',
    type: 'Number',
    unit: '%',
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
    transForm: 'WT_UNIT'
  },
  unitOfLength: {
    key: 'skuUnitLength',
    type: 'Select',
    transForm: 'LH_UNIT'
  },
  unitOfVolume: {
    key: 'skuUnitVolume',
    type: 'Select',
    transForm: 'VE_UNIT'
  },
  skuLength: {
    key: 'skuLength',
    type: 'Number',
    _totalRow: true
  },
  skuBreadth: {
    key: 'skuWidth',
    type: 'Number',
    _totalRow: true
  },
  skuHeight: {
    key: 'skuHeight',
    type: 'Number',
    _totalRow: true
  },
  skuNetWeight: {
    key: 'skuNetWeight',
    type: 'Number',
    _totalRow: true
  },
  skuVolume: {
    key: 'skuVolume',
    type: 'Number',
    _totalRow: true
  },
  packingMethodCn: {
    key: 'skuMethodPkgCn',
    type: 'String',
    max: 45
  },
  packingMethodEn: {
    key: 'skuMethodPkgEn',
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
    type: 'Number',
    _totalRow: true
  },
  lengthOfInnerCarton: {
    key: 'skuInnerCartonLength',
    type: 'Number',
    _totalRow: true
  },
  breadthOfInnerCarton: {
    key: 'skuInnerCartonWidth',
    type: 'Number',
    _totalRow: true
  },
  heightOfInnerCarton: {
    key: 'skuInnerCartonHeight',
    type: 'Number',
    _totalRow: true
  },
  netWeightOfInnerCarton: {
    key: 'skuInnerCartonWeightNet',
    type: 'Number',
    _totalRow: true
  },
  grossWeightofInnerCarton: {
    key: 'skuInnerCartonRoughWeight',
    type: 'Number',
    _totalRow: true
  },
  volumeOfInnerCarton: {
    key: 'skuInnerCartonVolume',
    type: 'Number',
    _totalRow: true
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
    type: 'Number',
    _totalRow: true
  },
  lengthOfOuterCarton: {
    key: 'skuOuterCartonLength',
    type: 'Number',
    _totalRow: true
  },
  breadthOfOuterCarton: {
    key: 'skuOuterCartonWidth',
    type: 'Number',
    _totalRow: true
  },
  heightOfOuterCarton: {
    key: 'skuOuterCartonHeight',
    type: 'Number',
    _totalRow: true
  },
  netWeightOfOuterCarton: {
    key: 'skuOuterCartonNetWeight',
    type: 'Number',
    _totalRow: true
  },
  grossWeightOfOuterCarton: {
    key: 'skuOuterCartonRoughWeight',
    type: 'Number',
    _totalRow: true
  },
  volumeOfOuterCarton: {
    key: 'skuOuterCartonVolume',
    type: 'Number',
    _totalRow: true
  },
  packingMethodOfOuterCartonCn: {
    key: 'skuOuterCartonMethodCn',
    max: 45
  },
  packingMethodOfOuterCartonEn: {
    key: 'skuOuterCartonMethodEn',
    max: 45
  },
  oem: {
    key: 'skuOem',
    type: 'Select',
    transForm: 'OEM_IS'
  },
  gp20SkuQuantity: {
    key: 'skuGp20SkuQty',
    type: 'Number',
    _totalRow: true
  },
  gp40SkuQuantity: {
    key: 'skuGp40SkuQty',
    type: 'Number',
    _totalRow: true
  },
  hq40SkuQuantity: {
    key: 'skuHq40SkuQty',
    type: 'Number',
    _totalRow: true
  },
  trayDimension: {
    key: 'skuTryDimension',
    type: 'Number'
  },
  skuQuantityPerTray: {
    key: 'skuSkuQtyPerTray',
    type: 'Number',
    _totalRow: true
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
    key: 'skuWarehourceDefault',
    type: 'String',
    max: 100
  },
  supplierInventoryQuantity: {
    key: 'skuInventory',
    type: 'Number',
    min: 0,
    _totalRow: true
  },
  supplierSafeInventoryQuantity: {
    key: 'skuSafeInventory',
    type: 'Number',
    _totalRow: true
  },
  supplierMinimumInventory: {
    key: 'skuMinInventory',
    type: 'Number',
    _totalRow: true
  },
  mainsaleCountry: {
    key: 'skuMainSaleCountry',
    type: 'Select',
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
    state: 'Date',
    time: 'yyyy-mm'
  },
  useDisplayBoxOrNot: {
    key: 'skuUseDisplayBox',
    type: 'Select',
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
    transForm: 'SKU_PG_IS'
  },
  fieldDisplay: {
    _hide: true
  },
  fieldRemarkDisplay: {
    _hide: true
  }
};
