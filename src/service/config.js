export default {
  // 环境配置
  ENV: {
    local: {
      // BASE_CS: 'http://dev.usupply-facade.ucnholding.com:18100',
      BASE_CS: '//192.168.51.33:11002',
      // BASE_CS: 'http://192.168.51.248:11002',
      // BASE_CS1: 'http://192.168.51.33:11007',
      // BASE_CS1: 'http://192.168.51.248:11001',
      BASE_CS1: '//dev.upurchase-facade.ucnholding.com:18100',
      // BASE_CS: '//dev.usupply-facade.ucnholding.com:18100',
      // BASE_CS: '//192.168.51.33:11003',
      // BASE_CS: '//192.168.51.248:11002',
      //BASE_CS1: '//192.168.51.33:11007',
      BASE_API: '',

      BASE_CS_cgs: '//192.168.51.33:11002',
      BASE_HCJ: '//192.168.51.248:11002',

      BASE_JY: '//192.168.51.199:18002',
      BASE_DHC: '//dev.upurchase-facade.ucnholding.com',
      BASE_LYF: '//dev.uuser-facade.ucnholding.com',
      BASE_JML: '//dev.umeta-facade.ucnholding.com',
      BASE_JML2: '//dev.umessage-facade.ucnholding.com',
      MOCK: 'https://www.easy-mock.com/mock/5abe0744a2146a37688ec3c1/api',
      BASE_HSM: 'http://dev.uwarehouse.ucnholding.com:18100',
      BASE_LJ: 'http://dev.upurchase-facade.ucnholding.com:18100',
      BASE_dictionary: 'http://dev.umeta-facade.ucnholding.com',
      BASE_BJ: 'http://dev.upurchase-facade.ucnholding.com:18100',
      BASE_SELLER: 'http://dev.usupply-facade.ucnholding.com:18100',
      BASE_BUYER: 'http://dev.upurchase-facade.ucnholding.com:18100',
      BASE_TEST: 'http://dev.upurchase-facade.ucnholding.com:80',
      BASE_JML_msg: 'http://dev.umessage-facade.ucnholding.com',
      BASE_JML_logs: 'http://dev.ubizlog-facade.ucnholding.com',
      BASE_UUSER: 'http://dev.uuser-facade.ucnholding.com:18100/',
      BASE_HSM_W: 'http://192.168.51.248:11001',
      BASE_BJ_p: 'http://dev.upurchase-facade.ucnholding.com:18300',
      BASE_BUY: '//192.168.51.248:11001',
      BASE_SELL: '//192.168.51.248:11002',
      //BASE_SELL: '//dev.usupply-facade.ucnholding.com',
      //USUPPLY_URL: '//dev.usupply-facade.ucnholding.com', // 供应商端
      BASE_WAREHOUSE: '//192.168.51.248:12005',

      // 开发服务器 248
      BASE_DEV: '//192.168.51.248:11001',
      BASE_DEV_DIC: '//192.168.51.248:11005',


      LOGIN_URL: '//dev.auth.ucnscm.cn',
      BASE_URL: '//192.168.51.248:11001', // 采购端
      USSO_URL: '//192.168.51.248:11006', // sso 服务
      UUSER_URL: '//192.168.51.248:11004', // 用户中心
      UMETA_URL: '//192.168.51.248:11005', // 元数据
      UMESSAGE_URL: '//192.168.51.248:11007', // 消息服务
      ULOG_URL: '//192.168.51.248:11008', // 日志服务
      UPURCHASE_URL: '//192.168.51.248:11001', // 采购端
      USUPPLY_URL: '//192.168.51.248:11002', // 供应商端
      // UPURCHASE_URL: '//dev.upurchase-facade.ucnholding.com', // 采购端
      // USUPPLY_URL: '//dev.usupply-facade.ucnholding.com', // 供应商端
      USERVICE_URL: '//192.168.51.248:11003', // 服务商端
      UOSS_URL: '//192.168.51.248:', // 对象存储服务
      UBIZLOG_URL: '//192.168.51.248:18100', // 业务日志
      UWORKBENCH_URL: '//dev.uworkbench.ucnholding.com:18100',

    },
    develop: {
      LOGIN_URL: '//dev.auth.ucnscm.cn',
      BASE_URL: '//192.168.51.248:11001', // 采购端
      USSO_URL: '//192.168.51.248:11006', // sso 服务
      UUSER_URL: '//192.168.51.248:11004', // 用户中心
      UMETA_URL: '//192.168.51.248:11005', // 元数据
      UMESSAGE_URL: '//192.168.51.248:11007', // 消息服务
      ULOG_URL: '//192.168.51.248:11008', // 日志服务
      UPURCHASE_URL: '//192.168.51.248:11001', // 采购端
      USUPPLY_URL: '//192.168.51.248:11002', // 供应商端
      USERVICE_URL: '//192.168.51.248:11003', // 服务商端
      UOSS_URL: '//192.168.51.248:', // 对象存储服务
      UBIZLOG_URL: '//192.168.51.248:18100', // 业务日志
      UWORKBENCH_URL: '//dev.uworkbench.ucnholding.com:18100',
    },
    test: {
      BASE_URL: '//test.upurchase-facade.ucnscm.cn', // 采购端
      USSO_URL: '//test.usso-facade.ucnscm.cn', // sso 服务
      UUSER_URL: '//test.uuser-facade.ucnscm.cn', // 用户中心
      UMETA_URL: '//test.umeta-facade.ucnscm.cn', // 元数据
      UMESSAGE_URL: '//test.umessage-facade.ucnscm.cn', // 消息服务
      UOSS_URL: '//test.uoss-facade.ucnscm.cn', // 对象存储服务
      ULOG_URL: '//test.ulog-facade.ucnscm.cn', // 日志服务
      UPURCHASE_URL: '//test.upurchase-facade.ucnscm.cn', // 采购端
      USUPPLY_URL: '//test.usupply-facade.ucnscm.cn', // 供应商端
      USERVICE_URL: '//test.uservice.ucnscm.cn', // 服务商端
      UBIZLOG_URL: '//test.ubizlog.ucnscm.cn', // 业务日志
      UWORKBENCH_URL: '//test.uworkbench-facade.ucnscm.cn',
      LOGIN_URL: '//test.auth.ucnscm.cn', // 登录授权
    },
    production: {
      BASE_API: 'https://store.tailorx.cn/api'
    }
  }[process.env.NODE_ENV],

  // 是否开启token验证
  AUTH: true,

  // 环境标识
  ENV_FLAG: process.env.NODE_ENV,

  // 是否mock
  IS_MOCK: false,

  // 请求超时
  TIMEOUT: 60000,

  // 默认语言设置
  LANGUAGE: 'en',

  // 项目版本号
  VERSION: `2.0.${process.env.VERSION}`,

  // 本地store缓存 前缀
  STORE_PREFIX: 'ucn_'
}
