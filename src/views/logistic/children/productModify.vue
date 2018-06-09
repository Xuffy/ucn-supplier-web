<template>
  <el-row>
    <!--<v-table-filter :hideFilterValue="true" class="filter"/>-->
    <el-table :data="modifyArray" style="width: 100%" class="table">
      <el-table-column :label="$i.logistic.negotiate" width="120" align="center">
        <template slot-scope="scope">
          <span>{{ $dateFormat(scope.row.entryDt.value, 'yyyy-mm-dd') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$i.logistic.orderNo" width="100" align="center" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.orderNo.value }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$i.logistic.quantityOfOuterCartonsToBeShipped" width="300" align="center" sortable>
        <template slot-scope="scope">
          <el-input placeholder="请输入内容" v-model="scope.row.toShipCartonQty.value" v-if="scope.row.toShipCartonQty.edit"></el-input>
          <span v-else>{{ scope.row.toShipCartonQty.value }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$i.logistic.goodsToBeShipped" width="160" align="center" sortable>
        <template slot-scope="scope">
          <el-input placeholder="请输入内容" v-model="scope.row.toShipQty.value" v-if="scope.row.toShipQty.edit"></el-input>
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
          <span>{{ scope.row.customDeclarationNameCn.value }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$i.logistic.customsDeclarationNameEn" width="240" align="center" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.customDeclarationNameEn.value }}</span>
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
          <span>{{ scope.row.supplierName.value }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$i.logistic.supplierNo" width="120" align="center" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.supplierCode.value }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$i.logistic.customerSkuCode" width="160" align="center" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.customerSkuCode.value }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$i.logistic.factorySKUCode" width="160" align="center" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.factorySkuCode.value }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$i.logistic.unit" align="center" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.unit.value }}</span>
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
          <span>{{ scope.row.outerCartonQty.value }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$i.logistic.outerCartonLength" width="160" align="center" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.outerCartonLenth.value }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$i.logistic.outerCartonWidth" width="180" align="center" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.outerCartonWidth.value }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$i.logistic.outerCartonHeight" width="160" align="center" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.outerCartonHeight.value }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$i.logistic.outerCartonNetWeight" width="200" align="center" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.outerCartonNetWeight.value }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$i.logistic.outerCartonGrossWeight" width="200" align="center" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.outerCartonGrossWeight.value }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$i.logistic.outerCartonVolume" width="180" align="center" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.outerCartonVolume.value }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$i.logistic.shippingMarks" width="140" align="center" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.shippingMarks.value }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$i.logistic.outerCartonBarCode" width="180" align="center" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.outerCartonBarCode.value }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$i.logistic.outerCartonSkuCode" width="180" align="center" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.outerCartonSkuCode.value }}</span>
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
      modifyArray: []
    }
  },
  watch: {
    tableData () {
      this.createModifyData()
    }
  },
  methods: {
    createModifyData () {
      // this.modifyArray = JSON.parse(JSON.stringify(this.tableData))
      if (this.productInfoModifyStatus === 1) {
        const copyTableData = JSON.parse(JSON.stringify(this.tableData))
        _.mapObject(copyTableData[0], (value, key) => {
          key === 'toShipCartonQty' && (value.edit = true)
          key === 'toShipQty' && (value.edit = true)
          return value
        })
        this.modifyArray = copyTableData
      } else {
        this.modifyArray = this.tableData
      }
    }
  }
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
