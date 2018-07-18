<template>
  <div>
    <div class="tab-wrap">
      <el-table :cell-class-name="lightHight" :data="matchData" ref="table" border style="width: 100%; margin-top: 20px" 
        show-summary 
        :summary-method="summaryMethod"
        @selection-change="handleSelectionChange" 
        :row-class-name="tableRowClassName">
        <!-- <el-table-column type="selection" width="100" align="center" class-name="checkbox-no-margin" v-if="edit"/> -->
        <el-table-column type="index" width="50" align="center"/>
        <el-table-column :label="$i.logistic.containerNo" width="140" align="center" prop="containerNo">
          <template slot-scope="scope">
            <el-input placeholder="请输入内容" v-model="scope.row.containerNo" v-if="edit" @change="ContainerInfoLight('containerNo',scope.row.containerNo,scope.$index,scope)"></el-input>
            <span v-else>{{ scope.row.containerNo }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$i.logistic.sealNo" width="120" align="center" prop="sealNo">
          <template slot-scope="scope">
            <el-input placeholder="请输入内容" v-model="scope.row.sealNo" v-if="edit" @change="ContainerInfoLight('sealNo',scope.row.sealNo,scope.$index,scope)"></el-input>
            <span v-else>{{ scope.row.sealNo }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$i.logistic.containerWeight" width="140" prop="containerWeight" align="center">
          <template slot-scope="scope">
            <el-input placeholder="请输入内容" v-model="scope.row.containerWeight" v-if="edit" @change="ContainerInfoLight('containerWeight',scope.row.containerWeight,scope.$index,scope)"></el-input>
            <span v-else>{{ scope.row.containerWeight }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$i.logistic.containerType" width="140" align="center" prop="containerType">
          <template slot-scope="scope">
            <span>{{ scope.row.containerType }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$i.logistic.vgm" prop="vgm" width="120" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.vgm }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$i.logistic.totalQuantityInContainer" width="200" prop="totalContainerQty" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.totalContainerQty }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$i.logistic.totalVolumeInContainer" width="200" prop="totalContainerVolume" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.totalContainerVolume }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$i.logistic.totalNetWeightInContainer" width="200" prop="totalContainerNetWeight" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.totalContainerNetWeight }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$i.logistic.totalQuantityOfOuterCartonsInContainer" width="300" prop="totalContainerOuterCartonsQty" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.totalContainerOuterCartonsQty }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$i.logistic.totalSkuPriceInContainer" width="200" prop="totalContainerSkuPrice" align="center">
          <template slot-scope="scope">
            <el-input placeholder="请输入内容" v-model="scope.row.totalContainerSkuPrice" v-if="edit"></el-input>
            <span v-else>{{ scope.row.totalContainerSkuPrice }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$i.logistic.exchangeCurrency" width="180" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.exchangeCurrency }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      containerNo: '',
      containerSelect: '',
      ContainerInfoLightArr:[]
    }
  },
  props: {
    currencyCode:[String,Number],
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
  computed:{
    returnData(){
      return this.$depthClone(this.tableData);
    }
  },
  methods: {
    //高亮
    ContainerInfoLight(key,v,index,scope){
      if(key=='containerNo'){
        this.tableData.forEach((el,index)=>{
          if(scope.$index != index){ 
            if(el.containerNo == scope.row.containerNo&&scope.row.containerNo!=''){
              scope.row.containerNo='';
              this.$message({
                message: '集装箱号已经存在！',
                type: 'error'
              })
            };
          }
        })
      }
      this.ContainerInfoLightArr[index] = new Object(this.ContainerInfoLightArr[index]);
      this.ContainerInfoLightArr[index][key] = v;
      this.returnData[index].fieldDisplay = this.ContainerInfoLightArr[index];
      this.returnData[index][key] = v;
      this.returnData[index]['isModify'] = true;
      if(this.tableData[index][key]==v){
        delete this.returnData[index]['fieldDisplay'][key];
        this.returnData[index]['isModify'] = false;
      }
      this.$emit('ContainerInfoLight',this.returnData);
    },
    lightHight({row, column, rowIndex, columnIndex}){
      if(column.property&&row.fieldDisplay){
        if(column.property in row.fieldDisplay){
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
          const values = data.map(item => Number(item[column.property]) );
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
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr,i) => {
              const value = Number(curr);
              if(column.property=="totalContainerSkuPrice"){
                if (!isNaN(value)) {
                  return this.$numAdd(prev , this.$mul(curr,currencyCodeArr[i]));
                } else {
                  return prev;
                }
              }else{
                return this.$numAdd(prev , curr || 0);
              }
            }, 0);
            sums[index] += 0;
          } else {
            sums[index] = '--';
          }
        });

        return sums;
    },
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
