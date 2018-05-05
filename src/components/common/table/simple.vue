<template>
  <div class="ucn-table" ref="tableBox">
    <el-row>
      <el-col :span="16">&nbsp;</el-col>
      <el-col :span="8" style="text-align: right;cursor: pointer">
        <v-filter-column :data.sync="columnList"></v-filter-column>
      </el-col>
    </el-row>
    <el-table
      ref="table"
      :height="height"
      :max-height="maxHeight"
      :data="showData"
      @selection-change="selection => {selectedList = selection}">
      <el-table-column
        v-if="columnList.length"
        width="40"
        fixed="left"
        type="selection">
      </el-table-column>

      <el-table-column
        v-if="columnList.length"
        align="center"
        type="index">
      </el-table-column>

      <el-table-column v-for="(item,index) in columnList" :key="index"
                       v-if="!item._isHide"
                       align="center"
                       :prop="item.prop"
                       :label="item.label"
                       :render-header="item.renderHeader"
                       :width="columnWidth < item.width ? item.width : columnWidth">
      </el-table-column>
      <el-table-column v-if="columnList.length"
                       label="Actions"
                       align="center"
                       fixed="right"
                       width="80">

        <template slot-scope="scope">
          <el-button type="text">detail</el-button>
        </template>
      </el-table-column>
    </el-table>

    <br>
    <el-pagination
      :style="{visibility: !showData.length ? 'hidden' : ''}"
      @size-change="size => {$emit('page-size-change', size)}"
      @current-change="page => {$emit('page-change', page)}"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="prev, pager, next,sizes, jumper,total"
      :total="pageTotal"></el-pagination>
  </div>
</template>

<script>
  /**
   * 表格组件
   * @desc 组件描述
   * @author xuffy
   * @param {Object} [title]    - 参数说明
   * @param {String} [columns] - 参数说明
   *
   * @method @sort-change(val, key)   - 点击排序
   * @method @page-size-change(size)    - 改变分页条数
   * @method @page-change(page)   - 改变分页
   *
   * @example
   *  <v-table></v-table>
   */

  // import VFilterValue from './filterValue'
  import VFilterColumn from './filterColumn'

  export default {
    name: 'VSimpleTable',
    components: {
      // VFilterValue,
      VFilterColumn
    },
    props: {
      data: {
        type: Array,
        default() {
          return [];
        },
      },
      column: {
        type: Array,
        default() {
          return [];
        },
      },
      maxHeight: {
        type: Number,
        default: 400,
      },
      pageSizes: {
        type: Array,
        default() {
          return [10, 20, 30, 40, 50];
        },
      },
      pageSize: {
        type: Number,
        default: 10,
      },
      pageTotal: {
        type: Number,
        default: 10,
      },
      height: {
        type: Number,
        default: 400,
      },
    },
    data() {
      return {
        showData: [],
        columnList: [],
        selectedList: [],
        columnWidth: 0,
      }
    },
    watch: {
      data(value) {
        if (!_.isEmpty(value)) {
          this.showData = _.filter(value, val => {
            return !val._hide;
          });
        }
      },
      showData(value) {
        let data = [];
        _.map(this.selectedList, dv => {
          if (!_.isEmpty(_.findWhere(value, {id: dv.id}))) {
            data.push(dv);
          }
        });
        this.$refs.table.toggleRowSelection(data, true);
      },
      column(val) {
        this.filterColumn(val);
      },
      columnList(val) {
        this.computeWidth();
      }
    },
    created() {
      this.filterColumn(this.column);
    },
    methods: {
      computeWidth() {
        let num = 0, cv = 0;
        _.map(this.columnList, val => {
          if (!val._isHide) {
            num++;
          }
        });
        this.columnWidth = this.$refs.tableBox.offsetWidth / num - 80;
      },
      filterColumn(columns) {
        if (columns.length) {
          this.columnList = _.map(columns, val => {
            if (!val.renderHeader) {
              /*val.renderHeader = (h, params) => {
                return h(VFilterValue, {
                  props: {
                    dataKey: val.prop,
                    data: this.data,
                    label: params.column.label
                  },
                  on: {
                    'update:data': val => {
                      this.$emit('update:data', val);
                    },
                    'sort-change': (val, key) => {
                      this.$emit('sort-change', val, key);
                    }
                  }
                });
              };*/
            }
            return val;
          });
        }
      },
      /**
       * 函数说明
       * @method getList
       * @param {Object} [title]    - 参数说明
       * @param {Object} [title]    - 参数说明
       * @return {Object} - 参数说明
       */
      getList() {

      }
    }
  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .ucn-table table {
    border-collapse: collapse;
    border-spacing: 0;
    border-left: 1px solid #e9eaec;
    background-color: #ffffff;
  }

  .ucn-table table tr:first-child {
    border-top: 1px solid #e9eaec;
    background-color: #f8f8f9;
  }

  .ucn-table table tr {
    border-right: 1px solid #e9eaec;
  }

  .ucn-table table tr th,
  .ucn-table table tr td {
    text-align: center;
    border-bottom: 1px solid #e9eaec;
    padding: 10px 5px;
  }

  .ucn-table .el-pagination {
    white-space: inherit;
  }
</style>
<style>
  .ucn-table .ivu-checkbox-wrapper {
    margin-right: 0;
  }

  .ucn-table td.ivu-table-expanded-cell {
    padding: 0 0 0 64px;
  }

  .ucn-table .ivu-table-fixed-body {
    background-color: #f8f8f9;
  }

  .ucn-table .el-table .cell {
    line-height: 16px;
  }
</style>
