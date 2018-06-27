/*
 * created by L_Recall on 2018/05/28
 */
export const basicInfoObj = {
  logisticsNo: {
    type: 'input',
    value: null,
    disabled:true 
  },
  logisticsStatus: {
    type: 'selector',
    value: 2,
    defaultVal: 2
  },
  customerName: {
    type: 'input',
    value: null,
    disabled:true 
  },
  bookingDate: {
    type: 'date',
    value: null
  },
  estContainerStuffingDate: {
    type: 'date',
    value: null
  },
  actContainerStuffingDate: {
    type: 'date',
    value: null
  },
  estCustomsCleanceDate: {
    type: 'date',
    value: null
  },
  actCustomsCleanceDate: {
    type: 'date',
    value: null
  },
  estDepartureDate: {
    type: 'date',
    value: null
  },
  actDepartureDate: {
    type: 'date',
    value: null
  },
  estArrivalDate: {
    type: 'date',
    value: null
  },
  actArrivalDate: {
    type: 'date',
    value: null
  },
  estReleaseDate: {
    type: 'date',
    value: null
  },
  actReleaseDate: {
    type: 'date',
    value: null
  },
  estDeliveryDate: {
    key:'estDelivaryDate',
    type: 'date',
    value: null
  },
  actDeliveryDate: {
    type: 'date',
    value: null
  },
  createDate: {
    type: 'date',
    value: null
  },
  declareDate: {
    type: 'date',
    value: null
  },
  shipServiceProvider: {
    type: 'input',
    value: null
  },
  // customerName: {     type: 'selector',     value: null   },
  receiptCompany: {
    type: 'input',
    value: null,
  },
  shippingAgent: {
    type: 'input',
    value: null
  },
  exchangeCurrency: {
    type: 'selector',
    value: null,
    _rules:{
      required:true
    }
  },
  payment: {
    type: 'selector',
    value: null,
    _rules:{
      required:true
    }
  },
  paymentTerm: {
    type: 'input',
    value: null
  },
  transportationWay: {
    type: 'input',
    value: '海运',
    defaultVal:'海运',
    disabled:true 
  },
  loadingType: {
    type: 'input',
    value: '集装箱',
    defaultVal:'集装箱',
    disabled:true 
  },
  permitedForTransportation: {
    type: 'selector',
    value: null
  },
  blType: {
    type: 'selector',
    value: null
  },
  blQty: {
    type: 'input',
    value: '',
    _rules:{
      required:true,
      type:'Number'
    }
  },
  blNo: {
    type: 'input',
    value: null
  },
  shipper: {
    type: 'input',
    value: null
  },
  consignee: {
    type: 'input',
    value: null
  },
  notify: {
    type: 'input',
    value: null
  }
}
export const ExchangeRateInfo = {
  'CNYUSD':{
    type: 'input',
    value: null,
    disabled:true 
  },
  'USDCNY':{
    type: 'input',
    value: null,
    disabled:true 
  },
  'CNYEUR':{
    type: 'input',
    value: null,
    disabled:true 
  },
  'EURCNY':{
    type: 'input',
    value: null,
    disabled:true 
  },
  'USDEUR':{
    type: 'input',
    value: null,
    disabled:true 
  },
  'EURUSD':{
    type: 'input',
    value: null,
    disabled:true 
  },
}


export const transportInfoObj = {
  transportCompany: {
    type: 'input',
    value: null
  },
  vesselName: {
    type: 'input',
    value: null
  },
  vesselNo: {
    type: 'input',
    value: null
  },
  departureCountry: {
    type: 'input',
    value: null
  },
  departurePort: {
    type: 'input',
    value: null,
    _rules:{
      required:true
    }
  },
  destinationCountry: {
    type: 'input',
    value: null
  },
  destinationPort: {
    type: 'input',
    value: null,
    _rules:{
      required:true
    }
  }
}

export const payMentInfo = {
  paymentItem: {
    key:'name',
    _rules:{
      required:true
    }
  },
  supplierName: {
    key:'payToCompanyName',
    _rules:{
      required:true
    }
  },
  estPayDate: {
    key:'planPayDt',
    _rules:{
      required:true
    }
  },
  estAmount: {
    key:'planPayAmount',
    _rules:{
      type:'Number',
      required:true
    }
  },
  actPayDate: {
    key:'actualPayDt',
  },
  actAmount: {
    key:'actualPayAmount'
  }
}


export const dbProductInfo = {
  "containerNo":{
    _rules:{
      required:true
    }
  },
  "containerType":{
    _rules:{
      required:true
    }
  },
  "totalQuantityInContainer":{
    key:'totalContainerQty',
    _rules:{
      type:'Number'
    }
  },
  "totalVolumeInContainer":{
    key:'totalContainerVolume',
    _rules:{
      type:'Number'
    }
  },
  "totalNetWeightInContainer":{
    key:'totalContainerNetWeight',
    _rules:{
      type:'Number'
    }
  },
  "totalQuantityOfOuterCartonsInContainer":{ 
    key:'totalContainerOuterCartonsQty',
    _rules:{
      type:'Number'
    }
  },
  // "shipmentStatus":{
  //   _rules:{
  //     required:true
  //   }
  // },
}