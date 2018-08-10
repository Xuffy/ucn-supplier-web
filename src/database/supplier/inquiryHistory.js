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
    key: 'totalCtn',                //产品箱数
  },
  totalNetWeight: {
    key: 'totalNetWeight',          //产品总净重
  },
  totalRoughWeight: {
    key: 'totalGrossWeight',        //产品总毛重
  },
  totalVolum: {
    key: 'totalVolume',             //产品总体积
  },
  status: {
    key:'status'                    //询价状态
  },
  relatedOrderNO: {
    key: 'orderNo'                  //关联订单号
  }
}
