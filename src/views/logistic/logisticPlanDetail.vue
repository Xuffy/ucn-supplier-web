<template>
  <div class="place-logistic-plan">
    <div class="hd-top" v-if="planId">{{ $i.logistic.loadingList + '    ' + logisticsNo}}</div>
    <div class="hd-top" v-else>{{ $i.logistic.placeNewLogisticPlan }}</div>
    <form-list name="BasicInfo" :fieldDisplay="fieldDisplay" :showHd="false" @selectChange="formListSelectChange" @hightLightModifyFun="hightLightModifyFun" :edit="edit" :listData.sync="basicInfoArr" :selectArr="selectArr" :title="$i.logistic.basicInfoTitle"/>
    <el-row :gutter="10">
       <!-- <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24"> -->
        <div class="input-item">
          <span>{{ $i.logistic.remark }}:</span>
          <el-input class="el-input" type="textarea" resize="none" :autosize="{ minRows: 3 }" placeholder="请输入内容" v-model="remark" v-if="edit"></el-input>
          <p v-else>{{ remark }}</p>
        </div>
      <!-- </el-col> -->
      <div class="input-item">
        <span>{{ $i.logistic.attachment }}:</span>
        <attachment accept="all" ref="attachment" :readonly="attachmentReadonly" :list="attachmentList" :title="$i.logistic.attachment" :limit="20" :edit="edit"/>
      </div>
      
      <!-- <one-line :edit="edit" :list="exchangeRateList" :title="$i.logistic.exchangeRate"/> -->
    </el-row>
    <form-list :listData="ExchangeRateInfoArr" :edit="edit" :title="$i.logistic.ExchangeRateInfoTitle"/>
    <form-list name="TransportInfo" :fieldDisplay="fieldDisplay" @hightLightModifyFun="hightLightModifyFun" :listData="transportInfoArr" :edit="edit" :title="$i.logistic.transportInfoTitle"/>
    <div>
      <div class="hd"></div>
      <div class="hd active">{{ $i.logistic.containerInfoTitle }}</div>
      <container-info :tableData.sync="containerInfo" @arrayAppend="arrayAppend" @handleSelectionChange="handleSelectionContainer" @deleteContainer="deleteContainer" :edit="edit" :containerType="selectArr.containerType"/>
    </div>

    <!-- <div v-if="planId && feeList"> -->
    <div v-if="planId">
      <div class="hd"></div>
      <div class="hd active">{{ $i.logistic.feeInfoTitle }}</div>
      <fee-info :edit="edit" :tableData.sync="feeList" :selectArr="selectArr"></fee-info>
    </div>

    <div v-if="planId">
      <div class="hd"></div>
      <div class="hd active">{{ $i.logistic.paymentTitle }}</div>
      <div class="hd active">
        <el-button type="primary" size="mini" :disabled="dunningDisabled" @click.stop="batchDunning">{{ $i.logistic.Dept }}</el-button>
      </div>
      <payment ref="payment" :tableData.sync="paymentList" :ExchangeRateInfoArr="ExchangeRateInfoArr" :edit="edit" :paymentSum="paymentSum" @addPayment="addPayment" @savePayment="savePayment" :selectArr="selectArr" @updatePaymentWithView="updatePaymentWithView" :currencyCode="oldPlanObject.currency"/>
    </div>
    <div>
      <div class="hd"></div>
      <div class="hd active">{{ $i.logistic.productInfoTitle }}</div>
      <!-- <v-table :data.sync="productList" @action="action" :buttons="edit ? productbButtons : null" @change-checked="selectProduct"> -->
      <v-table code="ulogistics_PlanDetail" :data.sync="productList" @action="action" :buttons="productbButtons" @change-checked="selectProduct">
        <div slot="header" class="product-header" v-if="edit">
          <el-button type="primary" size="mini" @click.stop="showAddProductDialog = true">{{ $i.logistic.addProduct }}</el-button>
          <el-button type="danger" size="mini" @click.stop="removeProduct">{{ $i.logistic.remove }}</el-button>
        </div>
      </v-table>

    </div>
    <el-dialog :title="$i.logistic.negotiate" :visible.sync="showProductDialog" :close-on-click-modal="false" :close-on-press-escape="false" @close="closeModify(0)">
      <product-modify ref="productModifyComponents" @productModifyfun="productModifyfun" :tableData.sync="productModifyList" :productInfoModifyStatus="productInfoModifyStatus"/>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeModify(0)">{{ $i.logistic.cancel }}</el-button>
        <el-button type="primary" @click="closeModify(1)">{{ $i.logistic.confirm }}</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="$i.logistic.addProductFromOrder" :visible.sync="showAddProductDialog" :close-on-click-modal="false" :close-on-press-escape="false" @close="closeAddProduct(0)">
      <add-product ref="addProduct" :basicInfoArr="basicInfoArr"/> 
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeAddProduct(0)">{{ $i.logistic.cancel }}</el-button>
        <el-button type="primary" @click="closeAddProduct(1)">{{ $i.logistic.confirm }}</el-button>
      </div>
    </el-dialog>
    <messageBoard v-if="planId" module="logistic" code="planDetail" :id="planId"></messageBoard>
    <btns :edit="edit" @switchEdit="switchEdit" @toExit="toExit" :logisticsStatus="logisticsStatus" @sendData="sendData" :planId="planId" @createdPlanData="createdPlanData" @createdPaymentData="createdPaymentData"/>
  </div>
