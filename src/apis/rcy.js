'use strict';
export default {
    /**
     * 新order接口
     * */
    OVERVIEW_ORDERPAGE: ['/order/overview/orderPage', 'USUPPLY_URL'],
    OVERVIEW_SKUPAGE: ['/order/overview/skuPage', 'USUPPLY_URL'],
    PURCHASE_SUPPLIER_LIST_SUPPLIER_BY_NAME: ['/purchase/supplier/listSupplierByName?name={name}', 'UPURCHASE_URL'],
    ORDER_DETAIL: ['/order/detail', 'USUPPLY_URL'],
    ORDER_ACCEPT:['/order/accept','USUPPLY_URL'],
    ORDER_CANCEL:['/order/cancle','USUPPLY_URL'],
    ORDER_REFUSE:['/order/refuse','USUPPLY_URL'],
    ORDER_CONFIRM:['/order/confirm','USUPPLY_URL'],
    ORDER_UPDATE:['/order/update','USUPPLY_URL'],
    ORDER_SKUS: ['/order/skus', 'BASE_URL'],
    ORDER_MARK: ['/order/mark','BASE_URL'],
    ORDER_HISTORY:['/order/skuHistory','BASE_URL'],
    ORDER_MESSAGE_TALK:['/order/messageToTask','BASE_URL'],
    ORDER_RECYCLE_ORDER_PAGE:['/order/recycle/orderPage','BASE_URL'],
    ORDER_RECYCLE_SKU_PAGE:['/order/recycle/skuPage','BASE_URL'],
    ORDER_DELETE:['/order/delete','BASE_URL'],
    ORDER_RECOVER:['/order/recover','BASE_URL'],


    //customer
    post_getCustomerList: ['/supply/overview', 'BASE_CS', 'USUPPLY_URL'],
    post_deleteCustomerRemark: ['/supply/deleteRemark/{id}', 'BASE_CS', 'USUPPLY_URL'],
    post_customerDetail: ['/supply/{id}', 'BASE_CS', 'USUPPLY_URL'],
    post_getCustomerListRemark: ['/supply/listRemarks', 'BASE_CS', 'USUPPLY_URL'],
    post_addCustomerListRemark: ['/supply/remark', 'BASE_CS', 'USUPPLY_URL'],
    post_delete_CustomerRemark: ['/supply/deleteRemark/{id}', 'BASE_CS', 'USUPPLY_URL'],
    post_customerUpdataRmark: ['/supply/remark', 'BASE_CS', 'USUPPLY_URL'],
    post_supply_batchDelete: ['/supply/batchDelete', 'BASE_CS', 'USUPPLY_URL'],
    post_supply_supplier_getInquiryHistory: ['/supply/supplier/getInquiryHistory', 'BASE_CS', 'USUPPLY_URL'],
    post_supply_supplier_orderHistory: ['/supply/supplier/orderHistory', 'BASE_CS', 'USUPPLY_URL'],
    post_batchRecover: ['/supply/batchRecover', 'BASE_CS', 'USUPPLY_URL'],


    //payment
    PAYMENT_LIST:['/payment/list/{orderNo}/{orderType}?moduleCode={moduleCode}','USUPPLY_URL'],
    PAYMENT_ACCEPT:['/payment/accept/{id}?version={version}&moduleCode={moduleCode}','USUPPLY_URL'],
    PAYMENT_NO:['/payment/genNo','USUPPLY_URL'],
    PAYMENT_SAVE:['/payment/save?moduleCode={moduleCode}','USUPPLY_URL'],
    PAYMENT_UPDATE:['/payment/update?moduleCode={moduleCode}','BASE_URL'],
    PAYMENT_ABANDON:['/payment/abandon/{id}?version={version}&moduleCode={moduleCode}','BASE_URL'],
    PAYMENT_RESTORE:['/payment/recover/{id}?version={version}&moduleCode={moduleCode}','BASE_URL'],
    PAYMENT_DUNNING:['/payment/batchDunning','BASE_URL'],





    //字典表数据
    post_codePart: ['/code/part', 'UMETA_URL'],
    post_country: ['/country/all', 'UMETA_URL'],
    post_logisticsport: ['/logisticsport/query', 'UMETA_URL'],
    get_currency: ['/currency/all', 'UMETA_URL'],
    CURRENCY_ALL: ['/currency/all', 'UMETA_URL'],
    CUSTOMERCURRENCYEXCHANGERATE_QUERY: ['/customcurrencyexchangerate/query', 'UMETA_URL'],
    COUNTRY_ALL: ['/country/all', 'UMETA_URL'],
}
