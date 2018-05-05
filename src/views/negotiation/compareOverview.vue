<template>
    <div class="compare-overview">
        <h3 class="hd">{{ $i.common.compareOverview }}</h3>
        <div class="status">
            <div class="btn-wrap">
                <el-button :disabled="tabData.length<=0">{{ `${$i.common.download}(${checkedArg.length>0?checkedArg.length:'all'})` }}</el-button>
                <el-button type="danger" @click="compareDelete" :disabled="checkedArg.length <= 0">{{ `${$i.common.delete}(${checkedArg.length})`}}</el-button>
            </div>
            <select-search :options="options" @inputEnter="inputEnter" />
        </div>
        <v-table 
            :data="tabData" 
            :loading="tabLoad"
            :buttons="[{label: 'Modify', type: 'modify'}, {label: 'Detail', type: 'detail'}]" 
            @action="action"
            @change-checked="changeChecked"
            :height="455"
        />
        <v-pagination
            :page-data.sync="bodyData"
            @change="handleSizeChange"
            @size-change="pageSizeChange"
        />
    </div>
</template>
<script>
    import { VTable, selectSearch, VPagination } from '@/components/index';
    import { mapActions } from 'vuex'
    export default {
        name:'',
        data() {
            return {
                pageTotal:0,
                checkedArg: [],
                tabData: [],
                options:[{
                    id:'1',
                    label:'Compare Name'
                }, {
                    id: '2',
                    label: 'Compare Item'
                }],
                bodyData: {
                    key: '',
                    keyType: '',
                    // operatorFilters: { //筛选条件
                    //     columnName: '',
                    //     operator: '',
                    //     property: '',
                    //     resultMapId: '',
                    //     value: {}
                    // },
                    ps: 10,
                    pn: 1,
                    tc: 0,
                    recycle: 0,
                    // sorts: [
                    //     {
                    //         nativeSql: true,
                    //         orderBy: "string",
                    //         orderType: "string",
                    //         resultMapId: "string"
                    //     }
                    // ]
                },
                tabLoad: false
            }
        },
        components: {
            'select-search':selectSearch,
            'v-table': VTable,
            'v-pagination': VPagination
        },
        created() {
            this.getList();
            this.setRecycleBin({
                name: 'negotiationRecycleBin',
                params: {
                    type: 'compare'
                },
                show: true
            });
        },
        methods: {
            ...mapActions([
                'setRecycleBin'
            ]),
            getList() { //获取Compare 列表
                this.tabLoad = true;
                this.$ajax.post(this.$apis.POST_INQIIRY_COMPARE_LIST, this.bodyData)
                .then(res => {
                    let data = res.datas;
                    this.tabLoad = false;
                    data.forEach(item => {
                        item.updateDt ? item.updateDt = this.$dateFormat(data.updateDt, 'yyyy-mm-dd') : '';
                    });
                    this.bodyData.tc = res.tc;
                    this.tabData = this.$getDB(this.$db.inquiry.compare, data);
                });
            },
            searchEnter(item) { // 搜索框
                this.bodyData.key = item.key;
                this.bodyData.keyType = item.keyType;
            },
            action(item, type) { //操作表单 action
                let types = '';
                if(type === 'detail') {
                    types = 'only';
                } else {
                    types = 'modify';
                }
                this.$router.push({
                    name: 'negotiationCompareDetail',
                    params: {
                        type: types
                    },
                    query: {
                        id: _.findWhere(item, { 'key': 'id' }).value
                    }
                });
            },
            changeChecked(item) { //选中的compare
                let arr = [];
                item.forEach(item => {
                    arr.push(item.id.value);
                });
                this.checkedArg = arr;
            },
            compareDelete() { //删除compare
                this.$confirm('确认删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$ajax.post(this.$apis.POST_INQUIRY_COMPARE_DELETE, this.checkedArg)
                    .then(res => {
                        this.getList();
                        this.checkedArg = [];
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            },
            inputEnter() {
                
            },
            handleSizeChange(val) {
                this.bodyData.pn = val;
            },
            pageSizeChange(val) {
                this.bodyData.ps = val;
            }
        },
        watch: {
            bodyData: {
                handler(val) {
                    this.getList();
                },
                deep: true
            }
        }
    }
</script>
<style lang="less" scoped>
    .compare-overview{
        .hd {
            padding-left:15px;
            height: 50px;
            line-height:50px;
            color:#666;
        }
         .status {
            display:flex;
            height: 60px;
            box-sizing: border-box;
            padding-left:25px;
            padding-right:25px;
            align-items: center;
            justify-content:space-between;
            .btn-wrap {
                display:flex;
                align-items: center;
                span {
                    font-size:14px;
                }
            }
        }
    }
</style>
