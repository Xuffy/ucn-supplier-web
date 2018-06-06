<template>
  <div class='ucn-upload small'>
    <p class="upload-btn" v-if="!readonly">
      <i class="el-icon-plus"></i>
      <input class="upload-file" type="file" ref="upload"
             @change="uploadFile"
             v-bind="{multiple:limit !== 1}"
             :accept="onlyImage ? 'image/*' : ''"/>
    </p>
    <!--<el-button type="primary" @click="uploadFile">主要按钮</el-button>-->
    <ul class="upload-list">
      <li v-for="item in fileList" :title="item.showName">
        <template v-if="!item.isImage">
          <label v-text="item.showType"></label>
          <span v-text="item.showName"></span>
        </template>

        <v-image class="img-box" v-else-if="item.url" :src="item.url"></v-image>
        <!--<div class="img-box"
             :style="{'background-image': 'url('+ item.url +')'}">
        </div>-->
        <div :class="{close:!item.progress || item.progress === 1}" class="progress"
             :style="{width: (item.progress * 100) + '%'}">
          <!--<h6 v-text="parseInt(item.progress * 100) + '%'"></h6>-->
        </div>

        <div class="operation-box" :class="{readonly:readonly,image:readonly && item.isImage}"
             v-show="item.progress === 1 || item.url">

          <i class="el-icon-download" @click="downloadFile(item)"></i>
          <i class="el-icon-delete" @click="deleteFile(item)"></i>
          <i class="el-icon-view" @click="$refs.uploadViewPicture.show(item.url)"></i>
        </div>

        <!--<el-progress :text-inside="true" :stroke-width="18" :percentage="item.progress*100"></el-progress>-->
      </li>
    </ul>
    <v-view-picture ref="uploadViewPicture"></v-view-picture>
  </div>
</template>

