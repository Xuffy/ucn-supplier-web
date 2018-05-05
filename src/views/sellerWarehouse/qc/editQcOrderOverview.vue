<template>
  <div class="QCOrderDetail">
    <el-form ref="ruleform" :model="fromArg">
      <el-row :gutter="10">
        <el-col
          v-for="(item, index) in $db.warehouse.qcDetailBasicInfo"
          :key="index"
          :xs="item.xs || 8"
          :sm="item.sm || 8"
          :md="item.md || 8"
          :lg="item.lg || 8"
          v-if="!item._inquiryHide && !item._hide"
        >
          <el-form-item
            :label="item.label"
            :prop="item.key"
            :rules="item.rules"
            :label-width="item.width || '200px'"
          >
            <el-input
              v-model="basicInfo[item.key]"
              :size="item.size || 'mini'"
              v-if="item.type === 'String' && !item._hide"

            />
            <el-input-number v-model="basicInfo[item.key]" :min="0" :max="100" v-if="item.type === 'phone'" controls-position="right" size="mini" :controls="false" style="width:100%;"/>
            <el-select
              v-model="selectAll[item.key]"
              value-key="id"
              :size="item.size || 'mini'"
              v-if="item.type === 'Select'"
              style="width:100%;"
            >
              <el-option
                v-for="item in selectAll[item.key]"
                :key="item.id"
                :id="item.id"
              />
            </el-select>
            <el-input
              type="textarea"
              v-model="basicInfo[item.key]"
              :rows="item.rows || 4"
              :size="item.size || 'mini'"
              :placeholder="item.placeholder"
              v-if="item.type === 'textarea'"
              resize="none"
              :disabled="true"
            />
            <v-up-load v-if="item.type === 'attachment' || item.type === 'upData'"/>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <h5 class="solid">付款信息</h5>
    <v-table
      :data="paymentData"
    />
    <h5 class="solid">产品信息</h5>
      <v-table
  :data="tableData"
/>
    <h5 class="solid">总结</h5>
    <el-form ref="ruleform" :model="fromArg">
      <el-row :gutter="10">
        <el-col
          v-for="(item, index) in $db.warehouse.summary"
          :key="index"
          :xs="item.xs || 8"
          :sm="item.sm || 8"
          :md="item.md || 8"
          :lg="item.lg || 8"
          v-if="!item._inquiryHide && !item._hide"
        >
          <el-form-item
            :label="item.label"
            :prop="item.key"
            :rules="item.rules"
            :label-width="item.width || '200px'"
          >
            <el-input
              v-model="basicInfo[item.key]"
              :size="item.size || 'mini'"
              v-if="!item._hide"
              disabled
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="footer">
      <hr>
      <span slot="footer">
            <el-button type="primary" @click="postQcSave">确认</el-button>
            <el-button>取消</el-button>
        </span>
    </div>
  </div>
</template>
<script>
  import { Upload, VTable } from '@/components/index';
  export default {
    name: 'QCOrderDetail',
    data() {
      return {
        selectAll: {
          QCType:[],
          QCMethod:[],
          surveyor:[],
          QCStatus:[],
          exchangeCurrency:[]

        },
        checkedList: [],
        checkedData: [],
        paymentData: [],
        orderType: 20,
        basicInfo: {},
        tabData: [],
        activeName2: '',
        dialogClose: false,
        id:1,
        type:'',
        tableData: [],
        copyData: []
      }
    },
    computed: {
      fromArg() {
        let json = {};
        _.mapObject(this.$db.warehouse.qcDetailBasicInfo, (val, k) => {
          json[k] = '';
        });
        return json;
      }
    },
    components: {
      'v-up-load': Upload,
      'v-table': VTable
    },
    created() {
      this.getDetail();
    },
    methods: {
      handleClick(tab, event) {
        this.checkedData = [];
        this.getQcList(tab.name);
      },
      handleSelectionChange() {

      },
      producInfoAction() {

      },
      changeChecked(item) {
        let arr = [];
        _.map(item, items => {
          _.pick(items, (val, k) => {
            if(k === 'id') arr.push(val.value);
          })
        })
        this.checkedData = arr;
      },
      //获取详细信息
      getDetail() {
        //this.$route.query.id
        this.$ajax.get(`${this.$apis.get_qc_getById}?id=${this.id}`)
          .then(res => {
            this.basicInfo = res;
            this.postPaymentList()
            this.getQcDetailList()
          })
      },
      changeChecked(item) {
        let arr = [];
        _.map(item, items => {
          _.pick(items, (val, k) => {
            if(k === 'id') arr.push(val.value);
          })
        })
        this.checkedData = arr;
      },
      postQcSave(){
        //提交修改
        const params = {
          qcDate:this.basicInfo.QCDate,
          qcMethodDictCode:this.basicInfo.QCStatus,
          surveyor:this.basicInfo.surveyor,
          serviceFee:this.basicInfo.serviceFee,
        }

      },
      getQcDetailList(name) {
        let params = {
          pn: 1,
          ps: 200,
          qcOrderId: this.basicInfo.id,
          skuInventoryStatusDictCode: name || ''
        };
        this.$ajax.post(this.$apis.post_qc_detail_page, params)
          .then(res => {
            this.tabData = this.$getDB(this.$db.warehouse.qcDetailProductInfo, res.datas);
          });
      },
      postPaymentList(){
        //获取付款信息
        this.$ajax.post(this.$apis.post_payment_list,{
          orderNo: this.basicInfo.qcOrderNo,
          orderType: this.orderType
        }).then(res=>{
          this.paymentData = res.datas;
        }).catch(err=>{
          console.log(err)
        });
      },
      postPaymentAccept(){
        //确认付款
        this.$ajax.post(this.$apis.post_payment_accept,{
          id:1
        }).then(res=>{
          console.log(res)

        }).catch(err=>{
          console.log(err)
        });
      },
      getUesrLList(){
        //获取当前登录用户所在企业下所有用户信息
        this.$ajax.post(this.$apis.get_user_list).then(res=>{
          this.selectAll.surveyor = res
        }).catch(err=>{
          console.log(err)
        });
      },
      getCodePart(){
        //获取元数据 下拉框
        this.$ajax.post(this.$apis.POST_CODE_PART,['QC_TYPE','QC_MD','QC_STATUS']).then(res=>{
          this.selectAll.QCMethod = _.findWhere(res, {'code': 'QC_MD'}).codes
          this.selectAll.QCStatus = _.findWhere(res, {'code': 'QC_STATUS'}).codes
          this.selectAll.QCType = _.findWhere(res, {'code': 'QC_TYPE'}).codes
        }).catch(err=>{
          console.log(err)
        });
      },
      getCurrency(){
        //币种
        this.$ajax.get(this.$apis.get_currency_all).then(res=>{
          this.selectAll.exchangeCurrency = res
        }).catch(err=>{
          console.log(err)
        });
      }
    },
    created(){
       // this.getUesrLList()
       this.getCodePart()
       this.getCurrency()
       this.getDetail()
      console.log(this.$db)
    }
  }
</script>
<style scoped>
  .QCOrderDetail .el-form {
    padding: 10px;
  }
  .QCOrderDetail .el-form-item >>> .el-form-item__label {
    display:flex;
    justify-content:flex-end;
    text-align: left;
  }
</style>
<style scoped lang="less">
  .QCOrderDetail h5 {
    font-size:15px;
    font-weight: bold;
    color:#666;
    padding:10px 0;
    margin: 5px 0;
  &.solid {
     border-bottom:1px dotted #ccc;
   }
  }
  .footer{
    text-align: center;
    padding-top: 20px;
  }
</style>

