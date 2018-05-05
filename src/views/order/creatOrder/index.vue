<template>
  <div class="creatOrder">
        <div class="title">New Order No.待后台数据</div>
<!--         basicinfo-->
         <VBasicinfo ref='basicInfo' class='basicinfo'></VBasicinfo>
       
         <VAttchment :disabled=false class='attachment'></VAttchment>
         <VExchange :disabled=false ref='exchangeList' ></VExchange>  
<!--             responsibility     -->
         <VResponsibility ref='responsibility' ></VResponsibility>
<!--         productinfo-->
         <div class="productinfo">
             <div class="pro_title">
                 {{$i.productInfo}}
             </div>
             <div class="pro_button">
                  <el-button  @click="addProduct">{{$i.common.addproduct}}</el-button>
                  <el-button type='danger' @click='removeList'>{{$i.common.remove}}</el-button>
             </div>
             <div class="pro_table">
                     <v-table  
                            :data.sync="tabData" 
                            :buttons="productInfoBtn"
                            @action="producInfoAction"
                            :loading='tableLoad'
                            @change-checked="changeChecked"
                            :rowspan="2"
                            :total-row="tableTatal"
                            style='marginTop:10px'/>
             </div>
         </div>
<!--           caculate-->
         <v-caculate ref='caculate'></v-caculate>
<!--         底部固定按钮区域-->
         <div class="footer">
             <div class="footer_button">
                 <el-button @click='send'>{{$i.common.send}}</el-button>
                 <el-button @click='saveAsDraft'>{{$i.common.saveAsDraft}}</el-button>
                 <el-button  @click="dialogQuickcreate = true">{{$i.common.quickCreate}}</el-button>
                 <el-checkbox v-model="markAsImportant">{{$i.common.markAsImportant}}</el-checkbox>
             </div>
         </div>
<!--              quickcreate弹窗区域-->
<!--          <el-dialog :title="$i.common.quickCreate" :visible.sync="dialogQuickcreate" width='70%'>-->
                <VInquiry 
                   v-model=dialogQuickcreate
                  :selectionRadio=true
                    @addInquiry='addinquiry'
                ></VInquiry>
