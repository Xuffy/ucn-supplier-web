/**
 * 定义Code的值类型等配置
 */
const codeConfig = {
  'AE_IS': {valueType: Number}, // Boolean
  'EL_IS': {valueType: Number}, // Boolean
  'INQUIRY_STATUS': {valueType: Number},
  'ITM': {valueType: Number},
  'LH_UNIT': {valueType: Number},
  'ED_UNIT': {valueType: Number},
  'MD_TN': {valueType: Number},
  'OEM_IS': {valueType: Number}, // Boolean
  'RA_IS': {valueType: Number}, // Boolean
  'PMT': {valueType: Number},
  'SKU_PG_IS': {valueType: Number}, // Boolean
  'SKU_SALE_STATUS': {valueType: Number},
  'SKU_UNIT': {valueType: Number},
  'SUPPLIER_TYPE': {valueType: Number},
  'UDB_IS': {valueType: Number}, // Boolean
  'WT_UNIT': {valueType: Number},
  'VE_UNIT': {valueType: Number},
  'CY_UNIT': {valueType: String},
  'COUNTRY': {valueType: String}
};

const codeUtils = {
  convertDicValueType(codelist) {
    for (let codes of codelist) {
      if (codes.code && Array.isArray(codes.codes) && codeConfig[codes.code]) {
        let cfg = codeConfig[codes.code];
        for (let code of codes.codes) {
          let value = this.isUndefinedOrNull(code.value) ? code.code : code.value;
          code.value = code.code = cfg.valueType(value);
        }
      }
    }
    return codelist;
  },
  isUndefinedOrNull(value) {
    return typeof value === 'undefined' || value === null;
  }
};

export default codeUtils;
