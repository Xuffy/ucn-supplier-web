<template>
    <div class="inquiry">
        <h3 class="hd"> {{ $i.inquiry.inquiryTitle }}</h3>
        <div class="status">
            <div class="state">
                <span>{{ $i.common.Status }}</span>
                <el-radio-group v-model="params.status" size="mini">
                    <el-radio-button :label="null">{{$i.common.all}}</el-radio-button>
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
        <div class="fn">
            <div class="btn-wrap">
                <el-button @click="cancelInquiry" :disabled="!checkedData.length||params.status+''==='99'||params.status+''==='1'||params.status===null">{{ $i.common.cancelTheInquiry }}<span>({{ checkedData ? checkedData.length : '' }})</span></el-button>
                <el-button @click="deleteInquiry" type="danger" :disabled="checkedData.length && checkedData && params.status !== null && params.status+'' !== '22' && params.status+'' !== '21' ? false : true">{{ $i.common.delete }}<span>({{ checkedData ? checkedData.length : '' }})</span></el-button>
                <el-button>{{ `${$i.common.download}(${checkedData.length >= 1 ? checkedData.length : 'all'})` }}</el-button>
            </div>
            <div class="viewBy">
                <span>{{ $i.common.viewBy }}&nbsp;</span>
                <el-radio-group v-model="viewByStatus"  size="mini">
                    <el-radio-button label="0">{{$i.common.inquiry}}</el-radio-button>
                    <el-radio-button label="1" >{{$i.common.SKU}}</el-radio-button>
                </el-radio-group>
            </div>
        </div>
        <v-table 
            :data="tabData" 
            :buttons="[{label: 'detail', type: 'detail'}]" 
            @action="action" 
            @change-checked="changeChecked"
            :loading="tabLoad" 
            ref="tab"
        />
        <v-pagination
            :page-data.sync="params"
            @page-change="handleSizeChange"
            @page-size-change="pageSizeChange"
        />
    </div>
</template>
<script>
    /**
     * @param selectChange 下拉框 值发生变更触发
     * @param options 下拉框 原始数据 
    */
    import { selectSearch, VTable, VPagination } from '@/components/index';
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
                    status: 21,
                    keyType: '',
                    key: '',
                    ps: 10,
                    pn: 1,
                    tc: 0,
                    recycleSupplier: false,
                    draft: false
                },
                tabLoad:false,
                _id: ''
            }
        },
        components: {
            'select-search': selectSearch,
            'v-table': VTable,
            'v-pagination': VPagination
        },
        created() {
            this.viewByStatus = 0;
        },
        watch: {
            viewByStatus() {
                this.gettabData();
            },
            params: {
                handler(val, oldVal) {
                    this.gettabData();
                },
                deep: true
            }
            
        },
        methods: {
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
                if(this.viewByStatus + '' === '0') {
                    url = this.$apis.BUYER_POST_INQIIRY_LIST;
                    column = this.$db.inquiry.viewByInqury;
                } else {
                    url = this.$apis.BUYER_POST_INQIIRY_LIST_SKU;
                    column = this.$db.inquiry.viewBySKU;
                };
                this.$ajax.post(url, this.params)
                .then(res => {
                    this.params.tc = res.tc;
                    this.tabData = this.$getDB(column, res.datas);
                    this.tabLoad = false;
                    this.searchLoad = false; 
                    this.checkedData = [];
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
                this.$ajax.post(this.$apis.BUYER_POST_INQUIRY_ACTION, {
                    action: type,
                    ids:argId
                })
                .then(res => {
                    this.gettabData();
                    this.checkedData = [];
                });
            },
            action(item, type) {
                switch(type) {
                    case 'detail':
                        this.detail(item);
                        break;
                }
            },
            detail(item) {
                this.$router.push({
                    path: '/sellerNegotiation/inquiryDetail',
                    query: {
                        id: _.findWhere(item, {'key': 'id'}).value
                    }
                });
            },
            getChildrenId(type) {
                let arr = [];
                _.map(this.checkedData, item => {
                    if(!_.isUndefined(item)) arr.push(_.findWhere(item, {'key': 'id'}).value);
                });
                if(typeof type === 'string') arr.join(',')
                return arr;
            },
            toCompare() {
                let argId = this.getChildrenId('str');
                this.$windowOpen({
                    url: '/negotiation/compareDetail/{type}',
                    params: {   
                        type: 'new',
                        ids: argId.join(',')
                    }
                });
            },
            pageSizeChange(No) {
                console.log(No)
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
