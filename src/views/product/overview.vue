<template>
    <div class="bookmark">
        <overview-page
                :title="title"
                :label-width="labelWidth"
                :form-column="$db.product.overview"
                :tableData="productData"
                :pageData="pageData"
                :tableButtons="[{label: $i.product.detailBig, type: 1}]"
                :loadingTable="loadingTable"
                tableCode="udata_purchase_sku_overview"
                @search="getData"
                @tableBtnClick="btnClick"
                @change-sort="val=>{getData(val)}"
                @change-checked="changeChecked">
            <template slot="btns">
                <div class="btns">
                    <el-button
                            v-authorize="'PRODUCT:OVERVIEW:ADD_PRODUCT'"
                            @click="addNewProduct">{{$i.product.addNewProduct}}
                    </el-button>
                    <el-button
                            v-authorize="'PRODUCT:OVERVIEW:SET_SALE'"
                            :disabled="selectList.length===0"
                            :loading="disableClickSetUp"
                            @click="setUp">{{$i.product.setUp}}({{selectList.length?selectList.length:"0"}})
                    </el-button>
                    <el-button
                            v-authorize="'PRODUCT:OVERVIEW:SET_NOT_SALE'"
                            :disabled="selectList.length===0"
                            :loading="disableClickSetDown"
                            @click="setDown">{{$i.product.setDown}}({{selectList.length?selectList.length:"0"}})
                    </el-button>
                    <el-button
                            v-authorize="'PRODUCT:OVERVIEW:UPLOAD_PRODUCT'"
                            :tips="$i.product.uploadTips"
                            @click="()=>$refs.importCategory.show()">{{$i.button.upload}}
                    </el-button>
                    <el-button
                            v-authorize="'PRODUCT:OVERVIEW:DOWNLOAD'"
                            @click="download">
                        {{$i.product.downloadSelected}}({{selectList.length?selectList.length:"All"}})
                    </el-button>
                    <el-button @click="deleteGood"
                               :loading="loadingDeleteGoods"
                               :disabled="selectList.length===0"
                               type="danger"
                               v-authorize="'PRODUCT:OVERVIEW:ARCHIVE'">{{$i.common.remove}}
                    </el-button>
                </div>

            </template>
            <v-pagination slot="pagination"
                          @change="val=>{getData({pn:val})}"
                          @size-change="val=>{getData({ps:val})}"
                          :page-sizes="[50,100,200,500]"
                          :page-data="pageData"></v-pagination>
        </overview-page>

        <el-dialog
                class="speDialog"
                :title="$i.product.prompt"
                :visible.sync="partDialogVisible"
                width="30%">
            <span>当前所选有上架产品，是否下架该产品?</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="partDialogVisible = false">取 消</el-button>
                <el-button @click="putdownExcept" type="primary">跳过上架产品</el-button>
                <el-button type="primary" @click="partDialogVisible = false">下架产品</el-button>
            </span>
        </el-dialog>

        <v-import-template
                ref="importCategory"
                code="BIZ_SKU_SUPPLIER_IMPORT"
                :tips="$i.product.uploadTips"
                biz-code="BIZ_SKU_SUPPLIER_IMPORT"></v-import-template>
    </div>
</template>

