export default {
    id: {
      _hide: true
    },
    inquiryId: {
      _hide: true
    },
    inquiryNo: { // 系统自动生成 询价母单号
  
    },
    quotationNo: { // 系统带入：当前询价单的子单号
  
    },
    entryDt: { // 创建时间
      transForm: 'time'
    },
    status: { // 系统带入，共四个状态及其触发： 询价状态
      transForm: 'INQUIRY_STATUS'
    },
    supplierName: { // 系统带入：当前询价单所选的供应商（多个供应商用逗号隔开） 供应商名称
  
    },
    skuCode: { // 产品编码 系统带入：inquiry中的sku 编码
  
    },
    skuNameEN: { // 系统带入：inquiry中的sku 名称 产品英文品名
      key: 'skuNameEn'
    },
    qty: {
      key: 'qty',
      type: 'Number',
      _disabled: true,
      _toFixed: 1
    },
    skuFobCurrency: { // FOB币种
      transForm: 'CY_UNIT'
    },
    skuFobPrice: { // FOB价格
    },
    skuExwCurrency: { // EXW币种
      transForm: 'CY_UNIT'
    },
    skuExwPrice: { // EXW价格
    },
    skuCifCurrency: { // CIF币种
      transForm: 'CY_UNIT'
    },
    skuCifPrice: { // CIF价格
    },
    skuDduCurrency: { // DDU币种
      transForm: 'CY_UNIT'
    },
    skuDduPrice: { // DDU价格
    },
    incoterm: { // 付款条款 系统带入，当前inquiry所选的付款条款
      transForm: 'ITM'
    },
    departurePort: { // 发运港口 系统带入，当前inquiry所选的发运港口
  
    },
    destinationPort: { // 目的港口 系统带入，当前inquiry所选目的港口
  
    },
    inquiryRemark: { // 询价备注 系统带入，当前inquiry所填的询价备注
      key: 'remark'
    }
};
  