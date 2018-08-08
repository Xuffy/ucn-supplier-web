export default {
    /**
     * basic info
     * */
    orderNo:{
        type:'input',
        belong:'basicInfo',
        disabled:true
    },
    entryDt:{
        type:'date',
        belong:'basicInfo',
        createHide:true,
        disableDetail:true
    },
    customerOrderNo:{
        type:'input',
        belong:'basicInfo'
    },
    customerName:{
        type:'input',
        belong:'basicInfo',
        createHide:true,
        disableDetail:true
    },
    supplierOrderNo:{
        type:'input',
        belong:'basicInfo'
    },
    supplierName:{
        type:'select',
        belong:'basicInfo',
        isSupplier:true,
        disableDetail:true
    },
    // supplierCode:{  //供应商编号
    //     type:'select',
    //     belong:'basicInfo',
    // },
    quotationNo:{
        type:'input',
        belong:'basicInfo',
        disabled:true,
        isQuotationNo:true
    },
    status:{
        type:'select',
        belong:'basicInfo',
        createHide:true,
        isStatus:true,
        disableDetail:true
    },
    deliveryDt:{
        type:'date',
        belong:'basicInfo',
    },
    incoterm:{
        type:'select',
        belong:'basicInfo',
        isIncoterm:true
    },
    currency:{
        type:'select',
        belong:'basicInfo',
        isCurrency:true
    },
    // incotermArea:{
    //     type:'input',
    //     belong:'basicInfo',
    // },
    paymentTerm:{
        type:'select',
        belong:'basicInfo',
        isPayment:true
    },
    lcNo:{
        type:'input',
        belong:'basicInfo',
    },
    paymentDays:{
        type:'number',
        belong:'basicInfo',
    },
    // paymentStatus:{
    //     type:'select',
    //     belong:'basicInfo',
    //     isPaymentStatus:true
    // },
    departureCountry:{
        type:'select',
        belong:'basicInfo',
        isCountry:true
    },
    departurePort:{
        type:'input',       //??????
        belong:'basicInfo',
    },
    destCountry:{
        type:'select',
        belong:'basicInfo',
        isCountry:true
    },
    destPort:{
        type:'input',       //??????
        belong:'basicInfo',
    },
    transport:{
        type:'select',
        belong:'basicInfo',
        disabled:true,
        isTransport:true
    },
    customerAgreementNo:{
        type:'input',
        belong:'basicInfo',
    },
    customerAgreementDt:{
        type:'date',
        belong:'basicInfo',
    },
    remark:{
        type:'textarea',
        belong:'basicInfo',
        fullLine:true
    },
    attachment:{
        type:'attachment',
        belong:'basicInfo',
        fullLine:true
    },

    /**
     * exchange Rate
     * */
    cnyToUsd:{
        key:'CNY|USD',
        belong:'exchangeRate'
    },
    cnyToEur:{
        key:'CNY|EUR',
        belong:'exchangeRate'
    },
    usdToEur:{
        key:'USD|EUR',
        belong:'exchangeRate'
    },

}