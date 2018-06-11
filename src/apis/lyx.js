export default {
  // logistic
  gei_plan_list: ['/logistics/plan/pageByPlanNo','a_localtion', 'USUPPLY_URL'],
  get_transportation_list: ['/logistics/plan/pageByUnit','a_localtion', 'USUPPLY_URL'],
  get_sku_list: ['/logistics/plan/pageBySkuCode','a_localtion', 'USUPPLY_URL'],
  get_dictionary: ['/code/part', 'UMETA_URL'],
  delete_by_ids: ['/logistics/plan/deleteByIds','a_localtion', 'USUPPLY_URL'],
  get_new_logistics_no: ['/logistics/plan/getNo','a_localtion', 'USUPPLY_URL'],
  get_currency: ['/currency/all','a_localtion', 'UMETA_URL'],
  get_container_type: ['/containertype/all','UMETA_URL'],
  get_plan_details: ['/logistics/plan/get/', 'a_localtion','USUPPLY_URL'],
  get_order_details: ['/logistics/order/get/', 'a_localtion','BASE_URL'],
  get_payment_list: ['/payment/list/','a_localtion', 'USUPPLY_URL'],
  get_product_history: ['/logistics/plan/getProductHistory','a_localtion', 'USUPPLY_URL'],
  get_order_list_with_page: ['/order/skuAllPage', 'USUPPLY_URL'],
  get_loading_list_plan: ['/logistics/order/pageByPlanNo','a_localtion', 'USUPPLY_URL'],
  get_loading_list_unit: ['/logistics/order/pageByUnit','a_localtion', 'USUPPLY_URL'],
  get_loading_list_sku: ['/logistics/order/pageBySkuCode','a_localtion', 'USUPPLY_URL'],
  update_logistic_plan: ['/logistics/plan/modify','a_localtion', 'USUPPLY_URL'],
  update_logistic_order: ['/logistics/order/modify','a_localtion', 'USUPPLY_URL'],
  send_logistic_plan: ['/logistics/plan/send','a_localtion', 'USUPPLY_URL'],
  send_draft_logistic_plan: ['/logistics/plan/sendDraft','a_localtion', 'USUPPLY_URL'],
  save_draft_logistic_plan: ['/logistics/plan/saveDraft','a_localtion', 'USUPPLY_URL'],
  get_payment_no: ['/payment/genNo', 'a_localtion','USUPPLY_URL'],
  save_plan_payment: ['/payment/save','USUPPLY_URL'],
  update_plan_payment: ['/payment/update', 'a_localtion','USUPPLY_URL'],
  abandon_plan_payment: ['/payment/abandon','a_localtion', 'USUPPLY_URL'],
  recover_plan_payment: ['/payment/recover','a_localtion', 'USUPPLY_URL'],
  get_supplier: ['/logistics/plan/getSupplier','a_localtion', 'USUPPLY_URL'],
  get_plan_rate: ['/logistics/plan/getRate','a_localtion', 'USUPPLY_URL'],
  logistics_plan_confirm: ['/logistics/plan/confirm','a_localtion', 'USUPPLY_URL'],
  logistics_plan_cancel: ['/logistics/plan/cancel','a_localtion', 'USUPPLY_URL'],
  logistics_order_cancelByIds: ['/logistics/order/cancelByIds','a_localtion', 'BASE_URL'],
  logistics_plan_receive: ['/logistics/plan/receive','a_localtion', 'USUPPLY_URL'],
  logistics_plan_postLoadingList: ['/logistics/plan/postLoadingList','a_localtion', 'USUPPLY_URL'],
  logistics_plan_getSupplierIds: ['/logistics/plan/getSupplierIds','a_localtion', 'BASE_URL'],
}
