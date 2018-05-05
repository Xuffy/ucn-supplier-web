<template>
  <div class="ucn-table" v-loading="loading"
       :class="{'fixed-left-box':selection,'fixed-right-box':buttons}">
    <div class="header-content" v-if="!hideFilterColumn && !hideFilterValue">
      <div>
        <slot name="header"></slot>
      </div>
      <div class="fixed">
        <v-table-filter ref="tableFilter"
                        :hide-filter-column="hideFilterColumn"
                        :hide-filter-value="hideFilterValue"
                        @filter-column="onFilterColumn"
                        @filter-value="val => {$emit('filter-value',val)}"></v-table-filter>
      </div>
    </div>

    <div class="table-container" ref="tableContainer">
      <div class="fixed-left" v-if="selection"
           ref="fixedLeft" :class="{show:dataColumn.length}">
        <input type="checkbox" v-model="checkedAll" :class="{visibility:selectionRadio}" ref="checkboxAll"/>
      </div>
      <div class="fixed-right" v-if="buttons"
           ref="fixedRight" :class="{show:dataColumn.length}">
        action
      </div>

      <div class="table-box" id="table-box" ref="tableBox" :style="{'max-height':height + 'px'}">
        <table v-if="dataList.length">
          <thead ref="tableTitle">
          <tr>
            <td ref="tableCheckbox" v-if="selection">
              <div style="visibility: hidden">
                <input type="checkbox" :class="{visibility:selectionRadio}"/>
              </div>
            </td>
            <td v-if="rowspan < 2">
              <div>#</div>
            </td>
            <td v-for="item in dataColumn" v-if="!item._hide && item.key">
              <div v-text="item.label">
              </div>
            </td>
            <td v-if="buttons" ref="tableAction">
              <div>action</div>
            </td>
          </tr>
          </thead>

          <tbody ref="tableBody">
          <tr v-for="(item,index) in dataList"
              :class="{rowspan:index % rowspan !== 0,disabled:item._disabled}">
            <td v-if="selection && (index % rowspan === 0) " :rowspan="rowspan">
              <div>
                <input type="checkbox" ref="checkbox" :disabled="item._disabled"
                       v-if="typeof selection === 'function' ? selection(item) : true"
                       @change="changeCheck(item)"
                       v-model="item._checked"/>
              </div>
            </td>
            <td v-if="rowspan < 2" :rowspan="rowspan">
              <div v-text="index + 1"></div>
            </td>
            <td v-for="(cItem,cKey) in item" v-if="!cItem._hide && cItem.key"
                :style="cItem._style">
              <div v-if="!cItem._image"
                   :style="{color:cItem._color || '','min-width':cItem._width || '80px'}"
                   v-text="cItem.value"></div>

              <img v-else :src="getImage(cItem.value)" @click="$refs.viewPicture.show(cItem.value)"/>
            </td>
            <td v-if="buttons && (index % rowspan === 0)" :rowspan="rowspan">
              <div style="white-space: nowrap;">
                <span class="button"
                      v-for="aItem in (typeof buttons === 'function' ? buttons(item) : buttons)"
                      :class="{disabled:aItem.disabled || item._disabled}"
                      @click="(!aItem.disabled && !item._disabled) && $emit('action',item,aItem.type)">
                  {{aItem.label || aItem}}</span>
              </div>
            </td>
          </tr>
          </tbody>

          <tfoot ref="tableFoot" v-if="totalRow">
          <tr v-for="totalItem in totalRow">
            <td>
              <div v-text="totalItem._totalRow ? totalItem._totalRow.label : '总计'"></div>
            </td>
            <td v-if="rowspan < 2">
            </td>
            <td v-for="item in dataColumn" v-if="!item._hide && typeof item === 'object'">
              <div v-text="totalItem[item.key].value"></div>
            </td>
            <td v-if="buttons">
              <div></div>
            </td>
          </tr>
          </tfoot>
        </table>

        <div v-else class="empty">
          暂无数据
        </div>
      </div>
    </div>

    <!--分页-->
    <!--<v-pagination :data="dataList"
                  :page-sizes="pageSizes"
                  :page-size="pageSize"
                  :page-num="pageNum"
                  :page-total="pageTotal"
                  @size-change="size => {$emit('page-size-change', size)}"
                  @current-change="page => {$emit('page-change', page)}"></v-pagination>-->


    <!--<v-table ref="pendingTable"
             :data.sync="dataList"
             :buttons="[{label: 'detail', type: 1,disabled:true}, {label: 'history', type: 2}]"
             :selection="filterSelection"
             :rowspan="2"
             :total-row="totalRow"
             selection-radio
             @action="onAction"
             @filter-value="onFilterValue"
             @change-checked="changeChecked">
    </v-table>-->
    <div>
      <slot name="footer"></slot>
    </div>

    <v-view-picture ref="viewPicture"></v-view-picture>
  </div>
</template>

