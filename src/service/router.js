import Vue from 'vue'
import Vuex from 'vuex';
import Router from 'vue-router'
import Config from 'service/config';
import Layout from 'components/layout/index.vue';
import $i from '../language/index';
import {Notification, Message} from 'element-ui';
import {localStore, sessionStore} from 'service/store';
import Util from 'service/util';

Vue.use(Router);

export const routerMap = [
    {
      path: '/',
      component: Layout,
      redirect: '/workbench/index',
      hidden: true, // 在侧边栏中不显示该菜单
    },
    {
      path: '/login',
      hidden: true,
      component: () => import('../views/login/index.vue')
    },
    {
      path: '/workbench',
      component: Layout,
      meta: {name: $i.router.workbench},
      redirect: '/workbench/index',
      noDropdown: true,
      children: [
        {
          path: 'index',
          name: 'workbench',
          meta: {
            draft: false,
            recycleBin: false,
            log: false,
          },
          component: () => import('../views/workbench/index.vue')
        }
      ]
    },
    {
      path: '/negotiation',
      name: 'negotiation',
      noDropdown: true,
      component: Layout,
      redirect: '/negotiation/inquiry',
      meta: {name: $i.router.negotiation},
      children: [
        {
          path: 'inquiry',
          name: 'inquiry',
          meta: {
            name: $i.router.negotiationInquiryOverview,
            recycleBin: 'INQUIRY:OVERVIEW:RECYCLE_BIN'
          },
          component: () => import('../views/negotiation/inquiryOverview')
        },
        {
          path: 'inquiryDetail',
          name: 'inquiryDetail',
          hidden: true,
          meta: {
            name: $i.router.negotiationInquiryDetail,
            recycleBin: 'INQUIRY:DETAIL:RECYCLE_BIN',
            messageBoard: 'INQUIRY:DETAIL:MESSAGE_BOARD'
          },
          component: () => import('../views/negotiation/inquiryDetail')
        },
        {
          path: 'recycleBin/:type',
          name: 'negotiationRecycleBin',
          component: () => import('../views/negotiation/recycleBin')
        }
      ]
    },
    {
      path: '/product',
      component: Layout,
      redirect: '/product/overview',
      name: 'product',
      meta: {
          auth:'PRODUCT',
          name: $i.router.product
      },
      children: [
        {
          path: 'overview',
          name: 'overview',
          meta: {
              auth:'PRODUCT:OVERVIEW',
            name: $i.router.productSourcingOverview
          },
          component: () => import('../views/product/overview')
        },
        {
          path: 'addNewProduct',
          name: 'addNewProduct',
          meta: {
              auth:'PRODUCT:OVERVIEW:ADD_PRODUCT',
            name: $i.router.addNewProduct
          },
          component: () => import('../views/product/addNewProduct')
        },
        {
          path: 'detail',
          name: 'Detail',
          hidden: true,
          meta: {
              auth:'PRODUCT:DETAIL',
            name: $i.router.productSourcingDetail
          },
          component: () => import('../views/product/detail')
        },
      ]
    },
    {
      path: '/payment',
      meta: {name: $i.router.payment},
      component: Layout,
      redirect: '/payment/index',
      noDropdown: true,
      children: [
        {
          path: 'index',
          name: 'payment',
          meta: {
            draft: true,
            recycleBin: true,
            log: true,
          },
          component: () => import('../views/payment/index.vue')
        }
      ]
    },
    {
      path: '/order',
      component: Layout,
      redirect: '/order/overview',
      meta: {
          name: $i.router.order,
          auth:'ORDER'
      },
      noDropdown: true,
      children: [
        {
          path: 'overview',
          name: 'order',
          meta: {
            log: true,
            name: $i.router.orderOverview,
              auth:'ORDER:OVERVIEW'
          },
          component: () => import('../views/order/overView.vue')
        },
        {
          path: 'detail',
          name: 'orderDetail',
          meta: {
              auth:'ORDER:DETAIL',
            name: $i.router.orderDetail
          },
          component: () => import('../views/order/orderDetail.vue')
        },  {
          path: 'archive',
          name: 'orderArchive',
          meta: {
            auth:'ORDER:ARCHIVE',
            name: $i.router.orderRecycleBin
          },
          component: () => import('../views/order/archive.vue')
        }
      ]
    },
    {
      path: '/logistic',
      name: 'logistic',
      meta: {
        name: $i.router.logistic,
        auth: ['LOGISTICS']
      },
      component: Layout,
      redirect: '/logistic/plan',
      children: [
        {
          path: 'plan',
          name: 'overviewPlan',
          meta: {
            draft: '/logistic/draft',
            recycleBin: true,
            importTask: true,
            name: $i.router.logisticPlanOverview,
            auth: ['LOGISTICS:PLAN_OVERVIEW']
          },
          component: () => import('../views/logistic/overviewWrapper')
        },
        {
          path: 'loadingList',
          name: 'overviewLoadingList',
          meta: {
            draft: '/logistic/draft',
            recycleBin: true,
            importTask: true,
            name: $i.router.logisticLoadingListOverview,
            auth: ['LOADING_LIST:OVERVIEW']
          },
          component: () => import('../views/logistic/overviewWrapper')
        },
        {
          path: 'draft',
          name: 'overviewDraft',
          hidden: true,
          meta: {
            draft: '/logistic/draft',
            recycleBin: true,
            name: $i.router.logisticLoadingDraft,
            auth: ['LOGISTICS:PLAN_DRAFT_OVERVIEW']
          },
          component: () => import('../views/logistic/overviewWrapper')
        },
        {
          path: 'archivePlan',
          name: 'archivePlan',
          hidden: true,
          meta: {
            draft: '/logistic/draft',
            recycleBin: false,
            log: true,
            importTask: false,
            name: $i.router.archive
          },
          component: () => import('../views/logistic/archivePlan')
        },
        {
          path: 'archiveLoadingList',
          name: 'archiveLoadingList',
          hidden: true,
          meta: {
            draft: '/logistic/draft',
            recycleBin: false,
            log: true,
            importTask: false,
            name: $i.router.archive
          },
          component: () => import('../views/logistic/archiveLoadingList')
        },
        {
          path: 'placeLogisticPlan',
          name: 'placeLogisticPlan',
          hidden: true,
          meta: {
            draft: '/logistic/draft',
            recycleBin: true,
            name: $i.router.logisticPlaceLogisticPlan
          },
          component: () => import('../views/logistic/logisticPlanDetail')
        },
        {
          path: 'planDetail',
          name: 'logisticPlanDetail',
          hidden: true,
          meta: {
            draft: '/logistic/draft',
            recycleBin: true,
            importTask: true,
            name: $i.router.logisticPlaceDetail,
            auth: ['LOGISTICS:PLAN_DETAIL']
          },
          component: () => import('../views/logistic/logisticPlanDetail')
        },
        {
          path: 'loadingListDetail',
          name: 'loadingListDetail',
          hidden: true,
          meta: {
            draft: '/logistic/draft',
            recycleBin: false,
            log: true,
            importTask: true,
            name: $i.router.logisticLoadingList,
            auth: ['LOADING_LIST:DETAIL']
          },
          component: () => import('../views/logistic/logisticPlanDetail')
        },
      ]
    },
    {
      path: '/settings',
      component: Layout,
      redirect: '/settings/department',
      meta: {name: $i.router.settings},
      children: [
        {
          path: 'department',
          name: 'settingsDepartment',
          meta: {
            draft: true,
            recycleBin: true,
            log: true,
            auth: [0],
            name: $i.router.settingsDepartment
          },
          component: () => import('../views/settings/departmentSetting.vue')
        },
        {
          path: 'category',
          name: 'settingsCategory',
          meta: {
            draft: true,
            recycleBin: true,
            log: true,
            auth: [0],
            name: $i.router.settingsCategory
          },
          component: () => import('../views/settings/CategorySetting')
        },
        {
          path: 'Personal',
          name: 'settingsPersonal',
          meta: {
            draft: true,
            recycleBin: true,
            log: true,
            name: $i.router.settingsPersonal
          },
          component: () => import('../views/settings/personalSetting')
        },
        {
          path: 'companyInfo',
          name: 'settingsCompany',
          meta: {
            draft: true,
            recycleBin: true,
            log: true,
            auth: [0],
            name: $i.router.settingsCompany
          },
          component: () => import('../views/settings/companyInfo')
        },
      ]
    },
    {
      path: '/track',
      component: Layout,
      redirect: '/track/index',
      meta: {name: $i.router.track},
      noDropdown: true,
      children: [
        {
          path: 'index',
          name: 'track',
          meta: {
            draft: true,
            recycleBin: true,
            log: true,
          },
          component: () => import('../views/track/trackBySKU.vue'),
        }
      ]
    },
    {
      path: '/logs',
      component: Layout,
      redirect: '/logs/index',
      meta: {name: $i.router.logs},
      noDropdown: true,
      hidden: true,
      children: [
        {
          path: 'index',
          name: 'logs',
          meta: {
            draft: true,
            recycleBin: true,
            log: true,
          },
          component: () => import('../views/logs/logs.vue')
        },
        {
          path: 'task',
          name: 'logsTask',
          meta: {},
          component: () => import('../views/logs/task.vue')
        }
      ]
    },
  {
    path: '/message',
    component: Layout,
    redirect: '/message/index',
    meta: {name: $i.router.message},
    hidden: true,
    children: [
      {
        path: 'index',
        name: 'message',
        component: () => import('../views/message/message.vue'),
      },
      {
        name: 'Management',
        path: 'messageManagement',
        meta: {
          name: $i.router.messageManagement
        },
        component: () => import('../views/message/messageManagement.vue'),
      },

    ],
  },
  // todo 供应商路由

  //draft  草稿箱路由
  {
    path: '/draft',
    component: Layout,
    meta: {name: 'Draft'},
    redirect: '/draft/index',
    noDropdown: true,
    hidden: true,
    children: [
      {
        path: 'index',
        name: 'draft',
        meta: {
          draft: false,
          recycleBin: false,
          log: false,
        },
        component: () => import('../views/draft/index.vue')
      }
    ]
  },
  //recycleBin  回收站路由
  {
    path: '/recycle',
    component: Layout,
    meta: {name: 'Recycle Bin'},
    redirect: '/recycle/index',
    noDropdown: true,
    hidden: true,
    children: [
      {
        path: 'index',
        name: 'recycleBin',
        meta: {
          draft: false,
          recycleBin: false,
          log: false,
        },
        component: () => import('../views/recycleBin/index.vue')
      }
    ]
  },
  {
    path: '/warehouse',
    component: Layout,
    redirect: '/warehouse/overview',
    name: 'warehouse',
    meta: {
      name: '仓库',
        auth:'WAREHOUSE',
    },
    noDropdown: false,
    children: [
      {
        path: 'overview',
        name: 'Warehouse Overview',
        meta: {
          name: '仓库总览',
            auth:'WAREHOUSE:OVERVIEW',
        },
        component: () => import('../views/warehouse/warehouseOverview.vue'),
      },
      {
        path: 'inbound',
        name: 'Inbound Overview',
        meta: {
          name: '入库总览',
            auth:'',
        },
        component: () => import('../views/warehouse/inbound/inboundOverview.vue'),
      },
      {
        path: 'createInbound',
        name: 'create Inbound',
        hidden: true,
        meta: {
            auth:'',
          name: '创建入库单'
        },
        component: () => import('../views/warehouse/inbound/createInbound'),
      },
      {
        path: 'inboundDetail',
        name: 'inbound Detail',
        hidden: true,
        meta: {
            auth:'',
          name: '入库详情',
        },
        component: () => import('../views/warehouse/inbound/inboundDetail'),
      },
      {
        path: 'outbound',
        name: 'Outbound Overview',
        meta: {
            auth:'',
          name: '出库总览'
        },
        component: () => import('../views/warehouse/outbound/outboundOverview'),
      },
      {
        path: 'createOutbound',
        name: 'create Outbound',
        hidden: true,
        meta: {
            auth:'',
          name: '创建出库单'
        },
        component: () => import('../views/warehouse/outbound/createOutbound'),
      },
      {
        path: 'outboundDetail',
        name: 'outbound Detail',
        hidden: true,
        meta: {
            auth:'',
          name: '出库单详情',
        },
        component: () => import('../views/warehouse/outbound/outboundDetail'),
      },
      {
        path: 'qcOverview',
        name: 'qc Overview',
        meta: {
            auth:'QC:ORDER_OVERVIEW',
          name: '货单预览',
        },
        component: () => import('../views/warehouse/qc/qcOverview'),
      },
      {
        path: 'qcOrder',
        name: 'qc Order',
        hidden: true,
        meta: {
          name: 'qc Order',
            auth:'QC:ORDER_DETAIL',
        },
        component: () => import('../views/warehouse/qc/qcOrder')
      },
      {
        path: 'qcOrderService',
        name: 'qc Order Service',
        hidden: true,
        meta: {
            auth:'QC:ORDER_DETAIL',
          name: 'qc Order Service'
        },
        component: () => import('../views/warehouse/qc/qcOrderService')
      },
      {
        path: 'qcOrderDetail',
        name: 'qc Order Detail',
        hidden: true,
        meta: {
            auth:'QC:ORDER_DETAIL',
          name: 'qc Order Detail'
        },
        component: () => import('../views/warehouse/qc/qcOrderDetail')
      }
    ]
  },
  {

    path: '/customer',
    component: Layout,
    meta: {name: 'customer'},
    redirect: '/customer/overview',
    noDropdown: true,
    hidden: false,
    children: [
      {
        path: 'overview',
        name: 'customerRecycleBin',
        meta: {
          draft: false,
          recycleBin: false,
          log: false,
          name: '客户总览'
        },
        component: () => import('../views/customer/overview.vue')
      },
      {
        path: 'detail',
        name: 'customerDetail',
        hidden: true,
        meta: {
          draft: false,
          recycleBin: false,
          log: false,
        },
        component: () => import('../views/customer/customerDetail.vue')
      }
    ]
  },
]


let router = new Router({
  mode: 'history',
  routes: routerMap
});


router.beforeResolve((to, from, next) => {
  let ts = localStore.get('token')
    , cacheParam = sessionStore.get('cache_router_param') || []
    , cp = _.findWhere(cacheParam, {path: to.path}) // 从缓存中获取对应路由参数
    , version;

  if (to.meta && to.meta.auth && !Util.$auth(to.meta.auth)) {
    return next({path: '/'});
  }

  if (to.path !== '/login' || from.path === '/login') {
    if (_.isEmpty(ts)) { // 登录验证
      return next({path: '/login'});
    }
  }

  next();
});

export default router
