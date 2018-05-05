import db from './db';

const status = {
    index: "Status",
    TBCByCustomer: "TBC by Customer",
    finish: "Finish",
    canceled: "Canceled"
};

const btn = {
    downloadSelected: "Download Selected",
    sentAsOrder: "Sent as Order",
    delete: "Delete",
    addProduct: "Add product",
    remove: "Remove",
    save: "Save",
    ok: "ok",
    cancel: "cancel",
    add: "add",
    modify: "Modify"
};

const viewBy = {
    index: "View By",
    plan: "Plan",
    transportationUnit: "Transportation unit",
    SKU: "SKU"
};

const text = {
    placeNewLogisticPlan: "Place New Logistic Plan",
    basicInfo: "Basic basicInfo",
    logisticsPlanNo: "logistics plan No",
    productInfo: "Product Info",
    placeNewLogisticOrder: "Place New Logistic Order",
    basicInfo: "Basic Info",
    containerInfo: "Container Info",
    logisticPlanNoHDAMC18005: "Logistic Plan No.HDAMC18005"
};
const containerInfo = {
    containerType: "Container Type",
    containerQuantity: "Container Quantity",
    actions: "actions"
};

const basicInfo = {
    shipServiceProvider: "Ship Service Provider",
    shippmentInvoiceNo: "Shippment Invoice No",
    paymentTerms: "Payment Terms",
    transportationWay: "Transportation Way",
    loadingType: "Loading Type",
    shippingAgent: "Shipping Agent",
    logisticsStatus: "Logistics Status",
    dispatchDate: "Dispatch Date",
    customerName: "Customer Name",
    BLType: "B/L Type",
    BLQuantity: "B/L Quantity",
    BLNumber: "BL Number",
    permitedForTransportation: "Permited for Transportation",
    createDate: "Create Date",
    Incoterm: "Incoterm",
    deliveryDate: "Delivery Date",
    invoiceNumber: "Invoice Number",
    logisticsID: "Logistics ID",
    shipmentStatus: "Shipment Status",
    billDate: "Bill Date",
    declareType: "Declare Type",
    declareDate: "Declare Date",
    bookingDate: "Booking Date",
    containerStuffingDate: "Container Stuffing Date",
    customsCleanceDate: "Customs Cleance Date",
    sailDate: "Sail Date",
    arrivalDate: "Arrival Date",
    releaseDate: "Release Date",
    companyName: "Company Name",
    customerShortName: "Customer Short Name",
    receiptCompany: "Receipt Company",
    shippingAgentCompany: "Shipping Agent Company",
    priceTerms: "Price Terms",
    currency: "Currency",
    payment: "Payment",
    paymentMethod: "Payment Method",
    paymentTerm: "Payment Term",
    transportationWay: "Transportation Way",
    batchForLogistics: "Batch For Logistics",
    permitedOrNotPrmitedForTransshipment: "Permited or not Prmited for Transshipment",
    shipper: "shipper",
    consignee: "consignee",
    notify: "notify",
    transportCompany: "Transport Company",
    vesselName: "Vessel Name",
    vesselNo: "Vessel No.",
    departCountry: "Depart Country",
    departPort: "Depart Port",
    destinationCountry: "Destination Country",
    destinationPort: "Destination Port"
};

const shipInfo = {
    index: "Ship Info",
    transportCompany: "Transport Company",
    vesselName: "Vessel Name",
    vesselNo: "Vessel No.",
    departCountry: "Depart Country",
    departPort: "Depart Port",
    destinationCountry: "Destination Country",
    destinationPort: "Destination Port"
};

const payment = {
    paymentNumber: "Payment Number",
    paymentItem: "Payment Item",
    estPayDate: "Est. Pay Date",
    estAmount: "Est. Amount",
    actPayDate: "Act. Pay Date",
    actAmount: "Act. Amount",
    avilable: "Avilable"
};

const paymentTableData = {
    paymentNumber: "Input",
    paymentItem: "Text",
    estPayDate: "Date",
    estAmount: "NumberInput",
    actPayDate: "Date",
    actAmount: "NumberInput",
    avilable: "Input"
};

export default {
    status,
    btn,
    viewBy,
    text,
    shipInfo,
    basicInfo,
    containerInfo,
    payment,
    ...db
}