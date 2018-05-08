import {localStore} from 'service/store';
import config from 'service/config';

const lang = localStore.get('language') || config.LANGUAGE;

const json = {
  common: _.extend({},
    require(`./${lang}/common/quickLinks`),
    require(`./${lang}/common/basePlaceholder`),
    require(`./${lang}/common/baseText`),
    require(`./${lang}/common/setting`),
    require(`./${lang}/common/message`)
  ),
  inquiry: _.extend({},
    require(`./${lang}/inquiry/basicInfo.pending`),
    require(`./${lang}/inquiry/index`),
    require(`./${lang}/inquiry/viewByInqury.pending`),
    require(`./${lang}/inquiry/viewBySKU.pending`),
    require(`./${lang}/inquiry/productInfo.pending`)
  ),
  logistic: _.extend({},
    require(`./${lang}/logistic/plan/basicInfo.pending`),
    require(`./${lang}/logistic/plan/overviewBtn.pending`),
    require(`./${lang}/logistic/plan/plan.base`)
  ),
  logs: _.extend({},
    require(`./${lang}/logs/logs.basic`),
    require(`./${lang}/logs/logs.basic`)
  ),
  message: _.extend({},
    require(`./${lang}/message/message.table`),
    require(`./${lang}/message/tabs`)
  ),
  order: _.extend({},
    require(`./${lang}/order/basicinfo.pending`),
    require(`./${lang}/order/overview`),
    require(`./${lang}/order/productinfo.pending`)
  ),
    payment: _.extend({},
    require(`./${lang}/payment/payment`),
    require(`./${lang}/payment/payment.table`)
  ),
  product: _.extend({},
    require(`./${lang}/product/product.basic`),
    require(`./${lang}/product/product.overview`),
    require(`./${lang}/product/product.overviewTable`),
    require(`./${lang}/product/product.detail`),
    require(`./${lang}/product/product.customer`),
  ),
    setting: _.extend({},
    require(`./${lang}/setting/department`),
    require(`./${lang}/setting/personalInfo`),
    require(`./${lang}/setting/setting.basic`)
  ),
  supplier: _.extend({},
    require(`./${lang}/supplier/detail.pending`),
    require(`./${lang}/supplier/overview`)
  ),
  track: _.extend({},
    require(`./${lang}/track/trackBysku`)
  ),
  warehouse: _.extend(
    require(`./${lang}/warehouse/warehouse.basic`),
    require(`./${lang}/warehouse/warehouse.inboundOverviewTable`),
    require(`./${lang}/warehouse/warehouse.inboundDetail`),
    require(`./${lang}/warehouse/warehouse.outboundOverview`),
    require(`./${lang}/warehouse/warehouse.outboundDetail`),


    /**
     * 新language
     * */
    require(`./${lang}/warehouse/warehouse.qcOverview`),
    require(`./${lang}/warehouse/warehouse.overview`),
  ),
  workbench: _.extend({},
    require(`./${lang}/workbench/page`),
    require(`./${lang}/workbench/task`)
  ),
}

console.log(`%c这是优化后的国际化配置，请仔细看，修改并不麻烦。\n只需要把之前下划线 ‘$i.’ 去掉就行了`, "color:#409EFF", json,'\n\n');

export default json;
/*
export default _.extend({},
  require(`./${lang}/common/quickLinks`),
  {_workbench: require(`./${lang}/workbench/page`)},
  require(`./${lang}/workbench/task`),
  {_setting: require(`./${lang}/setting`)},
  {_departmentSetting: require(`./${lang}/setting/department`)},
  require(`./${lang}/setting/setting.basic`),
  {_common: require(`./${lang}/common`)},
  {_basePlaceholder: require(`./${lang}/basePlaceholder`)},
  {_inquiry: require(`./${lang}/inquiry/index`)},
  {_basePlaceholder: require(`./${lang}/basePlaceholder`)},
  {_inquiry: require(`./${lang}/inquiry/index`)},
  require(`./${lang}/warehouse/qcDetailBasicInfo.pending`),
  require(`./${lang}/warehouse/summary.pending`),
  require(`./${lang}/inquiry/viewByInqury.pending`),
  require(`./${lang}/inquiry/viewByInqury.pending`),
  require(`./${lang}/inquiry/viewBySKU.pending`),
  require(`./${lang}/inquiry/basicInfo.pending`),
  require(`./${lang}/supplier/overview`),
  require(`./${lang}/supplier/detail.pending`),
  require(`./${lang}/order/overview`),
  require(`/${lang}/order/basicinfo.pending`),
  require(`/${lang}/order/productinfo.pending`),
  require(`./${lang}/logistic/plan/overviewBtn.pending`),
  require(`./${lang}/logistic/plan/plan.base`),
  require(`./${lang}/inquiry/compare.pending`),
  // payment
  {_payment: require(`./${lang}/payment/payment`)},
  require(`./${lang}/payment/payment.table`),
  //message
  require(`./${lang}/message/message.table`),
  {_messages: require(`./${lang}/message/tabs`)},
  //logs
  require(`./${lang}/logs/logs.table`),
  {_logBasic: require(`./${lang}/logs/logs.basic`)},
  {_track: require(`./${lang}/track/trackBysku`)},
  {_personalInfo: require(`./${lang}/setting/personalInfo`)},

  {_product: require(`./${lang}/product/product.basic`)},
  {_productCn: require(`./${lang}/productCn/product.basic`)},

  require(`./${lang}/product/productOverview`),
  require(`./${lang}/productCn/productOverview`),
  require(`./${lang}/logistic/plan/plan.base`),
  require(`./${lang}/warehouse/qcDetailProductInfo.pending`),
  require(`./${lang}/warehouse/qcWarehouse`),
  require(`./${lang}/warehouse/warehouse.table`),


    //warehouse qc
    {_buyerQc: require(`./${lang}/warehouse/createQc.basic`)},


  //CN配置

  {_warehouse: require(`./${lang}/warehouseCn/warehouse.basic`)},
  require(`./${lang}/warehouseCn/warehouse.index`),
)
*/
