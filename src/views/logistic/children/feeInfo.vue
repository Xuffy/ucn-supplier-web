<template>
  <el-table :data="tableData" :cell-class-name="lightHight" border style="width: 100%; margin-top: 20px" tooltip-effect="dark" class="fee-info">
    <el-table-column :label="$i.logistic.fclTransportCharge" align="center" width="180" prop="fclTransportCharge">
      <template slot-scope="scope">
        <v-input-number
          v-model="scope.row.fclTransportCharge"
          :min="0"
          :controls="false"
          :accuracy="4"
          :mark="$i.logistic.fclTransportCharge"
          :placeholder="$i.logistic.placeholder"
          @change="feeInfoLight('fclTransportCharge',scope.row.fclTransportCharge,scope.$index)"
          v-if="edit"></v-input-number>
        <div class="table-cell" v-else>{{ scope.row.fclTransportCharge }}</div>
      </template>
    </el-table-column>
    <el-table-column :label="$i.logistic.fclTransportChargeCurrency" align="center" width="220" prop="fclTransportChargeCurrency">
      <template slot-scope="scope">
        <el-select v-model="scope.row.fclTransportChargeCurrency" :placeholder="$i.logistic.pleaseChoose" v-if="edit" @change="feeInfoLight('fclTransportChargeCurrency',scope.row.fclTransportChargeCurrency,scope.$index)">
          <el-option :label="item.name" :value="item.code" v-for="item of selectArr.exchangeCurrency" :key="'el-option-' + item.code" />
        </el-select>
        <div class="table-cell" v-else>{{ Currency(scope.row.fclTransportChargeCurrency) }}</div>
      </template>
    </el-table-column>
    <el-table-column :label="$i.logistic.handlingCharges" align="center" width="180" prop="handlingCharge">
      <template slot-scope="scope">
        <v-input-number
          v-model="scope.row.handlingCharge"
          :min="0"
          :controls="false"
          :accuracy="4"
          :mark="$i.logistic.handlingCharges"
          :placeholder="$i.logistic.placeholder"
          @change="feeInfoLight('handlingCharge',scope.row.handlingCharge,scope.$index)"
          v-if="edit"></v-input-number>
        <div class="table-cell" v-else>{{ scope.row.handlingCharge }}</div>
      </template>
    </el-table-column>
    <el-table-column :label="$i.logistic.handlingChargesCurrency" align="center" width="220" prop="handlingChargesCurrency">
      <template slot-scope="scope">
        <el-select v-model="scope.row.handlingChargesCurrency" :placeholder="$i.logistic.pleaseChoose" v-if="edit"  @change="feeInfoLight('handlingChargesCurrency',scope.row.handlingChargesCurrency,scope.$index)">
          <el-option :label="item.name" :value="item.code" v-for="item of selectArr.exchangeCurrency" :key="'el-option-' + item.code" />
        </el-select>
        <div class="table-cell" v-else>{{ Currency(scope.row.handlingChargesCurrency) }}</div>
      </template>
    </el-table-column>
    <el-table-column :label="$i.logistic.otherPortCharges" align="center" width="180" prop="otherPortCharge">
      <template slot-scope="scope">
        <v-input-number
          v-model="scope.row.otherPortCharge"
          :min="0"
          :controls="false"
          :accuracy="4"
          :mark="$i.logistic.otherPortCharges"
          :placeholder="$i.logistic.placeholder"
          @change="feeInfoLight('otherPortCharge',scope.row.otherPortCharge,scope.$index)"
          v-if="edit"></v-input-number>
        <div class="table-cell" v-else>{{ scope.row.otherPortCharge }}</div>
      </template>
    </el-table-column>
    <el-table-column :label="$i.logistic.otherPortChargesCurrency" align="center" width="240" prop="otherPortChargeCurrency">
      <template slot-scope="scope">
        <el-select v-model="scope.row.otherPortChargeCurrency" :placeholder="$i.logistic.pleaseChoose" v-if="edit" @change="feeInfoLight('otherPortChargeCurrency',scope.row.otherPortChargeCurrency,scope.$index)">
          <el-option :label="item.name" :value="item.code" v-for="item of selectArr.exchangeCurrency" :key="'el-option-' + item.code" />
        </el-select>
        <div class="table-cell" v-else>{{ Currency(scope.row.otherPortChargeCurrency) }}</div>
      </template>
    </el-table-column>
    <el-table-column :label="$i.logistic.oceanFreight" align="center" width="180" prop="oceanFreight">
      <template slot-scope="scope">
        <v-input-number
          v-model="scope.row.oceanFreight"
          :min="0"
          :controls="false"
          :accuracy="4"
          :mark="$i.logistic.oceanFreight"
          :placeholder="$i.logistic.placeholder"
          @change="feeInfoLight('oceanFreight',scope.row.oceanFreight,scope.$index)"
          v-if="edit"></v-input-number>
        <span v-else>{{ scope.row.oceanFreight }}</span>
      </template>
    </el-table-column>
    <el-table-column :label="$i.logistic.oceanFreightCurrency" align="center" width="180" prop="oceanFreightCurrency">
      <template slot-scope="scope">
        <el-select v-model="scope.row.oceanFreightCurrency" :placeholder="$i.logistic.pleaseChoose" v-if="edit" @change="feeInfoLight('oceanFreightCurrency',scope.row.oceanFreightCurrency,scope.$index)">
          <el-option :label="item.name" :value="item.code" v-for="item of selectArr.exchangeCurrency" :key="'el-option-' + item.code" />
        </el-select>
        <div class="table-cell" v-else>{{ Currency(scope.row.oceanFreightCurrency) }}</div>
      </template>
    </el-table-column>
    <el-table-column :label="$i.logistic.insuranceCharges" align="center" width="180" prop="insuranceCharge">
      <template slot-scope="scope">
        <v-input-number
          v-model="scope.row.insuranceCharge"
          :min="0"
          :controls="false"
          :accuracy="4"
          :mark="$i.logistic.insuranceCharges"
          :placeholder="$i.logistic.placeholder"
          @change="feeInfoLight('insuranceCharge',scope.row.insuranceCharge,scope.$index)"
          v-if="edit"></v-input-number>
        <div class="table-cell" v-else>{{ scope.row.insuranceCharge }}</div>
      </template>
    </el-table-column>
    <el-table-column :label="$i.logistic.insuranceChargesCurrency" align="center" width="240" prop="insuranceChargeCurrency">
      <template slot-scope="scope">
        <el-select v-model="scope.row.insuranceChargeCurrency" :placeholder="$i.logistic.pleaseChoose" v-if="edit" @change="feeInfoLight('insuranceChargeCurrency',scope.row.insuranceChargeCurrency,scope.$index)">
          <el-option :label="item.name" :value="item.code" v-for="item of selectArr.exchangeCurrency" :key="'el-option-' + item.code" />
        </el-select>
        <div class="table-cell" v-else>{{ Currency(scope.row.insuranceChargeCurrency) }}</div>
      </template>
    </el-table-column>
    <el-table-column :label="$i.logistic.otherCharges1" align="center" width="180" prop="otherCharges1">
      <template slot-scope="scope">
        <v-input-number
          v-model="scope.row.otherCharges1"
          :min="0"
          :controls="false"
          :accuracy="4"
          :mark="$i.logistic.otherCharges1"
          :placeholder="$i.logistic.placeholder"
          @change="feeInfoLight('otherCharges1',scope.row.otherCharges1,scope.$index)"
          v-if="edit"></v-input-number>
        <div class="table-cell" v-else>{{ scope.row.otherCharges1 }}</div>
      </template>
    </el-table-column>
    <el-table-column :label="$i.logistic.otherChargesCurrency1" align="center" width="180" prop="otherChargesCurrency1">
      <template slot-scope="scope">
        <el-select v-model="scope.row.otherChargesCurrency1" :placeholder="$i.logistic.pleaseChoose" v-if="edit" @change="feeInfoLight('otherChargesCurrency1',scope.row.otherChargesCurrency1,scope.$index)">
          <el-option :label="item.name" :value="item.code" v-for="item of selectArr.exchangeCurrency" :key="'el-option-' + item.code" />
        </el-select>
        <div class="table-cell" v-else>{{ Currency(scope.row.otherChargesCurrency1) }}</div>
      </template>
    </el-table-column>
    <el-table-column :label="$i.logistic.otherChargesRemark1" align="center" width="180" prop="otherChargesRemark1">
      <template slot-scope="scope">
        <el-input :placeholder="$i.logistic.pleaseChoose" v-model="scope.row.otherChargesRemark1" v-if="edit" @change="feeInfoLight('otherChargesRemark1',scope.row.otherChargesRemark1,scope.$index)"></el-input>
        <div class="table-cell" v-else>{{ scope.row.otherChargesRemark1 }}</div>
      </template>
    </el-table-column>
    <el-table-column :label="$i.logistic.otherCharges2" align="center" width="180" prop="otherCharges2">
      <template slot-scope="scope">
        <el-input :placeholder="$i.logistic.pleaseChoose" v-model="scope.row.otherCharges2" v-if="edit" @change="feeInfoLight('otherCharges2',scope.row.otherCharges2,scope.$index)"></el-input>
        <div class="table-cell" v-else>{{ scope.row.otherCharges2 }}</div>
      </template>
    </el-table-column>
    <el-table-column :label="$i.logistic.otherChargesCurrency2" align="center" width="180" prop="otherChargesCurrency2">
      <template slot-scope="scope">
        <el-select v-model="scope.row.otherChargesCurrency2" :placeholder="$i.logistic.pleaseChoose" v-if="edit" @change="feeInfoLight('otherChargesCurrency2',scope.row.otherChargesCurrency2,scope.$index)">
          <el-option :label="item.name" :value="item.code" v-for="item of selectArr.exchangeCurrency" :key="'el-option-' + item.code" />
        </el-select>
        <div class="table-cell" v-else>{{ Currency(scope.row.otherChargesCurrency2) }}</div>
      </template>
    </el-table-column>
    <el-table-column :label="$i.logistic.otherChargesRemark2" align="center" width="180" prop="otherChargesRemark2">
      <template slot-scope="scope">
        <el-input :placeholder="$i.logistic.pleaseChoose" v-model="scope.row.otherChargesRemark2" v-if="edit" @change="feeInfoLight('otherChargesRemark2',scope.row.otherChargesRemark2,scope.$index)"></el-input>
        <div class="table-cell" v-else>{{ scope.row.otherChargesRemark2 }}</div>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import  VInputNumber  from '../../../components/common/inputNumber/index.vue';
export default {
  data(){
    return {
     
    }
  },
  components:{
    VInputNumber
  },
  props: {
    tableData: {
      type: Array,
      default () {
        return []
      }
    },
    matchData: {
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
  computed:{
    returnData(){
      let arr = this.$depthClone(this.matchData).map(el=> {el.fieldDisplay={}; return el } );
      return arr;
    }
  },
  methods:{
    //高亮
    feeInfoLight(key,v,index){
      this.returnData[index].fieldDisplay[key] = v;
      this.returnData[index][key] = v;
      if(this.matchData[index][key]==v){
        delete this.returnData[index].fieldDisplay[key];
      }
      let cloneReturnData = this.$depthClone(this.returnData[index]);
      let cloneTableData = this.$depthClone(this.matchData[index]);
      delete cloneReturnData.isModify
      delete cloneTableData.isModify
      if(_.isEqual(cloneReturnData, cloneTableData)){
        this.returnData[index].isModify = false;
      }else{
        this.returnData[index].isModify = true;
      }
      this.$emit('feeInfoLight',this.returnData);
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
      return this.selectArr.exchangeCurrency&&this.selectArr.exchangeCurrency.find(el=> el.code == code )&&this.selectArr.exchangeCurrency.find(el=> el.code == code ).name;
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
