<template>
  <div class="filter-value">
    <i class="el-icon-search" @click="visible = !visible" v-if="!hideFilterValue"></i>

    <v-filter-column :data="setFiledData" @filter-column="onFilterColumn"
                     v-if="!hideFilterColumn">
    </v-filter-column>

    <el-dialog :title="$i.table.tableFilter" :visible.sync="visible" width="1000px">
      <ul>

        <li class="filter-item" v-for="(cItem,index) in conditionList">

          <el-select v-model="cItem.property" class="compute-key" filterable :placeholder="$i.table.selectTheColumn"
                     @change="selectCondition(cItem)">
            <el-option
              v-for="item in dataList"
              :key="item.name"
              :label="item.name"
              :value="item.property">
            </el-option>
          </el-select>

          <el-select v-model="cItem.operator" class="compute-type" clearable :placeholder="$i.table.selectionOperation">
            <el-option
              v-for="item in cItem.operators"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

          <div v-if="cItem.operator" style="display: inline-block">
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

          </div>

          <el-radio-group style="display: inline-block;vertical-align: top"
                          v-model="cItem.sort" size="mini">
            <el-radio-button label="asc">{{$i.table.asc}}</el-radio-button>
            <el-radio-button label="desc">{{$i.table.desc}}</el-radio-button>
          </el-radio-group>

          <el-button style="margin-left: 10px!important" icon="el-icon-edit-outline" @click="addCompute"></el-button>
          <el-button icon="el-icon-delete" @click="cutCompute(index)"></el-button>

        </li>
      </ul>

      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">{{$i.common.cancel}}</el-button>
        <el-button type="primary" @click="submitFilter">{{$i.common.confirm}}</el-button>
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
        conditionList: [
          {property: '', operator: '', value: '', sort: '', tooltipShow: false}
        ],
      }
    },
    watch: {},
    created() {
      this.getConfig();
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
          this.$ajax.post(this.$apis.GRIDFIELDSETTING_PART, ['Product_Sourcing_sku'], {_cache: true}),
          this.$ajax.post(this.$apis.GRIDFAVORITE_LIST, {bizCode: 'Product_Sourcing_sku'}, {
            _cache: true,
            _contentType: 'F'
          }),
        ]).then(data => {
          this.dataList = data[0];
          this.setFiledData = data[1];
          /*this.setFiledData = _.map(data[0], val => {
            if (!_.isEmpty(_.findWhere(data[1], {gridFieldId: val.name}))) {
              val._checked = true;
            }
            return val;
          });*/
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
        /*this.$ajax.get(this.$apis.get_itemfavoriteList).then(data => {
          this.setFiledData = _.map(this.dataList, val => {
            if (!_.isEmpty(_.findWhere(data, {gridFieldId: val.name}))) {
              val._checked = true;
            }
            return val;
          });
        });*/
        this.$emit('filter-column', val);
      },
      submitFilter() {
        let operatorFilters = []
          , sorts = [];
        for (let i = 0; i < this.conditionList.length; i++) {
          let val = this.conditionList[i]
            , {operator, property, value, sort} = val;

          if ((!operator || !property || !value) && !sort) {
            this.$message({
              message: this.$i.table.checkData,
              type: 'warning'
            });
            return false;
          }
          sort && sorts.push({orderBy: property, orderType: sort});
          operator && operatorFilters.push({property, operator, value});
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
    width: 140px;
  }

  .compute-type {
    width: 150px;
  }

  .compute-value {
    width: 150px;
  }
</style>
