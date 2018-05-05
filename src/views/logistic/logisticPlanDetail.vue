<template>
  <div class="place-logistic-plan">
    <div class="hd-top" v-if="planId">{{ $i.logistic.logisticPlan + '    ' + logisticsNo}}</div>
    <div class="hd-top" v-else>{{ $i.logistic.placeNewLogisticPlan }}</div>
    <form-list :showHd="false" :edit="edit" :listData="basicInfoArr" :selectArr="selectArr" :title="$i.logistic.basicInfoTitle" planId="planId"/>
    <el-row :gutter="10">
       <!-- <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24"> -->
        <div class="input-item">
          <span>{{ $i.logistic.remark }}</span>
          <el-input class="el-input" type="textarea" resize="none" :autosize="{ minRows: 3 }" placeholder="请输入内容"v-model="remark" v-if="edit"></el-input>
          <p v-else>{{ remark }}</p>
        </div>
      <!-- </el-col> -->
      <attachment accept="all" ref="attachment" :title="$i.logistic.attachment"/>
      <one-line :edit="edit" :list="exchangeRateList" :title="$i.logistic.exchangeRate"/>
    </el-row>
    <form-list :listData="transportInfoArr" :edit="edit" :title="$i.logistic.transportInfoTitle"/>
    <div>
      <div class="hd"></div>
      <div class="hd active">{{ $i.logistic.containerInfoTitle }}</div>
      <container-info :tableData.sync="containerInfo" @arrayAppend="arrayAppend" @handleSelectionChange="handleSelectionContainer" @deleteContainer="deleteContainer" :edit="edit" :containerType="selectArr.containerType"/>
    </div>

    <div>
      <div class="hd"></div>
      <div class="hd active">{{ $i.logistic.feeInfoTitle }}</div>
      <fee-info :edit="edit" :tableData.sync="feeList"></fee-info>
    </div>

    <div>
      <div class="hd"></div>
      <div class="hd active">{{ $i.logistic.paymentTitle }}</div>
      <payment :tableData.sync="paymentList" :edit="edit" :paymentSum="paymentSum"/>
    </div>
    <div>
      <div class="hd"></div>
      <div class="hd active">{{ $i.logistic.productInfoTitle }}</div>
      <v-table :data.sync="productList" @action="action" :buttons="productbButtons" @change-checked="selectProduct">
        <div slot="header" class="product-header">
          <el-button type="primary" size="mini" @click.stop="showAddProductDialog = true">{{ $i.logistic.addProduct }}</el-button>
          <el-button type="danger" size="mini">{{ $i.logistic.remove }}</el-button>
        </div>
      </v-table>
    </div>
    <el-dialog :title="$i.logistic.negotiate" :visible.sync="showProductDialog" :close-on-click-modal="false" :close-on-press-escape="false" @close="closeDialog">
      <product-modify ref="productModifyComponents" :tableData.sync="productModifyList" :productInfoModifyStatus="productInfoModifyStatus" :productId="selectProductId"/>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showProductDialog = false">{{ $i.logistic.cancel }}</el-button>
        <el-button type="primary" @click="showProductDialog = false">{{ $i.logistic.confirm }}</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="$i.logistic.addProductFromOrder" :visible.sync="showAddProductDialog" :close-on-click-modal="false" :close-on-press-escape="false" @close="closeDialog">
      <add-product :tableData="orderList" ref="addProduct"/>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeAddProduct(0)">{{ $i.logistic.cancel }}</el-button>
        <el-button type="primary" @click="closeAddProduct(1)">{{ $i.logistic.confirm }}</el-button>
      </div>
    </el-dialog>
    <btns :edit="edit" @switchEdit="switchEdit" @toExit="toExit" @savePlan="savePlan" :planId="planId"/>
  </div>
</template>
<script>
import { VSimpleTable, containerInfo, selectSearch, VTable } from '@/components/index';
import attachment from '@/components/base/attachment'
import formList from '@/views/logistic/children/formList'
import oneLine from '@/views/logistic/children/oneLine'
import feeInfo from '@/views/logistic/children/feeInfo'
import payment from '@/views/logistic/children/payment'
import btns from '@/views/logistic/children/btns'
import productModify from '@/views/logistic/children/productModify'
import addProduct from '@/views/logistic/children/addProduct'

import { basicInfoInput, basicInfoSelector, basicInfoDate, basicInfoObj, transportInfoObj } from '@/database/logistic/plan/staticData'

