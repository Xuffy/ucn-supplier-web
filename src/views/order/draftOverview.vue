<template>
    <div class="draftOverview">
        <h3 class="hd">Draft Overview</h3>
        <div class="fn">
            <div class="btn-wrap">
                <el-button @click='download' v-authorize="'ORDER:DRAFT_OVERVIEW:DOWNLOAD'">{{($i.common.download)}}({{selectedDate.length}})</el-button>
                 <el-button @click='send' v-authorize="'ORDER:DRAFT_OVERVIEW:SEND'">{{($i.common.send)}}</el-button>
<!--                <el-button type='danger' :disabled='!(selectedDate.length>0)' @click='deleteOrder' v-authorize="'ORDER:DRAFT_OVERVIEW:DELETE'">{{($i.common.delete)}}</el-button>-->
            </div>
             <div class="select-wrap">
               <selectSearch 
                    :options=options
                    @inputEnter="inputEnter"
                     v-model='selectSearch'
                 ></selectSearch>
            </div>         
        </div>
        <div style='display:flex;justify-content: flex-end;margin-right:20px;'>
             <div class="viewBy">
                <span>View by&nbsp</span>
                <el-radio-group v-model="params.view" size="mini" @change='changeView'>
                    <el-radio-button label=1>{{($i.common.order)}}</el-radio-button>
                    <el-radio-button label=2>{{($i.common.SKU)}}</el-radio-button>
                </el-radio-group>
            </div>
        </div>
       
        <!--form-->
          <v-table  
           ref='vtable'
          :data="tabData" 
          :buttons="[{label: 'detail', type: 1}]" 
           @action="onAction"
          :loading='loading'
          :pageTotal='pageTotal'
          @change-checked='checked'
          @page-size-change(size)='pagesizechange'
          @page-change(page)='pagechange'
           style='marginTop:10px'/>     
    </div>
