<template>
    <div class="inquiry">
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="80%"
            >
                <h3 class="hd"> {{ $i.inquiry.inquiryTitle }}</h3>
                <div class="status">
                    <div class="state">
                        <span>{{ $i.common.state }}</span>
                        <el-radio-group v-model="params.status" size="mini">
                            <el-radio-button :label="''">{{$i.common.all}}</el-radio-button>
                            <el-radio-button 
                                v-for="item in $db.inquiry.overoiewState"
                                :label="item.id"
                                :key="item.id"
                            >
                            {{ item.text }}
                            </el-radio-button>
                        </el-radio-group>
                    </div>
                    <select-search 
                        :options="options" 
                        @inputChange="inputEnter"
                        :searchLoad="searchLoad"
                    />
                </div>
                <v-table 
                    :data="tabData" 
                    @change-checked="changeChecked"
                    :loading="tabLoad" 
                    :selection-radio="selectionRadio"
                    ref="tab"
                />
                <el-pagination
                    @size-change="handleSizeChange"
                    :currentPage.sync="params.pn"
                    :page-sizes="pazeSize"
                    :page-size="params.ps"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="pageTotal"
                />
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">{{ $i.common.cancel }}</el-button>
                <el-button type="primary" @click="addCompare">{{ $i.common.ok }}</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    /**
     * @param selectChange 下拉框 值发生变更触发
     * @param options 下拉框 原始数据 
    */
    import selectSearch from '@/components/common/fnCompon/selectSearch';
    import VTable from '@/components/common/table/index';
    export default {
        name:'',
        data() {
            return {
                checkedData:[],
                pazeSize: [10, 20, 30, 40, 50, 100],
                searchLoad: false,
                options: [{
                    id: 'INQUIRY_NO',
                    label: '询价单号'
                }, {
                    id: 'QUOTATION_NO',
                    label: '询价单号（供应商自有）'
                }, {
                    id: 'SUPPLIER_NAME',
                    label: '供应商名称'
                }, {
                    id: 'SUPPLIER_TYPE',
                    label: '供应商类型'
                }, {
                    id: 'PAYMENT_METHOD',
                    label: '支付方式'
                }],

                tabData: [],
                viewByStatus: '',
                params: {
                    status: null,
                    keyType: '',
                    key: '',
                    ps: 10,
                    pn: 1,
                    recycleCustomer: 0,
                    compareInquiryIds: [],
                    compareInquiryDelIds: [],
                    compareId: null
                },
                tabLoad:false,
                pageTotal: 0
            }
        },
        components: {
            'select-search': selectSearch,
            'v-table': VTable
        },
        props: {
            value: {
                type: Boolean,
                default: false
            },
            selectionRadio: {
                type: Boolean,
                default: false
            },
            argDisabled: {
                type: Array,
                default: () => {
                    return [];
                }
            },
            compareId: {
                default: null
            },
            disableds: {
                type: Array,
                default: () => {
                    return [];
                }
            }
        },
        computed: {
            dialogVisible : {
                get() {
                    return this.value;
                },
                set(val) {
                    this.$emit('input', val);
                }
            }
        },
        watch: {
            params: {
                handler(val, oldVal) {
                    this.gettabData();
                },
                deep: true
            },
            value() {
                this.params.compareInquiryIds = this.argDisabled;
                this.params.compareId = this.compareId;
                this.params.compareInquiryDelIds = this.disableds;
            }
        },
        methods: {
            addCompare() {
                let arg = this.$copyArr(this.checkedData);
                let arr = [];
                if(_.isObject(arg) && this.selectionRadio) {
                    this.$emit('addInquiry', arg);
                } else {
                    _.map(arg, item => {
                        _.mapObject(item, (val, key) => {
                            if(key === '_disabled' && val === false){
                                arr.push(item.id.value);
                            }
                        });
                    });
                    this.$emit('addInquiry', arr);
                }
            },
            inputEnter(val) {
                if(!val.keyType) return this.$message('请选中搜索类型');
                if(!val.key) return this.$message('搜索内容不能为空');
                this.params.keyType = val.keyType;
                this.params.key = val.key;
                this.searchLoad = true;
            },
            gettabData() {
                let url, column;
                this.tabLoad = true;
                this.$ajax.post(this.$apis.POST_INQIIRY_LIST, this.params)
                .then(res => {
                    this.pageTotal = res.tc;
                    this.tabLoad = false;   
                    this.searchLoad = false;
                    let arr = this.$getDB(this.$db.inquiry.viewByInqury, res.datas);
                    _.map(this.argDisabled, id => {
                        _.map(arr, items => {
                            if(_.findWhere(items, {'key': 'compareDisplay'}).value + '' === '1') {
                                items._disabled = true;
                                items._checked = true;
                            } else {
                                items._disabled = false;
                                items._checked = false;
                            }
                        });
                    });
                    this.tabData = arr;
                })
                .catch(() => {
                    this.searchLoad = false; 
                    this.tabLoad = false;
                })
            },
            cancelInquiry() { //取消询价单
                this.ajaxInqueryAction('cancel')
            },
            deleteInquiry() { //删除询价单
                this.$confirm('确认删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.ajaxInqueryAction('delete');
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            },
            ajaxInqueryAction(type) {
                const argId = this.getChildrenId();
                this.$ajax.post(this.$apis.POST_INQUIRY_ACTION, {
                    action: type,
                    ids:argId
                })
                .then(res => {
                    this.gettabData();
                    this.checkedData = [];
                });
            },
            getChildrenId(type) {
                let arr = [];
                this.checkedData.forEach(item => {
                    arr.push(item.id.value)
                });
                if(typeof type === 'string') arr.join(',')
                return arr;
            },
            handleSizeChange(val) {
                this.params.ps = val;
            },
            changeChecked(item) { //tab 勾选
                this.checkedData = item;
            }
        }
    }
</script>
<style lang="less" scoped>
    .inquiry {
        .hd {
            padding-left:15px;
            height: 50px;
            line-height:50px;
            color:#666;
            border-bottom:1px solid #ccc;
        }
        .status {
            display:flex;
            height: 60px;
            align-items: center;
            justify-content:space-between;
            padding:0 15px;
            box-sizing: border-box;
            .state {
                display:flex;
                align-items: center;
                font-size:16px;
                color:#666;
            }
            span {
                padding-right:5px;
            }
            .btn-wrap {
                display:flex;
                align-items: center;
                span {
                    font-size:14px;
                }
                button {
                    padding:2px 5px;
                }
            }
            .select-wrap {
                display:flex;
                align-items:center;
                .select {
                    width: 110px;
                    margin-right:5px;
                    input {}
                }
            }
        }
        .fn {
            display:flex;
            justify-content:space-between;
            padding:10px 15px;
            box-sizing: border-box;
            .viewBy {
                display:flex;
                align-items: center;
                span {
                    font-size:14px;
                    color:#666;
                }
                button {
                    cursor: pointer;
                    padding:2px 5px;
                }
                .set {
                    cursor: pointer;
                    padding-left:18px;
                    color:#999;
                    i {
                        font-size:25px;
                    }
                }
            }
        }
    }
</style>
