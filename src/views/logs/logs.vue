<template>
    <div class="logs">
        <div class="title">
           {{$i.logs.logs}}
        </div>
        <div>
            <el-form label-width="130px" class="searchCondition">
                <el-row>
                    <!-- <el-col :span="2">
                        <el-button type="primary">Download (ALL)</el-button>
                    </el-col> -->
                    <el-col :span="7">
                        <el-form-item :label="$i.logs.description">
                            <el-input type="text" v-model="params.operationContent" @change="getbizlogs" clearable style="max-width:200px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item :label="$i.logs.operater">
                            <el-input type="text" v-model="params.operatorName"  @change="getbizlogs"  clearable style="max-width:200px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item :label="$i.logs.operationDate">
                            <el-date-picker
                            v-model="date"
                            type="daterange"
                            align="right"
                            unlink-panels
                            :range-separator="$i.element.to"
                            :start-placeholder="$i.element.startDate"
                            :end-placeholder="$i.element.endDate"
                            :picker-options="pickerOptions2"
                            value-format="timestamp"
                            change="getbizlogs">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <!--<el-input-->
                    <!--class="message-input"-->
                    <!--placeholder="请输入内容"-->
                    <!--v-model="searchValue">-->
                <!--<i slot="prefix" class="el-input__icon el-icon-search"></i>-->
            <!--</el-input>-->

            <!-- <el-button class="btn">ssss</el-button>
            <select-search :selectHide="false" class="search"></select-search> -->
            <!-- {{$t('product.page.download')+'('+logsNumber+')'}} -->
        </div>

        <div class="body">
            <v-table :data="logslist" :loading="tabLoad" :height="500"></v-table>
            <page
              :page-data="pageData"
              @change="handleSizeChange"
              @size-change="pageSizeChange"></page>
        </div>
    </div>
</template>

<script>
  import {VTable,selectSearch,VPagination} from '@/components/index';

    export default {
        name: "logs",
        components:{
            selectSearch,
            VTable,
            page:VPagination
        },
        data(){
            return{
                pickerOptions2: {
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
                date: '',
                currentPage:1,
                logsNumber:'All',           //日志数目
                logslist:[],
                pageData:{},
                tabLoad: false,
                params:{
                  moduleCode: '',   //模块编码
                  bizCode: '',     //bizCode
                  bizNo: '',       //务单据号；比如对应order的order_no 而不是ID
                  operationType: '',
                  operatorId: '',
                  operatorName: '',
                  operationDtStart:  '',
                  operationDtEnd: '',
                  operationContent:'',
                  pn: 1,
                  ps: 50,
                }
            }
        },
        watch: {
          date(){
               if (this.date != null){
                 this.params.operationDtStart = this.date[0];
                 this.params.operationDtEnd = this.date[1];
                 this.getbizlogs()
               }else{
                 this.params.operationDtStart = '';
                 this.params.operationDtEnd = '';
                 this.getbizlogs()
               }
            },
        },
        methods:{
            formatter(row, column) {
                return row.remark;
            },
            //分页
            handleSizeChange(val) {
              this.params.pn = val;
              this.getbizlogs();
            },
            pageSizeChange(val) {
              this.params.ps = val;
              this.getbizlogs();
            },
            getbizlogs(){
                this.params.moduleCode = this.$route.query.code;  // BIZ_PURCHASE_SUPPLIER/PRUCHASE_SUPPLIER
                this.tabLoad = true;
                this.$ajax.post(this.$apis.post_bizloQuery,this.params)
                .then(res => {
                     this.tabLoad = false;
                     this.pageData = res
                     this.logslist = this.$getDB(this.$db.logs.table, res.datas,  item => {
                       _.mapObject(item, val => {
                         val.type === 'textDate' && val.value && (val.value = this.$dateFormat(val.value, 'yyyy-mm-dd'))
                         return val
                       })
                     });
                })
                .catch((res) => {
                  this.tabLoad = false
                });
            }
        },
        created(){
            this.getbizlogs()
        }
    }
</script>

<style scoped>
    .head{
        padding: 10px 0;
    }
    .title{
        font-weight: bold;
        font-size: 18px;
        height: 32px;
        line-height: 32px;
        color:#666666;
    }
    .searchCondition{
        margin-top: 20px;
    }
    .head-btn{
        margin-top: 15px;
        margin-bottom: 15px;
    }
    .head-btn:after{
        display: table;
        clear: both;
        content: '';
    }
    .head-btn .search{
        float: left;
    }

    .head-btn .btn{
        float: left;
    }



    .body{
        margin-top: 15px;
    }
    .message-input{
        /*width: 300px;*/
        /*float: right;*/
    }
    .logs-table >>> .el-table__header-wrapper>table>thead>tr>th{
        background-color: #f3f3f3;
    }
</style>
