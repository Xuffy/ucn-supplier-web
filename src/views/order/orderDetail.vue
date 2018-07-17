<template>
    <div class="create-order" v-loading="loadingPage">
        <div class="title">
            {{$i.order.basicInfo}}
        </div>
        <el-form :modal="orderForm" ref="basicInfo" class="speForm" label-width="250px" :label-position="labelPosition">
            <el-row>
                <el-col :class="{speCol:v.type!=='textarea' && v.type!=='attachment',isModify:v._isModified}"
                        v-for="v in $db.order.orderDetail"
                        v-if="v.belong==='basicInfo' && v.type!=='supplierNo'"
                        :key="v.key"
                        :xs="24"
                        :sm="v.fullLine?24:12"
                        :md="v.fullLine?24:12"
                        :lg="v.fullLine?24:8"
                        :xl="v.fullLine?24:8">
                    <el-form-item :prop="v.key" :label="v.label">
                        <div v-if="v.type==='input'">
                            <div v-if="v.key==='lcNo'">
                                <el-input
                                        @change="handleChange(v.key)"
                                        :placeholder="v.isQuotationNo?(isModify?$i.order.pleaseCreate:''):(isModify?$i.order.pleaseInput:'')"
                                        class="speInput"
                                        :disabled="v.disabled || disabledLcNo || !isModify"
                                        v-model="orderForm[v.key]"></el-input>
                            </div>
                            <div v-else>
                                <el-input
                                        @change="handleChange(v.key)"
                                        :placeholder="v.isQuotationNo?(isModify?$i.order.pleaseCreate:''):(isModify?$i.order.pleaseInput:'')"
                                        class="speInput"
                                        :disabled="v.disabled || v.disableDetail || !isModify"
                                        v-model="orderForm[v.key]"></el-input>
                            </div>
                        </div>
                        <div v-else-if="v.type==='date'">
                            <el-date-picker
                                    @change="handleChange(v.key)"
                                    :disabled="v.disabled || v.disableDetail || !isModify"
                                    v-model="orderForm[v.key]"
                                    :editable="false"
                                    :placeholder="isModify?$i.order.pleaseChoose:''"
                                    class="speInput"
                                    align="right"
                                    type="date">
                            </el-date-picker>
                        </div>
                        <div v-else-if="v.type==='select'">
                            <div v-if="v.isSupplier">
                                <el-select
                                        @change="handleChange(v.key)"
                                        class="speInput"
                                        v-model="orderForm[v.key]"
                                        filterable
                                        :disabled="v.disableDetail || !isModify"
                                        :placeholder="isModify?$i.order.pleaseChoose:''">
                                    <el-option
                                            v-for="item in supplierOption"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </div>
                            <div v-else-if="v.isIncoterm">
                                <el-select
                                        @change="handleChange(v.key)"
                                        class="speInput"
                                        v-model="orderForm[v.key]"
                                        filterable
                                        :disabled="!isModify"
                                        :placeholder="isModify?$i.order.pleaseChoose:''">
                                    <el-option
                                            v-for="item in incotermOption"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.code">
                                    </el-option>
                                </el-select>
                            </div>
                            <div v-else-if="v.isCurrency">
                                <el-select
                                        @change="handleChange(v.key)"
                                        class="speInput"
                                        v-model="orderForm[v.key]"
                                        filterable
                                        :disabled="!isModify"
                                        :placeholder="isModify?$i.order.pleaseChoose:''">
                                    <el-option
                                            v-for="item in currencyOption"
                                            :key="item.id"
                                            :label="item.code"
                                            :value="item.code">
                                    </el-option>
                                </el-select>
                            </div>
                            <div v-else-if="v.isPayment">
                                <el-select
                                        class="speInput"
                                        @change="changePayment(orderForm[v.key],v.key)"
                                        v-model="orderForm[v.key]"
                                        filterable
                                        :disabled="!isModify"
                                        :placeholder="isModify?$i.order.pleaseChoose:''">
                                    <el-option
                                            v-for="item in paymentOption"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.code">
                                    </el-option>
                                </el-select>
                            </div>
                            <div v-else-if="v.isCountry">
                                <el-select
                                        @change="handleChange(v.key)"
                                        class="speInput"
                                        v-model="orderForm[v.key]"
                                        filterable
                                        :disabled="!isModify"
                                        :placeholder="isModify?$i.order.pleaseChoose:''">
                                    <el-option
                                            v-for="item in countryOption"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.code">
                                    </el-option>
                                </el-select>
                            </div>
                            <div v-else-if="v.isTransport">
                                <el-select
                                        @change="handleChange(v.key)"
                                        class="speInput"
                                        v-model="orderForm[v.key]"
                                        filterable
                                        :disabled="v.disabled || !isModify"
                                        :placeholder="isModify?$i.order.pleaseChoose:''">
                                    <el-option
                                            v-for="item in transportOption"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.code">
                                    </el-option>
                                </el-select>
                            </div>
                            <div v-else-if="v.isStatus">
                                <el-select
                                        @change="handleChange(v.key)"
                                        class="speInput"
                                        :disabled="v.disableDetail || !isModify"
                                        v-model="orderForm[v.key]"
                                        :placeholder="isModify?$i.order.pleaseChoose:''">
                                    <el-option
                                            v-for="item in orderStatusOption"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.code">
                                    </el-option>
                                </el-select>
                            </div>
                            <div v-else>
                                <el-select
                                        @change="handleChange(v.key)"
                                        :placeholder="isModify?$i.order.pleaseChoose:''"
                                        :disabled="v.disabled || !isModify"
                                        class="speInput"
                                        v-model="orderForm[v.key]">
                                    <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div v-else-if="v.type==='number'">
                            <el-input-number
                                    @change="handleChange(v.key)"
                                    :placeholder="isModify?$i.order.pleaseInput:''"
                                    :disabled="v.disabled || !isModify"
                                    class="speInput speNumber"
                                    v-model="orderForm[v.key]"
                                    :controls="false">

                            </el-input-number>
                        </div>
                        <div v-else-if="v.type==='textarea'">
                            <el-input
                                    @change="handleChange(v.key)"
                                    :disabled="v.disabled || !isModify"
                                    class="speInput"
                                    type="textarea"
                                    :autosize="{ minRows: 2}"
                                    :placeholder="isModify?$i.order.pleaseInput:''"
                                    v-model="orderForm[v.key]">
                            </el-input>
                        </div>
                        <div v-else-if="v.type==='attachment'">
                            <v-upload
                                    ref="upload"
                                    :readonly="!isModify"
                                    :list="orderForm.attachments"
                                    :limit="20"></v-upload>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <div class="title">
            {{$i.order.exchangeRate}}
        </div>
        <el-form :modal="orderForm" ref="basicInfo" class="speForm" label-width="250px" :label-position="labelPosition">
            <el-row>
                <el-col class="speCol" v-for="v in orderForm.exchangeRateList" :key="v.currency" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                    <el-form-item :label="$i.order[v.currency]">
                        <el-input-number
                                :disabled="true"
                                :placeholder="$i.order.pleaseInput"
                                class="speInput speNumber"
                                v-model="v.exchangeRate"
                                :controls="false">
                        </el-input-number>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <div class="title">
            {{$i.order.responsibility}}
        </div>
        <el-table
                :data="orderForm.responsibilityList"
                style="width: 100%">
            <el-table-column
                    prop="type"
                    label="Type">
                <template slot-scope="scope">
                    <span v-if="scope.row.type===0">{{$i.order.needLabelDesignInfoDate}}</span>
                    <span v-if="scope.row.type===1">{{$i.order.labelDesignDate}}</span>
                    <span v-if="scope.row.type===2">{{$i.order.designNeedConfirmDate}}</span>
                    <span v-if="scope.row.type===3">{{$i.order.receiveSampleDate}}</span>
                    <span v-if="scope.row.type===4">{{$i.order.sampleNeedConfirmDate}}</span>
                    <span v-if="scope.row.type===5">{{$i.order.otherResponsibility}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="customer"
                    align="center"
                    label="Me">
                <template slot-scope="scope">
                    <el-date-picker
                            :class="{'high-light':scope.row && scope.row.fieldUpdates.customer===''}"
                            @change="handleResponsibilityChange(scope.row,'customer')"
                            v-model="scope.row.customer"
                            :editable="false"
                            align="right"
                            type="date"
                            :disabled="true">
                    </el-date-picker>
                </template>
            </el-table-column>
            <el-table-column
                    prop="supplier"
                    align="center"
                    label="Supplier">
                <template slot-scope="scope">
                    <el-date-picker
                            :class="{'high-light':scope.row && scope.row.fieldUpdates.supplier===''}"
                            @change="handleResponsibilityChange(scope.row,'supplier')"
                            v-model="scope.row.supplier"
                            align="right"
                            :editable="false"
                            type="date"
                            :disabled="scope.row.type!==1 && scope.row.type!==3 && scope.row.type!==5 || !isModify"
                            :placeholder="(scope.row.type===1 || scope.row.type===3 || scope.row.type===5) && isModify?$i.order.pleaseChoose:''">
                    </el-date-picker>
                </template>
            </el-table-column>
            <el-table-column
                    prop="Remark"
                    align="center"
                    label="Remark">
                <template slot-scope="scope">
                    <el-input
                            :class="{'high-light':scope.row && scope.row.fieldUpdates.remark===''}"
                            @change="handleResponsibilityChange(scope.row,'remark')"
                            :disabled="scope.row.type!==1 && scope.row.type!==3 && scope.row.type!==5 || !isModify"
                            :placeholder="(scope.row.type===1 || scope.row.type===3 || scope.row.type===5) && isModify?$i.order.pleaseInput:''"
                            v-model="scope.row.remark"
                            clearable>
                    </el-input>
                </template>
            </el-table-column>
            <el-table-column
                    prop="actualDate"
                    align="center"
                    label="Actual Date">
                <template slot-scope="scope">
                    <el-date-picker
                            :class="{'high-light':scope.row && scope.row.fieldUpdates.actualDt===''}"
                            @change="handleResponsibilityChange(scope.row,'actualDt')"
                            v-model="scope.row.actualDt"
                            align="right"
                            type="date"
                            :editable="false"
                            :disabled="scope.row.type!==1 && scope.row.type!==3 && scope.row.type!==5 || !isModify"
                            :placeholder="(scope.row.type===1 || scope.row.type===3 || scope.row.type===5) && isModify?$i.order.pleaseChoose:''">
                    </el-date-picker>
                </template>
            </el-table-column>
        </el-table>

        <div class="title">
            {{$i.order.payment}}
        </div>
        <div class="payment-table">
            <el-button :loading="disableClickPayback" :disabled="!hasHandleOrder" @click="applyPayback" type="primary">{{$i.order.applyRefund}}</el-button>
            <el-button :disabled="!hasHandleOrder" :loading="disableRemind" @click="remindPay">{{$i.order.remindCustomerPay}}</el-button>
            <el-table
                    v-loading="loadingPaymentTable"
                    class="payTable"
                    :data="paymentData"
                    border
                    :summary-method="getSummaries"
                    show-summary
                    :row-class-name="tableRowClassName"
                    style="width: 100%">
                <el-table-column
                        fixed="left"
                        label="#"
                        align="center"
                        width="55">
                    <template slot-scope="scope">
                        {{scope.$index+1}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="no"
                        :label="$i.order.payNo"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="name"
                        :label="$i.order.payName"
                        width="180">
                    <template slot-scope="scope">
                        <el-input
                                v-if="scope.row.isNew || scope.row.isModify"
                                :placeholder="$i.order.pleaseInput"
                                v-model="scope.row.name"
                                clearable>
                        </el-input>
                        <span v-else>{{scope.row.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        :label="$i.order.planPayDt"
                        width="200">
                    <template slot-scope="scope">
                        <span>{{scope.row.planPayDt?$dateFormat(scope.row.planPayDt,'yyyy-mm-dd'):''}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="planPayAmount"
                        :label="$i.order.planPayAmount"
                        width="160">
                    <template slot-scope="scope">
                        <span>{{scope.row.planPayAmount}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        :label="$i.order.actualPayDt"
                        width="200">
                    <template slot-scope="scope">
                        <span>{{scope.row.actualPayDt?$dateFormat(scope.row.actualPayDt,'yyyy-mm-dd'):''}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="actualPayAmount"
                        :label="$i.order.actualPayAmount"
                        width="160">
                    <template slot-scope="scope">
                        <span>{{scope.row.actualPayAmount}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        :label="$i.order.planRefundDt"
                        width="200">
                    <template slot-scope="scope">
                        <el-date-picker
                                v-if="scope.row.isNew || scope.row.isModify"
                                class="speDate"
                                v-model="scope.row.planRefundDt"
                                type="date"
                                :picker-options="datePickOption"
                                :placeholder="$i.order.pleaseChoose">
                        </el-date-picker>
                        <span v-else>{{scope.row.planRefundDt?$dateFormat(scope.row.planRefundDt,'yyyy-mm-dd'):''}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="planRefundAmount"
                        :label="$i.order.planRefundAmount"
                        width="160">
                    <template slot-scope="scope">
                        <el-input-number
                                v-if="scope.row.isNew || scope.row.isModify"
                                class="speNumber"
                                v-model="scope.row.planRefundAmount"
                                :controls="false"
                                :min="0"></el-input-number>
                        <span v-else>{{scope.row.planRefundAmount}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="actualRefundDt"
                        :label="$i.order.actualRefundDt"
                        width="200">
                    <template slot-scope="scope">
                        <el-date-picker
                                v-if="scope.row.isNew || scope.row.isModify"
                                class="speDate"
                                v-model="scope.row.actualRefundDt"
                                type="date"
                                :picker-options="datePickOption1"
                                :placeholder="$i.order.pleaseChoose">
                        </el-date-picker>
                        <span v-else>{{scope.row.actualRefundDt?$dateFormat(scope.row.actualRefundDt,'yyyy-mm-dd'):''}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="actualRefundAmount"
                        :label="$i.order.actualRefundAmount"
                        width="160">
                    <template slot-scope="scope">
                        <el-input-number
                                v-if="scope.row.isNew || scope.row.isModify"
                                class="speNumber"
                                v-model="scope.row.actualRefundAmount"
                                :controls="false"
                                :min="0"></el-input-number>
                        <span v-else>{{scope.row.actualRefundAmount}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="currencyCode"
                        :label="$i.order.payCurrency"
                        width="180">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        align="center"
                        :label="$i.order.available"
                        width="180">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status===-1">{{$i.order.abandon}}</span>
                        <span v-if="scope.row.status===10">{{$i.order.waitCustomerConfirm}}</span>
                        <span v-if="scope.row.status===20">{{$i.order.waitSupplierConfirm}}</span>
                        <span v-if="scope.row.status===30">{{$i.order.waitServiceConfirm}}</span>
                        <span v-if="scope.row.status===40">已确认</span>
                    </template>
                </el-table-column>
                <el-table-column
                        fixed="right"
                        :label="$i.order.action"
                        align="center"
                        width="125">
                    <template slot-scope="scope">
                        <div v-if="scope.row.status===20">
                            <el-button @click="confirmPay(scope.row)" type="text">{{$i.order.confirm}}</el-button>
                        </div>
                        <div v-else-if="scope.row.status===40 && scope.row.planPayDt">
                        </div>
                        <div v-else>
                            <div v-if="scope.row.isNew">
                                <el-button :disabled="false" @click="saveNewPay(scope.row)" type="text" size="small">{{$i.order.save}}</el-button>
                                <el-button :disabled="false" @click="cancelSaveNewPay(scope.row)" type="text" size="small">{{$i.order.cancel}}</el-button>
                            </div>
                            <div v-else>
                                <div v-if="scope.row.status===-1">
                                    <el-button v-if="scope.row.planRefundDt" @click="restorePay(scope.row)" type="text">{{$i.order.restore}}</el-button>
                                </div>
                                <div v-else-if="scope.row.isModify">
                                    <el-button @click="saveModifyPay(scope.row)" type="text" size="small">{{$i.order.save}}</el-button>
                                    <el-button @click="cancelModifyPay(scope.row)" type="text" size="small">{{$i.order.cancel}}</el-button>
                                </div>
                                <div v-else>
                                    <el-button @click="modifyPay(scope.row)" type="text">{{$i.order.modify}}</el-button>
                                    <el-button @click="abandonPay(scope.row)" type="text">{{$i.order.abandon}}</el-button>
                                </div>
                            </div>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div class="title">
            {{$i.order.productInfoBig}}
        </div>
        <v-table
                :totalRow="totalRow"
                code="uorder_sku_list"
                :height="500"
                ref="table"
                :data.sync="productTableData"
                :buttons="isModify?productInfoBtn:productNotModifyBtn"
                @action="productInfoAction"
                :loading='loadingProductTable'
                @change-checked="changeProductChecked"
                native-sort="skuSysCode"
                @change-sort="$refs.table.setSort(productTableData)"
                :rowspan="2"
                :total-row="tableTotal">
            <template slot="header">
                <div class="btns">
                    <el-button :disabled="!isModify" @click="addProduct">{{$i.order.addProduct}}</el-button>
                    <el-button @click="removeProduct" :disabled="selectProductInfoTable.length===0 || !isModify" type="danger">{{$i.order.remove}}</el-button>
                </div>
            </template>
        </v-table>

        <div class="summary">
            <div class="second-title">
                {{$i.order.summary}}
            </div>
            <el-form label-width="280px">
                <el-row class="speZone">
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item :label="$i.order.totalQty">
                            <el-input
                                    class="summaryInput"
                                    size="mini"
                                    v-model="orderForm.totalQty"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item :label="$i.order.skuQtys">
                            <el-input
                                    class="summaryInput"
                                    size="mini"
                                    v-model="orderForm.skuQty"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item :label="$i.order.totalSkuPrice">
                            <el-input
                                    class="summaryInput"
                                    size="mini"
                                    v-model="orderForm.totalSkuPrice"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col class="speCol" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item :label="$i.order.totalOuterCartonQty">
                            <el-input
                                    class="summaryInput"
                                    size="mini"
                                    v-model="orderForm.totalOuterCartonQty"
                                    :disabled="true">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>

        <div class="footBtn">
            <div v-if="hasHandleOrder">
                <div v-if="isModify">
                    <el-button :disabled="loadingPage" :loading="disableClickSend" @click="send" type="primary">{{$i.order.send}}</el-button>
                    <el-button :loading="disableClickCancelModify" @click="cancelModify" type="danger">{{$i.order.cancel}}</el-button>
                </div>
                <div v-else>
                    <el-button
                            v-authorize="'ORDER:DETAIL:MODIFY'"
                            :disabled="loadingPage || disableModify || hasCancelOrder || hasFinishOrder"
                            @click="modifyOrder"
                            type="primary">{{$i.order.modify}}</el-button>
                    <el-button
                            v-authorize="'ORDER:DETAIL:CONFIRM'"
                            :disabled="loadingPage || disableConfirm || hasCancelOrder"
                            @click="confirmOrder"
                            :loading="disableClickConfirm" type="primary">{{$i.order.confirm}}</el-button>
                    <el-button
                            v-authorize="'ORDER:DETAIL:DOWNLOAD'"
                            :disabled="loadingPage"
                            @click="downloadOrder"
                            :loading="disableClickConfirm"
                            type="primary">
                        {{$i.order.download}}
                    </el-button>
                    <el-button
                            v-authorize="'ORDER:DETAIL:DOWNLOAD'"
                            :disabled="loadingPage || hasCancelOrder || hasFinishOrder"
                            @click="refuseOrder"
                            type="danger">{{$i.order.cancelOrder}}</el-button>
                    <el-checkbox :disabled="loadingPage || hasCancelOrder" v-model="markImportant" @change="changeMarkImportant">{{$i.order.markAsImportant}}</el-checkbox>
                </div>
            </div>
            <div v-else>
                <el-button :disabled="loadingPage" :loading="disableClickAccept" @click="acceptOrder" type="primary">{{$i.order.accept}}</el-button>
                <el-button :disabled="loadingPage" :loading="disableClickRefuse" @click="refuseOrder" type="danger">{{$i.order.refuse}}</el-button>
            </div>
        </div>

        <el-dialog
                title=""
                :visible.sync="quickCreateDialogVisible"
                width="70%">
            <v-table
                    :height="400"
                    :loading="loadingTable"
                    :data="tableDataList"
                    :buttons="[{label: this.$i.order.createOrder, type: 1}]"
                    @change-checked="changeChecked"
                    @action="btnClick">
                <template slot="header">
                    <select-search
                            class="search"
                            @inputEnter="searchInquiry"
                            v-model="searchId"
                            :options="searchOptions"></select-search>
                    <!--<div class="btns">-->
                    <!--<el-button>{{$i.warehouse.download}}({{selectList.length?selectList.length:'All'}})</el-button>-->
                    <!--</div>-->
                </template>
            </v-table>
            <page
                    @size-change="changeSize"
                    @change="changePage"
                    :pageSizes="[50,100,200]"
                    :page-data="pageData"></page>
        </el-dialog>

        <el-dialog
                :title="$i.order.addProduct"
                :visible.sync="productTableDialogVisible"
                width="70%">
            <v-product
                    :disabledLine="disabledProductLine"
                    :forceUpdateNumber="updateProduct"
                    :hideBtn="true"
                    :isInModify="true"
                    :type="type1"
                    @handleCancel="handleCancel"
                    @handleOK="handleProductOk"></v-product>
        </el-dialog>

        <v-history-modify
                code="uorder_sku_list"
                @save="saveNegotiate"
                ref="HM">
            <!--<div slot="skuPic" slot-scope="{data}">-->
            <!--<v-upload :limit="20" readonly></v-upload>-->
            <!--</div>-->
            <el-select
                    slot="skuFobCurrency"
                    v-model="data.value"
                    slot-scope="{data}"
                    clearable
                    @change="val => data._isModified=true"
                    :placeholder="$i.order.pleaseChoose">
                <el-option
                        v-for="item in currencyOption"
                        :key="item.id"
                        :label="item.code"
                        :value="item.code">
                </el-option>
            </el-select>
            <el-select
                    slot="skuExwCurrency"
                    v-model="data.value"
                    slot-scope="{data}"
                    clearable
                    @change="val => data._isModified=true"
                    :placeholder="$i.order.pleaseChoose">
                <el-option
                        v-for="item in currencyOption"
                        :key="item.id"
                        :label="item.code"
                        :value="item.code">
                </el-option>
            </el-select>
            <el-select
                    slot="skuCifCurrency"
                    v-model="data.value"
                    slot-scope="{data}"
                    clearable
                    @change="val => data._isModified=true"
                    :placeholder="$i.order.pleaseChoose">
                <el-option
                        v-for="item in currencyOption"
                        :key="item.id"
                        :label="item.code"
                        :value="item.code">
                </el-option>
            </el-select>
            <el-select
                    slot="skuDduCurrency"
                    v-model="data.value"
                    slot-scope="{data}"
                    clearable
                    @change="val => data._isModified=true"
                    :placeholder="$i.order.pleaseChoose">
                <el-option
                        v-for="item in currencyOption"
                        :key="item.id"
                        :label="item.code"
                        :value="item.code">
                </el-option>
            </el-select>
            <el-select
                    slot="skuUnit"
                    v-model="data._value"
                    slot-scope="{data}"
                    clearable
                    @change="val => data._isModified=true"
                    :placeholder="$i.order.pleaseChoose">
                <el-option
                        v-for="item in skuUnitOption"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name">
                </el-option>
            </el-select>
            <el-select
                    slot="skuUnitWeight"
                    v-model="data._value"
                    slot-scope="{data}"
                    clearable
                    @change="val => data._isModified=true"
                    :disabled="true"
                    :placeholder="$i.order.pleaseChoose">
                <el-option
                        v-for="item in weightOption"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name">
                </el-option>
            </el-select>
            <el-select
                    slot="skuUnitLength"
                    v-model="data._value"
                    slot-scope="{data}"
                    clearable
                    @change="val => data._isModified = true"
                    :disabled="true"
                    :placeholder="$i.order.pleaseChoose">
                <el-option
                        v-for="item in lengthOption"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name">
                </el-option>
            </el-select>
            <el-select
                    slot="skuUnitVolume"
                    v-model="data._value"
                    slot-scope="{data}"
                    clearable
                    @change="val => data._isModified=true"
                    :disabled="true"
                    :placeholder="$i.order.pleaseChoose">
                <el-option
                        v-for="item in volumeOption"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name">
                </el-option>
            </el-select>
            <el-select
                    slot="skuExpireUnit"
                    v-model="data._value"
                    slot-scope="{data}"
                    clearable
                    @change="val => data._isModified=true"
                    :placeholder="$i.order.pleaseChoose">
                <el-option
                        v-for="item in expirationDateOption"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name">
                </el-option>
            </el-select>
            <el-select
                    slot="skuSample"
                    v-model="data._value"
                    slot-scope="{data}"
                    clearable
                    @change="val => data._isModified=true"
                    :placeholder="$i.order.pleaseChoose">
                <el-option
                        v-for="item in isNeedSampleOption"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name">
                </el-option>
            </el-select>
            <el-select
                    slot="skuInspectQuarantineCategory"
                    v-model="data._value"
                    slot-scope="{data}"
                    clearable
                    @change="val => data._isModified=true"
                    :placeholder="$i.order.pleaseChoose">
                <el-option
                        v-for="item in quarantineTypeOption"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name">
                </el-option>
            </el-select>
            <el-select
                    slot="skuStatus"
                    :disabled="disableChangeSkuStatus"
                    v-model="data._value"
                    slot-scope="{data}"
                    clearable
                    @change="val=>data._isModifyStatus=true"
                    :placeholder="$i.order.pleaseChoose">
                <el-option
                        v-for="item in skuStatusOption"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name">
                </el-option>
            </el-select>

            <el-input-number
                    class="speNumber spx"
                    :controls="false"
                    slot="skuFobPrice"
                    slot-scope="{data}"
                    @change="val => data._isModified=true"
                    @blur="handlePriceBlur"
                    v-model="data.value"></el-input-number>
            <el-input-number
                    class="speNumber spx"
                    :controls="false"
                    slot="skuExwPrice"
                    slot-scope="{data}"
                    @change="val => data._isModified=true"
                    @blur="handlePriceBlur"
                    v-model="data.value"></el-input-number>
            <el-input-number
                    class="speNumber spx"
                    :controls="false"
                    slot="skuCifPrice"
                    slot-scope="{data}"
                    @change="val => data._isModified=true"
                    @blur="handlePriceBlur"
                    v-model="data.value"></el-input-number>
            <el-input-number
                    class="speNumber spx"
                    :controls="false"
                    slot="skuDduPrice"
                    slot-scope="{data}"
                    @change="val => data._isModified=true"
                    @blur="handlePriceBlur"
                    v-model="data.value"></el-input-number>
            <el-input-number
                    class="speNumber spx"
                    :controls="false"
                    slot="skuQty"
                    slot-scope="{data}"
                    @change="val => data._isModified=true"
                    @blur="handlePriceBlur(data)"
                    v-model="data.value"></el-input-number>
            <el-input-number
                    class="speNumber spx"
                    :controls="false"
                    slot="skuPrice"
                    slot-scope="{data}"
                    :disabled="true"
                    v-model="data.value"></el-input-number>
            <el-input-number
                    :min="0"
                    :max="1"
                    class="speNumber spx"
                    :controls="false"
                    slot="skuRateValueAddedTax"
                    slot-scope="{data}"
                    @change="val => data._isModified=true"
                    v-model="data.value"></el-input-number>
            <el-input-number
                    :min="0"
                    :max="1"
                    class="speNumber spx"
                    :controls="false"
                    slot="skuTaxRefundRate"
                    slot-scope="{data}"
                    @change="val => data._isModified=true"
                    v-model="data.value"></el-input-number>
            <el-input-number
                    :min="0"
                    class="speNumber spx"
                    :controls="false"
                    slot="skuLength"
                    slot-scope="{data}"
                    @change="val => data._isModified=true"
                    v-model="data.value"></el-input-number>
            <el-input-number
                    :min="0"
                    class="speNumber spx"
                    :controls="false"
                    slot="skuWidth"
                    slot-scope="{data}"
                    @change="val => data._isModified=true"
                    v-model="data.value"></el-input-number>
            <el-input-number
                    :min="0"
                    class="speNumber spx"
                    :controls="false"
                    slot="skuHeight"
                    slot-scope="{data}"
                    @change="val => data._isModified=true"
                    v-model="data.value"></el-input-number>
            <el-input-number
                    :min="0"
                    class="speNumber spx"
                    :controls="false"
                    slot="skuNetWeight"
                    slot-scope="{data}"
                    @change="val => data._isModified=true"
                    v-model="data.value"></el-input-number>
            <el-input-number
                    :min="0"
                    class="speNumber spx"
                    :controls="false"
                    slot="skuVolume"
                    slot-scope="{data}"
                    @change="val => data._isModified=true"
                    v-model="data.value"></el-input-number>
            <el-input-number
                    :min="0"
                    class="speNumber spx"
                    :controls="false"
                    slot="skuInnerCartonQty"
                    slot-scope="{data}"
                    @change="val => data._isModified=true"
                    v-model="data.value"></el-input-number>
            <el-input-number
                    :min="0"
                    class="speNumber spx"
                    :controls="false"
                    @change="val => data._isModified=true"
                    slot="skuInnerCartonLength"
                    slot-scope="{data}"
                    v-model="data.value"></el-input-number>
            <el-input-number
                    :min="0"
                    class="speNumber spx"
                    :controls="false"
                    @change="val => data._isModified=true"
                    slot="skuInnerCartonWidth"
                    slot-scope="{data}"
                    v-model="data.value"></el-input-number>
            <el-input-number
                    :min="0"
                    class="speNumber spx"
                    :controls="false"
                    @change="val => data._isModified=true"
                    slot="skuInnerCartonHeight"
                    slot-scope="{data}"
                    v-model="data.value"></el-input-number>
            <el-input-number
                    :min="0"
                    class="speNumber spx"
                    :controls="false"
                    @change="val => data._isModified=true"
                    slot="skuInnerCartonWeightNet"
                    slot-scope="{data}"
                    v-model="data.value"></el-input-number>
            <el-input-number
                    :min="0"
                    class="speNumber spx"
                    :controls="false"
                    @change="val => data._isModified=true"
                    slot="skuInnerCartonRoughWeight"
                    slot-scope="{data}"
                    v-model="data.value"></el-input-number>
            <el-input-number
                    :min="0"
                    class="speNumber spx"
                    :controls="false"
                    slot="skuInnerCartonVolume"
                    slot-scope="{data}"
                    @change="val => data._isModified=true"
                    v-model="data.value"></el-input-number>
            <el-input-number
                    :min="0"
                    class="speNumber spx"
                    :controls="false"
                    slot="skuInnerCartonOuterNum"
                    slot-scope="{data}"
                    @change="val => data._isModified=true"
                    v-model="data.value"></el-input-number>
            <el-input-number
                    :min="0"
                    class="speNumber spx"
                    :controls="false"
                    slot="skuOuterCartonQty"
                    slot-scope="{data}"
                    @change="val => data._isModified=true"
                    v-model="data.value"></el-input-number>
            <el-input-number
                    :min="0"
                    class="speNumber spx"
                    :controls="false"
                    @change="val => data._isModified=true"
                    slot="skuOuterCartonLength"
                    slot-scope="{data}"
                    v-model="data.value"></el-input-number>
            <el-input-number
                    :min="0"
                    class="speNumber spx"
                    :controls="false"
                    @change="val => data._isModified=true"
                    slot="skuOuterCartonWidth"
                    slot-scope="{data}"
                    v-model="data.value"></el-input-number>
            <el-input-number
                    :min="0"
                    class="speNumber spx"
                    :controls="false"
                    @change="val => data._isModified=true"
                    slot="skuOuterCartonHeight"
                    slot-scope="{data}"
                    v-model="data.value"></el-input-number>
            <el-input-number
                    :min="0"
                    class="speNumber spx"
                    :controls="false"
                    @change="val => data._isModified=true"
                    slot="skuOuterCartonNetWeight"
                    slot-scope="{data}"
                    v-model="data.value"></el-input-number>
            <el-input-number
                    :min="0"
                    class="speNumber spx"
                    :controls="false"
                    @change="val => data._isModified=true"
                    slot="skuOuterCartonRoughWeight"
                    slot-scope="{data}"
                    v-model="data.value"></el-input-number>
            <el-input-number
                    :min="0"
                    class="speNumber spx"
                    :controls="false"
                    @change="val => data._isModified=true"
                    slot="skuOuterCartonVolume"
                    slot-scope="{data}"
                    v-model="data.value"></el-input-number>
            <el-input-number
                    :min="0"
                    class="speNumber spx"
                    :controls="false"
                    @change="val => data._isModified=true"
                    slot="skuApplicableAge"
                    slot-scope="{data}"
                    v-model="data.value"></el-input-number>
            <el-input-number
                    :min="0"
                    class="speNumber spx"
                    :controls="false"
                    @change="val => data._isModified=true"
                    slot="skuExpireDates"
                    slot-scope="{data}"
                    v-model="data.value"></el-input-number>
            <el-input-number
                    :min="0"
                    class="speNumber spx"
                    :controls="false"
                    @change="val => data._isModified=true"
                    slot="skuSampleQty"
                    slot-scope="{data}"
                    v-model="data.value"></el-input-number>
            <el-input-number
                    :min="0"
                    class="speNumber spx"
                    :controls="false"
                    @change="val => data._isModified=true"
                    slot="skuSamplePrice"
                    slot-scope="{data}"
                    v-model="data.value"></el-input-number>
            <el-input-number
                    :min="0"
                    class="speNumber spx"
                    :controls="false"
                    @change="val => data._isModified=true"
                    slot="skuDeliveryDates"
                    slot-scope="{data}"
                    v-model="data.value"></el-input-number>
        </v-history-modify>

        <v-message-board @send="afterSend" :readonly="orderForm.status==='5'" module="order" code="detail" :id="$route.query.orderId"></v-message-board>
    </div>
</template>

<script>

    import {VTable,VPagination,selectSearch,VUpload,VHistoryModify,VMessageBoard} from '@/components/index'
    import VProduct from '@/views/product/addProduct';
    import {mapActions} from 'vuex'

    export default {
        name: "createOrder",
        components:{
            VTable,
            page:VPagination,
            selectSearch,
            VUpload,
            VProduct,
            VHistoryModify,
            VMessageBoard
        },
        data(){
            return{
                options:[],
                /**
                 * 字典配置
                 * */
                currencyOption:[],
                supplierOption:[],
                incotermOption:[],
                paymentOption:[],
                paymentStatusOption:[],
                transportOption:[],
                skuUnitOption:[],
                lengthOption:[],
                weightOption:[],
                volumeOption:[],
                expirationDateOption:[],
                isNeedSampleOption:[],
                orderStatusOption:[],
                countryOption:[],
                quarantineTypeOption:[],
                skuSaleStatusOption:[],
                skuStatusTotalOption:[],


                /**
                 * 底部按钮禁用状态
                 * */
                disableModify:false,
                markImportant:false,
                disableConfirm:false,
                disableClickRefuse:false,
                disableClickAccept:false,
                disableClickConfirm:false,
                hasFinishOrder:false,

                /**
                 * 页面基础配置
                 * */
                hasHandleOrder:false,       //该订单是否接单,默认为false
                hasCancelOrder:false,
                isModify:false,     //是否在modify状态
                disabledLcNo:true,
                allowQuery:0,
                loadingPage:false,
                disableClickSend:false,
                disableClickCancelModify:false,
                disableClickSaveDraft:false,
                labelPosition:'right',
                pickerOptions1: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                },
                quickCreateDialogVisible:false,
                tableData:[],
                selectSearch:'',
                productInfoBtn:[
                    {
                        label: 'Negotiate',
                        type: 'negotiate'
                    },
                    {
                        label: 'History',
                        type: 'history'
                    },
                    {
                        label: 'Detail',
                        type: 'detail'
                    }
                ],
                productNotModifyBtn:[
                    {
                        label: 'History',
                        type: 'history'
                    },
                    {
                        label: 'Detail',
                        type: 'detail'
                    }
                ],
                loadingProductTable:false,
                tableTotal:[],
                activeTab:'product',
                selectProductInfoTable:[],
                disabledProductLine:[],
                datePickOption:{
                    disabledDate(time) {
                        return time.getTime() < Date.now();
                    },
                },
                datePickOption1:{
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                },
                chooseProduct:{},
                savedIncoterm:'',           //用来存储incoterm
                disableChangeSkuStatus:false,
                initialData:{},


                /**
                 * payment 配置
                 * */
                loadingPaymentTable:false,
                disableClickPayback:false,
                disableRemind:false,
                paymentData:[],
                copyList:[],

                /**
                 * 弹出框data配置
                 * */
                pageData:{},
                loadingTable:false,
                tableDataList:[],
                searchOptions:[
                    {
                        label:'inquiryNo',
                        id:1
                    },
                ],
                searchId:1,
                inquiryConfig:{
                    inquiryNo: '',
                    operatorFilters: [],
                    pn: 1,
                    ps: 50,
                    sorts: [],
                },

                /**
                 * 选择产品弹出框data
                 * */
                productTableDialogVisible:false,
                type1:'product',
                type2:'bookmark',
                updateProduct:0,
                updateBookmark:0,
                productTableData:[],

                /**
                 * 提交的数据
                 * */
                orderForm:{
                    supplierCompanyId:'',
                    actDeliveryDt: "",
                    archive: true,
                    attachments: [],
                    basicFlag:false,     //basicInfo是否修改
                    currency: "",
                    customerAgreementDt: "",
                    customerAgreementNo: "",
                    // customerName: "string",
                    // customerNo: "string",
                    customerOrderNo: "",
                    deliveredQty: 0,
                    deliveryDt: "",
                    departureCountry: "",
                    departurePort: "",
                    destCountry: "",
                    destPort: "",
                    draftCustomer: false,       //saveAsDraft的时候为true
                    // draftSupplier: true,
                    // entryDt: "2018-06-01T01:37:58.742Z",
                    exchangeRateList: [
                        {
                            currency: "CNYUSD",
                            // exchangeRate: '124'
                        },
                        {
                            currency: "CNYEUR",
                            // exchangeRate: ''
                        },
                        {
                            currency: "USDEUR",
                            // exchangeRate: ''
                        },
                        {
                            currency: "USDCNY",
                            // exchangeRate: ''
                        },
                        {
                            currency: "EURCNY",
                            // exchangeRate: ''
                        },
                        {
                            currency: "EURUSD",
                            // exchangeRate: ''
                        }
                    ],
                    fieldRemark: {
                        // additionalProp1: "string",
                        // additionalProp2: "string",
                        // additionalProp3: "string"
                    },
                    fieldUpdate: {
                        // additionalProp1: "string",
                        // additionalProp2: "string",
                        // additionalProp3: "string"
                    },
                    // importantCustomer: true,
                    // importantSupplier: true,
                    incoterm: '',
                    incotermArea: "",
                    lcNo: "",
                    orderNo: "",
                    orderSkuUpdateList:[],
                    payment: "",
                    paymentDays: 0,
                    productFlag:false,
                    // paymentRemark: "",
                    // paymentStatus: "",
                    quotationNo: "",
                    remark: "",
                    remind: true,
                    responsibilityFlag:false,
                    responsibilityList: [
                        // {
                        //     type: '0',
                        //     customer: '',
                        //     supplier: '',
                        //     remark: '',
                        //     actualDt: '',
                        //     orderNo:''
                        // },
                        // {
                        //     type: '1',
                        //     customer: '',
                        //     supplier: '',
                        //     remark: '',
                        //     actualDt: '',
                        //     orderNo:''
                        // },
                        // {
                        //     type: '2',
                        //     customer: '',
                        //     supplier: '',
                        //     remark: '',
                        //     actualDt: '',
                        //     orderNo:''
                        // },
                        // {
                        //     type: '3',
                        //     customer: '',
                        //     supplier: '',
                        //     remark: '',
                        //     actualDt: '',
                        //     orderNo:''
                        // },
                        // {
                        //     type: '4',
                        //     customer: '',
                        //     supplier: '',
                        //     remark: '',
                        //     actualDt: '',
                        //     orderNo:''
                        // },
                        // {
                        //     type: '5',
                        //     customer: '',
                        //     supplier: '',
                        //     remark: '',
                        //     actualDt: '',
                        //     orderNo:''
                        // },
                    ],
                    skuList: [],
                    // skuQty: 0,
                    // skuSupplierName: "",
                    // status: "",
                    supplierCode: "",
                    supplierId: 0,
                    supplierName: "",
                    supplierOrderNo: "",
                    // timeZone: "",
                    transport: '1',
                },
            }
        },
        computed:{
            totalRow(){
                let obj={};
                let arr=[];
                _.map(this.productTableData,v=>{
                    if(!v._remark){
                        arr.push(v);
                    }
                });
                let sameCurrency=true;
                if(this.orderForm.incoterm==='1'){
                    let size=new Set(arr.map(e => e.skuFobCurrency).map(e => e.value));
                    if([...size].length>1) sameCurrency=false;
                }else if(this.orderForm.incoterm==='2'){
                    let size=new Set(arr.map(e => e.skuExwCurrency).map(e => e.value));
                    if([...size].length>1) sameCurrency=false;
                }else if(this.orderForm.incoterm==='3'){
                    let size=new Set(arr.map(e => e.skuCifCurrency).map(e => e.value));
                    if([...size].length>1) sameCurrency=false;
                }else if(this.orderForm.incoterm==='4'){
                    let size=new Set(arr.map(e => e.skuDduCurrency).map(e => e.value));
                    if([...size].length>1) sameCurrency=false;
                }
                if(this.productTableData.length<=0){
                    return;
                }
                _.map(this.productTableData,v=>  {
                    _.mapObject(v,(item,key)=>{
                        if(item._calculate){
                            if(key==='skuPrice'){
                                if(sameCurrency){
                                    obj[key]={
                                        value: Number(item.value)  + (Number(obj[key] ? obj[key].value : 0) || 0),
                                    };
                                }else{
                                    obj[key] = {
                                        value: '-'
                                    };
                                }
                            }else{
                                obj[key]={
                                    value: Number(item.value)  + (Number(obj[key] ? obj[key].value : 0) || 0),
                                };
                            }
                        }else{
                            obj[key] = {
                                value: ''
                            };
                        }
                    })
                });
                return [obj];
            },
        },
        methods:{
            ...mapActions(['setMenuLink']),
            /**
             * 获取页面数据
             * */
            getUnit(){
                // this.$ajax.get(this.$apis.get_allUnit).then(res=>{
                //     console.log(res)
                // });
                //获取币种
                this.$ajax.get(this.$apis.CURRENCY_ALL,{}).then(res=>{
                    this.currencyOption=res;
                    this.allowQuery++;
                })
                    .finally(err=> {

                        }
                    );

                //获取国家
                this.$ajax.get(this.$apis.COUNTRY_ALL,{},{cache:true}).then(res=>{
                    this.countryOption=res;
                }).finally(err=>{

                });


                //获取汇率
                this.$ajax.get(this.$apis.CUSTOMERCURRENCYEXCHANGERATE_QUERY,{}).then(res=>{
                    this.allowQuery++;
                    _.map(this.orderForm.exchangeRateList,v=>{
                        _.map(res,m=>{
                            if(v.currency===m.symbol){
                                v.exchangeRate=m.price;
                            }
                        })
                    })
                }).finally(err=>{

                });

                this.skuStatusOption=[
                    {
                        code:'PROCESS',
                        name:'已确认'
                    },
                    {
                        code:'CANCLED',
                        name:'已取消'
                    },
                ];


                this.$ajax.post(this.$apis.get_partUnit,['PMT','ITM','MD_TN','SKU_UNIT','LH_UNIT','VE_UNIT','WT_UNIT','ED_UNIT','NS_IS','QUARANTINE_TYPE','ORDER_STATUS','SKU_SALE_STATUS','SKU_STATUS']).then(res=>{
                    this.allowQuery++;
                    res.forEach(v=>{
                        if(v.code==='ITM'){
                            this.incotermOption=v.codes;
                        }else if(v.code==='PMT'){
                            this.paymentOption=v.codes;
                        }else if(v.code==='MD_TN'){
                            this.transportOption=v.codes;
                        }else if(v.code==='SKU_UNIT'){
                            this.skuUnitOption=v.codes;
                        }else if(v.code==='LH_UNIT'){
                            this.lengthOption=v.codes;
                        }else if(v.code==='WT_UNIT'){
                            this.weightOption=v.codes;
                        }else if(v.code==='VE_UNIT'){
                            this.volumeOption=v.codes;
                        }else if(v.code==='ED_UNIT'){
                            this.expirationDateOption=v.codes;
                        }else if(v.code==='NS_IS'){
                            this.isNeedSampleOption=v.codes;
                        }else if(v.code==='ORDER_STATUS'){
                            this.orderStatusOption=v.codes;
                        }else if(v.code==='QUARANTINE_TYPE'){
                            this.quarantineTypeOption=v.codes;
                        }else if(v.code==='SKU_SALE_STATUS'){
                            this.skuSaleStatusOption=v.codes;
                        }else if(v.code==='SKU_STATUS'){
                            this.skuStatusTotalOption=v.codes;
                        }
                    })
                }).finally(err=>{

                });
                let ids=this.$route.query.ids;
                if(!ids){
                    return;
                }
                ids=ids.slice(0,ids.length-1);
                this.loadingProductTable=true;
                this.$ajax.post(this.$apis.ORDER_SKUS,ids.split(',')).then(res=>{
                    let data=this.$getDB(this.$db.order.productInfoTable,this.$refs.HM.getFilterData(res, 'skuSysCode'),item=>{
                        if(item._remark){
                            item.label.value=this.$i.order.remarks;
                            if(item.skuPictures){
                                item.skuPictures._image=false;
                            }
                            item.skuLabelPic._image=false;
                            item.skuPkgMethodPic._image=false;
                            item.skuInnerCartonPic._image=false;
                            item.skuOuterCartonPic._image=false;
                            item.skuAdditionalOne._image=false;
                            item.skuAdditionalTwo._image=false;
                            item.skuAdditionalThree._image=false;
                            item.skuAdditionalFour._image=false;
                        }
                        else{
                            item.label.value=this.$dateFormat(item.entryDt.value,'yyyy-mm-dd');
                            item.skuSample._value=item.skuSample.value?'YES':'NO';
                            item.skuSample.value=item.skuSample.value?'1':'0';
                            item.skuUnit._value=item.skuUnit?this.$change(this.skuUnitOption,'skuUnit',item,true).name:'';
                            item.skuUnitWeight._value=item.skuUnitWeight?this.$change(this.weightOption,'skuUnitWeight',item,true).name:'';
                            item.skuUnitLength._value=item.skuUnitLength?this.$change(this.lengthOption,'skuUnitLength',item,true).name:'';
                            item.skuExpireUnit._value=item.skuExpireUnit?this.$change(this.expirationDateOption,'skuExpireUnit',item,true).name:'';
                            item.skuStatus._value=item.skuStatus?_.findWhere(this.skuStatusTotalOption,{code:item.skuStatus.value}).name:'';
                            item.skuUnitVolume._value=item.skuUnitVolume?this.$change(this.volumeOption,'skuUnitVolume',item,true).name:'';
                            item.skuSaleStatus._value=item.skuSaleStatus?this.$change(this.skuSaleStatusOption,'skuSaleStatus',item,true).name:'';
                            if(item.skuCategoryId.value){
                                item.skuCategoryId._value=_.findWhere(this.category,{id:item.skuCategoryId.value}).name;
                            }
                            item.skuInspectQuarantineCategory._value=item.skuInspectQuarantineCategory.value?_.findWhere(this.quarantineTypeOption,{code:item.skuInspectQuarantineCategory.value}).name:'';
                        }
                    });
                    _.map(data,v=>{
                        this.productTableData.push(v);
                    });
                }).finally(err=>{
                    this.loadingProductTable=false;
                });
            },
            getDetail(e){
                this.loadingPage=true;
                this.$ajax.post(this.$apis.ORDER_DETAIL,{
                    orderId:this.$route.query.orderId,
                    orderNo:this.$route.query.orderNo || this.$route.query.code
                }).then(res=>{
                    this.orderForm=res;
                    /**
                     * 高亮处理
                     * */
                    _.map(this.$db.order.orderDetail,v=>{
                        v._isModified=false;
                    });
                    _.map(this.orderForm.fieldUpdate,(v,k)=>{
                        this.$db.order.orderDetail[k]._isModified=true;
                    });
                    this.orderForm.fieldUpdate={};
                    _.map(this.orderForm.responsibilityList,v=>{
                        v.fieldUpdates=v.fieldUpdate;
                        v.fieldUpdate={};
                    });

                    this.initialData=this.$depthClone(this.orderForm)
                    this.savedIncoterm=Object.assign({},res).incoterm;
                    _.map(this.supplierOption,v=>{
                        if(v.code===res.supplierCode){
                            this.orderForm.supplierName=v.id;
                        }
                    });
                    this.changePayment(res.payment);
                    let data=this.$getDB(this.$db.order.productInfoTable,this.$refs.HM.getFilterData(res.skuList, 'skuSysCode'),item=>{
                        if(item._remark){
                            item.label.value=this.$i.order.remarks;
                            if(item.skuPictures){
                                item.skuPictures._image=false;
                            }
                            item.skuLabelPic._image=false;
                            item.skuPkgMethodPic._image=false;
                            item.skuInnerCartonPic._image=false;
                            item.skuOuterCartonPic._image=false;
                            item.skuAdditionalOne._image=false;
                            item.skuAdditionalTwo._image=false;
                            item.skuAdditionalThree._image=false;
                            item.skuAdditionalFour._image=false;
                        }
                        else{
                            item.label.value=this.$dateFormat(item.entryDt.value,'yyyy-mm-dd');
                            item.skuSample._value=item.skuSample.value?'YES':'NO';
                            item.skuSample.value=item.skuSample.value?'1':'0';
                            item.skuUnit._value=item.skuUnit?this.$change(this.skuUnitOption,'skuUnit',item,true).name:'';
                            item.skuUnitWeight._value=item.skuUnitWeight?this.$change(this.weightOption,'skuUnitWeight',item,true).name:'';
                            item.skuUnitLength._value=item.skuUnitLength?this.$change(this.lengthOption,'skuUnitLength',item,true).name:'';
                            item.skuExpireUnit._value=item.skuExpireUnit?this.$change(this.expirationDateOption,'skuExpireUnit',item,true).name:'';
                            item.skuStatus._value=item.skuStatus?_.findWhere(this.skuStatusTotalOption,{code:item.skuStatus.value}).name:'';
                            item.skuUnitVolume._value=item.skuUnitVolume?this.$change(this.volumeOption,'skuUnitVolume',item,true).name:'';
                            item.skuSaleStatus._value=item.skuSaleStatus?this.$change(this.skuSaleStatusOption,'skuSaleStatus',item,true).name:'';
                            if(item.skuCategoryId.value){
                                item.skuCategoryId._value=_.findWhere(this.category,{id:item.skuCategoryId.value}).name;
                            }
                            item.skuInspectQuarantineCategory._value=item.skuInspectQuarantineCategory?this.$change(this.quarantineTypeOption,'skuInspectQuarantineCategory',item,true).name:'';
                            item.skuInspectQuarantineCategory._value=item.skuInspectQuarantineCategory.value?_.findWhere(this.quarantineTypeOption,{code:item.skuInspectQuarantineCategory.value}).name:'';
                        }
                    });
                    this.productTableData=[];
                    _.map(data,v=>{
                        this.productTableData.push(v);
                    });
                    _.map(this.productTableData,v=>{
                        if(v.fieldUpdate.value){
                            _.map(v.fieldUpdate.value,(value,key)=>{
                                if(key!=='skuPictures'){
                                    v[key]._style={'backgroundColor':'yellow'};
                                }
                            })
                            v.fieldUpdate.value={};
                        }
                    });
                    this.markImportant=this.orderForm.importantSupplier;

                    //判断底部按钮能不能点
                    if(res.status!=='1' && res.status!=='3' && res.status!=='4'){
                        this.disableModify=true;
                    }else{
                        this.disableModify=false;
                    }
                    if(res.status!=='1'){
                        this.disableConfirm=true;
                    }else{
                        this.disableConfirm=false;
                    }
                    if(this.orderForm.status==='1' && !this.orderForm.supplierUserId){
                        this.hasHandleOrder=false;
                    }else{
                        this.hasHandleOrder=true;
                    }
                    if(res.status==='4'){
                        this.hasFinishOrder=true;
                    }else{
                        this.hasFinishOrder=false;
                    }
                    //代表订单被取消了
                    if(this.orderForm.status==='5'){
                        this.hasCancelOrder=true;
                    }

                    //情况选中的product
                    this.selectProductInfoTable=[];

                    /**
                     * 获取payment数据
                     * */
                    this.getPaymentData();
                }).finally(err=>{
                    this.loadingPage=false;
                    this.disableClickCancelModify=false;
                    if(e){
                        this.isModify=false;
                    }
                });
            },
            send(){
                let params=Object.assign({},this.orderForm);
                _.map(this.supplierOption,v=>{
                    if(params.supplierCode===v.code){
                        params.supplierName=v.name;
                        params.supplierCode=v.code;
                        params.supplierId=v.id;
                        params.supplierCompanyId=v.companyId;
                    }
                });
                let orderSkuUpdateList=[];
                _.map(this.productTableData,item=>{
                    let isModify=false,isModifyStatus=false;
                    _.map(item,(val,index)=>{
                        if(val._isModified){
                            isModify=true;
                        }
                        if(val._isModifyStatus){
                            isModifyStatus=true;
                        }

                    });
                    if(isModify || isModifyStatus){
                        let isIn=false;
                        _.map(orderSkuUpdateList,data=>{
                            if(data.skuId===item.skuId.value){
                                data.skuInfo=isModify;
                                data.skuStatus=isModifyStatus;
                                isIn=true;
                            }
                        });
                        if(!isIn){
                            orderSkuUpdateList.push({
                                skuId:item.skuId.value,
                                skuInfo:isModify,
                                skuStatus:isModifyStatus
                            });
                        }
                    }
                    if(!item._remark){
                        _.map(item,(v,k)=>{
                            if(v._isModified){
                                if(!item.fieldUpdate.value){
                                    item.fieldUpdate.value={};
                                }
                                item.fieldUpdate.value[k]='';
                            }
                        })
                    }
                });
                params.orderSkuUpdateList=orderSkuUpdateList;
                params.skuList=this.dataFilter(this.productTableData);

                _.map(params.skuList,v=>{
                    v.skuSample=v.skuSample==='1'?true:false;
                    if(v.skuInspectQuarantineCategory){
                        v.skuInspectQuarantineCategory=_.findWhere(this.quarantineTypeOption,{code:v.skuInspectQuarantineCategory}).code;
                    }
                    let picKey=['skuLabelPic','skuPkgMethodPic','skuInnerCartonPic','skuOuterCartonPic','skuAdditionalOne','skuAdditionalTwo','skuAdditionalThree','skuAdditionalFour'];
                    _.map(picKey, item => {
                        if (_.isArray(v[item])) {
                            v[item] = (v[item][0] ? v[item][0] : null);
                        }else if(_.isString(v[item])){
                            let key=this.$getOssKey(v[item],true);
                            v[item]=key[0];
                        }
                    });
                });
                // return console.log(this.$depthClone(params.skuList),'params.skuList')
                params.attachments=this.$refs.upload[0].getFiles();
                this.disableClickSend=true;
                this.$ajax.post(this.$apis.ORDER_UPDATE,params).then(res=>{
                    this.isModify=false;
                    this.getDetail();
                }).finally(err=>{
                    this.disableClickSend=false;
                });
            },
            saveAsDraft(){
                let params=Object.assign({},this.orderForm);
                _.map(this.supplierOption,v=>{
                    if(params.supplierName===v.code){
                        params.supplierName=v.name;
                        params.supplierCode=v.code;
                        params.supplierId=v.id;
                    }
                });
                params.skuList=this.dataFilter(this.productTableData);
                _.map(params.skuList,v=>{
                    if(_.isArray(v.skuLabelPic)){
                        v.skuLabelPic=(v.skuLabelPic[0]?v.skuLabelPic[0]:null);
                    }
                });
                params.attachments=this.$refs.upload[0].getFiles();
                params.draftCustomer=true;
                this.disableClickSaveDraft=true;
                this.$ajax.post(this.$apis.ORDER_SAVE,params).then(res=>{
                    this.$router.push('/order/overview');
                }).finally(err=>{
                    this.disableClickSaveDraft=false;
                });
            },
            getOrderNo(){
                this.getSupplier();
            },
            getSupplier(){
                this.loadingPage=true;
                this.$ajax.get(this.$apis.PURCHASE_SUPPLIER_LIST_SUPPLIER_BY_NAME,{
                    name:''
                }).then(res=>{
                    this.supplierOption=res;
                    if(this.$route.query.supplierCode){
                        _.map(this.supplierOption,v=>{
                            if(v.code===this.$route.query.supplierCode){
                                this.orderForm.supplierName=v.id;
                            }
                        });
                    }
                    this.getUnit();
                }).catch(err=>{
                    // this.loadingPage=false;
                })
            },
            quickCreate(){
                this.quickCreateDialogVisible=true;
                this.getInquiryData();
            },
            getInquiryData(){
                this.loadingTable=true;
                this.$ajax.post(this.$apis.INQUIERY_LIST,this.inquiryConfig).then(res=>{
                    this.tableDataList = this.$getDB(this.$db.order.inquiryOverview, res.datas);
                    this.pageData=res;
                }).finally(err=>{
                    this.loadingTable=false;
                });
            },
            changePayment(e,key){
                if(!e){
                    return;
                }
                let name=_.findWhere(this.paymentOption,{code:e}).name;
                if(name!=='L/C'){
                    this.disabledLcNo=true;
                    this.orderForm.lcNo='';
                }else{
                    this.disabledLcNo=false;
                }
                if(key){
                    if (!this.orderForm.fieldUpdate) {
                        this.orderForm.fieldUpdate = {};
                    }
                    this.orderForm.fieldUpdate[key] = "";
                }
            },

            /**
             * basic info事件
             * */
            handleChange(key) {
                if (!this.orderForm.fieldUpdate) {
                    this.orderForm.fieldUpdate = {};
                }
                this.orderForm.fieldUpdate[key] = "";
            },

            /**
             * responsibility事件
             * */
            handleResponsibilityChange(data,key){
                if(!data.fieldUpdate){
                    data.fieldUpdate={};
                }
                data.fieldUpdate[key]='';
            },

            /**
             * product info事件
             * */
            productInfoAction(e,type){
                if(type==='negotiate'){
                    if(e._isNew){
                        this.disableChangeSkuStatus=true;
                    }else{
                        this.disableChangeSkuStatus=false;
                    }
                    let arr=[];
                    _.map(this.productTableData,v=>{
                        if(Number(v.skuSysCode.value)===Number(e.skuSysCode.value)){
                            if(!v._remark){
                                this.chooseProduct=v;
                                this.handlePriceBlur({},v);
                            }
                            arr.push(v);
                        }
                    });
                    if(this.$refs.uploadSkuLabelPic){
                        this.$refs.uploadSkuLabelPic.reset();
                    }
                    if(this.$refs.uploadSkuPkgMethodPic){
                        this.$refs.uploadSkuPkgMethodPic.reset();
                    }
                    if(this.$refs.uploadSkuInnerCartonPic){
                        this.$refs.uploadSkuInnerCartonPic.reset();
                    }
                    if(this.$refs.uploadSkuOuterCartonPic){
                        this.$refs.uploadSkuOuterCartonPic.reset();
                    }
                    if(this.$refs.uploadSkuAdditionalOne){
                        this.$refs.uploadSkuAdditionalOne.reset();
                    }
                    if(this.$refs.uploadSkuAdditionalTwo){
                        this.$refs.uploadSkuAdditionalTwo.reset();
                    }
                    if(this.$refs.uploadSkuAdditionalThree){
                        this.$refs.uploadSkuAdditionalThree.reset();
                    }
                    if(this.$refs.uploadSkuAdditionalFour){
                        this.$refs.uploadSkuAdditionalFour.reset();
                    }
                    this.chooseProduct=this.$refs.HM.init(arr, []);
                }else if(type==='detail'){
                    this.$windowOpen({
                        url:'/product/detail',
                        params:{
                            id:e.skuId.value
                        }
                    })
                }else if(type==='history'){
                    let param={
                        operatorFilters: [],
                        orderId: this.$route.query.orderId,
                        pn: 1,
                        ps: 50,
                        skuId: e.skuId.value,
                        sorts: [],
                    };
                    let data=_.filter(this.productTableData, (m) =>
                        m.skuSysCode.value === e.skuSysCode.value
                    );
                    console.log(param)
                    this.$ajax.post(this.$apis.ORDER_HISTORY,param).then(res=>{
                        let arr=[];
                        _.map(res.datas,v=>{
                            arr.push(JSON.parse(v.history));
                        });
                        this.$refs.HM.init(data,this.$getDB(this.$db.order.productInfoTable,this.$refs.HM.getFilterData(arr, 'skuSysCode')),false);
                    }).finally(()=>{

                    })
                }
            },
            changeProductChecked(e){
                this.selectProductInfoTable=e;
            },
            addProduct(){
                this.disabledProductLine=this.$copyArr(this.productTableData);
                // this.disabledProductLine=_.uniq(_.pluck(_.pluck(this.productTableData, 'skuId'), 'value'));
                this.productTableDialogVisible=true;
                this.activeTab='product';
                this.updateProduct=Math.random();
            },
            removeProduct(){
                this.$confirm(this.$i.order.sureDelete, this.$i.order.prompt, {
                    confirmButtonText: this.$i.order.sure,
                    cancelButtonText: this.$i.order.cancel,
                    type: 'warning'
                }).then(() => {
                    let sysCodes=_.uniq(_.pluck(_.pluck(this.selectProductInfoTable, 'skuSysCode'), 'value'));
                    console.log(this.selectProductInfoTable,'this.selectProductInfoTable')
                    let arr=[];
                    _.map(this.productTableData,v=>{
                        _.map(sysCodes,m=>{
                            if(v.skuSysCode.value===m){
                                arr.push(v);
                            }
                        });
                    });
                    this.productTableData=_.difference(this.productTableData, arr);
                    this.selectProductInfoTable=[];
                    this.$message({
                        type: 'success',
                        message: this.$i.order.deleteSuccess
                    });
                }).catch(() => {

                });
            },
            handleClick(tab){
                if(tab.index==='0'){
                    this.updateProduct=Math.random();
                }else if(tab.index==='1'){
                    this.updateBookmark=Math.random();
                }
            },
            handleProductOk(e){
                this.loadingProductTable=true;
                this.productTableDialogVisible=false;
                this.$ajax.post(this.$apis.ORDER_SKUS,e).then(res=>{
                    _.map(res,v=>{
                        v.skuStatus='TBC';
                    })
                    let data=this.$getDB(this.$db.order.productInfoTable,this.$refs.HM.getFilterData(res, 'skuSysCode'),item=>{
                        item._isNew=true;
                        if(item._remark){
                            item.label.value=this.$i.order.remarks;
                            if(item.skuPictures){
                                item.skuPictures._image=false;
                            }
                            item.skuLabelPic._image=false;
                            item.skuPkgMethodPic._image=false;
                            item.skuInnerCartonPic._image=false;
                            item.skuOuterCartonPic._image=false;
                            item.skuAdditionalOne._image=false;
                            item.skuAdditionalTwo._image=false;
                            item.skuAdditionalThree._image=false;
                            item.skuAdditionalFour._image=false;
                        }
                        else{
                            item.label.value=this.$dateFormat(item.entryDt.value,'yyyy-mm-dd');
                            item.skuSample._value=item.skuSample.value?'YES':'NO';
                            item.skuSample.value=item.skuSample.value?'1':'0';
                            item.skuUnit._value=item.skuUnit?this.$change(this.skuUnitOption,'skuUnit',item,true).name:'';
                            item.skuUnitWeight._value=item.skuUnitWeight?this.$change(this.weightOption,'skuUnitWeight',item,true).name:'';
                            item.skuUnitLength._value=item.skuUnitLength?this.$change(this.lengthOption,'skuUnitLength',item,true).name:'';
                            item.skuExpireUnit._value=item.skuExpireUnit?this.$change(this.expirationDateOption,'skuExpireUnit',item,true).name:'';
                            item.skuStatus._value=item.skuStatus?_.findWhere(this.skuStatusTotalOption,{code:item.skuStatus.value}).name:'';
                            item.skuUnitVolume._value=item.skuUnitVolume?this.$change(this.volumeOption,'skuUnitVolume',item,true).name:'';
                            item.skuSaleStatus._value=item.skuSaleStatus?this.$change(this.skuSaleStatusOption,'skuSaleStatus',item,true).name:'';
                            if(item.skuCategoryId.value){
                                item.skuCategoryId._value=_.findWhere(this.category,{id:item.skuCategoryId.value}).name;
                            }
                            item.skuInspectQuarantineCategory._value=item.skuInspectQuarantineCategory.value?_.findWhere(this.quarantineTypeOption,{code:item.skuInspectQuarantineCategory.value}).name:'';
                        }
                    });
                    _.map(data,v=>{
                        this.productTableData.push(v);
                    });
                    console.log(this.productTableData,'this.productTableData')
                }).finally(err=>{
                    this.loadingProductTable=false;
                });
            },
            handleCancel(){
                this.productTableDialogVisible=false;
            },
            saveNegotiate(e){
                if(!this.orderForm.orderSkuUpdateList || this.orderForm.orderSkuUpdateList.length===0){
                    this.orderForm.orderSkuUpdateList=[];
                    this.orderForm.orderSkuUpdateList.push({
                        skuId: e[0].skuId.value,
                        skuInfo: true,
                        skuStatus: true
                    });
                }
                else{
                    let isIn=false;
                    _.map(this.orderForm.orderSkuUpdateList,v=>{
                        if(v.skuId===e[0].skuId.value){
                            isIn=true;
                        }
                    });
                    if(!isIn){
                        this.orderForm.orderSkuUpdateList.push({
                            skuId: e[0].skuId.value,
                            skuInfo: true,
                            skuStatus: true
                        });
                    }
                }

                _.map(this.productTableData,(v,k)=>{
                    _.map(e,m=>{
                        if(m.skuSysCode.value===v.skuSysCode.value && m.label.value===v.label.value){
                            this.productTableData.splice(k,1,m)
                        }
                    })
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
                                if(item[k]._value){
                                    if(item[k].key==='skuUnit'){
                                        json[k]=item[k]._value?_.findWhere(this.skuUnitOption,{name:item[k]._value}).code:'';
                                    }else if(item[k].key==='skuUnitWeight'){
                                        json[k]=item[k]._value?_.findWhere(this.weightOption,{name:item[k]._value}).code:'';
                                    }else if(item[k].key==='skuUnitLength'){
                                        json[k]=item[k]._value?_.findWhere(this.lengthOption,{name:item[k]._value}).code:'';
                                    }else if(item[k].key==='skuUnitVolume'){
                                        json[k]=item[k]._value?_.findWhere(this.volumeOption,{name:item[k]._value}).code:'';
                                    }else if(item[k].key==='skuExpireUnit'){
                                        json[k]=item[k]._value?_.findWhere(this.expirationDateOption,{name:item[k]._value}).code:'';
                                    }else if(item[k].key==='skuStatus'){
                                        json[k]=item[k]._value?_.findWhere(this.skuStatusTotalOption,{name:item[k]._value}).code:'';
                                    }else if(item[k].key==='skuSample'){
                                        json[k]=item[k]._value?_.findWhere(this.isNeedSampleOption,{code:item[k].value}).code:'';
                                    }else if(item[k].key==='skuInspectQuarantineCategory'){
                                        json[k]=item[k]._value?_.findWhere(this.quarantineTypeOption,{name:item[k]._value}).code:'';
                                    }else{
                                        json[k] = item[k].value;
                                    }
                                }else{
                                    json[k] = item[k].value;
                                }
                            }
                        };
                        arr.push(json);
                    }
                });
                return arr;
            },

            /**
             * history部分事件
             * */
            handlePriceBlur(e,item){
                if(!this.orderForm.incoterm){return;}
                let obj;
                obj=item?item:this.chooseProduct[0];
                if(this.orderForm.incoterm==='1'){
                    //fob
                    if(obj.skuFobPrice.value && obj.skuQty.value){
                        obj.skuPrice.value=Number((obj.skuFobPrice.value*obj.skuQty.value).toFixed(8));
                    }else{
                        obj.skuPrice.value=0;
                    }
                }else if(this.orderForm.incoterm==='2'){
                    //exw
                    if(obj.skuExwPrice.value && obj.skuQty.value){
                        obj.skuPrice.value=Number((obj.skuExwPrice.value*obj.skuQty.value).toFixed(8));
                    }else{
                        obj.skuPrice.value=0;
                    }
                }else if(this.orderForm.incoterm==='3'){
                    //cif
                    if(obj.skuCifPrice.value && obj.skuQty.value){
                        obj.skuPrice.value=Number((obj.skuCifPrice.value*obj.skuQty.value).toFixed(8));
                    }else{
                        obj.skuPrice.value=0;
                    }
                }else if(this.orderForm.incoterm==='4'){
                    //ddu
                    if(obj.skuDduPrice.value && obj.skuQty.value){
                        obj.skuPrice.value=Number((obj.skuDduPrice.value*obj.skuQty.value).toFixed(8));
                    }else{
                        obj.skuPrice.value=0;
                    }
                }
            },

            /**
             * payment事件
             * */
            tableRowClassName({row, rowIndex}) {
                if (row.status === -1) {
                    return "warning-row";
                }else if(row.status===10 || row.status===20 || row.status===30){
                    return "waiting-row"
                }
                return "";
            },
            getSummaries(param){
                const { columns, data } = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = this.$i.product.total;
                        return;
                    }else if(index===4 || index===6 || index===8 || index===10){
                        if(_.uniq(_.pluck(this.paymentData,'currencyCode')).length>1){
                            sums[index] = '-';
                        }
                        else{
                            const values = data.map(item => Number(item[column.property]));
                            if (!values.every(value => isNaN(value))) {
                                sums[index] = values.reduce((prev, curr) => {
                                    const value = Number(curr);
                                    if (!isNaN(value)) {
                                        return prev + curr;
                                    } else {
                                        return prev;
                                    }
                                }, 0);
                            } else {

                            }
                        }
                    }
                });
                return sums;
            },
            getPaymentData(){
                this.loadingPaymentTable=true;
                this.$ajax.post(this.$apis.PAYMENT_LIST,{
                    orderNo:this.orderForm.orderNo,
                    orderType:10
                }).then(res=>{
                    this.paymentData=res.datas;
                }).finally(err=>{
                    this.loadingPaymentTable=false;
                });
            },
            confirmPay(data){
                this.$confirm(this.$i.order.sureConfirm, this.$i.order.prompt, {
                    confirmButtonText: this.$i.order.sure,
                    cancelButtonText: this.$i.order.cancel,
                    type: 'warning'
                }).then(() => {
                    this.loadingPaymentTable=true;
                    this.$ajax.post(this.$apis.PAYMENT_ACCEPT,{
                        id:data.id,
                        version:data.version
                    }).then(res=>{
                        this.$message({
                            type: 'success',
                            message: this.$i.order.handleSuccess
                        });
                        this.$set(data,'status',40);
                        this.$set(data,'version',res.version);
                    }).finally(()=>{
                        this.loadingPaymentTable=false;
                    });
                }).catch(() => {

                });
            },
            applyPayback(){
                this.disableClickPayback=true;
                this.$ajax.post(this.$apis.PAYMENT_NO).then(res=>{
                    this.paymentData.push({
                        no:res,
                        name:'',
                        planRefundDt: "",
                        planRefundAmount: 0,
                        actualRefundDt: "",
                        actualRefundAmount: 0,
                        currencyCode:this.orderForm.currency,
                        status:10,
                        isNew:true,
                    });
                }).finally(()=>{
                    this.disableClickPayback=false;
                })
            },
            remindPay(){
                let params=[];
                _.map(this.paymentData,v=>{
                    if(v.status===40 && v.planPayDt && v.planPayAmount>v.actualPayAmount){
                        params.push({
                            id:v.id,
                            version:v.version
                        });
                    }
                });
                if(params.length===0){
                    return this.$message({
                        message: this.$i.order.nothingToDun,
                        type: 'warning'
                    });
                }
                this.disableRemind=true;
                this.$ajax.post(this.$apis.PAYMENT_DUNNING,params).then(res=>{
                    this.getPaymentData();
                    this.$message({
                        message: this.$i.order.dunSuccess,
                        type: 'success'
                    });
                }).finally(()=>{
                    this.disableRemind=false;
                })

            },
            saveNewPay(data){
                console.log(this.orderForm)
                let param={
                    actualRefundAmount: data.actualRefundAmount,
                    actualRefundDt: data.actualRefundDt,
                    currency: 0,
                    currencyCode: "",
                    name: data.name,
                    no: data.no,
                    orderNo: this.orderForm.orderNo,
                    orderType: 10,
                    payToCompanyId: this.orderForm.companyId,
                    payToCompanyName: '',
                    planRefundAmount: data.planRefundAmount,
                    planRefundDt: data.planRefundDt,
                    type: 20
                }
                _.map(this.currencyOption,v=>{
                    if(v.code===data.currencyCode){
                        param.currency=v.id;
                        param.currencyCode=v.code;
                    }
                });
                this.loadingPaymentTable=true;
                this.$ajax.post(this.$apis.PAYMENT_SAVE,param).then(res=>{
                    this.$message({
                        message: this.$i.order.saveSuccess,
                        type: 'success'
                    });
                    this.$set(data,'isNew',false);
                    this.$set(data,'version',res.version);
                    this.$set(data,'id',res.id);
                }).finally(err=>{
                    this.loadingPaymentTable=false;
                });
            },
            cancelSaveNewPay(data){
                this.paymentData=_.difference(this.paymentData,[data]);
                this.$message({
                    type: 'success',
                    message: this.$i.order.deleteSuccess
                });
            },
            modifyPay(data){
                this.$set(data,'isModify',true);
                let has=false;
                this.copyList.forEach(v=>{
                    if(v.no===data.no){
                        has=true;
                    }
                });
                if(!has){
                    this.copyList.push(Object.assign({},data));
                }
            },
            saveModifyPay(data){
                let param={
                    actualRefundAmount: data.actualRefundAmount,
                    actualRefundDt: data.actualRefundDt,
                    id: data.id,
                    name: data.name,
                    planRefundAmount: data.planRefundAmount,
                    planRefundDt: data.planRefundDt,
                    version:data.version
                };
                this.loadingPaymentTable=true;
                this.$ajax.post(this.$apis.PAYMENT_UPDATE,param).then(res=>{
                    console.log(res)
                    this.$message({
                        message: this.$i.warehouse.changeSuccess,
                        type: 'success'
                    });
                    this.copyList.forEach(v=>{
                        if(v.no===data.no){
                            let obj=Object.assign({},data);
                            this.$set(v,'name',obj.name);
                            this.$set(v,'planRefundDt',obj.planRefundDt);
                            this.$set(v,'planRefundAmount',obj.planRefundAmount);
                            this.$set(v,'actualRefundDt',obj.actualRefundDt);
                            this.$set(v,'actualRefundAmount',obj.actualRefundAmount);
                        }
                    });
                    this.$set(data,'isModify',false);
                    this.$set(data,'version',res.version);
                    this.$set(data,'status',res.status);
                }).finally(err=>{
                    this.loadingPaymentTable=false;
                })
            },
            cancelModifyPay(data){
                this.copyList.forEach(v=>{
                    if(v.no===data.no){
                        let obj=Object.assign({},v);
                        this.$set(data,'name',obj.name);
                        this.$set(data,'planRefundDt',obj.planRefundDt);
                        this.$set(data,'planRefundAmount',obj.planRefundAmount);
                        this.$set(data,'actualRefundDt',obj.actualRefundDt);
                        this.$set(data,'actualRefundAmount',obj.actualRefundAmount);
                    }
                });
                this.$set(data,'isModify',false);
            },
            abandonPay(data){
                this.$confirm(this.$i.order.sureAbandon, this.$i.order.prompt, {
                    confirmButtonText: this.$i.order.sure,
                    cancelButtonText: this.$i.order.cancel,
                    type: 'warning'
                }).then(() => {
                    this.loadingPaymentTable=true;
                    this.$ajax.post(this.$apis.PAYMENT_ABANDON,{
                        id:data.id,
                        version:data.version
                    }).then(res=>{
                        this.$message({
                            type: 'success',
                            message: this.$i.order.handleSuccess
                        });
                        this.$set(data,'status',-1);
                        this.$set(data,'version',res.version);
                    }).finally(err=>{
                        this.loadingPaymentTable=false;
                    })
                }).catch(() => {

                });
            },
            restorePay(data){
                this.$confirm(this.$i.order.sureRestore, this.$i.order.prompt, {
                    confirmButtonText: this.$i.order.sure,
                    cancelButtonText: this.$i.order.cancel,
                    type: 'warning'
                }).then(() => {
                    this.loadingPaymentTable=true;
                    this.$ajax.post(this.$apis.PAYMENT_RESTORE,{
                        id:data.id,
                        version:data.version
                    }).then(res=>{
                        this.$message({
                            type: 'success',
                            message: this.$i.order.handleSuccess
                        });
                        this.$set(data,'status',10);
                        this.$set(data,'version',res.version);
                    }).finally(err=>{
                        this.loadingPaymentTable=false;
                    });
                }).catch(() => {

                });
            },

            /**
             * 底部按钮事件
             * */
            modifyOrder(){
                this.isModify=true;
            },
            cancelModify(){
                this.disableClickCancelModify=true;
                this.getDetail(true);
            },
            changeMarkImportant(e){
                this.$ajax.post(this.$apis.ORDER_MARK,{
                    importantSupplier: e,
                    ids: [this.orderForm.id],
                }).then(res=>{
                    this.$message({
                        message: this.$i.order.handleSuccess,
                        type: 'success'
                    });
                }).finally(err=>{

                });
            },
            cancelOrder(){

            },
            confirmOrder(){
                this.disableClickConfirm=true;
                this.$ajax.post(this.$apis.ORDER_CONFIRM,{
                    ids: [this.orderForm.id],
                    orderNos:[this.orderForm.orderNo]
                }).then(res=>{
                    this.getDetail();
                }).finally(err=>{
                    this.disableClickConfirm=false;
                });
            },
            downloadOrder(){
                this.$fetch.export_task('EXPORT_ORDER',{ids:[this.orderForm.id]});
            },

            acceptOrder(){
                this.disableClickAccept=true;
                this.$ajax.post(this.$apis.ORDER_ACCEPT,{
                    ids:[this.orderForm.id],
                }).then(res=>{
                    this.getDetail();
                }).finally(err=>{
                    this.disableClickAccept=false;
                });
            },
            refuseOrder(){
                this.$confirm(this.$i.order.sureRefuse, this.$i.order.prompt, {
                    confirmButtonText: this.$i.order.sure,
                    cancelButtonText: this.$i.order.cancel,
                    type: 'warning'
                }).then(() => {
                    this.disableClickRefuse=true;
                    this.$ajax.post(this.$apis.ORDER_REFUSE,{
                        ids:[this.orderForm.id],
                        orderNos:[this.orderForm.orderNo],
                    }).then(res=>{
                        this.$message({
                            message: this.$i.order.handleSuccess,
                            type: 'success'
                        });
                        this.$router.push('/order/overview');
                    }).finally(err=>{
                        this.disableClickRefuse=false;
                    });
                }).catch(() => {

                });
            },

            /**
             * quick create弹出框事件
             * */
            searchInquiry(e){
                console.log(e)
                if(!e.keyType){return this.$message({
                    message: this.$i.order.pleaseChooseType,
                    type: 'warning'
                });}
                this.inquiryConfig.inquiryNo=e.key;
                this.getInquiryData();
            },
            changeChecked(){

            },
            btnClick(e){
                this.quickCreateDialogVisible=false;
                this.loadingProductTable=true;
                this.$ajax.get(this.$apis.INQUIRY_ID,{
                    id:e.id.value
                }).then(res=>{
                    this.orderForm.quotationNo=res.quotationNo;
                    this.productTableData=[];
                    let arr=[];
                    _.map(res.details,v=>{
                        let obj={
                            bookmarkId: '',
                            companyId: null,
                            entryDt: '',
                            entryId: null,
                            entryName: '',
                            fieldRemark: {},
                            fieldUpdate: {},
                            fieldsRemark: '',
                            fieldsUpdate: '',
                            id: null,
                            orderId: null,
                            orderNo: '',
                            ownerId: null,
                            skuAdditionalFour: '',
                            skuAdditionalOne: '',
                            skuAdditionalThree: '',
                            skuAdditionalTwo: '',
                            skuAdjustPackage: true,
                            skuApplicableAge: null,
                            skuAvailableQty: null,
                            skuBarCode: '',
                            skuBrand: '',
                            skuBrandRelated: '',
                            skuBrandRemark: '',
                            skuCategoryFour: '',
                            skuCategoryId: null,
                            skuCategoryOne: '',
                            skuCategoryThree: '',
                            skuCategoryTwo: '',
                            skuCertificat: '',
                            skuCifCurrency: '',
                            skuCifPort: '',
                            skuCifPrice: null,
                            skuCode: '',
                            skuColourCn: '',
                            skuColourEn: '',
                            skuComments: '',
                            skuCommodityInspectionCn: '',
                            skuCommodityInspectionEn: '',
                            skuCustomerCreate: true,
                            skuCustomerSkuCode: '',
                            skuCustomsCode: '',
                            skuCustomsNameCn: '',
                            skuCustomsNameEn: '',
                            skuDduCurrency: '',
                            skuDduPort: '',
                            skuDduPrice: null,
                            skuDeclareElement: '',
                            skuDeliveredQty: null,
                            skuDeliveryDates: null,
                            skuDepartureDt: null,
                            skuDescCn: '',
                            skuDescCustomer: '',
                            skuDescEn: '',
                            skuDesign: '',
                            skuDisplayBoxQty: null,
                            skuExpireDates: null,
                            skuExpireUnit: null,
                            skuExwCurrency: '',
                            skuExwPrice: null,
                            skuFobCurrency: '',
                            skuFobPort: '',
                            skuFobPrice: null,
                            skuFormation: '',
                            skuGp20SkuQty: null,
                            skuGp40SkuQty: null,
                            skuGrossWeight: null,
                            skuHeight: null,
                            skuHq40SkuQty: null,
                            skuId: null,
                            skuInboundQty: null,
                            skuIncoterm: '',
                            skuIncotermArea: '',
                            skuInnerCartonDesc: '',
                            skuInnerCartonHeight: null,
                            skuInnerCartonLength: null,
                            skuInnerCartonMethodCn: '',
                            skuInnerCartonMethodEn: '',
                            skuInnerCartonOuterNum: null,
                            skuInnerCartonPic: '',
                            skuInnerCartonQty: null,
                            skuInnerCartonRoughWeight: null,
                            skuInnerCartonUnit: '',
                            skuInnerCartonVolume: null,
                            skuInnerCartonWeightNet: null,
                            skuInnerCartonWidth: null,
                            skuInnerPackBarCode: '',
                            skuInnerPackCode: '',
                            skuInnerPackLabel: '',
                            skuInspectQuarantineCategory: '',
                            skuInventory: null,
                            skuInventoryCostMethod: '',
                            skuLabel: '',
                            skuLabelDesc: '',
                            skuLabelPic: '',
                            skuLength: null,
                            skuLengthWidthHeight: '',
                            skuMainSaleArea: '',
                            skuMainSaleCountry: '',
                            skuMaterialCn: '',
                            skuMaterialEn: '',
                            skuMethodPkgCn: '',
                            skuMethodPkgEn: '',
                            skuMinInventory: null,
                            skuMinOrderQty: null,
                            skuModifyStatus: null,
                            skuNameCn: '',
                            skuNameCustomer: '',
                            skuNameEn: '',
                            skuNetWeight: null,
                            skuNoneSellCountry: '',
                            skuOem: true,
                            skuOrigin: '',
                            skuOtherPackInfoCn: '',
                            skuOtherPackInfoEn: '',
                            skuOuterCartonBarCode: '',
                            skuOuterCartonCode: '',
                            skuOuterCartonDesc: '',
                            skuOuterCartonHeight: null,
                            skuOuterCartonLength: null,
                            skuOuterCartonMethodCn: '',
                            skuOuterCartonMethodEn: '',
                            skuOuterCartonNetWeight: null,
                            skuOuterCartonPic: '',
                            skuOuterCartonQty: null,
                            skuOuterCartonRoughWeight: null,
                            skuOuterCartonUnit: '',
                            skuOuterCartonVolume: null,
                            skuOuterCartonWidth: null,
                            skuPic: '',
                            skuPkgMethodPic: '',
                            skuPrice: null,
                            skuProductionDates: null,
                            skuQty: null,
                            skuQtyPerTray: null,
                            skuQualifiedQty: null,
                            skuQualityStander: '',
                            skuQuotationNo: '',
                            skuRateValueAddedTax: null,
                            skuReadilyAvailable: true,
                            skuRecycle: true,
                            skuRefunQty: null,
                            skuRemarkOne: '',
                            skuRemarkThree: '',
                            skuRemarkTwo: '',
                            skuSafeInventory: null,
                            skuSaleStatus: null,
                            skuSample: true,
                            skuSamplePrice: null,
                            skuSampleQty: null,
                            skuShippingMarks: '',
                            skuSpecialTransportRequire: '',
                            skuStatus: '',
                            skuSupplierCode: '',
                            skuSupplierCompanyId: null,
                            skuSupplierId: null,
                            skuSupplierName: '',
                            skuSupplierTenantId: null,
                            skuSysCode: '',
                            skuTaxRefundRate: null,
                            skuTradeMarkCn: '',
                            skuTradeMarkEn: '',
                            skuTryDimension: null,
                            skuUndeliveredQty: null,
                            skuUnit: null,
                            skuUnitLength: null,
                            skuUnitVolume: null,
                            skuUnitWeight: null,
                            skuUntestedQty: null,
                            skuUseDisplayBox: true,
                            skuVolume: null,
                            skuWarehourceDefault: '',
                            skuWidth: null,
                            skuYearListed: '',
                            tenantId: null,
                            timeZone: '',
                            updateDt: '',
                            updateId: null,
                            updateName: '',
                            version: null,
                        };
                        obj.skuId=v.skuId;
                        obj.skuPic=v.skuPic;
                        obj.skuNameEn=v.skuNameEn;
                        obj.skuNameCn=v.skuNameCn;
                        obj.skuDescCn =v.skuDescCn;
                        obj.skuDescEn=v.skuDescEn;
                        obj.skuDescCustomer=v.skuDescCustomer;
                        obj.skuNameCustomer=v.skuNameCustomer;
                        obj.skuCustomerSkuCode=v.skuCustomerSkuCode;
                        obj.skuCode=v.skuCode;
                        obj.skuSupplierName=v.skuSupplierName;
                        obj.skuSupplierCode=v.skuSupplierCode;
                        obj.skuFobCurrency=v.skuFobCurrency;
                        obj.skuFobPrice=v.skuFobPrice;
                        obj.skuFobPort=v.skuFobPort;
                        obj.skuExwCurrency=v.skuExwCurrency;
                        obj.skuExwPrice=v.skuExwPrice;
                        obj.skuCifCurrency=v.skuCifCurrency;
                        obj.skuCifPrice=v.skuCifPrice;
                        obj.skuCifPort=v.skuCifArea;
                        obj.skuDduCurrency=v.skuDduCurrency;
                        obj.skuDduPrice=v.skuDduPrice;
                        obj.skuDduPort=v.skuDduArea;
                        obj.skuUnit=v.skuUnit;
                        obj.skuMaterialCn=v.skuMaterialCn;
                        obj.skuMaterialEn=v.skuMaterialEn;
                        obj.skuRateValueAddedTax=v.skuRateValueAddedTax;
                        obj.skuTaxRefundRate=v.skuTaxRefundRate;
                        obj.skuColourCn=v.skuColourCn;
                        obj.skuColourEn=v.skuColourEn;
                        obj.skuMinOrderQty=v.skuMinOrderQty;
                        obj.skuDeliveryDates=v.skuDeliveryDates;
                        obj.skuDesign=v.skuDesign;
                        obj.skuCategoryId=v.skuCategoryId;
                        obj.skuCustomsCode=v.skuCustomsCode;
                        obj.skuCustomsNameCn=v.skuCustomsNameCn;
                        obj.skuCustomsNameEn=v.skuCustomsNameEn;
                        obj.skuTradeMarkCn=v.skuTradeMarkCn;
                        obj.skuTradeMarkEn=v.skuTradeMarkEn;
                        obj.skuCommodityInspectionCn=v.skuCommodityInspectionCn;
                        obj.skuCommodityInspectionEn=v.skuCommodityInspectionEn;
                        obj.skuDeclareElement=v.skuDeclareElement;
                        obj.skuOrigin=v.skuOrigin;
                        obj.skuInspectQuarantineCategory=v.skuInspectQuarantineCategory;
                        obj.skuUnitLength=v.skuUnitLength;
                        obj.skuUnitWidth=v.skuUnitWidth;
                        obj.skuUnitVolumn=v.skuUnitVolumn;
                        obj.skuLength=v.skuLength;
                        obj.skuWidth=v.skuWidth;
                        obj.skuHeight=v.skuHeight;
                        obj.skuNetWeight=v.skuNetWeight;
                        obj.skuGrossWeight=v.skuGrossWeight;
                        obj.skuVolume=v.skuVolume;
                        obj.skuMethodPkgCn=v.skuMethodPkgCn;
                        obj.skuMethodPkgEn=v.skuMethodPkgEn;
                        obj.skuInnerCartonUnit=v.skuInnerCartonUnit;
                        obj.skuInnerCartonQty=v.skuInnerCartonQty;
                        obj.skuInnerCartonLength=v.skuInnerCartonLength;
                        obj.skuInnerCartonWidth=v.skuInnerCartonWidth;
                        obj.skuInnerCartonHeight=v.skuInnerCartonHeight;
                        obj.skuInnerCartonWeightNet=v.skuInnerCartonWeightNet;
                        obj.skuInnerCartonRoughWeight=v.skuInnerCartonRoughWeight;
                        obj.skuInnerCartonVolume=v.skuInnerCartonVolume;
                        obj.skuInnerCartonDesc=v.skuInnerCartonDesc;
                        obj.skuInnerCartonMethodCn=v.skuInnerCartonMethodCn;
                        obj.skuInnerCartonMethodEn=v.skuInnerCartonMethodEn;
                        obj.skuOuterCartonUnit=v.skuOuterCartonUnit;
                        obj.skuOuterCartonDesc=v.skuOuterCartonDesc;
                        obj.skuOuterCartonQty=v.skuOuterCartonQty;
                        obj.skuOuterCartonLength=v.skuOuterCartonLength;
                        obj.skuOuterCartonWidth=v.skuOuterCartonWidth;
                        obj.skuOuterCartonHeight=v.skuOuterCartonHeight;
                        obj.skuInnerCartonOuterNum=v.skuInnerCartonOuterNum;
                        obj.skuOuterCartonNetWeight=v.skuOuterCartonNetWeight;
                        obj.skuOuterCartonRoughWeight=v.skuOuterCartonRoughWeight;
                        obj.skuOuterCartonVolume=v.skuOuterCartonVolume;
                        obj.skuOuterCartonMethodCn=v.skuOuterCartonMethodCn;
                        obj.skuOuterCartonMethodEn=v.skuOuterCartonMethodEn;
                        obj.skuBrand=v.skuBrand;
                        obj.skuApplicableAge=v.skuApplicableAge;
                        obj.skuExpireDates=v.skuExpireDates;
                        obj.skuExpireUnit=v.skuExpireUnit;
                        obj.skuComments=v.skuComments;
                        obj.skuBarCode=v.skuBarcode;
                        obj.skuSaleStatus=v.skuStatus;
                        obj.skuQuotationNo=v.quotationNo;
                        obj.skuSysCode=v.skuSysCode;
                        arr.push(obj);
                    });
                    let data=this.$getDB(this.$db.order.productInfoTable,this.$refs.HM.getFilterData(arr, 'skuSysCode'),item=>{
                        if(item._remark){
                            item.label.value=this.$i.order.remarks;
                            if(item.skuPictures){
                                item.skuPictures._image=false;
                            }
                            item.skuLabelPic._image=false;
                            item.skuPkgMethodPic._image=false;
                            item.skuInnerCartonPic._image=false;
                            item.skuOuterCartonPic._image=false;
                            item.skuAdditionalOne._image=false;
                            item.skuAdditionalTwo._image=false;
                            item.skuAdditionalThree._image=false;
                            item.skuAdditionalFour._image=false;
                        }
                        else{
                            item.label.value=this.$dateFormat(item.entryDt.value,'yyyy-mm-dd');
                            item.skuSample._value=item.skuSample.value?'YES':'NO';
                            item.skuSample.value=item.skuSample.value?'1':'0';
                            item.skuUnit._value=item.skuUnit?this.$change(this.skuUnitOption,'skuUnit',item,true).name:'';
                            item.skuUnitWeight._value=item.skuUnitWeight?this.$change(this.weightOption,'skuUnitWeight',item,true).name:'';
                            item.skuUnitLength._value=item.skuUnitLength?this.$change(this.lengthOption,'skuUnitLength',item,true).name:'';
                            item.skuExpireUnit._value=item.skuExpireUnit?this.$change(this.expirationDateOption,'skuExpireUnit',item,true).name:'';
                            item.skuStatus._value=item.skuStatus?_.findWhere(this.skuStatusTotalOption,{code:item.skuStatus.value}).name:'';
                            item.skuUnitVolume._value=item.skuUnitVolume?this.$change(this.volumeOption,'skuUnitVolume',item,true).name:'';
                            item.skuSaleStatus._value=item.skuSaleStatus?this.$change(this.skuSaleStatusOption,'skuSaleStatus',item,true).name:'';
                            if(item.skuCategoryId.value){
                                item.skuCategoryId._value=_.findWhere(this.category,{id:item.skuCategoryId.value}).name;
                            }
                            item.skuInspectQuarantineCategory._value=item.skuInspectQuarantineCategory.value?_.findWhere(this.quarantineTypeOption,{code:item.skuInspectQuarantineCategory.value}).name:'';
                        }
                    });
                    _.map(data,v=>{
                        this.productTableData.push(v);
                    })
                }).finally(err=>{
                    this.loadingProductTable=false;
                });
            },

            /**
             * message board事件
             * */
            afterSend(){
                let params=Object.assign({},this.orderForm);
                _.map(this.supplierOption,v=>{
                    if(params.supplierName===v.id){
                        params.supplierName=v.name;
                        params.supplierCode=v.code;
                        params.supplierId=v.id;
                        params.supplierCompanyId=v.companyId;
                    }
                });
                params.skuList=this.dataFilter(this.productTableData);
                _.map(params.skuList,v=>{
                    if(_.isArray(v.skuLabelPic)){
                        v.skuLabelPic=(v.skuLabelPic[0]?v.skuLabelPic[0]:null);
                    }
                    v.skuSample=v.skuSample==='1'?true:false;
                    if(v.skuInspectQuarantineCategory){
                        v.skuInspectQuarantineCategory=_.findWhere(this.quarantineTypeOption,{code:v.skuInspectQuarantineCategory}).code;
                    }
                    let picKey=['skuLabelPic','skuPkgMethodPic','skuInnerCartonPic','skuOuterCartonPic','skuAdditionalOne','skuAdditionalTwo','skuAdditionalThree','skuAdditionalFour'];
                    _.map(picKey,item=>{
                        if(_.isArray(v[item])){
                            v[item]=(v[item][0]?v[item][0]:null);
                        }
                    })
                });
                params.attachments=this.$refs.upload[0].getFiles();

                this.$ajax.post(this.$apis.ORDER_MESSAGE_TALK,params).then(res=>{

                })
            },



            /**
             * 搜索框事件
             * */
            inputEnter(e){
                console.log(e)
            },

            /**
             * 分页操作
             * */
            changePage(e){
                this.inquiryConfig.pn=e;
                this.getInquiryData();
            },
            changeSize(e){
                this.inquiryConfig.ps=e;
                this.getInquiryData();
            }
        },
        created(){
            let category=[];
            this.category=[];
            this.loadingPage=true;
            this.$ajax.get(this.$apis.CATEGORY_SYSTEM,{}).then(res=>{
                _.map(res,v=>{
                    category.push(v);
                });
                this.$ajax.get(this.$apis.CATEGORY_MINE,{}).then(data=>{
                    _.map(data,v=>{
                        category.push(v);
                    });
                    _.map(category,data=>{
                        _.map(data.children,ele=>{
                            this.category.push(ele);
                        })
                    });
                    this.getOrderNo();
                }).catch(err=>{
                    this.loadingPage=false;
                });
            }).catch(err=>{
                this.loadingPage=false;
            });
        },
        mounted(){
            this.setMenuLink({
                path: '/logs/index',
                query: {code: 'ORDER'},
                type: 10,
                label: this.$i.common.log
            });
        },
        watch:{
            allowQuery(n){
                if(n===3){
                    this.getDetail();
                }
            },
        },
    }
</script>

<style scoped>
    .title{
        font-weight: bold;
        font-size: 18px;
        height: 32px;
        line-height: 32px;
        color:#666666;
        margin-top: 10px;
    }
    .second-title{
        font-weight: bold;
        font-size: 18px;
        height: 32px;
        line-height: 32px;
        color:#666666;
        margin-top: 10px;
    }
    .isModify >>> input{
        background-color: yellow !important;
    }
    .high-light >>> input{
        background-color: yellow !important;
    }
    .speCol{
        height: 47px;
    }
    .speInput{
        width: 80%;
    }
    .speNumber >>> input{
        text-align: left;
    }
    .spx{
        width: 100%;
    }
    .speSearch{
        float: right;
        margin-right: 70px;
    }
    .payTable{
        margin-top: 10px;
    }
    .speDate{
        width: 160px;
    }
    .speNumber >>> input{
        text-align: left;
    }
    .el-table >>> .warning-row {
        background: #f5f7fa;
    }
    .el-table >>> .waiting-row {
        background: yellow;
    }

    .footBtn{
        border-top: 1px solid #e0e0e0;
        height: 40px;
        line-height: 40px;
        background-color: #ffffff;
        position: sticky;
        left: 0;
        bottom: 0;
        width: 100%;
        text-align: left;
        z-index:5;
    }
</style>
