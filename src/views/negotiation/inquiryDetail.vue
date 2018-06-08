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
            <el-button @click="ajaxInqueryAction('accept')" :disabled="tabData[0].status.dataBase+''!=='21'" v-if="tabData[0]" v-authorize="'INQUIRY:DETAIL:ACCEPT'">{{ $i.common.accept }}</el-button>
            <el-button type="danger" @click="deleteInquiry" :disabled="tabData[0].status.dataBase + ''!=='99'||tabData[0].status.dataBase+''!=='1'" v-if="tabData[0]" v-authorize="'INQUIRY:DETAIL:DELETE'">{{ $i.common.delete }}</el-button>
            <el-button @click="modifyAction" :disabled="tabData[0].status.dataBase+''!=='21'" v-if="tabData[0]" v-authorize="'INQUIRY:DETAIL:MODIFY'">{{ $i.common.modify }}</el-button>
            <el-button type="info" v-authorize="'INQUIRY:DETAIL:CANCEL_INQUIRY'" @click="ajaxInqueryAction('cancel')" :disabled="tabData[0].status.dataBase+''!== '22'&&tabData[0].status.dataBase+''!=='21'" v-if="tabData[0]">{{ $i.common.cancel }}</el-button>
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
      <el-radio-group v-model="radio" @change="fromChange">
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
 * @param ProductCheckList Product Info 多选框选中值
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
      ProductCheckList: [],
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
    this.submitData.id = this.$route.query.id;
    if (this.$localStore.get('$in_quiryCompare')) {
      this.compareConfig = this.$localStore.get('$in_quiryCompare');
    }
    this.getDictionaries();
    this.setRecycleBin({name: 'negotiationRecycleBin', params: {type: 'inquiry'}, show: false});
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
    },
    ProductCheckList(val, oldVal) {
      if (val[0] + '' === 0) {
        this.newProductTabData = this.$table.setHighlight(
          this.newProductTabData
        );
      }
      this.newProductTabData = arr;
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
        this.$ajax
          .post(this.$apis.BUYER_POST_INQUIRY_ACTION, {
            action: 'delete',
            ids: [this.$route.query.id]
          })
          .then(res => {
            this.$router.push('/negotiation/inquiry');
          });
      });
    },
    async getDictionaries() {
      const postCodePart = () => {
        // 通用字典
        return this.$ajax.post(
          this.$apis.POST_CODE_PART,
          [
            'INQUIRY_STATUS',
            'PMT',
            'ITM',
            'EL_IS',
            'SUPPLIER_TYPE',
            'MD_TN',
            'SKU_SALE_STATUS',
            'SKU_UNIT',
            'LH_UNIT',
            'VE_UNIT',
            'OEM_IS',
            'UDB_IS',
            'SKU_PG_IS'
          ],
          { cache: true }
        );
      };
      const getCurrencyAll = () => {
        // 币种 CY_UNIT
        return this.$ajax.get(this.$apis.get_currency_all, '', {cache: true});
      };
      const getCountryAll = () => {
        // 国家 COUNTRY
        return this.$ajax.get(this.$apis.GET_COUNTRY_ALL, '', {cache: true});
      };
      await this.$ajax.all([postCodePart(), getCurrencyAll(), getCountryAll()]).then(res => {
        let data = res[0];
        data = res[0].concat({
          code: 'CY_UNIT',
          name: 'CY_UNIT(币种)',
          codes: res[1]
        });
        data = data.concat({
          code: 'COUNTRY',
          name: 'COUNTRY(国家)',
          codes: res[2]
        });
        this.setDic(data);
      });
      this.getInquiryDetail();
    },
    addProduct() {
      let arr = [];
      _.map(this.newProductTabData, item => {
        if (!item._disabled) {
          arr.push(item);
        }
      });
      this.disabledLine = arr;
      this.trig = new Date().getTime();
      this.newSearchDialogVisible = true;
    },
    handleOK(item) {
      // 添加 product
      if (item && !item.length) {
        this.$message(this.$i.common.pleaseChooseGoods);
        return;
      }
      let ids = [];
      _.map(item, items => {
        ids.push(_.findWhere(items, { key: 'id' }).value);
      });
    },
    startCompare() {
      // 前往比较
      let arr = [];
      this.compareConfig.forEach(item => {
        arr.push(item.id);
      });
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
    markFieldHighlight(item, color, fieldDisplay) {
      let fd = fieldDisplay || 'fieldDisplay';
      let c = color || 'yellow';
      typeof item === 'object' && item[fd].value && _.mapObject(item[fd].value, (val, key) => {
        if (val === '1' && item[key]) {
          item[key]._style = 'background-color: ' + c;
        }
      });
    },
    getInquiryDetail() {
      // 获取 Inquiry detail 数据
      if (!this.$route.query.id) {
        return this.$message(this.$i.common.addressError);
      }
      this.$ajax.get(`${this.$apis.BUYER_GET_INQIIRY_DETAIL}/{id}`, {id: this.$route.query.id}).then(res => {
        let basicInfoData, newProductTabData;
        // Basic Info
        basicInfoData = this.$getDB(
          this.$db.inquiry.basicInfo,
          this.$refs.HM.getFilterData([res]),
          item => {
            this.$filterDic(item);
            this.markFieldHighlight(item);
            _.map(item, val => {
              val.defaultData = _.isUndefined(val.dataBase) ? val.value : val.dataBase;
            });
          }
        );
        this.newTabData = basicInfoData;
        this.tabData = basicInfoData;
        // SKU_UNIT
        // Product Info
        newProductTabData = this.$getDB(
          this.$db.inquiry.productInfo,
          this.$refs.HM.getFilterData(res.details, 'skuId'),
          item => {
            this.$filterDic(item);
            this.markFieldHighlight(item);
            _.map(item, val => {
              val.defaultData = _.isUndefined(val.dataBase) ? val.value : val.dataBase;
            });
          }
        );
        this.newProductTabData = newProductTabData;
        this.productTabData = newProductTabData;
        this.tableLoad = false;
      }).catch(err => {
        this.tableLoad = false;
      });
    },
    queryAndAddProduction(ids) {
      this.$ajax.post(this.$apis.BUYER_POST_INQUIRY_SKUS, ids).then(res => {
        let arr = this.$getDB(
          this.$db.inquiry.productInfo,
          this.$refs.HM.getFilterData(res, 'skuId'),
          item => {
            this.$filterDic(item);
            item.$pageState = 1;
          }
        );
        this.newProductTabData = arr.concat(this.newProductTabData);
        this.newSearchDialogVisible = false;
      });
    },
    basicInfoBtn(item) {
      // Basic info 按钮创建
      if (item.id.value && this.statusModify) {
        return [
          {
            label: this.$i.common.modify,
            type: 'modify'
          },
          {
            label: this.$i.common.histoty,
            type: 'histoty'
          }
        ];
      }

      if (item.id.value) {
        return [
          {
            label: this.$i.common.histoty,
            type: 'histoty'
          }
        ];
      }
    },
    productInfoBtn(item) {
      // Product info 按钮创建
      if (this.statusModify && !item._disabled) {
        return [
          { label: this.$i.common.modify, type: 'modify' },
          { label: this.$i.common.histoty, type: 'histoty' },
          { label: this.$i.common.detail, type: 'detail' }
        ];
      }
      if (this.statusModify && item._disabled) {
        return [
          { label: this.$i.common.modify, type: 'modify' },
          { label: this.$i.common.histoty, type: 'histoty' },
          { label: this.$i.common.detail, type: 'detail' }
        ];
      }
      if (!item._disabled) {
        return [
          { label: this.$i.common.histoty, type: 'histoty', _disabled: false },
          { label: this.$i.common.detail, type: 'detail', _disabled: false }
        ];
      }
    },
    fromChange(val) {
      this.trig = new Date().getTime();
    },
    modifyAction() {
      // 打开页面编辑状态
      this.statusModify = true;
    },
    save(data) {
      // modify 编辑完成反填数据
      let items = _.map(data, item => {
        let changedFields = !item._remark ? {} : false;
        _.map(item, (o, field) => {
          if (['fieldDisplay', 'status', 'entryDt', 'updateDt'].indexOf(field) > -1) {
            return;
          }
          if (o.value !== o.defaultData) {
            o._color = 'blue';
            if (changedFields) {
              changedFields[field] = '1';
            }
          }
        });
        if (item.id && item.id.value) {
          item.$pageState = 2;
        }
        if (changedFields) {
          item.$changedFields = changedFields;
        }
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
      let arr = [];
      if (item.$pageState && item.$pageState === 1) {
        if (config.type === 'modify') {
          _.map(this.newProductTabData, items => {
            if(_.findWhere(items, {'key': 'skuId'}).value === config.data) arr.push(items);
          });
          this.$refs.HM.init(arr, [], true);
        }
        return;
      }
      let historyApi = item.skuId ? this.$apis.BUYER_GET_INQUIRY_DETAIL_HISTORY : this.$apis.BUYER_GET_INQUIRY_HISTORY;
      this.$ajax.get(historyApi, {id: item.id.value}).then(res => {
        if (type === 'basicInfo') {
          _.map(this.newTabData, items => {
            if (_.findWhere(items, {'key': 'id'}).value+'' === config.data+'') arr.push(items);
          });
          this.$refs.HM.init(arr, this.$getDB(this.$db.inquiry.basicInfo, this.$refs.HM.getFilterData(res)), config.type === 'modify');
        } else {
          _.map(this.newProductTabData, items => {
            if (_.findWhere(items, {'key': 'skuId'}).value + '' === config.data + '') arr.push(items);
          });
          if (config.type === 'histoty') {
            this.$refs.HM.init(arr, this.$getDB(this.$db.inquiry.productInfo, this.$refs.HM.getFilterData(res, 'skuId')), false);
          } else {
            this.$refs.HM.init(arr, this.$getDB(this.$db.inquiry.productInfo, this.$refs.HM.getFilterData(res, 'skuId')), true);
          }
        }
        this.fromArg = arr[0];
      });
    },
    basicInfoAction(data, type) {
      // basic info 按钮操作
      this.idType = 'basicInfo';
      this.historyColumn = this.$db.inquiry.basicInfo;
      switch (type) {
        case 'histoty':
          this.fnBasicInfoHistoty(data, 'basicInfo', {type: 'histoty', data: data.id.value});
          break;
        case 'modify':
          this.fnBasicInfoHistoty(data, 'basicInfo', {type: 'modify', data: data.id.value});
          this.oSwitch = true;
          break;
      }
    },
    producInfoAction(data, type) {
      // Produc info 按钮操作
      this.idType = 'producInfo';
      this.historyColumn = this.$db.inquiry.productInfo;
      switch (type) {
        case 'histoty':
          this.fnBasicInfoHistoty(data, 'productInfo', {type: 'histoty', data: data.skuId.value});
          break;
        case 'modify':
          this.oSwitch = true;
          this.fnBasicInfoHistoty(data, 'productInfo', {type: 'modify', data: data.skuId.value});
          break;
        case 'detail':
          this.$router.push({path: '/product/sourcingDetail', query: {id: data.skuId.value}});
          break;
      }
    },
    changeChecked(item) {
      // 获取选中的单 集合
      this.checkedAll = item;
    },
    toCreateInquire() {
      // 创建单
      this.$router.push('/negotiation/createInquiry');
    },
    ajaxInqueryAction(type) {
      // 接受单
      this.$ajax.post(this.$apis.BUYER_POST_INQUIRY_ACTION, {action: type, ids: [this.$route.query.id]}).then(res => {
        this.$router.push('/negotiation/inquiry');
      });
    },
    removeProduct() {
      // 删除product 某个单
      let arr = [];
      _.map(this.newProductTabData, (item, index) => {
        if (_.indexOf(_.pluck(_.pluck(this.checkedAll, 'skuId'), 'value'), Number(item.skuId.value)) !== -1) {
          arr.push(item);
        }
      });
      this.newProductTabData = _.difference(this.newProductTabData, arr);
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
      let arr = [];
      _.map(this.newProductTabData, item => {
        if (!item._disabled) {
          arr.push(item);
        }
      });
      parentNode.details = this.dataFilter(arr);
      parentNode.draft = 0;
      this.$ajax.post(this.$apis.BUYER_POST_INQUIRY_SAVE, this.$filterModify(parentNode)).then(res => {
        this.newTabData[0].status.dataBase = res.status;
        this.tabData = this.newTabData;
        this.productTabData = this.newProductTabData;
        this.productModify();
        this.statusModify = false;
      });
    },
    dataFilter(data) {
      let excludeColumns = '$changedFields,$pageState,entryDt,updateDt,status';
      let arr = [], remark = {}, json = {};
      data.forEach(item => {
        remark = {};
        if (item._remark) {
          // 拼装remark 数据
          for (let field in item) {
            let value = item[field].value;
            if (value && value.length > 0) {
              remark[field] = value;
            }
          }
          json.fieldRemark = remark;
        } else {
          json = {};
          for (let k in item) {
            if (excludeColumns.indexOf(k) > -1) continue;
            if (k === 'fieldRemark') {
              json[k] = remark;
            } else if (k === 'fieldDisplay') {
              json[k] = {};
              if (item.$changedFields) {
                for (let f in item.$changedFields) {
                  if (item.$changedFields.hasOwnProperty(f)) {
                    json[k][f] = item.$changedFields[f];
                  }
                }
              }
            } else {
              if (item[k].dataType && item[k].dataType === 'boolean' && typeof item[k].value === 'string') {
                json[k] = item[k].value === '1' || item[k].value === 'true';
              } else {
                json[k] = item[k].value;
              }
            }
          }
          arr.push(json);
        }
      });
      return arr;
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
