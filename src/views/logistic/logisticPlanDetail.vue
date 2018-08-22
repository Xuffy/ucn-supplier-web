<template>
  <div class="place-logistic-plan">
    <div class="hd-top" v-if="pageTypeCurr=='logisticPlanDetail'">{{ $i.logistic.logisticPlan + ' ' + logisticsNo}}</div>
    <div class="hd-top" v-if="pageTypeCurr=='loadingListDetail'">{{ $i.logistic.loadingList + ' ' + logisticsNo}}</div>
    <form-list :DeliveredEdit="DeliveredEdit" name="BasicInfo" :fieldDisplay="fieldDisplay" :showHd="false" @selectChange="formListSelectChange"
      @hightLightModifyFun="hightLightModifyFun" :edit="edit" :beShipper="beShipper" :listData.sync="basicInfoArr" :selectArr="selectArr" :title="$i.logistic.basicInfoTitle"
    />
    <!-- shiper 有点特殊 单独放出来处理 -->
    <el-form label-width="300px" label-position="right" class="form">
      <el-form-item :required="isShow" :show-message="false" :label="$i.logistic.shipper+'：'">
        <!-- 绑定对象时 用一个唯一value-key的值 去对应key -->
        <el-select v-if="isShow" value-key="id" v-model="shipperObj" :placeholder="$i.logistic.placeholder">
          <el-option :label="item.name" :value="item" v-for="item of shipperArr" :key="item.id" />
        </el-select>
        <p v-if="!isShow" :style="fieldDisplay&&fieldDisplay.hasOwnProperty('skuSupplierAbbr') ? {
            'background': 'yellow',
            'padding':'5px'
          } : ''">{{ ShipperName }}</p>
      </el-form-item>
    </el-form>
    <el-row :gutter="10">
      <!-- <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24"> -->
      <div class="input-item">
        <span>{{ $i.logistic.remark }}:</span>
        <el-input @change="hightLightModifyFun({remark:remark},'remark')" :class="[{definedStyleClass : fieldDisplay&&fieldDisplay.hasOwnProperty('remark')},'el-input']"
          type="textarea" resize="none" :autosize="{ minRows: 3 }" :placeholder="$i.logistic.pleaseChoose" v-model="remark"
          v-if="isShow"></el-input>
        <p v-else :style="fieldDisplay&&fieldDisplay.hasOwnProperty('remark') ? {
            'background': 'yellow',
            'padding':'5px'
          } : ''">{{ remark }}</p>
      </div>
      <!-- </el-col> -->
      <div class="input-item">
        <span>{{ $i.logistic.attachment }}:</span>
        <attachment accept="all" ref="attachment" :readonly="!isShow" :list="attachmentList" :title="$i.logistic.attachment"
          :limit="20"/>
      </div>
    </el-row>
    <!-- <form-list :DeliveredEdit="DeliveredEdit" :listData="ExchangeRateInfoArr" :edit="edit" :title="$i.logistic.ExchangeRateInfoTitle"/> -->
    <form-list :DeliveredEdit="DeliveredEdit" name="TransportInfo" :fieldDisplay="fieldDisplay" @hightLightModifyFun="hightLightModifyFun"
      :listData="transportInfoArr" :selectArr="selectArr" :edit="edit" :beShipper="beShipper" :title="$i.logistic.transportInfoTitle" />

    <!-- 日期列表 -->
    <dateInfo :beShipper="beShipper" :fieldDisplay="fieldDisplay" :listData="mediatorDate" :selectArr="selectArr" :basicInfoArr="basicInfoArr" :shipmentStatus="shipmentStatus" :edit="edit"
      :title="$i.logistic.dateInfo" @modifyTime="modifyTimeData" @shipmentStatus="changeShipmentStatus" @hightLightModifyFun="hightLightModifyFun"></dateInfo>

    <div>
      <div class="hd"></div>
      <div class="hd active">{{ $i.logistic.containerInfoTitle }}</div>
      <containerInfo :beShipper="beShipper" :matchData="containerinfoMatch" :tableData="containerInfo" :currencyCode="oldPlanObject.currency" :ExchangeRateInfoArr="ExchangeRateInfoArr"
        @arrayAppend="arrayAppend" @handleSelectionChange="handleSelectionContainer" @deleteContainer="deleteContainer" :edit="edit"
        :containerType="selectArr.containerType" @ContainerInfoLight="ContainerInfoLight"></containerInfo>
    </div>

    <div v-if="pageTypeCurr.slice(-6) == 'Detail'">
      <div class="hd"></div>
      <div class="hd active">{{ $i.logistic.feeInfoTitle }}</div>
      <fee-info :beShipper="beShipper" :edit="edit" :matchData="feeListMatch" :tableData.sync="feeList" :selectArr="selectArr" @feeInfoLight="feeInfoLight"></fee-info>
    </div>

    <div v-if="pageTypeCurr.slice(-6) == 'Detail'">
      <div class="hd"></div>
      <div class="hd active">{{ $i.logistic.paymentTitle }}</div>
      <div class="hd active">
        <el-button v-authorize="auth[pageTypeCurr]&&auth[pageTypeCurr].PRESS_FOR_PAYMENT||''" type="primary" size="mini" :disabled="dunningDisabled"
          @click.stop="batchDunning">{{ batchDunningCutDown + $i.logistic.Dept }}</el-button>
      </div>
      <payment ref="payment" :beShipper="beShipper" v-authorize="auth[pageTypeCurr]&&auth[pageTypeCurr].payment||''" :tableData.sync="paymentList" :ExchangeRateInfoArr="ExchangeRateInfoArr"
        :edit="edit" :paymentSum="paymentSum" @addPayment="addPayment" @savePayment="savePayment" :selectArr="selectArr" @updatePaymentWithView="updatePaymentWithView"
        :currencyCode="oldPlanObject.currency" />
    </div>
    <div>
      <div class="hd"></div>
      <div class="hd active">{{ $i.logistic.productInfoTitle }}</div>
      <v-table ref="productInfo" :code="configUrl[pageName]&&configUrl[pageName].setTheField" :totalRow="productListTotal" :data="productList"
        @action="action" :buttons="productbButtons" @change-checked="selectProduct" native-sort="vId" @change-sort="$refs.productInfo.setSort(productList)">
        <div slot="header" class="product-header">
          <el-button v-if="edit" type="primary" size="mini" @click.stop="getSupplierIds">{{ $i.logistic.addProduct }}</el-button>
          <el-button v-if="edit" v-authorize="auth[pageTypeCurr]&&auth[pageTypeCurr].PRODUCT_INFO_DELETE||''" type="danger" size="mini"
            @click.stop="removeProduct">{{ $i.logistic.remove }}</el-button>
          <!-- <label v-if="(edit||DeliveredEdit)&&pageTypeCurr=='loadingListDetail'">{{ $i.logistic.shipmentStatus}} :</label> -->
          <!-- <el-select v-if="(edit||DeliveredEdit)&&pageTypeCurr=='loadingListDetail'" v-model="ShipmentStatusCode" placeholder="请选择"
            @change="ShipmentStatusChange">
            <el-option v-for="item in selectArr.shipmentStatus" :key="item.code" :label="item.name" :value="item.code">
            </el-option>
          </el-select> 留着-->
        </div>
      </v-table>
    </div>
    <el-dialog width="70%" :visible.sync="showAddProductDialog" :close-on-click-modal="false" :close-on-press-escape="false">
      <overviewPage :title="$i.logistic.addProductFromOrder" :tableData="ProductFromOrder" :form-column="$db.logistic.addProductFromOrderFilter"
        :tableButtons="null" @change-checked="changeChecked" @tableBtnClick="ProductFromOrderDetail" @search="getSupplierIds"
        :tableCode="configUrl[pageName]&&configUrl[pageName].addproduct" @change-sort="changeSort">
        <v-pagination slot="pagination" :pageSizes="[50,100,200]" :page-data="pageParams" @size-change="sizeChange" @change="pageChange"/>
        <div slot=footerBtn>
          <el-button @click="showAddProductDialog = false">{{ $i.logistic.cancel }}</el-button>
          <el-button type="primary" @click="closeAddProduct">{{ $i.logistic.confirm }}</el-button>
        </div>
      </overviewPage>
    </el-dialog>
    <messageBoard v-if="!isParams" module="logistic" :code="pageTypeCurr" :id="logisticsNo"></messageBoard>
    <btns :beShipper="beShipper" :DeliveredEdit="DeliveredEdit" :edit="edit" @switchEdit="switchEdit" @toExit="toExit" :logisticsStatus="logisticsStatus"
      @sendData="sendData" :btnModifyTime="btnModifyTime" :basicInfoArr="basicInfoArr" :listData="mediatorDate" :selectArr="selectArr"
      :shipmentStatus="shipmentStatus" @shipmentStatus="changeShipmentStatus" />
    <v-history-modify :code="configUrl[pageName]&&configUrl[pageName].setTheField" ref="HM" disabled-remark :beforeSave="closeModify"
      @save="closeModifyNext"  @closed="$refs.productInfo.update()" @change="autoComputed"></v-history-modify>
  </div>
