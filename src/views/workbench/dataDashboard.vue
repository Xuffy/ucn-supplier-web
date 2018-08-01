<template>
  <div class="dataDashboard">

    <h3 class="ucn-content-title inline" v-text="$i.workbench.dataDashboard"></h3>
    <br/><br/>

    <div style="display: flex;">
      <div class="data-box" v-for="(item,index) in dataList" :key="index">
        <p v-text="item.title">purchase order</p>
        <p v-text="item.name">purchase order</p>
        <ul>
          <li v-for="uItem in item.list"
              v-text="uItem.value + ' ' + uItem.unit"></li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
  const AUTH_LIST = {
    'SUPPLIER_PO_IN_PROCESSING': 'WORKBENCH:DATA_DASHBOARD:ORDERS_PROCESS',
    'SUPPLIER_IO_TBQ': 'WORKBENCH:DATA_DASHBOARD:INQUIRY_QUOTE',
    'SUPPLIER_PAY_TO_RECEIVE': 'WORKBENCH:DATA_DASHBOARD:PAYMENT_RECEIVE',
    'SUPPLIER_LO_TO_SHIP': 'WORKBENCH:DATA_DASHBOARD:GOODS_TO_SHIPPED',
  };

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
        let params = [];
        this.loading = true;

        _.mapObject(AUTH_LIST, (val, key) => {
          this.$auth(val) && params.push(key)
        });

        !_.isEmpty(params) && this.$ajax.post(this.$apis.UDA_FINDDATAANALYSISLIST, {statPoints: params})
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
                  let v = _.findWhere(us.codes, {code: itemVal.unit})
                    , val = itemVal.value ? Number(Number(itemVal.value).toFixed(8)) : '';
                  value.list.push({unit: v ? v.value || '' : itemVal.unit || '', value: val})
                });
                this.dataList.push(value)
              });
            });
          })
          .finally(() => this.loading = false);
      },
      getCode() {
        return this.$ajax.post(this.$apis.POST_CODE_PART, ['UDA_BIZ_CODE', 'STAT_POINT', 'STAT_ITEM_UNIT'], {cache: true});
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .data-box {
    width: 300px;
    padding: 10px;
    border: solid 1px #c5c5c5;
    box-sizing: border-box;
    margin-right: 10px;
  }

  .data-box p {
    width: 100%;
    margin-bottom: 15px;
  }

  .data-box p:nth-child(2) {
    text-align: center;
  }

  .data-box ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .data-box ul li {
    width: 33.33%;
    text-align: center;
  }

  /*.data-table {
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
  }*/

  /*.dataDashboard .el-picker-panel__shortcut{*/
  /*font-size: 12px;*/
  /*}*/
</style>