export default {
  name: 'logisticPlanDetail',
  data() {
    return {
      logisticsNo: '',
      remark: '',
      selectProductId: 0,
      showProductDialog: false,
      showAddProductDialog: false,
      selectionContainer: [],
      productInfoModifyStatus: 0,
      edit: false,
      basicInfoObj,
      transportInfoObj,
      transportInfoArr: [],
      basicInfoArr: [],
      productbButtons: [
        {
          label: 'Negociate',
          type: 1
        },
        {
          label: 'History',
          type: 2
        },
        {
          label: 'Detail',
          type: 3
        }
      ],
      exchangeRateList: [],
      feeList: [],
      productList: [],
      productModifyList: [],
      paymentList: [],
      containerInfo: [],
      paymentSum: {},
      orderList: [],
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
      pageParams: {
        pn: 1,
        ps: 10
      }
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
    addProduct
  },
  watch: {
    edit (newValue) {
      if (newValue) return
      this.containerInfo.forEach((a, i) => {
        !Object.keys(a).length && this.arraySplite(this.containerInfo, i)
      })
    },
    selectProductId (newValue) {
      newValue && this.getProductHistory(newValue)
    },
    productInfoModifyStatus () {
      this.getProductHistory(this.selectProductId)
    }
  },
  computed: {
    planId () {
      return this.$route.query.id
    }
  },
  mounted () {
    this.getDictionary()
    this.getOrderList()
    this.basicInfoArr = _.map(this.basicInfoObj, (value, key) => {
      return {
        type: this.computeType(key),
        label: this.$i.logistic[key],
        key,
        value
      }
    })

    this.transportInfoArr = _.map(this.transportInfoObj, (value, key) => {
      return {
        type: this.computeType(key),
        label: this.$i.logistic[key],
        key,
        value
      }
    })

    if (this.planId) {
      this.getDetails()
    } else {
      this.edit = true
      this.getNewLogisticsNo()
    }
  },
  methods: {
    getDetails () {
      this.$ajax.get(`${this.$apis.get_plan_details}${this.planId}`).then(res => {
        this.basicInfoArr.forEach(a => {
          a.value = res[a.key]
        })
        this.transportInfoArr.forEach(a => {
          a.value = res[a.key]
        })
        this.exchangeRateList = res.currencyExchangeRate
        this.remark = res.remark
        this.logisticsNo = res.logisticsNo
        this.containerInfo = res.containerDetail
        this.feeList = [res.fee]
        this.productList = this.$getDB(this.$db.logistic.productInfo, res.product)
        this.$ajax.post(`${this.$apis.get_payment_list}${res.logisticsNo}/30`).then(res => {
          this.paymentList = res.datas
          this.paymentSum = res.statisticsDatas[0]
        })
      })
    },
    getNewLogisticsNo () {
      this.$ajax.post(this.$apis.get_new_logistics_no).then(res => {
        this.basicInfoArr.find(a => a.key === 'logisticsNo').value = res
      })
    },
    getDictionary () {
      this.$ajax.get(this.$apis.get_currency).then(res => {
        this.$set(this.selectArr, 'exchangeCurrency', res)
      })
      this.$ajax.get(this.$apis.get_container_type).then(res => {
        this.$set(this.selectArr, 'containerType', res)
      })
      this.getDictionaryPart(['PMT', 'MD_TN', 'BL_TYPE', 'AVL'], ['avl', 'blType', 'transportationWay', 'payment'])
    },
    getDictionaryPart (keyCode, keys) {
      this.$ajax.post(this.$apis.get_dictionary, keyCode).then(res => {
        keys.forEach((a, i) => {
          this.$set(this.selectArr, a, res[i].codes)
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
    action (e, i) {
      if (i === 3) return
      this.productInfoModifyStatus = i
      this.showProductDialog = true
      this.selectProductId = e.id.value
    },
    getProductHistory (productId) {
      this.$ajax.get(`${this.$apis.get_product_history}?productId=${productId}`).then(res => {
        this.productModifyList = this.$getDB(this.$db.logistic.productModify, res.history)
        delete res.history
        const [ copyNew ] = this.$getDB(this.$db.logistic.productModify, [res])
        this.productModifyList.unshift(copyNew)
      })
    },
    getOrderList () {
      this.$ajax.post(this.$apis.get_order_list_with_page, this.pageParams).then(res => {
        // this.orderList = res.datas.map(a => {
        //   let aa = _.mapObject(a, item => {
        //     item = 1
        //     return item
        //   })
        //   return aa
        // })
        this.orderList = res.datas
      })
    },
    closeAddProduct (status) {
      this.showAddProductDialog = false
      const selectArrData = this.$refs.addProduct.selectArrData
      if (!status || !selectArrData.length) return this.$refs.addProduct.$refs.multipleTable.clearSelection()
      console.log(selectArrData)
      // TODO
    },
    selectProduct (arr) {
      this.selectProductArr = arr.map(a => a.id.value)
    },
    closeDialog () {
      this.productModifyList = []
      // console.log(this.$refs.productModifyComponents)
    },
    switchEdit () {
      this.edit = !this.edit
    },
    toExit () {
      this.planId ? (this.edit = !this.edit) : this.$router.go(-1)
    },
    savePlan () {
      this.basicInfoArr.forEach(a => {
        this.basicInfoObj = a.value
      })
      console.log(this.basicInfoObj.payment)
      if (!this.basicInfoObj.payment) return this.$message({
        type: 'error',
        message: '付款方式为必填!'
      })
      console.log(this.basicInfoObj)
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
      width: 200px;
      white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
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
