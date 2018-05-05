//.......................................................order overview
const tableData = {
    //.............................view by order
    SequenceNumber: 'Sequence Number',
    important: 'Important',
    attachment: 'Attachment',
    alert: 'Alert',
    archive: "Archive",
    orderId: 'Order ID',
    orderDate: 'Order Date',
    orderStatus: 'Order Status',
    CustomerShortName: 'Customer Short Name',
    PurchaseOrderNumber: 'Purchase Order Number',
    SupplierShortName: 'Supplier Short Name',
    SalesOrderNumber: 'Sales Order Number',
    PriceTerms: 'Price Terms',
    incotermArea: 'Incoterm Area',
    lcNumber: 'LC Number',
    PaymentMethod: 'Payment Method',
    currency: 'Currency',
    EstDeliveryDate: 'Est Delivery Date',
    ActDeliveryDate: 'Act Delivery Date',
    CountryofShipmentOrigin: 'Country of Shipment Origin',
    DestinationCountry: 'Destination Country',
    CustomerAgreementID: 'Customer Agreement ID',
    CustomerAgreementDate: "Customer Agreement Date",
    comments: 'Comments',
    PaymentRemark: 'Payment Remark',
    TotalProductPrice: 'Total Product Price',
    PaidAmount: 'Paid Amount',
    UnpaidAmount: 'Unpaid Amount',
    InboundQuantity: 'Inbound Quantity',
    QuantityofDelivery: 'Quantity of Delivery',
    ModifyTime: 'Modify Time',
    CreateTime: 'Create Time',
    SubinquiryID: 'Sub-inquiry ID',
    TotalQuantity: 'Total Quantity',
    TotalCarton: 'Total Carton',
    TotalGrossWeight: 'Total Gross Weight',
    TotalNetWeight: 'Total Net Weight',
    TotalVolume: 'Total Volume',
    SKUQuantity: 'SKU Quantity',
    //.........................................view by sku
    OrderNumber: 'Order Number',
    CustomerItemNumber: 'Customer Item Number',
    ProductBarCode: 'Product Bar-Code',
    VendorSKUcode: 'Vendor SKU code',
    SupplierShortName: 'Supplier Short Name',
    EnglishProductName: 'English Product Name',
    ProductDescriptionCustomerLanguage: 'Product Description (Customer Language)',
    ProductDescriptionEnglish: 'Product Description (English)',
    Material: 'Material',
    UnitPrice: 'Unit Price',
    Quantity: 'Quantity',
    TotalPrice: 'Total Price',
    OrderDate: 'Order Date',
    EstDeliveryDate: 'Est Delivery Date',
    ActDeliveryDate: 'Act Delivery Date',
    OnBoardDate: 'On Board Date',
    LogisticsQuantity: 'Logistics Quantity',
    ProductStatus: 'Product Status',
    PriceTerms: 'Price Terms',
    incotermarea: 'incoterm area',
    CreateTime: 'Create Time',
    ModifyTime: 'Modify Time',
    Comments: 'Comments',
}
//............................................................po detail
const basicinfo = {
    basicInfo: 'Basic Info',
    orderNo: 'Order NO',
    orderDate: 'Order Date',
    customerOrderNo: 'Customer Order No',
    customerName: 'Customer Name',
    customerNo: 'Customer No.',
    supplierOrderNo: 'Supplier Order No.',
    supplierName: 'Supplier Name',
    supplierNo: 'Supplier No',
    QuotationNo: 'Quotation No.',

    //....下拉框
    orderStatus: 'Order Status',
    TBCByCustomer: 'TBC by customer',
    TBCBySupplier: 'TBC by supplier',
    Process: 'Process',
    Finished: 'Finished',
    Cancled: 'Cancled',

    deliveryDate: 'Delivery Date',

    //。。。下拉框
    incoterm: 'Price Terms',
    fob: 'fob',
    exw: 'exw',
    //    其他:'其他'

    incortermAea: 'Incoterm Area',

    //.....下拉
    payment: 'Payment',
    //       T/T,L/C,Cash,Bank Transfer,DP,DA

    lcNo: 'LC No.',
    paymentDays: 'Payment Days',
    paymentStatus: 'Payment Status',
    departureCountry: 'DepartureCountry',
    departurePort: 'Departure Port',
    destinationCountry: 'Destination Country',
    destinationPort: 'Destination Port',

    //......下拉框
    transportationWay: 'Transportation Way',
    //    海运: '海运',
    customerAgreementNumber: 'Customer Agreement Number',
    customerAgreementDate: 'Customer Agreement Date',
    remark: 'Remark',
    attachment: 'Attachment',
    Yes: 'yes',
    No: 'no'
}

