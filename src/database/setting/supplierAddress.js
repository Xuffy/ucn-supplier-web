export default {
    factoryName: {
        key: 'name',
        _rules:{
            required:true,
          }
    },
    factoryAddress:{
        key: 'address',
        _rules:{
            required:true,
          }
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
    }
}