</template>
<script>
    /**
     * @param selectChange 下拉框 值发生变更触发
     * @param keyWord search框 值
     * @param options 下拉框 原始数据 
     * @param value 下拉框 选中值
     */
    import { mapActions } from 'vuex'
    import {
        dropDown,
        selectSearch
    } from '@/components/index'
    import {
        VTable
    } from '@/components/index';
    export default {
        name: 'draftOverview',
        components: {
            dropDown,
            VTable,
            selectSearch
        },
        data() {
            return {
                value: '',
                keyWord: '',
                disabled: false, //delete的状态
                prodisabled: true, // finish的状态
                tabData: [],
                loading: false,
                pageTotal: 1,
                rowspan: 1,
                selectSearch:'1',
                options: [{
                    id: '1',
                    label: 'Order No'
                }, {
                    id: '2',
                    label: 'Sku Code'
                }],
                keyType: '',
                params: {
                    orderNo: '',
                    skuCode: '',
                    view: 1, //view by的按钮组
                    ps: 50,
                    pn: 1
                },
                selectedDate: [],
                selectedNumber: []
            }
        },
        methods: {
             ...mapActions([
                'setRecycleBin','setDraft'
            ]),
            onAction(item, type) {
                this.$windowOpen({
                    url: '/order/detail',
                    params: {
                        orderId: item.id.value
                    }
                });
            },
            pagesizechange() {

            },
            pagechange() {

            },
            creat_order() {
                this.$windowOpen('/order/detail', {
                    selectedDate: this.selectedDate
                });
            },
            selectChange(val) {
                this.keyType = val;
            },
            checked(item) {
                this.selectedDate = item

                this.selectedDate.forEach(item => {
                    this.selectedNumber.push(item.id.value);
                });
            },
            changeView() {
                if (this.params.view == 1) {
                    this.getdata(this.$db.order.overview)
                } else {
                    this.getdata(this.$db.order.overviewBysku)
                }
            },
            inputEnter(val) {
                if (val.keyType == '1') {
                    this.params.orderNo = val.key
                    if (this.params.view == 1) {
                        this.getdata(this.$db.order.overview)
                    } else {
                        this.getdata(this.$db.order.overviewBysku)
                    }
                } else {
                    this.params.skuCode = val.key
                    if (this.params.view == 1) {
                        this.getdata(this.$db.order.overview)
                    } else {
                        this.getdata(this.$db.order.overviewBysku)
                    }
                }
                this.getdata()
            },
            download() {
                this.$ajax.post(this.$apis.download_order, this.selectedNumber)
                    .then((res) => {
                        console.log(res)
                    })
                    .catch((res) => {
                        console.log(res)
                    });
            },
            send() {
                this.$ajax.post(this.$apis.send_order, {
                        ids: this.selectedNumber
                    })
                    .then((res) => {
                        console.log(res)
                    })
                    .catch((res) => {
                        console.log(res)
                    });
            },
            deleteOrder() {
                this.$ajax.post(this.$apis.delete_order, {
                        ids: this.selectedNumber
                    })
                    .then((res) => {
                        this.params.orderNo = val.key
                        if (this.params.view == 1) {
                            this.getdata(this.$db.order.overview)
                        } else {
                            this.getdata(this.$db.order.overviewBysku)
                        }
                    })
                    .catch((res) => {
                        console.log(res)
                    });
            },
            //get_draft_orderlist数据
            getdata(overview) {
                this.loading = true
                this.$ajax.post(this.$apis.get_draft_orderlist, this.params)
                    .then((res) => {
                        this.loading = false
                        this.tabData = this.$getDB(overview, res.datas);
                        //                        , item => {
                        //                            return _.mapObject(item, val => {
                        //                                val._checked = true
                        //                            })
                        //                        }
                    })
                    .catch((res) => {
                        this.loading = false

                    });
            }
        },
        computed: {

        },
        created() {
            this.getdata(this.$db.order.overview)
            this.setRecycleBin({
                name: 'orderRecycleBin',
                show: true
            });
            this.setDraft({
                name: 'orderDraft',
                show: true
            });
        },
        mounted() {
            this.loading = false
        },
        updated() {

        },
        watch: {　
            params: {　　　　　　　　　　
                handler(curVal, oldVal) {　　　　　　　　　　　　
                    if (curVal.view == 1 && curVal.status == 5) {
                        this.disabled = false
                    } else if (curVal.status == 3) {
                        this.prodisabled = false
                        this.disabled = true
                    } else {
                        this.disabled = true
                        this.prodisabled = true
                    }　　　　　　　　　　
                },
                　deep: true　　　　　　　　
            }
        }
    }

</script>
<style scoped>
    >>>.el-input-group__append {
        padding: 0 !important;
    }

</style>
<style lang="less" scoped>
    .draftOverview {
        .hd {
            height: 50px;
            line-height: 50px;
            color: #666;
            border-bottom: 1px solid #ccc;
            font-size: 18px;
            color: #666666;

        }
        .status {
            display: flex;
            height: 60px;
            align-items: center;
            justify-content: space-between;
            padding: 0 15px;
            box-sizing: border-box;
            .btn-wrap {
                display: flex;
                align-items: center;
                span {
                    font-size: 14px;
                }
                button {
                    padding: 2px 5px;
                    cursor: pointer;
                    border: 1px solid #108ee9;
                    background-color: #fff;
                    margin-left: 10px;
                    border-radius: 5px;
                    transition: all .5s ease;
                    &:hover,
                    &.active {
                        background-color: #108ee9;
                        color: #fff;
                    }
                }
            }
            .select-wrap {
                display: flex;
                align-items: center;
                .select {
                    width: 110px;
                    margin-right: 5px;
                    input {}
                }
            }

        }
        .fn {
            display: flex;
            justify-content: space-between;
            padding: 10px 15px;
            box-sizing: border-box;
            .viewBy {
                display: flex;
                align-items: center;
                span {
                    font-size: 14px;
                    color: #666;
                }

                .set {
                    cursor: pointer;
                    padding-left: 40px;
                    /*                    color: #999;*/
                    i {
                        font-size: 25px;
                    }
                    .speDropdown {
                        position: absolute;
                        right: 40px;
                        background-color: #ffffff;
                        z-index: 2000;
                        display: none
                    }
                    .speDropdownshow {
                        position: absolute;
                        right: 40px;
                        background-color: #ffffff;
                        z-index: 2000;

                    }
                }
            }
        }

    }

</style>
