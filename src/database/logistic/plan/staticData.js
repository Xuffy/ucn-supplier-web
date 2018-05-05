/*
* created by lu.yixin on 2018/05/02
*/

export const basicInfoInput = [
  'logisticsNo',
  'logisticsStatus',
  'shipServiceProvider',
  'receiptCompany',
  'shippingAgent',
  'paymentTerms',
  'loadingType',
  'blQuantity',
  'blNumber',
  'shipper',
  'consignee',
  'notify',

  'transportCompany',
  'vesselName',
  'vesselNo',
  'departureCountry',
  'departurePort',
  'destinationCountry',
  'destinationPort',
  'customerName'
]

export const basicInfoSelector = [
  'exchangeCurrency',
  'payment',
  'permitedForTransportation',
  'blType',
  'transportationWay'
]

export const basicInfoDate = [
  'createDate',
  'declareDate',
  'bookingDate',
  'estContainerStuffingDate',
  'estCustomsCleanceDate',
  'estDepartureDate',
  'estArrivalDate',
  'estReleaseDate',
  'estDelivaryDate',
  'actDeliveryDate',
  'actContainerStuffingDate',
  'actCustomsCleanceDate',
  'actDepartureDate',
  'actArrivalDate',
  'actReleaseDate'
]

export const disabledFields = [
  'logisticsNo',
  'customerName'
]

export const basicInfoObj = {
  logisticsNo: '',
  estContainerStuffingDate: '',
  estCustomsCleanceDate: '',
  estDepartureDate: '',
  estArrivalDate: '',
  estReleaseDate: '',
  estDelivaryDate: '',
  logisticsStatus: '',
  createDate: '',
  declareDate: '',
  bookingDate: '',
  actDeliveryDate: '',
  actContainerStuffingDate: '',
  actCustomsCleanceDate: '',
  actDepartureDate: '',
  actArrivalDate: '',
  actReleaseDate: '',
  shipServiceProvider: '',
  customerName: '',
  receiptCompany: '',
  shippingAgent: '',
  exchangeCurrency: '',
  payment: '',
  paymentTerms: '',
  transportationWay: '',
  loadingType: '',
  permitedForTransportation: '',
  blType: '',
  blQuantity: '',
  blNumber: '',
  shipper: '',
  consignee: '',
  notify: ''
}

export const transportInfoObj = {
  transportCompany: '',
  vesselName: '',
  vesselNo: '',
  departureCountry: '',
  departurePort: '',
  destinationCountry: '',
  destinationPort: ''
}