</template>
<script>
  import {
    selectSearch,
    VTable,
    VHistoryModify,
    overviewPage,
    VPagination
  } from '@/components/index';
  import {
    mapActions,
    mapState
  } from 'vuex';
  import containerInfo from '@/views/logistic/children/containerInfo';
  import attachment from '@/components/common/upload/index';
  import messageBoard from '@/components/common/messageBoard/index';
  import formList from '@/views/logistic/children/formList'
  import feeInfo from '@/views/logistic/children/feeInfo'
  import payment from '@/views/logistic/children/payment'
  import btns from '@/views/logistic/children/btns'
  import dateInfo from '@/views/logistic/children/dateInfo'

  export default {
    name: 'logisticPlanDetail',
    data() {
      return {
        isShow:false,
        btnModifyTime: {},
        shipmentStatus: 0,
        planId: '',
        ShipmentStatusCode: '',
        pageParams: {
          pn: 1,
          ps: 10
        },
        DeliveredEdit: false,
        beShipper: null,
        modefiyProductIndex: 0,
        modefiyProductIndexArr: [],
        selectProductArr: [],
        attachmentList: [],
        logisticsStatus: {},
        fieldDisplay: {},
        hightLightObj: {},
        logisticsNo: '',
        remark: '',
        ShipperName: '',
        showProductDialog: false,
        showAddProductDialog: false,
        selectionContainer: [],
        productInfoModifyStatus: 0,
        edit: false,
        oldPlanObject: {},
        oldPaymentObject: {},
        basicInfoObj: {},
        transportInfoObj: {},
        ExchangeRateInfoArr: [],
        transportInfoArr: [],
        basicInfoArr: [],
        modifyProductArray: [],
        exchangeRateList: [],
        feeList: [],
        feeListMatch: [],
        productList: [],
        removeProductList: [],
        productModifyList: [],
        paymentList: [],
        containerInfo: [],
        mediatorDate: [],
        containerinfoMatch: [],
        ProductFromOrderChecked: [],
        shipperArr: [],
        shipperObj: {},
        paymentSum: {},
        selectArr: {
          containerType: [],
          permitedForTransportation: [{
              code: '1',
              name: this.$i.logistic.yes
            },
            {
              code: '0',
              name: this.$i.logistic.no
            }
          ]
        },
        auth: {
          logisticPlanDetail: {
            payment: 'LOGISTICS:PLAN_DETAIL:PAYMENT',
            PRESS_FOR_PAYMENT: 'LOGISTICS:PLAN_DETAIL:PRESS_FOR_PAYMENT',
            PRODUCT_INFO_DELETE: 'LOGISTICS:PLAN_DETAIL:PRODUCT_INFO_DELETE'
          },
          loadingListDetail: {
            PRESS_FOR_PAYMENT: 'LLOADING_LIST:DETAIL:PRESS_FOR_PAYMENT',
            payment: 'LOADING_LIST:DETAIL:PAYMENT'
          }
        },
        dictionaryPart: {
          avl: 'AVL',
          blType: 'BL_TYPE',
          logisticsStatus: 'LS_PLAN',
          transportationWay: 'MD_TN',
          payment: 'PMT',
          skuIncoterm: 'ITM',
          shipmentStatus: 'LOGISTICS_SHIP_STATUS',
          paymentItem: 'PAYMENT_ITEM_NAME'
        },
        configUrl: {
          placeLogisticPlan: {
            saveAsDraft: this.$apis.save_draft_logistic_plan,
            send: this.$apis.send_logistic_plan,
            setTheField: 'ulogistics_PlanDetail',
            addproduct:"ulogistics_PlanDetail_AddProduct"
          },
          loadingListDetail: {
            send: this.$apis.update_logistic_plan,
            setTheField: 'ulogistics_OrderDetail',
            addproduct:"ulogistics_OrderDetail_AddProduct"
          },
          planDetail: {
            send: this.$apis.update_logistic_plan,
            setTheField: 'ulogistics_PlanDetail',
            addproduct:"ulogistics_PlanDetail_AddProduct"
          },
          planDraftDetail: {
            saveAsDraft: this.$apis.save_draft_logistic_plan,
            send: this.$apis.send_draft_logistic_plan,
            setTheField: 'ulogistics_PlanDetail',
            addproduct:"ulogistics_PlanDetail_AddProduct"
          }
        },
        pageName: '',
        prodFieldDisplay: {},
        batchDunningCutDown: '',
        CutDown: null,
        ProductFromOrder: [],
        ProductFromOrderRes: [],
        initData: null,
        dunningDisabled:false
      }
    },
    components: {
      formList,
      containerInfo,
      attachment,
      VTable,
      feeInfo,
      payment,
      btns,
      dateInfo,
      messageBoard,
      VHistoryModify,
      overviewPage,
      VPagination
    },
    computed: {
      productListTotal() {
        let obj = {};
        if (this.productList.length <= 0) {
          return
        }
        this.productList.forEach((item, i) => {
          _.mapObject(item, (v, k) => {
            if (v._important) {
              obj[k] = {
                value: Number(v.value) + Number(obj[k] ? obj[k].value : 0)
              };
            } else {
              obj[k] = {
                value: '--'
              };
            }
          })
        });
        return [obj];
      },
      pageTypeCurr() {
        return this.$route.name;
      },
      orderType() {
        return this.pageTypeCurr == 'loadingListDetail' ? 37 : 30;
      },
      isParams() {
        return _.isEmpty(this.$route.query)
      },
      productbButtons() {
        let aArr = [{
            label: this.$i.logistic.Negociate,
            type: 1,
            disabled: !this.edit
          },
          {
            label: this.$i.logistic.Copy,
            type: 4,
            disabled: !this.edit
          }
        ]
        this.$route.name == 'placeLogisticPlan' ? aArr : aArr.splice(1, 0, {
          label: this.$i.logistic.History,
          type: 2,
          disabled: !this.edit
        })
        return aArr;
      }
    },
    mounted() {
      let menuList = [{
        path: '',
        query: {
          code: this.pageTypeCurr && this.pageTypeCurr == "loadingListDetail" ? 'BIZ_LOGISTIC_ORDER' : 'BIZ_LOGISTIC_PLAN'
        },
        type: 100,
        auth: (() => {
          let code = null;
          if (this.pageTypeCurr == "logisticPlanDetail") {
            code = 'LOGISTICS:LOG';
          } else if (this.pageTypeCurr == "loadingListDetail") {
            code = 'LOADING_LIST:LOG';
          }
          return code
        })(),
        label: this.$i.common.log
      }];
      if (this.pageTypeCurr == "logisticPlanDetail") {
        menuList.push({
          path: '/logistic/archivePlan',
          auth: 'LOGISTICS:PLAN_DETAIL:ARCHIVE',
          label: this.$i.logistic.archivePlan
        })
      } else if (this.pageTypeCurr == "loadingListDetail") {
        menuList.push({
          path: '/logistic/archiveLoadingList',
          auth: 'LOADING_LIST:DETAIL:ARCHIVE',
          label: this.$i.logistic.archiveLoadingList
        })
      }
      this.setMenuLink(menuList);
      const arr = this.$route.fullPath.split('/')
      this.pageName = arr[arr.length - 1].split('?')[0]
      this.getDictionary()
      let obj;
      switch(this.pageTypeCurr){
        case 'logisticPlanDetail' : obj = this.$db.logistic.basicInfoObj;
        break;
        case 'loadingListDetail' : obj = this.$db.logistic.LLBasicInfoObj;
        break;
        default:
        break;
      }
      this.basicInfoArr = _.map(this.$depthClone(obj), (value, key) => {
        return value;
      })
      this.ExchangeRateInfoArr = _.map(this.$db.logistic.ExchangeRateInfo, (value, key) => {
        return value;
      })
      this.transportInfoArr = _.map(this.$db.logistic.transportInfoObj, (value, key) => {
        return value;
      });
      this.mediatorDate = [_.mapObject(this.$db.logistic.dateInfo, (value, key) => {
        return value;
      })]
      this.countryAll();
    },
    methods: {
      modifyTimeData(arg) {
        this.btnModifyTime = arg;
      },
      autoComputed(data, row) {
        if(data.type=='Select'){
          if ('correlationKey' in data) {
            let obj = data._option.find(el => el.containerNo == data.value);
            row.containerId.value = obj ? obj.id : '';
            row[data.correlationKey].value = obj ? obj[data.correlationKey] : '';
            row[data.correlationKey]._isModified = true;
          }
        }
        if (data.hasOwnProperty('computed')) {
          data.computed.forEach(el=>{
            row[el.computedResKey].value = this.$calc.multiply(data.value || 0, row[el.computedKey].value || 0);
            el._isModified = row[el.computedResKey]._isModified = true;
          })
        }
      },
      ...mapActions(['setMenuLink']),
      //初始页面数据
      pageInit() {
        if (this.pageTypeCurr.slice(-6) == 'Detail') {
          this.getDetails();
        } else {
          this.edit = true
          this.basicInfoArr.forEach((item) => {
            this.$set(item, 'value', this.$i.logistic[item.defaultVal]);
          })
          this.transportInfoArr.forEach((item) => {
            this.$set(item, 'value', this.$i.logistic[item.defaultVal]);
          })
          this.getRate();
          this.getNewLogisticsNo()
        }
      },
      //获取实时汇率
      getRate() {
        this.$ajax.post(`${this.$apis.get_plan_rate}`).then(res => {
          this.matchRate(res);
        })
      },
      //汇率与后台传入做 对应匹配
      matchRate(res) {
        this.ExchangeRateInfoArr.forEach((item) => {
          res.forEach((_item) => {
            if (item.key == _item.symbol) {
              _.map(_item, (v, k) => {
                this.$set(item, k == 'price' ? 'value' : k, v)
              })
            }
          })
        })
      },
      sizeChange(e) {
        this.pageParams.ps = e
        this.getSupplierIds()
      },
      pageChange(e) {
        this.pageParams.pn = e
        this.getSupplierIds()
      },
      changeSort(arr) {
        this.$set(this.pageParams, 'sorts', arr.sorts);
        this.getSupplierIds();
      },
      getSupplierIds(arg) {
        this.pageParams = { ...this.pageParams,
          ...arg
        }
        let url = this.$route.name == 'loadingListDetail' ? 'logistics_order_getSupplierIds' :
          'logistics_plan_getSupplierIds';
        this.$ajax.get(this.$apis[url], {
          logisticsNo: this.basicInfoArr[0].value
        }).then(res => {
          this.pageParams.skuSupplierIds = res.supplierIds;
          this.pageParams.customerId = res.customerId;
          this.addProductFromOrder();
        })
      },
      ProductFromOrderDetail(e) {
        this.$windowOpen({
          url: '/product/detail',
          params: {
            id: e.skuId.value
          }
        })
      },
      addProductFromOrder() {
        this.$ajax.post(this.$apis.get_order_list_with_page, this.pageParams).then(res => {
          this.showAddProductDialog = true;
          this.ProductFromOrderRes = res.datas;
          this.ProductFromOrder = this.$getDB(this.$db.logistic.addProduct, res.datas.map(el=>{
            let sliceStr = this.selectArr.skuIncoterm.find(item => item.code == el.skuIncoterm).name;
            sliceStr = sliceStr.slice(0, 1) + sliceStr.slice(1 - sliceStr.length).toLowerCase();
            el.currency = el['sku' + sliceStr + 'Currency'];
            return el;
          }), el => {
            this.productList.forEach(item => {
              //两个字段拼接确定唯一
              if (el.skuId.value+'-'+el.orderId.value == item.skuId.value+'-'+item.orderId.value) {
                el._disabled = true;
                el._checked = true;
              }
            })
            return el;
          });
          this.$nextTick(() => {
            this.$set(this.pageParams, 'pn', res.pn);
            this.$set(this.pageParams, 'ps', res.ps);
            this.$set(this.pageParams, 'tc', res.tc);
          })
        })
      },
      getDetails() {
        let url = this.pageTypeCurr == "loadingListDetail" ? this.$apis.get_order_details : this.$apis.get_plan_details;
        this.$ajax.get(`${url}?id=${this.$route.query.id || ''}&logisticsNo=${this.$route.query.code || '' }`).then(res => {
          this.planId = res.id;
          this.createdPlanData(res);
          //处理 shiper
          this.beShipper = res.beShipper;
          this.ShipperName = res.shipper;
          this.shipperObj = {
            id: res.shipperCompanyId + '-' + res.shipperTelnetId,
            name: this.ShipperName,
            shipperCompanyId: res.shipperCompanyId,
            shipperTelnetId: res.shipperTelnetId
          }
          this.initData = res; //用来初始化数据
          this.logisticsStatus = {
            recived: res.recived,
            supplierRecived: res.supplierRecived,
            status: this.pageTypeCurr == "loadingListDetail" ? res.shipmentStatus : res.logisticsStatus
          };
          this.matchRate(res.currencyExchangeRate);
          this.attachmentList = res.attachment;
          this.fieldDisplay = this.pageTypeCurr=='logisticDraftDetail' ? {} : res.fieldDisplay;
          this.$ajax.post(`${this.$apis.get_payment_list}${res.logisticsNo}/${this.orderType}?moduleCode=LOGISTIC`)
            .then(res => {
              this.createdPaymentData(res)
            })
          this.getSupplier(res.logisticsNo)
        })
      },
      getSupplier(logisticsNo) {
        this.$ajax.get(`${this.$apis.get_supplier}?logisticsNo=${logisticsNo}`).then(res => {
          this.selectArr.supplier = res;
        })
      },
      //获取国家信息
      countryAll() {
        this.$ajax.get(`${this.$apis.country_all}`).then(res => {
          this.$set(this.selectArr, 'country', res);
        })
      },
      createdPlanData(res = this.initData, qrg) {
        this.oldPlanObject = this.$depthClone(res);
        const stringArray = [
          'payment',
          'permitedForTransportation',
          'blType'
        ]
        this.basicInfoArr.forEach(a => {
          a.value = stringArray.includes(a.key) ? res[a.key] : res[a.key];
        })
        this.transportInfoArr.forEach(a => {
          a.value = res[a.key]
        })
        this.shipmentStatus = this.basicInfoArr.find(el => el.key == 'shipmentStatus')&&this.basicInfoArr.find(el => el.key == 'shipmentStatus').value
        //日期信息  
        this.mediatorDate = this.$getDB(this.$db.logistic.dateInfo, [res])
        // 未开船：Undepartured（初始状态，未到实际订舱日期时默认未开船状态）、
        // 已放舱：Release Space，当前置状态是已订舱，发运状态可下拉选择已放舱或已提柜、
        // 已提柜：Pick-up the Empty，当前置状态是已订舱或已放舱，发运状态可下拉选择已提柜、
        // 在传入时  改变某些状态
        let currObj = this.basicInfoArr.find(el => el.key == 'shipmentStatus');
        if (currObj) {
          //初始先禁用 下拉 根据条件 选择性的开启
          currObj.disabled = true;
          let arr = this.$depthClone(this.selectArr.shipmentStatus).map(el => {
            el.disabled = true;
            return el;
          });
          if (currObj.value == 0 || currObj.value == 1) {
            currObj.disabled = false;
            arr = this.$depthClone(arr).map(el => {
              if (el.code == 2 || el.code == 3) {
                el.disabled = false;
              }
              return el;
            });
          } else if (currObj.value == 0 || currObj.value == 1 || currObj.value == 2) {
            currObj.disabled = false;
            arr = this.$depthClone(arr).map(el => {
              if (el.code == 3) {
                el.disabled = false;
              }
              return el;
            });
          }
          this.$set(this.selectArr, 'shipmentStatus', arr);
        }
        this.logisticsNo = res.logisticsNo;
        this.exchangeRateList = res.currencyExchangeRate || [];
        this.remark = res.remark;
        this.containerInfo = (res.containerDetail || []).map(el => {
          el.isModify = false;
          return el
        });
        this.containerinfoMatch = this.$depthClone(res.containerDetail || []).map(el => {
          el.isModify = false;
          return el
        });
        this.feeList = (res.fee ? [res.fee] : []).map(el => {
          el.isModify = false;
          return el
        });
        this.feeListMatch = this.$depthClone(res.fee ? [res.fee] : []).map(el => {
          el.isModify = false;
          return el
        });
        res.product = res.product.map((item, i) => {
          item.vId = this.$getUUID();
          return item;
        });
        this.productList = this.$getDB(this.$db.logistic.productInfo, res.product, (item) => {
          this.shipperArr.push({
            id: item.skuSupplierCompanyId.value + '-' + item.skuSupplierTenantId.value,
            name: item.skuSupplierAbbr.value,
            shipperCompanyId: item.skuSupplierCompanyId.value,
            shipperTelnetId: item.skuSupplierTenantId.value,
          })
        });
        this.shipperArrFun();
        this.productList.forEach((item) => {
          if (item.fieldDisplay.value) {
            if(this.pageTypeCurr!='logisticDraftDetail'){
              _.mapObject(item.fieldDisplay.value, (v, k) => {
                item[k]._style = {
                  background: 'yellow'
                };
                item[k]._mustChecked = true;
              }) 
            }
            item.fieldDisplay.value = null;
          }
        })
      },
      ShipmentStatusChange(e) {
        this.selectProductArr.forEach(a => {
          this.productList.forEach((item, index) => {
            if (item.vId.value == a.vId.value) {
              let ShipmentStatusItem = this.selectArr.shipmentStatus && this.selectArr.shipmentStatus.find(item =>
                item.code == e)
              this.$set(this.productList[index].shipmentStatus, 'value', ShipmentStatusItem ?
                ShipmentStatusItem.name : '')
            }
          })
        })
      },
      batchDunning() {
        let argArr = [];
        this.paymentList.forEach((item) => {
          argArr.push({
            'id': item.id,
            'version': item.version
          })
        });
        let seconds = 60;
        this.dunningDisabled = true;
        this.batchDunningCutDown = seconds + 's ';
        this.CutDown = setInterval(() => {
          --seconds;
          this.batchDunningCutDown = seconds + 's ';
          if (seconds <= 0) {
            this.batchDunningCutDown = '';
            this.dunningDisabled = false;
            clearInterval(this.CutDown)
          }
        }, 1000)
        this.$ajax.post(
          `${this.$apis.logistics_payment_batchDunning}/${this.logisticsNo}/${this.orderType}?moduleCode=LOGISTIC`).then(
          res => {
            this.$message({
              type: 'success',
              message: this.$i.logistic.operationSuccess
            })
            this.$ajax.post(`${this.$apis.get_payment_list}${this.logisticsNo}/${this.orderType}?moduleCode=LOGISTIC`)
              .then(res => {
                this.createdPaymentData(res)
              })
          }).catch(res => {
          this.batchDunningCutDown = '';
          this.dunningDisabled = false;
          clearInterval(this.CutDown)
        })
      },
      createdPaymentData(res = this.oldPaymentObject, dunning) {
        this.oldPaymentObject = JSON.parse(JSON.stringify(res))
        this.paymentList = res.datas
        this.dunningDisabled = true;
        if(this.paymentList.length>0&&this.beShipper==1){
          this.dunningDisabled = false;
        }
        this.paymentSum = res.statisticsDatas[0]
      },
      getNewLogisticsNo() {
        let url = this.pageTypeCurr == "loadingListDetail" ? this.$apis.get_new_logistics_orderNo : this.$apis.get_new_logistics_no;
        this.$ajax.post(url).then(res => {
          this.basicInfoArr.find(a => a.key === 'logisticsNo').value = res
          this.getSupplier(res)
        })
      },
      getDictionary() {
        this.$ajax.get(this.$apis.get_currency).then(res => {
          this.$set(this.selectArr, 'exchangeCurrency', res)
        })
        this.$ajax.get(this.$apis.get_container_type).then(res => {
          this.$set(this.selectArr, 'containerType', res)
        })
        this.getDictionaryPart()
      },
      getDictionaryPart() {
        this.$set(this.dictionaryPart, 'logisticsStatus', this.pageTypeCurr == "loadingListDetail" ? 'LS_STATUS' :'LS_PLAN');
        this.$set(this.dictionaryPart, 'shipmentStatus', this.pageTypeCurr == "loadingListDetail" ? 'LS_ORDER_SHIP_STATUS' :'LOGISTICS_SHIP_STATUS');
        const params = _.map(this.dictionaryPart, v => v)
        this.$ajax.post(this.$apis.get_dictionary, params).then(res => {
          _.mapObject(this.dictionaryPart, (v, k) => {
            this.$set(this.selectArr, k, res.find(a => a.code === v).codes);
          })
          this.pageInit();
        }).catch(() => {
          this.pageInit();
        })
      },
      handleSelectionContainer(selectArray) {
        this.selectionContainer = selectArray
      },
      deleteContainer() {
        if (!this.selectionContainer.length) return
        this.$confirm(this.$i.logistic.isConfirmPeration, this.$i.logistic.tips, {
          confirmButtonText: this.$i.logistic.confirm,
          cancelButtonText: this.$i.logistic.cancel,
          type: 'warning'
        }).then(() => {
          this.oldPlanObject.rmContainerDetail = this.selectionContainer.map((item) => {
            return item.id;
          })
          this.containerInfo = _.difference(this.containerInfo, this.selectionContainer);
          this.containerinfoMatch = this.$depthClone(_.difference(this.containerInfo, this.selectionContainer));
          this.$message({
            type: 'success',
            message: this.$i.logistic.operationSuccess
          })
        })
      },
      computeType(key) {
        return basicInfoInput.includes(key) ? 'input' : basicInfoDate.includes(key) ? 'date' : 'selector'
      },
      arrayAppend(arrKey) {
        this[arrKey].push({})
      },
      arraySplite(array, index) {
        array.splice(index, 1);
      },
      action(e, status, i) {
        if (status == 3) {
          return this.$windowOpen({
            url: '/product/detail',
            params: {
              id: e.skuId.value
            }
          })
        } else if (status == 4) {
          let newAddArr = this.$depthClone(this.productList[i]);
          newAddArr.id.value = null;
          newAddArr.fieldDisplay.value = null;
          newAddArr.vId.value = this.$getUUID();
          newAddArr = _.mapObject(newAddArr, (v, k) => {
            if (v._style) {
              delete v._style
            }
            return v;
          })
          this.productList.splice(i + 1, 0, newAddArr);
          return;
        }
        this.productInfoModifyStatus = status
        this.showProductDialog = true
        this.modefiyProductIndex = i
        this.modefiyProductIndexArr.push(i);
        this.getProductHistory(e.id ? (e.argID ? e.argID.value : e.id.value) : null, status, i)
      },
      getProductHistory(productId, status, i) {
        let currentProduct = JSON.parse(JSON.stringify(this.productList[i]))
        currentProduct = _.mapObject(currentProduct, (v, k) => {
          if ('_option' in v) {
            switch (k) {
              case 'shipmentStatus':
                v._option = this.selectArr.shipmentStatus;
                if (this.pageTypeCurr == 'loadingListDetail') {
                  delete v._disabled;
                }
                break;
              case 'containerNo':
                v._option = this.containerInfo;
                break;
              default:
                break;
            }
          }
          return v;
        });
        let url = this.pageTypeCurr == 'loadingListDetail' ? 'get_product_order_history' : 'get_product_history';
        if (productId) {
          if (status == 1) {
            this.productModifyList = [currentProduct];
            this.$refs.HM.init(this.productModifyList, []);
          } else {
            this.$ajax.get(`${this.$apis[url]}?productId=${productId}`).then(res => {
              this.productModifyList = this.$getDB(this.$db.logistic.productModify, res.history.map(el => {
                el.entryDt = this.$dateFormat(el.entryDt, 'yyyy-mm-dd hh:mm:ss')
                return el;
              }));
              this.$refs.HM.init(this.productModifyList, [], false);
            })
          }
        } else {
          this.productModifyList = [currentProduct];
          this.$refs.HM.init(this.productModifyList, []);
        }
      },
      addPayment() {
        const obj = this.basicInfoArr.find(a => a.key === 'exchangeCurrency')
        this.$ajax.post(this.$apis.get_payment_no).then(res => this.paymentList.push({
          edit: true,
          no: res,
          status: 20,
          currencyCode: obj.value || null
        }))
      },
      savePayment(i) {
        const currencyCode = this.paymentList[i].currencyCode
        const payToCompanyId = this.paymentList[i].payToCompanyId
        const skuSupplierObj = this.selectArr.supplier.find(a => a.companyId === payToCompanyId)
        const paymentData = {
          ..._.extend({
            name: null,
            actualPayAmount: null,
            planPayAmount: null,
            actualPayDt: null,
            planPayDt: null,
          }, this.paymentList[i]),
          currency: this.selectArr.exchangeCurrency.find(a => a.code === currencyCode).id,
          currencyCode,
          orderNo: this.oldPlanObject.logisticsNo,
          orderType: this.orderType,
          payToCompanyId,
          payToCompanyName: skuSupplierObj ? skuSupplierObj.skuSupplierName : null,
          type: 10
        }
        const url = paymentData.id ? this.$apis.update_plan_payment : this.$apis.save_plan_payment
        if (this.$validateForm(paymentData, this.$db.logistic.payMentInfo)) {
          return;
        }
        this.$ajax.post(url, paymentData).then(res => {
          this.paymentList[i] = res
          this.updatePaymentWithView({
            i,
            edit: false
          })
        })
      },
      updatePaymentWithView({
        i,
        edit,
        status
      }) {
        const obj = {
          ...this.paymentList[i],
          edit,
          status: status || this.paymentList[i].status
        }
        this.$set(this.paymentList, i, obj)
      },
      changeChecked(arr) {
        this.ProductFromOrderChecked = arr;
      },
      //处理 动态增加 产品时 的下拉取值 
      shipperArrFun(arg) {
        let arr = [];
        this.productList.forEach(item => {
          arr.push({
            id: item.skuSupplierCompanyId.value + '-' + item.skuSupplierTenantId.value,
            name: item.skuSupplierAbbr.value,
            shipperCompanyId: item.skuSupplierCompanyId.value,
            shipperTelnetId: item.skuSupplierTenantId.value,
          })
        });

        //利用对象属性唯一性 去除 相同的供应商 让下拉只会存在唯一的供应商
        var obj = {};
        arr = arr.reduce(function (item, next) {
          obj[next.id] ? '' : obj[next.id] = true && item.push(next);
          return item;
        }, []);

        //处理如果删掉下拉已选中的选项是默认选择第一个
        if(arg=='remove'){
          this.shipperObj = arr.length ? arr[0] : {
            name: null,
            shipperCompanyId: null,
            shipperTelnetId: null
          };
        }
        this.shipperArr = arr;
      },
      closeAddProduct() {
        let CheckedIdArr = this.ProductFromOrderChecked ? this.ProductFromOrderChecked.map(el => {
          return {
            id: el.id.value,
            _disabled: el._disabled
          };
        }) : [];
        let arr = CheckedIdArr ? CheckedIdArr.map(el => {
          let obj = _.findWhere(this.ProductFromOrderRes, {
            id: el.id
          });
          obj._disabled = el._disabled;
          return obj;
        }) : [];

        this.showAddProductDialog = false
        arr = _.filter(arr, el => {
          return !el._disabled;
        })

        const selectArrData = this.$depthClone(arr);
        if (!arr.length || !selectArrData.length) return
        selectArrData.forEach(a => {
          let sliceStr = this.selectArr.skuIncoterm.find(item => item.code == a.skuIncoterm).name;
          sliceStr = sliceStr.slice(0, 1) + sliceStr.slice(1 - sliceStr.length).toLowerCase();
          a.id = null
          a.vId = this.$getUUID();
          a.blSkuName = null
          a.hsCode = null
          a.toShipCartonQty = null
          a.toShipQty = null
          a.reportElement = null
          a.factorySkuCode = null
          a.unitExportPrice = a['sku' + sliceStr + 'Price']
          a.totalExportPrice = a.skuPrice || 0;
          a.currency = a['sku' + sliceStr + 'Currency'];
          a.containerNo = null;
          a.containerType = null;
          a.containerId = null;
          a.fieldDisplay = null;
          a.totalContainerQty = null;
          a.totalContainerVolume = null;
          a.totalContainerNetWeight = null;
          a.totalContainerOuterCartonsQty = null;
          a.customDeclarationNameCn = a.skuCustomsNameCn;
          a.customDeclarationNameEn = a.skuCustomsNameEn;
          a.supplierCode = a.skuSupplierCode;
          a.outerCartonBarCode = a.skuOuterCartonBarCode;
          a.shippingMarks = a.skuShippingMarks;
          // !this.modifyProductArray.includes(a) && this.modifyProductArray.push(a)
        })
        this.productList = [...this.$getDB(this.$db.logistic.productInfo, selectArrData), ...this.productList];
        this.shipperArrFun();
        this.ProductFromOrderChecked = [];
      },

      selectProduct(arr) {
        this.selectProductArr = arr;
      },
      removeProduct() {
        this.selectProductArr.forEach(a => {
          this.productList.forEach((item, index) => {
            if (item.vId.value == a.vId.value) {
              this.removeProductList.push(this.productList[index])
              this.productList.splice(index, 1);
            }
          })
        })
        this.shipperArrFun('remove');
      },
      productModifyfun(obj) {
        if (this.pageTypeCurr.slice(-6) == 'Detail') {
          this.prodFieldDisplay = obj;
        }
      },
      closeModify(data) {
        if (!data.length) {
          this.productModifyList = [];
          this.showProductDialog = false;
          return
        };
        const currrentProduct = data[0]
        let obj = _.mapObject(currrentProduct, v => Number(v.value) || v.value)
        if (this.$validateForm(obj, this.$db.logistic.dbProductInfo)) {
          return false;
        }
      },
      closeModifyNext(data) {
        if (!data.length) {
          this.productModifyList = [];
          this.showProductDialog = false;
          return
        };
        const currrentProduct = data[0]
        this.$set(this.productList, this.modefiyProductIndex, currrentProduct)
        this.productList.forEach(item => {
          this.$set(item.fieldDisplay, 'value', null);
        })
        this.modefiyProductIndexArr.forEach((item) => {
          let fieldDisplayObj = {};
          _.mapObject(data[0], (v, k) => {
            if (v._isModified && v.key != 'skuPictures') {
              fieldDisplayObj[v.key] = v.value;
            }
          })
          this.$set(this.productList[item].fieldDisplay, 'value', fieldDisplayObj);
        })
        const id = currrentProduct.id.value
        const vId = this.$getUUID();
        // const index = this.modifyProductArray.indexOf(this.modifyProductArray.find(a => a.id === (id || vId)))
        // index === -1 ? this.modifyProductArray.push(this.restoreObj(currrentProduct)) : (this.modifyProductArray[index] =
        //   this.restoreObj(currrentProduct))
      },
      switchEdit(arg) {
        switch (arg) {
          case 'receive':
            this.logisticsStatus.show = true;
            this.receive();
            break;
          case 'modify':
            this.edit = true;
            break;
          case 'DeliveredEdit':
            this.DeliveredEdit = true;
            break;
          case 'DeliveredEditExit':
            this.DeliveredEdit = false;
            break;
          case 'cancelModify':
            this.edit = false;
            this.createdPlanData();
            break;
          case 'confirm':
            this.conformPlan();
            break;
          case 'generateList':
            this.generateList();
            break;
          case 'download':
            this.download();
            break;
          case 'cancel':
          case 'cancelLoadingList':
            this.$confirm(this.$i.logistic.isConfirmPeration, this.$i.logistic.tips, {
              confirmButtonText: this.$i.logistic.confirm,
              cancelButtonText: this.$i.logistic.cancel,
              type: 'warning'
            }).then(() => {
              this.cancelLoadingList();
            })
            break;
          case 'refuse':
            this.refuse();
            break;
          default:
            break;
        }
      },
      download() {
        let code;
        if (this.pageTypeCurr == "loadingListDetail") {
          code = 'LOGISTICS_ORDER';
        } else {
          code = 'LOGISTICS_PLAN';
        }
        this.$fetch.export_task(code, {
          ids: [this.planId],
          planStatus: this.planStatus,
          archive:0
        })
      },
      refuse() {
        this.$ajax.post(this.$apis.logistics_plan_cancelByIds, {
          ids: [this.planId]
        }).then(res => {
          this.$message({
            message: this.$i.logistic.jumping,
            type: 'success',
            duration: 3000,
            onClose: () => {
              this.$router.push('/logistic/' + (this.pageTypeCurr == "loadingListDetail" ? 'loadingList' : ''));
            }
          })
        })
      },
      cancelLoadingList() {
        let url = this.pageTypeCurr == 'loadingListDetail' ? 'logistics_order_cancelByIds' :
          'logistics_plan_cancelByIds';
        this.$ajax.post(this.$apis[url], {
          ids: [this.planId]
        }).then(res => {
          this.$message({
            message: this.$i.logistic.jumping,
            type: 'success',
            duration: 3000,
            onClose: () => {
              this.$router.push('/logistic/' + (this.pageTypeCurr == "loadingListDetail" ? 'loadingList' : ''));
            }
          })
        })
      },
      receive() {
        this.$ajax.post(this.$apis.logistics_plan_receive, {
          id: this.planId
        }).then(res => {
          this.getDetails();
        })
      },
      generateList() {

        if (this.oldPlanObject.containerDetail && this.oldPlanObject.containerDetail.map(el => {
            return this.$validateForm(el, this.$db.logistic.dbcontainerInfo);
          }).some(el => el)) {
          return
        }

        this.$ajax.post(this.$apis.logistics_plan_postLoadingList, {
          id: this.planId
        }).then(res => {
          this.getDetails();
          this.$windowOpen({
            url: '/logistic/loadingListDetail',
            params: {
              code: this.logisticsNo
            }
          });
        })
      },
      conformPlan() {
        this.$ajax.post(this.$apis.logistics_plan_confirm, {
          id: this.planId
        }).then(res => {
          this.getDetails();
        })
      },
      toExit() {
        if (this.pageTypeCurr.slice(-6) == 'Detail') {
          return this.$router.go(-1)
        }
        this.edit = !this.edit
        this.createdPlanData()
        this.createdPaymentData()
      },
      restoreObj(obj) {
        return _.mapObject(obj, v => (v = v.value))
      },
      restoreArr(arr) {
        return arr.map(a => {
          return _.mapObject(a, v => (v = v.value))
          // const obj = {}
          // _.mapObject(a, (value, key) => {
          //   obj[key] = value.value
          // })
          // return obj
        })
      },
      hightLightModifyFun(v, name) {
        this.hightLightObj[name] = v;
        let obj = {};
        _.mapObject(this.hightLightObj, (v, k) => {
          Object.assign(obj, v);
        })
        this.oldPlanObject.fieldDisplay = {...obj,...this.oldPlanObject.fieldDisplay};
      },
      feeInfoLight(data) {
        this.oldPlanObject.fee = data[0];
      },
      ContainerInfoLight(data) {
        this.oldPlanObject.containerDetail = data;
      },
      changeShipmentStatus(status) {
        if(status!=this.shipmentStatus){
          this.oldPlanObject.fieldDisplay = {...{shipmentStatus:status},...this.oldPlanObject.fieldDisplay};
        }
        this.basicInfoArr.find(el => el.key == 'shipmentStatus').value = status;
      },
      sendData(keyString) {
        this.$confirm(this.$i.logistic.isConfirmPeration, this.$i.logistic.tips, {
          confirmButtonText: this.$i.logistic.confirm,
          cancelButtonText: this.$i.logistic.cancel,
          type: 'warning'
        }).then(() => {
          let url = this.pageTypeCurr == "loadingListDetail" ? this.$apis.update_logistic_order : this.configUrl[
              this.pageName]
            [keyString];
          this.basicInfoArr.forEach(a => {
            this.$set(this.basicInfoObj, a.key, a.value)
          })

          this.transportInfoArr.forEach(a => {
            this.$set(this.transportInfoObj, a.key, a.value)
          })

          _.mapObject(this.mediatorDate[0], (value, key) => {
            this.oldPlanObject[key] = value.value
          })
          //判断 ContainerInfo 是否修改过高亮 以便不传后台返回的修改值
          this.oldPlanObject.containerDetail = this.oldPlanObject.containerDetail && this.$depthClone(this.oldPlanObject
            .containerDetail).map(el => {
            if (!el.isModify && 'fieldDisplay' in el) {
              el.fieldDisplay = null;
            }
            return el;
          });

          //判断 feeInfo 是否修改过高亮 以便不传后台返回的修改值
          this.oldPlanObject.fee = this.oldPlanObject.fee && this.$depthClone([this.oldPlanObject.fee]).map(el => {
            if (!el.isModify && 'fieldDisplay' in el) {
              el.fieldDisplay = null;
            }
            return el;
          })[0];

          this.oldPlanObject.remark = this.remark
          _.mapObject(this.basicInfoObj, (value, key) => {
            this.oldPlanObject[key] = value
          })
          _.mapObject(this.transportInfoObj, (value, key) => {
            this.oldPlanObject[key] = value
          })
          this.oldPlanObject.attachment = this.$refs.attachment.getFiles();
          // this.oldPlanObject.product = this.modifyProductArray;
          this.oldPlanObject.currencyExchangeRate = _.map(this.$depthClone(this.ExchangeRateInfoArr), (item) => {
            item['price'] = item['value'];
            delete item['value'];
            delete item['key'];
            delete item['label'];
            return item;
          });
          this.oldPlanObject.rmProduct = this.removeProductList.map(a => {
            const obj = {}
            _.mapObject(a, (value, key) => {
              obj[key] = value.value
            })
            return obj
          })
          // this.oldPlanObject.product = this.restoreArr(this.removeProductList)
          this.oldPlanObject.product = this.productList.map((item, i) => {
            return _.mapObject(item, (v, k) => {
              if (v.typeSlef == 'text') {
                let ShipmentStatusItem = this.selectArr.shipmentStatus && this.selectArr.shipmentStatus.find(
                  el =>
                  el.name == v.value)
                if (ShipmentStatusItem) {
                  return ShipmentStatusItem.code;
                } else {
                  return v.value;
                }
              } else {
                return null;
              }
            })
          });
          if (this.isParams) {
            this.oldPlanObject.fieldDisplay = null;
          }
          if (this.$validateForm(this.oldPlanObject, this.$db.logistic.basicInfoObj)) {
            return;
          }
          if (this.$validateForm(this.oldPlanObject, this.$db.logistic.transportInfoObj)) {
            return;
          }
          if (this.$validateForm(this.shipperObj, this.$db.logistic.validateShipperObj)) {
            return;
          }
          //为了做shiper 的特殊处理
          this.oldPlanObject.shipper = this.shipperObj.name;
          this.oldPlanObject.shipperCompanyId = this.shipperObj.shipperCompanyId;
          this.oldPlanObject.shipperTelnetId = this.shipperObj.shipperTelnetId;

          this.$ajax.post(url, this.oldPlanObject).then(res => {
            this.$message({
              message: this.$i.logistic.operationSuccess,
              type: 'success',
              duration: 3000,
              onClose: () => {
                this.edit = false;
                this.DeliveredEdit = false;
                this.getDetails();
                // this.$router.push('/logistic/' + (this.pageTypeCurr == "loadingListDetail" ? 'loadingList' : ''));
              }
            })
          })
        })
      },
      formListSelectChange(v) {
        this.$set(this.oldPlanObject, 'currency', v);
      },
    },
    watch: {
      containerinfoMatch: {
        handler: function (val) {
          val.forEach(el => {
            this.productList = this.productList.map((item, i) => {
              if (el.id == item.containerId.value) {
                item.containerNo._value = el.containerNo;
                item.containerNo.value = el.containerNo;
              }
              return item;
            })
          })
        },
        deep: true
      },
      edit(v){
        if(v){
          this.productList = this.productList.map(el=>{
            el._disabled = true;
            return el;
          })
          if(this.beShipper==1){
            if(this.$route.name=='loadingListDetail'){
              this.isShow = false;
            }else{
              //当供应商为shiper时 可以看到全部产品 但是只能改自己的产品
              this.productList = this.productList.map(el=>{
                if(el.skuSupplierCompanyId.value == this.oldPlanObject.shipperCompanyId && el.skuSupplierTenantId.value == this.oldPlanObject.shipperTelnetId){
                  delete el._disabled;
                }
                return el;
              })
              this.isShow = true;  
            }
          }else{
            //当供应商不为shiper时 只能看到且只能改自己的产品
            this.productList = this.productList.map(el=>{
              delete el._disabled;
              return el;
            })
            this.isShow = false;
          }
        }else{
          this.isShow = false;
        }
      },
      beShipper(v){
        let flag = false;
        if(v==1){
          if(this.$route.name=='loadingListDetail'){
            flag = true;
          }else{
           flag = false;  
          }
        }else{
          flag = true;
        }
        this.dunningDisabled = flag;
      }
    },
    destroyed() {
      clearInterval(this.CutDown)
    }
  }

</script>
<style lang="less" scoped>
  .place-logistic-plan {
    margin-top: 20px;
    position: relative;
    padding-bottom: 80px;
    .hd-top {
      font-size: 18px;
      color: #666;
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #ccc;
      padding: 0 15px;
    }
    .hd {
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #ccc;
      padding: 0 15px;
      font-weight: bold;
      &.active {
        border: none;
      }
    }
    .input-item {
      display: flex;
      align-items: center;
      padding: 10px 0;
      span {
        width: 180px;
        display: inline-block;
        font-size: 12px;
        text-align: right;
        padding-right: 10px;
        box-sizing: border-box;
        font-weight: bold;
        color: #777;
      } // .el-select, .el-input {
      //   flex:1;
      // }
    }
    .product-header {
      margin-bottom: 20px;
    }
    /deep/.definedStyleClass textarea {
      background: yellow;
    }
  }

</style>
