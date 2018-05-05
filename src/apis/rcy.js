'use strict';
export default {
    //order
    get_orderlist: ['/order/overview/page', 'BASE_HCJ', 'UPURCHASE_URL'],
    get_draft_orderlist: ['/order/draft/page', 'BASE_HCJ', 'UPURCHASE_URL'],
    get_recycle_orderlist: ['/order/recycle/page', 'BASE_HCJ', 'UPURCHASE_URL'],
    post_recover_order: ['/order/recover', 'BASE_HCJ', 'UPURCHASE_URL'],
    post_finishPost: ['/order/finish', 'BASE_HCJ', 'UPURCHASE_URL'],
    delete_order: ['/order/delete', 'BASE_HCJ', 'UPURCHASE_URL'],
    download_order: ['/order/download', 'BASE_HCJ', 'UPURCHASE_URL'],
    send_order: ['/order/send', 'BASE_HCJ', 'UPURCHASE_URL'],
    add_order: ['/order/save', 'BASE_HCJ', 'UPURCHASE_URL'],
    detail_order: ['/order/detail/{id}', 'BASE_HCJ', 'UPURCHASE_URL'],
    get_order_history: ['/order/skuHistory', 'BASE_HCJ', 'UPURCHASE_URL'],
    post_order_paymentlist: ['/payment/list/{orderNo}/{orderType}', 'BASE_BUYER', 'UPURCHASE_URL'],
    post_order_skus: ['/order/skus', 'BASE_HCJ', 'UPURCHASE_URL'],
    post_cancleOrder: ['/order/cancle', 'BASE_HCJ', 'UPURCHASE_URL'],
    post_updataOrder: ['/order/update', 'BASE_HCJ', 'UPURCHASE_URL'],
    post_confirm: ['/order/confirm  ', 'BASE_HCJ', 'UPURCHASE_URL'],
    //supplier
    post_add_supplier_remark: ['/purchase/supplier/remark', 'UPURCHASE_URL'],
    get_update_supplier_remark: ['/purchase/supplier/remark/{id}', 'UPURCHASE_URL'],
    get_listSupplier: ['/purchase/listSupplier', 'UPURCHASE_URL', 'UPURCHASE_URL'],
    get_supplier_id: ['/purchase/supplier/{id}', 'UPURCHASE_URL', 'UPURCHASE_URL'],
    post_supplier_list_remark: ['/purchase/supplier/listRemarks', 'UPURCHASE_URL', 'UPURCHASE_URL'],
    post_supplier_remark: ['/purchase/supplier/remark', 'UPURCHASE_URL', 'UPURCHASE_URL'],
    get_supplier_remark_de: ['/purchase/supplier/remark/{id}', 'UPURCHASE_URL', 'UPURCHASE_URL'],
    post_supplier_delete_remark: ['/purchase/supplier/deleteRemark/{id}', 'UPURCHASE_URL', 'UPURCHASE_URL'],
    post_listSupplierByIds: ['/purchase/supplier/listSupplierByIds', 'UPURCHASE_URL', 'UPURCHASE_URL'],
    post_supplier_addbookmark: ['/purchase/supplier/bookmark', 'UPURCHASE_URL', 'UPURCHASE_URL'],
    post_supplier_deletebookmark: ['/purchase/supplier/deleteBookmark/{id}', 'UPURCHASE_URL', 'UPURCHASE_URL'],
    post_supplier_listbookmark: ['/purchase/supplier/listBookmarks', 'UPURCHASE_URL', 'UPURCHASE_URL'],
    post_supplier_recoverbookmark: ['/purchase/supplier/recoverBookmark/{id}', 'UPURCHASE_URL', 'UPURCHASE_URL'],
    post_supplier_addCompare: ['/purchase/supplier/compare', 'UPURCHASE_URL', 'UPURCHASE_URL'],
    post_supplier_listCompare: ['/purchase/supplier/listCompare', 'UPURCHASE_URL', 'UPURCHASE_URL'],
    post_supplier_listCompareDetails: ['/purchase/supplier/listCompareDetails', 'UPURCHASE_URL', 'UPURCHASE_URL'],
    post_supplier_deleteCompareDetails: ['/purchase/supplier/deleteCompareDetails', 'UPURCHASE_URL', 'UPURCHASE_URL'],
    post_supplier_deleteCompare: ['/purchase/supplier/deleteCompare', 'UPURCHASE_URL', 'UPURCHASE_URL'],
    post_supplier_recoverCompare: ['/purchase/supplier/recoverCompare', 'UPURCHASE_URL', 'UPURCHASE_URL'],
    post_deleteBookmarks: ['/purchase/supplier/batchDeleteBookmark', 'UPURCHASE_URL', 'UPURCHASE_URL'],
    post_recoverBookmarks: ['/purchase/supplier/batchRecoverBookmark', 'UPURCHASE_URL', 'UPURCHASE_URL'],

    //customer
    post_getCustomerList: ['/supply/overview', 'BASE_CS', 'UPURCHASE_URL'],
    post_deleteCustomerRemark: ['/supply/deleteRemark/{id}', 'BASE_CS', 'UPURCHASE_URL'],
    post_customerDetail: ['/supply/{id}', 'BASE_CS', 'UPURCHASE_URL'],
    post_getCustomerListRemark: ['/supply/listRemarks/{id}', 'BASE_CS', 'UPURCHASE_URL'],
    post_addCustomerListRemark: ['/supply/remark', 'BASE_CS', 'UPURCHASE_URL'],
    post_delete_CustomerRemark: ['/supply/deleteRemark/{id}', 'BASE_CS', 'UPURCHASE_URL'],
    post_customerUpdataRmark: ['/supply/remark/{id}', 'BASE_CS', 'UPURCHASE_URL'],


    //payment
    paymentGetNo: ['/payment/genNo', 'BASE_HCJ', 'UPURCHASE_URL'],
    paymentSave: ['/payment/save', 'BASE_HCJ', 'UPURCHASE_URL'],
    paymentUpdata: ['/payment/update', 'BASE_HCJ', 'UPURCHASE_URL'],
    paymentRecover: ['/payment/recover', 'BASE_HCJ', 'UPURCHASE_URL'],
    paymentAbandon: ['/payment/abandon', 'BASE_HCJ', 'UPURCHASE_URL'],
    paymentAccept: ['/payment/accept/{id}', 'BASE_HCJ', 'UPURCHASE_URL'],
    paymentDunning: ['/payment/dunning/{orderNo}/{orderType}', 'BASE_HCJ', 'UPURCHASE_URL'],
    post_order_paymentlist: ['/payment/list/{orderNo}/{orderType}', 'BASE_HCJ', 'BASE_BUYER'],
    
    
    //字典表数据
    post_codePart:['/code/part','BASE_CODE','BASE_BUYER'],
     post_country:['/country/all','BASE_CODE','BASE_BUYER'],
     post_logisticsport:['/logisticsport/query','BASE_CODE','BASE_BUYER']
}
