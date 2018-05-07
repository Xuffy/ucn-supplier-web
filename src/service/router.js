import Vue from 'vue';
import Vuex from 'vuex';
import Router from 'vue-router';
import config from 'service/config';
import Layout from 'components/Layout/index.vue';
import {Notification, Message} from 'element-ui';
import {localStore, sessionStore} from 'service/store';

Vue.use(Router);

export const routerMap = [
    {
      path: '/',
      component: Layout,
      redirect: '/workbench/index',
      hidden: true, // 在侧边栏中不显示该菜单
    },
    {
      path: '/sellerNegotiation',
      name: 'sellerNegotiation',
      noDropdown: true,
      component: Layout,
      redirect: '/sellerNegotiation/inquiry',
      meta: {
        name: 'sellerNegotiation',
      },
      children: [
        {
          path: 'inquiry',
          name: 'sellerInquiry',
          meta: {
            name: 'seller Negotiation inquiry',
          },
          component: () => import('../views/sellerNegotiation/inquiryOverview')
        },
        {
          path: 'inquiryDetail',
          name: 'sellerInquiryDetail',
          hidden: true,
          meta: {
            draft: true,
            recycleBin: true,
            log: true,
            name: 'Inquiry Detail',
            messageBoard: 'code'
          },
          component: () => import('../views/sellerNegotiation/inquiryDetail')
        },
        {
          path: 'recycleBin',
          name: 'sellerRecycleBin',
          component: () => import('../views/sellerNegotiation/recycleBin')
        }
      ]
    },
    {
      path: '/login',
      hidden: true,
      component: () => import('../views/login/index.vue')
    },
    {
      path: '/workbench',
      component: Layout,
      meta: {name: 'Workbench'},
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
      path: '/supplier',
      component: Layout,
      meta: {name: 'Supplier'},
      redirect: '/supplier/sourcing',
      children: [
        {
          path: 'sourcing',
          name: 'supplierSourcing',
          meta: {
            draft: true,
            recycleBin: true,
            log: true,
            name: 'Sourcing'
          },
          component: () => import ('../views/supplier/sourcing/sourcing.vue'),
        },
        {
          path: 'bookmark',
          name: 'supplierBookmark',
          meta: {
            draft: true,
            recycleBin: true,
            log: true,
            name: 'Bookmark'
          },
          component: () => import ('../views/supplier/bookmark/bookmark.vue')
        },
        {
          path: 'bookmarkDetail',
          name: 'supplierBookmarkDetail',
          hidden: true,
          meta: {
            draft: true,
            recycleBin: true,
            log: true,
            name: 'Bookmark Detail'
          },
          component: () => import ('../views/supplier/bookmark/bookmarkDetail.vue')
        },
           {
          path: 'recycleBin',
          name: 'supplierRecycleBin',
          hidden: true,
          meta: {
            draft: true,
            recycleBin: true,
            log: true,
            name: 'Bookmark recycleBin'
          },
          component: () => import ('../views/supplier/bookmark/recycleBin.vue')
        },
        {
          path: 'sourcingDetail',
          name: 'supplierSourcingDetail',
          hidden: true,
          meta: {
            draft: true,
            recycleBin: true,
            log: true,
            name: 'Sourcing Detail'
          },
          component: () => import ('../views/supplier/sourcing/sourcingDetail.vue')
        },
        {
          path: 'compareDetail/:type',
          name: 'supplierCompareDetail',
          hidden: true,
          meta: {
            draft: true,
            recycleBin: true,
            log: true,
            name: 'Compare Detail'
          },
          component: () => import ('../views/supplier/Compare/Compare.vue')
        },
        {
          path: 'compare',
          name: 'supplierCompare',
          meta: {
            draft: true,
            recycleBin: true,
            log: true,
            name: 'Compare Overview'
          },
          component: () => import ('../views/supplier/Compare/Overview.vue')
        }
      ]
    },
    {
      path: '/negotiation',
      component: Layout,
      redirect: '/negotiation/inquiry',
      name: 'negotiation',
      meta: {name: 'Negotiation'},
      children: [
        {
          path: 'inquiry',
          name: 'negotiationInquiry',
          meta: {
            name: 'Inquiry Overview'
          },
          component: () => import('../views/negotiation/inquiryOverview')
        },
        {
          path: 'inquiryDetail',
          name: 'negotiationInquiryDetail',
          hidden: true,
          meta: {
            name: 'Inquiry Detail',
            messageBoard: 'code'
          },
          component: () => import('../views/negotiation/inquiryDetail')
        },
        {
          path: 'createInquiry',
          name: 'negotiationCreateInquiry',
          hidden: true,
          meta: {
            name: 'Create Inquiry'
          },
          component: () => import('../views/negotiation/createInquiry')
        },
        {
          path: 'compare',
          name: 'negotiationCompare',
          meta: {
            name: 'Compare Overview'
          },
          component: () => import('../views/negotiation/compareOverview')
        },
        {
          path: 'compareDetail/:type',
          name: 'negotiationCompareDetail',
          hidden: true,
          meta: {
            name: 'Compare Detail'
          },
          component: () => import('../views/negotiation/compare')
        },
        {
          path: 'draft/:type',
          name: 'negotiationDraft',
          hidden: true,
          meta: {
            name: 'draft'
          },
          component: () => import('../views/negotiation/draft')
        },
        {
          path: 'recycleBin/:type',
          name: 'negotiationRecycleBin',
          hidden: true,
          meta: {
            name: 'recycleBin'
          },
          component: () => import('../views/negotiation/recycleBin')
        }
      ]
    },
    {
      path: '/payment',
      meta: {name: 'Payment'},
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
      meta: {name: 'Order'},
      noDropdown: true,
      children: [
        {
          path: 'overview',
          name: 'order',
          meta: {
            draft: true,
            recycleBin: true,
            log: true,
            name: 'Overview'
          },
          component: () => import('../views/order/overView.vue')
        },
        {
          path: 'creat',
          name: 'orderCreat',
          meta: {
            draft: true,
            recycleBin: true,
            log: true,
            name: 'Creat'
          },
          component: () => import('../views/order/creatOrder/index.vue')
        }, {
          path: 'detail',
          name: 'orderDetail',
          meta: {
            draft: true,
            recycleBin: true,
            log: true,
            name: 'Detail'
          },
          component: () => import('../views/order/poDetail/index.vue')
        }, {
          path: 'draftOverview',
          name: 'orderDraft',
          meta: {
            draft: true,
            recycleBin: true,
            log: true,
            name: 'Draft Overview'
          },
          component: () => import('../views/order/draftOverview.vue')
        }, {
          path: 'recycleBin',
          name: 'orderRecycleBin',
          meta: {
            draft: true,
            recycleBin: true,
            log: true,
            name: 'recycleBin Overview'
          },
          component: () => import('../views/order/recycleBin.vue')
        }
      ]
    },
    {
      path: '/logistic',
      name: 'logistic',
      meta: {name: 'Logistic'},
      component: Layout,
      redirect: '/logistic/plan',
      children: [
        {
          path: 'plan',
          name: 'overviewPlan',
          meta: {
            draft: '/logistic/draft',
            recycleBin: true,
            name: 'planOverview'
          },
          component: () => import('../views/logistic/overviewWrapper')
        },
        {
          path: 'loadingList',
          name: 'overviewLoadingList',
          meta: {
            draft: '/logistic/draft',
            recycleBin: true,
            name: 'loadingList'
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
            name: 'logisticDraft'
          },
          component: () => import('../views/logistic/overviewWrapper')
        },
        {
          path: 'archive',
          name: 'overviewArchive',
          hidden: true,
          meta: {
            draft: '/logistic/draft',
            recycleBin: true,
            name: 'logisticArchive'
          },
          component: () => import('../views/logistic/overviewWrapper')
        },
        {
          path: 'placeLogisticPlan',
          name: 'placeLogisticPlan',
          hidden: true,
          meta: {
            draft: '/logistic/draft',
            recycleBin: true,
            name: 'placeLogisticPlan'
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
            name: 'planDetail'
          },
          component: () => import('../views/logistic/logisticPlanDetail')
        }
      ]
    },
    {
      path: '/settings',
      component: Layout,
      redirect: '/settings/department',
      meta: {name: 'Settings'},
      children: [
        {
          path: 'department',
          name: 'settingsDepartment',
          meta: {
            draft: true,
            recycleBin: true,
            log: true,
            name: 'department and user setting'
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
            name: 'Category Setting'
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
            name: 'Personal Setting'
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
            name: 'Company Info'
          },
          component: () => import('../views/settings/companyInfo')
        },
      ]
    },
    {
      path: '/track',
      component: Layout,
      redirect: '/track/index',
      meta: {name: 'Track'},
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
      meta: {name: 'Logs'},
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
        }
      ]
    },
    {
      path: '/message',
      component: Layout,
      redirect: '/message/index',
      meta: {name: 'Message'},
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
            name: 'Management'
          },
          component: () => import('../views/message/messageManagement.vue'),
        },

      ],
    },
    // todo 供应商路由
    {
      path: '/product',
      component: Layout,
      redirect: '/product/overview',
      name: 'product',
      meta: {
        name: '产品'
      },
      // hidden: true,
      children: [
        {
          path: 'overview',
          name: 'overview',
          meta: {
            name: '总览'
          },
          component: () => import('../views/product/overview')
        },
        {
          path: 'addNewProduct',
          name: 'Add New Product',
          meta: {
            name: '新增产品'
          },
          component: () => import('../views/product/addNewProduct')
        },
        {
          path: 'detail',
          name: 'Detail',
          hidden:true,
          meta: {
            name: '产品详情'
          },
          component: () => import('../views/product/detail')
        },
      ]
    },
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
        name: '仓库'
      },
      noDropdown: false,
      children: [
        {
          path: 'overview',
          name: 'Warehouse Overview',
          meta: {
            draft: true,
            recycleBin: true,
            log: true,
            name: '仓库总览'
          },
          component: () => import('../views/warehouse/warehouseOverview.vue'),
        },
        {
          path: 'inbound',
          name: 'Inbound Overview',
          meta: {
            draft: true,
            recycleBin: true,
            log: true,
            name: '入库总览'
          },
          component: () => import('../views/warehouse/inbound/inboundOverview.vue'),
        },
        {
          path: 'createInbound',
          name: 'create Inbound',
          meta: {
            draft: true,
            recycleBin: true,
            log: true,
            name: 'create Inbound'
          },
          component: () => import('../views/warehouse/inbound/createInbound'),
        },
        {
          path: 'inboundDetail',
          name: 'inbound Detail',
          hidden:true,
          meta: {
            draft: true,
            recycleBin: true,
            log: true,
            name: '入库详情',
          },
          component: () => import('../views/warehouse/inbound/inboundDetail'),
        },
        {
          path: 'outbound',
          name: 'Outbound Overview',
          meta: {
            draft: true,
            recycleBin: true,
            log: true,
            name: 'Outbound Overview'
          },
          component: () => import('../views/warehouse/outbound/outboundOverview'),
        },
        {
          path: 'createOutbound',
          name: 'create Outbound',
          meta: {
            draft: true,
            recycleBin: true,
            log: true,
            name: 'create Outbound'
          },
          component: () => import('../views/warehouse/outbound/createOutbound'),
        },
        {
          path: 'outboundDetail',
          name: 'outbound Detail',
          meta: {
            draft: true,
            recycleBin: true,
            log: true,
            name: 'outbound Detail',
          },
          component: () => import('../views/warehouse/outbound/outboundDetail'),
        },
        {
          path: 'qcOverview',
          name: 'qc Overview',
          meta: {
            draft: true,
            recycleBin: true,
            log: true,
            name: 'qc Overview',
          },
          component: () => import('../views/warehouse/qc/qcOverview'),
        },
        {
          path: 'sellerQCOrderDetail',
          name: 'sellerQCOrderDetail',
          meta: {
            name: 'sellerQCOrderDetail'
          },
          component: () => import('../views/warehouse/qc/QCOrderDetail')
        },
        {
          path: 'sellerEditOrderOverview',
          name: 'sellerEditOrderOverview',
          meta: {
            name: 'sellerEditOrderOverview'
          },
          component: () => import('../views/warehouse/qc/editQcOrderOverview')
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
          },
          component: () => import('../views/customer/overview.vue')
        },
        {
          path: 'detail',
          name: 'customerRecycleBinDetail',
          meta: {
            draft: false,
            recycleBin: false,
            log: false,
          },
          component: () => import('../views/customer/customerDetail.vue')
        }
      ]
    },
    {
      path: '/sellerSettings',
      name: 'sellerSettings',
      noDropdown: false,
      component: Layout,
      redirect: '/sellerSettings/CategorySetting',
      meta: {
        name: 'sellerSettings',
      },
      children: [
        {
          path: 'sellerCategorySetting',
          name: 'sellerCategorySetting',
          meta: {
            name: 'Category setting',
          },
          component: () => import('../views/sellerSettings/CategorySetting'),
        }
      ]
    }
  ]
