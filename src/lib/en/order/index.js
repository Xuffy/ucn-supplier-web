import * as db from './db.js'

const buttonname = {
    //..................orderoview
    orderOview: 'Order Oview',
    TBCByCustomer: 'TBC by Customer',
    TBCBySupplier: 'TBC by Supplier',
    process: 'Process',
    finish: 'Finish',
    cancel: 'Cancel',
    orderNo: 'Order No.',
    skuCode: 'SKU Code',
    downloadSelected: 'Download Selected',
    accept: 'Accept',
    copy: 'Copy',
    cancel: 'Cancel',
    delete: 'Delete',
    order: 'Order',
    SKU: 'SKU',
    //......................Draft Overview
    draftOview: 'Draft Overview',
    send: 'send',
    downloadSelected: 'Download Selected',
    //......................createorder
    orderRemark: 'Order Remark',
    attachment: 'Attachment',
    //..................product info
    addProduct: 'Add Product',
    remove: 'Remove',
    createQcOrder: 'Create Qc Order',
    placeLogisticPlan: ' Place Logistic Plan',
    //    申请返工？申请退货
    fromNewSearch: 'From New Search',
    fromMyBookmark: 'From My Bookmark',
    skuDec: 'SKU Dec',
    skuName: 'SKU Name',
    skuCode: 'SKU Code',
    search: 'Search',
    clear: 'Clear',

    //.....................
    saveAsDraft: 'Save As Draft',
    quickCreate: 'Quick Create',
    markAsImportant: 'Mark As Important',
    modify: 'Modify',
    confirm: 'Confirm',
    cancelTheOrder: 'Cancel The Order',
    hideTheSame: 'Hide The Same',
    hightlightTheDifferent: 'Hightlight the Different',
    //....................
    send: 'Send',
    cancel: 'Cancel'
}
export default {
    buttonname,
    ...db
}
