<template>
  <div class="ucn-message-board" :class="{show:$store.state.layout.paddingRight}">
    <div class="title-box">
      <h3 class="ucn-content-title inline">Message Board</h3>
      <i class="el-icon-d-arrow-right"
         @click="$store.state.layout.paddingRight = $store.state.layout.paddingRight ? 0 : '375px'"></i>
    </div>

    <div class="content">
      <ul class="message-box" v-loading="contentLoading" ref="messageBox">
        <!--<div class="list_item" v-for="item in messageList" :key="item.id">
          <p class="list_item_title">
            <span>{{item.sendByUserName}}</span>
            <span>{{item.sendTime}}</span>
          </p>
          <p>
            {{item.content}}
            <img :src="item.src" v-if="item.src">
          </p>
        </div>-->
        <li v-for="item in messageList" :key="item.id">
          <span class="name">{{item.sendByUserName}}</span>
          <label class="time">{{$dateFormat(item.sendTime,'yyyy-mm-dd HH:MM:ss')}}</label>
          <pre class="box" v-text="item.content"></pre>
          <img :src="item.src" v-if="item.src">
        </li>
      </ul>
      <div class="form-box">
        <div class="form">
          <el-input type="textarea" v-model="messageContent"></el-input>
          <br/>
          <div class="upload_div">
            <el-upload
              :action="action"
              :accept="accept"
              :maxsize='maxsize'
              :disabled='disabled'
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :before-upload="beforeAvatarUpload"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              multiple
            >
              <i class="el-icon-plus" style='fontSize:16px;'></i>
            </el-upload>
            <!--
                            <el-dialog :visible.sync="dialogVisible">
                              <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
            -->
          </div>

        </div>
        <div class="btn-box">
          <el-button type="primary" @click='sendMessage' :loading="submitLoading">submit</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /*
                      具体后台返回数据，等结构出来再做更改
                              */
  import VUpload from '../upload/upload.vue'

  export default {
    name: 'VMessageBoard',
    components: {
      VUpload
    },
    //传送的数据
    props: {
      module: {
        type: String,
        required: true,
      },
      code: {
        type: String,
        required: true,
      },
      id: {
        type: String,
        default: '',
      },
      list: {
        type: Array,
        default: function () {
          return []
        }
      },
      // 文件地址
      action: {
        type: String,
        default: 'https://jsonplaceholder.typicode.com/posts/'
      },
      //默认大小2048
      maxsize: {
        type: Number,
        default: 2048
      },
      accept: {
        type: String,
        default: 'image/jpeg,image/jpg,image/png'
      },
      //禁止上传状态
      disabled: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        submitLoading: false,
        contentLoading: false,
        messageContent: '',
        messageList: [],
        isuploadsuccess: false, //upload拿到的上传成功值
        dialogImageUrl: '',
        dialogVisible: false
      }
    },
    watch: {},
    created() {
      this.$store.state.layout.paddingRight = '375px'
    },
    mounted() {
      this.getMessage();
    },
    methods: {
      sendMessage() {
        if (!this.messageContent) return this.$message('请输入内容');

        this.submitLoading = true;

        this.$ajax.post(this.$apis.CHATMESSAGE_ADD, {
          moduleCode: this.module,
          bizCode: this.code,
          bizNo: this.id,
          content: this.messageContent,
        }).then(data => {
          this.messageContent = '';
          this.getMessage();
        }).finally(() => {
          this.submitLoading = false;
        });
      },
      getMessage() {
        this.contentLoading = true;
        this.$ajax.post(this.$apis.CHATMESSAGE_QUERY, {moduleCode: this.module, bizCode: this.code, bizNo: this.id,})
          .then(data => {
            this.messageList = data.reverse();
            this.$nextTick(() => {
              this.$refs.messageBox.scrollTop = this.$refs.messageBox.scrollHeight;
            })
          })
          .finally(() => {
            this.contentLoading = false;
          });
      },
      //移除文件的钩子函数
      handleRemove(file, fileList) {
        //               console.log(file, fileList);
      },
      //上传文件之前的校验文件类型
      beforeAvatarUpload(file) {
        const isType = this.accept.indexOf(file.type) != -1;
        const isSize = file.size / 1024 / 1024 < this.maxsize;
        if (!isType) {
          this.$message.error('上传格式不对!');
        }
        if (!isSize) {
          this.$message.error('上传头像图片大小不能超过 !' + this.maxsize);
        }
        return isType && isSize;
      },
      //上传成功的钩子函数
      handleSuccess(response, file, fileList) {
        //                console.log(response)
      },
      //点击已上传的文件链接时的钩子, 可以通过 file.response 拿到服务端返回数据
      handlePictureCardPreview(file) {

      }
    }
  }

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .ucn-message-board {
    width: 350px;
    position: fixed;
    right: 10px;
    top: 0;
    height: 100%;
    z-index: 920;
    box-sizing: border-box;
    background-color: #FFFFFF;
    transition: all .5s;
    transform: translate(120%, 0);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    padding: 100px 10px 10px 10px;

  }

  ::-webkit-scrollbar {
    width: 7px;
    height: 7px;
    padding: 0;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: rgba(0, 0, 0, .2)
  }

  ::-webkit-scrollbar-track {
    border-radius: 2px;
    background: rgba(128, 133, 144, 0)
  }

  .ucn-message-board .content {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .ucn-message-board .title-box {
    width: 50%;
    top: 60px;
    left: 0;
    line-height: 40px;
    height: 40px;
    position: absolute;
    transition: all .5s;
    transition-delay: .5s;
    transform: translate(-130%, 0);
    box-sizing: border-box;
    background-color: #FFFFFF;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, .1);
  }
  .ucn-message-board .title-box .ucn-content-title{
    padding-left: 10px;
    font-size: 14px;
  }

  .ucn-message-board .title-box * {
    color: #606266;
  }

  .ucn-message-board .title-box i {
    font-size: 20px;
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
    transition: all .5s;
    transform: rotate(180deg);
  }

  .ucn-message-board.show {
    /*padding-right: 370px;*/
    transform: translate(0, 0);
  }

  .ucn-message-board.show .title-box {
    transform: translate(0, 0);
  }

  .ucn-message-board.show .title-box {
    box-shadow: none;
    transition-delay: 0s;
    width: 100%;
  }

  .ucn-message-board.show .title-box i {
    transform: rotate(0);
    transition-delay: .5s;
  }

  .message-box {
    height: 75%;
    width: 100%;
    overflow: auto;
    background-color: rgba(245, 245, 245, .3);
    padding: 10px 10px;
    border: 1px solid rgba(220, 220, 220, .5);
  }

  .message-box > li {
    position: relative;
  }

  .message-box .name {
    color: #409EFF;
  }

  .message-box .time {
    position: absolute;
    right: 0;
    top: 0;
    color: #cccccc;
  }

  .message-box .box {
    color: #666666;
    padding: 10px;
    line-height: 18px;
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  .form-box {
    width: 100%;
  }

  .btn-box {
    width: 100%;
    text-align: right;
  }

  .form-box .form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    margin-top: 10px;
  }

  .text_enter {
    width: 90%;
    height: 60px;
    border: 0;
    overflow: hidden;
    resize: none;
    margin: auto;
    margin-top: 10px;
  }

  .upload_div {
    margin-bottom: 10px;
    width: 100%;
  }

  .text_enter::-webkit-input-placeholder {
    padding-left: 10px;
    color: #BEBEBE
  }

  .messagelist_upload {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    margin-right: 5%;
  }


</style>
<style>
  .ucn-message-board .el-upload--picture-card {
    width: 38px;
    height: 38px;
    line-height: 38px;
  }

  .ucn-message-board .el-upload {
    width: 38px;
    height: 38px;
  }

  .ucn-message-board .el-upload-list__item {
    width: 38px;
    height: 38px;
  }

  .ucn-message-board .el-upload-list--picture-card .el-upload-list__item-actions span + span {
    margin-left: 0;

  }

  .ucn-message-board .el-icon-zoom-in {
    display: none
  }

  .ucn-message-board .el-icon-delete {
  }

  .ucn-message-board textarea {
    resize: none;
    min-height: 100px !important;
    transition: all .5s;
    font-family: Verdana, Arial, Helvetica, sans-serif;
    border: 1px solid rgba(220, 220, 220, .3);
  }

  .ucn-message-board textarea:focus {
    border: 1px solid rgba(220, 220, 220, 1);
  }
</style>
