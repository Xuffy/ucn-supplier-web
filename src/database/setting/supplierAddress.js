export default {
    factoryName: {
        key: 'name',
    },
    factoryCountry: {
      key: 'country',
      _hide:true,
    },
    factoryProvince: {
      key: 'province',
      _hide:true,
    },
    factorycity: {
      key: 'city',
      _hide:true,
    },
    address:{
       key: 'address',
      _hide:true,
    },
    factoryAddress:{
      _important:true
    },
    receiveCountry: {
      key: 'recvCountry',
      _hide:true,
    },
   receiveProvince: {
      key: 'recvProvince',
      _hide:true,
    },
    receiveCity: {
      key: 'recvCity',
      _hide:true,
    },
   receiverAddress1:{
      key: 'recvAddr',
      _hide:true,
    },
   receiverAddress:{
       _important:true
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
        key: 'contactPerson2',
    },
    contactPhoneNo2: {
        key: 'contactPhone2',
        _rules:{
            type:'Number',
          }
    },
    shipper: {
      key:'shipper'
    },
    defaultAddress: {
      key: 'def'
    },
    id:{
      key: 'id',
      _hide:true,
    }
}
