'use strict';
export default {
  //order
  // orderNumber: {
  //   key: 'orderNo',
  //   belong: "order"
  // },
  orderDate: {
    key: 'entryDt',
    belong: "order",
    type: "textDate"
  },
  orderStatus: {
    key: 'status',
    belong: "order"
  },
  quantityOfSKU: {
    key: 'skuQty',
    belong: "order"
  },
  totalCartonOfSku: {
    key: 'totalOuterCartonQty',
    belong: "order"
  },
  totalSkuNetWeight: {
    key: 'totalNetWeight',
    belong: "order"
  },
  totalSkuRoughWeight: {
    key: 'totalGrossWeight',
    belong: "order"
  },
  totalSkuVolume: {
    key: 'totalVolume',
    belong: "order"
  },
  loadingDate: {
    key: '',
    belong: "order",
    type: "textDate"
  },
  dateOfBL: {
    key: '',
    belong: "order"
  },
  skuQty: {
    key:''
  },
  amount: {
    key:''
  }
}
