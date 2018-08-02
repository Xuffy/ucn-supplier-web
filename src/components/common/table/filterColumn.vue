<template>
  <div class="filter-column">
    <el-popover
      v-model="visible"
      @after-leave="update()"
      placement="bottom-end"
      trigger="click">
      <div slot="reference" class="icon-btn">
        <i class="iconfont icon-shezhi"></i>&nbsp;
        <span>{{$i.table.setField}}</span>
      </div>
      <div v-loading="loading">
        <el-input v-model="filterText" :placeholder="$i.common.content" prefix-icon="el-icon-search"
                  size="mini" clearable style="margin-bottom: 10px"></el-input>
        <div style="height: 200px;overflow: auto">
          <el-tree
            show-checkbox
            default-expand-all
            node-key="property"
            :data="dataList"
            :props="{label: '_name'}"
            :indent="5"
            :filter-node-method="filterNode"
            ref="columnTree">
            <div slot-scope="{ node, data }" style="display: flex;justify-content: space-between;width: 100%">
              {{data._name}}<i class="el-icon-location field-location" v-if="!data.children && data.isChecked"
                               @click="locationField(data)"></i>
            </div>
          </el-tree>
        </div>
        <br/>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-button size="mini" style="width: 100%" @click="submitFilter">{{$i.common.confirm}}</el-button>
          </el-col>
          <el-col :span="12">
            <el-button size="mini" style="width: 100%" @click="cancel">{{$i.common.cancel}}</el-button>
          </el-col>
        </el-row>
      </div>
    </el-popover>
  </div>
</template>

<script>
  import $i from '../../../language/index';

  export default {
    name: 'VFilterColumn',
    props: {
      code: {
        type: String,
        default: '',
      },
      getConfig: {
        type: Function
      },
      tableRef: {
        type: Function
      }
    },
    data() {
      return {
        loading: false,
        visible: false,
        dataList: [{_name: $i.table.checkAll, children: []}],
        checkAll: false,
        filterText: '',
        isIndeterminate: true,
        columns: []
      }
    },
    watch: {
      filterText(val) {
        this.$refs.columnTree.filter(val);
      }
    },
    created() {
    },
    mounted() {
    },
    methods: {
      update(isUpdate = false, data = []) {

        if (!_.isEmpty(data)) {
          this.columns = _.values(data[0]);
        }

        return this.$ajax.get(this.$apis.GRIDFAVORITE_PARTWITHSETTING, {bizCode: this.code}, {cache: !isUpdate})
          .then(res => {
            let list = [], dataList = [], isSubmit = false;

            this.columns = _.map(this.columns, val => {
              let item = _.findWhere(res, {property: val._filed || val.key})
              if (!val._hide && item) {
                item._name = val.label;
                if (val._mustChecked) {
                  item.isChecked = 1;
                  isSubmit = true;
                  val._mustChecked = false;
                }
                dataList.push(item);
              }

              if (_.isObject(val) && _.isUndefined(val._sort)) {
                val._sort = !!item && item.sortable === 1;
              }
              return val;
            });

            list = _.pluck(_.where(res, {isChecked: 1}), 'property');

            this.init(dataList, list, isSubmit);

            return list;
          });
      },
      init(data, checkList, isSubmit) {
        this.dataList[0].children = data;

        this.$nextTick(() => {
          this.$refs.columnTree.setCheckedKeys(checkList);
          isSubmit && this.submitFilter();
        });
      },
      filterNode(value, data) {
        if (!value) return true;
        return data._name && data._name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
      },
      getFilterData(data, checkList) {
        return _.map(data, val => {
          return _.mapObject(val, v => {
            if (_.isObject(v)) {
              v._hidden = checkList.indexOf(v._filed || v.key) === -1;
            }
            return v;
          });
        });
      },
      submitFilter() {
        let selected = this.$refs.columnTree.getCheckedNodes()
          , params = {bizCode: this.code, userGridFavoriteList: []};
        this.loading = true;

        _.map(selected, value => {
          let {id, seqNum} = value;
          id && params.userGridFavoriteList.push({seqNum, gridFieldId: id});
        });

        this.$ajax.post(this.$apis.GRIDFAVORITE_UPDATE, params)
          .then(res => {
            let e = this.tableRef();
            if (!_.isUndefined(e.scrollLeft)) {
              e.scrollTop = 0;
              e.scrollLeft = 0;
            }
            this.visible = false;
            this.update(true).then(data => this.$emit('change', data));
          })
          .finally(() => this.loading = false);
      },
      cancel() {
        this.visible = false;
        this.update();
      },
      locationField(item) {
        let pe = this.tableRef()
          , key = item.property
          , timeout = null
          , be = pe
          , e;

        if (_.isUndefined(pe.scrollLeft)) {
          pe = pe.$el;
          be = pe.querySelector('.el-table__body-wrapper');
        }

        e = pe.querySelector(`.location-${key}`);

        if (!_.isEmpty(e)) {
          be.scrollLeft = e.offsetLeft - (pe.offsetWidth / 2);
          e.setAttribute('ucn-flicker', 'true');
          this.cancel();
          timeout = setTimeout(() => {
            clearTimeout(timeout);
            e.removeAttribute('ucn-flicker');
          }, 4000)
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .filter-column {
    margin-left: 10px;
    display: inline-block;
  }

  .filter-column .icon-shezhi {
    font-size: 20px;
    color: #666666;
    cursor: pointer;
  }

  .filter-column .icon-btn {
    color: #666666;
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-left: 20px;
  }

  .field-location {
    font-size: 14px;
    margin-left: 10px;
    color: #999999;
  }

  .field-location:hover {
    color: #3a8ee6;
  }


</style>
<style>
  .ucn-table .ivu-poptip-body {
    padding: 0;
  }

  @keyframes ucn-flicker-fade {
    from {
      background-color: #ffffff;
    }
    50% {
      background-color: #ECEFF1;
    }
    to {
      background-color: #ffffff;
    }
  }

  @-webkit-keyframes ucn-flicker-fade {
    from {
      background-color: #ffffff;
    }
    50% {
      background-color: #ECEFF1;
    }
    to {
      background-color: #ffffff;
    }
  }

  [ucn-flicker='true'] {
    animation: ucn-flicker-fade 1s infinite;
    -webkit-animation: ucn-flicker-fade 1s infinite;
  }
</style>
