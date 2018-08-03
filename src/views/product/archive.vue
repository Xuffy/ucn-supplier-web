<template>
    <div class="bookmark">
        <overview-page
                :title="title"
                :label-width="labelWidth"
                :form-column="$db.product.overview"
                :tableData="productData"
                :pageData="pageData"
                :tableButtons="null"
                :loadingTable="loadingTable"
                tableCode="udata_purchase_sku_overview"
                @search="getData"
                @tableBtnClick="btnClick"
                @change-sort="val=>{getData(val)}"
                @change-checked="changeChecked">
            <template slot="btns">
                <div class="btns">
                    <el-button
                            v-authorize="'PRODUCT:ARCHIVE:RECOVER'"
                            :disabled="selectList.length===0"
                            @click="recover">{{$i.common.recover}}
                    </el-button>
                    <el-button
                            @click="download"
                            v-authorize="'PRODUCT:ARCHIVE:DOWNLOAD'">
                        {{$i.product.downloadSelected}}({{selectList.length?selectList.length:"All"}})
                    </el-button>
                </div>
            </template>
            <v-pagination slot="pagination"
                          @change="val=>{getData({pn:val})}"
                          @size-change="val=>{getData({ps:val})}"
                          :page-sizes="[50,100,200,500]"
                          :page-data="pageData"></v-pagination>
        </overview-page>

    </div>
</template>

<script>
    import sectionNumber from "../product/sectionNumber";
    import { VPagination, VTable, dropDownSingle, overviewPage } from "@/components/index";
    import { mapActions } from "vuex";

    export default {
        name: "archive",
        components: {
            dropDown: dropDownSingle,
            sectionNumber,
            VTable,
            VPagination,
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
                    recycle: true
                },
                selectList: [],

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
                quarantineTypeOption:[]
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
                    if(!query.readilyAvailable){
                        query.readilyAvailable=false;
                    }else{
                        if(query.readilyAvailable==='1'){
                            query.readilyAvailable=true;
                        }else if(query.readilyAvailable==='0'){
                            query.readilyAvailable=false;
                        }
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

                        if (e.noneSellCountry.value) {
                            let noneSellCountry = e.noneSellCountry.value.split(",");
                            e.noneSellCountry._value = "";
                            _.map(noneSellCountry, v => {
                                e.noneSellCountry._value += (_.findWhere(this.countryOption, { code: v }).name + ",");
                            });
                            e.noneSellCountry._value = e.noneSellCountry._value.slice(0, e.noneSellCountry._value.length - 1);
                        }
                        if (e.mainSaleCountry.value) {
                            let mainSaleCountry = e.mainSaleCountry.value.split(",");
                            e.mainSaleCountry._value = "";
                            _.map(mainSaleCountry, v => {
                                e.mainSaleCountry._value += (_.findWhere(this.countryOption, { code: v }).name + ",");
                            });
                            e.mainSaleCountry._value = e.mainSaleCountry._value.slice(0, e.mainSaleCountry._value.length - 1);
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
            recover(){
                this.$confirm(this.$i.product.sureRecover, this.$i.product.prompt, {
                    confirmButtonText: this.$i.product.sure,
                    cancelButtonText: this.$i.product.cancel,
                    type: "warning"
                }).then(() => {
                    let id = [];
                    this.selectList.forEach(v => {
                        id.push(v.id.value);
                    });
                    this.$ajax.post(this.$apis.post_sku_recoverAll, id)
                        .then(res => {
                            this.$message({
                                type: "success",
                                message: this.$i.common.recoverSuccess
                            });
                            this.getData();
                        });
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
        },
        created() {
            const partUnit = this.$ajax.post(this.$apis.get_partUnit, ["SKU_SALE_STATUS", "WT_UNIT", "ED_UNIT", "VE_UNIT", "LH_UNIT", "SKU_UNIT", "QUARANTINE_TYPE"], { cache: true });
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
