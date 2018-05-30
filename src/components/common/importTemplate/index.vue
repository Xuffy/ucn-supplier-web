<template>
  <div class="ucn-import">
    <el-dialog
      class="ucn-import-dialog"
      :title="$i.importTemplate.import"
      :visible.sync="dialogVisible"
      width="50%">

      <el-form label-width="80px">
        <el-form-item :label="$i.importTemplate.upload">
          <el-upload
            :action="$apis.IMPORTFILE_IMPORTTASKE"
            :headers="{'U-Session-Token':$localStore.get('token')}"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :limit="5"
            :data="{templateCode:'PRODUCT_SUPPLIER',bizCode:'PRODUCT_SUPPLIER'}"
            name="importFile"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button type="primary">{{$i.importTemplate.selectFile}}
              <i class="el-icon-upload el-icon--right"></i>
            </el-button>

            <!--<el-button size="small" type="primary">选择文件</el-button>-->
          </el-upload>
        </el-form-item>

        <el-form-item :label="$i.importTemplate.remark" class="remark-box">
          <h5>1.{{$i.importTemplate.remark1}} <a href="" v-text="$i.importTemplate.template"></a></h5>
          <h5>2.{{$i.importTemplate.remark2}}</h5>
          <h5>3.{{$i.importTemplate.remark3}}</h5>
        </el-form-item>
      </el-form>


      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{$i.common.cancel}}</el-button>
        <el-button type="primary" @click="dialogVisible = false">{{$i.common.confirm}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

  export default {
    name: 'VImport',
    components: {},
    //传送的数据
    props: {},
    data() {
      return {
        dialogVisible: false,
        fileList: [{
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }, {
          name: 'food2.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }]
      }
    },
    watch: {},
    created() {
    },
    mounted() {
    },
    methods: {
      show() {
        this.dialogVisible = true;
      },

      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      }
    }
  }

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .remark-box h5 {
    font-weight: 100;
  }

  .remark-box h5 a {
    color: #3a8ee6;
    text-decoration: underline;
  }
</style>
<style>
</style>