<script>
    import sectionNumber from "../product/sectionNumber";
    import { VPagination, VTable, dropDownSingle, VImportTemplate, overviewPage } from "@/components/index";
    import { mapActions } from "vuex";

    export default {
        name: "overview",
        components: {
            dropDown: dropDownSingle,
            sectionNumber,
            VTable,
            VPagination,
            VImportTemplate,
            overviewPage
        },
        props: {},
        data() {
            return {
                title: this.$i.product.title,
                labelWidth: 220,
                productData: [],
                pageData: {},
                loadingTable: false,
                partDialogVisible: false,
                queryConfig: {
                    pn: 1,
                    ps: 50,
                    recycle: false
                },
                selectList: [],
                disableClickSetUp: false,
                disableClickSetDown: false,
                loadingDeleteGoods: false,

                /**
                 * 字典
                 * */
                statusOption: [],
                weightOption: [],
                dateOption: [],
                volumeOption: [],
                lengthOption: [],
                skuUnitOption: [],
                countryOption: [],
                quarantineTypeOption:[],
                formationOption:[],

            };
        },
        methods: {
            ...mapActions(["setMenuLink"]),
            changeChecked(e) {
                this.selectList = e;
            },
            getData(query) {
                if (query) {
                    if(!query.categoryId){
                        query.categoryId = null;
                    }
                    if(query.readilyAvailable==='1'){
                        query.readilyAvailable=true;
                    }else if(query.readilyAvailable==='0'){
                        query.readilyAvailable=false;
                    }
                }
                Object.assign(this.queryConfig, query);
                let params = this.$depthClone(this.queryConfig);
                if (_.isArray(params.country)) {
                    params.country = params.country.join(",");
                }
                this.loadingTable = true;
                this.$ajax.post(this.$apis.get_productList, params).then(res => {
                    this.productData = this.$getDB(this.$db.product.overviewTable, res.datas, e => {
                        e.status._value=(_.findWhere(this.statusOption,{code:String(e.status.value)}) || {}).name;
                        e.expireUnit._value=(_.findWhere(this.dateOption,{code:String(e.expireUnit.value)}) || {}).name;
                        e.unit._value=(_.findWhere(this.skuUnitOption,{code:String(e.unit.value)}) || {}).name;
                        e.unitLength._value=(_.findWhere(this.lengthOption,{code:String(e.unitLength.value)}) || {}).name;
                        e.unitVolume._value=(_.findWhere(this.volumeOption,{code:String(e.unitVolume.value)}) || {}).name;
                        e.unitWeight._value=(_.findWhere(this.weightOption,{code:String(e.unitWeight.value)}) || {}).name;
                        e.recycle._value=e.recycle.value?this.$i.product.invalid:this.$i.product.valid;
                        e.formation._value=(_.findWhere(this.formationOption,{code:e.formation.value}) || {}).name;

                        if(e.noneSellCountry.value){
                            e.noneSellCountry._value=_.map(e.noneSellCountry.value.split(","),item=>{
                                return _.findWhere(this.countryOption,{code:item}).name;
                            }).join(',');
                        }
                        if(e.mainSaleCountry.value){
                            e.mainSaleCountry._value=_.map(e.mainSaleCountry.value.split(","),item=>{
                                return _.findWhere(this.countryOption,{code:item}).name;
                            }).join(',');
                        }

                        e.yearListed.value = this.$dateFormat(e.yearListed.value, "yyyy-mm");
                        e.inspectQuarantineCategory._value = (_.findWhere(this.quarantineTypeOption, {code:e.inspectQuarantineCategory.value}) || {}).name;
                        return e;
                    });
                    this.pageData = res;
                    this.selectList = [];
                }).finally(() => {
                    this.disabledSearch = false;
                    this.loadingTable = false;
                });
            },
            btnClick(item) {
                this.$windowOpen({
                    url: "/product/detail",
                    params: {
                        id: item.id.value
                    }
                });
            },
            setUp() {
                let id = [];
                this.selectList.forEach(v => {
                    id.push(v.id.value);
                });
                this.disableClickSetUp = true;
                this.$ajax.post(this.$apis.set_sellerProductPutAway, id).then(res => {
                    this.getData();
                    this.$message({
                        message: this.$i.product.setUpSuccess,
                        type: "success"
                    });
                    this.disableClickSetUp = false;
                }).catch(err => {
                    this.disableClickSetUp = false;
                });
            },
            setDown() {
                this.$confirm(this.$i.product.sureSetDown, this.$i.product.prompt, {
                    confirmButtonText: this.$i.product.sure,
                    cancelButtonText: this.$i.product.cancel,
                    type: "warning"
                }).then(() => {
                    let id = [];
                    this.selectList.forEach(v => {
                        id.push(v.id.value);
                    });
                    this.disableClickSetDown = true;
                    this.$ajax.post(this.$apis.set_sellerProductPutDown, id).then(res => {
                        this.getData();
                        this.$message({
                            message: this.$i.product.setDownSuccess,
                            type: "success"
                        });
                        this.disableClickSetDown = false;
                    }).catch(err => {
                        this.disableClickSetDown = false;
                    });
                }).catch(() => {

                });
            },
            download() {
                let ids = _.pluck(_.pluck(this.selectList, "id"), "value");
                if (ids.length > 0) {
                    this.$fetch.export_task("SKU_SUPPLIER_EXPORT_IDS", { ids: ids });
                } else {
                    let params = this.$depthClone(this.productForm);
                    this.$fetch.export_task("SKU_SUPPLIER_EXPORT_PARAMS", params);
                }
            },
            deleteGood() {
                this.$confirm(this.$i.product.sureDelete, this.$i.product.prompt, {
                    confirmButtonText: this.$i.product.sure,
                    cancelButtonText: this.$i.product.cancel,
                    type: "warning"
                }).then(() => {
                    let id = _.pluck(_.pluck(this.selectList, "id"), "value");
                    this.loadingDeleteGoods = true;
                    this.$ajax.post(this.$apis.post_sku_deleteAll, id)
                        .then(res => {
                            this.$message({
                                type: "success",
                                message: this.$i.common.deleteTheSuccess
                            });
                            this.getData();
                        }).finally(() => {
                        this.loadingDeleteGoods = false;
                    });
                });
            },
            putdownExcept() {
                let id = [];
                this.selectList.forEach(v => {
                    if (v.status.value === "下架") {
                        id.push(v.id.value);
                    }
                });
                if (id.length === 0) {
                    //当前没有已经下架了的产品
                    this.$message({
                        message: "当前选择中没有已下架的产品",
                        type: "warning"
                    });
                    // this.partDialogVisible=false;
                } else {
                    console.log(id, "???");
                    // this.$ajax.post(this.$apis.set_sellerProductPutDown,id).then(res=>{
                    //     this.getData();
                    // }).catch(err=>{
                    //
                    // });
                }
            },
            addNewProduct() {
                this.$windowOpen({
                    url: "/product/addNewProduct"
                });
            },
        },
        created() {
            const partUnit = this.$ajax.post(this.$apis.get_partUnit, ["SKU_SALE_STATUS", "WT_UNIT", "ED_UNIT", "VE_UNIT", "LH_UNIT", "SKU_UNIT", "QUARANTINE_TYPE","SKU_FORMATION"], { cache: true });
            const countryAjax = this.$ajax.get(this.$apis.get_country, {}, { cache: true });
            this.$ajax.all([partUnit, countryAjax]).then(res => {
                res[0].forEach(v => {
                    if (v.code === "SKU_SALE_STATUS") {
                        this.statusOption = v.codes;
                    } else if (v.code === "WT_UNIT") {
                        this.weightOption = v.codes;
                    } else if (v.code === "ED_UNIT") {
                        this.dateOption = v.codes;
                    } else if (v.code === "VE_UNIT") {
                        this.volumeOption = v.codes;
                    } else if (v.code === "LH_UNIT") {
                        this.lengthOption = v.codes;
                    } else if (v.code === "SKU_UNIT") {
                        this.skuUnitOption = v.codes;
                    } else if (v.code === "QUARANTINE_TYPE") {
                        this.quarantineTypeOption = v.codes;
                    } else if (v.code === "SKU_FORMATION") {
                        this.formationOption = v.codes;
                    }
                });
                this.countryOption = res[1];
                this.getData();
            });
        },
        mounted() {
            this.setMenuLink([{
                path: "/logs/index",
                query: { code: "PRODUCT" },
                type: 10,
                auth: "PRODUCT:LOG",
                label: this.$i.common.log
            },
                {
                    path: "archive",
                    type: 20,
                    auth: "PRODUCT:ARCHIVE",
                    label: this.$i.common.archive
                }
            ]);
        },
        watch: {}
    };
