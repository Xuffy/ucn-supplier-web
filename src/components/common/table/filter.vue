<template>
  <div class="filter-value">
    <i class="el-icon-search" @click="visible = !visible" v-if="!hideFilterValue"></i>

    <v-filter-column :data="setFiledData" @filter-column="onFilterColumn"
                     v-if="!hideFilterColumn">
    </v-filter-column>

    <el-dialog title="Table filter" :visible.sync="visible" width="1000px">
      <ul>
        <li class="filter-item" v-for="(cItem,index) in conditionList">
          <el-select v-model="cItem.property" class="compute-key" filterable placeholder="请选择"
                     @change="selectCondition(cItem)">
            <el-option
              v-for="item in dataList"
              :key="item.name"
              :label="item.name"
              :value="item.property">
            </el-option>
          </el-select>

          <el-select v-model="cItem.operator" class="compute-type" placeholder="请选择">
            <el-option
              v-for="item in cItem.operators"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

          <el-input class="compute-value" v-if="cItem.dataType === 1" v-model="cItem.value"></el-input>

          <el-input-number v-if="cItem.dataType === 2 || cItem.dataType === 3"
                           v-model="cItem.value"
                           controls-position="right" :min="0">
          </el-input-number>

          <el-date-picker v-if="cItem.dataType === 4"
                          v-model="cItem.value"
                          align="right"
                          :type="cItem.operator === 'between' ? 'daterange' : 'date'"
                          :editable="false"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          placeholder="选择日期">
          </el-date-picker>
          <el-date-picker v-if="cItem.dataType === 5"
                          v-model="cItem.value"
                          align="right"
                          :type="cItem.operator === 'between' ? 'datetimerange' : 'datetime'"
                          :editable="false"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          placeholder="选择日期">
          </el-date-picker>

          <el-radio-group v-model="cItem.sort" size="small" v-if="cItem.sortable">
            <el-radio-button label="asc">升序</el-radio-button>
            <el-radio-button label="desc">降序</el-radio-button>
          </el-radio-group>

          <el-button icon="el-icon-plus" @click="addCompute"></el-button>
          <el-button icon="el-icon-minus" @click="cutCompute(index)"></el-button>

        </li>
      </ul>

      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="submitFilter">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

  import VFilterColumn from './filterColumn'

  const operators = [
    {value: '=', label: '等于'},
    {value: '>', label: '大于'},
    {value: '>=', label: '大于等于'},
    {value: '<', label: '大于'},
    {value: '<=', label: '小于等于'},
    {value: 'like', label: '包含'},
    {value: 'between', label: '区间'}
  ];

  export default {
    name: 'VFilterValue',
    props: {
      data: {
        type: Array,
        default() {
          return [];
        },
      },
      hideFilterValue: {
        type: Boolean,
        default: false,
      },
      hideFilterColumn: {
        type: Boolean,
        default: false,
      },
    },
    components: {VFilterColumn},
    data() {
      return {
        visible: false,
        dataList: [],
        setFiledData: [],
        computeTypeList: [
          {
            value: '>',
            label: '大于'
          },
          {
            value: '>=',
            label: '大于等于'
          },
          {
            value: '=',
            label: '等于'
          },
          {
            value: '<=',
            label: '小于等于'
          },
          {
            value: 'like',
            label: '包含'
          },
          {
            value: 'between',
            label: '区间'
          }
        ],
        conditionList: [
          {property: '', operator: '', value: '', sort: '', tooltipShow: false}
        ],
      }
    },
    watch: {},
    created() {
      // this.getConfig();
    },
    methods: {
      change(e) {
        console.log(e)
      },
      addCompute() {
        this.conditionList.push(this.$options.data().conditionList[0])
      },
      cutCompute(index) {
        if (this.conditionList.length > 1) {
          this.conditionList = _.filter(this.conditionList, (val, ind) => {
            return ind !== index;
          });
        } else {
          this.conditionList = this.$options.data().conditionList;
        }
      },
      getConfig() {
        this.$ajax.all([
          this.$ajax.get(this.$apis.gridfieldsetting, {}, {_cache: true}),
          this.$ajax.get(this.$apis.get_itemfavoriteList, {}, {_cache: true}),
        ]).then(data => {
          this.dataList = data[0];

          this.setFiledData = _.map(data[0], val => {
            if (!_.isEmpty(_.findWhere(data[1], {gridFieldId: val.name}))) {
              val._checked = true;
            }
            return val;
          });
        });
      },
      selectCondition(item) {
        let data = _.findWhere(this.dataList, {property: item.property})
          , op = data.operators.split(',');
        item.operators = [];

        _.map(op, val => {
          let v = _.findWhere(operators, {value: val});
          if (!_.isEmpty(v)) {
            item.operators.push(v);
          }
        });

        item.sort = '';
        item.tooltipContent = '';
        item.sortable = data.sortable;
        item.dataType = data.dataType;

      },
      onFilterColumn(val) {
        this.$ajax.get(this.$apis.get_itemfavoriteList).then(data => {
          this.setFiledData = _.map(this.dataList, val => {
            if (!_.isEmpty(_.findWhere(data, {gridFieldId: val.name}))) {
              val._checked = true;
            }
            return val;
          });
        });
        this.$emit('filter-column', val);
      },
      submitFilter() {
        let operatorFilters = []
          , sorts = [];
        for (let i = 0; i < this.conditionList.length; i++) {
          let val = this.conditionList[i]
            , {operator, property, value} = val;
          if (!operator || !property || !value) {
            this.$message({
              message: '请输入完整筛选条件',
              type: 'warning'
            });
            return false;
          }
          if (val.sort) {
            sorts.push({orderBy: property, orderType: val.sort});
          }
          operatorFilters.push({property, operator, value});
        }
        this.visible = false;
        this.$emit('filter-value', {operatorFilters, sorts});
      },
      getFilterColumn(dataList, checked) {
        return _.map(dataList, value => {
          return _.mapObject(value, val => {
            if (_.isObject(val)) {
              this.$set(val, '_hide', _.indexOf(checked, val.key) < 0);
              // val._hide = _.indexOf(checked, val.key) < 0;
            }
            return val;
          });
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .filter-value {
    display: inline-block;
    margin-left: 10px;
  }

  .filter-value .el-icon-search {
    font-size: 20px;
    color: #666666;
    cursor: pointer;
  }

  .filter-item {
    margin-bottom: 10px;
  }

  .compute-key {
    width: 120px;
  }

  .compute-type {
    width: 100px;
  }

  .compute-value {
    width: 150px;
  }
</style>
