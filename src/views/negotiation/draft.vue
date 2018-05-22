<template>
    <div class="compare-overview">
        <h3 class="hd">{{ title }}</h3>
        <div class="status">
            <div class="btn-wrap">
                <el-button type="primary" @click="submit" :disabled="checkedArg.length <= 0">{{ `${$i.common.submit}(${checkedArg.length})` }}</el-button>
                <el-button type="danger" @click="deleteList" :disabled="checkedArg.length <= 0">{{ `${$i.common.delete}(${checkedArg.length})`}}</el-button>
            </div>
            <select-search :options="options" @inputChange="searchEnter" />
        </div>
        <v-table 
            :data="tabData" 
            :loading="tabLoad"
            :buttons="[{label: 'Detail', type: 'detail'}]" 
            @action="action"
            @change-checked="changeChecked"
            :height="350"
            :page-total="pageTotal"
        />
    </div>
</template>
<script>
    import { VTable, selectSearch } from '@/components/index';
    export default {
        name:'',
        data() {
            return {
                title: '',
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
                    draft: 1,
                    recycleCustomer: 0
                    //recycleSupplier
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
            'v-table': VTable
        },
        methods: {
            getInquiryList() { //获取inquirylist
                this.$ajax.post(this.$apis.POST_INQIIRY_LIST, this.bodyData)
                .then(res => {
                    this.pageTotal = res.tc;
                    this.tabData = this.$getDB(this.$db.inquiry.viewByInqury, res.datas);
                    this.tabLoad = false;
                    this.searchLoad = false; 
                })
                .catch(() => {
                    this.searchLoad = false; 
                    this.tabLoad = false;
                })
            },
            searchEnter(item) { // 搜索框
                this.bodyData.key = item.key;
                this.bodyData.keyType = item.keyType;
            },
            action(item, type) { //操作表单 action
                
            },
            changeChecked(item) { //选中的list
                let arr = [];
                item.forEach(item => {
                    arr.push(item.id.value);
                });
                this.checkedArg = arr;
            },
            getList() {
                switch(this.$route.params.type) {
                    case 'inquiry':
                        this.getInquiryList();
                        break;
                }
            },
            actionInquiry(type) {
                this.$ajax.post(this.$apis.POST_INQUIRY_ACTION, {
                    ids:this.checkedArg,
                    action: type
                })
                .then(res => {
                    this.getInquiryList();
                    this.checkedArg = [];
                });
            },
            submit() { //提交草稿
                switch(this.$route.params.type) {
                    case 'inquiry':
                        this.actionInquiry('submit');
                        break;
                }
            },
            ajaxInqueryAction(type) {
                const argId = this.getChildrenId();
                this.$ajax.post(this.$apis.POST_INQUIRY_ACTION, {
                    action: type,
                    ids:argId
                })
                .then(res => {
                    this.getInquiryList();
                    this.checkedData = [];
                });
            },
            deleteList() { //删除
                this.$confirm('确认删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    switch(this.$route.params.type) {
                        case 'inquiry':
                            this.actionInquiry('delete');
                            break;
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            }
        },
        watch: {
            bodyData: {
                handler(val) {
                    this.getList();
                },
                deep: true
            }
        },
        created() {
            this.getList();
            switch(this.$route.params.type) {
                case 'inquiry':
                    this.title = this.$i.common.inquiryDraft
                    break;
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