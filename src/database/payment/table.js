export default {
  orderNo: {
    key: 'orderNo'
  },
  orderType: {
      key: 'orderType'
  },
  orderStatus: {
      key: 'orderStatus'
  },
  orderCreateDate: {
    key: 'orderEntryDt',
    type: 'textDate',
  },
  currency: {
    key: 'currencyCode'
  },
  payable: {
    key: 'planPayAmount', //应付
    _important:true,
  },
  paid: {
    key: 'actualPayAmount',
    _important:true,
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
    key: 'planReceiveAmount',
    _important:true,   //应收
  },
  received: {
    key: 'actualReceiveAmount',
    _important:true,
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
  _totalRow: {
     key:'total',
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
  timestamp: {
    _important:true,
    _hide:true
  }
}
