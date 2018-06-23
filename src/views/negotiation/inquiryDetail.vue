<template>
  <div class="inquiryDetail">
    <div class="hd">
      <h4 class="title">{{ $i.inquiry.inquiryDetailTitle }} {{ tabData[0] ? tabData[0].inquiryNo.value : '' }}</h4>
    </div>
    <div class="container" :class="{'active':switchStatus}">
      <div class="table-wrap">
        <div class="basic-info">
          <div class="basesic-hd">
            <h5>{{ $i.common.basicInfo }}</h5>
            <!-- <el-checkbox-group v-model="ChildrenCheckList">
                <el-checkbox :label="0">{{ $i.common.hideTheSame }}</el-checkbox>
                <el-checkbox :label="1">{{ $i.common.highlightTheDifferent }}</el-checkbox>
            </el-checkbox-group> -->
          </div>
          <div class="tab-msg-wrap">
            <v-table
                :height="450"
                :data.sync="newTabData"
                :selection="false"
                :buttons="basicInfoBtn"
                :loading="tableLoad"
                :rowspan="2"
                @action="basicInfoAction"
                :hideFilterColumn="statusModify"/>
          </div>
        </div>
        <div class="basic-info">
          <h5>{{ $i.common.productInfo }}</h5>
          <div class="status">
            <div class="btn-wrap">
              <el-button @click="addProduct" :disabled="!statusModify">{{ $i.common.addProduct }}</el-button>
              <el-button type="danger" :disabled="checkedAll && checkedAll.length && statusModify ? false : true" @click="removeProduct()">{{ $i.common.remove }} <span>({{checkedAll.length - submitData.deleteDetailIds.length}})</span></el-button>
            </div>
            <select-search :options="options" v-model="id" v-show="!statusModify" />
          </div>
          <v-table
              :data.sync="newProductTabData"
              :buttons="productInfoBtn"
              :loading="tableLoad"
              :height="450"
              @action="producInfoAction"
              @change-checked="changeChecked"
              :rowspan="2"
              :selection="statusModify"
              :hideFilterColumn="statusModify"/>
          <div class="bom-btn-wrap" v-show="!statusModify">
            <el-button @click="ajaxInqueryAction('accept')" :disabled="tabData[0].status.originValue+''!=='21'" v-if="tabData[0]" v-authorize="'INQUIRY:DETAIL:ACCEPT'">{{ $i.common.accept }}</el-button>
            <!-- <el-button type="danger" @click="deleteInquiry" :disabled="tabData[0].status.originValue + ''!=='99'||tabData[0].status.originValue+''!=='1'" v-if="tabData[0]" v-authorize="'INQUIRY:DETAIL:DELETE'">{{ $i.common.delete }}</el-button> -->
            <el-button @click="statusModify = true" :disabled="tabData[0].status.originValue+''!=='21'" v-if="tabData[0]" v-authorize="'INQUIRY:DETAIL:MODIFY'">{{ $i.common.modify }}</el-button>
            <el-button type="info" v-authorize="'INQUIRY:DETAIL:CANCEL_INQUIRY'" @click="ajaxInqueryAction('cancel')" :disabled="tabData[0].status.originValue+''!== '22'&&tabData[0].status.originValue+''!=='21'" v-if="tabData[0]">{{ $i.common.cancel }}</el-button>
            <el-button>{{ $i.common.download }}</el-button>
          </div>
          <div class="bom-btn-wrap" v-show="statusModify">
            <el-button @click="modify">{{ $i.common.send }}</el-button>
            <el-button type="info" @click="modifyCancel">{{ $i.common.exit }}</el-button>
          </div>
          <div class="bom-btn-wrap-box"></div>
        </div>
      </div>
    </div>
    <v-compare-list :data="compareConfig" @clearData="clerCompare" @closeTag="handleClose" @goCompare="startCompare" v-if="compareLists" />
    <el-dialog
          :title="$i.common.addProduct"
          :visible.sync="newSearchDialogVisible"
          width="70%"
          lock-scroll>
      <el-radio-group v-model="radio" @change="trig = new Date().getTime()">
        <el-radio-button label="product">{{ $i.common.fromNewSearch }}</el-radio-button>
        <el-radio-button label="bookmark">{{ $i.common.FromMyBookmark }}</el-radio-button>
      </el-radio-group>
      <v-product
          :hideBtns="true"
          :hideBtn="true"
          :disabledLine="disabledLine"
          @handleOK="queryAndAddProduction"
          :forceUpdateNumber="trig"
          :type="radio"
          :isInquiry="true">
      </v-product>
    </el-dialog>
    <v-history-modify @save="save" ref="HM"></v-history-modify>
    <v-message-board module="inquiry" code="inquiryDetail" :id="$route.query.id+''"></v-message-board>
  </div>
