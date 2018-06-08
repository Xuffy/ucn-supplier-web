<template>
  <div>
    <el-button type="primary" size="mini" @click.stop="$emit('addPayment')">{{ $i.logistic.applyForPayment }}</el-button>
    <el-table :data="tableData" border style="width: 100%; margin-top: 20px" show-summary :sum-text="$i.logistic.sum" :summary-method="summaryMethod">
      <el-table-column type="index" width="50" align="center"/>
      <el-table-column :label="$i.logistic.paymentNo" align="center" width="140">
        <template slot-scope="scope">
          <span>{{ scope.row.no }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$i.logistic.paymentItem" align="center" width="140">
        <template slot-scope="scope">
          <el-input placeholder="请输入内容" v-model="scope.row.name" v-if="scope.row.edit"></el-input>
          <span v-else>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$i.logistic.supplierName" align="center" width="140">
        <template slot-scope="scope">
          <!-- <el-select v-model="scope.row.payToId" placeholder="请输入内容" :clearable="true" v-if="scope.row.edit">
            <el-option :label="item.skuSupplierName" :value="item.skuSupplierId" v-for="item of selectArr.supplier" :key="'supplier-arr-' + item.supplierId" v-if="selectArr.supplier"/>
          </el-select> -->
          <el-col v-if="scope.row.edit">
            <el-autocomplete
              class="inline-input"
              v-model="scope.row.payToId"
              :fetch-suggestions="querySearch"
              placeholder="请输入内容"
              :trigger-on-focus="false"
            ></el-autocomplete>
          </el-col>
          <span v-else>{{ computedCurrency('supplier', 'skuSupplierId', 'skuSupplierName', scope.row.payToId) }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$i.logistic.estPayDate" align="center" width="260">
        <template slot-scope="scope">
          <!-- <el-input placeholder="请输入内容" v-model="scope.row.planPayDt" v-if="edit"></el-input> -->
          <el-date-picker v-if="scope.row.edit" v-model="scope.row.planPayDt" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions"/>
          <span v-else>{{ scope.row.planPayDt ? $dateFormat(scope.row.planPayDt, 'yyyy-mm-dd') : null }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$i.logistic.estAmount" align="center" width="180">
        <template slot-scope="scope">
          <el-input placeholder="请输入内容" v-model="scope.row.planPayAmount" v-if="scope.row.edit"></el-input>
          <span v-else>{{ scope.row.planPayAmount }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$i.logistic.actPayDate" align="center" width="260">
        <template slot-scope="scope">
          <el-date-picker v-if="scope.row.edit" v-model="scope.row.actualPayDt" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions"/>
          <!-- <el-input placeholder="请输入内容" v-model="scope.row.actPayDate" v-if="edit"></el-input> -->
          <span v-else>{{ scope.row.actualPayDt ? $dateFormat(scope.row.actualPayDt, 'yyyy-mm-dd') : null }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$i.logistic.actAmount" align="center" width="180">
        <template slot-scope="scope">
          <el-input placeholder="请输入内容" v-model="scope.row.actualPayAmount" v-if="scope.row.edit"></el-input>
          <span v-else>{{ scope.row.actualPayAmount }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$i.logistic.currency" align="center" width="180">
        <template slot-scope="scope">
          <!-- <el-input placeholder="请输入内容" v-model="scope.row.currencyCode" v-if="scope.row.edit"></el-input> -->
          <!-- <span v-else>{{ scope.row.currencyCode }}</span> -->
          <span>{{ computedCurrency('exchangeCurrency', 'code', 'name', scope.row.currencyCode)}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$i.logistic.avilable" align="center" width="200">
        <template slot-scope="scope">
          <span>{{ paymentDec.find(a => a.code === scope.row.status).name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$i.logistic.operation" align="center" width="200" fixed="right">
        <template slot-scope="scope">
          <!-- <div v-if="!scope.row.edit">
            <el-button size="mini" type="primary" @click.stop="$emit('savePayment', scope.$index)">保存</el-button>
            <el-button size="mini" type="primary" @click.stop="$emit('deletePaymentList', scope.$index)">取消</el-button>
          </div> -->
          <div v-if="scope.row.status === -1">
            <el-button size="mini" type="primary" @click.stop="switchStatus(scope.$index, $apis.recover_plan_payment)">恢复</el-button>
          </div>
          <div v-if="scope.row.status === 20 || scope.row.status === 40">
            <div v-if="scope.row.edit">
              <el-button size="mini" type="primary" @click.stop="$emit('savePayment', scope.$index)">{{ $i.logistic.save }}</el-button>
              <el-button size="mini" type="primary" @click.stop="cancelPaymentModify(scope.$index)">{{ $i.logistic.cancel }}</el-button>
            </div>
            <div v-else>
              <el-button size="mini" type="primary" @click.stop="switchModify(scope.$index)">{{ $i.logistic.modify }}</el-button>
              <el-button size="mini" type="primary" @click.stop="switchStatus(scope.$index, $apis.abandon_plan_payment)">{{ $i.logistic.invalid }}</el-button>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  props: {
    tableData: {
      type: Array,
      default () {
        return []
      }
    },
    currencyCode: String,
    selectArr: {
      type: Object,
      default: () => {}
    },
    paymentSum: {
      type: Object,
      default: () => {}
    },
    edit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      copyPaymentObj: {},
      paymentDec: [
        {
          code: -1,
          name: this.$i.logistic.confirmed
        },
        {
          code: 10,
          name: this.$i.logistic.tbcc
        },
        {
          code: 20,
          name: this.$i.logistic.tbcs
        },
        {
          code: 30,
          name: this.$i.logistic.tbcsp
        },
        {
          code: 40,
          name: this.$i.logistic.confirmed
        }
      ],
      pickerOptions: {
        // disabledDate(time) {
        //   return time.getTime() > Date.now();
        // },
        shortcuts: [{
          text: 'Today',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: 'Yesterday',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: 'A week ago',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
    }
  },
  computed:{
    restaurants(){
      return this.selectArr.supplier;
    }
  },
  methods: {
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    summaryMethod () {
      let SumArr = [this.$i.logistic.sum]
      if (!this.paymentSum) return SumArr

      SumArr[5] = this.paymentSum.planPayAmount
      SumArr[7] = this.paymentSum.actualPayAmount
      SumArr[8] = this.computedCurrency('exchangeCurrency', 'code', 'name', this.paymentSum.currencyCode)
      return SumArr
    },
    computedCurrency (key, findKey, returnKey,currencyCode) {
      if (!this.selectArr[key]) return null
      const obj = this.selectArr[key].find(a => a[findKey] === currencyCode)
      return obj ? obj[returnKey] : null
    },
    switchModify (i) {
      this.copyPaymentObj = this.tableData[i]
      this.$emit('updatePaymentWithView', { i, edit: true })
    },
    cancelPaymentModify (i) {
      if (!this.tableData[i].id) return this.tableData.splice(i, 1)
      this.$emit('updatePaymentWithView', { i, edit: false })
    },
    switchStatus (i, url) {
      this.$ajax.post(`${url}/${this.tableData[i].id}?version=${this.tableData[i].version}`).then(({ status }) => {
        this.$emit('updatePaymentWithView', { i, edit: false, status })
      })
    },
  }
}
</script>
