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
            <td class="title" v-text="item.module"></td>
            <td class="value">
              <div v-if="item.list[0]" v-text="item.list[0].value + ' ' + item.list[0].code"></div>&nbsp;
            </td>
          </tr>
          <tr>
            <!--<td class="title" rowspan="2" v-text="$i.workbench.orderPlaced"></td>-->
            <td class="title" rowspan="2" v-text="item.theme"></td>
            <td class="value">
              <div v-if="item.list[1]" v-text="item.list[1].value + ' ' + item.list[1].code"></div>&nbsp;
            </td>
          </tr>
          <tr>
            <td class="value">
              <div v-if="item.list[2]" v-text="item.list[2].code + ' ' + item.list[2].value"></div>&nbsp;
            </td>
          </tr>
        </table>
      </el-col>
    </el-row>

    <!--<el-dialog title="Data Dashboard" width="90%" :visible.sync="dialog.show">

      <el-checkbox-group v-model="checkedDataList">
        <el-row class="data-table" :gutter="20">
          <el-col :span="6">
            <table>
              <tr>
                <td rowspan="3" style="width: 20px">
                  <el-checkbox lable="a1"></el-checkbox>
                </td>
                <td class="title" v-text="$i.workbench.purchaseOrder"></td>
                <td class="value">26 Orders</td>
              </tr>
              <tr>
                <td class="title" rowspan="2" v-text="$i.workbench.orderPlaced"></td>
                <td class="value">281 SKU</td>
              </tr>
              <tr>
                <td class="value">JSD 132.24.00</td>
              </tr>
            </table>
          </el-col>
        </el-row>
      </el-checkbox-group>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog.show = false">取 消</el-button>
        <el-button type="primary" @click="dialog.show = false">确 定</el-button>
      </div>
    </el-dialog>-->
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
        // radioTimeType: '',
        /*checkedDataList: [],
        pickerOptions2: {
          shortcuts: [{
            text: 'recent 7 days',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: 'recent 15 days',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: 'recent 30 days',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        dataList: [
          'Create Inquiry1',
          'Create Inquiry2',
          'Create Inquiry3',
          'Create Inquir5',
          'Create Inquiry41',
          'Create Inquiry15',
          'Create Inquiry16',
          'Create Inquiry17',
          'Create Inquiry18',
          'Create Inquiry19',
        ]*/
      }
    },
    created() {
      this.getData();
    },
    methods: {
      getData() {
        this.loading = true;
        this.$ajax.post(this.$apis.UDA_FINDDATAANALYSISLIST)
          .then(data => {
            this.dataList = data;
          })
          .finally(() => {
            this.loading = false;
          });
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
  .data-table .value > div{
    display: inline-block;
  }

  .data-table .el-col-6 {
    margin-bottom: 10px;
  }

  /*.dataDashboard .el-picker-panel__shortcut{*/
  /*font-size: 12px;*/
  /*}*/
</style>