</template>
<script>
/**
 * @param ChildrenCheckList Basic Info 多选框选中值
 * @param keyWord search框 值
 * @param value 下拉框选中的值
 * @param options 下拉框原始数据
 * @param list 留言板list
 * @param submit 留言 Events
 * @param switchStatus 留言板状态
 * @param boardSwitch 留言板开关 Events
 */
import {
  VMessageBoard,
  selectSearch,
  VTable,
  compareList,
  VHistoryModify
} from '@/components/index';
import { getData } from '@/service/base';
import product from '@/views/product/addProduct';
import { mapActions, mapState } from 'vuex';
import codeUtils from '@/lib/code-utils';

export default {
  name: 'inquiryDetail',
  data() {
    return {
      fromArg: {},
      loading: false,
      disabledLine: [],
      trig: 0,
      disabledTabData: [],
      id: '',
      compareLists: false,
      tabData: [],
      productTabData: [],
      newTabData: [],
      newProductTabData: [],
      tableLoad: true,
      checkedAll: '',
      msgTableType: false,
      historyColumn: {},
      msgTitle: '',
      historyData: [],
      radio: 'product',
      oSwitch: false, // VHistory 组件开关状态
      statusModify: false,
      newSearchDialogVisible: false,
      compareConfig: [],
      ChildrenCheckList: [],
      keyWord: '',
      value: '',
      switchStatus: false,
      options: [
        {id: '1', label: 'SKU code'},
        {id: '2', label: 'SKU Name'},
        {id: '3', label: 'SKU description'},
        {id: '4', label: 'Vendor SKU code'},
        {id: '5', label: 'Vendor SKU name'},
        {id: '6', label: 'Vendor SKU description'}
      ],
      list: [],
      tableColumn: '',
      submitData: {
        deleteDetailIds: []
      },
      idType: ''
    };
  },
  components: {
    'v-message-board': VMessageBoard,
    'select-search': selectSearch,
    'v-table': VTable,
    'v-product': product,
    'v-compare-list': compareList,
    VHistoryModify
  },
  computed: {
    ...mapState({
      primeList: state => state.dic
    }),
    selectAll() {
      let json = {};
      _.mapObject(this.$db.inquiry.basicInfo, (val, k) => {
        if (val.transForm && val.transForm !== 'time') {
          json[val.transForm] = _.findWhere(this.primeList, {code: val.transForm}) ? _.findWhere(this.primeList, { code: val.transForm }).codes : '';
        }
      });
      return json;
    }
  },
  created() {
    this.setDraft({name: 'negotiationDraft', params: {type: 'inquiry'}, show: true});
    this.setRecycleBin({name: 'negotiationRecycleBin', params: {type: 'inquiry'}, show: false});

    this.submitData.id = this.$route.query.id;
    if (this.$localStore.get('$in_quiryCompare')) {
      this.compareConfig = this.$localStore.get('$in_quiryCompare');
    }
    this.getBaseData().then(this.getInquiryDetail);
  },
  watch: {
    ChildrenCheckList(val, oldVal) {
      let data = this.tabData;
      val.forEach(item => {
        if (item + '' === '0') {
          data = this.$table.setHideSame(this.tabData);
        }
        if (item + '' === '1') {
          data = this.$table.setHighlight(this.tabData);
        }
      });
      this.newTabData = data;
    }
  },
  methods: {
    ...mapActions(['setDraft', 'setRecycleBin', 'setDic']),
    deleteInquiry() {
      this.$confirm(this.$i.common.confirmDeletion, this.$i.common.prompt, {
        confirmButtonText: this.$i.common.confirm,
        cancelButtonText: this.$i.common.cancel,
        type: 'warning'
      }).then(() => {
        this.$ajax.post(this.$apis.BUYER_POST_INQUIRY_ACTION, {
          action: 'delete',
          ids: [this.$route.query.id]
        }).then(() => {
          this.$router.push('/negotiation/inquiry');
        });
      });
    },
    getBaseData() {
      const postCodes = this.$ajax.post(
        this.$apis.POST_CODE_PART,
        [
          'INQUIRY_STATUS',
          'PMT',
          'ITM',
          'AE_IS',
          'EL_IS',
          'RA_IS',
          'SUPPLIER_TYPE',
          'MD_TN',
          'SKU_SALE_STATUS',
          'SKU_UNIT',
          'ED_UNIT',
          'LH_UNIT',
          'WT_UNIT',
          'VE_UNIT',
          'OEM_IS',
          'UDB_IS',
          'SKU_PG_IS'
        ],
        { cache: true }
      );
      const getCurrencies = this.$ajax.get(this.$apis.get_currency_all, '', {cache: false});
      const getCountries = this.$ajax.get(this.$apis.GET_COUNTRY_ALL, '', {cache: true});
      return this.$ajax.all([postCodes, getCurrencies, getCountries]).then(res => {
        let data = res[0];
        data.push({
          code: 'CY_UNIT',
          name: 'CY_UNIT(币种)',
          codes: (() => {
            res[1].forEach(item => item.name = item.code);
            return res[1];
          })()
        });
        data.push({
          code: 'COUNTRY',
          name: 'COUNTRY(国家)',
          codes: res[2]
        });
        this.setDic(codeUtils.convertDicValueType(data));
        return Promise.resolve(data);
      });
    },
    addProduct() {
      this.disabledLine = this.newProductTabData.filter(item => !item._disabled);
      this.trig = new Date().getTime();
      this.newSearchDialogVisible = true;
    },
    startCompare() {
      // 前往比较
      let arr = this.compareConfig.map(i => i.id);
      this.$router.push({
        name: 'negotiationCompareDetail',
        params: {
          type: 'new'
        },
        query: {
          ids: arr.join(',')
        }
      });
    },
    clerCompare() {
      // clear
      this.compareConfig = [];
      this.$localStore.remove('$in_quiryCompare');
    },
    handleClose(item) {
      // 删除
      this.compareConfig.forEach((items, index) => {
        if (items.id === item.id) {
          this.compareConfig.splice(index, 1);
        }
      });
      this.$localStore.set('$in_quiryCompare', this.compareConfig);
    },
    addToCompare() {
      // 添加对比
      this.compareLists = true;
      let config = {
        name: this.tabData[0].inquiryNo.value,
        id: this.tabData[0].id.value
      };

      for (let i = 0; i < this.compareConfig.length; i++) {
        if (this.compareConfig[i].id === config.id) {
          return;
        }
      }
      this.compareConfig.push(config);
      this.$localStore.set('$in_quiryCompare', this.compareConfig);
    },
    markFieldHighlight(items, color) {
      let c = color || 'yellow';
      let remarks = items.filter(i => i._remark);
      let lines = items.filter(i => !i._remark);
      for (let line of lines) {
        let fieldDisplay = line.fieldDisplay.value;
        if (typeof fieldDisplay === 'object') {
          Object.keys(fieldDisplay).forEach(k => {
            if (fieldDisplay[k] === '1' && line[k]) {
              line[k]._style = 'background-color: ' + c;
            }
          });
        }

        let key = line.hasOwnProperty('skuId') ? 'skuId' : 'id';
        let remark = remarks.find(i => i[key].value.toString() === line[key].value.toString());
        let fieldRemarkDisplay = line.fieldRemarkDisplay.value;
        if (typeof fieldRemarkDisplay === 'object') {
          Object.keys(fieldRemarkDisplay).forEach(k => {
            if (fieldRemarkDisplay[k] === '1' && remark[k]) {
              remark[k]._style = 'background-color: ' + c;
            }
          });
        }
      }
    },
    getInquiryDetail() {
      let promise = null;
      if (this.$route.query.id) {
        promise = this.$ajax.get(`${this.$apis.BUYER_GET_INQIIRY_DETAIL}/{id}`, {id: this.$route.query.id});
      } else if (this.$route.query.code) {
        promise = this.$ajax.get(`${this.$apis.BUYER_GET_INQIIRY_DETAIL_BY_CODE}?code=${this.$route.query.code}`);
      } else {
        this.$message(this.$i.common.addressError);
        return;
      }
      promise.then(res => {
        // Basic Info
        this.tabData = this.newTabData = this.$getDB(
          this.$db.inquiry.basicInfo,
          this.$refs.HM.getFilterData([res]),
          item => this.$filterDic(item)
        );
        // SKU_UNIT
        // Product Info
        this.productTabData = this.newProductTabData = this.$getDB(
          this.$db.inquiry.productInfo,
          this.$refs.HM.getFilterData(res.details, 'skuId'),
          item => this.$filterDic(item)
        );
        this.markFieldHighlight(this.newTabData);
        this.markFieldHighlight(this.newProductTabData);
        this.tableLoad = false;
      }).catch(() => {
        this.tableLoad = false;
      });
    },
    queryAndAddProduction(ids) {
      this.$ajax.post(this.$apis.BUYER_POST_INQUIRY_SKUS, ids).then(res => {
        let arr = this.$getDB(
          this.$db.inquiry.productInfo,
          this.$refs.HM.getFilterData(res, 'skuId'),
          item => this.$filterDic(item)
        );
        this.newProductTabData = arr.concat(this.newProductTabData);
        this.newSearchDialogVisible = false;
      });
    },
    basicInfoBtn(item) {
      let options = [];
      if (item.id.value) {
        options.push({label: this.$i.common.histoty, type: 'histoty'});
        if (this.statusModify) {
          options.push({label: this.$i.common.modify, type: 'modify'});
        }
      }
      return options;
    },
    productInfoBtn(item) {
      let options = null;
      if (!item._disabled) {
        options = [
          {label: this.$i.common.histoty, type: 'histoty', _disabled: false},
          {label: this.$i.common.detail, type: 'detail', _disabled: false}
        ];
        if (this.statusModify) {
          options.push({label: this.$i.common.modify, type: 'modify'});
        }
      }
      return options;
    },
    save(data) {
      // modify 编辑完成反填数据
      let items = _.map(data, item => {
        let changedFields = {};
        _.map(item, (o, field) => {
          if (['fieldDisplay', 'fieldRemarkDisplay', 'status', 'entryDt', 'updateDt'].indexOf(field) > -1) {
            return;
          }
          if (o.value !== o.originValue) {
            changedFields[field] = '1';
          }
        });
        item.$changedFields = changedFields;
        return item;
      });

      if (this.idType === 'basicInfo') {
        this.newTabData = items;
      } else if (this.idType === 'producInfo') {
        this.newProductTabData = _.map(this.newProductTabData, oldItem => {
          let tmp = _.filter(items, item => _.findWhere(oldItem, {'key': 'skuId'}).value === _.findWhere(item, {'key': 'skuId'}).value && !!oldItem._remark === !!item._remark);
          return tmp[0] || oldItem;
        });
      }
    },
    fnBasicInfoHistoty(item, type, config) {
      // 查看历史记录
      let arr;
      if (!item.id.value) {
        if (config.type === 'modify') {
          arr = this.newProductTabData.filter(i => i.skuId.value === config.data);
          this.$refs.HM.init(arr, [], true);
        }
        return;
      }
      let historyApi = item.skuId ? this.$apis.BUYER_GET_INQUIRY_DETAIL_HISTORY : this.$apis.BUYER_GET_INQUIRY_HISTORY;
      // 历史中始终要显示的列
      let excludeColumns = ['id', 'skuId', 'fieldDisplay', 'fieldRemark', 'fieldRemarkDisplay', 'updateDt', '_remark'];
      this.$ajax.get(historyApi, {id: item.id.value}).then(res => {
        // 处理只显示修改列
        res.forEach(i => {
          if (i.fieldDisplay) {
            let fs = Object.keys(i.fieldDisplay);
            if(fs.length === 0) return;
            Object.keys(i).forEach(field => {
              if (!excludeColumns.includes(field) && !fs.includes(field)) {
                i[field] = null;
              }
            });
          }
          if (i.fieldRemarkDisplay) {
            let fs = Object.keys(i.fieldRemarkDisplay);
            if(fs.length === 0) return;
            Object.keys(i.fieldRemark).forEach(field => {
              if (!excludeColumns.includes(field) && !fs.includes(field)) {
                i.fieldRemark[field] = null;
              }
            });
          }
        });
        if (type === 'basicInfo') {
          arr = this.newTabData.filter(i => i.id.value.toString() === config.data.toString());
          this.$refs.HM.init(arr, this.$getDB(this.$db.inquiry.basicInfo, this.$refs.HM.getFilterData(res), i => this.$filterDic(i)), config.type === 'modify');
        } else {
          arr = this.newProductTabData.filter(i => i.skuId.value.toString() === config.data.toString());
          this.$refs.HM.init(arr, this.$getDB(this.$db.inquiry.productInfo, this.$refs.HM.getFilterData(res, 'skuId'), i => this.$filterDic(i)), config.type === 'modify');
        }
        this.fromArg = arr[0];
      });
    },
    // basic info 按钮操作
    basicInfoAction(data, type) {
      if (['histoty', 'modify'].indexOf(type) === -1) return;
      this.idType = 'basicInfo';
      this.historyColumn = this.$db.inquiry.basicInfo;
      this.fnBasicInfoHistoty(data, 'basicInfo', {type, data: data.id.value});
      if (type === 'modify') this.onSwitch = true;
    },
    // Produc info 按钮操作
    producInfoAction(data, type) {
      if (type === 'detail') {
        this.$router.push({path: '/product/sourcingDetail', query: {id: data.skuId.value}});
        return;
      }
      if (['histoty', 'modify'].indexOf(type) === -1) return;
      this.idType = 'producInfo';
      this.historyColumn = this.$db.inquiry.productInfo;
      this.fnBasicInfoHistoty(data, 'productInfo', {type, data: data.skuId.value});
      if (type === 'modify') this.onSwitch = true;
    },
    // 获取选中的单 集合
    changeChecked(item) {
      this.checkedAll = item.filter(i => !i._remark);
    },
    // 创建单
    toCreateInquire() {
      this.$router.push('/negotiation/createInquiry');
    },
    // 接受单
    ajaxInqueryAction(type) {
      this.$ajax.post(this.$apis.BUYER_POST_INQUIRY_ACTION, {action: type, ids: [this.$route.query.id]}).then(() => {
        this.$router.push('/negotiation/inquiry');
      });
    },
    // 删除product 某个单
    removeProduct() {
      this.newProductTabData = this.newProductTabData.filter(item => this.checkedAll.map(i => i.skuId.value.toString()).indexOf(item.skuId.value.toString()) === -1);
      this.checkedAll = [];
    },
    modifyCancel() {
      // 页面编辑取消
      this.newTabData = this.tabData;
      this.newProductTabData = this.productTabData;
      this.productCancel();
      this.statusModify = false;
    },
    modify() {
      // 页面编辑提交
      let parentNode = this.dataFilter(this.newTabData)[0] ? this.dataFilter(this.newTabData)[0] : '';
      let arr = this.newProductTabData.filter(i => !i._disabled);
      parentNode.details = this.dataFilter(arr);
      parentNode.draft = 0;
      let saveData = this.$filterModify(parentNode);
      saveData.attachment = null;
      saveData.skuQty = saveData.details.length;
      this.$ajax.post(this.$apis.BUYER_POST_INQUIRY_SAVE, saveData).then(res => {
        this.newTabData[0].status.originValue = res.status;
        this.statusModify = false;
        this.getInquiryDetail();
      });
    },
    getRemarkObject(remark) {
      let o = {};
      Object.keys(remark).forEach(field => {
        if (!(/^[_$]/).test(field) && remark[field].value) {
          o[field] = remark[field].value;
        }
      });
      return o;
    },
    dataFilter(data) {
      let excludeColumns = '$changedFields,fieldDisplay,fieldRemarkDisplay,entryDt,updateDt,status';
      let datas = data.filter(item => !item._remark);
      let remarks = data.filter(item => item._remark);

      let list = [];
      for (let item of datas) {
        let o = {};
        let isDetailInfo = item.hasOwnProperty('skuId');
        let key = isDetailInfo ? 'skuId' : 'id';
        let remark = remarks.find(i => i[key].value.toString() === item[key].value.toString());
        o.fieldDisplay = item.$changedFields;
        if (remark) {
          o.fieldRemark = this.getRemarkObject(remark);
          o.fieldRemarkDisplay = remark.$changedFields;
        }
        Object.keys(item).forEach(field => {
          let val = item[field];
          if (excludeColumns.indexOf(field) > -1) return;
          o[field] = val.value;
        });
        list.push(o);
      }
      return list;
    },
    productCancel() {
      //  取消 product 编辑
      this.newProductTabData.forEach((item, index) => {
        if (!item._remove && item._disabled) {
          item._disabled = false;
          item._remove = false;
        }
        this.$set(this.newProductTabData, index, item);
      });
    },
    productModify() {
      //  提交 product 编辑
      this.newProductTabData.forEach((item, index) => {
        if (!item._remove && item._disabled) {
          item._remove = true;
          this.submitData.deleteDetailIds.push(item);
        }
        this.$set(this.newProductTabData, index, item);
      });
    }
  }
};
</script>
<style scoped>
.inquiryDetail >>> .el-checkbox-group .el-checkbox__label {
  font-size: 12px;
}
</style>

