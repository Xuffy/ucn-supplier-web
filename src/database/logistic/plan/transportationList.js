export default {
  id: {
    type: 'text',
    _hide: true
  },
  transportationWay: {
    type: 'text'
  },
  containerNo:{
    type: 'number'
  },
  loadingType:{
    type: 'number'
  },
  logisticsNo:{
    type: 'text'
  },
  estContainerStuffingDate: {
    type: 'textDate',
    disabled: true
  },
  estCustomsCleanceDate: {
    type: 'textDate',
    disabled: true
  },
  estDepartureDate: {
    type: 'textDate',
    disabled: true
  },
  estArrivalDate: {
    type: 'textDate',
    disabled: true
  },
  estDelivaryDate: {
    type: 'textDate',
    disabled: true
  },
  containerType: {
    type: 'select'
  }
}
