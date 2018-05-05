import * as db from './db'

const buttonname = {
    ShowTheAdvance: 'Show the Advance', //切换显示隐藏按钮的文字
    HideTheAdvance: 'Hide the Advance', //切换显示隐藏按钮的文字
    search: 'Search',
    clear: 'Clear',
    createInquiry: 'Create Inquiry',
    createOrder: 'Create Order',
    accept: 'Accept',
    addToCompare: 'Add to Compare',
    compare: 'Compare',
    supplierProducts: "supplier's Product",
    addToBookmark: 'Add to Bookmark',
    downloadTheSelectedSupplier: 'Download The Selected Supplier',
    downloadTheSelectedOverview: 'Download The Selected Overview',
    remove: 'Remove',
    finish: 'Finish',
    cancel: 'Cancel',
    //..................................COMPARE
    hideTheSame: 'Hide The Same',
    hightlightTheDifferent: 'Hightlight The Different',
    inquiry: 'Inquiry',
    SKU: 'SKU',
    downloadSelectedCompare: 'Download Selected Compare',
    delete: "Delete"
}

//页面大标题
const title = {
    supplierSourcing: 'Supplier Sourcing',
    supplierBookmark: 'Supplier Bookmark',
    compareDetail: 'Compare Detail',
    compareOverview: 'Compare Overview',
}
export default {
    buttonname,
    title,
    ...db
}
