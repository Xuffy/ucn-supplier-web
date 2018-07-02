<template>
    <div class="compare-overview">
        <h3 class="hd">{{ title }}</h3>
        <div class="status">
            <div class="btn-wrap">
                <el-button type="primary" @click="submit" :disabled="checkedArg.length <= 0">{{ `${$i.common.recover}(${checkedArg.length})` }}</el-button>
                <el-button type="primary">{{ `${$i.common.download}(${checkedArg.length ? checkedArg.length : 'all'})`}}</el-button>
            </div>
            <select-search :options="options" @inputChange="searchEnter" />
        </div>
        <v-table 
            :data="tabData" 
            :loading="tabLoad"
            :buttons="buttonsFn" 
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
        mounted() {
            this.$store.dispatch('setLog', {query: {code: 'INQUIRY'}});
        },
        methods: {
            buttonsFn() {
                if(this.$route.params.type === 'inquiry') return [{label: 'Detail', type: 'detail'}];
            },
            getInquiryList() { // 获取inquirylist
                this.$ajax.post(this.$apis.BUYER_POST_INQIIRY_LIST, this.bodyData)
                .then(res => {
                    this.pageTotal = res.tc;
                    this.tabData = this.$getDB(this.$db.inquiry.viewByInqury, res.datas);
                    this.tabLoad = false;
                    this.searchLoad = false; 
                })
                .catch(() => {
                    this.searchLoad = false; 
                    this.tabLoad = false;
                });
            },
            searchEnter(item) { // 搜索框
                this.bodyData.key = item.key;
                this.bodyData.keyType = item.keyType;
            },
            action(item, type) { //操作表单 action
                switch(this.$route.params.type) {
                    case 'compare':
                        this.$router.push({
                            name: 'negotiationCompareDetail',
                            query: {
                                id: item.id.value
                            },
                            params: {
                                type: 'only'
                            }
                        })
                        break;
                    case 'inquiry':
                        this.$router.push({
                            path: '/negotiation/inquiryDetail',
                            query: {
                                id: item.id.value
                            }
                        })
                        break;
                }
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
                    case 'compare':
                        this.getCompare();
                        break;
                }
            },
            actionInquiry(type) {
                this.$ajax.post(this.$apis.BUYER_POST_INQUIRY_ACTION, {
                    ids:this.checkedArg,
                    action: type
                })
                .then(res => {
                    this.tabData.forEach((item, index) => {
                        res.forEach(key => {
                            if(item.id.value === key) {
                                this.tabData.splice(index, 1);
                            }
                        });
                    });
                    this.checkedArg = [];
                });
            },
            actionCompare() {
                this.$ajax.post(this.$apis.BUYER_POST_INQUIRY_COMPARE_RESTORE, this.checkedArg)
                .then(res => {
                    this.checkedArg = [];
                    this.getCompare();
                });
            },
            submit() { //删除恢复
                switch(this.$route.params.type) {
                    case 'inquiry':
                        this.actionInquiry('restore');
                        break;
                    case 'compare':
                        this.actionCompare('restore');
                        break;
                }
            },
            ajaxInqueryAction(type) {
                const argId = this.getChildrenId();
                this.$ajax.post(this.$apis.BUYER_POST_INQUIRY_ACTION, {
                    action: type,
                    ids:argId
                })
                .then(res => {
                    this.getInquiryList();
                    this.checkedData = [];
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
            switch(this.$route.params.type) {
                case 'inquiry':
                    this.title = this.$i.common.inquiryRecycleBin;
                    this.bodyData.recycleSupplier = 1;
                    break;
                case 'compare':
                    this.title = this.$i.common.compareRecycleBin;
                    this.bodyData.recycle = 1;
                    //recycleSupplier
                    break;
            };
            this.getList();            
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