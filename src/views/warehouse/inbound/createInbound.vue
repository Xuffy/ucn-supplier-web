<template>
    <div class="create-inbound" v-loading="loadingPage">
        <div class="title">
            {{$i.warehouse.basicInfo}}
        </div>
        <el-form ref="basicInfo" class="speForm" label-width="200px" :label-position="labelPosition">
            <el-row>
                <el-col class="speCol" v-for="v in $db.warehouse.inbound" v-if="v.belong==='basicInfo'" :key="v.key"
                        :xs="24" :sm="v.fullLine?24:8" :md="v.fullLine?24:8" :lg="v.fullLine?24:8"
                        :xl="v.fullLine?24:8">
                    <el-form-item :label="v.label" :required="v._rules?v._rules.required:false">
                        <div v-if="v.showType==='input'">
                            <el-input
                                    class="speInput"
                                    size="mini"
                                    :disabled="v.disabled"
                                    v-model="inboundData[v.key]"
                                    :placeholder="v.sysCreate?$i.warehouse.systemGeneration:$i.warehouse.pleaseInput"></el-input>
                        </div>
                        <div v-else-if="v.showType==='select'">
                            <el-select class="speInput" size="mini" v-model="inboundData[v.key]"
                                       :placeholder="$i.warehouse.pleaseChoose">
                                <el-option
                                        v-for="item in inboundTypeOption"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div v-else-if="v.showType==='textarea'">
                            <el-input
                                    class="speInput"
                                    type="textarea"
                                    :autosize="{ minRows: 2}"
                                    :placeholder="$i.warehouse.pleaseInput"
                                    v-model="inboundData[v.key]">
                            </el-input>
                        </div>
                        <div v-else-if="v.showType==='number'">
                            <v-input-number
                                    class="speInput"
                                    size="mini"
                                    v-model="inboundData[v.key]"
                                    :controls="false"
                                    :min="0"></v-input-number>
                        </div>
                        <div v-else-if="v.showType==='dropdown'">
                            <drop-down
                                    class="speInput"
                                    :list="dropData"
                                    :defaultProps="defaultProps"
                                    v-model="inboundData[v.key]"
                                    ref="dropDown"></drop-down>
                        </div>
                        <div v-else-if="v.showType==='timezone'">
                            <v-time-zone class="speInput" :value.sync="inboundData[v.key]"></v-time-zone>
                        </div>
                        <div v-else-if="v.showType==='date'">
                            <el-date-picker
                                    class="speInput"
                                    size="mini"
                                    v-model="inboundData[v.key]"
                                    align="right"
                                    type="date"
                                    :placeholder="$i.warehouse.pleaseChoose"
                                    :editable="false"
                                    :picker-options="pickerOptions1">
                            </el-date-picker>
                        </div>
                        <div v-else-if="v.showType==='attachment'">
                            <v-upload :limit="20" ref="attachmentUpload"></v-upload>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <div class="title">
            {{$i.warehouse.productInfo}}
        </div>
        <div class="btns">
            <el-button type="primary" :disabled="loadingProductTable" @click="addProduct">{{$i.warehouse.addProduct}}
            </el-button>
            <el-button @click="removeProduct" :disabled="selectOuterProductList.length===0" type="danger">
                {{$i.warehouse.removeProduct}}
            </el-button>
        </div>
        <v-filter-column
                class="gear"
                ref="filterColumn"
                code="uwarehouse_inbound_sku"
                :table-ref="() => $refs.tableBox"
                @change="changeColumn"></v-filter-column>
        <el-table
                v-loading="loadingProductTable"
                class="product-table"
                :data="productData"
                border
                ref="tableBox"
                show-summary
                :summary-method="getSummaries"
                @selection-change="changeProductChecked"
                style="width: 100%">
            <el-table-column
                    type="selection"
                    align="center"
                    fixed="left"
                    class="table-checkbox"
                    width="55">
            </el-table-column>
            <el-table-column
                    v-for="v in columnConfig"
                    :class-name="v.must ? 'ucn-table-required' : ''"
                    v-if="!v._hidden && !v._hide"
                    :key="v.key"
                    :label="$i.warehouse[v.key]"
                    :prop="v.key"
                    :label-class-name="'location-' + v.key"
                    align="center"
                    width="180">
                <template slot-scope="scope">
                    <div v-if="v.showType==='input'">
                        <el-input
                                :placeholder="$i.warehouse.pleaseInput"
                                v-model="scope.row[v.key].value"
                                clearable>
                        </el-input>
                    </div>
                    <div v-else-if="v.showType==='number'">
                        <v-input-number
                                :disabled="v.computed"
                                v-model="scope.row[v.key].value"
                                @blur="handleBlur(v.key,scope.$index)"
                                :mark="v.label"
                                :accuracy="v.accuracy ? v.accuracy : null"
                                :controls="false"></v-input-number>
                    </div>
                    <div v-else-if="v.key==='unqualifiedType'"></div>
                    <div v-else>
                        {{scope.row[v.key].value}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                    fixed="right"
                    :label="$i.warehouse.action"
                    align="center"
                    width="100">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">{{$i.warehouse.detail}}
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="footBtn">
            <el-button :loading="disabledSubmit" @click="submit" type="primary">{{$i.warehouse.submit}}</el-button>
            <el-button @click="cancel">{{$i.warehouse.cancel}}</el-button>
        </div>

        <el-dialog
                :title="$i.warehouse.addProduct"
                :visible.sync="addOrderDialogVisible"
                width="70%">
            <el-form :modal="orderProduct" ref="orderProduct" label-width="95px" :label-position="labelPosition">
                <el-row>
                    <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                        <el-form-item prop="orderNo" :label="$i.warehouse.orderNo">
                            <el-input :placeholder="$i.warehouse.pleaseInput" size="mini" class="speInput"
                                      v-model="orderProduct.orderNo"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                        <el-form-item prop="skuCode" :label="$i.warehouse.skuCode">
                            <el-input :placeholder="$i.warehouse.pleaseInput" size="mini" class="speInput"
                                      v-model="orderProduct.skuCode"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                        <el-form-item prop="skuNameCn" :label="$i.warehouse.skuNameCn">
                            <el-input :placeholder="$i.warehouse.pleaseInput" size="mini" class="speInput"
                                      v-model="orderProduct.skuNameCn"></el-input>
                        </el-form-item>
                    </el-col>
                    <!-- <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                        <el-form-item prop="skuBarCode" :label="$i.warehouse.skuBarCode">
                            <el-input :placeholder="$i.warehouse.pleaseInput" size="mini" class="speInput"
                                      v-model="orderProduct.skuBarCode"></el-input>
                        </el-form-item>
                    </el-col> -->
                </el-row>
            </el-form>
            <div class="search-btn">
                <el-button :disabled="disabledSearch" :loading="disabledClickSubmit" @click="searchOrderData"
                           type="primary">{{$i.warehouse.search}}
                </el-button>
                <el-button :disabled="disabledCancelSearch" @click="clearSearchData">{{$i.warehouse.clear}}</el-button>
            </div>
            <v-table
                    code="uwarehouse_inbound_sku"
                    :height="500"
                    v-loading="loadingTable"
                    :data="tableDataList"
                    @change-checked="changeChecked"
                    @change-sort="val=>{getProductData(val)}"></v-table>
            <v-pagination
                    :page-sizes="[50,100,200,500]"
                    @size-change="changeSize"
                    @change="changePage"
                    :page-data="pageData"></v-pagination>
            <div slot="footer" class="dialog-footer">
                <el-button :disabled="disabledSearch" type="primary" @click="postData">{{$i.warehouse.sure}}</el-button>
                <el-button :disabled="disabledCancelSearch" @click="closeDialog">{{$i.warehouse.cancel}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

    import { VTimeZone, VTable, VUpload, VPagination, VFilterColumn, VInputNumber } from "@/components/index";

    export default {
        name: "createInbound",
        components: {
            VTable,
            VTimeZone,
            VUpload,
            VPagination,
            VFilterColumn,
            VInputNumber
        },
        data() {
            return {
                /**
                 * 页面基础配置
                 * */
                labelPosition: "right",
                disabledSubmit: false,
                orderNoOption: [],
                pickerOptions1: {},
                addOrderDialogVisible: false,
                productTableData: [],
                selectProductList: [],
                loadingProductTable: false,
                inboundTypeOption: [],
                pageData: {},
                loadingPage: false,
                code: "",
                columnConfig: "",

                /**
                 * 外部展示数据
                 * */
                productIds: [],                  //用于存储用于外部展示的产品ID
                productData: [],                 //添加到外部用于展示的产品详细信息
                inboundData: {
                    inboundNo: "",       //新建的时候不传
                    inboundDate: "",
                    // warehouseNo: "",
                    warehouseName: "",
                    inboundTypeDictCode: "",
                    warehouseManager: "",
                    remark: "",
                    purchaser: "",
                    carrier: "",
                    carrierPhone: "",
                    timeZone: "",
                    attachments: [],
                    inboundSkuBeanCreateParams: [],      //新增的产品数组
                    //新增的产品总计
                    skuTotalCartonQty: 0,
                    skuTotalGrossWeight: 0,
                    skuTotalNetWeight: 0,
                    skuTotalQty: 0,
                    skuTotalVolume: 0
                },
                selectOuterProductList: [],
                /**
                 * 弹出框数据
                 * */
                selectList: [],
                loadingTable: false,
                tableDataList: [],           //弹出框表格数据

                //btns禁用状态
                disabledSearch: true,
                disabledCancelSearch: true,
                disabledClickSubmit: false,

                //add order product搜索数据
                orderProduct: {
                    orderNo: "",
                    pn: 1,
                    ps: 50,
                    skuCode: "",
                    skuBarCode: "",
                    skuNameCn: ""
                },

                //字典
                skuUnitOption: [],
                lengthUnitOption: [],
                volumeUnitOption: [],
                weightUnitOption: []
            };
        },
        methods: {
            getInboudNo() {
                this.loadingPage = true;
                this.$ajax.post(this.$apis.GET_WAREHOUSE_NO, {
                    type: "inbound_no"
                }).then(res => {
                    this.getUnit();
                    this.inboundData.inboundNo = res.content;
                }).catch(err => {
                    this.loadingPage = false;
                });
            },
            addProduct() {
                //先把在外部的数据的id取出来，拿到内部去对比
                this.selectList = [];
                this.addOrderDialogVisible = true;
                this.getProductData();
            },
            getProductData(e) {
                Object.assign(this.orderProduct, e)
                this.loadingTable = true;
                this.disabledSearch = true;
                this.disabledCancelSearch = true;
                //请求弹出框数据
                this.$ajax.post(this.$apis.get_productInfo, this.orderProduct).then(res => {
                    this.orderNoOption = [];
                    _.uniq(_.pluck(res.datas, "orderNo")).forEach((v, k) => {
                        this.orderNoOption.push({
                            id: k + 1,
                            value: v,
                            label: v
                        });
                    });
                    let arr = []
                    _.each(res.datas, v => {
                        v.customerSkuCode = v.skuCustomerSkuCode
                        arr.push(v)
                    })
                    this.tableDataList = this.$getDB(this.$db.warehouse.inboundOrderTable, arr);
                    /**
                     * 每次打开弹窗时进行置灰判断
                     * */
                    this.tableDataList.forEach(v => {
                        if (v.skuId.value === 0) {  //id为0的是脏数据，不能选
                            this.$set(v, "_disabled", true);
                        } else {
                            this.productData.forEach(m => {
                                if (v.skuId.value === m.skuId.value && m.orderNo.value === v.orderNo.value) {
                                    this.$set(v, "_disabled", true);
                                    this.$set(v, "_checked", true);
                                }
                            });
                        }
                    });
                    this.pageData = res;
                }).finally(() => {
                    this.disabledSearch = false;
                    this.disabledCancelSearch = false;
                    this.loadingTable = false;
                });
            },
            removeProduct() {
                this.$confirm(this.$i.warehouse.sureRemove, this.$i.warehouse.prompt, {
                    confirmButtonText: this.$i.warehouse.sure,
                    cancelButtonText: this.$i.warehouse.cancel,
                    type: "warning"
                }).then(() => {
                    this.productData = _.difference(this.productData, this.selectOuterProductList);
                    this.$message({
                        type: "success",
                        message: this.$i.warehouse.removeSuccess
                    });
                }).catch(() => {
                });
            },
            submit() {
                if (this.$validateForm(this.inboundData, this.$db.warehouse.inbound)) {
                    return;
                }
                if (this.productData.length === 0) {
                    return this.$message({
                        message: this.$i.warehouse.pleaseAddProduct,
                        type: "warning"
                    });
                }
                this.inboundData.inboundSkuBeanCreateParams=[];
                let productData=this.$depthClone(this.productData);
                productData.forEach(v => {
                    _.map(this.skuUnitOption, data => {
                        if (v.skuUnitDictCode.value === data.name) {
                            v.skuUnitDictCode.value = data.code;
                        }
                    });
                    _.map(this.lengthUnitOption, data => {
                        if (v.lengthUnitDictCode.value === data.name) {
                            v.lengthUnitDictCode.value = data.code;
                        }
                    });
                    _.map(this.volumeUnitOption, data => {
                        if (v.volumeUnitDictCode.value === data.name) {
                            v.volumeUnitDictCode.value = data.code;
                        }
                    });
                    _.map(this.weightUnitOption, data => {
                        if (v.weightUnitDictCode.value === data.name) {
                            v.weightUnitDictCode.value = data.code;
                        }
                    });
                    let obj={};
                    for(let key in v){
                        obj[key]=v[key].value;
                    }
                    this.inboundData.inboundSkuBeanCreateParams.push(obj);
                });
                for (let i = 0; i < this.inboundData.inboundSkuBeanCreateParams.length; i++) {
                    if (this.$validateForm(this.inboundData.inboundSkuBeanCreateParams[i], this.$db.warehouse.inboundOrderProductTable)) {
                        return;
                    }
                }
                this.inboundData.attachments = this.$refs.attachmentUpload[0].getFiles();
                this.disabledSubmit = true;
                this.$ajax.post(this.$apis.add_inbound, this.inboundData).then(res => {
                    this.$message({
                        message: this.$i.warehouse.submitSuccess,
                        type: "success"
                    });
                    this.$router.push("/warehouse/inbound");
                }).finally(() => {
                    this.disabledSubmit = false;
                });
            },
            cancel() {
                window.close();
            },
            changeProductChecked(e) {
                this.selectOuterProductList = e;
            },
            getSummaries(param) {
                const { columns, data } = param;
                let obj = {};
                let keys = ["inboundSkuTotalQty", "inboundOutCartonTotalQty", "inboundSkuTotalVolume", "inboundSkuTotalNetWeight", "inboundSkuTotalGrossWeight"];
                _.map(keys, val => {
                    let a = _.pluck(_.pluck(data, val), "value");
                    obj[val] = _.reduce(_.compact(a), (memo, num) => Number(memo) + Number(num), 0);
                });
                let sums=_.map(_.pluck(columns, "property"), val => !_.isUndefined(obj[val]) ? obj[val] : '');
                sums[0]= this.$i.warehouse.total;
                return sums;
            },

            /**
             * 弹出框事件
             * */
            searchOrderData() {
                this.loadingTable = true;
                this.disabledClickSubmit = true;
                this.$ajax.post(this.$apis.get_productInfo, this.orderProduct).then(res => {
                    this.tableDataList = this.$getDB(this.$db.warehouse.inboundOrderTable, res.datas);
                    /**
                     * 每次搜索时进行置灰判断
                     * */
                    this.tableDataList.forEach(v => {
                        if (v.skuId.value === 0) {  //id为0的是脏数据，不能选
                            this.$set(v, "_disabled", true);
                        } else {
                            this.productData.forEach(m => {
                                if (v.skuId.value === m.skuId.value) {
                                    this.$set(v, "_disabled", true);
                                    this.$set(v, "_checked", true);
                                }
                            });
                        }
                    });
                    this.pageData = res;
                }).finally(err => {
                    this.loadingTable = false;
                    this.disabledClickSubmit = false;
                });
            },
            clearSearchData() {
                this.orderProduct.orderNo = "";
                this.orderProduct.skuCode = "";
                this.orderProduct.skuBarCode = "";
                this.orderProduct.skuNameCn = "";
            },
            changeChecked(e) {
                this.selectList = _.filter(e, (val) => {
                    return !val._disabled;
                });
            },
            postData() {
                this.productIds = [];
                let arr = this.$copyArr(this.selectList);
                let orderNos = [];
                arr.forEach(v => {
                    if (v._checked && !v._disabled && v.skuId.value !== 0) {
                        v._checked = false;
                        v._disabled = false;
                        this.productIds.push(v.id.value);
                        orderNos.push(v.orderNo.value);
                    }
                });
                if (this.productIds.length !== 0) {
                    //表示有新增产品
                    this.loadingProductTable = true;
                    this.$ajax.post(this.$apis.get_orderSku, { ids: this.productIds }).then(res => {
                        let arr = [];
                        let oldData = _.clone(this.productData)
                        _.map(res, v => {
                            _.map(v.skuList, e => {
                                e.unqualifiedType='';
                                e.innerCartonVolume=e.skuInnerCartonVolume;
                                e.innerCartonNetWeight=e.skuInnerCartonWeightNet;
                                e.innerCartonPackingMethodCn=e.skuInnerCartonMethodCn;
                                e.innerCartonWidth=e.skuInnerCartonWidth;
                                e.innerCartonGrossWeight=e.skuInnerCartonRoughWeight;
                                e.innerCartonLength=e.skuInnerCartonLength;
                                e.innerCartonHeight=e.skuInnerCartonHeight;
                                e.packingMethodCn=e.skuMethodPkgCn;
                                e.supplierName=e.skuSupplierName;
                                e.supplierNo=e.skuSupplierCode;
                                e.supplierId=e.skuSupplierId;
                                e.supplierOrderNo=v.supplierOrderNo;
                                e.inboundSkuTotalVolume=null;       //计算
                                e.inboundSkuTotalNetWeight=null;    //计算
                                e.inboundSkuTotalQty=null;          //计算
                                e.inboundSkuTotalGrossWeight=null;  //计算
                                e.inboundOutCartonTotalQty=null;    //填写
                                e.orderSkuQty=e.skuQty;
                                e.outerCartonSkuQty=e.skuOuterCartonQty;
                                e.outerCartonVolume=e.skuOuterCartonVolume;
                                e.outerCartonNetWeight=e.skuOuterCartonNetWeight;
                                e.outerCartonGrossWeight=e.skuOuterCartonRoughWeight;
                                e.customerName=v.customerName;
                                e.customerNo=v.customerNo;
                                e.customerOrderNo=v.customerOrderNo;
                                e.customerSkuCode=e.skuCustomerSkuCode;
                                e.factorySkuCode='';        //填写
                                e.volumeUnitDictCode=e.skuUnitVolume?(_.findWhere(this.volumeUnitOption, { code: String(e.skuUnitVolume) }) || {}).name:'';
                                e.skuUnitDictCode=e.skuUnit?(_.findWhere(this.skuUnitOption, { code: String(e.skuUnit) }) || {}).name:'';
                                e.weightUnitDictCode=e.skuUnitWeight?(_.findWhere(this.weightUnitOption, { code: String(e.skuUnitWeight) }) || {}).name:'';
                                e.lengthUnitDictCode=e.skuUnitLength?(_.findWhere(this.lengthUnitOption, { code: String(e.skuUnitLength) }) || {}).name:'';
                                arr.push(e);
                            });
                        });
                        arr = this.$getDB(this.$db.warehouse.inboundOrderProductTable, arr);
                        _.each(arr, e => {
                            let flag = true
                            _.each(oldData, v => {
                                console.log(e)
                                if (e.id.value === v.id.value) {
                                    flag = false
                                }
                            })
                            if (flag) {
                                oldData.push(e)
                            }
                        })
                        this.$refs.filterColumn.update(false, oldData).then(data => {
                            this.productData = this.$refs.filterColumn.getFilterData(oldData, data);
                            this.columnConfig = this.productData[0];
                        });
                    }).finally(() => {
                        this.loadingProductTable = false;
                    });
                }
                this.clearSearchData();
                this.addOrderDialogVisible = false;
            },
            closeDialog() {
                this.addOrderDialogVisible = false;
                this.clearSearchData();
            },
            changeColumn(val) {
                this.productData = this.$refs.filterColumn.getFilterData(this.productData, val);
                this.columnConfig = this.productData[0];
            },

            /**
             * 分页操作
             * */
            changePage(e) {
                this.orderProduct.pn = e;
                this.getProductData();
            },
            changeSize(e) {
                this.orderProduct.ps = e;
                this.getProductData();
            },

            /**
             * 页面表格事件
             * */
            handleBlur(e, index) {
                // 外箱产品数
                let outerCartonSkuQty = this.productData[index]['outerCartonSkuQty'].value ? this.productData[index]['outerCartonSkuQty'].value : 0
                // 入库箱数
                let inboundOutCartonTotalQty = this.productData[index]['inboundOutCartonTotalQty'].value ? this.productData[index]['inboundOutCartonTotalQty'].value : 0
                // 外箱净重
                let outerCartonNetWeight = this.productData[index]["outerCartonNetWeight"].value ? this.productData[index]["outerCartonNetWeight"].value : 0
                // 外箱毛重
                let outerCartonGrossWeight = this.productData[index]["outerCartonGrossWeight"].value ? this.productData[index]["outerCartonGrossWeight"].value : 0
                // 外箱体积
                let outerCartonVolume = this.productData[index]["outerCartonVolume"].value ? this.productData[index]["outerCartonVolume"].value : 0
                if (e === 'outerCartonSkuQty') {
                    // 计算入库数量
                    this.productData[index].inboundSkuTotalQty.value = this.$calc.multiply(outerCartonSkuQty, inboundOutCartonTotalQty)
                } else if (e === "inboundOutCartonTotalQty") {
                    // 计算入库数量
                    this.productData[index].inboundSkuTotalQty.value = this.$calc.multiply(outerCartonSkuQty, inboundOutCartonTotalQty)
                    // 计算入库外箱总净重
                    this.productData[index].inboundSkuTotalNetWeight.value = this.$calc.multiply(outerCartonNetWeight, inboundOutCartonTotalQty)
                    // 计算入库外箱总毛重
                    this.productData[index].inboundSkuTotalGrossWeight.value = this.$calc.multiply(outerCartonGrossWeight, inboundOutCartonTotalQty)
                    // 计算入库外箱总体积
                    this.productData[index].inboundSkuTotalVolume.value = this.$calc.multiply(outerCartonVolume, inboundOutCartonTotalQty)
                } else if (e === "outerCartonVolume") {
                    // 计算入库外箱总体积
                    this.productData[index].inboundSkuTotalVolume.value = this.$calc.multiply(outerCartonVolume, inboundOutCartonTotalQty)
                } else if (e === "outerCartonGrossWeight") {
                    // 计算入库外箱总毛重
                    this.productData[index].inboundSkuTotalGrossWeight.value = this.$calc.multiply(outerCartonGrossWeight, inboundOutCartonTotalQty)
                } else if (e === "outerCartonNetWeight") {
                    // 计算入库外箱总净重
                    this.productData[index].inboundSkuTotalNetWeight.value = this.$calc.multiply(outerCartonNetWeight, inboundOutCartonTotalQty)
                }
            },
            handleClick(e) {
                console.log(e,'e')
                this.$windowOpen({
                    url: "/product/detail",
                    params: {
                        id: e.skuId.value
                    }
                });
            },

            /**
             * 获取字典
             * */
            getUnit() {
                this.$ajax.post(this.$apis.get_partUnit, ["IBD_TYPE", "SKU_UNIT", "WT_UNIT", "LH_UNIT", "VE_UNIT"], { cache: true }).then(res => {
                    res.forEach(v => {
                        if (v.code === "IBD_TYPE") {
                            this.inboundTypeOption = v.codes;
                        } else if (v.code === "SKU_UNIT") {
                            this.skuUnitOption = v.codes;
                        } else if (v.code === "WT_UNIT") {
                            this.weightUnitOption = v.codes;
                        } else if (v.code === "LH_UNIT") {
                            this.lengthUnitOption = v.codes;
                        } else if (v.code === "VE_UNIT") {
                            this.volumeUnitOption = v.codes;
                        }
                    });
                }).finally(() => {
                    this.loadingPage = false;
                });
            }
        },
        created() {
            this.getInboudNo();
        },
        mounted() {
            this.columnConfig = this.$db.warehouse.inboundOrderProductTable;
        },
        watch: {}
    };
</script>

<style scoped>
    .title {
        font-weight: bold;
        font-size: 16px;
        height: 32px;
        line-height: 32px;
        color: #666666;
    }

    .btns {
        margin-top: 5px;
    }

    .speInput {
        width: 80%;
        max-width: 1000px !important;
    }

    .speInput >>> .el-select {
        display: block;
    }

    .search-btn {
        text-align: center;
    }

    .total {
        margin-top: 80px;
    }

    .product-table {
        margin-top: 10px;
    }

    .product-table >>> .el-checkbox {
        margin: 0;
    }

    .gear{
        float: right;
        margin-right: 5px;
        margin-bottom: 5px;
    }

    .footer {
        background-color: #ffffff;
        position: fixed;
        bottom: 0;
        /*width: 100%;*/
        padding: 10px;
    }

    .footBtn {
        border-top: 1px solid #e0e0e0;
        height: 40px;
        line-height: 40px;
        background-color: #ffffff;
        position: sticky;
        left: 0;
        bottom: 0;
        width: 100%;
        z-index: 5;
    }

    .dialog-footer {
        text-align: center;
    }


</style>
