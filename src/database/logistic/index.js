import basicInfo from './plan/basicInfo';
import planList from './plan/planList'
import transportationList from './plan/transportationList'
import containerInfo from './plan/containerInfo'
import productInfo from './plan/productInfo'
import productModify from './plan/productModify'
import {
  basicInfoObj,
  transportInfoObj,
  ExchangeRateInfo,
  payMentInfo,
  dbBasicInfoObj,
  addProductFromOrderFilter,
  dbProductInfo,
  dbcontainerInfo,
  validateShipperObj
} from './plan/staticData'
import sku from './plan/sku'
import {
  dateInfo
} from './plan/dateInfo'

export default {
  basicInfo,
  planList,
  transportationList,
  containerInfo,
  productInfo,
  productModify,
  sku,
  dateInfo,
  basicInfoObj,
  transportInfoObj,
  ExchangeRateInfo,
  payMentInfo,
  dbBasicInfoObj,
  dbProductInfo,
  dbcontainerInfo,
  addProductFromOrderFilter,
  validateShipperObj
}
