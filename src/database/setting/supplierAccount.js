export default {
    beneficiaryName: {
        key: 'beneficiaryName',
        _rules:{
            required:true,
          }
    },
    beneficiaryAccount:{
        key: 'beneficiaryAccount',
        _rules:{
            required:true,
          }
    },
    beneficiaryAddress: {
        key: 'beneficiaryAddress',
    },
    beneficiaryBankName:{
        key: 'beneficiaryBankName',
    },
    beneficiaryBankSWIFT: {
        key: 'beneficiaryBankSwift',
        _rules:{
          required:true,
        }
    },
    accountType:{
        key: 'accountType',
    },
    currency: {
        key: 'currency',
    },
    id:{
        key: 'id',
        _hide:true,
    }
}
