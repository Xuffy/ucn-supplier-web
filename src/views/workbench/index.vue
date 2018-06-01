<template>
  <div class="workbench">
    <div class="quickLink">
      <h3 class="ucn-content-title inline" @click="$refs.importFile.show()" v-text="$i.workbench.quickLink"></h3>
      <el-button size="mini" type="primary" icon="el-icon-plus"
                 style="display: inline-block;margin-left: 30px!important;"
                 @click="$store.state.quickLink.show = true"></el-button>
      <br/>
      <el-button size="mini" v-for="item in $store.state.quickLink.list" :key="item.id">
        <router-link :to="item.link">
          {{item.label}}
        </router-link>
      </el-button>
    </div>
    <br/><br/>
    <v-data-dashboard v-authorize="'WORKBENCH:DATA_DASHBOARD'"></v-data-dashboard>
    <br/><br/>
    <el-row :gutter="10">
      <el-col :span="12">
        <v-table-data :type="1"></v-table-data>
      </el-col>
      <el-col :span="12">
        <v-table-data :type="2"></v-table-data>
      </el-col>
      <el-col :span="12">
        <v-table-data :type="3"></v-table-data>
      </el-col>
      <el-col :span="12">
        <v-table-data :type="4"></v-table-data>
      </el-col>
    </el-row>

    <v-import-template ref="importFile" code="PRODUCT_SUPPLIER" biz-code="PRODUCT_SUPPLIER"></v-import-template>
    <!--<v-message-board module="workbench" code="workbench" id="123"></v-message-board>-->
  </div>
</template>

<script>
  import VDataDashboard from './dataDashboard'
  import VTableData from './tableData'
  import VBasicInfo from './basicInfo'
  import {VHistoryModify, VMessageBoard, VTimeZone, VUpload, VImportTemplate, VImage} from '@/components/index';

  export default {
    name: 'workbench',
    components: {
      VImportTemplate,
      VUpload,
      VDataDashboard,
      VTableData,
      VBasicInfo,
      VHistoryModify,
      VMessageBoard,
      VTimeZone,
      VImage,
    },
    data() {
      return {
        visible: false,
        pengdingTask: [],
        futureTask: [],
        fyiTask: [],
        pushTask: [],
        timeZone: '1', // todo 测试
      }
    },
    created() {

    },
    mounted() {


    },
    methods: {
      save(data) {
        console.log(data)
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .workbench .el-col-12 {
    margin-bottom: 20px;
  }

  .quickLink .el-button {
    margin-top: 10px;
  }
</style>
<style>
  /*.workbench-notify {
    !*width: 250px;*!
  }*/
</style>
