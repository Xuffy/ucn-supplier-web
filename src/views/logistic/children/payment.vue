<template>
  <div>
    <el-button type="primary" size="mini">{{ $i.logistic.applyForPayment }}</el-button>
    <el-table :data="tableData" border style="width: 100%; margin-top: 20px" show-summary :sum-text="$i.logistic.sum" :summary-method="summaryMethod">
      <el-table-column type="index" width="50" align="center"/>
      <el-table-column :label="$i.logistic.paymentNumber" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.no }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$i.logistic.paymentItem" align="center">
        <template slot-scope="scope">
          <el-input placeholder="请输入内容" v-model="scope.row.name" v-if="edit"></el-input>
          <span v-else>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$i.logistic.estPayDate" align="center" width="260">
        <template slot-scope="scope">
          <!-- <el-input placeholder="请输入内容" v-model="scope.row.planPayDt" v-if="edit"></el-input> -->
          <el-date-picker v-if="edit" v-model="scope.row.planPayDt" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions"/>
          <span v-else>{{ scope.row.planPayDt ? $dateFormat(scope.row.planPayDt, 'yyyy-mm-dd') : null }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$i.logistic.estAmount" align="center">
        <template slot-scope="scope">
          <el-input placeholder="请输入内容" v-model="scope.row.planPayAmount" v-if="edit"></el-input>
          <span v-else>{{ scope.row.planPayAmount }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$i.logistic.actPayDate" align="center" width="260">
        <template slot-scope="scope">
          <el-date-picker v-if="edit" v-model="scope.row.actualPayDt" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions"/>
          <!-- <el-input placeholder="请输入内容" v-model="scope.row.actPayDate" v-if="edit"></el-input> -->
          <span v-else>{{ scope.row.actualPayDt ? $dateFormat(scope.row.actualPayDt, 'yyyy-mm-dd') : null }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$i.logistic.actAmount" align="center">
        <template slot-scope="scope">
          <el-input placeholder="请输入内容" v-model="scope.row.actualPayAmount" v-if="edit"></el-input>
          <span v-else>{{ scope.row.actualPayAmount }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$i.logistic.currency" align="center">
        <template slot-scope="scope">
          <el-input placeholder="请输入内容" v-model="scope.row.currencyCode" v-if="edit"></el-input>
          <span v-else>{{ scope.row.currencyCode }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$i.logistic.avilable" align="center">
        <template slot-scope="scope">
          <!-- <el-input placeholder="请输入内容" v-model="scope.row.status" v-if="edit"></el-input> -->
          <span>{{ scope.row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$i.logistic.operation" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary">修改</el-button>
          <el-button size="mini" type="warning">恢复</el-button>
          <el-button size="mini" type="success">确认</el-button>
          <el-button size="mini" type="danger">作废</el-button>
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
      }
    }
  },
  methods: {
    summaryMethod () {
      let SumArr = [this.$i.logistic.sum]
      SumArr[4] = this.paymentSum.planPayAmount
      SumArr[6] = this.paymentSum.actualPayAmount
      SumArr[7] = this.paymentSum.currencyCode
      return SumArr
    }
  }
}
</script>
<style lang="less" scoped>
  
</style>
