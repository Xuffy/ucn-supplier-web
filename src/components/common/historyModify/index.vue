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
        :span-method="objectSpanMethod"
        border>
        <el-table-column v-for="item in dataColumn" :key="item.id"
                         v-if="!item._hide"
                         min-width="200px"
                         :prop="item.key"
                         :label="item.label">

          <template slot-scope="scope" v-if="scope.row[item.key] && !scope.row[item.key]._hide">
            <div v-if="!scope.row[item.key]._edit || scope.row[item.key]._title">
              {{scope.row[item.key].value}}
              <p v-if="scope.row[item.key]._title" v-text="scope.row[item.key]._title"></p>
            </div>

            <div v-else>
              <span v-if="scope.row[item.key]._disabled || !isModify" v-text="scope.row[item.key].value"></span>
              <div v-else-if="scope.row[item.key]._slot && !scope.row._remark">
                <slot :name="item._slot" :data="scope.row[item.key]"></slot>
              </div>
              
              <div v-else>
                <el-input v-if="scope.row[item.key].type === 'String' || scope.row._remark" clearable
                          placeholder=""
                          v-model="scope.row[item.key].value" size="mini"></el-input>
                
                <span v-else-if="scope.row[item.key].type === 'Number' && !scope.row._remark">
                  <el-input-number
                      v-model="scope.row[item.key].value"
                      :min="scope.row[item.key].min || 0"
                      :max="scope.row[item.key].max || 99999999"
                      controls-position="right" 
                      size="mini"
                      :controls="false" 
                  />
                  <i>%</i>
                </span>
                <!--<span v-if="scope.row[item.key].unit"></span>-->
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <div slot="footer">
        <el-button @click="showDialog = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
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
        // this.dataList = this.getEditData(val);
      },
      visible(val) {
        this.showDialog = val;
      }
    },
    mounted() {
      // this.dataList = this.getEditData(this.data);
      // console.log(this.dataList)
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
            val.value = val.value || val.value + '';
            val.value = _.isBoolean(val.value) ? val.value + '' : val.value; // todo 屏蔽Boolean
            return val;
          });
        });
        // this.dataList = ed.concat(history);
        this.dataList = this.$depthClone(ed.concat(history));
        
        this.defaultData = this.$depthClone(ed.concat(history));
        this.dataColumn = this.dataList[0];
        this.showDialog = true;
        this.isModify = isModify;

      },
      getFilterData(data,k = 'id') {
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
