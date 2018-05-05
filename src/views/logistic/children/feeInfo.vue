<template>
  <el-table :data="tableData" border style="width: 100%; margin-top: 20px" tooltip-effect="dark">
    <el-table-column :label="$i.logistic.fclTransportCharge" align="center" width="180">
      <template slot-scope="scope">
        <el-input placeholder="请输入内容" v-model="scope.row.fclTransportCharge" v-if="edit"></el-input>
        <span v-else>{{ scope.row.fclTransportCharge }}</span>
      </template>
    </el-table-column>
    <el-table-column :label="$i.logistic.fclTransportChargeCurrency" align="center" width="220">
      <template slot-scope="scope">
        <el-input placeholder="请输入内容" v-model="scope.row.fclTransportChargeCurrency" v-if="edit"></el-input>
        <span v-else>{{ scope.row.fclTransportChargeCurrency }}</span>
      </template>
    </el-table-column>
    <el-table-column :label="$i.logistic.handlingCharges" align="center" width="180">
      <template slot-scope="scope">
        <el-input placeholder="请输入内容" v-model="scope.row.handlingCharge" v-if="edit"></el-input>
        <span v-else>{{ scope.row.handlingCharge }}</span>
      </template>
    </el-table-column>
    <el-table-column :label="$i.logistic.handlingChargesCurrency" align="center" width="220">
      <template slot-scope="scope">
        <el-input placeholder="请输入内容" v-model="scope.row.handlingChargesCurrency" v-if="edit"></el-input>
        <span v-else>{{ scope.row.handlingChargesCurrency }}</span>
      </template>
    </el-table-column>
    <el-table-column :label="$i.logistic.otherPortCharges" align="center" width="180">
      <template slot-scope="scope">
        <el-input placeholder="请输入内容" v-model="scope.row.otherPortCharge" v-if="edit"></el-input>
        <span v-else>{{ scope.row.otherPortCharge }}</span>
      </template>
    </el-table-column>
    <el-table-column :label="$i.logistic.otherPortChargesCurrency" align="center" width="240">
      <template slot-scope="scope">
        <el-input placeholder="请输入内容" v-model="scope.row.otherPortChargeCurrency" v-if="edit"></el-input>
        <span v-else>{{ scope.row.otherPortChargeCurrency }}</span>
      </template>
    </el-table-column>
    <el-table-column :label="$i.logistic.oceanFreight" align="center" width="180">
      <template slot-scope="scope">
        <el-input placeholder="请输入内容" v-model="scope.row.oceanFreight" v-if="edit"></el-input>
        <span v-else>{{ scope.row.oceanFreight }}</span>
      </template>
    </el-table-column>
    <el-table-column :label="$i.logistic.oceanFreightCurrency" align="center" width="180">
      <template slot-scope="scope">
        <el-input placeholder="请输入内容" v-model="scope.row.oceanFreightCurrency" v-if="edit"></el-input>
        <span v-else>{{ scope.row.oceanFreightCurrency }}</span>
      </template>
    </el-table-column>
    <el-table-column :label="$i.logistic.insuranceCharges" align="center" width="180">
      <template slot-scope="scope">
        <el-input placeholder="请输入内容" v-model="scope.row.insuranceCharge" v-if="edit"></el-input>
        <span v-else>{{ scope.row.insuranceCharge }}</span>
      </template>
    </el-table-column>
    <el-table-column :label="$i.logistic.insuranceChargesCurrency" align="center" width="240">
      <template slot-scope="scope">
        <el-input placeholder="请输入内容" v-model="scope.row.insuranceChargeCurrency" v-if="edit"></el-input>
        <span v-else>{{ scope.row.insuranceChargeCurrency }}</span>
      </template>
    </el-table-column>
    <el-table-column :label="$i.logistic.otherCharges1" align="center" width="180">
      <template slot-scope="scope">
        <el-input placeholder="请输入内容" v-model="scope.row.otherCharges1" v-if="edit"></el-input>
        <span v-else>{{ scope.row.otherCharges1 }}</span>
      </template>
    </el-table-column>
    <el-table-column :label="$i.logistic.otherChargesCurrency1" align="center" width="180">
      <template slot-scope="scope">
        <el-input placeholder="请输入内容" v-model="scope.row.otherChargesCurrency1" v-if="edit"></el-input>
        <span v-else>{{ scope.row.otherChargesCurrency1 }}</span>
      </template>
    </el-table-column>
    <el-table-column :label="$i.logistic.otherChargesRemark1" align="center" width="180">
      <template slot-scope="scope">
        <el-input placeholder="请输入内容" v-model="scope.row.otherChargesRemark1" v-if="edit"></el-input>
        <span v-else>{{ scope.row.otherChargesRemark1 }}</span>
      </template>
    </el-table-column>
    <el-table-column :label="$i.logistic.otherChargesRemark1" align="center" width="180">
      <template slot-scope="scope">
        <el-input placeholder="请输入内容" v-model="scope.row.otherChargesRemark1" v-if="edit"></el-input>
        <span v-else>{{ scope.row.otherChargesRemark1 }}</span>
      </template>
    </el-table-column>
    <el-table-column :label="$i.logistic.otherCharges2" align="center" width="180">
      <template slot-scope="scope">
        <el-input placeholder="请输入内容" v-model="scope.row.otherCharges2" v-if="edit"></el-input>
        <span v-else>{{ scope.row.otherCharges2 }}</span>
      </template>
    </el-table-column>
    <el-table-column :label="$i.logistic.otherChargesCurrency2" align="center" width="180">
      <template slot-scope="scope">
        <el-input placeholder="请输入内容" v-model="scope.row.otherChargesCurrency2" v-if="edit"></el-input>
        <span v-else>{{ scope.row.otherChargesCurrency2 }}</span>
      </template>
    </el-table-column>
    <el-table-column :label="$i.logistic.otherChargesRemark2" align="center" width="180">
      <template slot-scope="scope">
        <el-input placeholder="请输入内容" v-model="scope.row.otherChargesRemark2" v-if="edit"></el-input>
        <span v-else>{{ scope.row.otherChargesRemark2 }}</span>
      </template>
    </el-table-column>
    <el-table-column :label="$i.logistic.commissionCharges" align="center" width="180">
      <template slot-scope="scope">
        <el-input placeholder="请输入内容" v-model="scope.row.commissionCharges" v-if="edit"></el-input>
        <span v-else>{{ scope.row.commissionCharges }}</span>
      </template>
    </el-table-column>
  </el-table>
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
    edit: {
      type: Boolean,
      default: false
    }
  }
}
</script>
