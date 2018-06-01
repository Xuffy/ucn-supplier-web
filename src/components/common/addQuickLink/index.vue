<template>
  <div class="add-quick-link">

    <el-dialog :title="$i.common.addNewLinks" :visible.sync="$store.state.quickLink.show"
               @close="dialogClose">
      <el-checkbox-group v-model="checkedList">
        <el-row>
          <el-col :span="8" v-for="item in $db.common.quickLink" :key="item.key" v-if="item.customer">
            <el-checkbox :label="item.key">
              {{item.label}}
            </el-checkbox>
          </el-col>
        </el-row>
      </el-checkbox-group>

      <div slot="footer" class="dialog-footer">
        <el-button @click="$store.state.quickLink.show = false">{{$i.button.cancel}}</el-button>
        <el-button type="primary" @click="updateQuickLink" :loading="loading">{{$i.button.confirm}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  /**
   * 表格组件
   * @desc 组件描述
   * @author xuffy
   * @param {Object} [title]    - 参数说明
   * @param {String} [columns] - 参数说明
   *
   * @method @sort-change(val, key)   - 点击排序
   * @method @page-size-change(size)    - 改变分页条数
   * @method @page-change(page)   - 改变分页
   *
   * @example
   *  <v-table></v-table>
   */

  // import {mapState} from 'vuex'

  export default {
    name: 'VAddQuickLink',
    components: {},
    props: {
      data: {
        type: Array,
        default() {
          return [];
        },
      },
    },
    data() {
      return {
        loading: false,
        checkedList: [],
      }
    },
    computed: {},
    watch: {},
    mounted() {
      this.getQuickLink();
    },
    methods: {
      getQuickLink() {
        // this.$store.state.quickLink.list = this.$db.common.quickLink;
        this.$ajax.post(this.$apis.ITEMFAVORITE_PART, ['QUICK_LINK'])
          .then((data) => {
            let list = [];
            this.checkedList = _.map(data, val => {
              let v = this.$db.common.quickLink[val.itemCode];
              v.customer && list.push(this.$db.common.quickLink[val.itemCode]);
              return val.itemCode;
            });
            this.$store.state.quickLink.list = list;

          });
      },
      updateQuickLink() {
        let data = [];

        if (_.isEmpty(this.checkedList)) return this.$store.state.quickLink.show = false;

        this.loading = true;
        _.map(this.checkedList, (val, index) => {
          data.push({bizCode: 'QUICK_LINK', itemCode: val, seqNum: index})
        });

        this.$ajax.post(this.$apis.ITEMFAVORITE_UPDATE, data)
          .then(() => {
            this.getQuickLink();
            this.$message({
              message: this.$i.hintMessage.operationSuccessful,
              type: 'success'
            });
            this.$store.state.quickLink.show = false;
            this.loading = false;
          })
          .catch(() => {
            this.$message({
              message: this.$i.hintMessage.operationFailed,
              type: 'warning'
            });
            this.loading = false;
          });
      },
      dialogClose() {
        this.checkedList = _.map(this.$store.state.quickLink.list, val => {
          return val.key;
        });
      }
    }
  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
