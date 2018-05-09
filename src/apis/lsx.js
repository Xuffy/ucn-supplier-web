export default {
    //获取category
    get_buyer_sys_category: ['/purchase/sys/category', 'BASE_BUY','UPURCHASE_URL'],
    get_buyer_my_category:['/purchase/category/tree','BASE_BUY','UPURCHASE_URL'],
    get_supply_category:['/sys/category','BASE_SELL','USUPPLY_URL'],
    get_supply_my_category:['/category/tree','BASE_SELL','USUPPLY_URL'],


    get_productCategory:['/purchase/sys/category','BASE_BUY','UPURCHASE_URL'],
    get_productDetail: ['/sku/{id}', 'BASE_SELL','USUPPLY_URL'],
    delete_product: ['/sku/{id}/delete', 'BASE_CS','USUPPLY_URL'],
    change_productStatus: ['/sku/{id}/status', 'BASE_CS','USUPPLY_URL'],
    get_productList: ['/sku/listSkuByParams', 'BASE_SELL','USUPPLY_URL'],
    get_supplierWhole: ['/supplierWhole', 'BASE_CS','USUPPLY_URL'],
    add_address: ['/supplier/address', 'BASE_CS','USUPPLY_URL'],
    delete_address: ['/supplier/delAddress/{id}', 'BASE_CS','USUPPLY_URL'],
    update_address: ['/supplier/address/{id}', 'BASE_CS','USUPPLY_URL'],
    add_account: ['/supplier/account', 'BASE_CS','USUPPLY_URL'],
    update_account: ['/supplier/account/{id}', 'BASE_CS','USUPPLY_URL'],
    delete_account: ['/supplier/delAccount/{id}', 'BASE_CS','USUPPLY_URL'],
    delete_contact: ['/supplier/delContact/{id}', 'BASE_CS','USUPPLY_URL'],
    update_contact: ['/supplier/contact/{id}', 'BASE_CS','USUPPLY_URL'],
    add_contact: ['/supplier/contact', 'BASE_CS','USUPPLY_URL'],
    update_supplier: ['/supplier/{id}', 'BASE_CS','USUPPLY_URL'],


    //department setting
    get_departmentOverview: ['/department/overview', 'BASE_LYF','UUSER_URL'],
    get_department: ['/department', 'BASE_LYF','UUSER_URL'],
    get_departmentUser: ['/user/list', 'BASE_LYF','UUSER_URL'],
    delete_department: ['/department/{deptId}', 'BASE_LYF','UUSER_URL'],
    add_departmentRole: ['/role', 'BASE_LYF','UUSER_URL'],
    delete_departmentRole: ['/role/{deptId}/{roleId}', 'BASE_LYF','UUSER_URL'],


    /**
     * seller product
     * */
    add_newSKU: ['/sku', 'BASE_SELL','USUPPLY_URL'],
    set_sellerProductPutAway:['/sku/putaway','BASE_SELL','USUPPLY_URL'],
    set_sellerProductPutDown:['/sku/soldout','BASE_SELL','USUPPLY_URL'],
    delete_sellerProduct:['/sku/deleteAll','BASE_SELL','USUPPLY_URL'],
    get_sellerCustomer:['/supplier/sku/setting/listCustomers','BASE_SELL','USUPPLY_URL'],
    get_sellerCustomerGroup:['/supplier/sku/setting/getCustomerByIds','BASE_SELL','USUPPLY_URL'],
    update_buyerProductDetail:['/sku/{id}','BASE_SELL','USUPPLY_URL'],


    //product buyer
    get_buyerProductList:['/purchase/sku/listSkuByParams','BASE_BUY','UPURCHASE_URL'],
    get_buyerBookmarkList:['/purchase/sku/listBookmark','BASE_BUY','UPURCHASE_URL'],
    add_buyerBookmark:['/purchase/sku/bookmark','BASE_BUY','UPURCHASE_URL'],
    get_buyerRemarkList:['/purchase/sku/listSkuRemark/{id}','BASE_BUY','UPURCHASE_URL'],
    add_buyerProductRemark:['/purchase/sku/remark','BASE_BUY','UPURCHASE_URL'],
    update_buyerProductRemark:['/purchase/sku/remark/{id}','BASE_BUY','UPURCHASE_URL'],
    delete_buyerProductBookmark:['/purchase/sku/deleteBookmark','BASE_BUY','UPURCHASE_URL'],
    add_customerSku:['/purchase/sku/addCustomerSku','BASE_BUY','UPURCHASE_URL'],
    get_compareList:['/purchase/sku/listCompare','BASE_BUY','UPURCHASE_URL'],
    get_skuListByIds:['/purchase/sku/listSkuByIds','BASE_BUY','UPURCHASE_URL'],
    add_buyerProductCompare:['/purchase/sku/compare','BASE_BUY','UPURCHASE_URL'],
    delete_buyerProductCompareDetail:['/purchase/supplier/listCompareDetails','BASE_BUY','UPURCHASE_URL'],
    get_buyerProductCompareDetail:['/purchase/sku/listCompareDetails','BASE_BUY','UPURCHASE_URL'],
    delete_buyerProductCompare:['/purchase/sku/deleteCompare','BASE_BUY','UPURCHASE_URL'],
    get_buyerProductDetail:['/purchase/sku/{id}','BASE_BUY','UPURCHASE_URL'],
    edit_buyerProductBookmark:['/purchase/sku/bookmark/{id}','BASE_BUY','UPURCHASE_URL'],
    update_buyerProductCompare:['/purchase/sku/compare/{id}','BASE_BUY','UPURCHASE_URL'],
    delete_buyerProductRemark:['/purchase/sku/deleteSkuRemark/{id}','BASE_BUY','UPURCHASE_URL'],
    recover_buyerProductBookmark:['/purchase/sku/recoverBookmark','BASE_BUY','UPURCHASE_URL'],




    /**
     * seller warehouse
     * */
    get_inboundData:['/inbound/page','BASE_SELL','USUPPLY_URL'],
    get_productInfo:['/order/skuListPage','BASE_SELL','USUPPLY_URL'],
    get_inboundDetail:['/inbound/getById','BASE_SELL','USUPPLY_URL'],
    add_inbound:['/inbound/add','BASE_SELL','USUPPLY_URL'],
    // get_productInfo:['/order/skuListPage','BASE_BUYER'],
    get_warehouseOrderData:['/order/skus','BASE_SELLER','UPURCHASE_URL'],
    get_qcOrderData:['/qc/page','USUPPLY_URL','USUPPLY_URL'],
    get_warehouseOverviewData:['/warehouse/overview/page','BASE_SELL','USUPPLY_URL'],
    get_orderSku:['/order/getAllOrderInfo','BASE_SELL','USUPPLY_URL'],
    get_inboundSku:['/inbound/sku/page','BASE_SELL','USUPPLY_URL'],

    get_outboundData:['/outbound/page','BASE_SELL','USUPPLY_URL'],
    add_outbound:['/outbound/add','BASE_SELL','USUPPLY_URL'],
    get_outboundProductData:['/inbound/sku/queryForOutbound','BASE_SELL','USUPPLY_URL'],

    /**
     * buyer Warehouse
     * */
    get_qcProductData:['/qc/inbound/sku/all','BASE_BUY','UPURCHASE_URL'],
    get_serviceProviders:['/purchase/servicer/listServicerByName','BASE_BUY','UPURCHASE_URL'],
    get_supplyProviders:['/purchase/supplier/listSupplierByName','BASE_BUY','UPURCHASE_URL'],
    get_currency:['/currency/all','UMETA_URL','UMETA_URL'],
    add_buyerQcOrder:['/qc/add','BASE_BUY','UPURCHASE_URL'],
    GET_QC_DETAIL_GETBYID: ['/qc/detail/getById', 'USUPPLY_URL', 'USUPPLY_URL'],
    GET_QC_GETBYID: ['/qc/getById', 'USUPPLY_URL', 'USUPPLY_URL'],
    GET_QC_GETBYQCORDERNO: ['/qc/getByQcOrderNo', 'USUPPLY_URL', 'USUPPLY_URL'],
    POST_QC_DETAIL_PAGE: ['/qc/detail/page', 'USUPPLY_URL', 'USUPPLY_URL'],
    POST_QC_RESULT_ACCEPT: ['/qc/result/accept', 'USUPPLY_URL', 'USUPPLY_URL'],
    POST_RETURN_HANDLE: ['/qc/return/handle', 'USUPPLY_URL', 'USUPPLY_URL'],
    POST_REWORK_HANDLE: ['/qc/rework/handle', 'USUPPLY_URL', 'USUPPLY_URL'],
    get_qcDetail:['/qc/getById','BASE_BUY','UPURCHASE_URL'],
    get_qcProductInfo:['/qc/detail/page','BASE_BUY','UPURCHASE_URL'],
    get_buyerWarehouseOverview:['/warehouse/overview/page','BASE_BUY','UPURCHASE_URL'],
    set_qcResultConfirm:['/qc/result/confirm','BASE_BUY','UPURCHASE_URL'],



    /**
     * service warehouse
     * */
    get_serviceQcOrder:['/qc/page','BASE_SERVICE','USERVICE_URL'],
    get_serviceOrderDetail:['/qc/getById','BASE_SERVICE','USERVICE_URL'],
    get_serviceQcOrderProduct:['/qc/detail/page','BASE_SERVICE','USERVICE_URL'],
    get_serviceQcSurveyor:['/user/list','UUSER_URL','UUSER_URL'],
    save_serviceQcOrder:['/qc/result/save','BASE_SERVICE','USERVICE_URL'],


    /**
     * 字典获取
     * */
    get_currencyUnit:['/currency/all','UMETA_URL','UMETA_URL'],
    get_country:['/country/all','UMETA_URL','UMETA_URL'],
    get_partUnit:['/code/part','UMETA_URL','UMETA_URL'],
    get_allUnit:['/code/all','UMETA_URL','UMETA_URL']
}