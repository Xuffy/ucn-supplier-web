export default {
    orderNo: {
      key: 'orderNo'
    },
    orderType: {
        key: 'orderType'
    },
    // orderStatus: {
    //     key: 'status'
    // },
    orderCreateDate: {
        key: 'orderEntryDt',
       type: 'textDate',
    },
    currency: {
      key: 'currencyCode'
    },
    payable: {
      key: 'planPayAmount' //应付
    },
    paid: {
      key: 'actualPayAmount'
    },
    waitPayment: {
      _important:true,
      key: '' //待付
    },
    planDateOfPayment: {   //应付时间
      key: 'planPayDt',
      type: 'textDate',
    },
    actualDateOfPayment: {
      key: 'actualPayDt',
      type: 'textDate',
    },
    receivable: {
      key: 'planReceiveAmount'  //应收
    },
    received: {
      key: 'actualReceiveAmount'
    },
    waitReceipt: {
        _important:true,
        key: ''  //待收
    },
    planDateOfReceipt: {  //应收时间
       key:'planReceiveDt',
       type: 'textDate',
    },
    actualDateOfReceipt: {  //应收时间
      key:'actualReceiveDt',
      type: 'textDate',
    },
    _totalRow:{
        _important:true,
        _hide:true
    },
    paymentId: {
      _important:true,
      key: 'paymentId',
      _hide:true
    },
    version: {
      _important:true,
      key: 'version',
      _hide:true
    },
    type: {
      key: 'type',
      _hide:true
    },
  }