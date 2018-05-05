<template>
    <div class="payment-table">
        <div class="payment-btn">
            <el-button :disabled="disabledBtn" @click="handleClick" type="primary">{{btnInfo}}</el-button>
        </div>
        <el-table
                class="speTable"
                :data="data"
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

            <el-table-column
                    v-for="(v,k) in columns"
                    :key="v.id"
                    :label="v.label"
                    align="center"
                    :prop="v.prop"
                    :min-width="v.width?v.width:'100'">
                <template slot-scope="scope">
                    <div v-if="v.type==='Text'">
                        <!--有效性-->
                        <div v-if="k===6">
                            {{scope.row[v.prop]===1?'待确认':(scope.row[v.prop]===2?'已确认':'无效')}}
                        </div>
                        <div v-else>
                            {{scope.row[v.prop]}}
                        </div>
                    </div>
                    <div v-if="v.type==='Date'">
                        <div v-if="scope.row.isEdit || scope.row.isNew">
                            <el-date-picker
                                    class="chooseDate"
                                    size="mini"
                                    v-model="scope.row[v.prop]"
                                    align="right"
                                    type="date"
                                    placeholder="选择日期"
                                    value-format="yyyy-MM-dd"
                                    :picker-options="pickerOptions1">
                            </el-date-picker>
                        </div>
                        <div v-else>
                            {{scope.row[v.prop]}}
                        </div>
                    </div>
                    <div v-if="v.type==='Input'">
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
                    <div v-if="v.type==='Number'">
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
                </template>
            </el-table-column>

            <el-table-column
                    label="Action"
                    align="center"
                    width="120">
                <template slot-scope="scope">
                    <div v-if="type==='complex'">
                        <!--新增行时显示的按钮-->
                        <div v-if="scope.row.isNew">
                            <el-button type="text" @click="saveNewLine(scope.row)">保存</el-button>
                            <el-button type="text" @click="cancelSaveNewLine(scope.row)">取消</el-button>
                        </div>
                        <div v-else>
                            <div v-if="scope.row[columns[6].prop]===1 || scope.row[columns[6].prop]===2">
                                <!--处在编辑状态-->
                                <div v-if="scope.row.isEdit">
                                    <el-button type="text" @click="saveLine(scope.row)">保存</el-button>
                                    <el-button type="text" @click="cancelSaveLine(scope.row)">取消</el-button>
                                </div>
                                <div v-else>
                                    <el-button type="text" @click="changeLine(scope.row)">修改</el-button>
                                    <el-button type="text" @click="abandonLine(scope.row)">作废</el-button>
                                </div>
                            </div>
                            <!--作废时显示-->
                            <div v-if="scope.row[columns[6].prop]===3">
                                <el-button type="text" @click="recoverLine(scope.row)">恢复</el-button>
                            </div>
                        </div>
                    </div>
                    <div v-if="type==='simple'">
                        <div v-if="scope.row[columns[6].prop]!==2">
                            <el-button type="text" @click="confirmLine(scope.row)">确认</el-button>
                        </div>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    export default {
        name:'payment-table',
        props:{
            data:{
                type:Array,
                default:[]
            },
            columns:{
                type:Array,
                default:[]
            },
            type:{
                type:String,
                default:'complex'
            },
            btnInfo:{
                type:String,
                default:''
            },
        },
        data(){
            return{
                disabledBtn:false,
                pickerOptions1: {       //日期组件使用
                    shortcuts: [
                        {
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
                //用于备份data
                copyData:[],
            }
        },
        methods:{
            //作废栏上色
            tableRowClassName({row, rowIndex}) {
                if(row[this.columns[6].prop]===3){
                    return 'warning-row';
                }
                return '';
            },

            //统计
            getSummaries(param) {
                const {columns, data} = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = '总价';
                        return;
                    } else if (index === 4 || index === 6) {
                        const values = data.map(item => {
                            if (item[this.columns[6].prop] === 2) {
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
                            // sums[index] += ' 元';
                        } else {
                            sums[index] = '0';
                        }
                    }

                });
                return sums;
            },

            //处理顶部按钮点击
            handleClick(){
                if(this.type==='complex'){
                    //复杂表格才进行这个操作
                    this.disabledBtn=true;
                    this.$emit('btnClick',this.data);
                }else{
                    //简单表格只是单纯的抛出去让父组件处理即可
                    this.$emit('btnClick');
                }
            },

            //修改一行数据
            changeLine(e){
                this.$set(e,'isEdit',true);
                // e.isEdit=true;
            },

            //作废一行数据
            abandonLine(e){
                this.$set(e,'available',3);
            },

            //恢复一行数据
            recoverLine(e){
                this.$set(e,'available',1);
            },

            //保存修改一行数据(调用接口之后也要同步更新copyData)
            saveLine(e){
                let targetKey=this.columns[0].prop;
                //先判断columns的前三个参数都不能为空
                if (!e[this.columns[1].prop] || !e[this.columns[2].prop] || !e[this.columns[3].prop]) {
                    this.$message.error('XXX不能为空');
                } else {
                    this.$set(e,'isEdit',false);
                    this.$emit('restoreData', e);
                    let key;
                    this.copyData.forEach((v, k) => {
                        if (v[targetKey] === e[targetKey]) {
                            key = k;
                        }
                    });
                    this.copyData.splice(key, 1, e);
                }



                this.$set(e,'isEdit',false);
            },

            //取消保存一行数据
            cancelSaveLine(e){
                let targetKey=this.columns[0].prop;
                let data;
                this.copyData.forEach(v => {
                    if (v[targetKey] === e[targetKey]) {
                        data = v;
                    }
                });
                this.$emit('restoreData', data);
                this.$set(e,'isEdit',false);
            },

            //保存新的一行
            saveNewLine(e){
                if (!e[this.columns[1].prop] || !e[this.columns[2].prop] || !e[this.columns[3].prop]) {
                    this.$message.error('XXX不能为空');
                } else {
                    this.$set(e,'isNew',false);
                    this.copyData.push(Object.assign({}, e));
                    this.disabledBtn = false;
                }
            },

            //取消保存新的一行
            cancelSaveNewLine(e){
                let len = this.data.length;
                this.data.splice(len - 1, 1);
                this.disabledBtn = false;
            },

            //确认一行数据(调用接口之后把状态改为已确认即可)
            confirmLine(e){
                this.$set(e,'available',2);
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
        },
        created(){
            //把data备份，还原的时候emit到父组件进行还原
            this.copyData = this.copyArr(this.data);
        },
    }
</script>
<style>
    .el-table .warning-row {
        background: rgba(237, 237, 237,0.5);
    }
</style>
<style scoped>

    .speTable{
        height: auto !important;
    }
    .speTable >>> .el-table__body-wrapper{
        height: auto !important;
    }



    /*日期选择框宽度*/
    .chooseDate {
        width: 130px;
    }
    .speInputNumber{
        width: 110px;
    }

    .payment-btn {
        padding: 10px 0;
    }
</style>