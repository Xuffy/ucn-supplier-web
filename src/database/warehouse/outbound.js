export default {
    outboundNo:{
        key:'outboundNo',
        belong:'basicInfo',
        showType:'input',
        disabled:true,
        sysCreate:true,
    },
    shipmentInvoiceNo:{
        key:'shipmentInvoiceNo',
        belong:'basicInfo',
        showType:'input'
    },
    outboundTypeDictCode:{
        key:'outboundTypeDictCode',
        belong:'basicInfo',
        showType:'select',
    },
    outboundDate:{
        key:'outboundDate',
        belong:'basicInfo',
        showType:'date',
        _rules:{
            required:true
        }
    },
    outboundOperator:{
        key:'outboundOperator',
        belong:'basicInfo',
        showType:'input',
    },
    outboundSkuTotalQty:{
        key:'outboundSkuTotalQty',
        belong:'basicInfo',
        showType:'input',
        disabled:true
    },
    // timeZone:{
    //     key:'timeZone',
    //     belong:'basicInfo',
    //     showType:'timeZone',
    // },
    remark:{
        key:'remark',
        belong:'basicInfo',
        showType:'textarea',
        fullLine:true
    },
    attachment:{
        key:'attachments',
        belong:'basicInfo',
        isAttachment:true
    },


}
