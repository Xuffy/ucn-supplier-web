export default {
    name: {
        key: 'name',
        _rules:{
            required:true,
          }
    },
    department:{
        key: 'deptName',
    },
    gender: {
        key: 'gender',
    },
    mobileNumber:{
        key: 'cellphone',
        _rules:{
            required:true,
            type:'Number',
          }
    },
    telNumber: {
        key: 'telphone',
        _rules:{
            type:'Number',
          }
    },
    faxNumber:{
        key: 'fax',
        _rules:{
            type:'Number',
          }
    },
    emailAddress: {
        key: 'email',
        _rules:{
            type:'Email',
          }
    },
    skype:{
        key: 'skype',
    },
    qq:{
        key: 'qq',
        _rules:{
            type:'Number',
          }
    },
    id:{
        key: 'id',
        _hide:true,
    }
}