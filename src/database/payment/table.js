export default {
    orderNo: {
      key: 'orderNo'
    },
    orderType: {
        key: 'orderType'
    },
    orderStatus: {
        key: 'status'
    },
    ordercreatedate: {
        key: 'orderEntryDt',
       type: 'textDate',
    },
    paymentUpdateDate: {
        key: 'updateDt',
       type: 'textDate',
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
    actualDateOfReceipt: {
        key: 'actualReceiveDt',
        type: 'textDate',
    },
    currencyCode: {
        key: 'currencyCode'
    },
    _totalRow:{
        _important:true,
        _hide:true
    }
  }
