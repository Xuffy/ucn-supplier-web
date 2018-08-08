<template>
    <div class="add-product" v-loading="loadingData">
        <div class="title">{{$i.product.basicInformation}}</div>
        <el-form ref="productForm1" class="speForm" label-width="230px" :label-position="labelPosition">
            <el-row>
                <!--设置高度51px以免inputNumber错位-->
                <el-col style="height: 51px;" class="list" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <el-form-item :label="$i.product.picture+':'">
                        <v-upload :limit="20" :list="productForm.pictures" :onlyImage="true" ref="upload"></v-upload>
                    </el-form-item>
                </el-col>
                <el-col style="min-height: 51px;"
                        class="list"
                        v-if="v.belongTab==='basicInfo' && !v.isHide"
                        v-for="v in $db.product.detailTab"
                        :key="v.key"
                        :xs="24"
                        :sm="24"
                        :md="v.fullLine?24:12"
                        :lg="v.fullLine?24:12"
                        :xl="v.fullLine?24:12">
                    <el-form-item :required="v._rules?v._rules.required:false" :label="v.label+':'">
                        <div v-if="v.showType==='select'">
                            <div v-if="v.isWeight">
                                <el-select
                                        class="speSelect"
                                        v-model="productForm[v.key]"
                                        :placeholder="$i.product.pleaseChoose">
                                    <el-option
                                            v-for="item in skuUnitOption"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.code">
                                    </el-option>
                                </el-select>
                            </div>
                            <div v-else-if="v.isCountry">
                                <el-select class="speSelect" size="mini" v-model="productForm[v.key]" multiple
                                           filterable collapse-tags :placeholder="$i.product.pleaseChoose">
                                    <el-option
                                            v-for="item in countryOption"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.code">
                                    </el-option>
                                </el-select>
                            </div>
                            <div v-else-if="v.isReadily">
                                <el-select
                                        class="speSelect"
                                        clearable
                                        v-model="productForm[v.key]"
                                        :placeholder="$i.product.pleaseChoose">
                                    <el-option
                                            v-for="item in readilyOption"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.code">
                                    </el-option>
                                </el-select>
                            </div>
                            <div v-else-if="v.isDateUnit">
                                <el-select class="speSelect" size="mini" v-model="productForm[v.key]"
                                           :placeholder="$i.product.pleaseChoose">
                                    <el-option
                                            v-for="item in dateOption"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.code">
                                    </el-option>
                                </el-select>
                            </div>
                            <div v-else-if="v.isSaleStatus">
                                <el-select
                                        class="speSelect"
                                        v-model="productForm[v.key]"
                                        :placeholder="$i.product.pleaseChoose">
                                    <el-option
                                            v-for="item in saleStatusOption"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.code">
                                    </el-option>
                                </el-select>
                            </div>
                            <div v-else-if="v.isFormation">
                                <el-select
                                        class="speSelect"
                                        v-model="productForm[v.key]"
                                        :placeholder="$i.product.pleaseChoose">
                                    <el-option
                                            v-for="item in formationOption"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.code">
                                    </el-option>
                                </el-select>
                            </div>
                            <div v-else>
                                <el-select class="speSelect" size="mini" v-model="productForm[v.key]"
                                           :placeholder="$i.product.pleaseChoose">
                                    <el-option
                                            v-for="item in v.options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.code">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div v-else-if="v.showType==='input'">
                            <el-input
                                    :disabled="v.disabledInput"
                                    size="mini"
                                    :placeholder="$i.product.pleaseInput"
                                    clearable
                                    v-model="productForm[v.key]">
                            </el-input>
                        </div>
                        <div v-else-if="v.showType==='textarea'">
                            <el-input
                                    class="speTextarea"
                                    size="mini"
                                    type="textarea"
                                    :autosize="{ minRows: 2}"
                                    :placeholder="$i.product.pleaseInput"
                                    v-model="productForm[v.key]">
                            </el-input>
                        </div>
                        <div v-else-if="v.showType==='number'">
                            <div v-if="v.isAvailableQty">
                                <v-input-number
                                        class="speInputNumber"
                                        v-model="productForm[v.key]"
                                        :min="0"
                                        :mark="v.label"
                                        :accuracy="v.accuracy"
                                        :placeholder="$i.product.pleaseInput"
                                        :disabled="!parseInt(productForm.readilyAvailable)">
                                </v-input-number>
                            </div>
                            <div v-else>
                                <v-input-number
                                        class="speInputNumber"
                                        v-model="productForm[v.key]"
                                        :min="0"
                                        :max="v.key==='applicableAge'?127:null"
                                        :mark="v.label"
                                        :accuracy="v.accuracy"
                                        :placeholder="$i.product.pleaseInput">
                                </v-input-number>
                            </div>
                        </div>
                        <div v-else-if="v.showType==='dropdown'">
                            <drop-down
                                    class="speSelect"
                                    v-model="productForm[v.key]"
                                    :list="categoryList"
                                    :defaultProps="defaultProps"
                                    ref="dropDown"></drop-down>
                        </div>
                        <div v-else-if="v.showType==='attachment'">
                            <v-upload
                                    :list="productForm[v.key]"
                                    :limit="20"
                                    :ref="v.key"></v-upload>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col class="list" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <el-form-item :label="$i.product.productVisible">
                        <el-radio v-model="productForm.visibility" :label="true">{{$i.product.allSee}}</el-radio>
                        <el-radio v-model="productForm.visibility" :label="false">{{$i.product.partSee}}</el-radio>
                        <div v-if="!productForm.visibility">
                            <el-button
                                    @click="addCustomer"
                                    size="mini"
                                    type="primary">{{$i.product.add}}
                            </el-button>
                            <el-table
                                    :data="tableData"
                                    style="width: 541px"
                                    border>
                                <el-table-column
                                        prop="name"
                                        :label="$i.product.customerName"
                                        align="center"
                                        width="180">
                                </el-table-column>
                                <el-table-column
                                        prop="code"
                                        :label="$i.product.customerCode"
                                        align="center"
                                        width="180">
                                </el-table-column>
                                <el-table-column
                                        :label="$i.product.action"
                                        align="center"
                                        width="180">
                                    <template slot-scope="scope">
                                        <el-button @click="removeCustomer(scope.row)" type="text" size="small">
                                            {{$i.product.remove}}
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <div class="title">{{$i.product.customerInfo}}</div>
        <el-form
                :model="productForm"
                ref="productForm2"
                class="speForm"
                label-width="230px"
                :label-position="labelPosition">
            <el-row>
                <el-col style="min-height: 51px;" v-if="v.belongTab==='customerInfo'" v-for="v in $db.product.detailTab"
                        :key="v.key" class="list" :xs="24" :sm="24" :md="v.fullLine?24:12" :lg="v.fullLine?24:12"
                        :xl="v.fullLine?24:12">
                    <el-form-item :prop="v.key" :label="v.label+':'">
                        <div v-if="v.showType==='select'">
                            <el-select
                                    class="speSelect"
                                    size="mini"
                                    v-model="productForm[v.key]"
                                    :placeholder="$i.product.pleaseChoose">
                                <div v-if="v.key==='inspectQuarantineCategory'">
                                    <el-option
                                            v-for="item in quarantineTypeOption"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.code">
                                    </el-option>
                                </div>
                                <div v-else>
                                    <el-option
                                            v-for="item in skuStatusOption"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </div>
                            </el-select>
                        </div>
                        <div v-if="v.showType==='input'">
                            <el-input
                                    :disabled="v.disabledInput"
                                    size="mini"
                                    :placeholder="$i.product.pleaseInput"
                                    clearable
                                    v-model="productForm[v.key]">
                            </el-input>
                        </div>
                        <div v-if="v.showType==='textarea'">
                            <el-input
                                    class="speTextarea"
                                    size="mini"
                                    type="textarea"
                                    autosize
                                    :placeholder="$i.product.pleaseInput"
                                    v-model="productForm[v.key]">
                            </el-input>
                        </div>
                        <div v-if="v.showType==='number'">
                            <v-input-number
                                    class="speInputNumber"
                                    v-model="productForm[v.key]"
                                    :mark="v.label"
                                    :accuracy="v.accuracy"
                                    :placeholder="$i.product.pleaseInput"
                                    :min="0">
                            </v-input-number>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <div class="title">{{$i.product.priceInfo}}</div>
        <el-form :model="productForm" ref="productForm3" class="speForm" label-width="230px"
                 :label-position="labelPosition">
            <el-table
                    class="priceTable"
                    :data="productForm.price"
                    border
                    style="width: 100%">
                <el-table-column
                        align="center"
                        width="180">
                    <template slot-scope="scope">
                        <div v-if="scope.row.status===1">
                            {{$i.product.costPrice}}
                        </div>
                        <div v-if="scope.row.status===2">
                            {{$i.product.quotedPrice}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="fobCurrency"
                        align="center"
                        :label="$i.product.fobCurrency"
                        width="180">
                    <template slot-scope="scope">
                        <el-form-item class="tableList">
                            <el-select v-model="scope.row.fobCurrency" :placeholder="$i.product.pleaseChoose">
                                <el-option
                                        v-for="item in currencyOption"
                                        :key="item.id"
                                        :label="item.code"
                                        :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="fobPrice"
                        align="center"
                        :label="$i.product.fobPrice"
                        width="180">
                    <template slot-scope="scope">
                        <el-form-item class="tableList">
                            <v-input-number
                                    class="speInputNumber"
                                    v-model="scope.row.fobPrice"
                                    :placeholder="$i.product.pleaseInput"
                                    :mark="$i.product.fobPrice"
                                    :accuracy="4"
                                    :min="0"></v-input-number>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="fobPort"
                        align="center"
                        :label="$i.product.fobPort"
                        width="180">
                    <template slot-scope="scope">
                        <el-form-item class="tableList">
                            <el-input
                                    v-model="scope.row.fobPort"
                                    clearable
                                    :placeholder="$i.product.pleaseInput"></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="exwPrice"
                        align="center"
                        :label="$i.product.exwPrice"
                        width="180">
                    <template slot-scope="scope">
                        <el-form-item class="tableList">
                            <v-input-number
                                    class="speInputNumber"
                                    v-model="scope.row.exwPrice"
                                    :placeholder="$i.product.pleaseInput"
                                    :mark="$i.product.exwPrice"
                                    :accuracy="4"
                                    :min="0"></v-input-number>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="exwCurrency"
                        align="center"
                        :label="$i.product.exwCurrency"
                        width="180">
                    <template slot-scope="scope">
                        <el-form-item class="tableList">
                            <el-select v-model="scope.row.exwCurrency" :placeholder="$i.product.pleaseChoose">
                                <el-option
                                        v-for="item in currencyOption"
                                        :key="item.id"
                                        :label="item.code"
                                        :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="cifPrice"
                        align="center"
                        :label="$i.product.cifPrice"
                        width="180">
                    <template slot-scope="scope">
                        <el-form-item class="tableList">
                            <v-input-number
                                    class="speInputNumber"
                                    v-model="scope.row.cifPrice"
                                    :placeholder="$i.product.pleaseInput"
                                    :mark="$i.product.cifPrice"
                                    :accuracy="4"
                                    :min="0"></v-input-number>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="cifCurrency"
                        align="center"
                        :label="$i.product.cifCurrency"
                        width="180">
                    <template slot-scope="scope">
                        <el-form-item class="tableList">
                            <el-select v-model="scope.row.cifCurrency" :placeholder="$i.product.pleaseChoose">
                                <el-option
                                        v-for="item in currencyOption"
                                        :key="item.id"
                                        :label="item.code"
                                        :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="cifArea"
                        align="center"
                        :label="$i.product.cifArea"
                        width="180">
                    <template slot-scope="scope">
                        <el-form-item class="tableList">
                            <el-input
                                    v-model="scope.row.cifArea"
                                    clearable
                                    :placeholder="$i.product.pleaseInput"></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="dduPrice"
                        align="center"
                        :label="$i.product.dduPrice"
                        width="180">
                    <template slot-scope="scope">
                        <el-form-item class="tableList">
                            <v-input-number
                                    class="speInputNumber"
                                    v-model="scope.row.dduPrice"
                                    :placeholder="$i.product.pleaseInput"
                                    :mark="$i.product.dduPrice"
                                    :accuracy="4"
                                    :min="0"></v-input-number>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="dduCurrency"
                        align="center"
                        :label="$i.product.dduCurrency"
                        width="180">
                    <template slot-scope="scope">
                        <el-form-item class="tableList">
                            <el-select v-model="scope.row.dduCurrency" :placeholder="$i.product.pleaseChoose">
                                <el-option
                                        v-for="item in currencyOption"
                                        :key="item.id"
                                        :label="item.code"
                                        :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="otherIncotermCurrency"
                        align="center"
                        :label="$i.product.dduArea"
                        width="180">
                    <template slot-scope="scope">
                        <el-form-item class="tableList">
                            <el-input
                                    v-model="scope.row.dduArea"
                                    clearable
                                    :placeholder="$i.product.pleaseInput"></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>
            </el-table>
        </el-form>

        <div class="title">{{$i.product.packingInfo}}</div>
        <el-form
                :model="productForm"
                ref="productForm4"
                class="speForm"
                label-width="230px"
                :label-position="labelPosition">
            <el-row>
                <el-col style="min-height: 51px;" v-if="v.belongTab==='packingInfo'" v-for="v in $db.product.detailTab"
                        :key="v.key" class="list" :xs="24" :sm="24" :md="v.fullLine?24:12" :lg="v.fullLine?24:12"
                        :xl="v.fullLine?24:12">
                    <el-form-item :prop="v.key" :label="v.label+':'">
                        <div v-if="v.showType==='select'">
                            <div v-if="v.isWeight">
                                <el-select class="speSelect" size="mini" v-model="productForm[v.key]" :placeholder="$i.product.pleaseChoose">
                                    <el-option
                                            v-for="item in weightOption"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.code">
                                    </el-option>
                                </el-select>
                            </div>
                            <div v-else-if="v.isLength">
                                <el-select class="speSelect" size="mini" v-model="productForm[v.key]" :placeholder="$i.product.pleaseChoose">
                                    <el-option
                                            v-for="item in lengthOption"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.code">
                                    </el-option>
                                </el-select>
                            </div>
                            <div v-else-if="v.isVolume">
                                <el-select class="speSelect" size="mini" v-model="productForm[v.key]" :placeholder="$i.product.pleaseChoose">
                                    <el-option
                                            v-for="item in volumeOption"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.code">
                                    </el-option>
                                </el-select>
                            </div>
                            <div v-else-if="v.isOem">
                                <el-select
                                        class="speSelect"
                                        clearable
                                        v-model="productForm[v.key]"
                                        :placeholder="$i.product.pleaseChoose">
                                    <el-option
                                            v-for="item in oemOption"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.code">
                                    </el-option>
                                </el-select>
                            </div>
                            <div v-else>
                                <el-select class="speSelect" size="mini" v-model="productForm[v.key]" :placeholder="$i.product.pleaseChoose">
                                    <el-option
                                            v-for="item in skuStatusOption"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div v-if="v.showType==='input'">
                            <el-input
                                    :disabled="v.disabledInput"
                                    size="mini"
                                    :placeholder="$i.product.pleaseInput"
                                    clearable
                                    v-model="productForm[v.key]">
                            </el-input>
                        </div>
                        <div v-if="v.showType==='textarea'">
                            <el-input
                                    class="speTextarea"
                                    size="mini"
                                    type="textarea"
                                    autosize
                                    :placeholder="$i.product.pleaseInput"
                                    v-model="productForm[v.key]">
                            </el-input>
                        </div>
                        <div v-if="v.showType==='number'">
                            <v-input-number
                                    class="speInputNumber"
                                    size="mini"
                                    :mark="v.label"
                                    :accuracy="v.accuracy"
                                    v-model="productForm[v.key]"
                                    :placeholder="$i.product.pleaseInput"
                                    :min="0">
                            </v-input-number>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <div class="title">{{$i.product.logisticInfo}}</div>
        <el-form :model="productForm" ref="productForm5" class="speForm" label-width="230px"
                 :label-position="labelPosition">
            <el-row>
                <el-col style="min-height: 51px;" v-if="v.belongTab==='logisticInfo'" v-for="v in $db.product.detailTab"
                        :key="v.key" class="list" :xs="24" :sm="24" :md="v.fullLine?24:12" :lg="v.fullLine?24:12"
                        :xl="v.fullLine?24:12">
                    <el-form-item :prop="v.key" :label="v.label+':'">
                        <div v-if="v.showType==='select'">
                            <el-select class="speSelect" size="mini" v-model="productForm[v.key]" :placeholder="$i.product.pleaseChoose">
                                <el-option
                                        v-for="item in skuStatusOption"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div v-if="v.showType==='input'">
                            <el-input
                                    :disabled="v.disabledInput"
                                    size="mini"
                                    :placeholder="$i.product.pleaseInput"
                                    clearable
                                    v-model="productForm[v.key]">
                            </el-input>
                        </div>
                        <div v-if="v.showType==='textarea'">
                            <el-input
                                    class="speTextarea"
                                    size="mini"
                                    type="textarea"
                                    autosize
                                    :placeholder="$i.product.pleaseInput"
                                    v-model="productForm[v.key]">
                            </el-input>
                        </div>
                        <div v-if="v.showType==='number'">
                            <v-input-number
                                    class="speInputNumber"
                                    :accuracy="v.accuracy"
                                    v-model="productForm[v.key]"
                                    :mark="v.label"
                                    :placeholder="$i.product.pleaseInput"
                                    :min="0">
                            </v-input-number>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <div class="title">{{$i.product.otherInfo}}</div>
        <el-form :model="productForm" ref="productForm6" class="speForm" label-width="230px"
                 :label-position="labelPosition">
            <el-row>
                <el-col style="min-height: 51px;" v-if="v.belongTab==='otherInfo'" v-for="v in $db.product.detailTab"
                        :key="v.key" class="list" :xs="24" :sm="24" :md="v.fullLine?24:12" :lg="v.fullLine?24:12"
                        :xl="v.fullLine?24:12">
                    <el-form-item :prop="v.key" :label="v.label+':'">
                        <div v-if="v.showType==='select'">
                            <div v-if="v.isCountry">
                                <el-select
                                        class="speSelect"
                                        size="mini"
                                        v-model="productForm[v.key]"
                                        filterable
                                        multiple
                                        collapse-tags
                                        :placeholder="$i.product.pleaseChoose">
                                    <el-option
                                            v-for="item in countryOption"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.code">
                                    </el-option>
                                </el-select>
                            </div>
                            <div v-else-if="v.isUDB">
                                <el-select
                                        class="speSelect"
                                        clearable
                                        v-model="productForm[v.key]"
                                        :placeholder="$i.product.pleaseChoose">
                                    <el-option
                                            v-for="item in udbOption"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div v-else-if="v.isSkuPkg">
                                <el-select
                                        class="speSelect"
                                        clearable
                                        v-model="productForm[v.key]"
                                        :placeholder="$i.product.pleaseChoose">
                                    <el-option
                                            v-for="item in skuPkgOption"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.code">
                                    </el-option>
                                </el-select>
                            </div>
                            <div v-else>
                                <el-select class="speSelect" size="mini" v-model="productForm[v.key]"
                                           :placeholder="$i.product.pleaseChoose">
                                    <el-option
                                            v-for="item in v.options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div v-if="v.showType==='input'">
                            <el-input
                                    :disabled="v.disabledInput"
                                    size="mini"
                                    :placeholder="$i.product.pleaseInput"
                                    clearable
                                    v-model="productForm[v.key]">
                            </el-input>
                        </div>
                        <div v-if="v.showType==='textarea'">
                            <el-input
                                    class="speTextarea"
                                    size="mini"
                                    type="textarea"
                                    autosize
                                    :placeholder="$i.product.pleaseInput"
                                    v-model="productForm[v.key]">
                            </el-input>
                        </div>
                        <div v-if="v.showType==='number'">
                            <div v-if="v.key==='lengthWidthHeight'">
                                <v-input-number
                                        class="speNum"
                                        :accuracy="2"
                                        v-model="boxSize.length"
                                        :min="0">
                                </v-input-number>
                                <div class="speIcon">*</div>
                                <v-input-number
                                        class="speNum"
                                        :accuracy="2"
                                        v-model="boxSize.width"
                                        :min="0">
                                </v-input-number>
                                <div class="speIcon">*</div>
                                <v-input-number
                                        class="speNum"
                                        :accuracy="2"
                                        v-model="boxSize.height"
                                        :min="0">
                                </v-input-number>
                            </div>
                            <div v-else>
                                <v-input-number
                                        class="speInputNumber"
                                        v-model="productForm[v.key]"
                                        :placeholder="$i.product.pleaseInput"
                                        :accuracy="v.accuracy"
                                        :mark="v.label"
                                        :min="0">
                                </v-input-number>
                            </div>
                        </div>
                        <div v-if="v.showType==='date'">
                            <el-date-picker
                                    size="mini"
                                    v-model="productForm[v.key]"
                                    align="right"
                                    type="month"
                                    :placeholder="$i.product.pleaseChoose"
                                    :editable="false">
                            </el-date-picker>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <div class="title">{{$i.product.attachment}}</div>
        <div style="margin-bottom: 20px">
            <v-upload :list="productForm.attachments" :limit="20" ref="uploadAttachment"></v-upload>
        </div>

        <div class="footBtn">
            <el-button @click="finish" :disabled="loadingData" :loading="disabledSubmit" type="primary">
                {{$i.product.finish}}
            </el-button>
        </div>

        <el-dialog width="70%" :title="$i.product.addCustomer" :visible.sync="addCustomerDialogVisible"
                   custom-class="ucn-dialog-center">
            <el-form ref="customerQuery" :model="customerQuery" label-width="120px">
                <el-row class="speZone">
                    <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item prop="name" :label="$i.product.customerName">
                            <el-input
                                    class="speInput"
                                    :placeholder="$i.product.pleaseInput"
                                    size="mini"
                                    v-model="customerQuery.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item prop="name" :label="$i.product.customerType">
                            <el-select class="speInput" v-model="customerQuery.type" clearable
                                       :placeholder="$i.product.pleaseChoose">
                                <el-option
                                        v-for="item in customerTypeOption"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item prop="name" :label="$i.product.customerCountry">
                            <el-select class="speInput" size="mini" v-model="customerQuery.country" filterable
                                       :placeholder="$i.product.pleaseChoose">
                                <el-option
                                        v-for="item in countryOption"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item prop="name" :label="$i.product.customerCity">
                            <el-input
                                    class="speInput"
                                    :placeholder="$i.product.pleaseInput"
                                    size="mini"
                                    v-model="customerQuery.city"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div style="text-align: center">
                <el-button :disabled="loadingTable" @click="searchCustomer" type="primary">{{$i.warehouse.search}}
                </el-button>
                <el-button :disabled="loadingTable" @click="clearCustomerSearch">{{$i.warehouse.clear}}</el-button>
            </div>
            <v-table
                    :height="500"
                    :loading="loadingTable"
                    :data="tableDataList"
                    @change-checked="changeChecked">
            </v-table>
            <div slot="footer" class="dialog-footer">
                <el-button :disabled="loadingTable" :loading="disableClickPost" type="primary" @click="postData">
                    {{$i.product.sure}}
                </el-button>
                <el-button :disabled="loadingTable" @click="addCustomerDialogVisible = false">{{$i.product.cancel}}
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import imgHandler from "../product/imgHandler";
    import { dropDownSingle, VTable, VUpload ,VInputNumber} from "@/components/index";

    export default {
        name: "addNewProduct",
        components: {
            imgHandler,
            VUpload,
            VTable,
            dropDown: dropDownSingle,
            VInputNumber
        },
        data() {
            return {
                skuStatusOption: [],
                /**
                 * 字典数据
                 * */
                currencyOption: [],      //币种字典
                countryOption: [],       //国家字典
                weightOption: [],        //重量单位
                saleStatusOption: [],    //销售状态字典
                dateOption: [],          //日期单位
                lengthOption: [],        //长度单位
                volumeOption: [],        //体积单位
                oemOption: [],           //可否贴牌
                udbOption: [],           //是否展示包装盒
                skuPkgOption: [],        //产品包装可否调整
                readilyOption: [],       //是否现货
                skuUnitOption: [],       //计量单位
                quarantineTypeOption: [],//检疫类别单位
                customerTypeOption: [],  //客户类型
                formationOption:[],      //产品组成

                loadingData: true,
                labelPosition: "left",
                disabledSubmit: false,               //防止用户多次提及表单
                imgGroup: [],
                addCustomerDialogVisible: false,     //弹出框可见
                disableClickPost: false,
                //配置可见性用户
                tableData: [],
                pickerOptions1: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    }
                },
                categoryList: [],
                boxSize: {
                    length: "",
                    width: "",
                    height: ""
                },
                countryList: [],
                customerQuery: {
                    name: "",
                    type: null,
                    country: "",
                    city: "",
                    pn: 1,
                    ps: 1000
                },
                productForm: {
                    attachments: [],
                    designs:[],                 //产品设计
                    notes:[],                   //产品说明书
                    id: "",                         //新增传空
                    ids: [],                         //选择的可见
                    pictures: [],
                    visibility: true,                //全网可见为true,否则false
                    status: '1',                      //0下架 1上架
                    nameEn: "",
                    barcode: "",                    //产品条码
                    nameCn: "",
                    descEn: "",
                    descCn: "",
                    code: "",                       //新增时请填写，传空
                    unit: "1",
                    formation: "",
                    materialEn: "",
                    materialCn: "",
                    colourEn: "",
                    colourCn: "",
                    minOrderQty: null,
                    deliveryDates: null,               //交期(做完需要多少天)
                    noneSellCountry: "",             //禁售国家
                    applicableAge: null,
                    expireDates: null,
                    expireUnit: "3",                  //保质期单位
                    readilyAvailable: "0",
                    availableQty: null,
                    mainSaleCountry: "",
                    mainSaleArea: "",
                    productionDates: null,             //开发时间
                    qualityStander: "",
                    yearListed: "",
                    useDisplayBox: "1",
                    displayBoxQty: null,
                    otherPackInfoCn: "",
                    otherPackInfoEn: "",
                    adjustPackage: "1",
                    lengthWidthHeight: "",
                    recycle: false,                     //只有在recycleBin里才是false
                    categoryId: "",                      //类型id
                    rateValueAddedTax: null,               //增值税率
                    taxRefundRate: null,
                    customsCode: "",
                    customsNameCn: "",
                    customsNameEn: "",
                    tradeMarkCn: "",
                    tradeMarkEn: "",
                    commodityInspectionCn: "",
                    commodityInspectionEn: "",
                    declareElement: "",
                    origin: "",
                    inspectQuarantineCategory: "",      //检疫类别
                    brand: "",
                    brandRemark: "",
                    brandRelated: "",
                    certificat: "",
                    gp20SkuQty: null,
                    gp40SkuQty: null,
                    hq40SkuQty: null,
                    tryDimension: null,                    //托盘尺寸？？？
                    skuQtyPerTray: null,
                    specialTransportRequire: "",
                    inventoryCostMethod: "",
                    warehourceDefault: "",
                    inventory: null,
                    safeInventory: null,
                    minInventory: null,
                    unitWeight: "7",                      //重量单位
                    unitLength: "5",                      //长度单位
                    unitVolume: "3",                      //提及单位
                    length: null,
                    width: null,
                    height: null,
                    netWeight: null,
                    volume: null,
                    methodPkgCn: "",
                    methodPkgEn: "",
                    innerCartonUnit: "",                //中包单位
                    innerCartonQty: null,
                    innerCartonLength: null,
                    innerCartonWidth: null,
                    innerCartonHeight: null,
                    innerCartonWeightNet: null,
                    innerCartonRoughWeight: null,
                    innerCartonVolume: null,
                    innerCartonDesc: "",
                    innerCartonMethodCn: "",
                    innerCartonMethodEn: "",
                    outerCartonUnit: "",                //外箱单位
                    outerCartonDesc: "",
                    innerCartonOuterNum: null,
                    outerCartonQty: null,
                    outerCartonLength: null,
                    outerCartonWidth: null,
                    outerCartonHeight: null,
                    outerCartonNetWeight: null,
                    outerCartonRoughWeight: null,
                    outerCartonVolume: null,
                    outerCartonMethodCn: "",
                    outerCartonMethodEn: "",
                    oem: "1",
                    logisticId: 1,
                    pkgId: 1,
                    price: [
                        {
                            cifArea: "",
                            cifCurrency: "USD",
                            cifPrice: null,
                            dduArea: "",
                            dduCurrency: "USD",
                            dduPrice: null,
                            fobCurrency: "USD",
                            fobPrice: null,                    //价格起始是多少
                            fobPort: "",
                            exwPrice: null,                    //价格起始是多少
                            exwCurrency: "USD",
                            status: 1                       //1成本价，2基础报价
                        },
                        {
                            cifArea: "",
                            cifCurrency: "USD",
                            cifPrice: null,
                            dduArea: "",
                            dduCurrency: "USD",
                            dduPrice: null,
                            fobCurrency: "USD",
                            fobPrice: null,
                            fobPort: "",
                            exwPrice: null,
                            exwCurrency: "USD",
                            status: 2
                        }
                    ]
                },
                defaultProps: {
                    label: "name",
                    children: "children"
                },
                options: [],

                /**
                 * 弹出框data
                 * */
                loadingTable: false,
                tableDataList: [],
                selectList: []
            };
        },
        methods: {
            getCategoryId() {
                const sys=this.$ajax.get(this.$apis.CATEGORY_SYSTEM, {});
                const mine=this.$ajax.get(this.$apis.CATEGORY_MINE, {});
                let category=[
                    {
                        id: 5125124,
                        name: this.$i.product.myCategory,
                        children: [],
                        _disableClick: true
                    },
                    {
                        id: 12122353,
                        name: this.$i.product.sysCategory,
                        children: [],
                        _disableClick: true
                    }
                ];
                this.$ajax.all([sys,mine]).then(res=>{
                    category[1].children = res[0];
                    category[0].children = res[1];
                    this.categoryList=category;
                });
            },
            addCustomer() {
                this.customerQuery.name='';
                this.customerQuery.type=null;
                this.customerQuery.country='';
                this.customerQuery.city='';
                this.addCustomerDialogVisible = true;
                this.loadingTable = true;
                this.$ajax.post(this.$apis.get_sellerCustomer, this.customerQuery).then(res => {
                    this.loadingTable = false;
                    this.tableDataList = this.$getDB(this.$db.product.addProductCustomer, res.datas, e => {
                        this.tableData.forEach(v => {
                            if (v.customerId === e.id.value) {
                                this.$set(e, "_disabled", true);
                                this.$set(e, "_checked", true);
                            }
                        });
                    });
                }).catch(err => {
                    this.loadingTable = false;
                });
            },
            removeCustomer(data) {
                let item = _.findWhere(this.tableData, { code: data.code });
                this.tableData = _.difference(this.tableData, [item]);
            },
            finish() {
                if (this.$validateForm(this.productForm, this.$db.product.detailTab)) {
                    return;
                }

                let size = this.boxSize.length + "*" + this.boxSize.width + "*" + this.boxSize.height;
                this.$set(this.productForm, "lengthWidthHeight", size);

                //处理附件
                let param = Object.assign({}, this.productForm);
                param.pictures = this.$refs.upload.getFiles();
                param.attachments = this.$refs.uploadAttachment.getFiles();
                param.designs=this.$refs.designs[0].getFiles();
                param.notes=this.$refs.notes[0].getFiles();

                this.disabledSubmit = true;
                if (this.$route.query.id && this.$route.query.isEdit) {
                    //代表是编辑
                    _.mapObject(param, (e, k) => {
                        if (k === "status" || k === "unit" || k === "readilyAvailable" || k === "expireUnit" || k === "unitLength" || k === "unitVolume" || k === "unitWeight" || k === "oem" || k === "useDisplayBox") {
                            param[k] = parseInt(param[k]);
                        } else if (k === "noneSellCountry" || k === "mainSaleCountry") {
                            let item = "";
                            if (param[k].length === 0) {
                                param[k] = "";
                            } else {
                                param[k].forEach((v, index) => {
                                    if (index === param[k].length - 1) {
                                        item += v;
                                    } else {
                                        item += (v + ",");
                                    }
                                });
                                param[k] = item;
                            }
                        } else if (k === "adjustPackage") {
                            param[k] = param[k] === "1" ? true : false;
                        }
                    });
                    if (!param.readilyAvailable) {
                        param.availableQty = 0;
                    }
                    if (param.visibility) {
                        param.ids = [];
                    } else {
                        param.ids = [];
                        this.tableData.forEach(v => {
                            param.ids.push(v.customerId);
                        });
                    }
                    this.$ajax.post(this.$apis.update_buyerProductDetail, param).then(res => {
                        this.$message({
                            message: this.$i.product.modifySuccess,
                            type: "success"
                        });
                        this.disabledSubmit = false;
                        this.$router.push({
                            path: "/product/detail",
                            query: {
                                id: res
                            }
                        });
                    }).catch(err => {
                        this.disabledSubmit = false;
                    });
                }
                else {
                    //代表是新增
                    _.mapObject(param, (e, k) => {
                        if (k === "status" || k === "unit" || k === "readilyAvailable" || k === "expireUnit" || k === "unitLength" || k === "unitVolume" || k === "unitWeight" || k === "oem" || k === "useDisplayBox") {
                            param[k] = parseInt(param[k]);
                        } else if (k === "noneSellCountry" || k === "mainSaleCountry") {
                            let item = "";
                            if (param[k].length === 0) {
                                param[k] = "";
                            } else {
                                param[k].forEach((v, index) => {
                                    if (index === param[k].length - 1) {
                                        item += v;
                                    } else {
                                        item += (v + ",");
                                    }
                                });
                                param[qk] = item;
                            }
                        } else if (k === "adjustPackage") {
                            param[k] = param[k] === "1" ? true : false;
                        }
                    });
                    if (!param.readilyAvailable) {
                        param.availableQty = 0;
                    }
                    if (param.visibility) {
                        param.ids = [];
                    }
                    else {
                        param.ids = [];
                        this.tableData.forEach(v => {
                            param.ids.push(v.customerId);
                        });
                    }
                    this.$ajax.post(this.$apis.add_newSKU, param).then(res => {
                        this.$message({
                            message: this.$i.product.successfullyAdd,
                            type: "success"
                        });
                        this.disabledSubmit = false;
                        this.$router.push({
                            path: "/product/detail",
                            query: {
                                id: res
                            }
                        });
                    }).catch(err => {
                        this.disabledSubmit = false;
                    });
                }
            },
            getGoodsData() {
                this.loadingData = true;
                this.$ajax.get(this.$apis.get_productDetail, { id: this.$route.query.id }).then(res => {
                    this.productForm = res;
                    if(!this.productForm.price || this.productForm.price.length===0){
                        this.productForm.price=[
                            {
                                cifArea: "",
                                cifCurrency: "USD",
                                cifPrice: null,
                                dduArea: "",
                                dduCurrency: "USD",
                                dduPrice: null,
                                fobCurrency: "USD",
                                fobPrice: null,                    //价格起始是多少
                                fobPort: "",
                                exwPrice: null,                    //价格起始是多少
                                exwCurrency: "USD",
                                status: 1                       //1成本价，2基础报价
                            },
                            {
                                cifArea: "",
                                cifCurrency: "USD",
                                cifPrice: null,
                                dduArea: "",
                                dduCurrency: "USD",
                                dduPrice: null,
                                fobCurrency: "USD",
                                fobPrice: null,
                                fobPort: "",
                                exwPrice: null,
                                exwCurrency: "USD",
                                status: 2
                            }
                        ]
                    }
                    else if(this.productForm.price.length===1){
                        if(this.productForm.price[0].status===1){
                            this.productForm.price.push({
                                cifArea: "",
                                cifCurrency: "USD",
                                cifPrice: null,
                                dduArea: "",
                                dduCurrency: "USD",
                                dduPrice: null,
                                fobCurrency: "USD",
                                fobPrice: null,
                                fobPort: "",
                                exwPrice: null,
                                exwCurrency: "USD",
                                status: 2
                            });
                        }else if(this.productForm.price[0].status===1){
                            this.productForm.price.push({
                                cifArea: "",
                                cifCurrency: "USD",
                                cifPrice: null,
                                dduArea: "",
                                dduCurrency: "USD",
                                dduPrice: null,
                                fobCurrency: "USD",
                                fobPrice: null,
                                fobPort: "",
                                exwPrice: null,
                                exwCurrency: "USD",
                                status: 1
                            });
                        }
                    }

                    let lengthWidthHeight = this.productForm.lengthWidthHeight.split("*");
                    this.boxSize.length = lengthWidthHeight[0];
                    this.boxSize.width = lengthWidthHeight[1];
                    this.boxSize.height = lengthWidthHeight[2];
                    _.mapObject(this.productForm, (e, k) => {
                        if (k === "unit" || k === "readilyAvailable" || k === "expireUnit" || k === "unitLength" || k === "unitVolume" || k === "unitWeight") {
                            this.productForm[k] = String(this.productForm[k]);
                        } else if (k === "noneSellCountry" || k === "mainSaleCountry") {
                            if (this.productForm[k]) {
                                this.productForm[k] = this.productForm[k].split(",");
                            } else {
                                this.productForm[k] = [];
                            }
                        } else if (k === "adjustPackage" || k === "oem" || k === "useDisplayBox") {
                            this.productForm[k] = this.productForm[k] ? "1" : "0";
                        }
                    });
                    this.$ajax.post(this.$apis.get_sellerCustomerList, {
                        id: this.productForm.id,
                        pn: 1,
                        ps: 1000
                    }).then(res => {
                        this.tableData = res.datas;
                    }).finally(err => {
                        this.loadingData = false;
                    });
                }).catch(err => {
                    this.loadingData = false;
                });
            },

            /**
             * 弹出框事件
             * */
            changeChecked(e) {
                this.selectList = e;
            },
            searchCustomer() {
                this.loadingTable = true;
                this.$ajax.post(this.$apis.get_sellerCustomer, this.customerQuery).then(res => {
                    this.loadingTable = false;
                    this.tableDataList = this.$getDB(this.$db.product.addProductCustomer, res.datas, e => {
                        this.tableData.forEach(v => {
                            if (v.id === e.id.value) {
                                this.$set(e, "_disabled", true);
                                this.$set(e, "_checked", true);
                            }
                        });
                    });

                }).catch(err => {
                    this.loadingTable = false;
                });
            },
            clearCustomerSearch() {
                this.customerQuery.name = "";
                this.customerQuery.type = null;
                this.customerQuery.country = "";
                this.customerQuery.city = "";
            },
            postData() {
                let id = [];
                this.tableDataList.forEach(v => {
                    if (v._checked && !v._disabled) {
                        id.push(v.id.value);
                    }
                });
                if (id.length) {
                    this.disableClickPost = true;
                    this.$ajax.post(this.$apis.get_sellerCustomerGroup, id).then(res => {
                        res.forEach(v => {
                            v.customerId = v.id;
                            this.tableData.push(v);
                        });
                        this.addCustomerDialogVisible = false;
                        this.disableClickPost = false;
                    }).catch(() => {
                        this.addCustomerDialogVisible = false;
                        this.disableClickPost = false;
                    });
                } else {
                    this.addCustomerDialogVisible = false;
                }
            },

            /**
             * 获取字典
             * */
            getUnit() {
                const currencyAjax = this.$ajax.get(this.$apis.get_currencyUnit, {}, { cache: true });
                const countryAjax = this.$ajax.get(this.$apis.get_country, {}, { cache: true });
                const codeAjax = this.$ajax.post(this.$apis.get_partUnit, ["SKU_SALE_STATUS", "SKU_READILY_AVAIALBLE", "ED_UNIT", "WT_UNIT", "VE_UNIT", "LH_UNIT", "OEM_IS", "UDB_IS", "SKU_PG_IS", "RA_IS", "SKU_UNIT", "QUARANTINE_TYPE", "CUSTOMER_TYPE",'SKU_FORMATION'], { cache: true });
                this.loadingData = true;
                this.$ajax.all([currencyAjax, countryAjax, codeAjax]).then(res => {
                    this.currencyOption = res[0];
                    this.countryOption = res[1];
                    res[2].forEach(v => {
                        if (v.code === "ED_UNIT") {
                            this.dateOption = v.codes;
                        } else if (v.code === "WT_UNIT") {
                            this.weightOption = v.codes;
                        } else if (v.code === "VE_UNIT") {
                            this.volumeOption = v.codes;
                        } else if (v.code === "LH_UNIT") {
                            this.lengthOption = v.codes;
                        } else if (v.code === "SKU_SALE_STATUS") {
                            this.saleStatusOption = v.codes;
                        } else if (v.code === "OEM_IS") {
                            this.oemOption = v.codes;
                        } else if (v.code === "UDB_IS") {
                            this.udbOption = v.codes;
                        } else if (v.code === "SKU_PG_IS") {
                            this.skuPkgOption = v.codes;
                        } else if (v.code === "RA_IS") {
                            this.readilyOption = v.codes;
                        } else if (v.code === "SKU_UNIT") {
                            this.skuUnitOption = v.codes;
                        } else if (v.code === "QUARANTINE_TYPE") {
                            this.quarantineTypeOption = v.codes;
                        } else if (v.code === "CUSTOMER_TYPE") {
                            this.customerTypeOption = v.codes;
                        } else if (v.code === "SKU_FORMATION") {
                            this.formationOption = v.codes;
                        }
                    });
                    if (this.$route.query.isEdit) {
                        this.getGoodsData();
                    }
                }).finally(() => {
                    this.loadingData = false;
                });
            }
        },
        created() {
            this.getCategoryId();
            this.getUnit();
        },
    };