<script>
  /**
   * 表格组件
   * @desc 表格基础组件
   * @param {Array} [data]    - 列表数据  例：[{},{},{}]
   * @param {String} [dataKey]    - i18n对应配置参数  例：'negotiation.tableProductInfo'
   * @param {Boolean} [loading]    - 加载loading状态  例：true
   * @param {String} [height]    - 设置表格高度  例：200
   * @param {Array} [F]    - 允许分页显示条数  例：[10,20,30]
   * @param {Number} [pageSize]    - 每页条数  例：200
   * @param {Number} [pageTotal]    - 总条数  例：200
   * @param {Function, Array} [buttons]    - 设置action按钮，可传入函数判断按钮是否显示，返回Array
   *                                         例：[{label: 'detail', type: 1}, {label: 'history', type: 2}]
   *                                         例：['detail', 'history']
   *
   * @method @change-checked(checkedList)   - checkbox改变时调用
   * @method @page-size-change(size)    - 改变分页条数
   * @method @page-change(page)   - 改变分页
   *
   * @example
   *  <v-table></v-table>
   */


  import VTableFilter from './filter'
  import VViewPicture from '../viewPicture/index'

  export default {
    name: 'VTable',
    components: {VTableFilter, VViewPicture},
    props: {
      data: {
        type: Array,
        default() {
          return [];
        },
      },
      dataKey: {
        type: String,
        default: '',
      },
      loading: {
        type: Boolean,
        default: false,
      },
      height: {
        type: Number,
        default: 300,
      },
      buttons: {
        type: [Function, Array]
      },
      selection: {
        type: [Function, Boolean],
        default: true,
      },
      selectionRadio: {
        type: Boolean,
        default: false,
      },
      rowspan: {
        type: Number,
        default: 1,
      },
      hideFilterValue: {
        type: Boolean,
        default: false,
      },
      hideFilterColumn: {
        type: Boolean,
        default: false,
      },
      totalRow: {
        type: [Boolean, Array],
        default: false,
      },
      parId: {
        type: String,
        default: 'id'
      }
    },
    data() {
      return {
        dataList: [],
        dataColumn: [],
        checkedAll: false,
        interval: null,
        tableAttr: {st: 0, sl: 0},
      }
    },
    watch: {
      data(val) {
        this.dataList = val;
        this.filterColumn();
      },
      column() {
        this.filterColumn();
      },
      checkedAll(value) {
        this.dataList = _.map(this.dataList, val => {
          if (!val._disabled) {
            this.$set(val, '_checked', value);
          }
          return val;
        });
        this.changeCheck(this.dataList, value);
      },
    },
    mounted() {
      this.dataList = this.data;
      this.filterColumn();
      this.$refs.tableBox.addEventListener('scroll', this.updateTable);

      this.interval = setInterval(() => {
        this.updateTable();
      }, 500);
    },
    methods: {
      onFilterColumn(checked) {
        // todo 需过滤column
        // this.dataList = this.$refs.tableFilter.getFilterColumn(this.dataList, checked);
        // this.filterColumn();
        // console.log(this.$refs.tableFilter.getFilterColumn(this.dataList, checked))
        this.$emit('update:data', this.$refs.tableFilter.getFilterColumn(this.dataList, checked));
        // this.updateTable();
      },
      filterColumn() {
        this.dataColumn = _.values(this.dataList[0]);
      },
      updateTable(e) {
        this.$nextTick(() => {
          if (!this.$refs.tableBody) return false;

          let ele = e ? e.target : this.$refs.tableBox
            , trs = this.$refs.tableBody.children;
          let st, sl, sw, sh;

          st = e ? ele.scrollTop : this.tableAttr.st;
          sl = e ? ele.scrollLeft : this.tableAttr.sl;
          sw = ele.scrollWidth;
          sh = ele.scrollHeight;
          this.tableAttr.st = st;
          this.tableAttr.sl = sl;

          if (this.selection) {
            this.$refs.fixedLeft.style.width = `${this.$refs.tableCheckbox.offsetWidth}px`;
          }

          if (this.buttons) {
            this.$refs.fixedRight.style.width = `${this.$refs.tableAction.offsetWidth}px`;
          }

          if (this.$refs.tableFoot) {
            this.$refs.tableFoot.style.transform = `translate3d(0,${-(sh - ele.clientHeight - st - 1)}px,0)`;
          }

          _.map(trs, (val, index) => {
            if (index % this.rowspan !== 0) return false;

            if (this.selection && val.firstChild.style) {
              val.firstChild.style.transform = `translate3d(${sl}px,0,0)`;
            }
            if (this.buttons && val.lastChild.style) {
              val.lastChild.style.transform = `translate3d(${this.$refs.tableBox.offsetWidth - sw + sl - 14}px,0,0)`;
            }
          });

          this.$refs.tableTitle.style.transform = `translate3d(0,${st}px,0)`;

        });
      },
      getImage(value, split = ',') {
        if (_.isEmpty(value)) return false;

        if (_.toString(value)) {
          value = value.split(split);
        }

        return value[0];
      },
      changeCheck(item, value) {
        if (this.selectionRadio) {
          this.dataList = _.map(this.dataList, val => {
            val._checked = false;
            return val;
          });
          item._checked = true;
        }
        this.$emit('change-checked', this.getSelected());
      },
      getSelected() {
        return this.selectionRadio ? _.findWhere(this.dataList, {_checked: true}) :
          _.where(this.dataList, {_checked: true});
      }
    },
    beforeDestroy() {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .ucn-table .table-container {
    position: relative;
    margin-bottom: 10px;
    width: 100%;
  }

  .ucn-table .visibility {
    visibility: hidden !important;
  }

  .ucn-table.fixed-left-box .fixed-left,
  .ucn-table.fixed-right-box .fixed-right {
    position: absolute;
    z-index: 9;
    top: 0;
    height: 40px;
    width: 20px;
    line-height: 40px;
    vertical-align: middle;
    text-align: center;
    color: #999999;
    display: none;
    background-color: #ECEFF1;
  }

  .ucn-table .show {
    display: block !important;
  }

  .ucn-table.fixed-left-box .fixed-left {
    left: 0;
    line-height: 50px;
  }

  .ucn-table .fixed-right {
    right: 14px;
  }

  .ucn-table .table-box {
    max-width: 100%;
    overflow-y: scroll;
    overflow-x: auto;
    border: 1px solid #ebeef5;
  }

  .ucn-table table {
    border-collapse: collapse;
    border: none;
    table-layout: fixed;
    min-width: 100%;
  }

  .ucn-table input[type=checkbox] {
    zoom: 130%;
    cursor: pointer;
    margin: 0;
  }

  .ucn-table tr {
    background-color: #FFFFFF;
  }

  .ucn-table td,
  .ucn-table th {
    font-size: 12px;
    vertical-align: middle;
    text-align: center;
    border-bottom: 1px solid #ebeef5;

  }

  .ucn-table thead tr td {
    /*position: absolute;*/
    /*z-index: 9999;*/
  }

  .ucn-table thead td {
    background-color: #ECEFF1;
    color: #999999;
  }

  .ucn-table thead td,
  .ucn-table tfoot td {
    word-break: keep-all;
    padding: 0 10px;
  }

  .ucn-table tfoot td {
    /*border-top: 1px solid #ebeef5;*/
    /*border-right: 1px solid #ebeef5;*/
    box-sizing: border-box;
    position: relative;
    /*background-color: #f6f8f9;*/
    color: #999999;
  }

  .ucn-table tfoot td:after {
    content: '';
    width: 100%;
    height: 1px;
    position: absolute;
    left: 0;
    bottom: 0;
    background-color: #ebeef5;
  }

  .ucn-table tfoot td:before {
    /*content: '';*/
    width: 1px;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    background-color: #999999;
  }

  .ucn-table tfoot tr td:last-child:before {
    display: none;
  }

  .ucn-table td > div {
    text-align: center;
    width: 100%;
    line-height: 14px;
  }

  .ucn-table thead td > div {
    line-height: 40px;
    white-space: nowrap;
  }

  .ucn-table tfoot td > div {
    line-height: 30px;
    white-space: nowrap;
  }

  .ucn-table thead tr td:first-child > div {
    width: 20px;
  }

  .ucn-table tbody td {
    padding: 10px;
  }

  .ucn-table tbody td img {
    max-height: 30px;
    max-width: 30px;
    vertical-align: middle;
    cursor: pointer;
  }

  .ucn-table thead tr:nth-child(even) td,
  .ucn-table tbody tr:nth-child(even) td {
    /*background-color: #fafafa;*/
  }

  .ucn-table tbody tr.disabled td {
    color: #dad8d8;
  }

  .ucn-table tbody tr td:hover,
  .ucn-table tbody tr:hover td {
    /*background-color: #ebeff1 !important;*/
  }

  .ucn-table.fixed-left-box tbody tr:not(.rowspan) td:first-child,
  .ucn-table.fixed-right-box tbody tr:not(.rowspan) td:last-child {
    background-color: #FFFFFF;
    position: relative;
  }

  .ucn-table.fixed-right-box tbody tr:not(.rowspan) td:last-child:after,
  .ucn-table.fixed-left-box tbody tr:not(.rowspan) td:first-child:after {
    content: '';
    position: absolute;
    height: 100%;
    width: 1px;
    top: 0;
    right: 0;
    background-color: #ebeef5;
    box-shadow: 3px 0 10px rgba(0, 0, 0, .4);
  }

  .ucn-table.fixed-right-box tbody tr:not(.rowspan) td:last-child:after {
    left: 0;
    box-shadow: -3px 0 10px rgba(0, 0, 0, .2);
  }

  .ucn-table .button {
    color: #409eff;
    cursor: pointer;
    display: inline-block;
    margin-right: 10px;
  }

  .ucn-table .button.disabled {
    color: #dad8d8;
  }

  .ucn-table .button:last-child {
    margin-right: 0;
  }

  .ucn-table .empty {
    text-align: center;
    color: #999999;
    height: 200px;
    line-height: 200px;
  }

  .ucn-table .el-pagination {
    white-space: inherit;
  }

  .header-content {
    width: 100%;
    position: relative;
    min-height: 30px;
  }

  .header-content .fixed {
    position: absolute;
    right: 0;
    top: 50%;
    margin-top: -10px;
  }
</style>