const responsibility = {
    responsibility: 'Responsibility',
    NeedLabelDesignInfoDate: 'Need Label/Design Info Date',
    LableDesignDate: 'Lable/Design Date',
    DesignNeedConfirmDate: 'Design Need Confirm Date',
    ReceiveSampleDate: 'Receive Sample Date',
    SampleNeedConfirmDate: 'Sample Need Confirm Date',
    OtherDate: 'Other Responsibility',
}

const productinfo = {
    productInfo: 'Product Info',
    productBarCode: 'Product Bar-Code',
    englishProductName: 'English Product Name',
    productDescriptionEnglish: 'Product Description (English)',
    productDescriptionCustomerLanguage: 'Product Description (Customer Language)',
    productNameCustomerLanguage: 'Product Name(Customer Language)',
    skuCode: 'SKU Code',
    vendorSKUcode: 'Vendor SKU code',
    supplierShortName: 'Supplier Short Name',
    //.......................FOB
    fobCurrency: 'FOB Currency',
    fobPrice: 'FOB Price',
    fobPort: 'FOB Port',
    //.......................计量单位
    unit: 'Unit',
    englishMaterial: 'English Material',
    quantity: 'Quantity',
    totalPrice: 'Total Price',
    englishColor: 'English Color',
    minimumOrderQuantity: 'Minimum Order Quantity',
    deliveryTime: 'Delivery Time',
    productDesign: 'Product Design',
    //...............分类名称
    topCategory: 'Top Category',
    secondaryCategory: 'Secondary Category',
    thirdCategory: 'Third Category',
    fourthCategory: 'Fourth Category',
    //.....................
    hsCode: 'HS Code',
    nameinChineseUsedforExportCustomsClearance: 'Name in Chinese Used for Export Customs Clearance',
    nameinEnglishUsedforExportCustomsClearance: 'Name in English Used for Export Customs Clearance',
    englishBrand: 'English Brand',
    commodityInspectionChineseProductName: 'Commodity Inspection Chinese Product Name',
    commodityInspectionEnglishProductName: 'Commodity Inspection English Product Name',
    reportElements: 'Report Elements',
    placeofOrigin: 'Place of Origin',
    inspectionType: 'Inspection Type',
    weightUnit: 'Weight Unit',
    lengthUnit: 'Length Unit',
    volumeUnit: 'Volume Unit',
    productLength: 'Product Length',
    productWidth: 'Product Width',
    productHeight: 'Product Height',
    productNetWeight: 'Product Net Weight',
    productVolume: 'Product Volume',
    packingEn: 'Packing( En)',
    innerCartonUnit: 'Inner Carton Unit',
    innerCartonProductQuantity: 'Inner Carton Product Quantity',
    innerCartonLength: 'Inner Carton Length',
    innerCartonWidth: 'Inner Carton Width',
    innerCartonHeight: 'Inner Carton Height',
    innerCartonNetWeight: 'Inner Carton Net Weight',
    innerCartonGrossWeight: 'Inner Carton Gross Weight',
    innerCartonVolume: 'Inner Carton Volume',
    innerCartonDescription: 'Inner Carton Description',
    innerCartonPackingEn: 'Inner Carton Packing( En)',
    outerCartonUnit: 'Outer Carton Unit',
    outerCartonDescription: 'Outer Carton Description',
    quantityofInnerBoxinOuterCarton: 'Quantity of Inner Box in Outer Carton',
    quantityofProductsinOuterCarton: 'Quantity of Products in Outer Carton',
    outerCartonLength: 'Outer Carton Length',
    outerCartonWidth: 'Outer Carton Width',
    outerCartonHeight: 'Outer Carton Height',
    outerCartonNetWeight: 'Outer Carton Net Weight',
    outerCartonGrossWeight: 'Outer Carton Gross Weight',
    outerCartonVolume: 'Outer Carton Volume',
    outerCartonPackingEn: 'Outer Carton Packing( En)',
    tradeMark: 'Trade Mark',
    ageofapplication: 'Age of application',
    qualityGuaranteePeriod: 'Quality Guarantee Period',
    illustrate: 'Illustrate',
    //.............................产品状态
    productStatus: 'Product Status',
    //    TBC,confirmed,PSI need confirm,PSI confirmed,storage,part shipped,shipped,cancelled,returnd
    //............................销售状态
    salesStatus: 'Sales Status',
    onSale: 'On Sale',
    notOnSale: 'Not On Sale',
    //................
    salesOrderNumber: 'Sales Order Number',
    orderQuantity: 'Order Quantity',
    productLabel: 'Product Label',
    productBarCode: 'Product Bar-Code',
    innerPackingBarCode: 'Inner Packing Bar-Code',
    innerPackingLabel: 'Inner Packing Label',
    innerPackingSKUCode: 'Inner Packing SKU Code',
    shippingMarks: '· Shipping Marks',
    outerCartonBarCode: 'Outer Carton Bar-Code',
    outerCartonSKUCode: 'Outer Carton SKU Code',
    productLabelPhoto: 'Product Label Photo',
    //    JPG/JPEG/PNG/BMP
    productLabelIllustrate: 'Product Label Illustrate',
    packingMethodPhoto: 'Packing Method Photo',
    //    JPG/JPEG/PNG/BMP
    innerPackingPhoto: 'Inner Packing Photo',
    //    JPG/JPEG/PNG/BMP
    outerPackingPhoto: 'Outer Packing Photo',
    //    JPG/JPEG/PNG/BMP
    //........................是否需要样品
    needSample: 'Need Sample',
    //    是，否
    sampleQuantity: 'Sample Quantity',
    //    Yes，No
    samplePrice: 'Sample Price',
    deliveredQuantity: 'Delivered Quantity',
    undeliveredQuantity: 'Undelivered Quantity',
    inquiryID: 'Inquiry ID',
    modifyStatus: 'Modify Status',
    //    有，无
    comments: 'Comments',
    comments2: 'Comments 2',
    comments3: 'Comments 3',
    additionalPicture1: 'Additional Picture 1',
    //    JPG/JPEG/PNG/BMP
    additionalPicture2: 'Additional Picture 2',
    //    JPG/JPEG/PNG/BMP
    additionalPicture3: 'Additional Picture 3',
    //    JPG/JPEG/PNG/BMP
    additionalPicture4: 'Additional Picture 4',
    //    JPG/JPEG/PNG/BMP
    totalQuantifiedSKU: 'Total Quantified SKU',
    totalHaventQCSKU: 'Total Haven'

}

const qcorder = {
    qcOrder: 'QC Order'
}

const logisticplan = {
    logisticPlan: 'Logistic Plan/Order'
}


const payment = {
    no: 'No.',
    paymentNumber: 'Payment Number',
    paymentItem: 'Payment Item',
    estPayDate: 'Est.PayDate',
    EstAmount: 'Est.Amount',
    actPayDate: 'Act.Pay Date',
    actAmount: 'Act.Amount',
    avilable: 'Avilable'
}
export {
    tableData,
    responsibility,
    basicinfo,
    productinfo,
    payment,
    qcorder,
    logisticplan
}
