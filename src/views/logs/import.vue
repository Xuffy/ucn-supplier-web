<template>
  <div class="logs-import">
    <br>
    <h3 class="ucn-content-title inline" v-text="$i.logs.importTitle"></h3>
    <br>
    <br>
    <el-table
      :data="resData.datas"
      :max-height="500"
      border
      v-loading="loading"
      style="width: 100%">
      <el-table-column
        align="center"
        prop="uploadFileName"
        :label="$i.logs.uploadFileName"
        min-width="200">
      </el-table-column>
      <el-table-column
        align="center"
        :label="$i.logs.uploadFileSize"
        width="100">
        <template slot-scope="scope">
          {{$bytesConvert(scope.row.uploadFileSize)}}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="100"
        :label="$i.logs.uploadStatus">
        <template slot-scope="scope">
          <span v-if="scope.row.status === 0">{{$i.logs.statusNew}}</span>
          <span v-else-if="scope.row.status === 3">{{$i.logs.statusExecuting}}</span>
          <span v-else-if="scope.row.status === 7">{{$i.logs.statusExecution}}</span>
          <span v-else-if="scope.row.status === 9">{{$i.logs.statusCancel}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="180"
        :label="$i.logs.uploadEndTime">
        <template slot-scope="scope">
          {{$dateFormat(scope.row.endTime,'yyyy-mm-dd hh:mm:ss')}}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="entryName"
        :label="$i.logs.uploadEntryName">
      </el-table-column>
      <el-table-column
        align="center"
        :label="$i.logs.uploadEntryDt">
        <template slot-scope="scope">
          {{scope.row.entryDt ? $dateFormat(scope.row.entryDt,'yyyy-mm-dd hh:mm:ss') : ''}}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="successRows"
        :label="$i.logs.uploadSuccessRows">
      </el-table-column>
      <el-table-column
        align="center"
        prop="errorRows"
        :label="$i.logs.uploadErrorRows">
      </el-table-column>
      <el-table-column
        align="center"
        fixed="right"
        :label="$i.logs.uploadAction">
        <template slot-scope="scope">
          <el-button type="text" size="small" v-if="scope.row.errorMsgFileUrl"
                     @click="downloadLogs(scope.row.successMsgFileUrl)">
            {{$i.logs.downSuccess}}
          </el-button>
          <el-button type="text" size="small" v-if="scope.row.errorMsgFileUrl"
                     @click="downloadLogs(scope.row.errorMsgFileUrl)">
            {{$i.logs.downError}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <br>
    <v-pagination :page-data="resData" @size-change="pageSizeChange"
                  @change="pageChange"></v-pagination>
  </div>
</template>

<script>

  import {VPagination} from '@/components/index';

  export default {
    name: 'import',
    components: {VPagination},
    data() {
      return {
        loading: false,
        resData: {},
        paging: {pn: 0, ps: 10}
      }
    },
    watch: {},
    created() {
      this.getDataList();
    },
    methods: {
      getDataList() {
        this.loading = true;
        this.$ajax.post(this.$apis.IMPORTFILE_GETIMPORTTASK, this.paging)
          .then(res => {
            this.resData = res;
          })
          .finally(() => {
            this.loading = false;
          });
      },
      pageSizeChange(val) {
        this.paging.ps = val;
        this.getDataList();
      },
      pageChange(val) {
        this.paging.pn = val;
        this.getDataList();
      },
      downloadLogs(url) {
        url && window.open(url);
      }
    }
  }
</script>

<style scoped>
</style>
