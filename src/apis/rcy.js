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
    ORDER_CONFIRM:['/order/confirm','USUPPLY_URL'],
    ORDER_UPDATE:['/order/update','USUPPLY_URL'],
    ORDER_SKUS: ['/order/skus', 'BASE_URL'],
    ORDER_MARK: ['/order/mark','BASE_URL'],


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


    //payment
    PAYMENT_LIST:['/payment/list/{orderNo}/{orderType}','USUPPLY_URL'],


    //字典表数据
    post_codePart: ['/code/part', 'UMETA_URL'],
    post_country: ['/country/all', 'UMETA_URL'],
    post_logisticsport: ['/logisticsport/query', 'UMETA_URL'],
    get_currency: ['/currency/all', 'UMETA_URL'],
    CURRENCY_ALL: ['/currency/all', 'UMETA_URL'],
    CUSTOMERCURRENCYEXCHANGERATE_QUERY: ['/customcurrencyexchangerate/query', 'UMETA_URL'],
    COUNTRY_ALL: ['/country/all', 'UMETA_URL'],
}
