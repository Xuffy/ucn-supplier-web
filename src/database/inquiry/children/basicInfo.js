export default {
    id: {
        _hide: true
    },
    _remark: {
        _hide: true
    },
    status: {
        _inquiryHide: true,
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
    remarkDate: {
        key: 'updateDt',
        state: 'time',
        label: '22',
        type: 'String',
        _disabled: true,
        _inquiryHide: true
    },
    skuQty: {
        _inquiryHide: true,
        _hide: true
    },
    operater: { //修改人 系统带入
        placeholder: 'Please select',
        width: '150px',
        type: 'String',
        state: 'time',
        _disabled: true,
        _inquiryHide: true
    },
    time: { //时间 系统带入
        key: 'entryDt',
        placeholder: 'Please select time',
        rules: [],
        width: '150px',
        type: 'String',
        state: 'time',
        _disabled: true,
        _inquiryHide: true
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
        state: 'time',
        _inquiryHide: true,
        _disabled: true
    },
    inquiryStatus: { //询价单状态
        placeholder: 'Please select',
        rules: [],
        width: '150px',
        type: 'String',
        state: 0,
        _disabled: true,
        _inquiryHide: true
    },
    transportationWay: { //下拉选择 运输方式
        key: 'transport',
        placeholder: 'Please select',
        rules: [],
        width: '150px',
        type: 'select',
        state: 0,
        _slot: 'transportationWay'
    },
    payment: { //付款方式 下拉选择
        key: 'paymentMethod',
        placeholder: 'Please select',
        rules: [],
        width: '150px',
        type: 'select',
        state: 0,
        _slot: 'paymentMethod'
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
        _slot: 'incoterm'
    },
    currency: { //币种 选择 ok
        placeholder: 'Please select',
        rules: [],
        width: '150px',
        type: 'select',
        state: 0,
        _slot: 'currency'
    },
    discountRate: { //折扣率 限制输入百分比 ok
        placeholder: 'Please select',
        rules: [],
        width: '150px',
        type: 'Number',
        state: 0,
        min:0,
        max:100
    },
    departurePort: { //发运港口  ok
        placeholder: 'Please select',
        rules: [],
        width: '150px',
        type: 'String',
        state: 0
    },
    destinationPort: { //目的港口 ok
        placeholder: 'Please select',
        rules: [],
        width: '150px',
        type: 'String',
        state: 0
    },
    supplierName: { // 供应商名称 ok
        placeholder: 'Please select',
        rules: [],
        width: '150px',
        type: 'manySelect',
        state: 0
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
        _slot: 'exportLicense'
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