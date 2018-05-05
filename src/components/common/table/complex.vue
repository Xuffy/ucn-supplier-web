<template>
  <div class="ucn-table">
    <el-row>
      <el-col :span="16">12</el-col>
      <el-col :span="8" style="text-align: right;cursor: pointer">
        <v-filter-column></v-filter-column>
      </el-col>
    </el-row>
    <el-table
      max-height="250"
      :data="dataList">
      <el-table-column
        fixed
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        type="index">
      </el-table-column>
      <el-table-column v-for="(item,index) in dataColumns" :key="index"
                       :prop="item.prop"
                       :label="item.label"
                       :render-header="item.renderHeader"
                       width="180">
      </el-table-column>

      <el-table-column label="action" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" size="mini">delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <br>
    <el-pagination
      background
      :current-page="4"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="100"
      layout="prev, pager, next,sizes, jumper,total"
      :total="400">
    </el-pagination>
  </div>
</template>


<script>
  /**
   * 表格组件
   * @desc 组件描述
   * @author xuffy
   * @param {Array} [value]    - 参数说明
   * @param {String} [columns] - 参数说明
   * @example
   *  <v-table></v-table>
   */

  import VFilterValue from './filterValue'
  import VFilterColumn from './filterColumn'
  import VExpand from './expand'

  export default {
    name: 'VComplexTable',
    props: {
      value: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    components: {
      VFilterValue,
      VFilterColumn,
      VExpand
    },
    data() {
      return {
        checkValue: [],
        dataColumns: [
          {
            label: 'Date',
            prop: 'date',
            renderHeader: (h, params) => {
              return h(VFilterValue);
            }
          },
          {
            label: 'Name',
            prop: 'name',
            renderHeader: (h, params) => {
              return h(VFilterValue);
            }
          },
          {
            label: 'Name',
            prop: 'name',
            renderHeader: (h, params) => {
              return h(VFilterValue);
            }
          },
          {
            label: 'Name',
            prop: 'name',
            renderHeader: (h, params) => {
              return h(VFilterValue);
            }
          },
          {
            label: 'Name',
            prop: 'name',
            renderHeader: (h, params) => {
              return h(VFilterValue);
            }
          },
          {
            label: 'Name',
            prop: 'name',
            renderHeader: (h, params) => {
              return h(VFilterValue);
            }
          },
          {
            label: 'Name',
            prop: 'name',
            renderHeader: (h, params) => {
              return h(VFilterValue);
            }
          },
          {
            label: 'Name',
            prop: 'name',
            renderHeader: (h, params) => {
              return h(VFilterValue);
            }
          },
          {
            label: 'Name',
            prop: 'name',
            renderHeader: (h, params) => {
              return h(VFilterValue);
            }
          },
          {
            label: 'Age',
            prop: 'age',
            filters: [
              {
                label: 'Greater than 25',
                value: 1
              },
              {
                label: 'Less than 25',
                value: 2
              }
            ],
            filterMultiple: false,
            filterMethod(value, row) {
              if (value === 1) {
                return row.age > 25;
              } else if (value === 2) {
                return row.age < 25;
              }
            }
          },
          {
            label: 'Address',
            prop: 'address',
            filters: [
              {
                label: 'New York',
                value: 'New York'
              },
              {
                label: 'London',
                value: 'London'
              },
              {
                label: 'Sydney',
                value: 'Sydney'
              }
            ],
            fixed: 'right',
            filterMethod(value, row) {
              return row.address.indexOf(value) > -1;
            }
          }
        ],
        dataList: [
          {
            name: 'John Brown',
            age: 18,
            address: 'New York No. 1 Lake Park',
            date: '2016-10-03'
          },
          {
            name: 'Jim Green',
            age: 24,
            address: 'London No. 1 Lake Park',
            date: '2016-10-01'
          },
          {
            name: 'Joe Black',
            age: 30,
            address: 'Sydney No. 1 Lake Park',
            date: '2016-10-02'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04'
          }
        ],
      }
    },
    watch: {},
    created() {
    },
    methods: {
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
</style>
