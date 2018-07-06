<template>
  <div class="ucn-history-modify">
    <el-dialog
      :title="isModify ? $i.common.modify : $i.common.history"
      width="80%"
      @closed="closeDialog"
      :close-on-click-modal="false"
      :visible.sync="showDialog">

      <el-table
        :data="dataList"
        max-height="400px"
        style="display:flex;flex-direction:column;"
        :span-method="objectSpanMethod"
        border>
        <el-table-column v-for="item in dataColumn" :key="item.id"
                         v-if="!item._hide"
                         min-width="200px"
                         :prop="item.key"
                         :label="item.label">

          <template slot-scope="{ row }" v-if="row[item.key] && !row[item.key]._hide">
            <div v-if="!row[item.key]._edit || row[item.key]._title">
              {{row[item.key]._value || row[item.key].value}}
              <p v-if="row[item.key]._title" v-text="row[item.key]._title"></p>
            </div>

            <!--<div v-else-if="row[item.key]._image">
              <v-image class="img" :src="getImage(item._value || item.value)" height="30px" width="30px"></v-image>
            </div>-->

            <div v-else>
              <span
                v-if="(row[item.key]._disabled && !row._remark) || (!isModify && !row[item.key]._upload) || (!isModify && row._remark)"
                v-text="row[item.key]._value || row[item.key].value"></span>

              <!--附件上传-->
              <div v-else-if="row[item.key]._upload && !row._remark">
                <el-popover
                  placement="bottom"
                  width="300"
                  trigger="click">
                  <v-upload @change="val => {changeUploadFile(val,row[item.key])}"
                            :limit="row[item.key]._upload.limit || 5"
                            :ref="item.key + 'Upload'"
                            :only-image="row[item.key]._image"
                            :readonly="!isModify || row[item.key]._upload.readonly"
                            :list.sync="row[item.key]._value || row[item.key].value"></v-upload>
                  <el-button slot="reference" type="text">
                    <span v-if="!row[item.key]._image">
                      {{isModify && !row[item.key]._upload.readonly ? $i.upload.uploadingAttachments : $i.upload.viewAttachment}}
                    </span>
                    <span v-else>
                      {{isModify && !row[item.key]._upload.readonly ? $i.upload.uploadImage : $i.upload.viewImage}}
                    </span>
                    ({{row[item.key]._upload.list ? row[item.key]._upload.list.length : 0}})
                  </el-button>
                </el-popover>
              </div>

              <!--自定义插槽-->
              <div v-else-if="row[item.key]._slot && !row._remark">
                <slot :name="item._slot" :data="row[item.key]"></slot>
              </div>

              <div v-else>
                <!--文本输入-->
                <el-input v-if="row[item.key].type === 'String' || row._remark" clearable
                          @change="() => row[item.key]._isModified = true"
                          v-model="row[item.key].value" size="mini"></el-input>

                <!--数字输入-->
                <el-input-number
                  v-else-if="row[item.key].type === 'Number'"
                  v-model="row[item.key].value"
                  @change="() => row[item.key]._isModified = true"
                  :min="row[item.key].min || 0"
                  :max="row[item.key].max || 99999999"
                  controls-position="right"
                  size="mini"
                  :controls="false"
                  style="width:100%;"></el-input-number>

                <!--下拉选项-->
                <el-select
                  v-else-if="row[item.key].type === 'Select' && row[item.key]._option"
                  clearable
                  v-model="row[item.key].value"
                  @change="val => {changeSelect(val,row[item.key])}"
                  :placeholder="$i.order.pleaseChoose">
                  <el-option
                    v-for="(optionItem,index) in row[item.key]._option"
                    :key="index"
                    :label="optionItem[row[item.key]._optionLabel || 'name']"
                    :value="optionItem[row[item.key]._optionValue || 'code']">
                  </el-option>
                </el-select>

              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <div slot="footer">
        <el-button @click="showDialog = false">{{isModify ? $i.common.cancel : $i.common.close}}</el-button>
        <el-button v-if="isModify" type="primary" @click="submit">{{$i.common.confirm}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import VUpload from '../upload/index';
  import VImage from '../image/index';
  // testData = testData.content.details;

  export default {
    name: 'VHistoryModify',
    components: {VUpload, VImage},
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      disabledRemark: {
        type: Boolean,
        default: false
      },
      beforeSave: Function,
      closeBefore: Function
    },
    data() {
      return {
        showDialog: false,
        defaultData: [],
        dataList: [],
        dataColumn: [],
        isModify: false,
        modified: false,
      }
    },
    watch: {
      data(val) {
      },
      visible(val) {
        this.showDialog = val;
      }
    },
    mounted() {
    },
    methods: {
      submit() {
        let data = [this.dataList[0], this.dataList[1]]
          , uploadVm = null;
        this.modified = true;

        data[0] = _.mapObject(data[0], (val, key) => {
          let files;
          if (val._upload && _.isObject(val._upload)) {
            uploadVm = this.$refs[key + 'Upload'];
            uploadVm = _.isArray(uploadVm) ? uploadVm[0] : uploadVm;
            files = uploadVm.getFiles(true);
            val.value = files.key;
            val._value = files.url;
          }
          return val;
        })
        if (typeof this.beforeSave === 'function' && this.beforeSave(data) === false) {
          return;
        }

        if (this.closeBefore) {
          this.closeBefore(data, () => this.showDialog = false)
        } else {
          this.$emit('save', data);
          this.showDialog = false
        }
      },
      getImage(value, split = ',') {
        if (_.isEmpty(value)) return '';
        if (_.isString(value)) {
          value = value.split(split);
        }
        return value[0];
      },
      init(editData, history = [], isModify = true) {
        if (isModify && (_.isEmpty(editData) || !_.isArray(editData))) {
          return false
        }
        this.dataList = [];
        this.defaultData = [];
        this.dataColumn = [];
        // 初始化可编辑行
        _.map(this.$depthClone(editData), (value, index) => {
          this.$set(this.dataList, index, _.mapObject(value, (val, key) => {
            if (!_.isObject(val)) {
              return val;
            }
            val._edit = true;
            val.type = index === 1 ? 'String' : val.type;
            val.value = val.value || val.value;
            val.value = _.isBoolean(val.value) ? val.value : val.value; // todo 屏蔽Boolean
            return val;
          }));
        });
        this.dataList = this.dataList.concat(history);

        this.defaultData = this.$depthClone(this.dataList);
        this.dataColumn = this.dataList[0];
        this.showDialog = true;
        this.isModify = isModify;

        return this.dataList;

      },
      changeSelect(val, item) {
        let param = {}, obj;
        param[item._optionValue || 'code'] = val;
        obj = _.findWhere(item._option, param);
        item._value = obj ? obj[item._optionLabel || 'name'] : '';
        item._isModified = true;
      },
      getFilterData(data, k = 'id') {
        let list = [];
        _.map(data, value => {
          list.push(value);
          value.fieldRemark = value.fieldRemark || {};
          value.fieldRemark._remark = true;
          list.push(_.extend(_.mapObject(value, (val, key) => {
            if (key !== k) {
              val = '';
            }
            return val;
          }), value.fieldRemark));
        });
        return list;
      },
      changeUploadFile(val, item) {
        this.$set(item._upload, 'list', val);
        this.$set(item, '_isModified', true);
      },
      closeDialog() {
        if (this.modified) {
          this.dataList = this.$depthClone(this.defaultData);
        }
        _.map(this.dataList, value => {
          _.map(value, val => {
            if (_.isObject(val) && val._upload && this.$refs[val.key + 'Upload']) {
              this.$refs[val.key + 'Upload'][0].reset();
            }
          });
        });
        this.modified = false;
        this.$emit('update:visible', false);
      },
      objectSpanMethod({row, column, rowIndex, columnIndex}) {
        if (columnIndex === 0 && !this.disabledRemark) {
          if (rowIndex % 2 === 0) {
            return {
              rowspan: 2,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      }
    },
  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .ucn-history-modify /deep/ .el-table .cell {
    min-height: 23px;
  }
</style>
