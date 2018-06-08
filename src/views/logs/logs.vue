<template>
    <div class="logs">
        <div class="title">
           {{$i.logBasic.logs}}
        </div>
        <div>
            <el-form label-width="130px" class="searchCondition">
                <el-row>
                    <!-- <el-col :span="2">
                        <el-button type="primary">Download (ALL)</el-button>
                    </el-col> -->
                    <el-col :span="7">
                        <el-form-item :label="$i.logBasic.description">
                            <el-input type="text" v-model="search.description" @change="getbizlogs" style="max-width:200px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item :label="$i.logBasic.operater">
                            <el-input type="text" v-model="search.operater"  @change="getbizlogs" style="max-width:200px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item :label="$i.logBasic.operationDate">
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
           <v-table :data="logslist" :loading="tabLoad"></v-table>
        </div>
    </div>
</template>

<script>

    import selectSearch from '@/components/common/fnCompon/selectSearch'
    import VTable from '@/components/common/table/index'
    export default {
        name: "logs",
        components:{
            selectSearch,
            VTable
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
                search:{
                    description:'',
                    operater:'',

                },
                logslist:[],
                tabLoad: false
            }
        },
        watch: {
            date(){
                  console.log(this.date[0])
              console.log(this.search.operater)
                  this.getbizlogs()
            }
        },
        methods:{
            formatter(row, column) {
                return row.remark;
            },
            //分页caoz
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            getbizlogs(){
                const params = {
                    moduleCode: 'ORDER',   //模块编码
                    bizCode: '',     //bizCode
                    bizNo: '',       //务单据号；比如对应order的order_no 而不是ID
                    operationType: '',
                    operatorId: '',
                    operatorName: this.search.operater || '',
                    operationDtStart: this.date[0] || '',
                    operationDtEnd: this.date[1] || '',
                    operationContent:this.search.description || '',
                    pn: 1,
                    ps: 10,
                    sorts: [
                        {
                        orderBy: 'id',
                        orderType: 'DESC'
                        }
                    ]
                }
                this.tabLoad = true;
                this.$ajax.post(this.$apis.post_bizloQuery,params)
                .then(res => {
                    console.log(res)
                     this.tabLoad = false;
                    this.logslist = this.$getDB(this.$db.logs.table, res.datas);
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
