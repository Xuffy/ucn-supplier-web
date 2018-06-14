export default {
  //获取category
  get_buyer_sys_category: ['/purchase/sys/category', 'UPURCHASE_URL'],
  get_buyer_my_category: ['/purchase/category/tree', 'UPURCHASE_URL'],
  get_supply_category: ['/sys/category', 'USUPPLY_URL'],
  get_supply_my_category: ['/category/tree', 'USUPPLY_URL'],
  CATEGORY_MINE:['/category','USUPPLY_URL'],
  CATEGORY_SYSTEM:['/sys/category','USUPPLY_URL'],



  get_productCategory: ['/purchase/sys/category', 'UPURCHASE_URL'],
  get_productDetail: ['/sku/{id}', 'USUPPLY_URL'],
  delete_product: ['/sku/{id}/delete', 'USUPPLY_URL'],
  change_productStatus: ['/sku/{id}/status', 'USUPPLY_URL'],
  get_productList: ['/sku/listSkuByParams', 'USUPPLY_URL'],
  get_supplierWhole: ['/supplierWhole', 'USUPPLY_URL'],
  add_address: ['/supplier/address', 'USUPPLY_URL'],
  delete_address: ['/supplier/delAddress/{id}', 'USUPPLY_URL'],
  update_address: ['/supplier/address/{id}', 'USUPPLY_URL'],
  add_account: ['/supplier/account', 'USUPPLY_URL'],
  update_account: ['/supplier/account/{id}', 'USUPPLY_URL'],
  delete_account: ['/supplier/delAccount/{id}', 'USUPPLY_URL'],
  delete_contact: ['/supplier/delContact/{id}', 'USUPPLY_URL'],
  update_contact: ['/supplier/contact/{id}', 'USUPPLY_URL'],
  add_contact: ['/supplier/contact', 'USUPPLY_URL'],
  update_supplier: ['/supplier/{id}', 'USUPPLY_URL'],


  //department setting
  get_departmentOverview: ['/department/overview', 'UUSER_URL'],
  get_department: ['/department', 'UUSER_URL'],
  get_departmentUser: ['/user/list', 'UUSER_URL'],
  delete_department: ['/department/{deptId}', 'UUSER_URL'],
  get_departmentRole: ['/role?deptId={deptId}', 'UUSER_URL'],
  add_departmentRole: ['/role', 'UUSER_URL'],
  delete_departmentRole: ['/role/{deptId}/{roleId}', 'UUSER_URL'],
  invite_departmentUser:['/user/invite','UUSER_URL'],
  update_departmentRole:['/role','UUSER_URL'],
  add_departmentUser:['/user','UUSER_URL'],


  /**
   * seller product
   * */
  add_newSKU: ['/sku', 'USUPPLY_URL'],
  set_sellerProductPutAway: ['/sku/putaway', 'USUPPLY_URL'],
  set_sellerProductPutDown: ['/sku/soldout', 'USUPPLY_URL'],
  delete_sellerProduct: ['/sku/deleteAll', 'USUPPLY_URL'],
  get_sellerCustomer: ['/supplier/sku/setting/listCustomers', 'USUPPLY_URL'],
  get_sellerCustomerGroup: ['/supplier/sku/setting/getCustomerByIds', 'USUPPLY_URL'],
  update_buyerProductDetail: ['/sku/{id}', 'USUPPLY_URL'],
  get_sellerProductList: ['/sku/listSkuByParams', 'USUPPLY_URL'],

  //product buyer
  get_buyerProductList: ['/purchase/sku/listSkuByParams', 'UPURCHASE_URL'],
  get_buyerBookmarkList: ['/purchase/sku/listBookmark', 'UPURCHASE_URL'],
  add_buyerBookmark: ['/purchase/sku/bookmark', 'UPURCHASE_URL'],
  get_buyerRemarkList: ['/purchase/sku/listSkuRemark/{id}', 'UPURCHASE_URL'],
  add_buyerProductRemark: ['/purchase/sku/remark', 'UPURCHASE_URL'],
  update_buyerProductRemark: ['/purchase/sku/remark/{id}', 'UPURCHASE_URL'],
  delete_buyerProductBookmark: ['/purchase/sku/deleteBookmark', 'UPURCHASE_URL'],
  add_customerSku: ['/purchase/sku/addCustomerSku', 'UPURCHASE_URL'],
  get_compareList: ['/purchase/sku/listCompare', 'UPURCHASE_URL'],
  get_skuListByIds: ['/purchase/sku/listSkuByIds', 'UPURCHASE_URL'],
  add_buyerProductCompare: ['/purchase/sku/compare', 'UPURCHASE_URL'],
  delete_buyerProductCompareDetail: ['/purchase/supplier/listCompareDetails', 'UPURCHASE_URL'],
  get_buyerProductCompareDetail: ['/purchase/sku/listCompareDetails', 'UPURCHASE_URL'],
  delete_buyerProductCompare: ['/purchase/sku/deleteCompare', 'UPURCHASE_URL'],
  get_buyerProductDetail: ['/purchase/sku/{id}', 'UPURCHASE_URL'],
  edit_buyerProductBookmark: ['/purchase/sku/bookmark/{id}', 'UPURCHASE_URL'],
  update_buyerProductCompare: ['/purchase/sku/compare/{id}', 'UPURCHASE_URL'],
  delete_buyerProductRemark: ['/purchase/sku/deleteSkuRemark/{id}', 'UPURCHASE_URL'],
  recover_buyerProductBookmark: ['/purchase/sku/recoverBookmark', 'UPURCHASE_URL'],


  /**
   * seller warehouse
   * */
  get_inboundData: ['/inbound/page', 'USUPPLY_URL'],
  get_productInfo: ['/order/skuListPage', 'USUPPLY_URL'],
  get_inboundDetail: ['/inbound/getById', 'USUPPLY_URL'],
  add_inbound: ['/inbound/add', 'USUPPLY_URL'],
  // get_productInfo:['/order/skuListPage','BASE_BUYER'],
  get_warehouseOrderData: ['/order/skus', 'BASE_SELLER', 'UPURCHASE_URL'],
  get_qcOrderData: ['/qc/page', 'USUPPLY_URL', 'USUPPLY_URL'],
  get_warehouseOverviewData: ['/warehouse/overview/page', 'USUPPLY_URL'],
  get_orderSku: ['/order/getAllOrderInfo', 'USUPPLY_URL'],
  get_inboundSku: ['/inbound/sku/page', 'USUPPLY_URL'],
  get_outboundData: ['/outbound/page', 'USUPPLY_URL'],
  add_outbound: ['/outbound/add', 'USUPPLY_URL'],
  get_outBoundDetail: ['/outbound/getById', 'USUPPLY_URL'],
  get_outboundProductData: ['/inbound/sku/queryForOutbound', 'USUPPLY_URL'],
  get_qcOrderDetail: ['/qc/getById', 'USUPPLY_URL', 'USUPPLY_URL'],
  get_qcOrderProductData: ['/qc/detail/page', 'USUPPLY_URL', 'USUPPLY_URL'],
  accept_qcResult: ['/qc/result/accept', 'USUPPLY_URL'],
  get_outboundDetailProductData: ['/outbound/sku/page', 'USUPPLY_URL'],
  get_sellerOrderDetail: ['/qc/getById', 'USUPPLY_URL'],
  get_sellerQcOrderProduct: ['/qc/detail/page', 'USUPPLY_URL'],
  save_sellerQcOrder: ['/qc/result/save', 'USUPPLY_URL'],
  REWORK_HANDLE: ['/qc/rework/handle', 'USUPPLY_URL'],
  RETURN_HANDLE:['/qc/return/handle','USUPPLY_URL'],



  /**
   * buyer Warehouse
   * */
  get_qcProductData: ['/qc/inbound/sku/all', 'UPURCHASE_URL'],
  get_serviceProviders: ['/purchase/servicer/listServicerByName', 'UPURCHASE_URL'],
  get_supplyProviders: ['/purchase/supplier/listSupplierByName', 'UPURCHASE_URL'],
  get_currency: ['/currency/all', 'UMETA_URL'],
  add_buyerQcOrder: ['/qc/add', 'UPURCHASE_URL'],
  GET_QC_DETAIL_GETBYID: ['/qc/detail/getById', 'USUPPLY_URL', 'USUPPLY_URL'],
  GET_QC_GETBYQCORDERNO: ['/qc/getByQcOrderNo', 'USUPPLY_URL', 'USUPPLY_URL'],
  POST_RETURN_HANDLE: ['/qc/return/handle', 'USUPPLY_URL', 'USUPPLY_URL'],
  POST_REWORK_HANDLE: ['/qc/rework/handle', 'USUPPLY_URL', 'USUPPLY_URL'],
  get_qcDetail: ['/qc/getById', 'UPURCHASE_URL'],
  get_qcProductInfo: ['/qc/detail/page', 'UPURCHASE_URL'],
  get_buyerWarehouseOverview: ['/warehouse/overview/page', 'UPURCHASE_URL'],
  set_qcResultConfirm: ['/qc/result/confirm', 'UPURCHASE_URL'],


  /**
   * service warehouse
   * */
  get_serviceQcOrder: ['/qc/page', 'USERVICE_URL'],
  get_serviceOrderDetail: ['/qc/getById', 'USERVICE_URL'],
  get_serviceQcOrderProduct: ['/qc/detail/page', 'USERVICE_URL'],
  get_serviceQcSurveyor: ['/user/list', 'UUSER_URL'],
  save_serviceQcOrder: ['/qc/result/save', 'USERVICE_URL'],


  /**
   * 字典获取
   * */
  get_currencyUnit: ['/currency/all', 'UMETA_URL'],
  get_country: ['/country/all', 'UMETA_URL'],
  get_partUnit: ['/code/part', 'UMETA_URL'],
  get_allUnit: ['/code/all', 'UMETA_URL']
}
