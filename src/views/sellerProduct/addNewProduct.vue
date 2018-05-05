<template>
    <div class="add-product">
        <div class="title">{{$i.productCn.basicInformation}}</div>
        <div class="addPic">
            <div class="name">
                Pic:
            </div>
            <div class="imgGroup">
                <img-handler :data="imgGroup"></img-handler>
            </div>
            <div class="btns">
                <up-load></up-load>
            </div>
        </div>
        <el-form :model="productForm" :rules="rules" ref="productForm1" class="speForm" label-width="230px" :label-position="labelPosition">
            <el-row>
                <!--设置高度51px以免inputNumber错位-->
                <el-col style="height: 51px;" v-if="v.belongTab==='basicInfo'" v-for="v in $db.product.detailTab" :key="v.key" class="list" :xs="24" :sm="24" :md="v.fullLine?24:12" :lg="v.fullLine?24:12" :xl="v.fullLine?24:12">
                    <el-form-item :prop="v.key" :label="v.label+':'">
                        <div v-if="v.showType==='select'">
                            <el-select class="speSelect" size="mini" v-model="productForm[v.key]" placeholder="请选择">
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
                                    placeholder="系统生成"
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
                                    placeholder="请输入内容"
                                    v-model="productForm[v.key]">
                            </el-input>
                        </div>
                        <div v-if="v.showType==='number'">
                            <el-input-number
                                    class="speInputNumber"
                                    size="mini"
                                    :controls="false"
                                    v-model="productForm[v.key]"
                                    :min="0"
                                    label="描述文字">
                            </el-input-number>
                        </div>
                        <div v-if="v.showType==='dropdown'">
                            <drop-down :defaultProps="defaultProps" class="speInputNumber" v-model="productForm[v.key]" :list="dropData" ref="dropDown"></drop-down>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col class="list" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <el-form-item :label="$i.productCn.productVisible">
                        <el-radio v-model="productForm.visibility" label="全网可见">{{$i.productCn.allSee}}</el-radio>
                        <el-radio v-model="productForm.visibility" label="部分客户可见">{{$i.productCn.partSee}}</el-radio>

                        <div v-if="!productForm.visibility">
                            <el-button
                                    @click="addCustomer"
                                    size="mini"
                                    type="primary">{{$i.productCn.add}}</el-button>
                            <el-table
                                    :data="tableData"
                                    style="width: 511px"
                                    border>
                                <el-table-column
                                        prop="date"
                                        :label="$i.productCn.customerName"
                                        align="center"
                                        width="180">
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        :label="$i.productCn.customerCode"
                                        align="center"
                                        width="180">
                                </el-table-column>
                                <el-table-column
                                        prop="address"
                                        width="150"
                                        align="center"
                                        :label="$i.productCn.action">
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <div class="title">{{$i.productCn.customerInfo}}</div>
        <el-form :model="productForm" ref="productForm2" class="speForm" label-width="230px" :label-position="labelPosition">
            <el-row>
                <el-col style="height: 51px;" v-if="v.belongTab==='customerInfo'" v-for="v in $db.product.detailTab" :key="v.key" class="list" :xs="24" :sm="24" :md="v.fullLine?24:12" :lg="v.fullLine?24:12" :xl="v.fullLine?24:12">
                    <el-form-item :prop="v.key" :label="v.label+':'">
                        <div v-if="v.showType==='select'">
                            <el-select class="speSelect" size="mini" v-model="productForm[v.key]" placeholder="请选择">
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
                                    placeholder="系统生成"
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
                                    placeholder="请输入内容"
                                    v-model="productForm[v.key]">
                            </el-input>
                        </div>
                        <div v-if="v.showType==='number'">
                            <el-input-number
                                    class="speInputNumber"
                                    size="mini"
                                    :controls="false"
                                    v-model="productForm[v.key]"
                                    :min="0"
                                    label="描述文字">
                            </el-input-number>
                        </div>
                        <div v-if="v.showType==='dropdown'">
                            <drop-down class="speInputNumber" v-model="productForm[v.key]" :list="dropData" ref="dropDown"></drop-down>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <div class="title">{{$i.productCn.priceInfo}}</div>
        <el-form :model="productForm" ref="productForm3" class="speForm" label-width="230px" :label-position="labelPosition">
            <el-table
                    :data="productForm.price"
                    border
                    style="width: 100%">
                <el-table-column
                        align="center"
                        width="180">
                    <template slot-scope="scope">
                        <div v-if="scope.$index===0">
                            {{$i.productCn.costPrice}}
                        </div>
                        <div v-if="scope.$index===1">
                            {{$i.productCn.quotedPrice}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="fobCurrency"
                        align="center"
                        :label="$i.productCn.fobCurrency"
                        width="180">
                    <template slot-scope="scope">
                        <el-form-item class="tableList">
                            <el-select v-model="scope.row.fobCurrency" placeholder="请选择">
                                <el-option
                                        v-for="item in fobUnit"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="fobPrice"
                        align="center"
                        :label="$i.productCn.fobPrice"
                        width="180">
                    <template slot-scope="scope">
                        <el-form-item class="tableList">
                            <el-input-number
                                    v-model="scope.row.fobPrice"
                                    :controls="false"
                                    :min="0"
                                    label="描述文字"></el-input-number>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="fobPort"
                        align="center"
                        :label="$i.productCn.fobPort"
                        width="180">
                    <template slot-scope="scope">
                        <el-form-item class="tableList">
                            <el-input
                                    v-model="scope.row.fobPort"
                                    clearable
                                    placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="exwPrice"
                        align="center"
                        :label="$i.productCn.exwPrice"
                        width="180">
                    <template slot-scope="scope">
                        <el-form-item class="tableList">
                            <el-input-number
                                    v-model="scope.row.exwPrice"
                                    :controls="false"
                                    :min="0"
                                    label="描述文字"></el-input-number>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="exwCurrency"
                        align="center"
                        :label="$i.productCn.exwCurrency"
                        width="180">
                    <template slot-scope="scope">
                        <el-form-item class="tableList">
                            <el-select v-model="scope.row.exwCurrency" placeholder="请选择">
                                <el-option
                                        v-for="item in fobUnit"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="otherIncoterm"
                        align="center"
                        :label="$i.productCn.cifPrice"
                        width="180">
                    <template slot-scope="scope">
                        <el-form-item class="tableList">
                            <el-input-number
                                    v-model="scope.row.cifPrice"
                                    :controls="false"
                                    :min="0"
                                    label="描述文字"></el-input-number>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="otherIncotermPrice"
                        align="center"
                        :label="$i.productCn.cifCurrency"
                        width="180">
                    <template slot-scope="scope">
                        <el-form-item class="tableList">
                            <el-select v-model="scope.row.cifCurrency" placeholder="请选择">
                                <el-option
                                        v-for="item in fobUnit"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="otherIncotermArea"
                        align="center"
                        :label="$i.productCn.cifArea"
                        width="180">
                    <template slot-scope="scope">
                        <el-form-item class="tableList">
                            <el-input
                                    v-model="scope.row.cifArea"
                                    clearable
                                    placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="otherIncotermCurrency"
                        align="center"
                        :label="$i.productCn.dduPrice"
                        width="180">
                    <template slot-scope="scope">
                        <el-form-item class="tableList">
                            <el-input-number
                                    v-model="scope.row.dduPrice"
                                    :controls="false"
                                    :min="0"
                                    label="描述文字"></el-input-number>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="otherIncotermCurrency"
                        align="center"
                        :label="$i.productCn.dduCurrency"
                        width="180">
                    <template slot-scope="scope">
                        <el-form-item class="tableList">
                            <el-select v-model="scope.row.dduCurrency" placeholder="请选择">
                                <el-option
                                        v-for="item in fobUnit"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="otherIncotermCurrency"
                        align="center"
                        :label="$i.productCn.dduArea"
                        width="180">
                    <template slot-scope="scope">
                        <el-form-item class="tableList">
                            <el-input
                                    v-model="scope.row.dduArea"
                                    clearable
                                    placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>
            </el-table>
        </el-form>

        <div class="title">{{$i.productCn.packingInfo}}</div>
        <el-form :model="productForm" ref="productForm4" class="speForm" label-width="230px" :label-position="labelPosition">
            <el-row>
                <el-col style="height: 51px;" v-if="v.belongTab==='packingInfo'" v-for="v in $db.product.detailTab" :key="v.key" class="list" :xs="24" :sm="24" :md="v.fullLine?24:12" :lg="v.fullLine?24:12" :xl="v.fullLine?24:12">
                    <el-form-item :prop="v.key" :label="v.label+':'">
                        <div v-if="v.showType==='select'">
                            <el-select class="speSelect" size="mini" v-model="productForm[v.key]" placeholder="请选择">
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
                                    placeholder="请输入"
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
                                    placeholder="请输入内容"
                                    v-model="productForm[v.key]">
                            </el-input>
                        </div>
                        <div v-if="v.showType==='number'">
                            <el-input-number
                                    class="speInputNumber"
                                    size="mini"
                                    :controls="false"
                                    v-model="productForm[v.key]"
                                    :min="0"
                                    label="描述文字">
                            </el-input-number>
                        </div>
                        <div v-if="v.showType==='dropdown'">
                            <drop-down class="speInputNumber" v-model="productForm[v.key]" :list="dropData" ref="dropDown"></drop-down>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <div class="title">{{$i.productCn.logisticInfo}}</div>
        <el-form :model="productForm" ref="productForm5" class="speForm" label-width="230px" :label-position="labelPosition">
            <el-row>
                <el-col style="height: 51px;" v-if="v.belongTab==='logisticInfo'" v-for="v in $db.product.detailTab" :key="v.key" class="list" :xs="24" :sm="24" :md="v.fullLine?24:12" :lg="v.fullLine?24:12" :xl="v.fullLine?24:12">
                    <el-form-item :prop="v.key" :label="v.label+':'">
                        <div v-if="v.showType==='select'">
                            <el-select class="speSelect" size="mini" v-model="productForm[v.key]" placeholder="请选择">
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
                                    placeholder="请输入"
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
                                    placeholder="请输入内容"
                                    v-model="productForm[v.key]">
                            </el-input>
                        </div>
                        <div v-if="v.showType==='number'">
                            <el-input-number
                                    class="speInputNumber"
                                    size="mini"
                                    :controls="false"
                                    v-model="productForm[v.key]"
                                    :min="0"
                                    label="描述文字">
                            </el-input-number>
                        </div>
                        <div v-if="v.showType==='dropdown'">
                            <drop-down class="speInputNumber" v-model="productForm[v.key]" :list="dropData" ref="dropDown"></drop-down>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <div class="title">{{$i.productCn.otherInfo}}</div>
        <el-form :model="productForm" ref="productForm6" class="speForm" label-width="230px" :label-position="labelPosition">
            <el-row>

                <el-col style="height: 51px;" v-if="v.belongTab==='otherInfo'" v-for="v in $db.product.detailTab" :key="v.key" class="list" :xs="24" :sm="24" :md="v.fullLine?24:12" :lg="v.fullLine?24:12" :xl="v.fullLine?24:12">
                    <el-form-item :prop="v.key" :label="v.label+':'">
                        <div v-if="v.showType==='select'">
                            <el-select class="speSelect" size="mini" v-model="productForm[v.key]" placeholder="请选择">
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
                                    placeholder="请输入"
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
                                    placeholder="请输入内容"
                                    v-model="productForm[v.key]">
                            </el-input>
                        </div>
                        <div v-if="v.showType==='number'">
                            <div v-if="v.key==='lengthWidthHeight'">
                                <el-input-number
                                        class="speNum"
                                        size="mini"
                                        :controls="false"
                                        v-model="boxSize.length"
                                        :min="0"
                                        label="描述文字">
                                </el-input-number>
                                <div class="speIcon">*</div>
                                <el-input-number
                                        class="speNum"
                                        size="mini"
                                        :controls="false"
                                        v-model="boxSize.width"
                                        :min="0"
                                        label="描述文字">
                                </el-input-number>
                                <div class="speIcon">*</div>
                                <el-input-number
                                        class="speNum"
                                        size="mini"
                                        :controls="false"
                                        v-model="boxSize.height"
                                        :min="0"
                                        label="描述文字">
                                </el-input-number>
                            </div>
                            <div v-else>
                                <el-input-number
                                        class="speInputNumber"
                                        size="mini"
                                        :controls="false"
                                        v-model="productForm[v.key]"
                                        :min="0"
                                        label="描述文字">
                                </el-input-number>
                            </div>
                        </div>
                        <div v-if="v.showType==='dropdown'">
                            <drop-down class="speInputNumber" v-model="productForm[v.key]" :list="dropData" ref="dropDown"></drop-down>
                        </div>
                        <div v-if="v.showType==='date'">
                            <el-date-picker
                                    size="mini"
                                    v-model="productForm[v.key]"
                                    align="right"
                                    type="date"
                                    placeholder="选择日期"
                                    :editable="false"
                                    :picker-options="pickerOptions1">
                            </el-date-picker>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <div class="title">{{$i.productCn.attachment}}</div>

        <input style="display: none" id="pic" name="file" type="file" accept="image/*" @change="uploadPic">

        <div class="footBtn">
            <el-button @click="finish" :loading="disabledSubmit" type="primary">{{$i.productCn.finish}}</el-button>
        </div>


        <el-dialog width="70%" title="收货地址" :visible.sync="addCustomerDialogVisible">


            <el-form ref="customerQuery" :model="customerQuery" label-width="120px">
                <el-row class="speZone">
                    <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">

                        <el-form-item prop="name" :label="$i.productCn.customerName">
                            <el-input
                                    size="mini"
                                    v-model="customerQuery.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">

                        <el-form-item prop="name" :label="$i.productCn.customerType">
                            <el-input
                                    size="mini"
                                    v-model="customerQuery.type"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">

                        <el-form-item prop="name" :label="$i.productCn.customerCountry">
                            <el-input
                                    size="mini"
                                    v-model="customerQuery.country"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">

                        <el-form-item prop="name" :label="$i.productCn.customerCity">
                            <el-input
                                    size="mini"
                                    v-model="customerQuery.city"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="addCustomerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addCustomerDialogVisible = false">确 定</el-button>
            </div>
        </el-dialog>




    </div>
</template>

<script>
    import upLoad from '@/components/common/upload/upload'
    import imgHandler from '../product/bookmark/imgHandler'
    import {dropDownSingle} from '@/components/index'

    export default {
        name: "addNewProduct",
        components:{
            imgHandler,
            upLoad,
            dropDown:dropDownSingle
        },
        data(){
            return{
                labelPosition:'left',
                disabledSubmit:false,               //防止用户多次提及表单
                imgGroup:[],
                addCustomerDialogVisible:false,     //弹出框可见
                //配置可见性用户
                tableData:[
                    {
                        date: '2016-05-02',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    },
                ],

                customerQuery:{
                    city: "",
                    country: "",
                    name: "",
                    pn: 1,
                    ps: 50,
                    // sorts: [
                    //     {
                    //         "nativeSql": true,
                    //         "orderBy": "string",
                    //         "orderType": "string",
                    //         "resultMapId": "string"
                    //     }
                    // ],
                    type: null
                },

                productForm:{
                    id: '',                         //新增传空
                    ids:[],                         //选择的可见
                    pic: "thisIsAPicture",
                    visibility:true,                //全网可见为true,否则false
                    status: 1,                      //0下架 1上架
                    nameEn: "",
                    barcode: "",                    //产品条码
                    nameCn: "",
                    descEn: "",
                    descCn: "",
                    descCustomer: "",
                    nameCustomer: "",
                    customerSkuCode: "",
                    supplierCode: "",
                    supplierName: "",
                    code: "",                       //新增时系统生成，传空
                    unit: "2",
                    formation: "",
                    materialEn: "",
                    materialCn: "",
                    colourEn: "",
                    colourCn: "",
                    minOrderQty: 1,
                    deliveryDates: 1,               //交期(做完需要多少天)
                    design: "",
                    noneSellCountry: 1,             //禁售国家，暂时传1
                    applicableAge: 1,
                    expireDates: 1,
                    expireUnit: 1,                  //保质期单位，暂时传1
                    comments: "",
                    readilyAvailable: 1,
                    availableQty: 1,
                    mainSaleCountry: 1,
                    mainSaleArea: "",
                    productionDates: 1,             //开发时间
                    qualityStander: "",
                    yearListed: "2018-02-23",
                    useDisplayBox: 1,
                    displayBoxQty: 0,
                    otherPackInfoCn: "",
                    otherPackInfoEn: "",
                    adjustPackage: 2,
                    lengthWidthHeight: "",
                    recycle: false,                     //只有在recycleBin里才是false
                    categoryId: '',                      //类型id
                    rateValueAddedTax: 1,               //增值税率
                    taxRefundRate: 1,
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
                    gp20SkuQty: 0,
                    gp40SkuQty: 0,
                    hq40SkuQty: 0,
                    tryDimension: 1,                    //托盘尺寸？？？
                    skuQtyPerTray: 0,
                    specialTransportRequire: "",
                    inventoryCostMethod: "",
                    warehourceDefault: "",
                    inventory: 0,
                    safeInventory: 0,
                    minInventory: 0,
                    unitWeight: 1,                      //重量单位,暂时传1
                    unitLength: 1,                      //长度单位,暂时传1
                    unitVolume: 1,                      //提及单位，暂时传1
                    length: 0,
                    width: 0,
                    height: 0,
                    netWeight: 0,
                    volume: 0,
                    methodPkgCn: "",
                    methodPkgEn: "",
                    innerCartonUnit: "",                //中包单位
                    innerCartonQty: 0,
                    innerCartonLength: 0,
                    innerCartonWidth: 0,
                    innerCartonHeight: 0,
                    innerCartonWeightNet: 0,
                    innerCartonRoughWeight: 0,
                    innerCartonVolume: 0,
                    innerCartonDesc: "",
                    innerCartonMethodCn: "",
                    innerCartonMethodEn: "",
                    outerCartonUnit: "",                //外箱单位
                    outerCartonDesc: "",
                    innerCartonOuterNum: 0,
                    outerCartonQty: 0,
                    outerCartonLength: 0,
                    outerCartonWidth: 0,
                    outerCartonHeight: 0,
                    outerCartonNetWeight: 0,
                    outerCartonRoughWeight: 0,
                    outerCartonVolume: 0,
                    outerCartonMethodCn: "",
                    outerCartonMethodEn: "",
                    oem: 1,
                    logisticId: 1,
                    version: 1,
                    pkgId: 1,
                    price: [
                        {
                            cifArea: "",
                            cifCurrency: 0,
                            cifPrice: 0,
                            dduArea: "",
                            dduCurrency: 0,
                            dduPrice: 0,
                            fobCurrency: 1,
                            fobPrice: 1,                    //价格起始是多少
                            fobPort: "",
                            exwPrice: 1,                    //价格起始是多少
                            exwCurrency: 1,
                            status: 1                       //1成本价，2基础报价
                        },
                        {
                            cifArea: "",
                            cifCurrency: 0,
                            cifPrice: 0,
                            dduArea: "",
                            dduCurrency: 0,
                            dduPrice: 0,
                            fobCurrency: 1,
                            fobPrice: 1,
                            fobPort: "",
                            exwPrice: 1,
                            exwCurrency: 1,
                            status: 2
                        },
                    ]
                },

                rules:{
                    nameEn:[
                        {max:45,message: '最大长度为45',}
                    ],
                    nameCn:[
                        {max:45,message: '最大长度为45',}
                    ],
                    barcode:[
                        {max:45,message: '最大长度为45',}
                    ],
                    descEn:[
                        {max:300,message: '最大长度为300',}
                    ],
                    descCn:[
                        {max:300,message: '最大长度为300',}
                    ],
                    descCustomer:[
                        {max:300,message: '最大长度为300',}
                    ],
                    nameCustomer:[
                        {max:100,message: '最大长度为100',}
                    ],
                    customerSkuCode:[
                        {max:50,message: '最大长度为50',}
                    ],
                    supplierCode:[
                        {max:45,message: '最大长度为45',}
                    ],
                    supplierName:[
                        {max:80,message: '最大长度为80',}
                    ],
                    code:[
                        {max:40,message: '最大长度为40',}
                    ],
                    unit:[
                        {max:45,message: '最大长度为45',}
                    ],
                    formation:[
                        {max:100,message: '最大长度为100',}
                    ],
                    materialEn:[
                        {max:60,message: '最大长度为60',}
                    ],
                    materialCn:[
                        {max:60,message: '最大长度为60',}
                    ],
                    colourEn:[
                        {max:45,message: '最大长度为45',}
                    ],
                    colourCn:[
                        {max:45,message: '最大长度为45',}
                    ],
                    design:[
                        {max:45,message: '最大长度为45',}
                    ],
                    expireUnit:[
                        {max:45,message: '最大长度为45',}
                    ],
                    comments:[
                        {max:300,message: '最大长度为300',}
                    ],
                    mainSaleArea:[
                        {max:45,message: '最大长度为45',}
                    ],
                    qualityStander:[
                        {max:100,message: '最大长度为100',}
                    ],
                    otherPackInfoCn:[
                        {max:100,message: '最大长度为100',}
                    ],
                    otherPackInfoEn:[
                        {max:100,message: '最大长度为100',}
                    ],
                    //暂时未处理的验证规则
                    lengthWidthHeight:[
                        // {max:100,message: '最大长度为100',}
                    ],
                    customsCode:[
                        {max:45,message: '最大长度为45',}
                    ],
                    customsNameCn:[
                        {max:100,message: '最大长度为100',}
                    ],
                    customsNameEn:[
                        {max:100,message: '最大长度为100',}
                    ],
                    tradeMarkCn:[
                        {max:45,message: '最大长度为45',}
                    ],
                    tradeMarkEn:[
                        {max:45,message: '最大长度为45',}
                    ],
                    commodityInspectionCn:[
                        {max:100,message: '最大长度为100',}
                    ],
                    commodityInspectionEn:[
                        {max:100,message: '最大长度为100',}
                    ],
                    declareElement:[
                        {max:100,message: '最大长度为100',}
                    ],
                    origin:[
                        {max:45,message: '最大长度为45',}
                    ],
                    inspectQuarantineCategory:[
                        {max:45,message: '最大长度为45',}
                    ],
                    brand:[
                        {max:45,message: '最大长度为45',}
                    ],
                    brandRemark:[
                        {max:100,message: '最大长度为100',}
                    ],
                    brandRelated:[
                        {max:45,message: '最大长度为45',}
                    ],
                    certificat:[
                        {max:45,message: '最大长度为45',}
                    ],
                    specialTransportRequire:[
                        {max:100,message: '最大长度为100',}
                    ],
                    inventoryCostMethod:[
                        {max:100,message: '最大长度为100',}
                    ],
                    warehourceDefault:[
                        {max:100,message: '最大长度为100',}
                    ],
                    methodPkgCn:[
                        {max:45,message: '最大长度为45',}
                    ],
                    methodPkgEn:[
                        {max:45,message: '最大长度为45',}
                    ],
                    innerCartonUnit:[
                        {max:45,message: '最大长度为45',}
                    ],
                    innerCartonDesc:[
                        {max:100,message: '最大长度为100',}
                    ],
                    innerCartonMethodCn:[
                        {max:30,message: '最大长度为30',}
                    ],
                    innerCartonMethodEn:[
                        {max:45,message: '最大长度为45',}
                    ],
                    outerCartonUnit:[
                        {max:20,message: '最大长度为20',}
                    ],
                    outerCartonDesc:[
                        {max:100,message: '最大长度为100',}
                    ],
                    outerCartonMethodCn:[
                        {max:45,message: '最大长度为45',}
                    ],
                    outerCartonMethodEn:[
                        {max:45,message: '最大长度为45',}
                    ],

                },

                //上下架状态
                skuStatusOption:[
                    {
                        label: '上架',
                        value: 1
                    },
                    {
                        label: '下架',
                        value: 0
                    }
                ],
                //是否现货
                isReadilyAvailable:[
                    {
                        label:'是',
                        value:1
                    },
                    {
                        label:'否',
                        value:0
                    }
                ],
                //国家列表
                countryList:[
                    {
                        label:'中国',
                        value:1
                    },
                    {
                        label:'美国',
                        value:2
                    },
                    {
                        label:'日本',
                        value:3
                    }
                ],
                //保质期单位
                expireUnitList:[
                    {
                        label:'小时',
                        value:1
                    },
                    {
                        label:'日',
                        value:2
                    },
                    {
                        label:'月',
                        value:3
                    },
                    {
                        label:'年',
                        value:4
                    },
                ],
                //fob单位
                fobUnit:[
                    {
                        label:'USD',
                        value:1
                    },
                    {
                        label:'CNY',
                        value:2
                    },
                    {
                        label:'EUR',
                        value:3
                    },
                ],
                //otherIncoterm单位
                otherIncotermUnit:[
                    {
                        label:'CIF',
                        value:1
                    },
                    {
                        label:'DDU',
                        value:2
                    },
                ],
                //weight单位
                weightUnit:[
                    {
                        label:'t',
                        value:1
                    },
                    {
                        label:'kg',
                        value:2
                    },
                    {
                        label:'lb',
                        value:3
                    },
                    {
                        label:'sh.ton',
                        value:4
                    },
                    {
                        label:'long ton',
                        value:5
                    },
                    {
                        label:'oz',
                        value:6
                    },
                    {
                        label:'g',
                        value:7
                    },
                ],
                //length单位
                lengthUnit:[
                    {
                        label:'km',
                        value:1
                    },
                    {
                        label:'mile',
                        value:2
                    },
                    {
                        label:'m',
                        value:3
                    },
                    {
                        label:'ft',
                        value:4
                    },
                    {
                        label:'yd',
                        value:5
                    },
                    {
                        label:'cm',
                        value:6
                    },
                    {
                        label:'in',
                        value:7
                    },
                    {
                        label:'mm',
                        value:8
                    },
                ],
                //volume单位
                volumeUnit:[
                    {
                        label:'m3',
                        value:1
                    },
                    {
                        label:'liter',
                        value:2
                    },
                    {
                        label:'ft3',
                        value:3
                    },
                    {
                        label:'mcf',
                        value:4
                    },
                    {
                        label:'in3',
                        value:5
                    },
                    {
                        label:'cm3',
                        value:6
                    },
                    {
                        label:'bbl',
                        value:7
                    },
                    {
                        label:'gal',
                        value:8
                    },
                    {
                        label:'qt',
                        value:9
                    },
                    {
                        label:'pt',
                        value:10
                    },
                    {
                        label:'gi',
                        value:11
                    },
                ],
                //可否贴牌
                isOem:[
                    {
                        label:'是',
                        value:1
                    },
                    {
                        label:'否',
                        value:0
                    }
                ],
                //日期组件配置
                pickerOptions1: {
                    // disabledDate(time) {
                    //     return time.getTime() > Date.now();
                    // },
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
                //是否展示box
                isUseDisplayBox:[
                    {
                        label:'是',
                        value:1
                    },
                    {
                        label:'否',
                        value:0
                    }
                ],
                //产品或包装可否调整
                isAdjustSku:[
                    {
                        label:'是',
                        value:1
                    },
                    {
                        label:'否',
                        value:0
                    },
                ],
                //展示盒的长宽高
                boxSize:{
                    length:0,
                    width:0,
                    height:0
                },

                //dropDown Data
                dropData:[
                    {
                        id: 1,
                        label: '一级 1',
                        children: [{
                            id: 4,
                            label: '二级 1-1',
                            children: [
                                {
                                id: 9,
                                label: '三级 1-1-1'
                                }, {
                                id: 10,
                                label: '三级 1-1-2'
                                }
                            ]
                        }]
                    },
                    {
                        id: 2,
                        label: '一级 2',
                        children: [{
                            id: 5,
                            label: '二级 2-1'
                        }, {
                            id: 6,
                            label: '二级 2-2'
                        }]
                    },
                    {
                        id: 3,
                        label: '一级 3',
                        children: [{
                            id: 7,
                            label: '二级 3-1'
                        }, {
                            id: 8,
                            label: '二级 3-2'
                        }]
                    }],
                defaultProps:{
                    label:'name',
                    children:'children'
                },

                options: [
                    {
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],

            }
        },
        methods:{
            //上传图片
            uploadPic(e){
                let me=this;
                console.log(e,"????")
                let file=e.target.files[0];
                // let param = new FormData(); //创建form对象
                // param.append('file',file,file.name);//通过append向form对象添加数据
                let reader=new FileReader();
                reader.readAsDataURL(file);
                reader.onload=function (e) {
                    me.imgGroup.push(e.target.result);
                }
            },

            //添加图片到暂存区
            addPic(){
                document.getElementById('pic').click();
            },

            getCategoryId(){
                this.$ajax.get(this.$apis.get_supply_category,{}).then(res=>{
                    this.dropData=res;
                }).catch(err=>{
                    console.log(err)
                });
            },

            //添加客户
            addCustomer(){
                this.addCustomerDialogVisible=true;
                this.$ajax.post(this.$apis.get_sellerCustomer,this.customerQuery).then(res=>{
                    console.log(res)
                });
            },

            //完成新增
            finish(){
                let size=this.boxSize.length+'*'+this.boxSize.width+'*'+this.boxSize.height;
                this.$set(this.productForm,'lengthWidthHeight',size);
                this.disabledSubmit=true;

                if(this.$route.query.id && this.$route.query.isEdit){
                    //代表是编辑
                    this.$ajax.post(this.$apis.get_productDetail,this.productForm).then(res=>{
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                        this.disabledSubmit=false;
                        this.$router.push('/sellerProduct/overview');
                    }).catch(err=>{
                        this.disabledSubmit=false;
                    });
                }else{
                    this.$ajax.post(this.$apis.add_newSKU,this.productForm).then(res=>{
                        this.$message({
                            message: '新增成功',
                            type: 'success'
                        });
                        this.disabledSubmit=false;
                        this.$router.push('/sellerProduct/overview');
                    }).catch(err=>{
                        this.disabledSubmit=false;
                    });
                }
            },

            //获取产品详情
            getGoodsData(){
                this.$ajax.get(this.$apis.get_productDetail,{id:this.$route.query.id}).then(res=>{
                    console.log(res)
                    this.productForm=res;
                }).catch(err=>{
                    console.log(err,'12345')
                });
            },
        },
        created(){
            this.getCategoryId();
            this.$ajax.get(this.$apis.getCategory,{}).then(res=>{
                this.dropData=res;
                let id=this.$route.query.id;
                if(id){
                    this.getGoodsData();
                }
            }).catch(err=>{
                console.log(err)
            });
        },
    }
</script>

<style scoped>
    .manually-add{
        position: relative;
    }
    .number{
        min-height: 51px;
    }
    .number >>> .el-input-number--mini{
        width:80%;
    }
    .select >>> .el-select{
        width: 80%;
    }

    .title{
        font-weight: bold;
        font-size: 18px;
        height: 32px;
        line-height: 32px;
        color:#666666;
        margin-top: 10px;
    }

    .addPic{
        height: 50px;
        line-height: 50px;
    }
    .addPic>div{
        float: left;
        height: 50px;
        line-height: 50px;
    }
    .addPic .imgGroup{
        margin-left: 10px;
    }
    .addPic .btns{
        margin-left: 20px;
    }

    .speForm .el-form-item--small.el-form-item{
        /*margin-bottom: 0;*/
    }
    .speForm .el-row .list .el-input{
        width: 80%;
    }

    .tableList >>> .el-form-item__content{
        margin-left: 0!important;
    }

    .speTextarea{
        width: 80%;
    }
    .speSelect{
        width: 80%;
    }
    .speInputNumber{
        width: 80%;
    }

    .speNum{
        width: 60px;
    }
    .speIcon{
        display: inline-block;
        height: 28px;
        line-height: 28px;
    }
    .dropdown{
        height: 32px;
        width: 80%;
    }
    .speNumbberInput{
        width: 80%;
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
        text-align: center;
    }
</style>