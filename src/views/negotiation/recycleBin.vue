<template>
    <div class="compare-overview">
        <h3 class="hd">{{ title }}</h3>
        <div class="status">
            <div class="btn-wrap">
                <el-button type="primary" v-authorize="'INQUIRY:ARCHIVE:RECOVER'" @click="submit" :disabled="checkedArg.length <= 0">{{ `${$i.common.recover}(${checkedArg.length})` }}</el-button>
                <el-button type="primary" v-authorize="'INQUIRY:ARCHIVE:DOWNLOAD'">{{ `${$i.common.download}(${checkedArg.length ? checkedArg.length : 'all'})`}}</el-button>
            </div>
            <select-search :options="options" @inputChange="searchEnter" />
        </div>
        <v-table
            :data="tabData"
            :loading="tabLoad"
            :buttons="buttonsFn"
            @action="action"
            @change-sort="onListSortChange"
            @change-checked="changeChecked"
            :height="350"
            :page-total="pageTotal"
        />
    </div>
</template>
<script>
import { mapActions } from 'vuex';
import codeUtils from '@/lib/code-utils';
import { VTable, selectSearch } from '@/components/index';
export default {
  name: 'recycleBin',
  data() {
    return {
      title: '',
      pageTotal: 0,
      checkedArg: [],
      tabData: [],
      options: [{
        id: 'supplierName',
        label: this.$i.inquiry.supplierName,
        operator: 'like'
      }, {
        id: 'inquiryNo',
        label: this.$i.inquiry.InquiryNo,
        operator: 'like'
      }, {
        id: 'quotationNo',
        label: this.$i.inquiry.quotationNo,
        operator: 'like'
      }],
      bodyData: {
        key: '',
        keyType: '',
        // operatorFilters: { //筛选条件
        //     columnName: '',
        //     operator: '',
        //     property: '',
        //     resultMapId: '',
        //     value: {}
        // },
        ps: 10,
        pn: 1
        // sorts: [
        //     {
        //         nativeSql: true,
        //         orderBy: "string",
        //         orderType: "string",
        //         resultMapId: "string"
        //     }
        // ]
      },
      tabLoad: false
    };
  },
  components: {
    'select-search': selectSearch,
    'v-table': VTable
  },
  methods: {
    ...mapActions(['setMenuLink', 'setDic']),
    buttonsFn() {
      return [{ label: 'Detail', type: 'detail' }];
    },
    getInquiryList() {
      // 获取inquirylist
      this.$ajax
        .post(this.$apis.BUYER_POST_INQIIRY_LIST, this.bodyData)
        .then(res => {
          this.pageTotal = res.tc;
          this.tabData = this.$getDB(this.$db.inquiry.viewByInqury, res.datas, item => this.$filterDic(item));
          this.tabLoad = false;
          this.searchLoad = false;
        })
        ['catch'](() => {
          this.searchLoad = false;
          this.tabLoad = false;
        });
    },
    onListSortChange(args) {
      this.bodyData.sorts = args.sorts;
      this.getInquiryList();
    },
    searchEnter(item) {
      // 搜索框
      this.bodyData.key = item.key;
      this.bodyData.keyType = item.keyType;
      this.getInquiryList();
    },
    action(item, type) {
      // 操作表单 action
      switch (this.$route.params.type) {
        case 'compare':
          this.$router.push({
            name: 'negotiationCompareDetail',
            query: {
              id: item.id.value
            },
            params: {
              type: 'only'
            }
          });
          break;
        case 'inquiry':
          this.$router.push({
            path: '/negotiation/inquiryDetail',
            query: {
              id: item.id.value
            }
          });
          break;
      }
    },
    changeChecked(item) {
      // 选中的list
      let arr = [];
      item.forEach(item => {
        arr.push(item.id.value);
      });
      this.checkedArg = arr;
    },
    actionInquiry(type) {
      this.$ajax
        .post(this.$apis.BUYER_POST_INQUIRY_ACTION, {
          ids: this.checkedArg,
          action: type
        })
        .then(res => {
          this.tabData.forEach((item, index) => {
            res.forEach(key => {
              if (item.id.value === key) {
                this.tabData.splice(index, 1);
              }
            });
          });
          this.checkedArg = [];
        });
    },
    actionCompare() {
      this.$ajax
        .post(this.$apis.BUYER_POST_INQUIRY_COMPARE_RESTORE, this.checkedArg)
        .then(res => {
          this.checkedArg = [];
          this.getCompare();
        });
    },
    submit() {
      // 删除恢复
      switch (this.$route.params.type) {
        case 'inquiry':
          this.actionInquiry('revert');
          break;
      }
    },
    ajaxInqueryAction(type) {
      const argId = this.getChildrenId();
      this.$ajax
        .post(this.$apis.BUYER_POST_INQUIRY_ACTION, {
          action: type,
          ids: argId
        })
        .then(res => {
          this.getInquiryList();
          this.checkedData = [];
        });
    }
  },
  created() {
    switch (this.$route.params.type) {
      case 'inquiry':
        this.title = this.$i.common.archive;
        this.bodyData.recycleSupplier = 1;
        break;
    }
    this.setMenuLink({path: '/logs/index', query: {code: 'inquiry'}, label: this.$i.common.log});
    this.$ajax.post(this.$apis.POST_CODE_PART, ['INQUIRY_STATUS', 'CY_UNIT', 'ITM'], 'cache')
      .then(data => this.setDic(codeUtils.convertDicValueType(data)))
      .then(this.getInquiryList);
  }
};
</script>
<style lang="less" scoped>
.compare-overview {
  .hd {
    padding-left: 15px;
    height: 50px;
    line-height: 50px;
    color: #666;
  }
  .status {
    display: flex;
    height: 60px;
    box-sizing: border-box;
    padding-left: 25px;
    padding-right: 25px;
    align-items: center;
    justify-content: space-between;
    .btn-wrap {
      display: flex;
      align-items: center;
      span {
        font-size: 14px;
      }
    }
  }
}
</style>
