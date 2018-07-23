export default {
  // logistic
  gei_plan_list: ['/logistics/plan/pageByPlanNo', 'USUPPLY_URL'],
  get_transportation_list: ['/logistics/plan/pageByUnit', 'USUPPLY_URL'],
  get_sku_list: ['/logistics/plan/pageBySkuCode', 'USUPPLY_URL'],
  get_dictionary: ['/code/part', 'UMETA_URL'],
  delete_by_ids: ['/logistics/plan/deleteByIds', 'USUPPLY_URL'],
  get_new_logistics_no: ['/logistics/plan/getNo', 'USUPPLY_URL'],
  get_currency: ['/currency/all', 'UMETA_URL'],
  get_container_type: ['/containertype/all','UMETA_URL'],
  get_plan_details: ['/logistics/plan/detail', 'USUPPLY_URL'],
  get_order_details: ['/logistics/order/detail', 'BASE_URL'],
  get_payment_list: ['/payment/list/', 'USUPPLY_URL'],
  get_product_history: ['/logistics/plan/getProductHistory', 'USUPPLY_URL'],
  get_product_order_history: ['/logistics/order/getProductHistory', 'USUPPLY_URL'],
  get_order_list_with_page: ['/order/skuListPage', 'USUPPLY_URL'],
  get_loading_list_plan: ['/logistics/order/pageByPlanNo', 'USUPPLY_URL'],
  get_loading_list_unit: ['/logistics/order/pageByUnit', 'USUPPLY_URL'],
  get_loading_list_sku: ['/logistics/order/pageBySkuCode', 'USUPPLY_URL'],
  update_logistic_plan: ['/logistics/plan/modify', 'USUPPLY_URL'],
  update_logistic_order: ['/logistics/order/modify', 'USUPPLY_URL'],
  send_logistic_plan: ['/logistics/plan/send', 'USUPPLY_URL'],
  send_draft_logistic_plan: ['/logistics/plan/sendDraft', 'USUPPLY_URL'],
  save_draft_logistic_plan: ['/logistics/plan/saveDraft', 'USUPPLY_URL'],
  get_payment_no: ['/payment/genNo', 'USUPPLY_URL'],
  save_plan_payment: ['/payment/save','USUPPLY_URL'],
  update_plan_payment: ['/payment/update', 'USUPPLY_URL'],
  abandon_plan_payment: ['/payment/abandon', 'USUPPLY_URL'],
  recover_plan_payment: ['/payment/recover', 'USUPPLY_URL'],
  get_supplier: ['/logistics/plan/getSupplier', 'USUPPLY_URL'],
  get_plan_rate: ['/logistics/plan/getRate', 'USUPPLY_URL'],
  logistics_plan_confirm: ['/logistics/plan/confirm', 'USUPPLY_URL'],
  logistics_plan_cancel: ['/logistics/plan/cancel', 'USUPPLY_URL'],
  logistics_order_cancelByIds: ['/logistics/order/cancelByIds', 'BASE_URL'],
  logistics_plan_cancelByIds: ['/logistics/plan/cancelByIds', 'BASE_URL'],
  logistics_plan_receive: ['/logistics/plan/receive', 'USUPPLY_URL'],
  logistics_plan_postLoadingList: ['/logistics/plan/postLoadingList', 'USUPPLY_URL'],
  logistics_plan_getSupplierIds: ['/logistics/plan/getSupplierIds', 'BASE_URL'],
  logistics_order_getSupplierIds: ['/logistics/order/getSupplierIds', 'BASE_URL'],
  logistics_accept_payment: ['/payment/accept', 'BASE_URL'],
  logistics_payment_batchDunning: ['/payment/batchDunning', 'BASE_URL'],
  logistics_plan_batchSendDraft: ['/logistics/plan/batchSendDraft', 'BASE_URL'],
  logistics_plan_archive: ['/logistics/plan/archive', 'BASE_URL'],
  logistics_order_archive: ['/logistics/order/archive', 'BASE_URL'],
  logistics_plan_recover: ['/logistics/plan/recover', 'BASE_URL'],
  logistics_order_recover: ['/logistics/order/recover', 'BASE_URL'],
  country_all: ['/country/all','UMETA_URL']
}
