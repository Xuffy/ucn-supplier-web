<template>
  <el-row>
    <!--<v-table-filter :hideFilterValue="true" class="filter"/>-->
    <el-table :data="tableData" style="width: 100%" class="table" max-height="400">
      <el-table-column :label="$i.logistic.negotiate" width="120" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.entryDt ? $dateFormat(scope.row.entryDt.value, 'yyyy-mm-dd') : null }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$i.logistic.orderNo" width="100" align="center" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.orderNo.value }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$i.logistic.toShipCartonQty" width="300" align="center" sortable>
        <template slot-scope="scope">
          <el-input placeholder="请输入内容" v-model="scope.row.toShipCartonQty.value" @change="currentChange(scope.row.toShipCartonQty.key,scope.row.toShipCartonQty.value)" v-if="scope.row.toShipCartonQty.edit"></el-input>
          <span v-else>{{ scope.row.toShipCartonQty.value }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$i.logistic.toShipQty" width="160" align="center" sortable>
        <template slot-scope="scope">
          <el-input placeholder="请输入内容" v-model="scope.row.toShipQty.value" @change="currentChange(scope.row.toShipQty.key,scope.row.toShipQty.value)" v-if="scope.row.toShipQty.edit"></el-input>
          <span v-else>{{ scope.row.toShipQty.value }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$i.logistic.skuCode" width="140" align="center" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.skuCode.value }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$i.logistic.skuNameEn" width="140" align="center" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.skuNameEn.value }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$i.logistic.skuNameCn" width="160" align="center" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.skuNameCn.value }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$i.logistic.productDescription" width="160" align="center" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.skuNameCustomer.value }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$i.logistic.blSkuName" width="140" align="center" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.blSkuName.value }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$i.logistic.customsDeclarationNameCn" width="240" align="center" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.skuCustomsNameCn.value }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$i.logistic.customsDeclarationNameEn" width="240" align="center" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.skuCustomsNameEn.value }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$i.logistic.hsCode" align="center" width="100" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.hsCode.value }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$i.logistic.reportElements" width="160" align="center" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.reportElement.value }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$i.logistic.supplierName" width="140" align="center" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.skuSupplierName.value }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$i.logistic.supplierNo" width="120" align="center" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.skuSupplierCode.value }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$i.logistic.customerSkuCode" width="160" align="center" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.skuCustomerSkuCode.value }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$i.logistic.factorySKUCode" width="160" align="center" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.factorySkuCode.value }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$i.logistic.unit" align="center" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.skuUnit.value }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$i.logistic.exportUnitPrice" width="140" align="center" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.unitExportPrice.value }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$i.logistic.totalPriceOfExport" width="160" align="center" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.totalExportPrice.value }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$i.logistic.currency" width="100" align="center" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.currency.value }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$i.logistic.skuQuantityOfOuterCarton" width="220" align="center" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.skuOuterCartonQty.value }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$i.logistic.outerCartonLength" width="160" align="center" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.skuOuterCartonLength.value }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$i.logistic.outerCartonWidth" width="180" align="center" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.skuOuterCartonWidth.value }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$i.logistic.outerCartonHeight" width="160" align="center" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.skuOuterCartonHeight.value }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$i.logistic.outerCartonNetWeight" width="200" align="center" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.skuOuterCartonNetWeight.value }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$i.logistic.outerCartonGrossWeight" width="200" align="center" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.skuOuterCartonRoughWeight.value }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$i.logistic.outerCartonVolume" width="180" align="center" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.skuOuterCartonVolume.value }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$i.logistic.shippingMarks" width="140" align="center" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.skuShippingMarks.value }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$i.logistic.outerCartonBarCode" width="180" align="center" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.skuOuterCartonBarCode.value }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$i.logistic.outerCartonSkuCode" width="180" align="center" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.skuOuterCartonCode.value }}</span>
        </template>
      </el-table-column>
    </el-table>
  </el-row>
</template>
<script>
// import VTableFilter from '@/components/common/table/filter'

export default {
  props: {
    productInfoModifyStatus: {
      type: Number,
      default: 0
    },
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
  },
  components: {
    // VTableFilter
  },
  data () {
    return {
      modify: true,
      modifyArray: [],
      productModifyObj:{}
    }
  },
  watch: {
    tableData () {
      this.createModifyData()
    }
  },
  methods: {
    currentChange(key,v){
      this.productModifyObj[key] = v;
      this.$emit('productModifyfun',this.productModifyObj);
    },
    createModifyData () {
      if (!this.tableData.length) return
      let flag = false;
      if (this.productInfoModifyStatus === 1) {
        flag = true;
      }else{
        flag = false;
      }
      _.mapObject(this.tableData[0], (value, key) => {
        key === 'toShipCartonQty' && (value.edit = flag)
        key === 'toShipQty' && (value.edit = flag)
        return value
      })
    }
  }
  // methods: {
  //   createModifyData () {
  //     // this.modifyArray = JSON.parse(JSON.stringify(this.tableData))
  //     if (this.productInfoModifyStatus === 1) {
  //       const copyTableData = JSON.parse(JSON.stringify(this.tableData))
  //       _.mapObject(copyTableData[0], (value, key) => {
  //         key === 'toShipCartonQty' && (value.edit = true)
  //         key === 'toShipQty' && (value.edit = true)
  //         return value
  //       })
  //       this.modifyArray = copyTableData
  //     } else {
  //       this.modifyArray = this.tableData
  //     }
  //   }
  // }
}
</script>
<style lang="less">
.table {
  height: 400px;
  overflow-y: auto;
}
.filter {
  float: right;
}
</style>
