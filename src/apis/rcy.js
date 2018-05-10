'use strict';
export default {
    //order
    get_orderlist: ['/order/overview/page', 'BASE_HCJ', 'USUPPLY_URL'],
    get_draft_orderlist: ['/order/draft/page', 'BASE_HCJ', 'USUPPLY_URL'],
    get_recycle_orderlist: ['/order/recycle/page', 'BASE_HCJ', 'USUPPLY_URL'],
    post_recover_order: ['/order/recover', 'BASE_HCJ', 'USUPPLY_URL'],
    post_finishPost: ['/order/finish', 'BASE_HCJ', 'USUPPLY_URL'],
    delete_order: ['/order/delete', 'BASE_HCJ', 'USUPPLY_URL'],
    download_order: ['/order/download', 'BASE_HCJ', 'USUPPLY_URL'],
    send_order: ['/order/send', 'BASE_HCJ', 'USUPPLY_URL'],
    add_order: ['/order/save', 'BASE_HCJ', 'USUPPLY_URL'],
    detail_order: ['/order/detail/{id}', 'BASE_HCJ', 'USUPPLY_URL'],
    get_order_history: ['/order/skuHistory', 'BASE_HCJ', 'USUPPLY_URL'],
    post_order_paymentlist: ['/payment/list/{orderNo}/{orderType}', 'BASE_BUYER', 'USUPPLY_URL'],
    post_order_skus: ['/order/skus', 'BASE_HCJ', 'USUPPLY_URL'],
    post_cancleOrder: ['/order/cancle', 'BASE_HCJ', 'USUPPLY_URL'],
    post_updataOrder: ['/order/update', 'BASE_HCJ', 'USUPPLY_URL'],
    post_accept: ['/order/accept', 'BASE_HCJ', 'USUPPLY_URL'],
    post_confirm: ['/order/confirm  ', 'BASE_HCJ', 'USUPPLY_URL'],
   
    //customer
    post_getCustomerList: ['/supply/overview', 'BASE_CSTEST2', 'USUPPLY_URL'],
    post_deleteCustomerRemark: ['/supply/deleteRemark/{id}', 'BASE_CSTEST2', 'USUPPLY_URL'],
    post_customerDetail: ['/supply/{id}', 'BASE_CSTEST2', 'USUPPLY_URL'],
    post_getCustomerListRemark: ['/supply/listRemarks/{id}', 'BASE_CSTEST2', 'USUPPLY_URL'],
    post_addCustomerListRemark: ['/supply/remark', 'BASE_CSTEST2', 'USUPPLY_URL'],
    post_delete_CustomerRemark: ['/supply/deleteRemark/{id}', 'BASE_CSTEST2', 'USUPPLY_URL'],
    post_customerUpdataRmark: ['/supply/remark/{id}', 'BASE_CSTEST2', 'USUPPLY_URL'],


    //payment
    paymentGetNo: ['/payment/genNo', 'BASE_HCJ', 'USUPPLY_URL'],
    paymentSave: ['/payment/save', 'BASE_HCJ', 'USUPPLY_URL'],
    paymentUpdata: ['/payment/update', 'BASE_HCJ', 'USUPPLY_URL'],
    paymentRecover: ['/payment/recover', 'BASE_HCJ', 'USUPPLY_URL'],
    paymentAbandon: ['/payment/abandon', 'BASE_HCJ', 'USUPPLY_URL'],
    paymentAccept: ['/payment/accept/{id}', 'BASE_HCJ', 'USUPPLY_URL'],
    paymentDunning: ['/payment/dunning/{orderNo}/{orderType}', 'BASE_HCJ', 'USUPPLY_URL'],
    post_order_paymentlist: ['/payment/list/{orderNo}/{orderType}', 'BASE_HCJ', 'USUPPLY_URL'],
    
    
    //字典表数据
    post_codePart:['/code/part','UMETA_URL'],
     post_country:['/country/all','UMETA_URL'],
     post_logisticsport:['/logisticsport/query','UMETA_URL'],
     get_currency:['/currency/all','UMETA_URL']
}
