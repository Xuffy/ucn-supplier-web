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
      _rules:{
        required:true,
      }
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
  beneficiaryBankAddress: {
    key: 'beneficiaryBankAddress',
  },
  intermediaryBankName: {
    key: 'intermBankName',
  },
  intermBankAddress: {
    key: 'intermBankAddress',
  },
  intermBankSWIFTCode: {
    key: 'intermBankCode',
  },
    id:{
        key: 'id',
        _hide:true,
    }
}
