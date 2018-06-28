'use strict';
export default {
  //询价历史
  inquiryNo: {
    key: 'quotationNo',
  },
  inquiryDate: {
    key: 'entryDt',
    type: "textDate"
  },
  incoterm: {
    key: 'incoterm',
  },
  skuQuantityOfInquiry: {
    key: 'skuQty',
  },
  quantityOfCarton: {
    key: 'updateDt',
    type: "textDate"
  },
  totalNetWeight: {
    key: '', //  产品总净重   春春说这几个值需要计算，需要延后
  },
  totalRoughWeight: {
    key: '',  //  产品总毛重
  },
  totalVolum: {
    key: '', //  产品总体积
  },
}
