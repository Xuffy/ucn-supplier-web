<template>
    <div class="create-inbound" v-loading="loadingPage">
        <div class="title">
            {{$i.warehouse.basicInfo}}
        </div>
        <el-form class="speForm" label-width="200px" :label-position="labelPosition">
            <el-row>
                <el-col class="speCol"
                        v-for="v in $db.warehouse.outbound"
                        v-if="v.belong==='basicInfo' && v.showType!=='timeZone'"
                        :key="v.key"
                        :xs="24"
                        :sm="v.fullLine?24:8"
                        :md="v.fullLine?24:8"
                        :lg="v.fullLine?24:8"
                        :xl="v.fullLine?24:8">
                    <el-form-item :label="v.label" :required="v._rules?v._rules.required:false">
                        <div v-if="v.showType==='input'">
                            <el-input
                                    class="speInput"
                                    size="mini"
                                    :disabled="v.disabled"
                                    v-model="outboundData[v.key]"
                                    :placeholder="v.sysCreate?$i.warehouse.sysGenerate:$i.warehouse.pleaseInput"></el-input>
                        </div>
                        <div v-else-if="v.showType==='select'">
                            <el-select class="speInput" size="mini" v-model="outboundData[v.key]"
                                       :placeholder="$i.warehouse.pleaseChoose">
                                <el-option
                                        v-for="item in outboundTypeOption"
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
                                    placeholder="please input"
                                    v-model="outboundData[v.key]">
                            </el-input>
                        </div>
                        <div v-else-if="v.showType==='number'">
                            <el-input-number
                                    class="speInput"
                                    size="mini"
                                    v-model="outboundData[v.key]"
                                    :controls="false"
                                    :min="0"
                                    label="please input"></el-input-number>
                        </div>
                        <div v-else-if="v.showType==='dropdown'">
                            <drop-down
                                    class="speInput"
                                    :list="dropData"
                                    :defaultProps="defaultProps"
                                    v-model="outboundData[v.key]"
                                    ref="dropDown"></drop-down>
                        </div>
                        <div v-else-if="v.isAttachment">
                            <v-upload :limit="20" ref="attachmentUpload"></v-upload>
                        </div>
                        <div v-else-if="v.showType==='date'">
                            <el-date-picker
                                    class="speInput"
                                    size="mini"
                                    :editable="false"
                                    v-model="outboundData[v.key]"
                                    align="right"
                                    type="date"
                                    :placeholder="$i.warehouse.pleaseChoose"
                                    :picker-options="pickerOptions1">
                            </el-date-picker>
                        </div>
                        <div v-else-if="v.showType==='timeZone'">
                            <v-time-zone class="speInput" :value.sync="outboundData.timeZone"></v-time-zone>
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
            <el-button @click="removeProduct" :disabled="disableRemoveProduct" type="danger">
                {{$i.warehouse.removeProduct}}
            </el-button>
        </div>
        <div class="gear">
                <v-filter-column
                    ref="filterColumn"
                    code="uwarehouse_outbound_sku"
                    :table-ref="() => $refs.tableBox"
                    @change="changeColumn">
                </v-filter-column>
            </div>
        <el-table
                v-loading="loadingProductTable"
                class="product-table"
                :data="productData"
                border
                ref="tableBox"
                @selection-change="changeProductChecked"
                show-summary
                :summary-method="getSummaries"
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
                    :key="v.key"
                    :prop="v.key"
                    :label="$i.warehouse[v.key]"
                    :class-name="v._rules &&  v._rules.required ? 'ucn-table-required' : ''"
                    align="center"
                    :label-class-name="'location-' + v.key"
                    v-if="!v._hidden && !v._hide"
                    :width="v.key === 'skuNameCustomer' ? '250' : '180'"
                    :sortable="v.sortable">
                <template slot-scope="scope" v-if="scope.row[v.key]">
                    <div v-if="v.showType==='number'">
                        <!-- <el-input-number
                                @blur="handleBlur(v,scope.row[v.key].value,scope.$index)"
                                :disabled="v.computed"
                                v-model="scope.row[v.key].value"
                                :min="0"
                                :controls="false"></el-input-number> -->
                        <!-- @blur="handleBlur(v,scope.row[v.key].value,scope.$index)" -->
                        <v-input-number
                            @blur="handleBlur(v,scope.row,scope.row[v.key].value)"
                            :disabled="v.computed"
                            v-model="scope.row[v.key].value"
                            :min="0"
                            :mark="v.label"
                            :accuracy="v.accuracy ? v.accuracy : null"
                            :controls="false"></v-input-number>
                    </div>
                    <!-- <div v-else-if="v.key==='inboundDate' || v.key==='warehouseName' || v.key==='warehouseNo'">
                        {{scope.row.inboundVo[v.key].value}}
                    </div> -->
                    <!-- <div v-else-if="v.showType==='select'"> -->
                        <!-- <el-select v-model="scope.row[v.key].value" placeholder="请选择">
                            <el-option
                            v-for="item in v.options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select> -->
                    <!-- </div> -->
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
            <el-button :loading="disabledSubmit" :disabled="loadingProductTable" @click="submit" type="primary">
                {{$i.warehouse.submit}}
            </el-button>
            <el-button @click="cancel">{{$i.warehouse.cancel}}</el-button>
        </div>

        <el-dialog
                :title="$i.warehouse.addProduct"
                :visible.sync="addOrderDialogVisible"
                width="70%">
            <el-form :modal="orderProduct" ref="orderProduct" label-width="120px" :label-position="labelPosition">
                <el-row>
                    <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item prop="orderNo" :label="$i.warehouse.orderNo">
                            <el-input
                                    :placeholder="$i.warehouse.pleaseInput"
                                    size="mini"
                                    class="speInput"
                                    v-model="orderProduct.orderNo"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item prop="skuCode" :label="$i.warehouse.skuCode">
                            <el-input
                                    :placeholder="$i.warehouse.pleaseInput"
                                    size="mini"
                                    class="speInput"
                                    v-model="orderProduct.skuCode"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item prop="skuNameCn" :label="$i.warehouse.skuNameCn">
                            <el-input
                                    :placeholder="$i.warehouse.pleaseInput"
                                    size="mini"
                                    class="speInput"
                                    v-model="orderProduct.skuNameCn"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item prop="skuBarCode" :label="$i.warehouse.skuBarCode">
                            <el-input :placeholder="$i.warehouse.pleaseInput" size="mini" class="speInput"
                                      v-model="orderProduct.skuBarCode"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item prop="inboundNo" :label="$i.warehouse.inboundNo">
                            <el-input :placeholder="$i.warehouse.pleaseInput" size="mini" class="speInput"
                                      v-model="orderProduct.inboundNo"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div class="search-btn">
                <el-button :disabled="disabledSearch" :loading="disabledClickSubmit" @click="searchOrderData"
                           type="primary">{{$i.warehouse.search}}
                </el-button>
                <el-button :disabled="disabledCancelSearch" @click="clearSearchData">{{$i.warehouse.clear}}</el-button>
            </div>
            <v-table
                    code="uwarehouse_outbound_sku"
                    v-loading="loadingTable"
                    :data="tableDataList"
                    @change-checked="changeChecked"></v-table>
            <page
                    @size-change="changeSize"
                    @change="changePage"
                    :page-sizes="[50,100,200,500]"
                    :page-data="pageData"></page>

            <div slot="footer" class="dialog-footer">
                <el-button :disabled="disabledSearch" type="primary" @click="postData">{{$i.warehouse.sure}}</el-button>
                <el-button :disabled="disabledCancelSearch" @click="addOrderDialogVisible = false">
                    {{$i.warehouse.cancel}}
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

    import { VTimeZone, VUpload, VTable, VPagination, VFilterColumn,VInputNumber } from "@/components/index";
    import Math from "mathjs";

    export default {
        name: "createInbound",
        components: {
            VTable,
            VTimeZone,
            VUpload,
            page: VPagination,
            VFilterColumn,
            VInputNumber
        },
        data() {
            return {
                /**
                 * 页面基础配置
                 * */
                pageData: {},
                labelPosition: "right",
                disableRemoveProduct: true,
                disabledSubmit: false,
                pickerOptions1: {
                    // disabledDate(time) {
                    //     return time.getTime() > Date.now();
                    // },
                },
                addOrderDialogVisible: false,
                productTableData: [],
                selectProductList: [],
                loadingProductTable: false,
                outboundTypeOption: [],
                loadingPage:false,

                /**
                 * 外部展示数据
                 * */
                productIds: [],                  //用于存储用于外部展示的产品ID
                productData: [],                 //添加到外部用于展示的产品详细信息
                timeZone: "",                    //时区
                outboundData: {
                    attachments: [],
                    outboundOperator: "",
                    outboundDate: "",
                    outboundSkuCreateParams: [
                        // {
                        //     inboundSkuId: 1,
                        //     inventoryServiceFee: 10,
                        //     inventorySkuPrice: 10,
                        //     outboundOutCartonTotalQty: 10
                        // }
                    ],
                    outboundSkuTotalQty: 0,
                    outboundTypeDictCode: "",
                    remark: "",
                    shipmentInvoiceNo: ""
                    // timeZone: "",
                },
                //inbound总计
                outboundSummary: {
                    totalCartonQty: 0,
                    totalGrossWeight: 0,
                    totalVolume: 0,
                    totalNetWeight: 0,
                    totalSkuQty: 0
                },
                /**
                 * 弹出框数据
                 * */
                orderNoOption: [],
                selectList: [],
                loadingTable: false,
                tableDataList: [],           //弹出框表格数据

                //btns禁用状态
                disabledSearch: true,
                disabledCancelSearch: true,
                disabledClickSubmit: false,

                //add order product搜索数据
                orderProduct: {
                    pn: 1,
                    ps: 50,
                    inboundNo: "",
                    orderNo: "",
                    skuBarCode: "",
                    skuCode: "",        //供应商货号
                    skuNameCn: ""
                },

                skuUnitOption: [],
              lengthUnitOption:[],
              volumeUnitOption:[],
              weightUnitOption:[],
              columnConfig: ''
            };
        },
        methods: {
            changeColumn(val) {
                this.productData = this.$refs.filterColumn.getFilterData(this.productData, val);
                this.columnConfig = this.productData[0];
            },
            getOutboundNo(){
                this.loadingPage=true;
                this.$ajax.post(this.$apis.GET_WAREHOUSE_NO,{
                    type:'outbound_no'
                }).then(res=>{
                    this.getUnit();
                    this.outboundData.outboundNo=res.content;
                }).catch(err=>{
                    this.loadingPage=false;
                })
            },
            addProduct() {
                //先把在外部的数据的id取出来，拿到内部去对比
                this.selectList = [];
                this.addOrderDialogVisible = true;
                this.loadingTable = true;
                this.disabledSearch = true;
                this.disabledCancelSearch = true;
                this.getProductData();
            },
            getProductData() {
                this.$ajax.post(this.$apis.get_inboundSku, this.orderProduct).then(res => {
                    this.orderNoOption = [];
                    // console.log(res.datas)
                    _.uniq(_.pluck(res.datas, "orderNo")).forEach((v, k) => {
                        this.orderNoOption.push({
                            id: k + 1,
                            value: v,
                            label: v
                        });
                    });
                    this.tableDataList = this.$getDB(this.$db.warehouse.outboundOrderTable, res.datas, e => {
                        this.productData.forEach(v => {
                            if (e.id.value === v.id.value) {
                                this.$set(e, "_disabled", true);
                                this.$set(e, "_checked", true);
                            }
                        });
                    });
                    this.pageData = res;
                    this.disabledSearch = false;
                    this.disabledCancelSearch = false;
                    this.loadingTable = false;
                }).catch(err => {
                    this.disabledSearch = false;
                    this.disabledCancelSearch = false;
                    this.loadingTable = false;
                });
            },
            removeProduct() {
                this.$confirm("确定移除产品?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    this.productData = _.difference(this.productData, this.selectProductList);
                    this.disableRemoveProduct = true;
                    this.$message({
                        type: "success",
                        message: "移除成功!"
                    });
                }).catch(() => {
                });
            },
            changeProductChecked(e) {
                this.selectProductList = e;
            },
            submit() {
                if (this.$validateForm(this.outboundData, this.$db.warehouse.outbound)) {
                    return;
                }

                if (_.isEmpty(this.productData)) {
                    return this.$message.warning(this.$i.warehouse.pleaseAddProduct);
                }

                for (let i = 0; i < this.productData.length; i++) {
                    if (this.$validateForm(this.productData[i].outboundOutCartonTotalQty, this.$db.warehouse.outboundProduct)) {
                        return;
                    }
                }
                this.outboundData.outboundSkuCreateParams = [];
                this.productData.forEach(v => {
                    this.outboundData.outboundSkuCreateParams.push({
                        inboundSkuId: v.id.value,
                        inventoryServiceFee: v.inventoryServiceFee.value ? v.inventoryServiceFee.value : 0,
                        inventorySkuPrice: v.inventorySkuPrice.value ? v.inventorySkuPrice.value : 0,
                        outboundOutCartonTotalQty: v.outboundOutCartonTotalQty.value ? v.outboundOutCartonTotalQty.value : 0
                    });
                });
                this.outboundData.attachments = this.$refs.attachmentUpload[0].getFiles();
                this.disabledSubmit = true;
                this.$ajax.post(this.$apis.add_outbound, this.outboundData).then(res => {
                    this.disabledSubmit = false;
                    this.$message({
                        message: this.$i.warehouse.submitSuccess,
                        type: "success"
                    });
                    this.$router.push("/warehouse/outbound");
                }).catch(err => {
                    this.disabledSubmit = false;
                });
            },
            cancel() {
                window.close();
            },

            /**
             * 弹出框事件
             * */
            searchOrderData() {
                this.loadingTable = true;
                this.disabledClickSubmit = true;
                this.$ajax.post(this.$apis.get_inboundSku, this.orderProduct).then(res => {
                    this.tableDataList = this.$getDB(this.$db.warehouse.outboundOrderTable, res.datas, e => {
                        this.productData.forEach(v => {
                            if (e.id.value === v.id) {
                                this.$set(e, "_disabled", true);
                                this.$set(e, "_checked", true);
                            }
                        });
                    });
                    this.loadingTable = false;
                    this.disabledClickSubmit = false;
                }).catch(err => {
                    this.loadingTable = false;
                    this.disabledClickSubmit = false;
                });
            },
            clearSearchData() {
                this.orderProduct.inboundNo = "";
                this.orderProduct.orderNo = "";
                this.orderProduct.skuBarCode = "";
                this.orderProduct.skuCode = "";
                this.orderProduct.skuNameCn = "";
            },
            changeChecked(e) {
                this.selectList = e;
            },
            postData() {
                let id = [];
                id = _.uniq(_.pluck(_.pluck(this.selectList,'id'),'value'));
                if (id.length) {
                    this.loadingProductTable = true;
                    this.$ajax.post(this.$apis.get_outboundProductData, {
                        ids: id
                    }).then(res => {
                        let arr = []
                        this.productData = []
                        res.datas.forEach(v => {
                            v.outboundOutCartonTotalQty = 0;
                            v.outboundSkuTotalGrossWeight = 0;
                            v.outboundSkuTotalNetWeight = 0;
                            v.outboundSkuTotalQty = 0;
                            v.outboundSkuTotalVolume = 0;
                            this.productData.push(v);
                        });
                        this.productData.forEach(v => {
                            let obj = {}
                            v.inboundVo.inboundDate = this.$dateFormat(v.inboundVo.inboundDate, "yyyy-mm-dd");
                            v.skuUnitDictCode = v.skuUnitDictCode ? _.findWhere(this.skuUnitOption, { code: v.skuUnitDictCode }).name : "";
                            v.lengthUnitDictCode=v.lengthUnitDictCode?_.findWhere(this.lengthUnitOption,{code:String(v.lengthUnitDictCode)}).name:'';
                            v.volumeUnitDictCode=v.volumeUnitDictCode?_.findWhere(this.volumeUnitOption,{code:String(v.volumeUnitDictCode)}).name:'';
                            v.weightUnitDictCode=v.weightUnitDictCode?_.findWhere(this.weightUnitOption,{code:String(v.weightUnitDictCode)}).name:'';
                            obj.warehouseNo = v.inboundVo.warehouseNo;
                            obj.warehouseName = v.inboundVo.warehouseName;
                            obj.inboundDate = v.inboundVo.inboundDate;
                            obj.inventorySkuPrice = 0;
                            obj.inventoryDays = 0;
                            obj.inventoryServiceFee = 0;
                            arr.push(Object.assign(obj, v))
                        });
                        this.loadingProductTable = false;
                        arr = this.$getDB(this.$db.warehouse.outboundProduct, arr);
                        this.$refs.filterColumn.update(false, arr).then(data => {
                            this.productData = this.$refs.filterColumn.getFilterData(arr, data);
                            this.columnConfig = this.productData[0];
                        });
                    }).catch(err => {
                        this.loadingProductTable = false;
                    });
                }
                this.addOrderDialogVisible = false;
            },
            getSummaries(param) {
                const { columns, data } = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = this.$i.warehouse.total;
                    } else if (column.property === 'outboundOutCartonTotalQty'
                    || column.property === 'outboundSkuTotalQty'
                    || column.property === 'outboundSkuTotalGrossWeight'
                    || column.property === 'outboundSkuTotalVolume'
                    || column.property === 'outboundSkuTotalNetWeight') {
                        const values = data.map(item => {
                            if (item[column.property] !== null) {
                                return Number(item[column.property].value)
                            }
                        })
                        if (!values.every(value => isNaN(value))) {
                            sums[index] = values.reduce((prev, curr) => {
                                const value = Number(curr);
                                if (!isNaN(value)) {
                                    if (column.property === 'outboundSkuTotalQty') {
                                        this.outboundData.outboundSkuTotalQty = this.jia(prev,curr)
                                    }
                                    return this.jia(prev,curr);
                                } else {
                                    if (column.property === 'outboundSkuTotalQty') {
                                        this.outboundData.outboundSkuTotalQty = prev
                                    }
                                    return prev;
                                }
                            }, 0);
                        } else {
                            sums[index] = 0;
                        }
                    }
                });

                return sums;
            },
            mul(a, b) { // 乘
                var c = 0,
                    d = a.toString(),
                    e = b.toString();
                try {
                    c += d.split(".")[1].length;
                } catch (f) {}
                try {
                    c += e.split(".")[1].length;
                } catch (f) {}
                return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
            },
            jia(a, b) {
                var c, d, e;
                try {
                    c = a.toString().split(".")[1].length;
                } catch (f) {
                    c = 0;
                }
                try {
                    d = b.toString().split(".")[1].length;
                } catch (f) {
                    d = 0;
                }
                return e = Math.pow(10, Math.max(c, d)), (this.mul(a, e) + this.mul(b, e)) / e;
            },
            /**
             * 页面表格事件
             * */
            handleClick(e) {
                console.log(e);
                this.$windowOpen({
                    url: "/product/detail",
                    params: {
                        id: e.skuId
                    }
                });
            },
            handleBlur(v, e, val) {
                if (v.isNeed && val) {
                    e.outboundSkuTotalQty.value = this.mul(Number(val),Number(e.outerCartonSkuQty.value));
                    e.outboundSkuTotalVolume.value = this.mul(Number(val),Number(e.outerCartonVolume.value));
                    e.outboundSkuTotalNetWeight.value = this.mul(Number(val),Number(e.outerCartonNetWeight.value));
                    e.outboundSkuTotalGrossWeight.value = this.mul(Number(val),Number(e.outerCartonGrossWeight.value));
                } else if(!val){
                    e.outboundSkuTotalQty.value = 0;
                    e.outboundSkuTotalVolume.value = 0;
                    e.outboundSkuTotalNetWeight.value = 0;
                    e.outboundSkuTotalGrossWeight.value = 0;
                }
            },

            /**
             * 获取字典
             * */
            getUnit() {
              this.$ajax.post(this.$apis.get_partUnit,['OBD_STATUS','SKU_UNIT','WT_UNIT','LH_UNIT','VE_UNIT'],{cache:true}).then(res=>{
                res.forEach(v=>{
                  if(v.code==='OBD_STATUS'){
                    this.outboundTypeOption=v.codes;
                  }else if(v.code==='SKU_UNIT'){
                    this.skuUnitOption=v.codes;
                  }else if(v.code==='WT_UNIT'){
                    this.weightUnitOption=v.codes;
                  }else if(v.code==='LH_UNIT'){
                    this.lengthUnitOption=v.codes;
                  }else if(v.code==='VE_UNIT'){
                    this.volumeUnitOption=v.codes;
                  }
                })
              }).finally(()=>{
                  this.loadingPage=false;
              });
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
            }

        },
        created() {
            this.getOutboundNo();
        },
        watch: {
            selectProductList(n) {
                if (n.length > 0) {
                    this.disableRemoveProduct = false;
                } else {
                    this.disableRemoveProduct = true;
                }
            }
        },
        mounted () {
            this.columnConfig = this.$db.warehouse.outboundProduct;
        }
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

    .speCol {
        min-height: 51px;
    }

    .speInput {
        width: 100%;
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

    .product-table /deep/ .el-checkbox {
        margin: 0;
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

    .speInput {
        max-width: 1000px !important;
    }

    .speInput /deep/ .el-select {
        display: block;
    }
    .gear{
        float: right;
        margin-right: 5px;
        margin-bottom: 5px;
    }

</style>
