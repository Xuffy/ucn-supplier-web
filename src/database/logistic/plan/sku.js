export default {
  id: {
    type: 'text',
    _hide: true
  },
  skuPictures:{
    type: 'String',
    _image:true,
    _upload:{
      readonly:true
    },
  },
  logisticsNo: {
    type: 'text'
  },
  customerName:{
    type: 'String'
  },
  skuCode: {
    type: 'text'
  },
  customerSkuCode: {
    type: 'text'
  },
  skuNameCn: {
    type: 'text'
  },
  orderNo: {
    type: 'text'
  },
  containerNo: {
    type: 'text'
  },
  totalQuantityOfOuterCartonsInContainer: {
    key: 'ctnQty',
    type: 'String',
  },
  totalQuantityInContainer: {
    key: 'totalContainerQty',
    _filed: 'totalContainerQty',
    type: 'String',
  },
  totalVolumeInContainer: {
    key: 'totalContainerVolume',
    type: 'String'
  },
  totalNetWeightInContainer: {
    key: 'totalContainerNetWeight',
    type: 'String'
  },
  totalContainerGrossWeight: {
    key:'totalGrossWeight',
    type: 'String'
  },
  unitExportPrice: {
    type: 'String'
  },
  totalPriceOfExport: {
    key:'totalExportPrice',
    type: 'String'
  },
  currency: {
    type: 'String'
  },
  loadingType:{
    type: 'text'
  },
  blType:{
    type: 'text'
  },
  blQuantity:{
    key:'blQty',
    type: 'text'
  },
  blNo:{
    type: 'text'
  },
  shipServiceProvider:{
    type: 'text'
  },
  receiptCompany:{
    type: 'text'
  },
  shippingAgent: {
    type: 'text'
  },
  permitedForTransportation:{
    key:'permitedTransportation',
    type: 'text'
  },
  transportationWay: {
    type: 'text'
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
  skuBarCode: {
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
  departureCountry: {
    type: 'text'
  },
  containerType: {
    type: 'text'
  },
  createDate:{
    type: 'String'
  },
  payment:{
    type: 'String'
  },
  bookingDate:{
    key:'actBookingDate',
    _filed:'actBookingDate',
    type: 'String'
  },
  estContainerStuffingDate: {
    type: 'textDate'
  },
  estDepartureDate: {
    type: 'textDate'
  },
  estArrivalDate: {
    type: 'textDate'
  },
  actContainerStuffingDate: {
    type: 'textDate'
  },
  declareDate: {
    key:'actDeclareDate',
    type: 'textDate'
  },
  actDepartureDate: {
    type: 'textDate'
  },
  actCustomsCleanceDate: {
    type: 'textDate'
  },
  actReleaseDate: {
    type: 'textDate'
  },
  actArrivalDate: {
    type: 'textDate'
  },
  skuCartonQty: {
    type: 'textDate'
  },
}
