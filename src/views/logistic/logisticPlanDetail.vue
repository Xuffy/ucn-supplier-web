<template>
  <div class="place-logistic-plan">
    <div class="hd-top" v-if="pageTypeCurr=='logisticPlanDetail'">{{ $i.logistic.logisticPlan + ' ' + logisticsNo}}</div>
    <div class="hd-top" v-if="pageTypeCurr=='loadingListDetail'">{{ $i.logistic.loadingList + ' ' + logisticsNo}}</div>
    <form-list :DeliveredEdit="DeliveredEdit" name="BasicInfo" :fieldDisplay="fieldDisplay" :showHd="false" @selectChange="formListSelectChange"
      @hightLightModifyFun="hightLightModifyFun" :edit="edit" :listData.sync="basicInfoArr" :selectArr="selectArr" :title="$i.logistic.basicInfoTitle"
    />
    <el-row :gutter="10">
      <!-- <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24"> -->
      <div class="input-item">
        <span>{{ $i.logistic.remark }}:</span>
        <el-input @change="hightLightModifyFun({remark:remark},'remark')" :class="[{definedStyleClass : fieldDisplay&&fieldDisplay.hasOwnProperty('remark')},'el-input']"
          type="textarea" resize="none" :autosize="{ minRows: 3 }" placeholder="请输入内容" v-model="remark" v-if="edit"></el-input>
        <p v-else :style="fieldDisplay&&fieldDisplay.hasOwnProperty('remark') ? {
            'background': 'yellow',
            'padding':'5px'
          } : ''">{{ remark }}</p>
      </div>
      <!-- </el-col> -->
      <div class="input-item">
        <span>{{ $i.logistic.attachment }}:</span>
        <attachment accept="all" ref="attachment" :readonly="attachmentReadonly" :list="attachmentList" :title="$i.logistic.attachment"
          :limit="20" :edit="edit" />
      </div>

      <!-- <one-line :edit="edit" :list="exchangeRateList" :title="$i.logistic.exchangeRate"/> -->
    </el-row>
    <form-list :DeliveredEdit="DeliveredEdit" :listData="ExchangeRateInfoArr" :edit="edit" :title="$i.logistic.ExchangeRateInfoTitle"
    />
    <form-list :DeliveredEdit="DeliveredEdit" name="TransportInfo" :fieldDisplay="fieldDisplay" @hightLightModifyFun="hightLightModifyFun"
      :listData="transportInfoArr" :edit="edit" :title="$i.logistic.transportInfoTitle" />
    <div>
      <div class="hd"></div>
      <div class="hd active">{{ $i.logistic.containerInfoTitle }}</div>
      <container-info :matchData="containerinfoMatch" :tableData.sync="containerInfo" :currencyCode="oldPlanObject.currency" :ExchangeRateInfoArr="ExchangeRateInfoArr"
        @arrayAppend="arrayAppend" @handleSelectionChange="handleSelectionContainer" @deleteContainer="deleteContainer" :edit="edit"
        :containerType="selectArr.containerType" 
        @ContainerInfoLight="ContainerInfoLight"/>
    </div>

    <!-- <div v-if="planId && feeList"> -->
    <div v-if="pageTypeCurr.slice(-6) == 'Detail'">
      <div class="hd"></div>
      <div class="hd active">{{ $i.logistic.feeInfoTitle }}</div>
      <fee-info :edit="edit" :tableData.sync="feeList" :selectArr="selectArr" @feeInfoLight="feeInfoLight"></fee-info>
    </div>

    <div v-if="pageTypeCurr.slice(-6) == 'Detail'">
      <div class="hd"></div>
      <div class="hd active">{{ $i.logistic.paymentTitle }}</div>
      <div class="hd active">
        <el-button v-authorize="auth[pageTypeCurr].PRESS_FOR_PAYMENT||''" type="primary" size="mini" :disabled="dunningDisabled" @click.stop="batchDunning">{{ batchDunningCutDown + $i.logistic.Dept }}</el-button>
      </div>
      <payment ref="payment" v-authorize="auth[pageTypeCurr].payment||''" :tableData.sync="paymentList" :ExchangeRateInfoArr="ExchangeRateInfoArr" :edit="edit" :paymentSum="paymentSum"
        @addPayment="addPayment" @savePayment="savePayment" :selectArr="selectArr" @updatePaymentWithView="updatePaymentWithView"
        :currencyCode="oldPlanObject.currency" />
    </div>
    <div>
      <div class="hd"></div>
      <div class="hd active">{{ $i.logistic.productInfoTitle }}</div>
      <!-- <v-table :data.sync="productList" @action="action" :buttons="edit ? productbButtons : null" @change-checked="selectProduct"> -->
      <v-table ref="productInfo" code="ulogistics_PlanDetail" :totalRow="productListTotal" :data="productList" @action="action" :buttons="productbButtons"
        @change-checked="selectProduct"
        native-sort="orderNo"
        @change-sort="$refs.productInfo.setSort(productList)">
        <div slot="header" class="product-header">
          <el-button v-if="edit" type="primary" size="mini" @click.stop="getSupplierIds">{{ $i.logistic.addProduct }}</el-button>
          <el-button v-if="edit" v-authorize="auth[pageTypeCurr].PRODUCT_INFO_DELETE||''" type="danger" size="mini" @click.stop="removeProduct">{{ $i.logistic.remove }}</el-button>
          <label v-if="(edit||DeliveredEdit)&&pageTypeCurr=='loadingListDetail'">{{ $i.logistic.shipmentStatus}} :</label>
          <el-select v-if="(edit||DeliveredEdit)&&pageTypeCurr=='loadingListDetail'" v-model="ShipmentStatusCode" placeholder="请选择"
            @change="ShipmentStatusChange">
            <el-option v-for="item in selectArr.ShipmentStatus" :key="item.code" :label="item.name" :value="item.code">
            </el-option>
          </el-select>
        </div>
      </v-table>
    </div>
    <el-dialog  width="70%" :visible.sync="showAddProductDialog" :close-on-click-modal="false" :close-on-press-escape="false">
      <overviewPage
        :title="$i.logistic.addProductFromOrder"
        :tableData="ProductFromOrder"
        :form-column="$db.logistic.addProductFromOrderFilter"
        :tableButtons="[{label: 'Detail', type: 1}]"
        @change-checked="changeChecked"
        @tableBtnClick="ProductFromOrderDetail"
        @search="getSupplierIds"
        tableCode="ulogistics_PlanDetail"
        @change-sort="changeSort">
        <v-pagination slot="pagination" :page-data="pageParams"/>
        <div slot=footerBtn>
          <el-button @click="showAddProductDialog = false">{{ $i.logistic.cancel }}</el-button>
          <el-button type="primary" @click="closeAddProduct">{{ $i.logistic.confirm }}</el-button>
        </div>
      </overviewPage>
    </el-dialog>
    <messageBoard v-if="!isParams" module="logistic" :code="pageTypeCurr" :id="logisticsNo"></messageBoard>
    <btns :DeliveredEdit="DeliveredEdit" :edit="edit" @switchEdit="switchEdit" @toExit="toExit" :logisticsStatus="logisticsStatus"
      @sendData="sendData" />
    <v-history-modify code="ulogistics_PlanDetail" 
    ref="HM" disabled-remark 
    :beforeSave="closeModify" 
    @save="closeModifyNext" 
    @select-change="historymodify"
    @closed="$refs.productInfo.update()"
    ></v-history-modify>
  </div>
