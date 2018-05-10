<template>
    <div class="payment">
        <div class="title">
            {{$db.payment.title.orderOverview.key}}
        </div>
        <div class="body">
            <div class="head">
                <div>
                    <span class="text">Status : </span>
                    <el-radio-group size="mini" v-model="params.conditions.overdue" @change="getList">
                        <el-radio-button label="-1" border>{{$i.common.all}}</el-radio-button>
                        <el-radio-button label="1" >已逾期</el-radio-button>
                        <el-radio-button label="0" >未逾期</el-radio-button>
                    </el-radio-group>
                </div>
                <div class="spe-div">
                    <div class="View">
                        <span class="text">View : </span>
                        <el-radio-group size="mini"  v-model="params.conditions.orderType"  @change="getList">
                            <el-radio-button label="" border>{{$i.common.all}}</el-radio-button>
                            <el-radio-button label="30">{{$i.common.logisticOrder}}</el-radio-button>
                            <el-radio-button label="10">{{$i.common.purchaseOrder}}</el-radio-button>
                            <el-radio-button label="20">{{$i.common.qcOrder}}</el-radio-button>
                        </el-radio-group>
                    </div>
                    <div class="search">
                        <select-search
                          class="search"
                          :options=options
                          @inputEnter="inputEnter"
                          :searchLoad="searchLoad">
                        </select-search>
                    </div>
                    <div class="Date">
                        <span class="text">Time : </span>
                        <el-date-picker
                                v-model="date"
                                type="daterange"
                                align="right"
                                unlink-panels
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
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
                :height="450"
                @filter-value="onFilterValue"
                ></v-table>
              <v-pagination
                :page-data.sync="params"
                @change="handleSizeChange"
                @size-change="pageSizeChange"
              />
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
            VPagination
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
                  ps: 10,
                  tc:0,
                  // sorts: [
                  //   {
                  //     nativeSql: true,
                  //     orderBy: "",
                  //     orderType: "",
                  //     resultMapId: ""
                  //   }
                  // ]
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
                totalRow: []
            }
        },
        watch: {
            date(){
                console.log(this.date)
              this.params.conditions.orderEntryStartDt = this.date[0]
              this.params.conditions.orderEntryEndDt = this.date[1]
              this.getList()
            },
        },
        methods:{
            onFilterValue(val) {
                console.log(val);
            },
            inputEnter(val) {
              console.log(val)
              if (!val.keyType) return this.$message('请选中搜索类型');
              if (!val.key) return this.$message('搜索内容不能为空');
              if (val.keyType == '1') {
                this.params.conditions.orderNoLike = val.key
              }
              this.getList()
            },
            handleSizeChange(val) {
              this.params.pn = val;
            },
            pageSizeChange(val) {
              this.params.ps = val;
            },
            getList(){
              this.tabLoad = true;
              this.$ajax.post(this.$apis.post_ledgerPage, this.params)
                .then(res => {
                  res.tc ? this.params.tc = res.tc : this.params.tc = this.params.tc;
                  this.tabLoad = false;
                  this.searchLoad = false;
                  this.tableDataList = this.$getDB(this.$db.payment.table, res.datas,item=>{
                    item.waitPayment.value = Number(item.planPayAmount.value)-Number(item.actualPayAmount.value);
                    item.waitReceipt.value = Number(item.planReceiveAmount.value)-Number(item.actualReceiveAmount.value);
                    // this.flag = item.waitPayment.value === 0;
                    // this.$set(this.flag,item.waitPayment.value === 0)

                    _.mapObject(item, val => {
                      val.type === 'textDate' && val.value && (val.value = this.$dateFormat(val.value, 'yyyy-mm-dd'))
                      return val
                    })

                    return item;
                  });

                  this.totalRow = this.$getDB(this.$db.payment.table, res.statisticalDatas, item => {
                    item.waitPayment.value = Number(item.planPayAmount.value)-Number(item.actualPayAmount.value);
                    item.waitReceipt.value = Number(item.planReceiveAmount.value)-Number(item.actualReceiveAmount.value);
                    // if(item.currencyCode.value ==='BTC'){
                    //   item._totalRow.label = 'BTC';
                    // }else if(item.currencyCode.value ==='HKD'){
                    //   item._totalRow.label = 'HKD';
                    // }else{
                    //   item._totalRow.label = 'EUR';
                    // }
                    return item;
                  });
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
                    this.$router.push({
                        path: '/',
                        query: {
                            // orderNo: _.findWhere(item, {'key': 'orderNo'}).value
                        }
                    });
                }else if(item.orderType.value == 20){
                    this.$router.push({
                        path: '/',
                        query: {
                            // orderNo: item.orderNo
                        }
                    });
                }else{
                    this.$router.push({
                        path: '/',
                        query: {
                            // orderNo: item.orderNo
                        }
                    });
                }
            },
            urgingPayment(item) {
              // ① 催款，此操作会给对应付款人发一条提示付款的信息，在对方的workbench显示；
              // ④ 催款限制：每天能点三次，超过次数后禁用；每次点击间隔一分钟才能再次点击，其间按钮为禁用
              const parmes = {
                orderNo:item.orderNo.value,
                orderType:item.orderType.value
              }
              this.$ajax.post(this.$apis.post_payment_dunning,parmes)
              .then(res => {
                this.$message('已催促采购商对应的付款人付款');
              })
            },
            setButtons(item){
                if(_.findWhere(item, {'key': 'waitPayment'}).value + '' === '0') return [{label: 'urging payment', type: '1',disabled:true},{label: 'detail', type: '2'}]
                return [{label: 'urging payment', type: '1',disabled:false},{label: 'detail', type: '2'}];

            },
            handleSizeChange(val) {
                this.params.ps = val;
            },

        },
        created(){
           this.viewByStatus = '1';
           this.getList();
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
