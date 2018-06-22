<template>
    <div class="payment">
        <div class="title">
            {{$i.payment.orderOverview}}
        </div>
        <div class="body">
            <div class="head">
                <div>
                    <span class="text">{{$i.payment.status}} : </span>
                    <el-radio-group size="mini" v-model="params.conditions.overdue" @change="getList">
                        <el-radio-button label="-1" border>{{$i.common.all}}</el-radio-button>
                        <el-radio-button label="1" >{{$i.payment.overdue}}</el-radio-button>
                        <el-radio-button label="0" >{{$i.payment.future}}</el-radio-button>
                    </el-radio-group>
                </div>
                <div class="spe-div">
                    <div class="View">
                        <span class="text">{{$i.payment.view}} : </span>
                        <el-radio-group size="mini"  v-model="params.conditions.orderType"  @change="getList">
                            <el-radio-button label="" border>{{$i.common.all}}</el-radio-button>
                            <el-radio-button label="30">{{$i.common.logisticOrder}}</el-radio-button>
                            <el-radio-button label="10">{{$i.common.purchaseOrder}}</el-radio-button>
                            <el-radio-button label="20">{{$i.common.qcOrder}}</el-radio-button>
                        </el-radio-group>
                    </div>
                    <div class="search">
                        <select-search
                          v-model="searchId"
                          class="search"
                          :options=options
                          @inputEnter="inputEnter"
                          :searchLoad="searchLoad">
                        </select-search>
                    </div>
                    <div class="Date">
                        <span class="text" style="width:170px">{{$i.payment.orderCreateDate}} : </span>
                        <el-date-picker
                                v-model="date"
                                type="daterange"
                                align="right"
                                unlink-panels
                                :range-separator="$i.element.to"
                                :start-placeholder="$i.element.startDate"
                                :end-placeholder="$i.element.endDate"
                                value-format="timestamp"
                                :picker-options="dateOptions">
                        </el-date-picker>
                    </div>
                </div>
            </div>
            <br>
            <!-- ref="tab" @action="action"  @page-change="pageChange" -->
            <div class="main">
                <v-table :data="tableDataList"
                :total-row="totalRow"
                :loading="tabLoad"
                :buttons="setButtons"
                @action="action"
                :rowspan="1"
                :height="500"
                @filter-value="onFilterValue"
                ></v-table>
               <page
                :page-data="pageData"
                @change="handleSizeChange"
                :page-sizes="[50,100,200]"
                @size-change="pageSizeChange"></page>
            </div>
        </div>
    </div>
