<template>
  <div>
    <div class="tab-wrap">
      <el-table :cell-class-name="lightHight" :data="tableData" ref="table" border style="width: 100%; margin-top: 20px" 
        show-summary 
        :summary-method="summaryMethod"
        @selection-change="handleSelectionChange" 
        :row-class-name="tableRowClassName">
        <!-- <el-table-column type="selection" width="100" align="center" class-name="checkbox-no-margin" v-if="isShow"/> -->
        <el-table-column type="index" width="100" align="center"/>
        <el-table-column :label="$i.logistic.containerNo" width="140" align="center" prop='{"key":"containerNo","total":false}'>
          <template slot-scope="scope">
            <el-input :placeholder="$i.logistic.pleaseChoose" v-model="scope.row.containerNo" v-if="isShow" @change="ContainerInfoLight('containerNo',scope.row.containerNo,scope.$index,scope)"></el-input>
            <span v-else>{{ scope.row.containerNo }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$i.logistic.sealNo" width="120" align="center" prop='{"key":"sealNo","total":false}'>
          <template slot-scope="scope">
            <el-input :placeholder="$i.logistic.pleaseChoose" v-model="scope.row.sealNo" v-if="isShow" @change="ContainerInfoLight('sealNo',scope.row.sealNo,scope.$index,scope)"></el-input>
            <span v-else>{{ scope.row.sealNo }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$i.logistic.containerWeight" width="150" prop='{"key":"containerWeight","total":true}' align="center">
          <template slot-scope="scope">
            <v-input-number
              v-model="scope.row.containerWeight"
              :min="0"
              :controls="false"
              :accuracy="2"
              :mark="$i.logistic.containerWeight"
              :placeholder="$i.logistic.placeholder"
              @change="ContainerInfoLight('containerWeight',scope.row.containerWeight,scope.$index,scope)"
              v-if="isShow"></v-input-number>
            <span v-else>{{ scope.row.containerWeight }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$i.logistic.containerType" width="140" align="center" prop='{"key":"containerType","total":true}'>
          <template slot-scope="scope">
            <span>{{ scope.row.containerType }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$i.logistic.vgm" width="120" align="center" prop='{"key":"vgm","total":true}'>
          <template slot-scope="scope">
            <span>{{ scope.row.vgm }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$i.logistic.totalQuantityOfOuterCartonsInContainer" width="300" prop='{"key":"totalContainerOuterCartonsQty","total":true}' align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.totalContainerOuterCartonsQty || 0 }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$i.logistic.totalQuantityInContainer" width="200" prop='{"key":"totalContainerQty","total":true}' align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.totalContainerQty }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$i.logistic.totalVolumeInContainer" width="200" prop='{"key":"totalContainerVolume","total":true}' align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.totalContainerVolume || 0 }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$i.logistic.totalNetWeightInContainer" width="200" prop='{"key":"totalContainerNetWeight","total":true}' align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.totalContainerNetWeight || 0 }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$i.logistic.totalContainerGrossWeight" width="200" prop='{"key":"totalContainerGrossWeight","total":true}' align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.totalContainerGrossWeight || 0 }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$i.logistic.USD" width="100" prop='{"key":"valueUsd","total":true}' align="center">
          <template slot-scope="scope">
            <!-- <el-input placeholder="请输入内容" v-model="scope.row.totalContainerSkuPrice" v-if="edit"></el-input> -->
            <span>{{ scope.row.valueUsd || 0 }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$i.logistic.CNY" width="100" prop='{"key":"valueRmb","total":true}' align="center">
          <template slot-scope="scope">
            <!-- <el-input placeholder="请输入内容" v-model="scope.row.totalContainerSkuPrice" v-if="edit"></el-input> -->
            <span>{{ scope.row.valueRmb || 0 }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$i.logistic.EUR" width="100" prop='{"key":"valueEur","total":true}' align="center">
          <template slot-scope="scope">
            <!-- <el-input placeholder="请输入内容" v-model="scope.row.totalContainerSkuPrice" v-if="edit"></el-input> -->
            <span>{{ scope.row.valueEur || 0 }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import  VInputNumber  from '../../../components/common/inputNumber/index.vue';
export default {
  components:{
    VInputNumber
  },
  props: {
    currencyCode:[String,Number],
    beShipper:[String,Number,Boolean],
    ExchangeRateInfoArr:[Array,Object],
    edit: {
      type: Boolean,
      default: false
    },
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
    containerType: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      isShow:false,
      containerNo: '',
      containerSelect: ''
    }
  },
  computed:{
    returnData(){
      let arr = this.$depthClone(this.matchData).map(el=> {el.fieldDisplay={}; return el } );
      return arr;
    }
  },
  methods: {
    //高亮
    ContainerInfoLight(key,v,index,scope){
      if(key=='containerNo'){
        this.matchData.forEach((el,index)=>{
          if(scope.$index != index){ 
            if(el.containerNo == scope.row.containerNo&&scope.row.containerNo!=''){
              scope.row.containerNo='';
              this.$message({
                message: this.$i.logistic.dataIsExist,
                type: 'error'
              })
            };
          }
        })
      }
      this.returnData[index].fieldDisplay[key] = v;
      this.returnData[index][key] = v;
      if(this.matchData[index][key]==v){
        delete this.returnData[index].fieldDisplay[key];
      }
      let cloneReturnData = this.$depthClone(this.returnData[index]);
      let cloneTableData = this.$depthClone(this.matchData[index]);
      //特殊处理 containerWeight字段 后台是数字类型 强行先转一次字符串    
      cloneTableData.containerWeight = cloneReturnData.containerWeight.toString();
      delete cloneReturnData.isModify
      delete cloneTableData.isModify
      if(_.isEqual(cloneReturnData, cloneTableData)){
        this.returnData[index].isModify = false;
      }else{
        this.returnData[index].isModify = true;
      }
      this.$emit('ContainerInfoLight',this.returnData);
    },
    lightHight({row, column, rowIndex, columnIndex}){
      if(column.property&&row.fieldDisplay){
        if( JSON.parse(column.property).key in row.fieldDisplay){
          return 'lightHight'
        }
      }
    },
    handleSelectionChange (val) {
      this.$emit('handleSelectionChange', val.map(a => a))
    },
    tableRowClassName({row, rowIndex}) {
      row.index = rowIndex;
      
    },
    summaryMethod (param) {
      const {columns,data} = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = this.$i.logistic.sum;
            return;
          }
          const values = data.map(item => Number(item[column.property&&JSON.parse(column.property).key]));
          //提取data 拼接成汇率的key 
          const currencyCode = data.map(item => {
            if(item.exchangeCurrency!=this.currencyCode){
              return item.exchangeCurrency+this.currencyCode;
            }else{
              return this.currencyCode; 
            }
          });
          let currencyCodeArr = [];
          //拿到拼接的key 匹配汇率的key 推入数组
          currencyCode.forEach((item)=>{
            this.ExchangeRateInfoArr.forEach((findItem)=>{
              if(findItem.key==item){
                currencyCodeArr.push(findItem.value)
              }
            })
            if(item == this.currencyCode){
              currencyCodeArr.push(1)
            }
          })
          if (!values.every(value => isNaN(value))&&column.property&&JSON.parse(column.property).total) {
            sums[index] = values.reduce((prev, curr,i) => {
              const value = Number(curr);
              if(column.property=="totalContainerSkuPrice"){
                if (!isNaN(value)) {
                  return this.$calc.add(prev , this.$calc.multiply(curr,currencyCodeArr[i]));
                } else {
                  return prev;
                }
              }else{
                return this.$calc.add(prev , curr || 0);
              }
            }, 0);
            sums[index] += 0;
          } else {
            sums[index] = '--';
          }
        });

        return sums;
    },
  },
  watch:{
    edit(v){
      if(v){
        if(this.beShipper==1){
          if(this.$route.name=='loadingListDetail'){
            this.isShow = false;
          }else{
            this.isShow = true;
          }
        }else{
          this.isShow = false;
        }
      }else{
        this.isShow = false;
      }
    }
  }
}
</script>
<style lang="less" scoped>
.btn-wraps {
  padding:10px 0;
}
.tab-wrap{
  /deep/.lightHight{
    background: yellow;
  }
}
</style>
