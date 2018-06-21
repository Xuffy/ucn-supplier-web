<template>
  <div class="ucn-history-modify">
    <el-dialog
      :title="isModify ? 'Modify' : 'History'"
      width="80%"
      @close="closeDialog"
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
              {{row[item.key].value}}
              <p v-if="row[item.key]._title" v-text="row[item.key]._title"></p>
            </div>

            <div v-else>
              <span v-if="(row[item.key]._disabled && !row._remark) || !isModify"
                    v-text="row[item.key].value"></span>

              <div v-else-if="row[item.key]._slot && !row._remark">
                <slot :name="item._slot" :data="row[item.key]"></slot>
              </div>

              <div v-else>
                <!--文本输入-->
                <el-input v-if="row[item.key].type === 'String' || row._remark" clearable
                          v-model="row[item.key].value" size="mini"></el-input>

                <!--数字输入-->
                <el-input-number
                  v-else-if="row[item.key].type === 'Number'"
                  v-model="row[item.key].value"
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

  // testData = testData.content.details;

  export default {
    name: 'VHistoryModify',
    components: {},
    props: {
      visible: {
        type: Boolean,
        default: false
      },

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
        this.modified = true;
        this.$emit('save', [this.dataList[0], this.dataList[1]]);
        this.showDialog = false;
      },
      init(editData, history = [], isModify = true) {
        let ed = [];
        if (_.isEmpty(editData) || !_.isArray(editData)) return false;
        // 初始化可编辑行
        ed = _.map(editData, value => {
          return _.mapObject(value, (val, index) => {
            if (!_.isObject(val)) return val;
            val._edit = true;
            val.type = index === 1 ? 'String' : val.type;
            val.value = val.value || val.value;
            val.value = _.isBoolean(val.value) ? val.value : val.value; // todo 屏蔽Boolean
            return val;
          });
        });
        this.dataList = this.$depthClone(ed.concat(history));

        this.defaultData = this.$depthClone(ed.concat(history));
        this.dataColumn = this.dataList[0];
        this.showDialog = true;
        this.isModify = isModify;

      },
      changeSelect(val, item) {
        let param = {}, obj;
        param[item._optionValue || 'code'] = val;
        obj = _.findWhere(item._option, param);
        item._value = obj ? obj[item._optionLabel || 'name'] : '';
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
      closeDialog() {
        if (this.modified) {
          this.dataList = this.$depthClone(this.defaultData);
        }
        this.modified = false;
        this.$emit('update:visible', false);
      },
      objectSpanMethod({row, column, rowIndex, columnIndex}) {
        if (columnIndex === 0) {
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
</style>