</script>

<style scoped>
    .speDropDown {
        height: 32px;
    }

    .speDropDown >>> .checkInputBox {
        height: 28px;
    }

    .speDropDown >>> .checkInputBox .dataBox {
        height: 28px;
        line-height: 28px;
    }

    .bookmark {
        padding-right: 20px;
    }

    .title {
        font-weight: bold;
        font-size: 18px;
        height: 32px;
        line-height: 32px;
        color: #666666;
    }

    .title-btn {
        float: right;
        margin-right: 5px;
    }

    .head-list {

    }

    .head-list label {
        width: 190px;
        display: inline-block;
        height: 42px;
        line-height: 42px;
        text-align: right;
        font-size: 14px;
        color: #606266;
        padding: 0 12px 0 0;
        box-sizing: border-box;
        float: left;
    }

    .head-list .content {
        margin-left: 190px;
        height: 42px;
    }

    .head-list .content >>> input {
        height: 42px;
    }

    .speZone >>> label {

    }

    .speZone >>> input {

    }

    .section-number {

    }

    .section-number .section-input {
        float: left;
        width: 40%;
    }

    .section-number .section-line {
        float: left;
    }

    .outGroup {

    }

    .outGroup .label {
        width: 190px;
        float: left;
    }

    .body {
        overflow: hidden;
        max-height: 320px;
        display: block;
        transition: max-height .5s cubic-bezier(.445, .05, .55, .95);
    }

    .body .numberInput {
        width: 80px;
        text-align: left;
    }

    .body .numberInput >>> input {
        padding: 0;
    }

    .hide {
        max-height: 0;
    }

    .form-spelist {
        margin-bottom: 10px !important;
    }

    .form-spelist >>> .ivu-form-item-content {
        line-height: normal;
    }

    .form-list {
        margin-bottom: 10px;
    }

    .speSelect {
        width: 100%;
    }

    .speDialog >>> .el-dialog__footer {
        text-align: center;
    }

    .btn-group {
        text-align: center;
        margin-top: 10px;
        padding-bottom: 15px;
        border-bottom: 1px solid #e0e0e0;
    }

    .btn-group .search {
        margin-right: 30px;
    }

    .footer {

    }

    .footer .btns {
        padding: 10px 0;
    }
</style>
