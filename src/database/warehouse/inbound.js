export default {
    inboundNo:{
        key:'inboundNo',
        belong:'basicInfo',
        showType:'input',
        disabled:true,
        sysCreate:true,
    },
    inboundDate:{
        key:'inboundDate',
        belong:'basicInfo',
        showType:'date'
    },
    warehouseNo:{
        key:'warehouseNo',
        belong:'basicInfo',
        showType:'input',
    },
    warehouseName:{
        key:'warehouseName',
        belong:'basicInfo',
        showType:'input',
    },
    inboundTypeDictCode:{
        key:'inboundTypeDictCode',
        belong:'basicInfo',
        showType:'select',
    },
    warehouseManager:{
        key:'warehouseManager',
        belong:'basicInfo',
        showType:'input',
    },
    purchaser:{
        key:'purchaser',
        belong:'basicInfo',
        showType:'input',
    },
    carrier:{
        key:'carrier',
        belong:'basicInfo',
        showType:'input',
    },
    carrierPhone:{
        key:'carrierPhone',
        belong:'basicInfo',
        showType:'input',
    },
    // timeZone:{
    //     key:'timeZone',
    //     belong:'basicInfo',
    //     showType:'timezone',
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
        showType:'attachment',
        fullLine:true
    }
}