</script>

<style scoped>
    .manually-add {
        position: relative;
    }

    .number {
        min-height: 51px;
    }

    .number >>> .v-input-number--mini {
        width: 80%;
    }

    .select >>> .el-select {
        width: 80%;
    }

    .title {
        font-weight: bold;
        font-size: 18px;
        height: 32px;
        line-height: 32px;
        color: #666666;
        margin-top: 10px;
    }

    .addPic {
        height: 50px;
        line-height: 50px;
    }

    .addPic > div {
        float: left;
        height: 50px;
        line-height: 50px;
    }

    .addPic .imgGroup {
        margin-left: 10px;
    }

    .addPic .btns {
        margin-left: 20px;
    }

    .speForm .el-form-item--small.el-form-item {
        /*margin-bottom: 0;*/
    }

    .speForm .el-row .list .el-input {
        width: 80%;
    }

    .tableList >>> .el-form-item__content {
        margin-left: 0 !important;
    }
    .tableList{
        margin: 5px 0;
    }

    .speTextarea {
        width: 90%;
    }

    .speSelect {
        width: 80%;
    }

    .speInputNumber {
        width: 80%;
    }

    .speInputNumber >>> input {
        text-align: left;
    }

    .speInput {
        width: 80%;
    }

    .speNum {
        width: 60px;
    }

    .speIcon {
        display: inline-block;
        height: 28px;
        line-height: 28px;
    }

    .dropdown {
        height: 32px;
        width: 80%;
    }

    .speNumbberInput {
        width: 80%;
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
        text-align: left;
        z-index: 5;
    }

    .dialog-footer {
        text-align: center;
    }
</style>
