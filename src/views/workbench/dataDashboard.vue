<template>
  <div class="dataDashboard">

    <h3 class="ucn-content-title inline" v-text="$i.workbench.dataDashboard"></h3>
    <!--<div class="block" style="display: inline-block;margin-left: 80px">
      <span class="demonstration">Time：</span>
      <el-date-picker
        v-model="value7"
        type="daterange"
        size="mini"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions2">
      </el-date-picker>
    </div>

    <el-button size="medium" type="text"
               style="display: inline-block;margin-left: 30px!important;"
               @click="dialog.show = true">more
    </el-button>-->

    <br/><br/>

    <el-row class="data-table" :gutter="20" v-loading="loading">
      <el-col :span="6" v-for="(item,index) in dataList" :key="index">
        <table>
          <tr>
            <!--<td class="title" v-text="$i.workbench.purchaseOrder"></td>-->
            <td class="title" v-text="item.title"></td>
            <td class="value">
              <div v-if="item.list[0]" v-text="item.list[0].value + ' ' + item.list[0].unit"></div>&nbsp;
            </td>
          </tr>
          <tr>
            <!--<td class="title" rowspan="2" v-text="$i.workbench.orderPlaced"></td>-->
            <td class="title" rowspan="2" v-text="item.name"></td>
            <td class="value">
              <div v-if="item.list[1]" v-text="item.list[1].value + ' ' + item.list[1].unit"></div>&nbsp;
            </td>
          </tr>
          <tr>
            <td class="value">
              <div v-if="item.list[2]" v-text="item.list[2].value + ' ' + item.list[2].unit"></div>&nbsp;
            </td>
          </tr>
        </table>
      </el-col>
    </el-row>

  </div>
</template>

<script>

  export default {
    name: 'VDataDashboard',
    data() {
      return {
        dataList: [],
        loading: false,
        dialog: {
          show: false,
        },
      }
    },
    created() {
      this.getData();
    },
    methods: {
      getData() {
        this.loading = true;
        this.$ajax.post(this.$apis.UDA_FINDDATAANALYSISLIST, {
          statPoints: ['CUST_PO_PLACED', 'CUST_PO_IN_PROCESSING', 'CUST_PO_CANCELED', 'CUST_LO_IN_PROCESSING']
        })
          .then(res => {
            this.dataList = [];
            this.getCode().then(data => {
              _.map(res, resVal => {
                let value = {}
                  , ts = _.findWhere(data, {code: 'UDA_BIZ_CODE'})
                  , ns = _.findWhere(data, {code: 'STAT_POINT'})
                  , us = _.findWhere(data, {code: 'STAT_ITEM_UNIT'});

                if (ts) {
                  let v = _.findWhere(ts.codes, {code: resVal.bizCode});
                  if (v) {
                    value.title = v.name;
                  }
                }

                if (ns) {
                  let v = _.findWhere(ns.codes, {code: resVal.statPoint});
                  if (v) {
                    value.name = v.name;
                  }
                }

                value.list = [];
                _.map(resVal.items, itemVal => {
                  let v = _.findWhere(us.codes, {code: itemVal.unit});
                  value.list.push({unit: v ? v.value || '' : itemVal.unit || '', value: itemVal.value || ''})
                });
                this.dataList.push(value)
              });
            });
          })
          .finally(() => {
            this.loading = false;
          });
      },
      getCode() {
        return this.$ajax.post(this.$apis.POST_CODE_PART, ['UDA_BIZ_CODE', 'STAT_POINT', 'STAT_ITEM_UNIT'], {_cache: true});
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .data-table {
    min-height: 80px;
  }

  .data-table table {
    width: 100%;
  }

  .data-table table td {
    vertical-align: middle;
  }

  .data-table table .el-checkbox {
    margin-right: 5px;
  }

  .data-table .title {
    background-color: #F2F2F2;
    text-align: center;
    width: 50%;
  }

  .data-table .value {
    background-color: #D7D7D7;
    text-align: center;
    border-bottom: 1px solid #FFFFFF;
  }

  .data-table .value > div {
    display: inline-block;
  }

  .data-table .el-col-6 {
    margin-bottom: 10px;
  }

  /*.dataDashboard .el-picker-panel__shortcut{*/
  /*font-size: 12px;*/
  /*}*/
</style>
