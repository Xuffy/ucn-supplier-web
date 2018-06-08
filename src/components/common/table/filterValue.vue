<template>
  <div class="filter-value">
    <i class="iconfont icon-shaixuan" @click="visible = !visible"></i>

    <!--<v-filter-column :data="setFiledData" @filter-column="onFilterColumn"
                     v-if="!hideFilterColumn">
    </v-filter-column>-->

    <el-dialog :title="$i.table.tableFilter"
               :visible.sync="visible" width="1000px">
      <ul v-loading="loading">

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
                            :start-placeholder="$i.element.startDate"
                            :end-placeholder="$i.element.endDate"
                            :placeholder="$i.element.selectionDate">
            </el-date-picker>
            <el-date-picker v-if="cItem.dataType === 5"
                            v-model="cItem.value"
                            align="right"
                            :type="cItem.operator === 'between' ? 'datetimerange' : 'datetime'"
                            :editable="false"
                            :start-placeholder="$i.element.startDate"
                            :end-placeholder="$i.element.endDate"
                            :placeholder="$i.element.selectionDate">
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
        <el-button @click="submitFilter(true)">{{$i.table.reset}}</el-button>
        <el-button type="primary" @click="submitFilter()">{{$i.common.confirm}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

  import VFilterColumn from './filterColumn'
  import lang from '../../../language/index';

  const operators = [
    {value: '=', label: lang.table.equal},
    {value: '>', label: lang.table.greater},
    {value: '>=', label: lang.table.greaterAndEqual},
    {value: '<', label: lang.table.less},
    {value: '<=', label: lang.table.lessAndEqual},
    {value: 'like', label: lang.table.like},
    {value: 'between', label: lang.table.between}
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
      code: {
        type: String,
        default: '',
      },
    },
    components: {VFilterColumn},
    data() {
      return {
        visible: false,
        loading: false,
        dataList: [],
        setFiledData: [],
        conditionList: [
          {property: '', operator: '', value: '', sort: '', tooltipShow: false}
        ],
      }
    },
    created() {
      // this.getConfig();
    },
    watch: {
      visible(val) {
        if (val) {
          this.getConfig();
        }
      }
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
        this.loading = true;
        this.$ajax.post(this.$apis.GRIDFIELDSETTING_PART, [this.code], {cache: true})
          .then(res => {
            this.dataList = res;
          })
          .finally(() => {
            this.loading = false;
          })
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
      submitFilter(type) {
        let operatorFilters = []
          , sorts = [];

        if (!type) {
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
        } else {
          this.conditionList = this.$options.data().conditionList;
        }
        this.visible = false;
        this.$emit('change', {operatorFilters, sorts});
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

  .filter-value .icon-shaixuan {
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
