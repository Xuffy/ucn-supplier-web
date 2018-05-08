<template>
    <div class="orderOverview">
        <h3 class="hd">订单总览</h3>
        <div class="status">
            <div class="btn-wrap">
                <span>Status&nbsp</span>
                      <el-radio-group v-model="params.status" size="mini" @change='changeStatus'>
                            <el-radio-button label="">全部</el-radio-button>
                            <el-radio-button label="2"> 待供应商确认</el-radio-button>
                            <el-radio-button label="1">待采购商确认</el-radio-button>
                            <el-radio-button label="3">进行中</el-radio-button>
                            <el-radio-button label="4">已完成</el-radio-button>
                            <el-radio-button label="5">已关闭</el-radio-button>
                    </el-radio-group>
            </div>
            <div class="select-wrap">
               <selectSearch 
                    :options=options
                     v-model='selectSearch'
                    @inputEnter="inputEnter"
                 ></selectSearch>
            </div>
        </div>
        <div class="fn">
            <div class="btn-wrap">
                <el-button @click='download' v-authorize="'ORDER:OVERVIEW:DOWNLOAD'">下载({{selectedDate.length}})</el-button>
<!--                <el-button @click='creat_order' :disabled='!(selectedDate.length==1)' v-authorize="'ORDER:OVERVIEW:CREATE'">{{($i.common.createOrder)}}</el-button>-->
<!--                 <el-button :disabled='prodisabled' @click='finish'>finish</el-button>-->
                <el-button type='danger' :disabled='!(selectedDate.length>0)' @click='deleteOrder' v-authorize="'ORDER:OVERVIEW:DELETE'">删除</el-button>
            </div>
            <div class="viewBy">
                <span>浏览方式&nbsp</span>
                   <el-radio-group v-model="params.view" size="mini" @change='changeView'>
                            <el-radio-button label=1>订单</el-radio-button>
                            <el-radio-button label=2>产品</el-radio-button>
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
           style='marginTop:10px'/>  
           <v-pagination
            :page-data.sync="params"
             @change="handleSizeChange"
            @size-change="pageSizeChange"
        />     
    </div>
</template>
<script>
    /**
     * @param selectChange 下拉框 值发生变更触发
     * @param keyWord search框 值
     * @param options 下拉框 原始数据 
     * @param value 下拉框 选中值
     */

    import {
        dropDown,
        selectSearch,
        VPagination
    } from '@/components/index'
    import {
        VTable
    } from '@/components/index';
    export default {
        name: 'orderOverview',
        components: {
            dropDown,
            VTable,
            selectSearch,
            VPagination
        },
        data() {
            return {
                value: '',
                keyWord: '',
                disabled: false, //delete的状态
                prodisabled: true, // finish的状态
                tabData: [],
                loading: false,
                selectSearch: '1',
                pageTotal: 1,
                rowspan: 1,
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
                    status: '',
                    view: 1, //view by的按钮组
                    ps: 10,
                    pn: 1,
                    tc: 0
                },
                selectedDate: [],
                selectedNumber: []
            }
        },
        methods: {
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
                var obj = []
                this.selectedDate.forEach(item => {
                    obj.push(item.id.value);
                });
                this.selectedNumber = obj
            },
            changeStatus() {
                if (this.params.view == 1) {
                    this.getdata(this.$db.order.overview)
                } else {
                    this.getdata(this.$db.order.overviewBysku)
                }
            },
            changeView() {
                if (this.params.view == 1) {
                    this.getdata(this.$db.order.overview)
                } else {
                    this.getdata(this.$db.order.overviewBysku)
                }
            },
            inputEnter(val) {
                if (!val.keyType) return this.$message('请选中搜索类型');
                if (!val.key) return this.$message('搜索内容不能为空');
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
            finish() {
                this.$ajax.post(this.$apis.post_finishPost, {
                        ids: this.selectedNumber
                    })
                    .then((res) => {
                        console.log(res)
                    })
                    .catch((res) => {
                        console.log(res)
                    });
            },
            download() {
                this.$ajax.post(this.$apis.download_order, {
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
            //get_orderlist数据
            getdata(overview) {
                this.loading = true
                this.$ajax.post(this.$apis.get_orderlist, this.params)
                    .then((res) => {
                        this.loading = false
                        res.tc ? this.params.tc = res.tc : this.params.tc = this.params.tc;
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
            },
            handleSizeChange(val) {
                this.params.pn = val;
                this.getdata()
            },
            pageSizeChange(val) {
                this.params.ps = val;
                this.getdata()
            },
        },
        computed: {

        },
        created() {
            this.getdata(this.$db.order.overview)
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
    .orderOverview {
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
