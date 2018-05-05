import * as db from './db';

const status = { 
    index: "Status",
    TBCByCustomer: "TBC by Customer",
    TBCBySupplier: "TBC by Supplier",
    finish: "finish",
    cancel: "cancel"
};

const btn = {
    Compare: "Compare",
    createNewInquiry: "Create New Inquiry",
    cancelTheInquiry: "Cancel the Inquiry",
    Delete: "Delete",
    addProduct: "Add Product",
    remove: "Remove",
    accept: "Accept",
    createOrder: "Create Order",
    addToCompare: "Add to Compare",
    copy: "Copy",
    modify: "Modify",
    createInquiry: "Create Inquiry",
    cancel: "Cancel",
    add: "add",
    submit: "submit",
    saveAsDraft: "Save as Draft",
    inquiry: "Inquiry",
    SKU: "SKU",
    ok: "ok"
};

const viewBy = {
    index: "View by",
    inquiry: "Inquiry",
    SKU: "SKU"
};

const text = {
    inquiry: "inquiry",
    inquiryDetail: "Inquiry No.1273",
    basicInfo: "Basic Info",
    hideTheSame: "Hide the Same",
    highlightTheDifferent: "Highlight the Different",
    productInfo: "Product Info",
    messageBoard: "Message board",
    compareBy: "Compare by",
    compare: "Compare",
    compareOverview: "Compare Overview",
    downloadSelectedCompare: "Download Selected Compare",
    delete: "Delete",
    fromNewSearch: "From New Search"
};

const basicInfo = {
    operater: "operater",
    time: "time",
    departureCountry: "Departure Country",
    departurePort: "Departure Port",
    incoterm: "Incoterm",
    currency: "Currency",
    inquiryData: "Inquiry Data",
    inquiryStatus: "Inquiry Status",
    inquirySequance: "Inquiry Sequance",
    destinationCountry: "Destination Country",
    quotationValidity: "Quotation Validity",
    destinationPort: "Destination Port",
    myInquiryID: "My Inquiry ID",
    remarks: "Remarks",
    attachment: "Attachment"
};

export default {
    status,
    btn,
    viewBy,
    text,
    basicInfo,
    ...db
}