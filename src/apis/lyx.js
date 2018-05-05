export default {
  // logistic
  gei_plan_list: ['/logistics/plan/pageByPlanNo', 'BASE_DEV'],
  get_transportation_list: ['/logistics/plan/pageByUnit', 'BASE_DEV'],
  get_SKU_list: ['/logistics/plan/pageBySkuCode', 'BASE_DEV'],
  get_dictionary: ['/code/part', 'BASE_DEV_DIC'],
  delete_by_ids: ['/logistics/plan/deleteByIds', 'BASE_DEV'],
  get_new_logistics_no: ['/logistics/plan/getNo', 'BASE_DEV'],
  get_currency: ['/currency/all', 'BASE_DEV_DIC'],
  get_container_type: ['/containertype/all', 'BASE_DEV_DIC'],
  get_plan_details: ['/logistics/plan/get/', 'BASE_DEV'],
  get_payment_list: ['/payment/list/', 'BASE_DEV'],
  get_product_history: ['/logistics/plan/getProductHistory', 'BASE_DEV'],
  get_order_list_with_page: ['/order/skuAllPage', 'BASE_DEV'],
}
