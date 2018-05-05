<template>
  <div class="poOrder">
        <div class="title">New Order No.1121</div>
<!--         basicinfo-->
         <div class="basic">
               <div class='basicInfo_input'>                
                   <basicinfo :disabled='statusModify' :podisabled=true ref='basicInfo'></basicinfo>
                   <attchment :disabled='statusModify'></attchment>                       
              </div>
        </div>
<!--         attachment-->
            
<!--VExchange-->
        <VExchange :disabled=false ref='exchangeList'></VExchange> 
 <!--             responsibility     -->
         <responsibility ref='responsibility' :disabled='statusModify'></responsibility>
<!--         payment-->
         <v-payment :orderNo='orderNo' 
                    :currencyCode='currencyCode'
                    :payToId='payToId'
                    :orderStatus='orderStatus'
         ></v-payment>
<!--         product_details-->
         <div class="product_details" >
             <div class="pro_title">
                 {{$i.common.productInfo}}
             </div>
             <div class="pro_button">
                  <el-button  @click="dialogAddproduct = true" :disabled='statusModify' v-authorize="'ORDER:DETAIL:PRODUCT_INFO_ADD'">{{$i.common.addproduct}}</el-button>
                  <el-button type='danger' @click='removeProduct' :disabled='statusModify' v-authorize="'ORDER:DETAIL:PRODUCT_INFO_DELETE'">{{$i.common.remove}}</el-button>

             </div>
             <div class="pro_table">
                   <v-table  
                         :data.sync="newProductTabData"
                         :buttons="productInfoBtn"
                         :loading="tableLoad"
                         @action="producInfoAction"
                         @change-checked="changeChecked"
                         :total-row="tableTatal"
                         :rowspan="2"/>
             </div>
         </div>
<!--         caculate-->
         <v-caculate :disabled=true ref='caculate' ></v-caculate>
<!--         底部固定按钮区域-->
         <div class="footer">
             <div class="footer_button" v-if='statusModify'>
                 <el-button  @click='modify' v-authorize="'ORDER:DETAIL:MODIFY'">{{$i.common.modify}}</el-button>
                 <el-button @click='confirm' v-authorize="'ORDER:DETAIL:CONFIRM'">{{$i.common.confirm}}</el-button>
                 <el-button  :disabled='true' v-authorize="'ORDER:OVERVIEW:DOWNLOAD'">{{$i.common.download}}</el-button>
                  <el-button v-authorize="'ORDER:DETAIL:CREATE'">{{$i.common.createOrder}}</el-button>
                  <el-button :disabled="orderStatus==='5'" @click='cancelOrder' v-authorize="'ORDER:DETAIL:CANCEL'">{{$i.common.cancel}}</el-button>
                 <el-checkbox v-model="markAsImportant" v-authorize="'ORDER:DETAIL:MARK_AS_IMPORTANT'">{{$i.common.markAsImportant}}</el-checkbox>
                 <el-checkbox v-model="hightlightTheDifferent">{{$i.common.highlightTheDifferent}}</el-checkbox>
             </div>
               <div class="footer_button" v-else>
                 <el-button @click='send'>{{$i.common.send}}</el-button>
                 <el-button type='danger' @click='modifyCancel'>{{$i.common.cancel}}</el-button>
             </div>
         </div>
<!--                  addproduct弹窗区域-->
           <el-dialog :title="$i.common.addproduct" :visible.sync="dialogAddproduct" width='80%'>
                       <el-tabs v-model="TabsAddproduct" type="card" >
                        <el-tab-pane :label="$i.common.fromNewSearch" name="FromNewSearch">
                           <v-product                     
                               :hideBtns="true"
                                :hideBtn="true"
                                :disabledLine="disabledLine"
                                @handleOK="getList"
                                :forceUpdateNumber="trig" 
                                type="product"
                                :isInquiry="true"
                           ></v-product>
                        </el-tab-pane>
                        <el-tab-pane :label="$i.common.fromMyBookmark" name="FromMyBookmark">
                           <v-product :hideBtns="true"></v-product>
                        </el-tab-pane>
                      </el-tabs>
           </el-dialog>
           
            <v-history-modify  
               @save="save"            
                ref="HM"
            >
            
           </v-history-modify>
  </div>
