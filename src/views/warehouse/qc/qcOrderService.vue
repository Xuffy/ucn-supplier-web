<template>
    <div class="qc-detail" v-loading="loadingData">
        <div class="title">
            <span>{{$i.warehouse.qcOrderDetail}}</span>
        </div>
        <div class="second-title">
            {{$i.warehouse.basicInfo}}
        </div>
        <div>
            <el-form label-width="190px">
                <el-row class="speZone">
                    <el-col v-for="(v,k) in $db.warehouse.qcOrderDetailBasicInfo" :key="v.key" class="speCol" :xs="24"
                            :sm="v.fullLine?24:12" :md="v.fullLine?24:12" :lg="v.fullLine?24:8" :xl="v.fullLine?24:8">
                        <el-form-item :label="v.label" :required="v._rules && v._rules.required">
                            <div v-if="v.type==='input'">
                                <el-input
                                        class="speInput"
                                        v-model="qcDetail[v.key]"
                                        :disabled="v.disabled">
                                </el-input>
                            </div>
                            <div v-else-if="v.type==='select'">
                                <el-select
                                        class="speInput"
                                        v-model="qcDetail[v.key]"
                                        clearable
                                        :disabled="v.disabled"
                                        :placeholder="$i.warehouse.pleaseChoose">
                                    <div v-if="v.isQcType">
                                        <el-option
                                                v-for="item in qcTypeOption"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.code">
                                        </el-option>
                                    </div>
                                    <div v-else-if="v.isQcStatus">
                                        <el-option
                                                v-for="item in qcStatusOption"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.code">
                                        </el-option>
                                    </div>
                                    <div v-else-if="v.isQcMethod">
                                        <el-option
                                                v-for="item in qcMethodOption"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.code">
                                        </el-option>
                                    </div>
                                    <div v-else-if="v.isSurveyor">
                                        <el-option
                                                v-for="item in surveyorOption"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.code">
                                        </el-option>
                                    </div>
                                    <div v-else-if="v.isServiceName">
                                        <el-option
                                                v-for="item in serviceList"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.name">
                                        </el-option>
                                    </div>
                                    <div v-else-if="v.isCurrency">
                                        <el-option
                                                v-for="item in currencyOptions"
                                                :key="item.id"
                                                :label="item.code"
                                                :value="item.code">
                                        </el-option>
                                    </div>

                                </el-select>
                            </div>
                            <div v-else-if="v.type==='date'">
                                <el-date-picker
                                        class="speInput"
                                        v-model="qcDetail[v.key]"
                                        align="right"
                                        type="date"
                                        :placeholder="$i.warehouse.pleaseChoose"
                                        :picker-options="pickerOptions1">
                                </el-date-picker>
                            </div>
                            <div v-else-if="v.type==='number'">
                                <el-input-number
                                        :controls="false"
                                        v-model="qcDetail[v.key]"
                                        :disabled="v.disabled"
                                        class="speInput speNumber"></el-input-number>
                            </div>
                            <div v-else-if="v.type==='textarea'">
                                <el-input
                                        :disabled="v.disabled"
                                        type="textarea"
                                        :autosize="{ minRows: 2}"
                                        :placeholder="$i.warehouse.pleaseInput"
                                        v-model="qcDetail[v.key]">
                                </el-input>
                            </div>
                            <div v-else-if="v.type==='attachment'">
                                <v-upload readonly :limit="20" ref="upload" :list="qcDetail[v.key]"></v-upload>
                            </div>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>

        <div class="product-info">
            <div class="second-title">
                {{$i.warehouse.productInfo}}
            </div>
            <div class="gear">
                <v-filter-column
                    ref="filterColumn"
                    code="uwarehouse_qc_order_detail"
                    :table-ref="() => $refs.tableBox"
                    @change="changeColumn">
                </v-filter-column>
            </div>
            <el-table
                    class="product-table"
                    v-loading="loadingProductInfoTable"
                    :data="productInfoData"
                    :summary-method="getSummaries"
                    show-summary
                    border
                    ref="tableBox"
                    style="width: 100%">
                <el-table-column
                        align="center"
                        fixed="left"
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        v-for="v in columnConfig"
                        v-if="!v._hidden && !v._hide"
                        align="center"
                        :key="v.key"
                        :prop="v.key"
                        :label="$i.warehouse[v.key]"
                        :label-class-name="'location-' + v.key"
                        :class-name="v._rules &&  v._rules.required ? 'ucn-table-required' : ''"
                        width="180">
                    <template slot-scope="scope" v-if="scope.row[v.key]">
                        <div v-if="v.showType==='select'">
                            <div v-if="v.isQcResult">
                                <el-select clearable v-model="scope.row[v.key].value"
                                           :placeholder="$i.warehouse.pleaseChoose">
                                    <el-option
                                            v-for="item in qcResultOption"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.code">
                                    </el-option>
                                </el-select>
                            </div>
                            <div v-else-if="v.isBarCodeResult">
                                <el-select clearable v-model="scope.row[v.key].value"
                                           :placeholder="$i.warehouse.pleaseChoose">
                                    <el-option
                                            v-for="item in barCodeResult"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div v-else-if="v.showType==='number'">
                                    <v-input-number
                                        :controls="false"
                                        v-model="scope.row[v.key].value"
                                        :mark="v.label"
                                        @blur="inputBlur(scope.row, v.key)"
                                        :accuracy="v.accuracy ? v.accuracy : null"></v-input-number>
                        </div>
                        <div v-else-if="v.showType==='input'">
                            <v-input-number
                                :controls="false"
                                :placeholder="$i.warehouse.pleaseInput"
                                v-model="scope.row[v.key].value"
                                :mark="v.label"
                                :accuracy="v.accuracy ? v.accuracy : null"></v-input-number>
                        </div>
                        <div v-else-if="v.showType==='attachment'">
                            <el-popover
                                    placement="bottom"
                                    width="300"
                                    trigger="click">
                                <v-upload :limit="20"
                                          only-image
                                          :list="scope.row[v.key].value"
                                          :ref="'pictureUpload'+scope.$index"
                                           @change="uploadChange('pictureUpload'+scope.$index, scope.row[v.key])"></v-upload>
                                <el-button slot="reference" type="text">
                                     {{(scope.row[v.key].pleaseText === '' ?  $i.warehouse.qcUpload : scope.row[v.key].pleaseText) + '(' + scope.row[v.key].imgNum + '/20' + ')'}}
                                </el-button>
                            </el-popover>
                        </div>
                        <div v-else>
                            {{scope.row[v.key].value}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        fixed="right"
                        align="center"
                        :label="$i.warehouse.detail"
                        width="100">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" v-authorize="'PRODUCT:DETAIL'"  type="text" size="small">{{$i.warehouse.detail}}
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>


        <div class="summary">
            <div class="second-title">
                {{$i.warehouse.summary}}
            </div>
            <el-form label-width="280px">
                <el-row class="speZone">
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item :label="$i.warehouse.cartonOfQualifiedProducts">
                            <el-input
                                    class="summaryInput"
                                    size="mini"
                                    v-model="qcDetail.qualifiedSkuCartonTotalQty"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item :label="$i.warehouse.quantityOfQualifiedProducts">
                            <el-input
                                    class="summaryInput"
                                    size="mini"
                                    v-model="qcDetail.qualifiedSkuQty"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item :label="$i.warehouse.volumeOfQualifiedProducts">
                            <el-input
                                    class="summaryInput"
                                    size="mini"
                                    v-model="qcDetail.qualifiedSkuVolume"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item :label="$i.warehouse.netWeightOfQualifiedProducts">
                            <el-input
                                    class="summaryInput"
                                    size="mini"
                                    v-model="qcDetail.qualifiedSkuNetWeight"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item :label="$i.warehouse.grossWeightOfQualifiedProducts">
                            <el-input
                                    class="summaryInput"
                                    size="mini"
                                    v-model="qcDetail.qualifiedSkuGrossWeight"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item :label="$i.warehouse.quantityOfSubQualityProducts">
                            <el-input
                                    class="summaryInput"
                                    size="mini"
                                    v-model="qcDetail.unqualifiedSkuQty"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item :label="$i.warehouse.cartonOfSubQualityProducts">
                            <el-input
                                    class="summaryInput"
                                    size="mini"
                                    v-model="qcDetail.unqualifiedSkuCartonTotalQty"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item :label="$i.warehouse.netWeightOfSubQualityProducts">
                            <el-input
                                    class="summaryInput"
                                    size="mini"
                                    v-model="qcDetail.unqualifiedSkuNetWeight"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item :label="$i.warehouse.volumeOfSubQualityProducts">
                            <el-input
                                    class="summaryInput"
                                    size="mini"
                                    v-model="qcDetail.unqualifiedSkuVolume"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item :label="$i.warehouse.grossWeightOfSubQualityProducts">
                            <el-input
                                    class="summaryInput"
                                    size="mini"
                                    v-model="qcDetail.unqualifiedSkuGrossWeight"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item :label="$i.warehouse.skuQuantity">
                            <el-input
                                    class="summaryInput"
                                    size="mini"
                                    v-model="summaryData.skuQuantity"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>


        <div class="footBtn">
            <el-button
                    v-authorize="'QC:ORDER_DETAIL:SEND'"
                    :disabled="loadingData"
                    :loading="disableClickSubmit"
                    @click="submit" type="primary">
                {{$i.warehouse.submit}}
            </el-button>
            <el-button
                    :disabled="loadingData"
                    type="danger"
                    @click="cancel">{{$i.warehouse.cancel}}</el-button>
            <el-button
                :disabled="loadingData"
                @click="download"
                v-authorize="'QC:ORDER_DETAIL:DOWNLOAD'"
                type="primary">
                {{$i.warehouse.download}}
            </el-button>
        </div>

        <v-message-board module="warehouse" code="qcDetail" :id="$route.query.id"></v-message-board>
    </div>
</template>
<script>

    import { VTable, VMessageBoard, VUpload, VFilterColumn, VInputNumber } from "@/components/index";
    import { mapActions } from "vuex";

    export default {
        name: "qc-detail",
        components: {
            VTable,
            VMessageBoard,
            VUpload,
            VFilterColumn,
            VInputNumber
        },
        data() {
            return {
                options: [],
                qcDetail: {},
                loadingData: false,
                pickerOptions1: {
                    disabledDate(time) {
                        return time.getTime() + 3600 * 1000 * 24 < Date.now();
                    }
                },
                disableClickSubmit: false,
                /**
                 * 字典数据
                 * */
                qcTypeOption: [],
                qcMethodOption: [],
                surveyorOption: [],
                qcResultOption: [],
                barCodeResult: [],
                qcStatusOption: [],
                currencyOptions: [],
                skuUnitOption: [],       //计量单位
                lengthOption: [],
                volumeOption: [],
                weightOption: [],

                /**
                 * paymentTable data
                 * */
                tableData: [
                    {
                        date: "2016-05-02",
                        name: "王小虎",
                        address: "上海市普陀区金沙江路 1518 弄"
                    }
                ],

                /**
                 * summary Data
                 * */
                summaryData: {
                    skuQuantity: 0
                },

                /**
                 * product info data
                 * */
                loadingProductInfoTable: false,
                productInfoConfig: {
                    pn: 1,
                    ps: 200,
                    qcOrderId: this.$route.query.id

                    // sorts: [
                    //     {
                    //         orderBy: "",
                    //         orderType: "",
                    //     }
                    // ],
                },
                productInfoData: [],
                selectList: [],

                /**
                 * qcOrder Config
                 * */
                qcOrderConfig: {
                    qcDate: "",
                    qcMethodDictCode: "",
                    qcOrderId: null,
                    qcOrderNo: "",
                    qcResultDetailParams: [],
                    qcTypeDictCode: "",
                    serviceFee: 0,
                    surveyor: ""
                },
                columnConfig: ''
            };
        },
        methods: {
            ...mapActions(["setMenuLink"]),
            changeColumn(val) {
                this.productInfoData = this.$refs.filterColumn.getFilterData(this.productInfoData, val);
                this.columnConfig = this.productInfoData[0];
            },
            getQcOrderDetail() {
                this.loadingData = true;
                this.$ajax.get(`${this.$apis.get_sellerOrderDetail}?id=${this.$route.query.id}`)
                    .then(res => {
                        this.qcDetail = res;
                        this.loadingData = false;
                    }).catch(err => {
                        this.loadingData = false;
                    }
                );
            },
            getProductInfo() {
                this.loadingProductInfoTable = true;
                this.$ajax.post(this.$apis.get_sellerQcOrderProduct, this.productInfoConfig).then(res => {
                    this.productInfoData = res.datas;
                    this.productInfoData.forEach(v => {
                        v.skuQcResultDictCode = "";
                        v.deliveryDate = this.$dateFormat(v.deliveryDate, "yyyy-mm-dd");
                        v.skuUnitDictCode = v.skuUnitDictCode ? _.findWhere(this.skuUnitOption, { code: v.skuUnitDictCode }).name : '';
                        v.volumeUnitDictCode = v.volumeUnitDictCode ? _.findWhere(this.volumeOption, { code: v.volumeUnitDictCode }).name : '';
                        v.weightUnitDictCode = v.weightUnitDictCode ? _.findWhere(this.weightOption, { code: v.weightUnitDictCode }).name : '';
                        v.lengthUnitDictCode = v.lengthUnitDictCode ? _.findWhere(this.lengthOption, { code: v.lengthUnitDictCode }).name : '';
                    });
                    let diffData = [];
                    _.map(this.productInfoData, v => {
                        diffData.push(v.skuId + v.orderNo);
                    });
                    this.summaryData.skuQuantity = _.uniq(diffData).length;

                    let arr = this.$copyArr(this.productInfoData)
                    arr = this.$getDB(this.$db.warehouse.qcDetailProductInfo, arr);

                    this.$refs.filterColumn.update(false, arr).then(data => {
                        this.productInfoData = this.$refs.filterColumn.getFilterData(arr, data);
                        this.columnConfig = this.productInfoData[0];
                    });

                    this.loadingProductInfoTable = false;
                }).catch(err => {
                    this.loadingProductInfoTable = false;
                });
            },

            /**
             * product info表格事件
             * */
            btnClick(e) {
                console.log(e);
            },
            changeChecked(e) {
                this.selectList = e;
            },
            handleClick(data) {
                this.$windowOpen({
                    url: "/product/detail",
                    params: {
                        id: data.skuId.value
                    }
                });
            },
            getSummaries(param) {
                const { columns, data } = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = this.$i.warehouse.totalMoney;
                        return;
                    } else if (
                        // index === 17 || index === 18 || index === 43 || index === 44 || index === 45 || index === 46 || index === 47 || index === 48 || index === 49 || index === 50 || index === 51 || index === 52 || index === 53 || index === 54 || index === 67
                        column.property === 'qualifiedSkuCartonTotalQty'
                        || column.property === 'unqualifiedSkuCartonTotalQty'
                        || column.property === 'qualifiedSkuQty'
                        || column.property === 'unqualifiedSkuQty'
                        || column.property === 'qualifiedSkuVolume'
                        || column.property === 'unqualifiedSkuVolume'
                        || column.property === 'qualifiedSkuNetWeight'
                        || column.property === 'unqualifiedSkuNetWeight'
                        || column.property === 'qualifiedSkuGrossWeight'
                        || column.property === 'unqualifiedSkuGrossWeight'
                        || column.property === 'actSkuCartonTotalQty'
                        || column.property === 'actSkuQty'
                        ) {
                            const values = data.map(item => {
                                if (item[column.property] !== null) {
                                    return Number(item[column.property].value)
                                }
                            })
                            if (!values.every(value => isNaN(value))) {
                            sums[index] = values.reduce((prev, curr) => {
                                const value = Number(curr);
                                if (!isNaN(value)) {
                                    let num = ((prev * 100) + (curr * 100)) / 100;
                                    if (column.property === 'qualifiedSkuCartonTotalQty') {
                                         this.qcDetail.qualifiedSkuCartonTotalQty = num;
                                    }
                                    else if (column.property === 'unqualifiedSkuCartonTotalQty') {
                                        this.qcDetail.unqualifiedSkuCartonTotalQty = num;
                                    } 
                                    else if (column.property === 'qualifiedSkuQty') {
                                        this.qcDetail.qualifiedSkuQty = num;
                                    } 
                                    else if (column.property === 'unqualifiedSkuQty') {
                                        this.qcDetail.unqualifiedSkuQty = num;
                                    } 
                                    else if (column.property === 'qualifiedSkuVolume') {
                                        this.qcDetail.qualifiedSkuVolume = num;
                                    } else if (column.property === 'unqualifiedSkuVolume') {
                                        this.qcDetail.unqualifiedSkuVolume = num;
                                    } 
                                    else if (column.property === 'qualifiedSkuNetWeight') {
                                        this.qcDetail.qualifiedSkuNetWeight = num;
                                    } else if (column.property === 'unqualifiedSkuNetWeight') {
                                        this.qcDetail.unqualifiedSkuNetWeight = num;
                                    } else if (column.property === 'qualifiedSkuGrossWeight') {
                                        this.qcDetail.qualifiedSkuGrossWeight = num;
                                    } else if (column.property === 'unqualifiedSkuGrossWeight') {
                                        this.qcDetail.unqualifiedSkuGrossWeight = num;
                                    }
                                    return ((prev * 100) + (curr * 100)) / 100;
                                } else {
                                    return prev;
                                }
                            }, 0);
                        // const values = data.map(item => Number(item[column.property]));
                        // if (!values.every(value => isNaN(value))) {
                        //     sums[index] = values.reduce((prev, curr) => {
                        //         const value = Number(curr);
                        //         if (!isNaN(value)) {
                        //             return prev + curr;
                        //         } else {
                        //             return prev;
                        //         }
                        //     }, 0);
                        // } else {

                        }
                    }
                });
                return sums;
            },
            inputBlur (row, k) {
                // 计算实际产品总箱数
                row.actSkuCartonTotalQty.value = row.qualifiedSkuCartonTotalQty.value + row.unqualifiedSkuCartonTotalQty.value
                
                // 实际产品数量
                row.actSkuQty.value = row.qualifiedSkuQty.value + row.unqualifiedSkuQty.value

                // 合格产品数量
                row.qualifiedSkuQty.value = row.actOuterCartonSkuQty.value * row.qualifiedSkuCartonTotalQty.value

                // 不合格产品数量
                row.unqualifiedSkuQty.value = row.actOuterCartonSkuQty.value * row.unqualifiedSkuCartonTotalQty.value

                // 合格产品总净重
                row.qualifiedSkuNetWeight.value = row.qualifiedSkuCartonTotalQty.value * row.outerCartonNetWeight.value

                // 不合格产品总净重
                row.unqualifiedSkuNetWeight.value = row.unqualifiedSkuCartonTotalQty.value * row.outerCartonNetWeight.value

                // 合格产品总体积
                row.qualifiedSkuVolume.value = row.qualifiedSkuCartonTotalQty.value * row.outerCartonVolume.value

                // 不合格产品总体积
                row.unqualifiedSkuVolume.value = row.unqualifiedSkuCartonTotalQty.value * row.outerCartonVolume.value

                // 合格产品总毛重
                row.qualifiedSkuGrossWeight.value = row.qualifiedSkuCartonTotalQty.value * row.outerCartonGrossWeight.value

                // 不合格产品总毛重
                row.unqualifiedSkuGrossWeight.value = row.unqualifiedSkuCartonTotalQty.value * row.outerCartonGrossWeight.value

                // 外箱体积
                row.outerCartonVolume.value = (row.outerCartonLength.value * row.outerCartonWidth.value * row.outerCartonHeight.value) / 1000000
            },
            submit() {
                if (this.$validateForm(this.qcDetail, this.$db.warehouse.qcOrderDetailBasicInfo)) {
                    return false;
                }
                let self = this
                this.qcOrderConfig.qcDate = this.qcDetail.qcDate;
                this.qcOrderConfig.qcMethodDictCode = this.qcDetail.qcMethodDictCode;
                this.qcOrderConfig.qcOrderId = this.$route.query.id;
                this.qcOrderConfig.qcOrderNo = this.qcDetail.qcOrderNo;
                this.qcOrderConfig.qcTypeDictCode = this.qcDetail.qcTypeDictCode;
                this.qcOrderConfig.surveyor = this.qcDetail.surveyor;
                this.qcOrderConfig.serviceFee = this.qcDetail.serviceFee;
                this.qcOrderConfig.qcResultDetailParams = [];
                this.productInfoData.forEach(v => {
                    let skuQcResultDictCode;
                    if (v.skuQcResultDictCode) {
                        skuQcResultDictCode = v.skuQcResultDictCode.value;
                    } else {
                        skuQcResultDictCode = "WAIT_FOR_QC";
                    }
                    this.qcOrderConfig.qcResultDetailParams.push({
                        actInnerCartonSkuQty: v.actInnerCartonSkuQty.value,
                        actOuterCartonInnerBoxQty: v.actOuterCartonInnerBoxQty.value,
                        actOuterCartonSkuQty: v.actOuterCartonSkuQty.value,
                        checkOuterCartonQty: v.checkOuterCartonQty.value,
                        innerCartonGrossWeight: v.innerCartonGrossWeight.value,
                        innerCartonHeight: v.innerCartonHeight.value,
                        innerCartonLength: v.innerCartonLength.value,
                        innerCartonNetWeight: v.innerCartonNetWeight.value,
                        innerCartonVolume: v.innerCartonVolume.value,
                        innerCartonWidth: v.innerCartonWidth.value,
                        innerPackingBarCodeResultDictCode: v.innerPackingBarCodeResultDictCode.value,
                        outerCartonBarCodeResultDictCode: v.outerCartonBarCodeResultDictCode.value,
                        outerCartonGrossWeight: v.outerCartonGrossWeight.value,
                        outerCartonHeight: v.outerCartonHeight.value,
                        outerCartonLength: v.outerCartonHeight.value,
                        outerCartonNetWeight: v.outerCartonNetWeight.value,
                        outerCartonWidth: v.outerCartonWidth.value,
                        qcOrderDetailId: v.id.value,
                        qcPics: v.qcPics.value,
                        qualifiedSkuCartonTotalQty: v.qualifiedSkuCartonTotalQty.value,
                        remark: v.remark.value,
                        shippingMarkResultDictCode: v.shippingMarkResultDictCode.value,
                        skuBarCodeResultDictCode: v.skuBarCodeResultDictCode.value,
                        skuLabelResultDictCode: v.skuLabelResultDictCode.value,
                        skuQcResultDictCode: skuQcResultDictCode,
                        unqualifiedSkuCartonTotalQty: v.unqualifiedSkuCartonTotalQty.value,
                        unqualifiedType: v.unqualifiedType.value
                    });
                });
                _.map(this.qcOrderConfig.qcResultDetailParams, (v, k) => {
                    v.qcPics = self.$refs["pictureUpload" + k][0].getFiles();
                });
                for (let i = 0; i < this.qcOrderConfig.qcResultDetailParams.length; i++) {
                    if (this.$validateForm(this.qcOrderConfig.qcResultDetailParams[i], this.$db.warehouse.qcDetailProductInfo)) {
                        return;
                    }
                }
                this.disableClickSubmit = true;
                this.$ajax.post(this.$apis.save_sellerQcOrder, this.qcOrderConfig).then(res => {
                    this.disableClickSubmit = false;
                    this.$message({
                        message: this.$i.warehouse.submitSuccess,
                        type: "success"
                    });
                    this.$router.push("/warehouse/qcOverview");
                }).catch(err => {
                    this.disableClickSubmit = false;
                });
            },
            download(){
                this.$fetch.export_task('QC_ORDER',{qcOrderNos:[this.qcDetail.qcOrderNo]});
            },
            cancel() {
                window.close();
            },

            /**
             * 选择服务商的方法
             * */
            getService(name) {
                this.serviceList = [];
                if (!name) {
                    name = "";
                }
                this.$ajax.get(`${this.$apis.get_supplyProviders}?name=${name}`).then(res => {
                    res.forEach(v => {
                        this.serviceList.push(v);
                    });
                    this.$ajax.get(`${this.$apis.get_serviceProviders}?name=${name}`).then(res => {
                        res.forEach(v => {
                            this.serviceList.push(v);
                        });
                    }).catch(err => {

                    });

                }).catch(err => {

                });
            },

            /**
             * 获取字典
             * */
            getUnit() {
                this.$ajax.post(this.$apis.get_partUnit, ["QC_TYPE", "QC_MD", "SKU_QC_RS", "PB_CODE", "QC_STATUS", "SKU_UNIT", "LH_UNIT", "VE_UNIT", "WT_UNIT"], { cache: true }).then(res => {
                    res.forEach(v => {
                        if (v.code === "QC_TYPE") {
                            this.qcTypeOption = v.codes;
                        } else if (v.code === "QC_MD") {
                            this.qcMethodOption = v.codes;
                        } else if (v.code === "SKU_QC_RS") {
                            v.codes = _.filter(v.codes, e => {
                                return e.code !== "WAIT_FOR_QC" && e.code !== "CONFIRMED";
                            });
                            this.qcResultOption = v.codes;
                        } else if (v.code === "PB_CODE") {
                            this.barCodeResult = v.codes;
                        } else if (v.code === "QC_STATUS") {
                            this.qcStatusOption = v.codes;
                        } else if (v.code === "SKU_UNIT") {
                            this.skuUnitOption = v.codes;
                        } else if (v.code === "LH_UNIT") {
                            this.lengthOption = v.codes;
                        } else if (v.code === "VE_UNIT") {
                            this.volumeOption = v.codes;
                        } else if (v.code === "WT_UNIT") {
                            this.weightOption = v.codes;
                        }
                    });
                    this.getProductInfo();
                }).catch(res => {
                    this.getProductInfo();
                    
                });

                this.$ajax.get(this.$apis.get_currencyUnit, {}, { cache: true }).then(res => {
                    this.currencyOptions = res;

                }).catch(err => {

                });

                //获取验货员
                // this.$ajax.get(this.$apis.get_serviceQcSurveyor).then(res=>{
                //     console.log(res,'???????xxxx')
                // }).catch(err=>{
                //
                // });


                // this.$ajax.post(this.$apis.get_partUnit,[]).then(res=>{
                //     console.log(res)
                // });
            },
            uploadChange (ref, e) { // 图片导入成功后显示

                let length = this.$refs[ref][0].getFiles().length
                e.imgNum = length
                e.pleaseText = length > 0 ? this.$i.warehouse.ContinueQcUpload : this.$i.warehouse.qcUpload
            }
        },
        created() {
            this.getQcOrderDetail();
            this.getUnit();
            this.getService();
        },
        mounted() {
            this.setMenuLink({
                path: '/logs/index',
                query: {code: 'QC'},
                type: 10,
                auth:'QC:LOG',
                label: this.$i.common.log
            });
            this.columnConfig = this.$db.warehouse.qcDetailProductInfo;
        }
    };
</script>
<style scoped>
    .title {
        font-weight: bold;
        font-size: 18px;
        height: 32px;
        line-height: 32px;
        color: #666666;
    }

    .second-title {
        font-size: 16px;
        color: #999999;
        padding: 10px 0;
    }

    .payment-btn {
        margin: 5px 0 10px 0;
    }

    .product-info {
        margin-top: 10px;
    }

    .speInput {
        width: 80%;
    }

    .product-table /deep/ .el-checkbox {
        margin: 0;
    }

    .speNumber /deep/ input {
        text-align: left;
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
    .gear{
        float: right;
        margin-right: 5px;
        margin-bottom: 5px;
    }
</style>