;


let router = new Router({
  routes: routerMap
});


router.beforeResolve((to, from, next) => {
  let ts = localStore.get('token')
    , cacheParam = sessionStore.get('cache_router_param') || []
    , cp = _.findWhere(cacheParam, {path: to.path}) // 从缓存中获取对应路由参数
    , version;


  if (to.path !== '/login' || from.path === '/login') {
    /*version = localStore.get('version');

    if (version !== config.VERSION) { // 版本控制
      return next({path: '/login'});
    }*/
    if (_.isEmpty(ts)) { // 登录验证
      return next({path: '/login'});
    }
  }

  // 判断路由是否必须带入参数 todo 跳转之前页面地址没有带上参数
  if (to.meta.needParam) {
    if (_.isEmpty(to.params) && _.isEmpty(to.query)) {
      if (!_.isEmpty(cp)) {
        _.map(cp.query, (val, key) => {
          to.query[key] = val;
        });

        _.map(cp.params, (val, key) => {
          to.params[key] = val;
        });
      } else {
        return to.matched.length ?
          next({path: to.matched[1] ? to.matched[1].redirect : to.matched[0].redirect}) : next({path: '/'});
      }
    }
    if (!_.isEmpty(cp)) {
      cacheParam = _.filter(cacheParam, val => {
        return val.path !== to.path;
      });
    }

    cacheParam.push(_.pick(to, 'path', 'params', 'query'));
    sessionStore.set('cache_router_param', cacheParam);

  }

  // Notification.closeAll();

  next();
});

export default router
