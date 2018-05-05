<template>
    <div class="payment-table">
        <div class="payment-btn">
            <el-button :disabled="orderStatus==='5'||stopEdit" @click="handleClick" type="primary">{{btnInfo}}</el-button>
             <el-button :disabled="orderStatus==='5'||stopEdit" type="primary" @click='dunning'>提醒供应商退款</el-button>
        </div>
        <el-table
                class="speTable"
                :data="paymentData"
                height="250"
                border
                :summary-method="getSummaries"
                show-summary
                :row-class-name="tableRowClassName"
                style="width: 100%">
            <el-table-column
                    label="#"
                    align="center"
                    width="50">
                <template slot-scope="scope">
                    {{scope.$index+1}}
                </template>
</el-table-column>

<el-table-column v-for="(v,k) in columns" :key="v.id" :label="v.label" align="center" :prop="v.prop" :min-width="v.width?v.width:'100'">
    <template slot-scope="scope">
                    <div v-if="v.type==='Text'">
                        <!--有效性-->
                        <div v-if="k===11">
                            <span v-if='scope.row[v.prop]===-1'>
                                作废
                            </span>
                            <span v-if='scope.row[v.prop]===10'>
                                待采购商确认
                            </span>
                            <span v-if='scope.row[v.prop]===20'>
                                待供应商确认
                            </span>
                            <span v-if='scope.row[v.prop]===30'>
                                待服务商确认
                            </span>
                            <span v-if='scope.row[v.prop]===40'>
                                已确认
                            </span>
                            
                        </div>
                        <div v-else>
                            {{scope.row[v.prop]}}   
                        </div>
                    </div>
                    <div v-else-if="v.type==='Date'&& v.belong==='customer'">
                            <div v-if="(scope.row.isEdit || scope.row.isNew)">
                                <el-date-picker
                                        class="chooseDate"
                                        size="mini"
                                        v-model="scope.row[v.prop]"
                                        align="right"
                                        type="date"
                                        placeholder="选择日期"
                                       
                                        :picker-options="pickerOptions1">
                                </el-date-picker>
                            
                          </div>
                   
                          <div v-else>
                              {{scope.row[v.prop]}}   
                          </div>   
                       
                    </div>
                    <div v-else-if="v.type==='Input'&&v.belong==='customer'">
                        <div v-if="scope.row.isEdit || scope.row.isNew">
                            <el-input
                                    placeholder="请输入内容"
                                    v-model="scope.row[v.prop]"
                                    clearable>
                            </el-input>
                        </div>
                        <div v-else>
                            {{scope.row[v.prop]}}
                        </div>
                    </div>
                    <div v-else-if="v.type==='Number'&&v.belong==='customer'">
                        <div v-if="scope.row.isEdit || scope.row.isNew">
                            <el-input-number
                                    class="speInputNumber"
                                    v-model="scope.row[v.prop]"
                                    :min="0"
                                    :controls='false'
                                    label="描述文字">
                            </el-input-number>
                        </div>
                        <div v-else>
                            {{scope.row[v.prop]}}
                        </div>
                    </div>
                    <div v-else>
                         {{scope.row[v.prop]}}
                    </div>
                </template>
</el-table-column>

<el-table-column label="Action" align="center" width="120">
    <template slot-scope="scope">                  
                        <!--新增行时显示的按钮-->
                        <div v-if="scope.row.isNew">
                            <el-button type="text" :disabled="orderStatus==='5'" @click="saveNewLine(scope.row)">保存</el-button>
                            <el-button type="text" :disabled="orderStatus==='5'" @click="cancelSaveNewLine(scope.row)">取消</el-button>
                        </div>
                        <div v-else>
                            <div v-if="scope.row[columns[11].prop]===10||scope.row[columns[11].prop]===30">
                                <!--处在编辑状态-->
                                <div v-if="scope.row.isEdit">
                                    <el-button type="text" :disabled="orderStatus==='5'" @click="saveLine(scope.row)">保存</el-button>
                                    <el-button type="text" :disabled="orderStatus==='5'" @click="cancelSaveLine(scope.row)">取消</el-button>
                                </div>
                                <div v-else>
                                    <el-button type="text" :disabled="orderStatus==='5'" @click="confirmLine(scope.row)">确认</el-button>
                                </div>
                            </div>
                             <div v-else-if="scope.row[columns[11].prop]===20">
                                <!--处在编辑状态-->
                                <div v-if="scope.row.isEdit">
                                    <el-button type="text" :disabled="orderStatus==='5'" @click="saveLine(scope.row)">保存</el-button>
                                    <el-button type="text" :disabled="orderStatus==='5'" @click="cancelSaveLine(scope.row)">取消</el-button>
                                </div>
                                <div v-else>
                                    <el-button type="text" :disabled="orderStatus==='5'" @click="changeLine(scope.row)">修改</el-button>
                                    <el-button type="text" :disabled="orderStatus==='5'" @click="abandonLine(scope.row)">作废</el-button>
                                </div>
                            </div>
                            <!--作废时显示-->
                            <div v-else-if="scope.row[columns[11].prop]===-1">
                                <el-button type="text" :disabled="orderStatus==='5'" @click="recoverLine(scope.row)">恢复</el-button>
                            </div>
                        </div>
                </template>
