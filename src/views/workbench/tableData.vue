<template>
  <div class="tableData">
    <h3 class="ucn-content-title" v-text="typeLabel[type - 1]"></h3>

    <div style="position: absolute;right: 0;top: -5px">
      <el-input placeholder="请输入内容" class="input-with-select" clearable
                v-model="search">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <br/>

    <el-tabs type="border-card" @tab-click="changeTab">
      <el-tab-pane style="height: 300px" v-for="item in dataList" :key="item.label"
                   v-loading="item.loading"
                   :label="item.label">
        <v-table ref="pendingTable"
                 :data.sync="item.data"
                 :selection="false"
                 hide-filter-column
                 hide-filter-value>
        </v-table>
        <v-pagination :page-data="item.page" @size-change=""
                      @current-change=""></v-pagination>
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
        typeLabel: ['Pending Task', 'Future Task', 'FYI', 'Push'],
        dataList: [
          {page: {}, data: [], label: 'Inquiry', loading: false, search: ''},
          {page: {}, data: [], label: 'Order', loading: false, search: ''},
          {page: {}, data: [], label: 'Logistic', loading: false, search: ''},
          {page: {}, data: [], label: 'Warehouse', loading: false, search: ''},
          {page: {}, data: [], label: 'Payment', loading: false, search: ''}
        ],
        search: '',
        tabIndex: 0,
      }
    },
    mounted() {
      this.getData();
    },
    watch: {
      /*dataList(val) {
      }*/
    },
    methods: {
      filterSelection(params) {
        return true;
      },
      onAction(item, type) {
        console.log(item, type)
      },
      pageChange(page) {
        console.log(page)
      },
      getSort(val, key) {
        console.log(val, key)
      },
      changeChecked(list) {
        console.log(list)
      },
      onFilterValue(val) {
        console.log(val);
      },
      changeTab(tab) {
        this.tabIndex = tab.index;
        this.getData();
      },
      getData() {
        let item = this.dataList[this.tabIndex];
        item.search = this.search;
        item.loading = true;
        this.$ajax.post(this.$apis.UTASK_TYPELIST, {type: this.type, moduleCode: this.type})
          .then(data => {
            item.page = data;
            item.data = this.$getDB(this.$db.workbench.taskTable, data.datas, item => {
              item.submittedTime.value = this.$dateFormat(item.submittedTime.value, 'yyyy-mm-dd');
              return item;
            });
          })
          .finally(() => {
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
