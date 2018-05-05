<template>
    <div class="logistic-plan-overview">
        <div class="hd">
            <div class="select-search-wrap">
                <select-search :options="options" />
            </div>
        </div>
        <!-- <v-simple-table :column="tabColumn" :data.sync="tabData" /> -->
    </div>
</template>
<script>
    import { selectSearch, VSimpleTable } from '@/components/index';
    export default {
        name:'logisticPlanOverview',
        data() {
            return {
                tabColumn: [],
                tabData: [],
                viewBy: '',
                options: [
                    {
                        id: '1',
                        label: 'logistic Plan No'
                    },
                    {
                        id: '2',
                        label: 'SKU Code'
                    },
                    {
                        id: '3',
                        label: 'Order No.'
                    }
                ]
            }
        },
        components: {
            'select-search': selectSearch,
            "v-table": VTable
        },
        created() {
            this.viewBy = 'Plan';
        },
        watch: {
            viewBy (newVal, oldVal) {
                this.viewByChange(newVal);
            }
        },
        methods: {
            viewByChange(str) {
                // this.ajax({
                //     url: '/Compare',
                //     method: 'get'
                // }).then(res => {
                //     if(str === 'Plan') {
                //         this.tabData = res.Inquiry;
                //         this.tabColumn = this.$getTableColumn(this.tabData, 'negotiation.tableCompareByInquiry', { width:200 });
                //     } else {
                //         this.tabData = res.SKU;
                //         this.tabColumn = this.$getTableColumn(this.tabData, 'negotiation.tableCompareBySKU', { width:200 });
                //     }
                // });
            }
        }
    }
</script>
<style lang="less" scoped>
    .logistic-plan-overview {
        .hd {
            display:flex;
            justify-content: flex-end;
            padding:20px;
            .select-search-wrap {
                width: 280px;
            }
        }
        .btn-wrap {
            padding:10px;
            display:flex;
            justify-content: space-between;
            .view-by-btn {
                display:flex;
                align-items: center;
                span {
                    font-size:14px;
                    color:#999;
                }
                button {
                    padding:3px 5px;
                }
            }
        }
    }
</style>
