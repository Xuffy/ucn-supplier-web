export default {
  //payment
  post_ledgerPage:['/ledger/page','USUPPLY_URL','USUPPLY_URL'],
  post_payment_list:['/payment/list/{orderNo}/{orderType}','USUPPLY_URL','USUPPLY_URL'],
  post_payment_accept:['/payment/accept/{id}','USUPPLY_URL','USUPPLY_URL'],
  post_payment_dunning:['/payment/dunning','USUPPLY_URL','USUPPLY_URL'],
  //message
  post_usermessage_queryCompany: ['/usermessage/queryCompany', 'UMESSAGE_URL', 'UMESSAGE_URL'],
  post_usermessage_querySystem: ['/usermessage/querySystem', 'UMESSAGE_URL', 'UMESSAGE_URL'],
  post_usermessage_read: ['/usermessage/read', 'UMESSAGE_URL', 'UMESSAGE_URL'],
  post_usermessage_readCompany: ['/usermessage/readCompany', 'UMESSAGE_URL', 'UMESSAGE_URL'],
  post_usermessage_readSystem: ['/usermessage/readSystem', 'UMESSAGE_URL', 'UMESSAGE_URL'],
  get_messagesetting_query: ['/messagesetting/query','UMESSAGE_URL', 'UMESSAGE_URL'],
  post_companymessage_query: ['/companymessage/query', 'UMESSAGE_URL', 'UMESSAGE_URL'],
  post_company_addcompanymessage: ['/companymessage/addcompanymessage', 'UMESSAGE_URL', 'UMESSAGE_URL'],
  post_systemmessage_query: ['/systemmessage/query', 'UMESSAGE_URL', 'UMESSAGE_URL'],
  post_sys_addsystemmessage: ['/systemmessage/addsystemmessage', 'UMESSAGE_URL', 'UMESSAGE_URL'],
  post_sys_updateread: ['/systemmessagesubscribe/updateread', 'UMESSAGE_URL', 'UMESSAGE_URL'],
  //logs
  post_bizloQuery:['/bizlog/query','UBIZLOG_URL','UBIZLOG_URL'],
  //Personal Setting
  get_user_profile:['/user/profile','UUSER_URL','UUSER_URL'],
  put_user_profile:['/user/profile','UUSER_URL','UUSER_URL'],
  put_user_profile_password:['/user/profile/password','UUSER_URL','UUSER_URL'],
  //qc order
  post_qc_page:['/qc/page','USUPPLY_URL','USUPPLY_URL'],
  post_qc_detail_page: ['/qc/detail/page','USUPPLY_URL','USUPPLY_URL'],

  //元数据
  POST_CODE_PART: ['/code/part', 'UMETA_URL','UMETA_URL'],
  GET_COUNTRY_ALL: ['/country/all', 'UMETA_URL','UMETA_URL'],
  get_currency_all: ['/currency/all', 'UMETA_URL','UMETA_URL'],
  GET_DEPARTMENT:['/department','UUSER_URL','UUSER_URL'],

  //warehouse
  post_warehouse_page: ['/warehouse/overview/page','BASE_HSM_W','USUPPLY_URL'],
  // post_warehouse_page: ['/warehouse/overview/page','UWAREHOUSE_URL']
  get_qc_getById: ['/qc/getById','USUPPLY_URL','USUPPLY_URL'],
  post_qc_result_save: ['/qc/result/save','USUPPLY_URL','USUPPLY_URL'],

  //user
  get_user_list: ['/user/list','UUSER_URL','UUSER_URL'],//获取当前登录用户所在企业下所有用户信息
  get_user_privilege: ['/user/privilege','UUSER_URL','UUSER_URL'],

  //company info
  get_supplierWhile: ['/supplierWhole','BASE_CS','USUPPLY_URL'],
  post_supplierWhile: ['/supplier','BASE_CS','USUPPLY_URL'],
  post_supplier_address: ['/supplier/address','BASE_CS','USUPPLY_URL'],
  post_supplier_address_id: ['/supplier/address','BASE_CS','USUPPLY_URL'],
  post_supplier_delAddress:['/supplier/delAddress/{id}','BASE_CS','USUPPLY_URL'],
  post_supplier_account:['/supplier/account','BASE_CS','USUPPLY_URL'],
  post_supplier_account_id:['/supplier/account','BASE_CS','USUPPLY_URL'],
  post_supplier_delAccount:['/supplier/delAccount/{id}','BASE_CS','USUPPLY_URL'],
  post_supplier_contact:['/supplier/contact','BASE_CS','USUPPLY_URL'],
  post_supplier_contact_id:['/supplier/contact','BASE_CS','USUPPLY_URL'],
  post_supplier_delContact:['/supplier/delContact/{id}','BASE_CS','USUPPLY_URL'],
  post_oss_company_batchUpload: ['/supplier/purchase/oss/company/batchUpload','BASE_CS','USUPPLY_URL'],
  post_oss_company_upload: ['/supplier/purchase/oss/company/upload','BASE_CS','USUPPLY_URL'],
  post_purchase_customer_updateIsSetting:['/supplier/updateIsSetting/{id}', 'USUPPLY_URL'],

  //track
  get_track_getTrackInfoByPage: ['/track/getTrackInfoByPage','UWORKBENCH_URL'],

}