</template>
<script>

import { VSimpleTable, containerInfo, selectSearch, VTable} from '@/components/index';
import {mapActions, mapState} from 'vuex';
import attachment from '@/components/common/upload/index';
import messageBoard from '@/components/common/messageBoard/index';
import formList from '@/views/logistic/children/formList'
import oneLine from '@/views/logistic/children/oneLine'
import feeInfo from '@/views/logistic/children/feeInfo'
import payment from '@/views/logistic/children/payment'
import btns from '@/views/logistic/children/btns'
import productModify from '@/views/logistic/children/productModify'
import addProduct from '@/views/logistic/children/addProduct'

// import {basicInfoInput, basicInfoSelector, basicInfoDate, basicInfoObj, transportInfoObj } from '@/database/logistic/plan/staticData'

export default {
  name: 'logisticPlanDetail',
  data() {
    return {
      dunningDisabled:false,
      modefiyProductIndex: 0,
      modefiyProductIndexArr:[],
      attachmentList:[],
      logisticsStatus:{},
      fieldDisplay:{},
      hightLightObj:{},
      logisticsNo: '',
      remark: '',
      showProductDialog: false,
      showAddProductDialog: false,
      selectionContainer: [],
      productInfoModifyStatus: 0,
      edit: false,
      oldPlanObject: {},
      oldPaymentObject: {},
      basicInfoObj:{},
      transportInfoObj:{},
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
      paymentSum: {},
      selectArr: {
        containerType: [],
        permitedForTransportation: [
          {
            code: '1',
            name: this.$i.logistic.yes
          },
          {
            code: '0',
            name: this.$i.logistic.no
          }
        ]
      },
      dictionaryPart: {
        avl: 'AVL',
        blType: 'BL_TYPE',
        logisticsStatus: 'LS_PLAN',
        transportationWay: 'MD_TN',
        payment: 'PMT'
      },
      configUrl: {
        placeLogisticPlan: {
          saveAsDraft: this.$apis.save_draft_logistic_plan,
          send: this.$apis.send_logistic_plan
        },
        planDetail: {
          send: this.$apis.update_logistic_plan
        },
        planDraftDetail: {
          saveAsDraft: this.$apis.save_draft_logistic_plan,
          send: this.$apis.send_draft_logistic_plan
        }
      },
      pageName:'',
      prodFieldDisplay:{},
      inintData:{}, //存放初始数据的 便于取消还原数据 
    }
  },
  components: {
    formList,
    containerInfo,
    attachment,
    oneLine,
    VTable,
    feeInfo,
    payment,
    btns,
    productModify,
    addProduct,
    messageBoard
  },
  computed: {
    attachmentReadonly(){
      return !this.edit;
    },
    planId () {
      return this.$route.query.id
    },
    productbButtons(){
      let aArr = [
        {
          label: 'Negociate',
          type: 1,
          disabled:!this.edit     
        },
        {
          label: 'Copy',         
          type: 4,
          disabled:!this.edit 
        },
        {
          label: 'Detail',
          type: 3
        }
      ]
      this.$route.name=='placeLogisticPlan' ?  aArr : aArr.splice(1,0,
        {
          label: 'History',         
          type: 2,
          disabled:!this.edit 
        }
      )
      return aArr;
    } 
  },
  mounted () {
    this.setLog({query:{code:'planDetail'}});
    const arr = this.$route.fullPath.split('/')
    this.pageName =  arr[arr.length - 1].split('?')[0]
    this.registerRoutes()
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
    if (this.planId) {
      this.getDetails();
    } else {
      this.edit = true
      this.basicInfoArr.forEach((item)=>{
        this.$set(item,'value',item.defaultVal);
      })
      this.transportInfoArr.forEach((item)=>{
        this.$set(item,'value',item.defaultVal);
      })
      this.getNewLogisticsNo()
      this.getRate();
    }
  },
  methods: {
    ...mapActions(['setDraft', 'setRecycleBin', 'setLog']),
    hightLightModifyFun(v){
      
    },
    //获取实时汇率
    getRate(){
      this.$ajax.post(`${this.$apis.get_plan_rate}`).then(res => {
        this.matchRate(res);
      })
    },
    //汇率与后台传入做 对应匹配
    matchRate(res){
      this.ExchangeRateInfoArr.forEach((item)=>{
        res.forEach((_item)=>{
          if(item.key == _item.symbol){
            _.map(_item,(v,k)=>{
              this.$set(item,k=='price' ? 'value' : k,v)
            })
          }
        })
      })
      this.$set(this.inintData,'ExchangeRateInfoArr',this.$depthClone(this.ExchangeRateInfoArr));
    },
    batchDunning(){
      let argArr = [];
      this.paymentList.forEach((item)=>{
        if(item.planPayAmount>item.actualPayAmount){
          argArr.push({'id':item.id,'version':item.version})
        }
      });
      this.$ajax.post(`${this.$apis.logistics_payment_batchDunning}`,argArr).then(res => {
        this.$message({
          type: 'success',
          message: '催款成功!'
        })
      })
    },
    registerRoutes () {
      this.$store.commit('SETRECYCLEBIN', {
        name: 'overviewArchive',
        show: true
      })
    },
    getDetails () {
      let url = this.$route.query.loadingList ? this.$apis.get_order_details :this.$apis.get_plan_details
      this.$ajax.get(`${url}${this.planId}`).then(res => {
        this.createdPlanData(res)
        this.logisticsStatus = {
          recived : res.recived,
          supplierRecived : res.supplierRecived,
          status : res.logisticsStatus,
          loadingList : this.$route.query.loadingList
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
    getSupplier (logisticsNo) {
      this.$ajax.get(`${this.$apis.get_supplier}?logisticsNo=${logisticsNo}`).then(res => {
        this.selectArr.supplier = res;
      })
    },
    createdPlanData (res = this.oldPlanObject) {
      this.oldPlanObject = JSON.parse(JSON.stringify(res))
      const stringArray = [
        'payment',
        'permitedForTransportation',
        'blType'
      ]
      this.basicInfoArr.forEach(a => {
        a.value = stringArray.includes(a.key) ? res[a.key] : res[a.key];
      })
      this.$set(this.inintData,'basicInfoArr',this.$depthClone(this.basicInfoArr))
      this.transportInfoArr.forEach(a => {
        a.value = res[a.key]
      })
      this.logisticsNo = res.logisticsNo
      this.$set(this.inintData,'transportInfoArr',this.$depthClone(this.transportInfoArr))
      this.exchangeRateList = res.currencyExchangeRate || []
      this.remark = res.remark
      this.containerInfo = res.containerDetail || [];
      this.$set(this.inintData,'containerInfo',this.$depthClone(res.containerDetail) || [])
      this.feeList = res.fee&&[res.fee];
      this.productList = this.$getDB(this.$db.logistic.productInfo, res.product)
      this.productList.forEach((item)=>{
        if(item.fieldDisplay.value){
          _.mapObject(item.fieldDisplay.value,(v,k)=>{
            this.$set(item[k],'_color','red')
          })
        }
      }) 
    },
    createdPaymentData (res = this.oldPaymentObject) {
      this.oldPaymentObject = JSON.parse(JSON.stringify(res))
      this.paymentList = res.datas
      this.dunningDisabled = this.paymentList.every((item)=> item.planPayAmount > item.actualPayAmount);
      this.paymentSum = res.statisticsDatas[0]
    },
    getNewLogisticsNo () {
      let url = this.$route.query.loadingList ? this.$apis.get_new_logistics_orderNo : this.$apis.get_new_logistics_no;
      this.$ajax.post(url).then(res => {
        this.basicInfoArr.find(a => a.key === 'logisticsNo').value = res
        this.getSupplier(res)
      })
    },
    getDictionary () {
      this.$ajax.get(this.$apis.get_currency).then(res => {
        this.$set(this.selectArr, 'exchangeCurrency', res)
      })
      this.$ajax.get(this.$apis.get_container_type).then(res => {
        this.$set(this.selectArr, 'containerType', res)
      }) 
      this.getDictionaryPart()
    },
    getDictionaryPart () {
      this.$set(this.dictionaryPart,'logisticsStatus',this.$route.query.loadingList ? 'LS_STATUS' : 'LS_PLAN')
      const params = _.map(this.dictionaryPart, v => v)
      this.$ajax.post(this.$apis.get_dictionary, params).then(res => {
        _.mapObject(this.dictionaryPart, (v, k) => {
          this.$set(this.selectArr, k, res.find(a => a.code === v).codes)
        })
      })
    },
    handleSelectionContainer (selectArray) {
      this.selectionContainer = selectArray
    },
    deleteContainer () {
      if (!this.selectionContainer.length) return
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.oldPlanObject.rmContainerDetail = this.selectionContainer.map((item)=>{
          return item.id;
        })
        this.containerInfo = _.difference(this.containerInfo,this.selectionContainer);
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })
    },
    computeType (key) {
      return basicInfoInput.includes(key) ? 'input' : basicInfoDate.includes(key) ? 'date' : 'selector'
    },
    arrayAppend(arrKey) {
      this[arrKey].push({})
    },
    arraySplite (array, index) {
      array.splice(index, 1);
    },
    action (e, status, i) {
      if (status == 3){
        return window.open(`${window.location.origin}#/product/detail?id=${ e.skuId.value }`);
      }else if(status==4){
        let newAddArr = this.$depthClone(this.productList[i]);
        newAddArr.id.value = null;
        this.productList.splice(i+1,0,newAddArr);
        return;
      }
      this.productInfoModifyStatus = status
      this.showProductDialog = true
      this.modefiyProductIndex = i
      this.modefiyProductIndexArr.push(i);
      this.getProductHistory(e.id ? (e.argID ? e.argID.value : e.id.value) : null, status, i)
    },
    getProductHistory (productId, status, i) {
      const currentProduct = JSON.parse(JSON.stringify(this.productList[i]))

      productId ? this.$ajax.get(`${this.$apis.get_product_history}?productId=${productId}`).then(res => {
        res.history.length ? (this.productModifyList = [currentProduct, ...this.$getDB(this.$db.logistic.productModify, res.history)])
        : (this.productModifyList = [ currentProduct ])
      })
      : this.productModifyList = [ currentProduct ]
    },
    addPayment () {
      const obj = this.basicInfoArr.find(a => a.key === 'exchangeCurrency')
      this.$ajax.post(this.$apis.get_payment_no).then(res => this.paymentList.push({
        edit: true,
        no: res,
        status: 20,
        currencyCode: obj.value || null
      }))
    },
    savePayment (i) {
      const currencyCode = this.paymentList[i].currencyCode
      const payToCompanyId = this.paymentList[i].payToCompanyId
      const skuSupplierObj = this.selectArr.supplier.find(a => a.companyId === payToCompanyId)
      const paymentData = {
        ..._.extend({
          name:null,
          actualPayAmount:null,
          planPayAmount:null,
          actualPayDt:null,
          planPayDt:null,
        },this.paymentList[i]),
        currency: this.selectArr.exchangeCurrency.find(a => a.code === currencyCode).id,
        currencyCode,
        orderNo: this.oldPlanObject.logisticsNo,
        orderType: 30,
        payToCompanyId,
        payToCompanyName: skuSupplierObj ? skuSupplierObj.skuSupplierName : null,
        type: 10
      }
      const url = paymentData.id ? this.$apis.update_plan_payment : this.$apis.save_plan_payment
      if(this.$validateForm(paymentData,this.$db.logistic.payMentInfo)){
        return;
      }
      this.$ajax.post(url, paymentData).then(res => {
        this.paymentList[i] = res
        this.updatePaymentWithView({i, edit: false})
      })
    },
    updatePaymentWithView ({ i, edit, status }) {
      const obj = {
        ...this.paymentList[i],
        edit,
        status: status || this.paymentList[i].status
      }
      this.$set(this.paymentList, i, obj)
    },
    closeAddProduct (status) {
      this.showAddProductDialog = false
      const selectArrData = this.$depthClone(this.$refs.addProduct.selectArrData);

      if (!status || !selectArrData.length) return this.$refs.addProduct.$refs.multipleTable.clearSelection()
      selectArrData.forEach(a => {
        a.argID = this.$depthClone(a.id);
        a.id = null
        a.vId = +new Date()
        a.blSkuName = ''
        a.hsCode = ''
        a.currency = ''
        a.toShipCartonQty = ''
        a.toShipQty = ''
        a.reportElement = ''
        a.factorySkuCode = ''
        a.unitExportPrice = ''
        a.totalExportPrice = '';
        !this.modifyProductArray.includes(a) && this.modifyProductArray.push(a)
      })

      this.productList = [...this.$getDB(this.$db.logistic.productInfo, selectArrData), ...this.productList]
      // console.log(selectArrData)
      // TODO
    },

    selectProduct (arr) {
      // console.log(arr)
      this.selectProductArr = arr
    },
    removeProduct () {
      this.selectProductArr.forEach(a => {
        this.productList.forEach((item,index)=>{
          if(item.id.value==a.id.value){
            this.removeProductList.push(this.productList[index])
            this.productList.splice(index,1);
          }
        })
      })
    },
    productModifyfun(obj){
      if(this.planId){
        this.prodFieldDisplay = obj;
      }
    },
    closeModify (status) {
      this.showProductDialog = false
      if (!status) return this.productModifyList = []
      const currrentProduct = this.productModifyList[0]
      this.$set(this.productList, this.modefiyProductIndex, currrentProduct)
      this.productList.forEach(item=>{
        this.$set(item.fieldDisplay, 'value', null);
      })
      this.modefiyProductIndexArr.forEach((item)=>{
        this.$set(this.productList[item].fieldDisplay, 'value', this.prodFieldDisplay)
      })
      const id = currrentProduct.id.value
      // const vId = currrentProduct.vId.value
      const vId = +new Date()
      const index = this.modifyProductArray.indexOf(this.modifyProductArray.find(a => a.id === (id || vId)))
      index === -1 ? this.modifyProductArray.push(this.restoreObj(currrentProduct)) : (this.modifyProductArray[index] = this.restoreObj(currrentProduct))
    },
    switchEdit (arg) {     
      switch(arg){
        case 'receive':
            this.logisticsStatus.show = true;
            this.receive();
          break; 
        case 'modify':
            this.edit = true;
          break; 
        case 'cancelModify':
            this.edit = false;
            this.basicInfoArr = this.inintData.basicInfoArr;
            this.ExchangeRateInfoArr = this.inintData.ExchangeRateInfoArr;
            this.transportInfoArr = this.inintData.transportInfoArr;
            this.containerInfo = this.inintData.containerInfo;
          break; 
        case 'confirm':
            this.conformPlan();
          break; 
        case 'generateList':
            this.generateList();
          break; 
        case 'cancel':
            this.cancelPlan();
          break; 
        case 'cancelLoadingList':
            this.cancelLoadingList();
          break; 
        case 'refuse':
            this.refuse();
          break; 
        default:
          break; 
      }
    },   
    refuse(){
      this.$ajax.post(this.$apis.logistics_plan_cancelByIds,{ids:[this.planId]}).then(res => {
        this.$message({
          message: '操作成功，正在跳转...',
          type: 'success',
          duration:3000,
          onClose:()=>{
            this.$router.push('/logistic/'+( this.$route.query.loadingList || ''));
          }
        })
      })
    },
    cancelLoadingList(){
       this.$ajax.post(this.$apis.logistics_order_cancelByIds,{ids:[this.planId]}).then(res => {
        this.$message({
          message: '取消成功，正在跳转...',
          type: 'success',
          duration:3000,
          onClose:()=>{
            this.$router.push('/logistic/'+( this.$route.query.loadingList || ''));
          }
        })
      })
    },
    receive(){
      this.$ajax.post(this.$apis.logistics_plan_receive,{id:this.planId}).then(res => {
        this.getDetails();
      })
    },
    generateList(){
      this.$ajax.post(this.$apis.logistics_plan_postLoadingList,{id:this.planId}).then(res => {
        this.getDetails();
      })
    },
    conformPlan(){
      this.$ajax.post(this.$apis.logistics_plan_confirm,{id:this.planId}).then(res => {
         this.$message({
          message: '发送成功，正在跳转...',
          type: 'success',
          duration:3000,
          onClose:()=>{
            this.$router.push('/logistic');
          }
        })
      })
    },
    cancelPlan(){
      this.$ajax.post(this.$apis.logistics_plan_cancel,{id:this.planId}).then(res => {
        this.$message({
          message: '取消成功，正在跳转...',
          type: 'success',
          duration:3000,
          onClose:()=>{
            this.$router.push('/logistic');
          }
        })
      })
    },
    toExit () {
      if (this.planId) {
        return this.$router.go(-1)
      }
      this.edit = !this.edit
      this.createdPlanData()
      this.createdPaymentData()
    },
    restoreObj (obj) {
      return _.mapObject(obj, v => (v = v.value))
    },
    restoreArr (arr) {
      return arr.map(a => {
        return _.mapObject(a, v => (v = v.value))
        // const obj = {}
        // _.mapObject(a, (value, key) => {
        //   obj[key] = value.value
        // })
        // return obj
      })
    },
    hightLightModifyFun(v,name){
      this.hightLightObj[name] = v ;
      let obj = {};
      _.mapObject(this.hightLightObj,(v,k)=>{
        Object.assign(obj,v);
      })
      this.oldPlanObject.fieldDisplay = obj;
    },
    sendData (keyString) {
      let url = this.$route.query.loadingList ? this.$apis.update_logistic_order : this.configUrl[this.pageName][keyString];    
      this.basicInfoArr.forEach(a => { 
        // this.$set(this.basicInfoObj, a.key, a.type=='date' ? a.value : a.value)
        this.$set(this.basicInfoObj, a.key, a.value)
      })

      this.transportInfoArr.forEach(a => {
        this.$set(this.transportInfoObj, a.key, a.value)
      })

      this.basicInfoObj.remark = this.remark
      if (!this.basicInfoObj.payment) return this.$message({ 
        type: 'error',
        message: '付款方式为必填!'
      })

      _.mapObject(this.basicInfoObj, (value, key) => {
        this.oldPlanObject[key] = value
      })
      _.mapObject(this.transportInfoObj, (value, key) => {
        this.oldPlanObject[key] = value
      })
      this.oldPlanObject.attachment = this.$refs.attachment.getFiles();
      this.oldPlanObject.containerDetail = this.containerInfo
      this.oldPlanObject.fee = this.feeList && this.feeList.length>0 ? this.feeList[0] : null; 
      this.oldPlanObject.product = this.modifyProductArray;
      this.oldPlanObject.currencyExchangeRate = _.map(this.$depthClone(this.ExchangeRateInfoArr),(item)=>{
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
      this.oldPlanObject.product = this.productList.map((item,i)=>{        
        return _.mapObject(item,(v,k)=>{
          if(v.type=='text'){
            return v.value;
          }else{
             return null;
          }
        })
      });
      if(!this.planId){
        this.oldPlanObject.fieldDisplay = null;
      }
      if(this.$validateForm(this.oldPlanObject,this.$db.logistic.basicInfoObj)){
        return;
      }
      this.$ajax.post(url, this.oldPlanObject).then(res => {
        this.$message({
          message: '发送成功，正在跳转...',
          type: 'success',
          duration:3000,
          onClose:()=>{
            this.$router.push('/logistic/'+ (this.$route.query.loadingList || ''));
          }
        })
      })
    },
    formListSelectChange(v){
      this.$set(this.oldPlanObject,'currency',v);
    }
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
    color:#666;
    height: 50px;
    line-height:50px;
    border-bottom:1px solid #ccc;
    padding:0 15px;
  }
  .hd {
    height: 40px;
    line-height:40px;
    border-bottom:1px solid #ccc;
    padding:0 15px;
    font-weight: bold;
    &.active {
      border:none;
    }
  }
  .input-item {
    display:flex;
    align-items: center;
    padding:10px 0;
    span {
      width: 180px;
      display:inline-block;
      font-size:12px;
      text-align: right;
      padding-right:10px;
      box-sizing: border-box;
    }
    // .el-select, .el-input {
    //   flex:1;
    // }
  }
  .product-header {
    margin-bottom: 20px;
  }
}
</style>
