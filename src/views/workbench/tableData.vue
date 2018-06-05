<template>
  <div class="tableData">
    <h3 class="ucn-content-title" v-text="typeLabel[type - 1]"></h3>

    <div style="position: absolute;right: 0;top: -5px">
      <el-select v-model="search.type" placeholder="请选择"
                 style="width: 100px;display: inline-block;vertical-align: middle">
        <el-option :label="$i.workbench.number" value="1"></el-option>
        <el-option :label="$i.workbench.content" value="2"></el-option>
      </el-select>
      <el-input :placeholder="$i.hintMessage.pleaseEnter" class="input-with-select" clearable
                style="width: 200px;vertical-align: middle"
                v-model="search.value">
        <el-button slot="append" icon="el-icon-search"
                   @click="submitSearch"></el-button>
      </el-input>
    </div>
    <br/>

    <el-tabs type="border-card" @tab-click="changeTab">
      <el-tab-pane style="height: 300px" v-for="item in dataList" :key="item.label"
                   v-loading="item.loading"
                   :label="item.label">
        <v-table ref="pendingTable"
                 :data="item.data"
                 :selection="false"
                 :height="260"
                 hide-filter-column
                 hide-filter-value>
        </v-table>
        <v-pagination :page-data="item.page" @size-change="pageSizeChange"
                      @change="pageChange"></v-pagination>
      </el-tab-pane>
    </el-tabs>


  </div>
</template>

<script>
  import {VSimpleTable, VTable, VTableFilter, VViewPicture, VPagination} from '@/components/index';

  export default {
    name: 'VTableData',
    components: {
      VSimpleTable,
      VTable,
      VTableFilter,
      VViewPicture,
      VPagination,
    },
    props: {
      type: {
        type: Number,
        required: true,
      },
    },
    data() {
      return {
        pictureVisible: true,
        typeLabel: [
          this.$i.workbench.pendingTask, this.$i.workbench.futureTask, this.$i.workbench.fyiTask, this.$i.workbench.pushTask
        ],
        dataList: [
          {
            page: {pn: 1, ps: 10},
            data: [],
            label: this.$i.workbench.inquiry,
            loading: false,
            search: {},
            type: 'INQUIRY'
          },
          {page: {pn: 1, ps: 10}, data: [], label: this.$i.workbench.order, loading: false, search: {}, type: 'ORDER'},
          {
            page: {pn: 1, ps: 10},
            data: [],
            label: this.$i.workbench.logistic,
            loading: false,
            search: {},
            type: 'LOGISTIC'
          },
          {
            page: {pn: 1, ps: 10},
            data: [],
            label: this.$i.workbench.warehouse,
            loading: false,
            search: {},
            type: 'WAREHOUSE'
          },
          {
            page: {pn: 1, ps: 10},
            data: [],
            label: this.$i.workbench.payment,
            loading: false,
            search: {},
            type: 'PAYMENT'
          }
        ],
        search: {type: '1', value: ''},
        tabIndex: 0,
      }
    },
    mounted() {
      this.getData();
    },
    watch: {},
    methods: {
      pageChange(val) {
        let item = this.dataList[this.tabIndex];
        item.page.pn = val;
        this.getData();
      },
      pageSizeChange(val) {
        let item = this.dataList[this.tabIndex];
        item.page.ps = val;
        this.getData();
      },
      submitSearch() {
        let item = this.dataList[this.tabIndex];
        item.search = _.clone(this.search);
        this.getData();
      },
      changeTab(tab) {
        this.tabIndex = tab.index;
        let item = this.dataList[this.tabIndex];
        this.search = _.isEmpty(item.search) ? {type: '1', value: ''} : item.search;
        this.getData();
      },
      getData() {
        let item = this.dataList[this.tabIndex],
          {pn, ps} = item.page;

        item.loading = true;
        this.$ajax.post(this.$apis.UTASK_GETBYTYPEANDMODULE, {
          type: this.type,
          moduleCode: item.type,
          pn,
          ps,
          content: item.search.type === '2' ? item.search.value : '',
          bizNo: item.search.type === '1' ? item.search.value : ''
        }).then(data => {
          item.page = data;
          item.data = this.$getDB(this.$db.workbench.taskTable, data.datas, item => {
            item.submittedTime.value = this.$dateFormat(item.submittedTime.value, 'yyyy-mm-dd');
            return item;
          });
        }).finally(() => {
          item.loading = false;
        });
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .tableData {
    position: relative;
  }
</style>
<style>
  .tableData .el-tabs__item {
    font-size: 12px;
    padding: 0 10px;
  }

  .tableData .el-input-group__append {
    padding: 0;
  }

  .tableData .el-input-group__append button {
    margin-right: 0 !important;
  }

</style>
