<template>
  <div class="place-logistic-plan">
    <div class="hd-top" v-if="planId">{{ $i.logistic.logisticPlan + '    ' + logisticsNo}}</div>
    <div class="hd-top" v-else>{{ $i.logistic.placeNewLogisticPlan }}</div>
    <form-list :showHd="false" :edit="edit" :listData="basicInfoArr" :selectArr="selectArr" :title="$i.logistic.basicInfoTitle"/>
    <el-row :gutter="10">
       <!-- <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24"> -->
        <div class="input-item">
          <span>{{ $i.logistic.remark }}:</span>
          <el-input class="el-input" type="textarea" resize="none" :autosize="{ minRows: 3 }" placeholder="请输入内容" v-model="remark" v-if="edit"></el-input>
          <p v-else>{{ remark }}</p>
        </div>
      <!-- </el-col> -->
      <attachment accept="all" ref="attachment" :title="$i.logistic.attachment" :edit="edit"/>
      <!-- <one-line :edit="edit" :list="exchangeRateList" :title="$i.logistic.exchangeRate"/> -->
    </el-row>
    <form-list :listData="ExchangeRateInfoArr" :edit="edit" :title="$i.logistic.ExchangeRateInfoTitle"/>
    <form-list :listData="transportInfoArr" :edit="edit" :title="$i.logistic.transportInfoTitle"/>
    <div>
      <div class="hd"></div>
      <div class="hd active">{{ $i.logistic.containerInfoTitle }}</div>
      <container-info :tableData.sync="containerInfo" @arrayAppend="arrayAppend" @handleSelectionChange="handleSelectionContainer" @deleteContainer="deleteContainer" :edit="edit" :containerType="selectArr.containerType"/>
    </div>

    <!-- <div v-if="planId && feeList"> -->
    <div v-if="planId">
      <div class="hd"></div>
      <div class="hd active">{{ $i.logistic.feeInfoTitle }}</div>
      <fee-info :edit="edit" :tableData.sync="feeList"></fee-info>
    </div>

    <div v-if="planId">
      <div class="hd"></div>
      <div class="hd active">{{ $i.logistic.paymentTitle }}</div>
      <payment :tableData.sync="paymentList" :edit="edit" :paymentSum="paymentSum" @addPayment="addPayment" @savePayment="savePayment" :selectArr="selectArr" @updatePaymentWithView="updatePaymentWithView" :currencyCode="oldPlanObject.currency"/>
    </div>
    <div>
      <div class="hd"></div>
      <div class="hd active">{{ $i.logistic.productInfoTitle }}</div>
      <!-- <v-table :data.sync="productList" @action="action" :buttons="edit ? productbButtons : null" @change-checked="selectProduct"> -->
      <v-table :data.sync="productList" @action="action" :buttons="productbButtons" @change-checked="selectProduct">
        <div slot="header" class="product-header" v-if="edit">
          <el-button type="primary" size="mini" @click.stop="showAddProductDialog = true">{{ $i.logistic.addProduct }}</el-button>
          <el-button type="danger" size="mini" @click.stop="removeProduct">{{ $i.logistic.remove }}</el-button>
        </div>
      </v-table>
    </div>
    <el-dialog :title="$i.logistic.negotiate" :visible.sync="showProductDialog" :close-on-click-modal="false" :close-on-press-escape="false" @close="closeModify(0)">
      <product-modify ref="productModifyComponents" :tableData.sync="productModifyList" :productInfoModifyStatus="productInfoModifyStatus"/>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeModify(0)">{{ $i.logistic.cancel }}</el-button>
        <el-button type="primary" @click="closeModify(1)">{{ $i.logistic.confirm }}</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="$i.logistic.addProductFromOrder" :visible.sync="showAddProductDialog" :close-on-click-modal="false" :close-on-press-escape="false" @close="closeAddProduct(0)">
      <add-product ref="addProduct"/> 
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeAddProduct(0)">{{ $i.logistic.cancel }}</el-button>
        <el-button type="primary" @click="closeAddProduct(1)">{{ $i.logistic.confirm }}</el-button>
      </div>
    </el-dialog>
    <btns :edit="edit" @switchEdit="switchEdit" @toExit="toExit" :logisticsStatus="logisticsStatus" @sendData="sendData" :isCopy="isCopy" :planId="planId" @createdPlanData="createdPlanData" @createdPaymentData="createdPaymentData"/>
  </div>
