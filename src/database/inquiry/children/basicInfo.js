export default {
    id: {
        _hide: true
    },
    _remark: {
        _hide: true
    },
    paymentTerm: {
        _inquiryHide: true,
        _hide: true
    },
    inquiryAmount: {
        _inquiryHide: true,
        _hide: true
    },
    timeZone: {
        _inquiryHide: true,
        _hide: true
    },
    operater: { //修改人 系统带入
        placeholder: 'Please select',
        width: '150px',
        type: 'String',
        _disabled: true,
        _inquiryHide: true,
    },
    time: { //时间 系统带入
        key: 'updateDt',
        placeholder: 'Please select time',
        rules: [],
        width: '150px',
        type: 'String',
        _disabled: true,
        _inquiryHide: true,
        transForm: 'time'
    },
    inquiryNo: { //询价单号 系统带入
        key: 'inquiryNo',
        placeholder: 'Please select',
        rules: [],
        width: '150px',
        type: 'String',
        state: 0,
        _disabled: true,
        _inquiryHide: true
    },
    quotationNo: { //询价子单号 系统带入
        placeholder: 'Please select',
        rules: [],
        width: '150px',
        type: 'String',
        state: 0,
        _disabled: true,
        _inquiryHide: true
    },
    createTime: { // 创建时间
        key: 'entryDt',
        placeholder: 'Please select',
        rules: [],
        width: '150px',
        type: 'String',
        _inquiryHide: true,
        _disabled: true,
        transForm: 'time'
    },
    inquiryStatus: { //询价单状态
        key: 'status',
        placeholder: 'Please select',
        rules: [],
        width: '150px',
        type: 'String',
        state: 0,
        _disabled: true,
        _inquiryHide: true,
        transForm: 'INQUIRY_STATUS'
    },
    transportationWay: { //下拉选择 运输方式
        key: 'transport',
        placeholder: 'Please select',
        rules: [],
        width: '150px',
        type: 'select',
        state: 0,
        _slot: 'transportationWay',
        transForm: 'MD_TN'
    },
    payment: { //付款方式 下拉选择
        key: 'paymentMethod',
        placeholder: 'Please select',
        rules: [],
        width: '150px',
        type: 'select',
        state: 0,
        _slot: 'paymentMethod',
        transForm: 'PMT'
    },
    destinationCountry: { //目的国 下拉选择
        placeholder: 'Please select',
        rules: [],
        width: '150px',
        type: 'select',
        state: 0,
        _slot: 'destinationCountry'
    },
    departureCountry: { //发运国 下拉选择所有选项 ok
        placeholder: 'Please select',
        rules: [],
        width: '150px',
        type: 'select',
        state: 0,
        _slot: 'departureCountry'
    },
    incoterm: { //价格条款 选择 ok
        placeholder: 'Please select',
        rules: [],
        width: '150px',
        type: 'select',
        state: 0,
        _slot: 'incoterm',
        transForm: 'ITM'
    },
    currency: { //币种 选择 ok
        placeholder: 'Please select',
        rules: [],
        width: '150px',
        type: 'select',
        state: 0,
        _slot: 'currency',
        transForm: 'CY_UNIT'
    },
    exchangeRate: {
        _disabled: true,
        _inquiryHide: true
    },
    discountRate: { //折扣率 限制输入百分比 ok
        placeholder: 'Please select',
        rules: [],
        width: '150px',
        type: 'Number',
        state: 'rate',
        min:0,
        max:100
    },
    departurePort: { //发运港口  ok
        placeholder: 'Please select',
        rules: [],
        width: '150px',
        type: 'String'
    },
    destinationPort: { //目的港口 ok
        placeholder: 'Please select',
        rules: [],
        width: '150px',
        type: 'String'
    },
    supplierName: { // 供应商名称 ok
        placeholder: 'Please select',
        rules: [],
        width: '150px',
        type: 'manySelect',
        _disabled: true
    },
    supplierType: { //供应商类型 ok
        placeholder: 'Please select',
        rules: [],
        width: '150px',
        type: 'String',
        state: 0,
        _disabled: true,
        _inquiryHide: true
    },
    exportLicense: { //出口资质 ok
        placeholder: 'Please select',
        rules: [],
        width: '150px',
        type: 'select',
        state: 0,
        _disabled: true,
        transForm: 'EL_IS'
    },
    remarkDate: {
        transForm: 'time',
        key: 'updateDt',
        label: '22',
        type: 'String',
        _disabled: true,
        _inquiryHide: true
    },
    skuQty: {
        _inquiryHide: true,
        _hide: true
    },
    relatedOrderNO: { //关联订单号
        placeholder: 'Please select',
        rules: [],
        width: '150px',
        type: 'String',
        state: 0,
        _disabled: true,
        _inquiryHide: true
    },
    inquiryRemark: { //询价备注
        key: 'remark',
        placeholder: 'Please select',
        rules: [],
        width: '150px',
        type: 'String',
        types: 'textarea',
        state: 0,
        xs: 24,
        sm: 24,
        md: 24,
        lg: 24
    },
    attachment: { //上传附件
        placeholder: 'Please select',
        rules: [],
        width: '150px',
        type: 'attachment',
        state: 0,
        xs: 24,
        sm: 24,
        md: 24,
        lg: 24,
        _slot: 'attachment'
    }
}