<!--        </el-dialog>-->
<!--                  addproduct弹窗区域-->
           <el-dialog :title="$i.common.fromNewSearch"  :visible.sync="dialogAddproduct" width='70%'>
                       <el-tabs v-model="TabsAddproduct" type="card" >
                        <el-tab-pane :label="$i.common.addproduct" name="FromNewSearch">
                             <v-product 
                                :hideBtns="true"
                                :hideBtn="true"
                                 @handleCancel='canceldialog'
                                 :disabledLine="disabledLine"
                                @handleOK="getList"
                                :forceUpdateNumber="trig" 
                                type="product"
                                :isInquiry="true"
                            ></v-product>
                        </el-tab-pane>
                        <el-tab-pane :label="$i.common.fromMyBookmark" name="FromMyBookmark">
                              <v-product 
                                :hideBtns="true"
                                :hideBtn="true"
                                 :disabledLine="disabledLine"
                                @handleOK="getList"
                              @handleCancel='canceldialog'
                                :forceUpdateNumber="trig" 
                                type="bookmark"
                                :isInquiry="true"
                            ></v-product>
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
    /* this.$ref.basicInfo*/
    import VResponsibility from './responsibility.vue'
    import VBasicinfo from './basicinfo.vue'
    import VAttchment from './attachment'
    import VCaculate from './caculate'
    import VDialogEdit from './dialogEdit'
    import VProduct from '@/views/product/addProduct';
    import VExchange from './exchange.vue'
    import VInquiry from '../../negotiation/children/addNewInqury'
    import {
        VTable,
        VHistoryModify
    } from '@/components/index';
    export default {
        name: 'creatOrder',
        components: {
            VResponsibility,
            VBasicinfo,
            VProduct,
            VAttchment,
            VTable,
            VDialogEdit,
            VCaculate,
            VHistoryModify,
            VProduct,
            VExchange,
            VInquiry
        },
        data() {
            return {
                tableTatal: [],
                textarea: "", //order remark输入内容
                markAsImportant: true, //底部单选 mark as important
                dialogQuickcreate: false, // 弹出框quickcreate弹窗区域
                dialogHistory: false, //弹出框 productinfo 弹窗区域
                dialogAddproduct: false,
                TabsAddproduct: 'FromNewSearch', //tab
                value: '',
                keyWord: '',
                tabData: [],
                tableLoad: false, //表格加载状态  
                statusModify: true,
                id_type: '',
                historyColumn: {},
                oSwitch: false, //VHistory 组件开关状态
                checkedAll: '',
                skuList: [{
                    "companyId": 0,
                    "entryDt": "2018-04-28T02:56:16.789Z",
                    "entryId": 0,
                    "entryName": "string",
                    "fieldsRemark": "string",
                    "id": 0,
                    "orderId": 0,
                    "orderNo": "string",
                    "ownerId": 0,
                    "skuAdditionalFour": "string",
                    "skuAdditionalOne": "string",
                    "skuAdditionalThree": "string",
                    "skuAdditionalTwo": "string",
                    "skuAdjustPackage": true,
                    "skuApplicableAge": 0,
                    "skuAvailableQty": 0,
                    "skuBarCode": "string",
                    "skuBrand": "string",
                    "skuBrandRelated": "string",
                    "skuBrandRemark": "string",
                    "skuCategoryFour": "string",
                    "skuCategoryId": 0,
                    "skuCategoryOne": "string",
                    "skuCategoryThree": "string",
                    "skuCategoryTwo": "string",
                    "skuCertificat": "string",
                    "skuCifCurrency": "string",
                    "skuCifPort": "string",
                    "skuCifPrice": 0,
                    "skuCode": "string",
                    "skuColourCn": "string",
                    "skuColourEn": "string",
                    "skuComments": "string",
                    "skuCommodityInspectionCn": "string",
                    "skuCommodityInspectionEn": "string",
                    "skuCustomerCreate": true,
                    "skuCustomerSkuCode": "string",
                    "skuCustomsCode": "string",
                    "skuCustomsNameCn": "string",
                    "skuCustomsNameEn": "string",
                    "skuDduCurrency": "string",
                    "skuDduPort": "string",
                    "skuDduPrice": 0,
                    "skuDeclareElement": "string",
                    "skuDeliveredQty": 0,
                    "skuDeliveryDates": 0,
                    "skuDepartureDt": 0,
                    "skuDescCn": "string",
                    "skuDescCustomer": "string",
                    "skuDescEn": "string",
                    "skuDesign": "string",
                    "skuDisplayBoxQty": 0,
                    "skuExpireDates": 0,
                    "skuExpireUnit": "string",
                    "skuExwCurrency": "string",
                    "skuExwPrice": 0,
                    "skuFobCurrency": "CNY",
                    "skuFobPort": "string",
                    "skuFobPrice": 0,
                    "skuFormation": "string",
                    "skuGp20SkuQty": 0,
                    "skuGp40SkuQty": 0,
                    "skuHeight": 0,
                    "skuHq40SkuQty": 0,
                    "skuId": 0,
                    "skuInboundQty": 0,
                    "skuInnerCartonDesc": "string",
                    "skuInnerCartonHeight": 0,
                    "skuInnerCartonLength": 0,
                    "skuInnerCartonMethodCn": "string",
                    "skuInnerCartonMethodEn": "string",
                    "skuInnerCartonOuterNum": 0,
                    "skuInnerCartonPic": "string",
                    "skuInnerCartonQty": 0,
                    "skuInnerCartonRoughWeight": 0,
                    "skuInnerCartonUnit": "string",
                    "skuInnerCartonVolume": 0,
                    "skuInnerCartonWeightNet": 0,
                    "skuInnerCartonWidth": 0,
                    "skuInnerPackBarCode": "string",
                    "skuInnerPackCode": "string",
                    "skuInnerPackLabel": "string",
                    "skuInspectQuarantineCategory": "string",
                    "skuInventory": 0,
                    "skuInventoryCostMethod": "string",
                    "skuLabel": "string",
                    "skuLabelDesc": "string",
                    "skuLabelPic": "string",
                    "skuLength": 0,
                    "skuLengthWidthHeight": "string",
                    "skuMainSaleArea": "string",
                    "skuMainSaleCountry": 0,
                    "skuMaterialCn": "string",
                    "skuMaterialEn": "string",
                    "skuMethodPkgCn": "string",
                    "skuMethodPkgEn": "string",
                    "skuMinInventory": 0,
                    "skuMinOrderQty": 0,
                    "skuModifyStatus": 0,
                    "skuNameCn": "string",
                    "skuNameCustomer": "string",
                    "skuNameEn": "string",
                    "skuNetWeight": 0,
                    "skuNoneSellCountry": 0,
                    "skuOem": true,
                    "skuOrigin": "string",
                    "skuOtherPackInfoCn": "string",
                    "skuOtherPackInfoEn": "string",
                    "skuOuterCartonBarCode": "string",
                    "skuOuterCartonCode": "string",
                    "skuOuterCartonDesc": "string",
                    "skuOuterCartonHeight": 0,
                    "skuOuterCartonLength": 0,
                    "skuOuterCartonMethodCn": "string",
                    "skuOuterCartonMethodEn": "string",
                    "skuOuterCartonNetWeight": 0,
                    "skuOuterCartonPic": "string",
                    "skuOuterCartonQty": 1,
                    "skuOuterCartonRoughWeight": 0,
                    "skuOuterCartonUnit": "string",
                    "skuOuterCartonVolume": 0,
                    "skuOuterCartonWidth": 0,
                    "skuPic": "string",
                    "skuPkgMethodPic": "string",
                    "skuPrice": 0,
                    "skuProductionDates": 0,
                    "skuQty": 1,
                    "skuQtyPerTray": 0,
                    "skuQualifiedQty": 0,
                    "skuQualityStander": "string",
                    "skuQuotationNo": "string",
                    "skuRateValueAddedTax": 0,
                    "skuReadilyAvailable": true,
                    "skuRecycle": true,
                    "skuRemarkOne": "string",
                    "skuRemarkThree": "string",
                    "skuRemarkTwo": "string",
                    "skuSafeInventory": 0,
                    "skuSaleStatus": 0,
                    "skuSample": true,
                    "skuSamplePrice": 0,
                    "skuSampleQty": 0,
                    "skuShippingMarks": "string",
                    "skuSpecialTransportRequire": "string",
                    "skuStatus": 0,
                    "skuSupplierCode": "string",
                    "skuSupplierId": 0,
                    "skuSupplierName": "string",
                    "skuSysCode": "string",
                    "skuTaxRefundRate": 0,
                    "skuTradeMarkCn": "string",
                    "skuTradeMarkEn": "string",
                    "skuTryDimension": 0,
                    "skuUnit": "string",
                    "skuUnitLength": 0,
                    "skuUnitVolume": 0,
                    "skuUnitWeight": 0,
                    "skuUntestedQty": 0,
                    "skuUseDisplayBox": true,
                    "skuVolume": 0,
                    "skuWarehourceDefault": "string",
                    "skuWidth": 0,
                    "skuYearListed": "2018-04-28T02:56:16.789Z",
                    "tenantId": 0,
                    "timeZone": "string",
                    "updateDt": "2018-04-28T02:56:16.789Z",
                    "updateId": 0,
                    "updateName": "string",
                    "version": 0
                }],
                trig: 0,
                radio: 'product',
                disabledLine: [],
            }
        },
        methods: {
            addProduct() {
                let arr = [];
                _.map(this.tabData, item => {
                    if (!item._disabled) arr.push(item);
                });
                this.disabledLine = arr;
                this.trig = new Date().getTime();
                this.dialogAddproduct = true;
            },
            canceldialog() {
                this.dialogAddproduct = false
            },
            //......................提交
            send() {
                // 正则 
                //                if (!this.$refs.basicInfo.submitForm()) { 
                //                     return }
                return console.log(this.dataFilter(this.tabData))
                let params = {
                    // exchangeRateList
                    exchangeRateList: this.$refs.exchangeList.exchangeRateList,
                    skuList: this.dataFilter(this.tabData),
                    //                    skuList: this.skuList,
                    responsibilityList: this.$refs.responsibility.tableData,
                    draftCustomer: false,
                    //                    importantCustomer: false,
                    importantSupplier: this.markAsImportant,
                }
                var basic = this.$refs.basicInfo.formItem
                _.extendOwn(params, basic)
                var caculate = this.$refs.caculate.caculateForm
                _.extendOwn(params, caculate)

                this.$ajax.post(this.$apis.add_order, params)
                    .then(res => {
                        this.$router.push('/order/overview')
                    })
                    .catch((res) => {
                        console.log(res)
                    });
            },
            saveAsDraft() {
                let params = {
                    // exchangeRateList
                    exchangeRateList: this.$refs.exchangeList.exchangeRateList,
                    skuList: this.dataFilter(this.tabData),
                    responsibilityList: this.$refs.responsibility.tableData,
                    draftCustomer: true,
                    //                    importantCustomer: false,
                    importantSupplier: this.markAsImportant,
                }
                var basic = this.$refs.basicInfo.formItem
                _.extendOwn(params, basic)
                var caculate = this.$refs.caculate.caculateForm
                _.extendOwn(params, caculate)

                this.$ajax.post(this.$apis.add_order, params)
                    .then(res => {
                        console.log(res)
                    })
                    .catch((res) => {
                        console.log(res)
                    });
            },
            //..............summary计算
            /*
                TotalQuantity:'',
                SKUTypeQuantity:'',
                TotalSKUPrice:'',  skuPrice
                TotalOuterCartonQuantity:'',  skuOuterCartonQty
                TotalOuterCartonGrossWet:'',
                TotalOuterCartonNetWet:'',  skuOuterCartonNetWeight
                TotalOuterCartonVolume:'',  skuOuterCartonVolume
                PaidAmount:'',
                UnpaidAmount:''
            */
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
            productInfoBtn(item) { //Product info 按钮创建
                return [{
                    label: 'Modify',
                    type: 'modify'
                }, {
                    label: 'Histoty',
                    type: 'histoty'
                }, {
                    label: 'Detail',
                    type: 'detail'
                }];
            },
            producInfoAction(data, type) { //Produc info 按钮操作
                this.id_type = 'producInfo';
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
                    case 'detail':
                        this.$windowOpen({
                            url: '/product/sourcingDetail',
                            params: {
                                id: data.skuId.value
                            }
                        });
                }
            },
            changeChecked(item) { //获取选中的单 集合
                this.checkedAll = item;
            },
            //..........addproduct 弹窗
            getList(item) {
                this.$ajax.post(this.$apis.post_order_skus, item)
                    .then(res => {

                        //                        _.map(res, item => { // item.displayStyle = 0; // });

                        this.tabData = this.tabData.concat(this.$getDB(this.$db.order.productInfo, this.$refs.HM.getFilterData(res, 'skuId')));
                        this.dialogAddproduct = false;
                    });
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
            fnBasicInfoHistoty(item, type, config) { //查看历史记录
                let column;
                this.$ajax.post(this.$apis.get_order_history, {
                        orderNo: this.$refs.basicInfo.formItem.orderNo,
                        skuId: item.skuId.value
                    })
                    .then(res => {
                        let arr = [];

                        _.map(this.tabData, items => {
                            if (_.findWhere(items, {
                                    'key': 'skuId'
                                }).value + '' === config.data + '' && !items._disabled) arr.push(items)
                        });
                        if (config.type === 'histoty') {
                            this.$refs.HM.init(arr, this.$getDB(this.$db.order.productInfo, this.$refs.HM.getFilterData(res.datas, 'skuId')), false);
                        } else {
                            this.$refs.HM.init(arr, this.$getDB(this.$db.order.productInfo, this.$refs.HM.getFilterData(res.datas, 'skuId')), true);
                        }
                    });
            },
            save(data) { //modify 编辑完成反填数据
                this.tabData = _.map(this.tabData, val => {
                    if (_.findWhere(val, {
                            'key': 'skuId'
                        }).value === _.findWhere(data[0], {
                            'key': 'skuId'
                        }).value && !val._remark && !data[0]._remark) {
                        val = data[0];
                        val._modify = true;
                        val.displayStyle = 1;
                        //                        _.mapObject(val, (item, k) => {
                        //                            if (item.length) this.$set(item, '_style', 'color:#27b7b6')
                        //                        })
                    } else if (_.findWhere(val, {
                            'key': 'skuId'
                        }).value === _.findWhere(data[1], {
                            'key': 'skuId'
                        }).value && val._remark && data[1]._remark) {
                        val = data[1];
                        val._modify = true;
                        val.displayStyle = 1;
                        //                        _.mapObject(val, (item, k) => {
                        //                            if (item.length) this.$set(item, '_style', 'color:#27b7b6')
                        //                        })
                    }
                    return val;
                });
            },
            removeList() {
                let arr = [];
                _.map(this.tabData, (item, index) => {
                    if (_.indexOf(_.pluck(_.pluck(this.checkedAll, 'skuId'), 'value'), Number(item.skuId.value)) !== -1) arr.push(item);
                });
                this.tabData = _.difference(this.tabData, arr);
                this.checkedAll = [];
            },
            productCancel() { //  取消 product 编辑 
                this.tabData.forEach((item, index) => {
                    if (!item._remove && item._disabled) {
                        item._disabled = false;
                        item._remove = false;
                    };
                    this.$set(this.tabData, index, item);
                });
            },
            //...........................................带入数据
            //supplier带入
            getSupplierDetail() {
                this.$nextTick(() => {
                    this.$refs.basicInfo.formItem.supplierName = this.$route.query.supplierName
                    this.$refs.basicInfo.formItem.supplierNo = this.$route.query.supplierNo
                })
            },
            //inquiry带入
            addinquiry(data) {
                console.log(data)
            },
            getInquiryDetail(id) { //获取 Inquiry detail 数据
                this.$ajax.get(`${this.$apis.GET_INQIIRY_DETAIL}/{id}`, {
                        id: id
                    })
                    .then(res => {
                        console.log(res)
                        //basicinfo /*supplierName  quotationNo incoterm  payment departureCountry departurePort destinationCountry destinationPort transport*/     
                        this.$refs.basicInfo.formItem.supplierName = res.supplierName
                        this.$refs.basicInfo.formItem.quotationNo = res.quotationNo
                        this.$refs.basicInfo.formItem.incoterm = res.incoterm
                        this.$refs.basicInfo.formItem.payment = res.payment
                        this.$refs.basicInfo.formItem.departureCountry = res.departureCountry
                        this.$refs.basicInfo.formItem.departurePort = res.departurePort
                        this.$refs.basicInfo.formItem.destinationCountry = res.destinationCountry
                        this.$refs.basicInfo.formItem.destinationPort = res.destinationPort
                        this.$refs.basicInfo.formItem.transport = res.transport
                        //Product Info

                        this.tabData = this.$getDB(this.$db.order.productInfo, this.$refs.HM.getFilterData(res.details),
                            item => {
                                return item;
                            });
                        this.tableLoad = false;
                        this.tableTatalCal()
                    })
                    .catch(err => {
                        this.tableLoad = false;
                    });
            },
            //product带入
            getProductDetail() {
                let arr = this.$route.query.ids
                this.$ajax.post(this.$apis.post_order_skus, arr)
                    .then(res => {
                        _.map(res, arr => {
                            arr.displayStyle = 0;
                        });
                        this.tabData = this.tabData.concat(this.$getDB(this.$db.order.productInfo, this.$refs.HM.getFilterData(res, 'skuId')));
                        this.dialogAddproduct = false;
                    });
            },
            //表格底部计算
            tableTatalCal() {
                let obj = this.$depthClone(this.tabData[0]);
                _.map(this.tabData, value => {
                    _.map(value, (val, k) => {

                        if (obj[val.key] && obj[val.key]._calu) {
                            obj[val.key].value = (obj[val.key].value + val.value)
                        } else {
                            obj[val.key].value = ''
                        }
                        this.tableTatal = [obj]
                    });
                });
            }
        },
        created() {
            //判断从哪个地方带来的数据
            let fromData = this.$route.query.type
            switch (fromData) {
                case 'supplier':
                    this.getSupplierDetail()
                    break;
                case 'inquiry':
                    this.getInquiryDetail(this.$route.query.id)
                    break;
                case 'product':
                    this.getProductDetail()
                    break;
                default:
                    console.log("裸进")
            }
        },
        mounted() {},
        watch: {
            tabData: {
                handler(curVal) {
                    //                   this.tableTatalCal()
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

    .order_remark {
        /*        width: 600px;*/
        /*        display: flex;*/
        /*        align-items: center;*/
    }


    .order_remark_title {
        margin-bottom: 20px;
        font-size: 16px;
    }

    .basicinfo_other {
        margin-left: 80px;
    }

    .attchment {
        /*        margin-bottom: 60px;*/
    }

    .pro_button {
        margin-top: 10px;
    }

    .pro_table {
        margin-top: 10px;
        /*        padding-bottom: 60px;*/
    }

    .pro_title {
        font-size: 14px;
        height: 60px;
        line-height: 60px;
        border-bottom: 1px solid #ccc;
        padding: 0 15px;
    }

    .footer {
        width: 100%;
        height: 60px;
        background-color: white;
        position: fixed;
        z-index: 60;
        bottom: 0;
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

</style>