</template>
<script>

import { VSimpleTable, containerInfo, selectSearch, VTable} from '@/components/index';
import attachment from '@/components/base/attachment'
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
      modefiyProductIndex: 0,
      logisticsStatus:{},
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
        logisticsStatus: 'LS_STATUS',
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
  },
  computed: {
    planId () {
      return this.$route.query.id
    },
    isCopy () {
      return this.$route.query.copy
    },
    productbButtons(){
      let aArr = [
        {
          label: 'Negociate',
          type: 1        
        },
        {
          label: 'Detail',
          type: 3
        }
      ]
      this.$route.name=='placeLogisticPlan' ?  aArr : aArr.splice(1,0,
        {
          label: 'History',         
          type: 2
        }
      )
      return aArr;
    } 
  },
  mounted () {
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
      this.getDetails()
      if(this.isCopy){
        this.edit = true;
        this.getNewLogisticsNo();
      }
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
    },
    registerRoutes () {
      this.$store.commit('SETDRAFT', {
        name: 'overviewDraft',
        show: true
      })
      this.$store.commit('SETRECYCLEBIN', {
        name: 'overviewArchive',
        show: true
      })
    },
    getDetails () {
      this.$ajax.get(`${this.$apis.get_plan_details}${this.planId}`).then(res => {
        this.createdPlanData(res)
        this.logisticsStatus = {
          recived : res.recived,
          supplierRecived : res.supplierRecived
        };
        this.matchRate(res.currencyExchangeRate);
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
        if(this.isCopy&&a.key=='logisticsNo'){
          a.value = this.logisticsNo;
        }else{
          a.value = stringArray.includes(a.key) ? res[a.key] : res[a.key]
        }
      })
      this.transportInfoArr.forEach(a => {
        a.value = res[a.key]
      })
      this.exchangeRateList = res.currencyExchangeRate || []
      this.remark = res.remark
      if(!this.isCopy){
        this.logisticsNo = res.logisticsNo
      }
      this.containerInfo = res.containerDetail || []
      let feeListb = false;
      _.mapObject(res.fee,(v,k)=>{
        if(v!=null){
          feeListb = true;
          return;
        }
      })
      this.feeList = feeListb ? [res.fee] : null;
      this.productList = this.$getDB(this.$db.logistic.productInfo, res.product)
    },
    createdPaymentData (res = this.oldPaymentObject) {
      this.oldPaymentObject = JSON.parse(JSON.stringify(res))
      this.paymentList = res.datas
      this.paymentSum = res.statisticsDatas[0]
    },
    getNewLogisticsNo () {
      this.$ajax.post(this.$apis.get_new_logistics_no).then(res => {
        this.basicInfoArr.find(a => a.key === 'logisticsNo').value = res
        if(this.isCopy){
          this.logisticsNo = res;
        }
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
        this.selectionContainer.forEach(i => this.arraySplite(this.containerInfo, i))
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
        return window.open(`${window.location.origin}#/product/sourcingDetail?id=${e.argID ? e.argID.value : e.id.value }`);
      }
      this.productInfoModifyStatus = status
      this.showProductDialog = true
      this.modefiyProductIndex = i
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
      console.log('obj',obj)
      this.$ajax.post(this.$apis.get_payment_no).then(res => this.paymentList.push({
        edit: true,
        no: res,
        status: 20,
        currencyCode: obj.value || null
      }))
    },
    savePayment (i) {
      const currencyCode = this.paymentList[i].currencyCode
      const payToId = this.paymentList[i].payToId
      const skuSupplierObj = this.selectArr.supplier.find(a => a.skuSupplierId === payToId)

      console.log(this.selectArr.exchangeCurrency)
      console.log(this.paymentList[i])
      const paymentData = {
        ...this.paymentList[i],
        currency: this.selectArr.exchangeCurrency.find(a => a.code === currencyCode).id,
        currencyCode,
        orderNo: this.oldPlanObject.logisticsNo,
        orderType: 30,
        payToId,
        payToName: skuSupplierObj ? skuSupplierObj.skuSupplierName : null,
        type: 10
      }

      const url = paymentData.id ? this.$apis.update_plan_payment : this.$apis.save_plan_payment
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
        const index = this.productList.indexOf(a)
        this.removeProductList.push(this.productList[index])
        this.$delete(this.productList, index)
      })
    },
    closeModify (status) {
      this.showProductDialog = false
      if (!status) return this.productModifyList = []
      const currrentProduct = this.productModifyList[0]
      this.$set(this.productList, this.modefiyProductIndex, currrentProduct)
      const id = currrentProduct.id.value
      const vId = currrentProduct.vId.value
      const index = this.modifyProductArray.indexOf(this.modifyProductArray.find(a => a.id === (id || vId)))
      index === -1 ? this.modifyProductArray.push(this.restoreObj(currrentProduct)) : (this.modifyProductArray[index] = this.restoreObj(currrentProduct))
    },
    switchEdit (arg) {     
      switch(arg){
        case 'receive':
            this.edit = !this.edit;
            this.pageName = 'planDetail';
          break; 
        case 'confirm':
            this.conformPlan();
          break; 
        case 'cancel':
            this.cancelPlan();
          break; 
        case 'copy':
            this.copyPlan();
          break; 
        case 'placeLogisticsPlan':
            this.$router.push('/logistic/placeLogisticPlan');
          break; 
        default:
          break; 
      }
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
    copyPlan(){
      window.open(`${window.location.origin}#/logistic/placeLogisticPlan?id=${this.planId}&copy=copy`);
    },
    toExit () {
      if ((this.isCopy&&this.planId)||(!this.isCopy&&!this.planId)) {
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
    sendData (keyString) {
      let url = this.configUrl[this.pageName][keyString];
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
      this.oldPlanObject.containerDetail = this.containerInfo
      this.oldPlanObject.fee = this.feeList && this.feeList.length>0 ? this.feeList : null;
      this.oldPlanObject.product = this.modifyProductArray;
      this.oldPlanObject.currencyExchangeRate = _.map(this.$depthClone(this.ExchangeRateInfoArr),(item)=>{
        item['price'] = item['value'];
        delete item['value'];
        delete item['key'];
        delete item['label'];
        return item;
      });
      // this.oldPlanObject.rmProduct = this.removeProductList.map(a => {
      //   const obj = {}
      //   _.mapObject(a, (value, key) => {
      //     obj[key] = value.value
      //   })
      //   return obj
      // })
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
      let obj = null;
      if(this.isCopy){
        this.oldPlanObject.planNo = this.logisticsNo;
        obj = this.restIdNull(this.oldPlanObject,['id','unId']);
      }
      this.$ajax.post(url, obj || this.oldPlanObject).then(res => {
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
    //递归重置 copy
    //arg 传入的对象 
    //restArr 要重置字段集合数组
    restIdNull(arg,restArr){
      restArr = restArr || [];    
      let args =  _.omit(arg,...restArr);
      return _.mapObject(args,(v,k)=>{
        if(Array.isArray(v)){
          return _.map(v,(val,key)=>{
            return _.omit(val,...restArr);
          })
        }else{
          return v;
        }
      })
    },
  },
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