</template>
<script>

    import {VTable,VPagination,selectSearch} from '@/components/index'
    export default {
        name:'payment',
        components:{
            selectSearch,
            VTable,
            page:VPagination
        },
        data(){
            return{
                // flag:true,
                pazeSize: [10, 20, 30, 40, 50, 100],
                pageTotal:0,
                searchLoad: false,
                viewByStatus:'',
                date:'',
                tabLoad:false,
                searchId:'1',
                pageData:{},
                options: [{
                  id: '1',
                  label: 'Order No'
                }],
                params:{
                  conditions: {
                    orderEntryEndDt: "",
                    orderEntryStartDt: "",
                    orderNoLike: "",
                    orderType: "",
                    overdue: -1
                  },
                  pn: 1,
                  ps: 50
                },
                dateOptions:{
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                //底部table数据
                tableDataList:[],
                totalRow: [],
                currency:[]
            }
        },
        watch: {
            date(){
              if (this.date){
                this.params.conditions.orderEntryStartDt = this.date[0]
                this.params.conditions.orderEntryEndDt = this.date[1]
              }else{
                this.params.conditions.orderEntryStartDt ='';
                this.params.conditions.orderEntryEndDt = '';
              }
              this.getList()
            },
        },
        methods:{
            onFilterValue(val) {
                console.log(val);
            },
            inputEnter(val) {
              if (!val.keyType) return this.$message({
                message: 'please choose a type',
                type: 'warning'
              });
              if (val.keyType == '1') {
                this.params.conditions.orderNoLike = val.key
              }
              this.getList()
            },
            handleSizeChange(val) {
                this.params.pn = val;
                this.getList();
            },
            pageSizeChange(val) {
                this.params.ps = val;
                this.getList();
            },
            //获取币种
            getCurrency(){
              this.$ajax.get(this.$apis.get_currency_all).then(res=>{
                this.currency = res
                console.log(this.currency)
              }).catch(err=>{
                console.log(err)
              });
            },
            getList(){
              this.tabLoad = true;
              this.$ajax.post(this.$apis.post_ledgerPage, this.params)
                .then(res => {
                  this.tabLoad = false;
                  this.searchLoad = false;
                  this.tableDataList = this.$getDB(this.$db.payment.table, res.datas,item=>{
                    item.waitPayment.value = (Number(item.planPayAmount.value)-Number(item.actualPayAmount.value)).toFixed(8);
                    item.waitReceipt.value = (Number(item.planReceiveAmount.value)-Number(item.actualReceiveAmount.value)).toFixed(8);
                    let currency;
                    currency = _.findWhere(this.currency, {code: item.currencyCode.value}) || {};
                    item.currencyCode._value = currency.name || '';

                    _.mapObject(item, val => {
                      val.type === 'textDate' && val.value && (val.value = this.$dateFormat(val.value, 'yyyy-mm-dd'))
                      return val
                    })

                    switch (item.orderType.value)
                    {
                      case 10:
                       item.orderType._value = 'Purchase order'
                        break;
                      case 20:
                        item.orderType._value = 'QC order'
                        break;
                      case 30:
                        item.orderType._value = 'Logisttic order'
                        break;

                    }
                    return item;
                  });

                  this.totalRow = this.$getDB(this.$db.payment.table, res.statisticalDatas, item => {
                    item.waitPayment.value = Number(item.planPayAmount.value)-Number(item.actualPayAmount.value);
                    item.waitReceipt.value = Number(item.planReceiveAmount.value)-Number(item.actualReceiveAmount.value);
                    let currency;
                    currency = _.findWhere(this.currency, {code: item.currencyCode.value}) || {};
                    item.currencyCode._value = currency.name || '';
                    console.log(item.currencyCode._value)
                    return item;
                  });
                  this.pageData=res;
                })
                .catch((res) => {
                  this.tabLoad = false;
                  this.searchLoad = false;
              });

            },
            action(item, type) {
                switch(type) {
                    case '1':
                      this.urgingPayment(item);
                      break;
                    case '2':
                        this.detail(item);
                        break;
                }
            },
            detail(item) {
                //点击进入对应po detail 10、lo detail 30、QC order detail 20页面
                if(item.orderType.value == 10){
                  this.$windowOpen({
                    url: '/order/detail',
                    params: {
                      orderNo:item.orderNo.value
                    }
                  });
              }else if(item.orderType.value == 20){
                  this.$windowOpen({
                    url: '/warehouse/qcDetail',
                    params: {
                      orderNo:item.orderNo.value
                    }
                  });
              }else{
                  this.$windowOpen({
                    url: '/logisticPlanDetail',
                    params: {
                      logisticsNo:item.orderNo.value
                    }
                  });
              }
            },
            urgingPayment(item) {
              // ① 催款，此操作会给对应付款人发一条提示付款的信息，在对方的workbench显示；
              // ④ 催款限制：每天能点三次，超过次数后禁用；每次点击间隔一分钟才能再次点击，其间按钮为禁用
              this.$ajax.post(`${this.$apis.post_payment_dunning}/${item.paymentId.value}?version=${item.version.value}`)
              .then(res => {

                this.$message({
                  type: 'success',
                  message: '催促成功!'
                });
              }).catch((res) => {

              });
            },
            setButtons(item){
              // disabled:true/false   10 付款 20 退款
                if(_.findWhere(item, {'key': 'type'}).value === 20) return [{label: 'Urging Payment', type: '1'},{label: 'Detail', type: '2'}]
                 return [{label: 'Detail', type: '2'}];
            },
            handleSizeChange(val) {
                this.params.ps = val;
            },
        },
        created(){
           this.viewByStatus = '1';
           this.getList();
           this.getCurrency();
        },
    }
</script>
<style scoped>
    .title{
        font-weight: bold;
        font-size: 18px;
        height: 32px;
        line-height: 32px;
        color:#666666;
        padding: 10px 0;
    }
    .head>div{
        margin-bottom: 10px;
    }
    .head .text{
        display: inline-block;
        width: 70px;
        font-size: 14px;
        /*font-weight: bold;*/
        color:#999999;
    }
    .spe-div:after{
        content: '';
        display: table;
        clear: both;
      overflow: hidden;
    }
    .spe-div .View{
        float: left;
    }
    .spe-div .search{
        float: right;
        margin-left: 10px;
    }
    .spe-div .Date{
        float: right;
    }

</style>
