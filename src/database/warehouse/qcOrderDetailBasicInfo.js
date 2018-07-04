export default {
  qcOrderNo: {
    type: 'input',
    disabled: true
  },
  qcTypeDictCode: {
    type: 'select',
    isQcType: true,
    _rules: {
      required: true
    }
  },
  qcDate: {
    type: 'date',
    _rules: {
      required: true
    }
  },
  factoryAddress: {
    type: 'input',
    disabled: true
  },
  factoryContactPhone: {
    type: 'input',
    disabled: true
  },
  qcStatusDictCode: {
    type: 'select',
    isQcStatus: true,
    disabled: true
  },
  qcMethodDictCode: {
    type: 'select',
    isQcMethod: true,
    _rules: {
      required: true
    }
  },
  surveyor: {
    type: 'select',
    isSurveyor: true
  },
  serviceFee: {
    type: 'number'
  },
  serviceName: {
    type: 'select',
    isServiceName: true,
    disabled: true
  },
  exchangeCurrencyDictCode: {
    type: 'select',
    isCurrency: true,
    disabled: true
  },
  remark: {
    type: 'textarea',
    fullLine: true,
    disabled: true
  },
  attachment: {
    type: 'attachment',
    key: 'attachments',
    disabled: true
  },
}
