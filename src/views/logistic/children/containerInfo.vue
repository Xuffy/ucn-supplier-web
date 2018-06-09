<template>
  <div>
    <div class="btn-wraps" v-if="edit">
      <el-button type="primary" size="mini" @click.stop="$emit('arrayAppend', 'containerInfo')">{{ $i.logistic.add }}</el-button>
      <el-button type="danger" size="mini" @click.stop="$emit('deleteContainer')">{{ $i.logistic.delete }}</el-button>
    </div>
    <div class="tab-wrap">
      <el-table :data="tableData" border style="width: 100%; margin-top: 20px" show-summary tooltip-effect="dark" :sum-text="$i.logistic.sum" @selection-change="handleSelectionChange" :row-class-name="tableRowClassName">
        <el-table-column type="selection" width="100" align="center" class-name="checkbox-no-margin" v-if="edit"/>
        <el-table-column type="index" width="50" align="center"/>
        <el-table-column :label="$i.logistic.containerNo" width="140" align="center">
          <template slot-scope="scope">
            <el-input placeholder="请输入内容" v-model="scope.row.containerNo" v-if="edit"></el-input>
            <span v-else>{{ scope.row.containerNo }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$i.logistic.sealNo" prop="sealNo" width="120" align="center">
          <template slot-scope="scope">
            <el-input placeholder="请输入内容" v-model="scope.row.sealNo" v-if="edit"></el-input>
            <span v-else>{{ scope.row.sealNo }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$i.logistic.containerWeight" width="140" prop="containerWeight" align="center">
          <template slot-scope="scope">
            <el-input placeholder="请输入内容" v-model="scope.row.containerWeight" v-if="edit"></el-input>
            <span v-else>{{ scope.row.containerWeight }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$i.logistic.containerType" width="140" align="center">
          <template slot-scope="scope">
            <el-select v-model="scope.row.containerType" placeholder="请选择" v-if="edit">
              <el-option v-for="item in containerType" :key="item.id" :label="item.name" :value="item.code"/>
            </el-select>
            <span v-else>{{ scope.row.containerType }}</span>
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
            <span>{{ scope.row.totalContainerSkuPrice }}</span>
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
      containerSelect: ''
    }
  },
  props: {
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
    containerType: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    handleSelectionChange (val) {
      this.$emit('handleSelectionChange', val.map(a => a.index))
    },
    tableRowClassName({row, rowIndex}) {
      row.index = rowIndex;
    }
    // tailBtn(str) {
    //   if(str === 'ok') {
    //     if(!this.containerSelect) return this.$message({
    //       message: '请选择货柜类型',
    //       type: 'warning'
    //     });
    //     if(!this.containerNo) return this.$message({
    //       message: '请填写货柜数量',
    //       type: 'warning'
    //     });
    //     this.$emit('tailBtnOk', {
    //       Product: this.containerSelect,
    //       containerAmount: this.containerNo
    //     });
    //     this.containerSelect = '';
    //     this.containerNo = '';
    //   } else {
    //     this.$emit('tailBtnCancel');
    //   }
    //   return this.isActive = false
    // },
    // tabSplite(index) {
    //   if(this.tableData.length <= 1) this.tabAppend();
    //   this.$emit('tabSplite', index)
    // }
  }
}
</script>
<style lang="less" scoped>
.btn-wraps {
  padding:10px 0;
}
</style>