</template>
<script>
  import {
    containerInfo,
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
  import attachment from '@/components/common/upload/index';
  import messageBoard from '@/components/common/messageBoard/index';
  import formList from '@/views/logistic/children/formList'
  import feeInfo from '@/views/logistic/children/feeInfo'
  import payment from '@/views/logistic/children/payment'
  import btns from '@/views/logistic/children/btns'

  export default {
    name: 'logisticPlanDetail',
    data() {
      return {
        planId: '',
        ShipmentStatusCode: '',
        pageParams: {
          pn: 1,
          ps: 10
        },
        DeliveredEdit: false,
        dunningDisabled: false,
        modefiyProductIndex: 0,
        modefiyProductIndexArr: [],
        selectProductArr: [],
        attachmentList: [],
        logisticsStatus: {},
        fieldDisplay: {},
        hightLightObj: {},
        logisticsNo: '',
        remark: '',
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
        productList: [],
        removeProductList: [],
        productModifyList: [],
        paymentList: [],
        containerInfo: [],
        containerinfoMatch: [],
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
        auth:{
          logisticPlanDetail: {
            payment:'LOGISTICS:PLAN_DETAIL:PAYMENT',
            PRESS_FOR_PAYMENT:'LOGISTICS:PLAN_DETAIL:PRESS_FOR_PAYMENT',
            PRODUCT_INFO_DELETE:'LOGISTICS:PLAN_DETAIL:PRODUCT_INFO_DELETE'
          },
          loadingListDetail: {
            PRESS_FOR_PAYMENT:'LLOADING_LIST:DETAIL:PRESS_FOR_PAYMENT',
            payment:'LOADING_LIST:DETAIL:PAYMENT'
          }
        },
        dictionaryPart: {
          avl: 'AVL',
          blType: 'BL_TYPE',
          logisticsStatus: 'LS_PLAN',
          transportationWay: 'MD_TN',
          payment: 'PMT',
          skuIncoterm: 'ITM',
          ShipmentStatus: 'SKU_LOGISTICS_STATUS'
        },
        configUrl: {
          placeLogisticPlan: {
            saveAsDraft: this.$apis.save_draft_logistic_plan,
            send: this.$apis.send_logistic_plan
          },
          loadingListDetail: {
            send: this.$apis.update_logistic_plan
          },
          planDetail: {
            send: this.$apis.update_logistic_plan
          },
          planDraftDetail: {
            saveAsDraft: this.$apis.save_draft_logistic_plan,
            send: this.$apis.send_draft_logistic_plan
          }
        },
        pageName: '',
        prodFieldDisplay: {},
        batchDunningCutDown: '',
        CutDown: null,
        isfeeInfoLight:false,
        ProductFromOrder:[],
        ProductFromOrderRes:[],
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
      attachmentReadonly() {
        return !this.edit;
      },
      pageTypeCurr() {
        return this.$route.name;
      },
      isParams() {
        return _.isEmpty(this.$route.query)
      },
      productbButtons() {
        let aArr = [{
            label: 'Negociate',
            type: 1,
            disabled: !this.edit
          },
          {
            label: 'Copy',
            type: 4,
            disabled: !this.edit
          },
          {
            label: 'Detail',
            type: 3
          }
        ]
        this.$route.name == 'placeLogisticPlan' ? aArr : aArr.splice(1, 0, {
          label: 'History',
          type: 2,
          disabled: !this.edit
        })
        return aArr;
      }
    },
    mounted() {
      let menuList = [{
        path: '',
        query: {code: this.pageTypeCurr&&this.pageTypeCurr=="loadingListDetail" ? 'BIZ_LOGISTIC_ORDER' : 'BIZ_LOGISTIC_PLAN'},
        type: 100,
        auth: (()=>{ 
          let code = null;
          if(this.pageTypeCurr=="logisticPlanDetail"){
            code = 'LOGISTICS:LOG';
          }else if(this.pageTypeCurr=="loadingListDetail"){
            code = 'LOADING_LIST:LOG';
          }
          return code
        })(),
        label: this.$i.common.log
      }];
      if(this.pageTypeCurr=="logisticPlanDetail"){
        menuList.push(
          {
            path: '/logistic/archivePlan',
            auth: 'LOGISTICS:PLAN_DETAIL:ARCHIVE',
            label: this.$i.logistic.archivePlan
          }
        )
      }else if(this.pageTypeCurr=="loadingListDetail"){
        menuList.push(
          {
            path: '/logistic/archiveLoadingList',
            auth: 'LOADING_LIST:DETAIL:ARCHIVE',
            label: this.$i.logistic.archiveLoadingList
          }
        )
      }
      this.setMenuLink(menuList);
      const arr = this.$route.fullPath.split('/')
      this.pageName = arr[arr.length - 1].split('?')[0]
      this.getDictionary()
      this.basicInfoArr = _.map(this.$db.logistic.basicInfoObj, (value, key) => {
        return value;
      })
      this.ExchangeRateInfoArr = _.map(this.$db.logistic.ExchangeRateInfo, (value, key) => {
        return value;
      })
      this.transportInfoArr = _.map(this.$db.logistic.transportInfoObj, (value, key) => {
        return value;
      })
    },
    methods: {
      ...mapActions(['setMenuLink']),
      //初始页面数据
      pageInit() {
        if (this.pageTypeCurr.slice(-6) == 'Detail') {
          this.getDetails();
        } else {
          this.edit = true
          this.basicInfoArr.forEach((item) => {
            this.$set(item, 'value', item.defaultVal);
          })
          this.transportInfoArr.forEach((item) => {
            this.$set(item, 'value', item.defaultVal);
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
      changeSort(arr){
        this.$set(this.pageParams,'sorts',arr.sorts);
        this.getSupplierIds();
      },
      getSupplierIds(arg) {
        this.pageParams = {...this.pageParams, ...arg}
        let url = this.$route.name == 'loadingListDetail' ? 'logistics_order_getSupplierIds' : 'logistics_plan_getSupplierIds';
        this.$ajax.get(this.$apis[url],{logisticsNo:this.basicInfoArr[0].value}).then(res => {
          this.pageParams.skuSupplierIds = res.supplierIds;
          this.pageParams.customerId = res.customerId;
          this.addProductFromOrder();
        })
      },
      ProductFromOrderDetail(e){
        this.$windowOpen({url:'/product/detail',params:{id:e.skuId.value}})
      },
      addProductFromOrder(){
        this.$ajax.post(this.$apis.get_order_list_with_page, this.pageParams).then(res=>{
          this.showAddProductDialog = true;
          this.ProductFromOrderRes = res.datas;
          this.ProductFromOrder = this.$getDB(this.$db.logistic.dbBasicInfoObj,res.datas);
          this.$nextTick(()=>{
            this.$set(this.pageParams,'pn',res.pn);
            this.$set(this.pageParams,'ps',res.ps);
            this.$set(this.pageParams,'tc',res.tc);
          })
        })
      },
      getDetails() {
        let url = this.pageTypeCurr == "loadingListDetail" ? this.$apis.get_order_details : this.$apis.get_plan_details;
        this.$ajax.get(`${url}?id=${this.$route.query.id || ''}&logisticsNo=${this.$route.query.code || '' }`).then(res => {
          this.planId = res.id;
          this.createdPlanData(res);
          this.logisticsStatus = {
            recived: res.recived,
            supplierRecived: res.supplierRecived,
            status: res.logisticsStatus
          };
          this.matchRate(res.currencyExchangeRate);
          this.attachmentList = res.attachment;
          this.fieldDisplay = res.fieldDisplay;
          this.$ajax.post(`${this.$apis.get_payment_list}${res.logisticsNo}/30`).then(res => {
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
      createdPlanData(res = this.oldPlanObject, qrg) {
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
        this.logisticsNo = res.logisticsNo
        this.exchangeRateList = res.currencyExchangeRate || []
        this.remark = res.remark
        this.containerInfo = (res.containerDetail || []).map(el=>{el.isModify=false;return el});
        this.containerinfoMatch = this.$depthClone(res.containerDetail || []).map(el=>{el.isModify=false;return el});
        this.feeList = res.fee && [res.fee];
        res.product = res.product.map((item, i) => {
          item.vId = i;
          return item;
        });
        this.productList = this.$getDB(this.$db.logistic.productInfo, res.product.map(el => {
          let ShipmentStatusItem = this.selectArr.ShipmentStatus && this.selectArr.ShipmentStatus.find(item =>
            item.code == el.shipmentStatus)
          el.shipmentStatus = ShipmentStatusItem ? ShipmentStatusItem.name : '';
          return el;
        }))
        this.productList.forEach((item) => {
          if (item.fieldDisplay.value) {
            _.mapObject(item.fieldDisplay.value, (v, k) => {
              this.$set(item[k], '_style', {
                background: 'yellow'
              })
            })
            item.fieldDisplay.value = null;
          }
        })
      },
      //匹配发运状态 name
      // matchShipmentStatus(){
      //   this.productList.forEach(el=>{
      //     let ShipmentStatusItem = this.selectArr.ShipmentStatus.find(item=> item.code == this.ShipmentStatusCode)
      //     el.shipmentStatus.value = ShipmentStatusItem ? ShipmentStatusItem.name : '';
      //   })
      // },
      ShipmentStatusChange(e) {
        this.selectProductArr.forEach(a => {
          this.productList.forEach((item, index) => {
            if (item.vId.value == a.vId.value) {
              let ShipmentStatusItem = this.selectArr.ShipmentStatus && this.selectArr.ShipmentStatus.find(item =>
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
          if (item.planPayAmount > item.actualPayAmount) {
            argArr.push({
              'id': item.id,
              'version': item.version
            })
          }
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
        this.$ajax.post(`${this.$apis.logistics_payment_batchDunning}`, argArr).then(res => {
          this.$message({
            type: 'success',
            message: '催款成功!'
          })
          this.$ajax.post(`${this.$apis.get_payment_list}${this.logisticsNo}/30`).then(res => {
            this.createdPaymentData(res, 'dunning')
          })
        })
      },
      createdPaymentData(res = this.oldPaymentObject, dunning) {
        this.oldPaymentObject = JSON.parse(JSON.stringify(res))
        this.paymentList = res.datas
        if (!dunning) {
          this.dunningDisabled = !this.paymentList.some((item) => item.planPayAmount > item.actualPayAmount);
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
        this.$set(this.dictionaryPart, 'logisticsStatus', this.pageTypeCurr == "loadingListDetail" ? 'LS_STATUS' :
          'LS_PLAN')
        const params = _.map(this.dictionaryPart, v => v)
        this.$ajax.post(this.$apis.get_dictionary, params).then(res => {
          _.mapObject(this.dictionaryPart, (v, k) => {
            this.$set(this.selectArr, k, res.find(a => a.code === v).codes)
            if (k == "ShipmentStatus") {
              this.selectArr[k].unshift({
                code: "0",
                defaultCode: 0,
                id: 0,
                name: " ",
                remark: "",
                seqNum: "",
                typeCode: "SKU_LOGISTICS_STATUS",
                value: "0"
              })
            }
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
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.oldPlanObject.rmContainerDetail = this.selectionContainer.map((item) => {
            return item.id;
          })
          this.containerInfo = _.difference(this.containerInfo, this.selectionContainer);
          this.containerinfoMatch = this.$depthClone(_.difference(this.containerInfo, this.selectionContainer));
          this.$message({
            type: 'success',
            message: '删除成功!'
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
          return this.$windowOpen({url:'/product/detail',params:{id:e.skuId.value}})
        } else if (status == 4) {
          let newAddArr = this.$depthClone(this.productList[i]);
          newAddArr.id.value = null;
          newAddArr.fieldDisplay.value=null;
          newAddArr = _.mapObject(newAddArr,(v,k)=>{
            if(v._style){
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
      historymodify(currData,row){
        if('correlationKey' in currData){
          let obj = currData._option.find(el=> el.containerNo ==currData.value);
          row.containerId.value = obj ? obj.id : ''; 
          row[currData.correlationKey].value = obj ? obj[currData.correlationKey] : '';
        }
      },
      getProductHistory(productId, status, i) {
        let currentProduct = JSON.parse(JSON.stringify(this.productList[i]))
        currentProduct = _.mapObject(currentProduct,(v,k)=>{
          if('_option' in v){
            switch(k){
              case 'shipmentStatus' :
                v._option = this.selectArr.ShipmentStatus;
                if(this.pageTypeCurr=='loadingListDetail'){
                  delete v._disabled;
                }
                break;
              case 'containerNo' :
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
          if(status==1){
            this.productModifyList = [currentProduct].map(el => {
              let ShipmentStatusItem = this.selectArr.ShipmentStatus && this.selectArr.ShipmentStatus.find(item =>item.name == el.shipmentStatus.value)
              el.shipmentStatus.value = ShipmentStatusItem ? ShipmentStatusItem.name : '';
              return el;
            });
            this.$refs.HM.init(this.productModifyList,[]);
          }else{
            this.$ajax.get(`${this.$apis[url]}?productId=${productId}`).then(res => {
              this.productModifyList = this.$getDB(this.$db.logistic.productModify,res.history.map(el => {
                let ShipmentStatusItem = this.selectArr.ShipmentStatus && this.selectArr.ShipmentStatus.find(item => item.code == el.shipmentStatus)
                el.shipmentStatus = ShipmentStatusItem ? ShipmentStatusItem.name : '';
                el.entryDt = this.$dateFormat(el.entryDt, 'yyyy-mm-dd hh:mm') 
                return el;
              }));
              this.$refs.HM.init(this.productModifyList,[],false);
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
          orderType: 30,
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
      changeChecked(arr){
        this.ProductFromOrderChecked = arr;
      },
      closeAddProduct() {
        let CheckedIdArr =  this.ProductFromOrderChecked.map(el => {
          return el.id.value;
        })
        let arr = CheckedIdArr.map(el=>{
          return _.findWhere(this.ProductFromOrderRes,{id:el})
        });
        this.showAddProductDialog = false
        const selectArrData = this.$depthClone(arr);
        if (!arr.length || !selectArrData.length) return
        selectArrData.forEach(a => {
          let sliceStr = this.selectArr.skuIncoterm.find(item => item.code == a.skuIncoterm).name;
          sliceStr = sliceStr.slice(0, 1) + sliceStr.slice(1 - sliceStr.length).toLowerCase();
          a.id = null
          a.vId = +new Date()
          a.blSkuName = null
          a.hsCode = null
          a.currency = null
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
          a.shipmentStatus = null;
          !this.modifyProductArray.includes(a) && this.modifyProductArray.push(a)
        })
        this.productList = [...this.$getDB(this.$db.logistic.productInfo, selectArrData), ...this.productList]
      },

      selectProduct(arr) {
        this.selectProductArr = arr
        //考虑 选中时也可 变化状态
        //  this.selectProductArr.forEach(a => {
        //   this.productList.forEach((item,index)=>{
        //     if(item.vId.value==a.vId.value){
        //       this.$set(this.productList[index].shipmentStatus,'value',this.ShipmentStatusCode)
        //     }
        //   })
        // })
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
        let ShipmentStatusItem = this.selectArr.ShipmentStatus && this.selectArr.ShipmentStatus.find(item => item.code ==
          currrentProduct.shipmentStatus.value)
        currrentProduct.shipmentStatus.value = ShipmentStatusItem ? ShipmentStatusItem.name : '';
        this.$set(this.productList, this.modefiyProductIndex, currrentProduct)
        this.productList.forEach(item => {
          this.$set(item.fieldDisplay, 'value', null);
        })
        this.modefiyProductIndexArr.forEach((item) => {
          let fieldDisplayObj = {};
          _.mapObject(data[0],(v,k)=>{
            if(v._isModified&&v.key!='skuPictures'){
              fieldDisplayObj[v.key] = v.value;
            }
          })
          this.$set(this.productList[item].fieldDisplay, 'value',fieldDisplayObj);
        })
        const id = currrentProduct.id.value
        const vId = +new Date();
        const index = this.modifyProductArray.indexOf(this.modifyProductArray.find(a => a.id === (id || vId)))
        index === -1 ? this.modifyProductArray.push(this.restoreObj(currrentProduct)) : (this.modifyProductArray[index] =
          this.restoreObj(currrentProduct))
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
      download(){
        let code;
        if(this.pageTypeCurr=="loadingListDetail"){
          code = 'LOGISTICS_ORDER';         
        }else{
          code = 'LOGISTICS_PLAN';
        }
        this.$fetch.export_task(code,{ids:[this.planId],planStatus:this.planStatus})
      },
      refuse() {
        this.$ajax.post(this.$apis.logistics_plan_cancelByIds, {
          ids: [this.planId]
        }).then(res => {
          this.$message({
            message: '操作成功，正在跳转...',
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
            message: '取消成功，正在跳转...',
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
        this.$ajax.post(this.$apis.logistics_plan_postLoadingList, {
          id: this.planId
        }).then(res => {
          this.getDetails();
          this.$windowOpen({url:'/logistic/loadingListDetail',params:{code:this.logisticsNo}});
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
        this.oldPlanObject.fieldDisplay = obj;
      },
      feeInfoLight(data,index){
        this.isfeeInfoLight = true;
        this.oldPlanObject.fee = this.feeList && this.feeList.length > 0 ? this.feeList[0] : null;
        [this.oldPlanObject.fee][index].fieldDisplay=this.$depthClone(data);
      },
      ContainerInfoLight(data){
        this.oldPlanObject.containerDetail =  this.$depthClone(data).map(el=>{
          if(!el.isModify&&'fieldDisplay' in el){
            el.fieldDisplay = {};
          }
          return el;
        });
      },
      sendData(keyString) {
        let url = this.pageTypeCurr == "loadingListDetail" ? this.$apis.update_logistic_order : this.configUrl[this.pageName]
          [keyString];
        this.basicInfoArr.forEach(a => {
          this.$set(this.basicInfoObj, a.key, a.value)
        })

        this.transportInfoArr.forEach(a => {
          this.$set(this.transportInfoObj, a.key, a.value)
        })

        this.oldPlanObject.containerDetail =  this.$depthClone(this.oldPlanObject.containerDetail).map(el=>{
          if(!el.isModify&&'fieldDisplay' in el){
            el.fieldDisplay = {};
          }
          return el;
        });

        this.basicInfoObj.remark = this.remark
        _.mapObject(this.basicInfoObj, (value, key) => {
          this.oldPlanObject[key] = value
        })
        _.mapObject(this.transportInfoObj, (value, key) => {
          this.oldPlanObject[key] = value
        })
        this.oldPlanObject.attachment = this.$refs.attachment.getFiles();
        this.oldPlanObject.product = this.modifyProductArray;
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
              let ShipmentStatusItem = this.selectArr.ShipmentStatus && this.selectArr.ShipmentStatus.find(el =>
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
        //判断 Container Info 是否修改过高亮 以便不传后台返回的修改值
        if(!this.isfeeInfoLight){
          this.oldPlanObject.fee&&[this.oldPlanObject.fee].forEach(el =>{
            el.fieldDisplay = null;
          })
        }
        this.$ajax.post(url, this.oldPlanObject).then(res => {
          this.$message({
            message: '操作成功！',
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
      },
      formListSelectChange(v) {
        this.$set(this.oldPlanObject, 'currency', v);
      }
    },
    watch: {
      containerInfo: {
        handler: function (val) {
          val.forEach(el => {
            this.productList = this.productList.map((item,i) => {
              if (el.id == item.containerId.value) {
                item.containerNo._value = el.containerNo;
                item.containerNo.value = el.containerNo;
              }
              return item;
            })
          })
        },
        deep: true
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
