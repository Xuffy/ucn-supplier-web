export default {
    /**
     * settings 
    */
    //供应端
    GET_SYS_CATEGORY: ['/sys/category', 'USUPPLY_URL', 'USUPPLY_URL'], // 获取系统分类
    GET_CATEGORY: ['/category', 'USUPPLY_URL', 'USUPPLY_URL'], // 获取我的分类
    GET_MAPPING_CATEGORY: ['/category/mapping', 'USUPPLY_URL', 'USUPPLY_URL'], // 获取映射分类
    POST_SAVE_MAPPING_CATEGORY: ['/category/mapping', 'USUPPLY_URL', 'USUPPLY_URL'], //保存分类
    GET_CHANGE_MAPPING_CATEGORY: ['/category/mapping/{id}', 'USUPPLY_URL', 'USUPPLY_URL'], // 获取当前选中的系统分类
    GET_ADD_APPING_CATEGORY: ['/category/mapping/{id}', 'USUPPLY_URL', 'USUPPLY_URL'], // 添加我的分类
    POST_CATEGORY_DELETE: ['/category/delete', 'USUPPLY_URL', 'USUPPLY_URL'], //删除我的分类
    POST_UPDATE_CATEGORY: ['/category/{id}', 'USUPPLY_URL', 'USUPPLY_URL'], //更新我的分类
    //采购端
    GET_PURCHASE_SYS_CATEGORY: ['/purchase/sys/category', 'UPURCHASE_URL', 'UPURCHASE_URL'], // 获取系统分类
    GET_PURCHASE_CATEGORY: ['/purchase/category', 'UPURCHASE_URL', 'UPURCHASE_URL'], // 获取我的分类
    GET_PURCHASE_MAPPING_CATEGORY: ['/purchase/category/mapping', 'UPURCHASE_URL', 'UPURCHASE_URL'], // 获取映射分类
    POST_PURCHASE_SAVE_MAPPING_CATEGORY: ['/purchase/category/mapping', 'UPURCHASE_URL', 'UPURCHASE_URL'], //保存分类
    GET_PURCHASE_CHANGE_MAPPING_CATEGORY: ['/purchase/category/mapping/{id}', 'UPURCHASE_URL', 'UPURCHASE_URL'], // 获取当前选中的系统分类
    GET_PURCHASE_ADD_APPING_CATEGORY: ['/purchase/category/mapping/{id}', 'UPURCHASE_URL', 'UPURCHASE_URL'], // 添加我的分类
    POST_PURCHASE_CATEGORY_DELETE: ['/purchase/category/delete', 'UPURCHASE_URL', 'UPURCHASE_URL'], //删除我的分类
    POST_PURCHASE_UPDATE_CATEGORY: ['/purchase/category/{id}', 'UPURCHASE_URL', 'UPURCHASE_URL'], //更新我的分类
    /**
     * inquiry 
    */
   //采购端 
    POST_INQIIRY_LIST: ['/inquiry/list', 'UPURCHASE_URL', 'UPURCHASE_URL'], // inquiry list
    POST_INQIIRY_LIST_SKU: ['/inquiry/list/sku', 'UPURCHASE_URL', 'UPURCHASE_URL'], // inquiry list sku
    POST_INQUIRY_ACTION: ['/inquiry/action', 'UPURCHASE_URL', 'UPURCHASE_URL'], // inquiry操作
    GET_INQIIRY_DETAIL: ['/inquiry', 'UPURCHASE_URL', 'UPURCHASE_URL'], //获取inquiry详情
    POST_INQUIRY_SAVE: ['/inquiry/save', 'UPURCHASE_URL', 'UPURCHASE_URL'], // 提交
    POST_INQUIRY_SKUS: ['/inquiry/skus', 'UPURCHASE_URL', 'UPURCHASE_URL'], // sku 转换接口
    POST_INQUIRY_COMPARE_DELETE: ['/inquiry/compare/delete', 'UPURCHASE_URL', 'UPURCHASE_URL'],
    POST_INQUIRY_COMPARE: ['/inquiry/compare/{id}', 'UPURCHASE_URL', 'UPURCHASE_URL'],
    POST_INQUIRY_COMPARE_RESTORE: ['/inquiry/compare/restore', 'UPURCHASE_URL', 'UPURCHASE_URL'],
    POST_INQUIRY_COMPARE_RS: ['/inquiry/compare', 'UPURCHASE_URL', 'UPURCHASE_URL'],
    POST_INQUIRY_SKU: ['/inquiry/compare/{id}/sku', 'UPURCHASE_URL', 'UPURCHASE_URL'],
    GET_INQUIRY_HISTORY: ['/inquiry/{id}/history', 'UPURCHASE_URL', 'UPURCHASE_URL'],
    POST_INQIIRY_COMPARE_LIST: ['/inquiry/compare/list', 'UPURCHASE_URL', 'UPURCHASE_URL'],
    GET_INQUIRY_DETAIL_HISTORY: ['/inquiry/detail/{id}/history', 'UPURCHASE_URL', 'UPURCHASE_URL'],
    //供应端
    BUYER_POST_INQIIRY_LIST: ['/inquiry/list', 'USUPPLY_URL', 'USUPPLY_URL'], // inquiry list
    BUYER_POST_INQIIRY_LIST_SKU: ['/inquiry/list/sku', 'USUPPLY_URL', 'USUPPLY_URL'], // inquiry list sku
    BUYER_POST_INQUIRY_SAVE: ['/inquiry/save', 'USUPPLY_URL', 'USUPPLY_URL'], // 提交
    BUYER_GET_INQIIRY_DETAIL: ['/inquiry', 'USUPPLY_URL', 'USUPPLY_URL'], // 获取inquiry 详情
    BUYER_GET_INQUIRY_HISTORY: ['/inquiry/{id}/history', 'USUPPLY_URL', 'USUPPLY_URL'], // 获取inquiry 历史
    BUYER_POST_INQUIRY_SKUS: ['/inquiry/skus', 'USUPPLY_URL', 'USUPPLY_URL'], // sku 转换接口
    BUYER_POST_INQUIRY_ACTION: ['/inquiry/action', 'USUPPLY_URL', 'USUPPLY_URL'], // 操作
    BUYER_GET_INQUIRY_DETAIL_HISTORY: ['/inquiry/detail/{id}/history', 'USUPPLY_URL', 'USUPPLY_URL'],
    /**
     * 获取采购端 公共接口
    */
    PURCHASE_SUPPLIER_LISTSUPPLIERBYNAME: ['/purchase/supplier/listSupplierByName', 'UPURCHASE_URL', 'UPURCHASE_URL'],
    ITEMFAVORITE_PART: ['/itemfavorite/part', 'UMETA_URL', 'UMETA_URL'],
    ITEMFAVORITE_UPDATE: ['/itemfavorite/update', 'UMETA_URL', 'UMETA_URL'],
    POST_CODE_PART: ['/code/part', 'UMETA_URL', 'UMETA_URL'],
    POST_LOGISTICSPORT_QUERY: ['/logisticsport/query', 'UMETA_URL', 'UMETA_URL'],
    GET_COUNTRY_ALL: ['/country/all', 'UMETA_URL', 'UMETA_URL']
}