<script>
  import OSS from 'ali-oss';
  import co from 'co';
  import VViewPicture from '../viewPicture/index'
  import VImage from '../image/index'

  const bucket = 'ucn-oss-dev';
  const imageType = ['JPG', 'PNG'];

  export default {
    name: 'VUpload',
    props: {
      list: {
        type: [Array, String],
        default() {
          return [];
        },
      },
      readonly: {
        type: Boolean,
        default: false,
      },
      limit: {
        type: Number,
        default: 1,
      },
      onlyImage: {
        type: Boolean,
        default: false,
      },
      size: {
        type: String,
        default: 'normal' // normal 、small
      }
    },
    components: {VViewPicture, VImage},
    data() {
      return {
        tenantId: '',
        fileList: {},
      }
    },
    created() {
      this.tenantId = (this.$localStore.get('user') || {}).tenantId;
    },
    mounted() {

    },
    watch: {
      fileList() {
        // console.log(this.fileList)
      },
      list(val) {
        this.setList(val);
      }
    },
    methods: {
      uploadFile() {
        this.$ajax.get(this.$apis.OSS_TOKEN).then(data => {
          let client = this.signature(data)
            , files = this.$refs.upload.files
            , fileNames = _.pluck(_.values(this.fileList), 'fileName');

          _.map(files, val => {
            _.indexOf(fileNames, val.name) === -1 && this.startUpload(client, val);
          });

          this.$refs.upload.value = '';
        });
      },
      startUpload(client, files) {
        let _this = this
          , uid = _this.$getUUID()
          , fileKey = `${this.tenantId}/${uid}/${files.name}`;

        if (_.values(_this.fileList).length >= this.limit) {
          return this.$message.warning(`只能上传${this.limit}个文件`);
        }

        _this.$set(_this.fileList, uid, _.extend(this.filterType(files.name), {
          fileKey,
          fileName: files.name,
          progress: 0,
          id: uid,
          temporary: true
        }));

        co(function* () {
          yield client.multipartUpload(fileKey, files, {
            progress: p => {
              return done => {
                if (_this.fileList[uid]) {
                  _this.fileList[uid].progress = p;
                }
                done();
              }
            }
          }).then(result => {
            _this.$set(_this.fileList[uid], 'url', client.signatureUrl(result.name));
          });
        }).catch(function (err) {
          console.log(err);
        });
      },
      deleteFile(item) {
        let list = {};
        item.temporary && this.$ajax.get(this.$apis.OSS_TOKEN).then(data => {
          let client = this.signature(data);
          client.delete(item.fileKey || '');
        });

        _.map(this.fileList, val => {
          if (val.id !== item.id) {
            list[val.id] = val;
          }
        });
        this.fileList = list;
      },
      downloadFile(item) {
        item.url && window.open(item.url);
      },
      signature(params) {
        return new OSS.Wrapper({
          region: 'oss-cn-hangzhou' || params.ossEndpoint,
          accessKeyId: params.accessKeyId,
          accessKeySecret: params.accessKeySecret,
          stsToken: params.securityToken,
          bucket: bucket
        });

      },
      filterType(name) {
        let rs = name.split('?')[0].split('/')
          , ns = rs.pop().split('.')
          , param = {};

        if (name.indexOf('?') > -1) {
          param.url = name;
          param.id = rs[rs.length - 1];
        }

        if (ns.length > 1) {
          let k = name.split('?')[0].match(/.com\/(\S*)/);
          param.showType = ns.pop().toLocaleUpperCase();
          param.showName = ns.shift();
          param.fileKey = k ? k[1] : '';
        } else {
          param.showName = ns[0];
          param.showType = 'File';
        }

        if (_.indexOf(imageType, param.showType) !== -1) {
          param.isImage = true;
        }

        return param;
      },
      setList(list) {
        if (_.isEmpty(list)) {
          return false;
        }

        if (_.isString(list)) {
          list = [list];
        }

        _.map(list, value => {
          let param = this.filterType(value);

          if (_.isEmpty(this.fileList[param.id])) {
            this.$set(this.fileList, param.id, param);
          }
        });

      },
      getFiles() {
        let files = _.pluck(_.values(this.fileList), 'fileKey');
        return _.map(files, val => {
          return `${bucket}:${val}`;
        });
      }
    },
  }

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .upload-btn {
    width: 100px;
    height: 100px;
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    line-height: 146px;
    position: relative;
    vertical-align: middle;
    display: inline-block;
  }

  .ucn-upload.small .upload-btn {
    width: 50px;
    height: 50px;
  }

  .upload-btn > i {
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 24px;
    color: #8c939d;
    transform: translate(-50%, -50%);
  }

  .upload-file {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }

  .upload-list {
    vertical-align: middle;
    display: inline-block;
  }

  .upload-list > li {
    width: 100px;
    height: 100px;
    display: inline-block;
    background-color: #fbfdff;
    word-wrap: break-word;
    border: 1px solid #c0ccda;
    border-radius: 6px;
    margin-left: 10px;
    position: relative;
    vertical-align: middle;
    box-sizing: border-box;
  }

  .ucn-upload.small .upload-list > li {
    width: 50px;
    height: 50px;
  }

  .operation-box {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 5;
    border-radius: 6px;
    background-color: rgba(0, 0, 0, .8);
    opacity: 0;
    transition: all .5s;
  }

  .operation-box:hover {
    opacity: 1;
  }

  .operation-box i {
    position: absolute;
    top: 50%;
    font-size: 18px;
    color: #ffffff;
    cursor: pointer;
    transition: all .5s;
    transform: translate(-50%, -50%);
  }

  .operation-box .el-icon-download {
    left: 25%;
  }

  .operation-box .el-icon-delete {
    left: 75%;
  }

  .operation-box .el-icon-view {
    left: 75%;
  }

  .operation-box i:hover {
    color: #409eff;
  }

  .operation-box.readonly .el-icon-delete {
    display: none;
  }

  .operation-box:not(.image) .el-icon-view {
    display: none;
  }

  .operation-box.readonly:not(.image) .el-icon-download {
    left: 50%;
  }

  .progress {
    position: absolute;
    height: 100%;
    width: 0;
    background-color: rgba(0, 0, 0, .5);
    /*border-radius: 6px;*/
    bottom: 0;
    left: 0;
    z-index: 2;
    opacity: 1;
    transition: all 1s;
  }

  .progress.close {
    opacity: 0;
    z-index: -10;
    transition: all 1s;
    transition-delay: 1s;
  }

  .progress h6 {
    color: #ffffff;
    width: 100%;
    line-height: 20px;
    text-align: center;
    transition-delay: 1s;
  }

  .upload-list > li label {
    position: absolute;
    bottom: 0;
    left: 0;
    text-align: center;
    width: 100%;
    text-shadow: 1px 1px #eaeaea, -1px -1px #8a8a8a;
    color: #C8C8C8;
    font-size: 20px;
  }

  .ucn-upload.small .upload-list > li label {
    font-size: 16px;
    top: 50%;
    margin-top: -8px;
  }

  .upload-list > li span {
    display: block;
    height: 100%;
    width: 100%;
    text-align: center;
    padding: 3px 3px 20px 3px;
    box-sizing: border-box;
    color: #606266;
    opacity: .7;
  }

  .ucn-upload.small .upload-list > li span {
    display: none;
  }

  .img-box {
    background-position: center;
    width: 100%;
    height: 100%;
    border-radius: 6px;
    background-size: cover;
    transition-delay: 1s;
  }
</style>