</el-table-column>
</el-table>
</div>
</template>
<script>
    /*
                                                                                                                                                                                                                        10:待采购商确认,20:待供应商确认,30:待服务商确认，40:已确认,-1:作废
                                                                                                                                                                                                                         orderType :10 采购订单
                                                                                                                                                                                                                        */
    export default {
        name: 'payment-table',
        props: {
            btnInfo: {
                type: String,
                default: '申请付款'
            },
            orderNo: {
                type: String,
                default: '999'
            },
            currencyCode: {
                type: String,
            },
            payToId: {
                type: Number
            },
            orderStatus: {
                type: String
            }
        },
        data() {
            return {
                pickerOptions1: { //日期组件使用
                    shortcuts: [{
                            text: '今天',
                            onClick(picker) {
                                picker.$emit('pick', new Date());
                            }
                        },
                        {
                            text: '昨天',
                            onClick(picker) {
                                const date = new Date();
                                date.setTime(date.getTime() - 3600 * 1000 * 24);
                                picker.$emit('pick', date);
                            }
                        },
                        {
                            text: '一周前',
                            onClick(picker) {
                                const date = new Date();
                                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                                picker.$emit('pick', date);
                            }
                        }
                    ]
                },
                columns: [{
                        label: 'Payment No.',
                        prop: 'no',
                        type: 'Text',
                        width: 180
                    },
                    {
                        label: 'Payment Item',
                        prop: 'name',
                        type: 'Input',
                        width: 150,
                        belong: "customer",
                    },
                    {
                        label: 'Est. Pay Date',
                        prop: 'planPayDt',
                        type: 'Date',
                        belong: "customer",
                        width: 150
                    },
                    {
                        label: 'Est. Amount',
                        prop: 'planPayAmount',
                        type: 'Number',
                        belong: "customer",
                        width: 130
                    },
                    {
                        label: 'Act. Pay Date',
                        prop: 'actualPayDt',
                        type: 'Date',
                        belong: "customer",
                        width: 150
                    },
                    {
                        label: 'Act. Amount',
                        prop: 'actualPayAmount',
                        type: 'Number',
                        belong: "customer",
                        width: 130

                    },
                    {
                        label: 'Est. Refund Date',
                        prop: 'planRefundDt',
                        type: 'Date',
                        belong: "supplier",
                        width: 150
                    },
                    {
                        label: 'Est. Refund Amount',
                        prop: 'planRefundAmount',
                        type: 'Number',
                        belong: "supplier",
                        width: 150

                    },
                    {
                        label: 'Act. Refund Date',
                        prop: 'actualRefundDt',
                        type: 'Date',
                        belong: "supplier",
                        width: 150

                    },
                    {
                        label: 'Act. Refund Amount',
                        prop: 'actualRefundAmount',
                        type: 'Number',
                        belong: "supplier",
                        width: 150

                    },
                    {
                        label: 'currency',
                        prop: 'currency',
                        type: 'Text',
                        width: 150,
                        belong: "customer", //............
                    },
                    {
                        label: 'Avilable',
                        prop: 'status',
                        type: 'Text'
                    },
                ],
                paymentData: [],
                //用于备份data
                copyData: [],
                orderType: 10,
                type: '10', //10 付款  20退款
                stopEdit: false
            }
        },
        methods: {
            //作废栏上色
            tableRowClassName({
                row,
                rowIndex
            }) {
                if (row[this.columns[11].prop] === -1) {
                    return 'warning-row';
                }
                return '';
            },
            dunning() {
                this.$ajax.post(this.$apis.paymentDunning, {
                    orderNo: this.orderNo,
                    orderType: this.orderType
                }).then((res) => {
                    console.log(res)
                }).catch((res) => {
                    console.log(res)
                })
            },
            //统计
            getSummaries(param) {
                const {
                    columns,
                    data
                } = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = '总价';
                        return;
                    } else if (index === 4 || index === 6 || index == 8 || index == 10) {
                        const values = data.map(item => {
                            if (item[this.columns[11].prop] === 40) {
                                return Number(item[column.property])
                            }
                        });
                        if (!values.every(value => isNaN(value))) {
                            sums[index] = values.reduce((prev, curr) => {
                                const value = Number(curr);
                                if (!isNaN(value)) {
                                    return prev + curr;
                                } else {
                                    return prev;
                                }
                            }, 0);
                            //                             sums[index] += ' 元';
                        } else {

                            sums[index] = '0';
                        }
                    }

                });
                return sums;
            },

            //处理顶部按钮点击
            handleClick() {
                this.stopEdit = true;
                this.$ajax.post(this.$apis.paymentGetNo, {}).then(
                    res => {
                        this.paymentData.push({
                            no: res,
                            name: '',
                            planPayDt: '', //预计付款时间
                            planPayAmount: '', //预计付款金额
                            actualPayDt: '', //实际付款时间
                            actualPayAmount: '', //实际付款金额
                            type: this.type, //10 付款  20退款
                            payToId: this.payToId, //order的数据
                            currencyCode: this.currencyCode,
                            currency: this.currencyCode, //order的数据
                            //                            status: 1, //10:待采购商确认,20:待供应商确认,30:待服务商确认，40:已确认,-1:作废
                            isNew: true, //新增的数据全部处于新增状态
                        });
                    }
                ).catch(res => {
                    console.log(res)
                })
            },

            //修改一行数据
            changeLine(e) {
                this.$set(e, 'isEdit', true);
            },

            //作废一行数据
            abandonLine(e) {
                this.$ajax.post(this.$apis.paymentAbandon + '/' + e.id + '?version=' + e.version).then((res) => {

                    _.map(this.paymentData, (key, value) => {
                        if (key.id == res.id) {

                            this.paymentData.splice(value, 1, res)
                            this.$set(e, 'status', -1);
                        }
                    })
                }).catch((res) => {
                    console.log(res)
                })
            },

            //恢复一行数据
            recoverLine(e) {
                this.$ajax.post(this.$apis.paymentRecover + '/' + e.id + '?version=' + e.version).then((res) => {
                    _.map(this.paymentData, (key, value) => {
                        if (key.id == res.id) {
                            this.paymentData.splice(value, 1, res)
                        }
                    })
                }).catch((res) => {
                    console.log(res)
                })
            },

            //保存修改一行数据(调用接口之后也要同步更新copyData)
            saveLine(e) {
                let targetKey = this.columns[0].prop;
                let params = {
                    id: e.id,
                    name: e.name,
                    planPayDt: e.planPayDt,
                    planPayAmount: e.planPayAmount,
                    actualPayDt: e.actualPayDt,
                    actualPayAmount: e.actualPayAmount,
                    version: e.version
                }
                this.$ajax.post(this.$apis.paymentUpdata, params).then((res) => {
                    _.map(this.paymentData, (key, value) => {
                        if (key.id == res.id) {
                            this.paymentData.splice(value, 1, res)
                        }
                    })
                }).catch((res) => {
                    console.log(res)
                })

            },

            //取消保存一行数据
            cancelSaveLine(e) {
                let targetKey = this.columns[0].prop;
                let data;
                this.copyData.forEach(v => {
                    if (v[targetKey] === e[targetKey]) {
                        data = v;
                    }
                });
                this.$emit('restoreData', data);
                this.$set(e, 'isEdit', false);
            },

            //保存新的一行
            saveNewLine(e) {
                if (e.planPayDt == '') {
                    this.$message.error('XXX不能为空');
                } else {
                    this.$set(e, 'isNew', false);
                    this.copyData.push(Object.assign({}, e));
                    let params = (Object.assign({}, e))
                    delete params.isNew
                    params.orderNo = this.orderNo,
                        params.orderType = 10,
                        this.$ajax.post(this.$apis.paymentSave, params).then(res => {
                            _.map(this.paymentData, (key, value) => {
                                if (key.no == res.no) {
                                    this.paymentData.splice(value, 1, res)
                                }
                            })
                        }).catch(res => {
                            _.map(this.paymentData, (key, value) => {
                                if (key.no == e.no) {
                                    this.paymentData.splice(value, 1)
                                }
                            })
                        })
                    this.stopEdit = false;
                }
            },

            //取消保存新的一行
            cancelSaveNewLine(e) {
                let len = this.paymentData.length;
                this.paymentData.splice(len - 1, 1);
                this.stopEdit = false;
            },

            //确认一行数据(调用接口之后把状态改为已确认即可)
            confirmLine(e) {
                console.log(e.id)
                this.$ajax.post(this.$apis.paymentAccept, {
                    id: e.id
                }).then(res => {
                    console.log(res)
                    _.map(this.paymentData, (key, value) => {
                        if (key.no == res.no) {
                            this.paymentData.splice(value, 1, res)
                        }
                    })
                }).catch(res => {
                    console.log(res)
                })
            },
            //深克隆方法
            copyArr(arr) {
                return arr.map((e) => {
                    if (typeof e === 'object') {
                        return Object.assign({}, e)
                    } else {
                        return e
                    }
                })
            },
            get_list() {
                this.$ajax.post(this.$apis.post_order_paymentlist, {
                    orderNo: this.orderNo,
                    orderType: this.orderType
                }).then((res) => {
                    this.paymentData = res.datas

                }).catch((res) => {
                    console.log(res)
                })
            }
        },
        created() {
            //            this.get_list()
            //把data备份，还原的时候emit到父组件进行还原
            this.copyData = this.copyArr(this.data);

        },
        watch: {
            orderNo(val) {
                if (val) {
                    this.get_list()
                }
            }
        }
    }

</script>
<style>
    .el-table .warning-row {
        background: rgba(237, 237, 237, 0.5);
    }

</style>
<style scoped>
    .speTable {
        height: auto !important;
    }

    .speTable>>>.el-table__body-wrapper {
        height: auto !important;
    }



    /*日期选择框宽度*/

    .chooseDate {
        width: 130px;
    }

    .speInputNumber {
        width: 110px;
    }

    .payment-btn {
        padding: 10px 0;
    }

</style>