</template>

<script>
    import responsibility from '../creatOrder/responsibility.vue'
    import basicinfo from '../creatOrder/basicinfo.vue'
    import VProduct from '@/views/product/addProduct';
    import attchment from '../creatOrder/attachment'
    import VCaculate from '../creatOrder/caculate'
    import VPayment from './payment.vue'
    import VExchange from '../creatOrder/exchange.vue'
    import {
        VTable,
        messageBoard,
        VHistoryModify
    } from '@/components/index';
    export default {
        name: 'poOrder',
        components: {
            responsibility,
            basicinfo,
            VProduct,
            attchment,
            VPayment,
            VTable,
            messageBoard,
            VCaculate,
            VHistoryModify,
            VExchange
        },
        data() {
            return {
                tableTatal: [],
                markAsImportant: true, //底部单选 mark as important
                hideTheSame: true, //底部单选 Hide The Same
                hightlightTheDifferent: false, //底选hightlightTheDifferent
                dialogAddproduct: false, //弹窗框 addproduct弹窗区域
                TabsAddproduct: 'FromNewSearch', //tab
                statusModify: true, //页面输入框是否可写
                switchStatus: false,
                Data: [],
                tabData: [],
                orderId: this.$route.query.orderId,
                orderNo: "", // payment
                currencyCode: '', // payment
                payToId: '', // payment
                orderStatus: '',
                loading: false, //表格加载
                id_type: '',
                historyColumn: {},
                newProductTabData: [],
                productTabData: [],
                tableLoad: false,
                oSwitch: false, //VHistory 组件开关状态
                submitData: {
                    deleteDetailIds: []
                },
                disabledLine: [],
                trig: 0,
                tableTatal: []
            }
        },
        methods: {
            confirm() {
                this.$ajax.post(this.$apis.post_confirm, {
                    ids: [this.orderId]
                }).then(res => {
                    console.log(res)
                }).catch(res => {
                    console.log(res)
                })
            },
            //..............messageboard的缩进
            boardSwitch() {
                this.switchStatus = !this.switchStatus;
            },
            //..............编辑状态
            modify() {
                this.statusModify = false
            },
            //..............底部cancel
            modifyCancel() { //页面编辑取消
                this.newProductTabData = this.productTabData;
                this.productCancel();
                this.statusModify = true;
            },
            onAction(item, type) {
                //                console.log(item, type)
            },
            //........取消订单
            cancelOrder() {
                this.$ajax.post(this.$apis.post_cancleOrder, {
                    ids: [this.orderId]
                }).then(res => {
                    this.$router.push({
                        path: '/order/overview',
                    });
                }).catch(res => {
                    console.log(res)
                })
            },
            //........获取数据
            get_data() {
                this.$ajax.get(this.$apis.detail_order, {
                        id: this.orderId
                    })
                    .then((res) => {

                        this.orderStatus = res.status
                        //.传递给[payment]组件的数据
                        this.orderNo = res.orderNo
                        this.currencyCode = res.currency
                        this.payToId = res.companyId

                        this.markAsImportant = res.importantSupplier //importantCustomer端不一样
                        //..........basicinfo
                        this.$refs.basicInfo.formItem = res;
                        //..........caculate
                        this.$refs.caculate.caculateForm = res
                        //..........responsibility
                        this.$refs.responsibility.tableData = res.orderResponsibilityList
                        //..........exchangerate
                        this.$refs.exchangeList.exchangeRateList = res.exchangeRateList
                        //..........attachment
                        //..........productinfo
                        this.newProductTabData = this.$getDB(this.$db.order.productInfo, this.$refs.HM.getFilterData(res.skuList),
                            item => {
                                return item;
                            });

                        this.productTabData = this.$getDB(this.$db.order.productInfo, this.$refs.HM.getFilterData(res.skuList),
                            item => {
                                return item;
                            });
                        this.tableTatalCal();
                        this.tableLoad = false;
                    })
                    .catch((res) => {
                        this.tableLoad = false;

                    });
            },
            //.........按钮操作
            producInfoAction(data, type) { //Produc info 按钮操作
                this.id_type = 'producInfo';
                this.historyColumn = this.$db.order.productInfo;
                switch (type) {
                    case 'histoty':
                        this.fnBasicInfoHistoty(data, 'productInfo', {
                            type: 'histoty',
                            data: data.skuId.value
                        });
                        break;
                    case 'modify':
                        this.oSwitch = true;
                        this.fnBasicInfoHistoty(data, 'productInfo', {
                            type: 'modify',
                            data: data.skuId.value
                        });
                        break;
                        break;
                    case 'detail':
                        this.$windowOpen({
                            url: '/product/sourcingDetail',
                            params: {
                                id: data.skuId.value
                            }
                        });
                }
            },
            productInfoBtn(item) { //Product info 按钮创建
                if (!this.statusModify && !item._disabled) return [{
                    label: 'Modify',
                    type: 'modify'
                }, {
                    label: 'Histoty',
                    type: 'histoty'
                }, {
                    label: 'Detail',
                    type: 'detail'
                }];
                if (this.statusModify && item._disabled) return [{
                    label: 'Modify',
                    type: 'modify'
                }, {
                    label: 'Histoty',
                    type: 'histoty'
                }, {
                    label: 'Detail',
                    type: 'detail'
                }];
                if (!item._disabled) return [{
                    label: 'Histoty',
                    type: 'histoty',
                    _disabled: false
                }, {
                    label: 'Detail',
                    type: 'detail',
                    _disabled: false
                }];
            },
            changeChecked(item) { //获取选中的单 集合
                this.checkedAll = item;
            },
            //..........addproduct 弹窗
            getList(item) {
                this.$ajax.post(this.$apis.post_order_skus, item)
                    .then(res => {
                        _.map(res, item => {
                            item.displayStyle = 0;
                        });
                        this.newProductTabData = this.newProductTabData.concat(this.$getDB(this.$db.order.productInfo, this.$refs.HM.getFilterData(res, 'skuId')));
                        this.dialogAddproduct = false;
                    });
            },
            fnBasicInfoHistoty(item, type, config) { //查看历史记录
                let column;
                this.$ajax.post(this.$apis.get_order_history, {
                        orderNo: this.$refs.basicInfo.formItem.orderNo,
                        skuId: item.id.value
                    })
                    .then(res => {
                        let arr = [];
                        _.map(this.newProductTabData, items => {
                            if (_.findWhere(items, {
                                    'key': 'skuId'
                                }).value + '' === config.data + '') arr.push(items)
                        });
                        if (config.type === 'histoty') {
                            this.$refs.HM.init(arr, this.$getDB(this.$db.inquiry.productInfo, this.$refs.HM.getFilterData(res.datas, 'skuId')), false);
                        } else {
                            this.$refs.HM.init(arr, this.$getDB(this.$db.inquiry.productInfo, this.$refs.HM.getFilterData(res.datas, 'skuId')), true);
                        }
                    });
            },
            productModify() { //  提交 product 编辑 
                this.newProductTabData.forEach((item, index) => {
                    if (!item._remove && item._disabled) {
                        item._remove = true;
                        this.submitData.deleteDetailIds.push(item);
                    };
                    this.$set(this.newProductTabData, index, item);
                });
            },
            save(data) { //modify 编辑完成反填数据
                // 反填 productTabData
                this.newProductTabData = _.map(this.newProductTabData, val => {
                    if (_.findWhere(val, {
                            'key': 'skuId'
                        }).value + '' === _.findWhere(data[0], {
                            'key': 'skuId'
                        }).value + '' && !val._remark && !data[0]._remark) {
                        val = data[0];
                        val._modify = true;
                        val.displayStyle = 1;
                        //                        _.mapObject(val, (item, k) => {
                        //                            if (item.length) this.$set(item, '_style', 'color:#27b7b6')
                        //                        });
                    } else if (_.findWhere(val, {
                            'key': 'skuId'
                        }).value + '' === _.findWhere(data[1], {
                            'key': 'skuId'
                        }).value + '' && val._remark && data[1]._remark) {
                        val = data[1];
                        val._modify = true;
                        val.displayStyle = 1;
                        //                        _.mapObject(val, (item, k) => {
                        //                            if (item.length) this.$set(item, '_style', 'color:#27b7b6')
                        //                        });
                    }
                    return val;
                });
            },
            removeProduct() { //删除product 某个单
                let arr = [];
                _.map(this.newProductTabData, (item, index) => {
                    if (_.indexOf(_.pluck(_.pluck(this.checkedAll, 'skuId'), 'value'), Number(item.skuId.value)) !== -1) arr.push(item);
                });
                this.newProductTabData = _.difference(this.newProductTabData, arr);
                this.checkedAll = [];
            },
            dataFilter(data) {
                let arr = [],
                    jsons = {},
                    json = {};
                data.forEach(item => {
                    jsons = {};
                    if (item._remark) { //拼装remark 数据
                        for (let k in item) {
                            jsons[k] = item[k].value;
                        }
                        json.fieldRemark = jsons;
                    } else {
                        json = {};
                        for (let k in item) {
                            if (json[k] === 'fieldRemark') {
                                json[k] = jsons;
                            } else {
                                json[k] = item[k].value;
                            }
                        };
                        arr.push(json);
                    }
                });
                return arr;
            },
            productCancel() { //  取消 product 编辑 
                this.newProductTabData.forEach((item, index) => {
                    if (!item._remove && item._disabled) {
                        item._disabled = false;
                        item._remove = false;
                    };
                    this.$set(this.newProductTabData, index, item);
                });
            },
            send() {
                let parentNode = this.$filterModify(this.dataFilter(this.newProductTabData))
                //                return console.log(parentNode)
                //参数一堆堆 我靠
                let params = {
                    // exchangeRateList
                    exchangeRateList: this.$refs.exchangeList.exchangeRateList,
                    skuList: parentNode,
                    responsibilityList: this.$refs.responsibility.tableData,
                    draftCustomer: false,
                    importantCustomer: false,
                    importantSupplier: this.markAsImportant,
                }
                var basic = this.$refs.basicInfo.formItem
                _.extendOwn(params, basic)
                var caculate = this.$refs.caculate.caculateForm
                _.extendOwn(params, caculate)
                this.$ajax.post(this.$apis.post_updataOrder, params)
                    .then(res => {
                        this.$router.push('/order/overview')
                    })
                    .catch((res) => {
                        console.log(res)
                    });
            },
            addProduct() {
                let arr = [];
                _.map(this.newProductTabData, item => {
                    if (!item._disabled) arr.push(item);
                });
                this.disabledLine = arr;
                this.trig = new Date().getTime();
                this.dialogAddproduct = true;
            },
            //表格底部计算
            tableTatalCal() {
                let obj = this.$depthClone(this.newProductTabData[0]);
                console.log(_.values(this.newProductTabData))
                _.map(this.newProductTabData, value => {
                    _.map(value, (val, k) => {
                        if (obj[val.key] && obj[val.key]._calu) {
                            obj[val.key].value = (obj[val.key].value + val.value)
                        } else {
                            obj[val.key].value = ''
                        }
                        this.tableTatal = [obj]
                    });
                });
            },
            //summary
            summary() {
                let arr = this.dataFilter(this.tabData)

                // sku数量合计
                this.$refs.caculate.caculateForm.totalQty = _.reduce(_.pluck(arr, 'skuQty'), (memo, num) => {
                    return memo + num;
                }, 0)
                // sku行  skutypeqty
                this.$refs.caculate.caculateForm.skuQty = arr.length
                //sku订单价格之和
                this.$refs.caculate.caculateForm.totalSkuPrice = _.reduce(_.pluck(arr, 'skuPrice'), (memo, num) => {
                    return memo + num;
                }, 0)
                //订单内所有SKU的（数量/外箱产品数）值的合计，且必须被整除  skuQty skuOuterCartonQty   
                this.$refs.caculate.caculateForm.totalOuterCartonQty = _.reduce((_.map(_.pluck(arr, 'skuOuterCartonQty'), (key, index) => {
                    return ((_.pluck(arr, 'skuQty')[index]) / key)
                })), (memo, num) => {
                    return memo + num;
                }, 0)
                //毛重 订单内所有SKU的外箱毛重*外箱数  skuOuterCartonRoughWeight skuOuterCartonQty
                this.$refs.caculate.caculateForm.totalGrossWeight = _.reduce((_.map(_.pluck(arr, 'skuOuterCartonQty'), (key, index) => {
                    return ((_.pluck(arr, 'skuOuterCartonRoughWeight')[index]) * key)
                })), (memo, num) => {
                    return memo + num;
                }, 0)
                //净重 订单内所有SKU的外箱净重*外箱数  skuOuterCartonNetWeight  skuOuterCartonQty
                this.$refs.caculate.caculateForm.totalNetWeight = _.reduce((_.map(_.pluck(arr, 'skuOuterCartonQty'), (key, index) => {
                    return ((_.pluck(arr, 'skuOuterCartonNetWeight')[index]) * key)
                })), (memo, num) => {
                    return memo + num;
                }, 0)
                //订单内所有SKU的外箱体积*外箱数 skuVolume skuOuterCartonQty
                this.$refs.caculate.caculateForm.totalVolume = _.reduce((_.map(_.pluck(arr, 'skuOuterCartonQty'), (key, index) => {
                    return ((_.pluck(arr, 'skuVolume')[index]) * key)
                })), (memo, num) => {
                    return memo + num;
                }, 0)
                //预计付款金额（已确认）-实际付款金额（已确认）-退款金额（已确认）
                //                 this.$refs.caculate.caculateForm.paidAmount=_.reduce(_.pluck(arr, 'skuPrice'))
                //实际付款金额（已确认）
                //                 this.$refs.caculate.caculateForm.unpaidAmount=_.reduce(_.pluck(arr, 'skuPrice'))
            },
        },
        mounted() {

        },
        created() {
            this.get_data()
            this.submitData.id = this.$route.query.id;
        },
        watch: {
            newProductTabData: {
                handler(curVal) {
                    //                  this.tableTatalCal()
                    this.summary()
                },
                deep: true
            }
        }
    }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .title {
        font-weight: bold;
        font-size: 18px;
        height: 50px;
        line-height: 50px;
        color: #666666;
        border-bottom: 1px solid #ccc;
    }

    .pro_title {
        font-size: 14px;
        height: 60px;
        line-height: 60px;
        border-bottom: 1px solid #ccc;
        padding: 0 15px;
    }

    .order_remark {
        width: 372px;
    }

    .order_remark_title {
        margin-bottom: 20px;
        font-size: 16px;
    }

    .basicinfo_other {
        margin-left: 80px;
        /*
        display: flex;
        justify-content:space-between;
*/
    }

    .attchment {
        /*        width: 400px;*/
        /*        margin-left: 20px;*/
    }

    .pro_button {
        margin-top: 10px;
    }

    .pro_table {
        margin-top: 10px;
        /*        padding-bottom: 60px;*/
    }

    .footer {
        width: 100%;
        height: 60px;
        background-color: white;
        position: fixed;
        bottom: 0;
        z-index: 60;
        line-height: 60px;
    }

    .select-wrap {
        display: flex;
        height: 60px;
        align-items: center;
        justify-content: flex-end;
        box-sizing: border-box;
    }

    .select {
        width: 110px;
        margin-right: 5px;
    }

    .switch-btn {
        width: 30px;
        position: absolute;
        left: -30px;
        top: 0;
        writing-mode: tb-rl;
        transform: rotate(180deg);
        cursor: pointer;
        background: #f2f2f2;
        line-height: 30px;
        height: 240px;
        text-align: right;
        font-size: 12px;
        color: #333;
        font-weight: bold;
        padding-bottom: 10px;
        border-radius: 0 5px 0 0;
        z-index: 11;
    }

    .switch-btn i {
        transition: all .5s ease;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: 16px;
        font-weight: bold;
        color: #c0c0c0;
    }

    .basic {
        display: flex;
        justify-content: space-between;
    }

    .message_div {
        width: 220px;
        /*        height: 600px;*/
    }

    .basicinfo_message {
        position: relative;
        margin-left: 40px;
    }

</style>
