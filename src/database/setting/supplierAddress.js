export default {
    factoryName: {
        key: 'name',
    },
    factoryAddress:{
        key: 'address',
    },
    exportPort: {
        key: 'exportPort',
    },
    ContacctPerson1:{
        key: 'contactPerson1',
        _rules:{
            required:true,
          }
    },
    contactPhoneNo1: {
        key: 'concatPhone1',
        _rules:{
            required:true,
            type:'Number',
          }
    },
    contacctPerson2:{
        key: 'contacctPerson2',
    },
    contactPhoneNo2: {
        key: 'contactPhone2',
        _rules:{
            type:'Number',
          }
    },
    id:{
        key: 'id',
        _hide:true,
    },
    defaultAddress: {
      key: 'def'
    },
    receiveCountry: {
      key: '',
      _hide:true
    },
    receiveProvince: {
      key: '',
      _hide:true
    },
    receiveCity: {
      key: '',
    },
    receiverAddress1: {
      key: '',
  },
  receiverAddress:{
    key: '',
    _important:true,
  }
}
