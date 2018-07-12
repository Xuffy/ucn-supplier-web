<template>
  <el-table :data="tableData" :cell-class-name="lightHight" border style="width: 100%; margin-top: 20px" tooltip-effect="dark" class="fee-info">
    <el-table-column :label="$i.logistic.fclTransportCharge" align="center" width="180" prop="fclTransportCharge">
      <template slot-scope="scope">
        <el-input placeholder="请输入内容" v-model="scope.row.fclTransportCharge" v-if="edit" @change="feeInfoLight('fclTransportCharge',scope.row.fclTransportCharge,scope.$index)"></el-input>
        <div class="table-cell" v-else>{{ scope.row.fclTransportCharge }}</div>
      </template>
    </el-table-column>
    <el-table-column :label="$i.logistic.fclTransportChargeCurrency" align="center" width="220" prop="fclTransportChargeCurrency">
      <template slot-scope="scope">
        <el-select v-model="scope.row.fclTransportChargeCurrency" placeholder="请输入内容" v-if="edit" @change="feeInfoLight('fclTransportChargeCurrency',scope.row.fclTransportChargeCurrency,scope.$index)">
          <el-option :label="item.name" :value="item.code" v-for="item of selectArr.exchangeCurrency" :key="'el-option-' + item.code" />
        </el-select>
        <div class="table-cell" v-else>{{ Currency(scope.row.fclTransportChargeCurrency) }}</div>
      </template>
    </el-table-column>
    <el-table-column :label="$i.logistic.handlingCharges" align="center" width="180" prop="handlingCharge">
      <template slot-scope="scope">
        <el-input placeholder="请输入内容" v-model="scope.row.handlingCharge" v-if="edit" @change="feeInfoLight('handlingCharge',scope.row.handlingCharge,scope.$index)"></el-input>
        <div class="table-cell" v-else>{{ scope.row.handlingCharge }}</div>
      </template>
    </el-table-column>
    <el-table-column :label="$i.logistic.handlingChargesCurrency" align="center" width="220" prop="handlingChargesCurrency">
      <template slot-scope="scope">
        <el-select v-model="scope.row.handlingChargesCurrency" placeholder="请输入内容" v-if="edit"  @change="feeInfoLight('handlingChargesCurrency',scope.row.handlingChargesCurrency,scope.$index)">
          <el-option :label="item.name" :value="item.code" v-for="item of selectArr.exchangeCurrency" :key="'el-option-' + item.code" />
        </el-select>
        <div class="table-cell" v-else>{{ Currency(scope.row.handlingChargesCurrency) }}</div>
      </template>
    </el-table-column>
    <el-table-column :label="$i.logistic.otherPortCharges" align="center" width="180" prop="otherPortCharge">
      <template slot-scope="scope">
        <el-input placeholder="请输入内容" v-model="scope.row.otherPortCharge" v-if="edit"  @change="feeInfoLight('otherPortCharge',scope.row.otherPortCharge,scope.$index)"></el-input>
        <div class="table-cell" v-else>{{ scope.row.otherPortCharge }}</div>
      </template>
    </el-table-column>
    <el-table-column :label="$i.logistic.otherPortChargesCurrency" align="center" width="240" prop="otherPortChargeCurrency">
      <template slot-scope="scope">
        <el-select v-model="scope.row.otherPortChargeCurrency" placeholder="请输入内容" v-if="edit" @change="feeInfoLight('otherPortChargeCurrency',scope.row.otherPortChargeCurrency,scope.$index)">
          <el-option :label="item.name" :value="item.code" v-for="item of selectArr.exchangeCurrency" :key="'el-option-' + item.code" />
        </el-select>
        <div class="table-cell" v-else>{{ Currency(scope.row.otherPortChargeCurrency) }}</div>
      </template>
    </el-table-column>
    <el-table-column :label="$i.logistic.oceanFreight" align="center" width="180" prop="oceanFreight">
      <template slot-scope="scope">
        <el-input placeholder="请输入内容" v-model="scope.row.oceanFreight" v-if="edit" @change="feeInfoLight('oceanFreight',scope.row.oceanFreight,scope.$index)"></el-input>
        <span v-else>{{ scope.row.oceanFreight }}</span>
      </template>
    </el-table-column>
    <el-table-column :label="$i.logistic.oceanFreightCurrency" align="center" width="180" prop="oceanFreightCurrency">
      <template slot-scope="scope">
        <el-select v-model="scope.row.oceanFreightCurrency" placeholder="请输入内容" v-if="edit" @change="feeInfoLight('oceanFreightCurrency',scope.row.oceanFreightCurrency,scope.$index)">
          <el-option :label="item.name" :value="item.code" v-for="item of selectArr.exchangeCurrency" :key="'el-option-' + item.code" />
        </el-select>
        <div class="table-cell" v-else>{{ Currency(scope.row.oceanFreightCurrency) }}</div>
      </template>
    </el-table-column>
    <el-table-column :label="$i.logistic.insuranceCharges" align="center" width="180" prop="insuranceCharge">
      <template slot-scope="scope">
        <el-input placeholder="请输入内容" v-model="scope.row.insuranceCharge" v-if="edit" @change="feeInfoLight('insuranceCharge',scope.row.insuranceCharge,scope.$index)"></el-input>
        <div class="table-cell" v-else>{{ scope.row.insuranceCharge }}</div>
      </template>
    </el-table-column>
    <el-table-column :label="$i.logistic.insuranceChargesCurrency" align="center" width="240" prop="insuranceChargeCurrency">
      <template slot-scope="scope">
        <el-select v-model="scope.row.insuranceChargeCurrency" placeholder="请输入内容" v-if="edit" @change="feeInfoLight('insuranceChargeCurrency',scope.row.insuranceChargeCurrency,scope.$index)">
          <el-option :label="item.name" :value="item.code" v-for="item of selectArr.exchangeCurrency" :key="'el-option-' + item.code" />
        </el-select>
        <div class="table-cell" v-else>{{ Currency(scope.row.insuranceChargeCurrency) }}</div>
      </template>
    </el-table-column>
    <el-table-column :label="$i.logistic.otherCharges1" align="center" width="180" prop="otherCharges1">
      <template slot-scope="scope">
        <el-input placeholder="请输入内容" v-model="scope.row.otherCharges1" v-if="edit"  @change="feeInfoLight('otherCharges1',scope.row.otherCharges1,scope.$index)"></el-input>
        <div class="table-cell" v-else>{{ scope.row.otherCharges1 }}</div>
      </template>
    </el-table-column>
    <el-table-column :label="$i.logistic.otherChargesCurrency1" align="center" width="180" prop="otherChargesCurrency1">
      <template slot-scope="scope">
        <el-select v-model="scope.row.otherChargesCurrency1" placeholder="请输入内容" v-if="edit" @change="feeInfoLight('otherChargesCurrency1',scope.row.otherChargesCurrency1,scope.$index)">
          <el-option :label="item.name" :value="item.code" v-for="item of selectArr.exchangeCurrency" :key="'el-option-' + item.code" />
        </el-select>
        <div class="table-cell" v-else>{{ Currency(scope.row.otherChargesCurrency1) }}</div>
      </template>
    </el-table-column>
    <el-table-column :label="$i.logistic.otherChargesRemark1" align="center" width="180" prop="otherChargesRemark1">
      <template slot-scope="scope">
        <el-input placeholder="请输入内容" v-model="scope.row.otherChargesRemark1" v-if="edit" @change="feeInfoLight('otherChargesRemark1',scope.row.otherChargesRemark1,scope.$index)"></el-input>
        <div class="table-cell" v-else>{{ scope.row.otherChargesRemark1 }}</div>
      </template>
    </el-table-column>
    <el-table-column :label="$i.logistic.otherCharges2" align="center" width="180" prop="otherCharges2">
      <template slot-scope="scope">
        <el-input placeholder="请输入内容" v-model="scope.row.otherCharges2" v-if="edit" @change="feeInfoLight('otherCharges2',scope.row.otherCharges2,scope.$index)"></el-input>
        <div class="table-cell" v-else>{{ scope.row.otherCharges2 }}</div>
      </template>
    </el-table-column>
    <el-table-column :label="$i.logistic.otherChargesCurrency2" align="center" width="180" prop="otherChargesCurrency2">
      <template slot-scope="scope">
        <el-select v-model="scope.row.otherChargesCurrency2" placeholder="请输入内容" v-if="edit" @change="feeInfoLight('otherChargesCurrency2',scope.row.otherChargesCurrency2,scope.$index)">
          <el-option :label="item.name" :value="item.code" v-for="item of selectArr.exchangeCurrency" :key="'el-option-' + item.code" />
        </el-select>
        <div class="table-cell" v-else>{{ Currency(scope.row.otherChargesCurrency2) }}</div>
      </template>
    </el-table-column>
    <el-table-column :label="$i.logistic.otherChargesRemark2" align="center" width="180" prop="otherChargesRemark2">
      <template slot-scope="scope">
        <el-input placeholder="请输入内容" v-model="scope.row.otherChargesRemark2" v-if="edit" @change="feeInfoLight('otherChargesRemark2',scope.row.otherChargesRemark2,scope.$index)"></el-input>
        <div class="table-cell" v-else>{{ scope.row.otherChargesRemark2 }}</div>
      </template>
    </el-table-column>
    <el-table-column :label="$i.logistic.commissionCharges" align="center" width="180" prop="commissionCharges">
      <template slot-scope="scope">
        <el-input placeholder="请输入内容" v-model="scope.row.commissionCharges" v-if="edit" @change="feeInfoLight('commissionCharges',scope.row.commissionCharges,scope.$index)"></el-input>
        <div class="table-cell" v-else>{{ scope.row.commissionCharges }}</div>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  data(){
    return {
      feeInfoLightObj:{}
    }
  },
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
    },
    selectArr:[Array,Object]
  },
  methods:{
    //高亮
    feeInfoLight(key,v,index){
      this.feeInfoLightObj[key] = v;
      this.$emit('feeInfoLight',this.feeInfoLightObj,index);
    },
    lightHight({row, column, rowIndex, columnIndex}){
      if(column.property&&row.fieldDisplay){
        if(column.property in row.fieldDisplay){
          return 'lightHight'
        }
      }
    },
    //币种 code name 转换
    Currency(code){
      return this.selectArr.exchangeCurrency.find(el=> el.code == code )&&this.selectArr.exchangeCurrency.find(el=> el.code == code ).name;
    }
  }
}
</script>
<style lang="less" scoped>
  .table-cell{
    height: 24px;
  }
  .fee-info{
    /deep/.lightHight{
      background: yellow;
    }
  }
</style>
