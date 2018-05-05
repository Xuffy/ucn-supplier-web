<template>
  <div class="workbench">

    <!--<v-time-zone :value.sync="timeZone"></v-time-zone>-->
    <div class="quickLink">
      <h3 class="ucn-content-title inline" v-text="$i.workbench.quickLink"></h3>
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
        <v-table-data :type="4"></v-table-data>
      </el-col>
      <el-col :span="12">
        <v-table-data :type="3"></v-table-data>
      </el-col>
    </el-row>

    <!--<v-message-board module="workbench" code="workbench" id="123"></v-message-board>-->
  </div>
</template>

<script>
  import VDataDashboard from './dataDashboard'
  import VTableData from './tableData'
  import VBasicInfo from './basicInfo'
  import {VHistoryModify, VMessageBoard, VTimeZone} from '@/components/index';
  import testData from './test'

  export default {
    name: 'workbench',
    components: {
      VDataDashboard,
      VTableData,
      VBasicInfo,
      VHistoryModify,
      VMessageBoard,
      VTimeZone,
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


      // this.$store.commit('setDraft', {path: '/login'});
      /*this.$ajax.post(this.$apis.UTASK_PAGELIST).then(data => {
        this.pengdingTask = data.pending_task;
        this.futureTask = data.future_task;
        this.fyiTask = data.fyi_task;
        this.pushTask = data.push_task;
      });*/

      // this.$ajax.post(this.$apis.UTASK_TYPELIST,{}).then(data => {
      //
      // });
      /*this.$notify({
        title: 'Wellcome! Please set your basic info',
        duration: 0,
        offset: 60,
        dangerouslyUseHTMLString: true,
        message: h(VBasicInfo)
      });*/
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
