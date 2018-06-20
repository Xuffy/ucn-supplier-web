<template>
  <div class="filter-column">
    <el-popover
      :width="200"
      v-model="visible"
      @hide="defaultChecked"
      placement="bottom-end"
      trigger="click">
      <i slot="reference" class="iconfont icon-shezhi"></i>
      <div v-loading="loading">
        <el-input v-model="filterText" :placeholder="$i.common.content" prefix-icon="el-icon-search"
                  size="mini" clearable style="margin-bottom: 10px"></el-input>
        <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate">{{$i.table.checkAll}}</el-checkbox>
        <div style="height: 200px;overflow: auto">
          <el-tree
            show-checkbox
            default-expand-all
            class="filter-tree"
            node-key="property"
            :data="dataList"
            @check-change="changeCheck"
            :props="{children: 'children',label: 'name'}"
            :filter-node-method="filterNode"
            ref="columnTree">
          </el-tree>
        </div>
        <br/>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-button size="mini" style="width: 100%" @click="submitFilter">{{$i.common.confirm}}</el-button>
          </el-col>
          <el-col :span="12">
            <el-button size="mini" style="width: 100%" @click="visible =  false">{{$i.common.cancel}}</el-button>
          </el-col>
        </el-row>
      </div>
    </el-popover>
  </div>
</template>

<script>

  export default {
    name: 'VFilterColumn',
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
      }
    },
    data() {
      return {
        loading: false,
        visible: false,
        checkedList: [],
        dataList: [],
        checkAll: false,
        filterText: '',
        isIndeterminate: true,
      }
    },
    watch: {
      data() {
        // this.defaultChecked();
      },
      filterText(val) {
        this.$refs.columnTree.filter(val);
      },
      checkAll(val) {
        val ? this.$refs.columnTree.setCheckedKeys(_.pluck(this.dataList, 'property'))
          : this.$refs.columnTree.setCheckedKeys([]);
      },
      checkedList(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.dataList.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.dataList.length;
      }
    },
    created() {
      // this.getConfig();
    },
    mounted() {
    },
    methods: {
      filterNode(value, data) {
        if (!value) return true;
        return data.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
      },
      getFilterData(data, checkList) {
        return _.map(data, val => {
          return _.mapObject(val, v => {
            if (_.isObject(v)) {
              v._hidden = checkList.indexOf(v.key) === -1;
            }
            return v;
          });
        });
      },
      getConfig(isUpdate = false) {
        return this.$ajax.post(this.$apis.GRIDFAVORITE_LIST, {bizCode: this.code},
          {contentType: 'F', cache: true, updateCache: isUpdate})
          .then(res => {
            let list = _.pluck(_.where(res, {isChecked: 1}), 'property');
            this.dataList = res;
            this.$refs.columnTree.setCheckedKeys(list);
            return list;
          });
      },
      submitFilter() {
        let selected = this.$refs.columnTree.getCheckedNodes()
          , params = {bizCode: this.code, userGridFavoriteList: []};
        this.loading = true;

        _.map(selected, value => {
          let {id, seqNum} = value;
          params.userGridFavoriteList.push({seqNum, gridFieldId: id});
        });

        this.$ajax.post(this.$apis.GRIDFAVORITE_UPDATE, params)
          .then(res => {
            this.visible = false;
            this.getConfig(true).then(data => {
              this.$emit('change', data);
            });
          })
          .finally(() => {
            this.loading = false;
          });
      },
      defaultChecked() {
        let list = [];
        _.map(this.dataList, val => {
          if (val.isChecked === 1) {
            list.push(val.property);
          }
        });
      },
      changeCheck(val) {
        this.checkedList = this.$refs.columnTree.getCheckedKeys();
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

</style>
<style>
  .ucn-table .ivu-poptip-body {
    padding: 0;
  }
</style>
