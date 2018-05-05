export default {
  UNREADMESSAGE_QUERYUNREAD: ['/companymessage/queryunread', 'UMESSAGE_URL'], // 查询未读消息
  UNREADMESSAGE_UPDATEUNREAD: ['/companymessage/updateunread', 'UMESSAGE_URL'], // 标记消息已读
  USER_PRIVILEGE: ['/user/privilege', 'UUSER_URL'],
  UTASK_PAGELIST: ['/utask/pageList', 'UWORKBENCH_URL'],
  UTASK_TYPELIST: ['/utask/typeList', 'UWORKBENCH_URL'],
  UDA_FINDDATAANALYSISLIST: ['/uda/findDataAnalysisList', 'BASE_JY', 'UWORKBENCH_URL'],
  ITEMFAVORITE_PART: ['/itemfavorite/part', 'UMETA_URL'],
  ITEMFAVORITE_UPDATE: ['/itemfavorite/update', 'UMETA_URL'],
  CHATMESSAGE_QUERY: ['/chatmessage/query', 'UMESSAGE_URL'], // 获取留言板
  CHATMESSAGE_ADD: ['/chatmessage/add', 'UMESSAGE_URL'], // 发送留言板消息
  TIMEZONE_ALL: ['/timezone/all', 'UMETA_URL'], // 查询时区
}
