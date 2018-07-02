<template>
  <div class='ucn-upload small'>
    <p class="upload-btn" v-if="!readonly">
      <i class="el-icon-plus"></i>
      <input class="upload-file" type="file" ref="upload"
             @change="uploadFile"
             v-bind="{multiple:limit !== 1}"
             :accept="onlyImage ? 'image/*' : ''"/>
    </p>
    <ul class="upload-list">
      <li v-for="item in fileList" :title="item.showName">
        <template v-if="!item.isImage">
          <label v-text="item.showType"></label>
          <span v-text="item.showName"></span>
        </template>

        <v-image class="img-box" v-else-if="item.url && item.url.indexOf('http') > -1"
                 :src="item.url"></v-image>
        <div :class="{close:!item.progress || item.progress === 1}" class="progress"
             :style="{width: (item.progress * 100) + '%'}">
        </div>

        <div class="operation-box" :class="{readonly:readonly,image:readonly && item.isImage}"
             v-show="item.progress === 1 || item.url">

          <i class="el-icon-download" @click="downloadFile(item)"></i>
          <i class="el-icon-delete" @click="deleteFile(item)"></i>
          <i class="el-icon-view" @click="$refs.uploadViewPicture.show(item.url)"></i>
        </div>

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
  import config from '../../../service/config';

  const imageType = ['JPG', 'PNG'];
  const prohibitType = ['EXE'];
  const maxSize = 128; // MB


  export default {
    name: 'VUpload',
    props: {
      list: {
        type: [Array, String],
        default() {
          return [];
        },
      },
      ossPrivate: {
        type: Boolean,
        default: false,
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
        bucket: ''
      }
    },
    created() {
      let {tenantId} = this.$localStore.get('user') || {};
      this.tenantId = tenantId;
    },
    mounted() {
      this.bucket = this.ossPrivate ? config.ENV.OSS_BUCKET_PRIVATE : config.ENV.OSS_BUCKET_PUBLIC;
    },
    watch: {
      fileList(val) {
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

          _.map(files, value => {
            let val = new File([value], value.name.replace(/\s/g, ''), {type: value.type});
            if (_.indexOf(prohibitType, val.name.split('.').pop().toLocaleUpperCase()) > -1) {
              return this.$message.warning(`${this.$i.upload.typeLimit}: ${prohibitType.join()} `);
            }

            if (val.size > 1024 * 1024 * maxSize) {
              return this.$message.warning(`${this.$i.upload.sizeLimit}: ${maxSize}MB`);
            }
            _.indexOf(fileNames, val.name) === -1 && this.startUpload(client, val);
          });

          this.$refs.upload.value = '';
        });
      },
      startUpload(client, files) {
        let _this = this
          , params
          , uid = _this.$getUUID()
          , fileKey = `${this.tenantId}/${uid}/${files.name}`;

        if (_.values(_this.fileList).length >= this.limit) {
          return this.$message.warning(`${this.$i.upload.numberLimit}: ${this.limit}`);
        }

        params = _.extend(this.filterType(files.name), {
          fileKey,
          fileName: files.name,
          progress: 0,
          id: uid,
          temporary: true
        });

        _this.$set(_this.fileList, uid, params);

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
        }).catch(() => {
          this.deleteFile(params);
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
          region: params.region,
          accessKeyId: params.accessKeyId,
          accessKeySecret: params.accessKeySecret,
          stsToken: params.securityToken,
          bucket: this.bucket
        });

      },
      filterType(name) {
        let rs = name.split('?')[0].split('/')
          , ns = rs.pop().split('.')
          , param = {};

        param.url = name;
        param.id = rs[rs.length - 1];

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
          this.fileList = {};
          return false;
        }

        if (_.isString(list)) {
          list = [list];
        }

        _.map(list, value => {
          let urls, param;
          if (!_.isString(value)) {
            return;
          }
          urls = value.split('?');
          param = this.filterType(`${decodeURIComponent(urls[0])}${urls[1] ? ('?' + urls[1]) : ''}`);

          if (_.isEmpty(this.fileList[param.id])) {
            this.$set(this.fileList, param.id, param);
          }
        });

      },
      getFiles(type) {
        let files = _.pluck(_.values(this.fileList), 'fileKey')
          , key = _.map(files, val => {
          return `${this.bucket}:${val}`;
        });

        return type ? {key, url: _.pluck(_.values(this.fileList), 'url')} : key;
      },
      reset() {
        this.setList({});
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