<style lang="less" scoped>
.inquiryDetail {
  .hd {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    border-bottom: 1px solid #999;
    padding-right: 50px;
    .title {
      padding-left: 15px;
      color: #666;
      font-size: 18px;
    }
  }
  .container {
    display: flex;
    .table-wrap {
      width: 100%;
      .basic-info {
        width: 100%;
        padding: 0 10px;
        box-sizing: border-box;
        .tab-msg-wrap {
          padding-right: 25px;
        }
        .basesic-hd {
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-sizing: border-box;
          height: 50px;
          align-items: center;
          padding-right: 30px;
          padding-left: 15px;
          box-sizing: border-box;
          h5 {
            font-size: 14px;
          }
        }
        .status {
          display: flex;
          height: 60px;
          box-sizing: border-box;
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
          .select-wrap {
            display: flex;
            align-items: center;
            .select {
              width: 110px;
              margin-right: 5px;
            }
            .set {
              cursor: pointer;
              padding-left: 18px;
              color: #999;
              i {
                font-size: 25px;
              }
            }
          }
        }
        .bom-btn-wrap {
          padding-top: 20px;
          padding-left: 190px;
          position: fixed;
          left: 0;
          bottom: 0;
          background: #fff;
          z-index: 99;
          width: 100%;
          box-shadow: 0 -1px 5px #ccc;
          button {
            margin-bottom: 10px;
          }
        }
        .bom-btn-wrap-box {
          width: 100%;
          height: 62px;
        }
      }
    }
    .message-board-wrap {
      position: relative;
      width: 300px;
      height: 100%;
      margin-top: 1px;
      background: #fff;
      z-index: 11;
      .con {
        width: 100%;
        overflow: hidden;
      }
      .switch-btn {
        width: 30px;
        position: absolute;
        left: -30px;
        top: 0;
        writing-mode: tb-rl;
        transform: rotate(180deg);
        cursor: pointer;
        background: #f2f2f2;
        line-height: 30px;
        height: 240px;
        text-align: right;
        font-size: 12px;
        color: #333;
        font-weight: bold;
        padding-bottom: 10px;
        border-radius: 0 5px 0 0;
        z-index: 11;
        i {
          transition: all 0.5s ease;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          font-size: 16px;
          font-weight: bold;
          color: #c0c0c0;
        }
      }
    }
  }
}
@media screen and (max-width: 1023px) {
  .inquiryDetail .container .table-wrap {
    width: 100%;
  }
  .inquiryDetail .container .message-board-wrap {
    position: fixed;
    right: 0;
    top: 100px;
    z-index: 999;
    width: 0;
    &.active {
      width: 300px;
    }
  }
}
</style>
