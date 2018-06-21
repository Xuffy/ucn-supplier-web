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
          }
    },
    telNumber: {
        key: 'telphone',
    },
    faxNumber:{
        key: 'fax',
    },
    emailAddress: {
        key: 'email',
    },
    skype:{
        key: 'skype',
    },
    qq:{
        key: 'qq',
    },
    id:{
        key: 'id',
        _hide:true,
    }
}