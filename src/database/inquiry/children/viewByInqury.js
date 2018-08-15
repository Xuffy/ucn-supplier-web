export default {
    companyId: {
        _hide: true
    },
    compareDisplay: {
        _hide: true
    },
    updateId: {
        _hide: true
    },
    tenantId: {
        _hide: true
    },
    ownerId: {
        _hide: true
    },
    id: {
        _hide: true
    },
    inquiryNo: { //系统带入：当前询价单的母单号
        
    },
    quotationNo: { //系统带入：当前询价单的子单号

    },
    entryDt: { // 创建时间
      transForm: 'time'
    },
    companyName: { // 采购商名称

    },
    customerAbbr: { // 采购商简称

    },
    status: { //系统带入，共四个状态：TOC-C;TOB-S;finish;cancel 
        transForm: 'INQUIRY_STATUS'
    },
    supplierName: { //系统带入：当前询价单所选的供应商（如果有多个供应商用逗号隔开）

    },
    periodOfValidity: { // 报价有效期
  
    },
    quantity: { //系统计算：当前询价单所有产品的数量
        key: 'skuQty',
        type: 'Number',
        _toFixed: 1
    },
    totalQty: {
      type: 'Number',
      _toFixed: 1
    },
    totalCtn: {
      type: 'Number',
      _toFixed: 1
    },
    totalAmount: {
      type: 'Number',
      _toFixed: 2
    },
    totalVolume: {
      type: 'Number',
      _toFixed: 3
    },
    totalNetWeight: {
      type: 'Number',
      _toFixed: 3
    },
    totalGrossWeight: {
      type: 'Number',
      _toFixed: 3
    },
    currency: { //系统带入，当前inquiry所选的币种
        key: 'currency',
        transForm: 'CY_UNIT'
    },
    incoterm: { //系统带入，当前inquiry所选的付款条款
        transForm: 'ITM'
    },
    departurePort: { //系统带入，当前inquiry所选的发运港口
        transForm: 'PORT'
    },
    destinationPort: { //系统带入，当前inquiry所选目的港口

    },
    inquiryRemark: { //询价备注 系统带入
        key: 'remark'
    }
};