<template>
    <div class="bookmark">
        <div class="title">
            <span>{{$i.product.title}}</span>
            <el-button class="title-btn"
                       @click="switchDisplay"
                       type="text">{{btnInfo}}
            </el-button>
        </div>
        <div>
            <el-form ref="productFormTop" :model="productForm" label-width="190px">
                <el-row class="speZone">
                    <el-col v-if="v.isDefaultShow && v.belongPage==='sellerProductOverview'"
                            v-for="v in $db.product.overview" :key="v.key" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item :prop="v.key" :label="v.label">
                            <drop-down v-model="productForm[v.key]"
                                       v-if="v.showType==='dropdown'"
                                       :list="categoryList"
                                       :defaultProps="defaultProps"
                                       ref="dropDown" :expandOnClickNode="false"></drop-down>
                            <el-input v-if="v.showType==='input'" size="mini" v-model="productForm[v.key]"></el-input>
                            <el-select class="speSelect" v-if="v.showType==='select'" size="mini"
                                       v-model="productForm[v.key]" placeholder="不限">
                                <el-option
                                        v-for="item in v.options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="body" :class="{hide:hideBody}">
            <el-form ref="productForm" :model="productForm" label-width="190px">
                <el-row class="speZone">
                    <el-col v-if="!v.isDefaultShow && v.belongPage==='sellerProductOverview'"
                            v-for="v in $db.product.overview" :key="v.key" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                        <el-form-item :prop="v.key" :label="v.label">
                            <drop-down v-if="v.showType==='dropdown'" class="" :list="dropData"
                                       ref="dropDown"></drop-down>
                            <el-input v-if="v.showType==='input'" size="mini" v-model="productForm[v.key]"></el-input>
                            <el-select class="speSelect" v-if="v.showType==='select'" size="mini"
                                       v-model="productForm[v.key]" placeholder="请选择">
                                <el-option
                                        v-for="item in v.options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                            <div v-if="v.showType==='exwNumber'" class="section-number">
                                <el-input size="mini" class="section-input"
                                          v-model="productForm.minExwPrice"></el-input>
                                <div class="section-line">--</div>
                                <el-input size="mini" class="section-input"
                                          v-model="productForm.maxExwPrice"></el-input>
                            </div>
                            <div v-if="v.showType==='fobNumber'" class="section-number">
                                <el-input size="mini" class="section-input"
                                          v-model="productForm.minFobPrice"></el-input>
                                <div class="section-line">--</div>
                                <el-input size="mini" class="section-input"
                                          v-model="productForm.maxFobPrice"></el-input>
                            </div>
                            <el-input v-if="v.showType==='number'" size="mini" v-model="productForm[v.key]"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="btn-group">
            <el-button @click="search" :loading="disabledSearch" type="primary">{{$i.product.search}}</el-button>
            <el-button @click="clear" type="info" plain>{{$i.product.clear}}</el-button>
        </div>
        <div class="footer">
            <v-table
                    code="udata_supply_sku_overview"
                    :height="500"
                    :loading="loadingTable"
                    :data="tableDataList"
                    @change-checked="changeChecked"
                    @change-sort="val=>{getData(val)}"
                    @action="btnClick">
                <template slot="header">
                    <div class="btns">
                        <el-button
                                v-authorize="'PRODUCT:ARCHIVE:RECOVER'"
                                :disabled="disabledDeleteGoods"
                                @click="recover">{{$i.common.recover}}
                        </el-button>
                        <el-button
                                @click="download"
                                v-authorize="'PRODUCT:ARCHIVE:DOWNLOAD'">
                            {{$i.product.downloadSelected}}({{selectList.length?selectList.length:"All"}})
                        </el-button>
                    </div>
                </template>
            </v-table>
            <page
                    :page-sizes="[50,100,200,500]"
                    @size-change="changeSize"
                    @change="changePage"
                    :page-data="pageData"></page>
        </div>

        <v-import-template ref="importCategory" code="PRODUCT_SUPPLIER" biz-code="PRODUCT_SUPPLIER"></v-import-template>
    </div>
</template>

<script>
    import sectionNumber from "../product/sectionNumber";
    import { VPagination, VTable, dropDownSingle, VImportTemplate } from "@/components/index";
    import { mapActions } from "vuex";

    export default {
        name: "overview",
        components: {
            dropDown: dropDownSingle,
            sectionNumber,
            VTable,
            page: VPagination,
            VImportTemplate
        },
        props: {},
        data() {
            return {
                loadingTable: false,
                partDialogVisible: false,       //弹出框显示隐藏
                allDialogVisible: false,        //弹出框显示隐藏
                hideBody: true,            //是否显示body
                btnInfo: this.$i.product.advanced,     //按钮默认文字显示
                disabledSearch: false,                 //是否禁止搜索，默认false
                disabledDeleteGoods: true,             //默认没有选中商品的时候是不能点击删除的
                disableClickSetUp: false,
                disableClickSetDown: false,
                //表格字段绑定
                productForm: {
                    categoryId: "",
                    codeLike: "",
                    country: "",
                    customerSkuCodeLike: "",
                    deliveryDates: "",
                    descCnLike: "",
                    descEnLike: "",
                    materialEnLike: "",
                    maxExwPrice: "",
                    maxFobPrice: "",
                    methodPkgEnLike: "",
                    minExwPrice: "",
                    minFobPrice: "",
                    nameCnLike: "",
                    // nameCustomerLike: "",    没有发现这个字段
                    nameEnLike: "",
                    //初始搜索的时候不传，当有筛选条件之后再传
                    // operatorFilters: [
                    //     {
                    //         operator: "",
                    //         property: "",
                    //         value: {}
                    //     }
                    // ],
                    outerCartonMethodEnLike: "",
                    pn: 1,
                    ps: 50,
                    readilyAvailable: null,
                    recycle: true,             //recycleBin里传true,其他地方传false
                    //初始搜索的时候不传，当有筛选条件之后再传
                    // sorts: [
                    //     {
                    //         orderBy: "",
                    //         orderType: "",
                    //     }
                    // ],
                    supplierNameLike: ""
                },
                defaultProps: {
                    label: "name",
                    children: "children"
                },
                //Category下拉组件数据
                categoryList: [
                    {
                        id: 5122355,
                        name: "自己的分类",
                        children: [],
                        _disableClick: true
                    },
                    {
                        id: 1231124,
                        name: "系统分类",
                        children: [],
                        _disableClick: true
                    }
                ],

                //表格选中的条目
                selectList: [],

                //底部table数据
                tableDataList: [],
                dataColumn: [],
                pageData: {},

                /**
                 * 字典
                 * */
                statusOption: [],
                weightOption: [],
                dateOption: [],
                volumeOption: [],
                lengthOption: [],
                skuUnitOption: [],
                countryOption: []
            };
        },
        methods: {
            ...mapActions(["setMenuLink"]),
            switchDisplay() {
                this.hideBody = !this.hideBody;
            },
            changeChecked(e) {
                this.selectList = e;
            },
            clear() {
                this.$refs.dropDown[0].selectedList = [];
                this.$refs["productFormTop"].resetFields();
                this.$refs["productForm"].resetFields();
                this.$set(this.productForm, "minExwPrice", "");
                this.$set(this.productForm, "maxExwPrice", "");
                this.$set(this.productForm, "minFobPrice", "");
                this.$set(this.productForm, "maxFobPrice", "");
            },
            search() {
                this.disabledSearch = true;
                this.loadingTable = true;
                this.$ajax.post(this.$apis.get_productList, this.productForm).then(res => {
                    this.tableDataList = this.$getDB(this.$db.product.overviewTable, res.datas);
                    this.pageData = res;
                    this.disabledSearch = false;
                    this.loadingTable = false;
                }).catch(err => {
                    this.disabledSearch = false;
                    this.loadingTable = false;
                });

            },
            getData(e) {
                if(e){
                    Object.assign(this.productForm,e);
                }
                this.loadingTable = true;
                this.$ajax.post(this.$apis.get_productList, this.productForm).then(res => {
                    this.tableDataList = this.$getDB(this.$db.product.overviewTable, res.datas, e => {
                        e.status.value = this.$change(this.statusOption, "status", e, true).name;
                        e.expireUnit.value = this.$change(this.dateOption, "expireUnit", e, true).name;
                        e.unit.value = this.$change(this.skuUnitOption, "unit", e, true).name;
                        e.unitLength.value = this.$change(this.lengthOption, "unitLength", e, true).name;
                        e.unitVolume.value = this.$change(this.volumeOption, "unitVolume", e, true).name;
                        e.unitWeight.value = this.$change(this.weightOption, "unitWeight", e, true).name;

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
                        return e;
                    });
                    this.pageData = res;
                    this.selectList = [];
                    this.loadingTable = false;
                }).catch(err => {
                    this.loadingTable = false;
                });
            },

            //获取类别数据
            getCategoryId() {
                const sys=this.$ajax.get(this.$apis.CATEGORY_SYSTEM, {});
                const my=this.$ajax.get(this.$apis.CATEGORY_MINE, {});
                this.$ajax.all([sys,my]).then(res=>{
                    this.categoryList[1].children = res[0];
                    this.categoryList[0].children = res[1];
                });
            },

            //表格按钮点击
            btnClick(item) {
                this.$windowOpen({
                    url: "/product/detail",
                    params: {
                        id: item.id.value
                    }
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
            recover() {
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

            //上传产品
            upload() {

            },

            //删除商品
            deleteGood() {
                this.$confirm("确定删除选中商品?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    let hasUp = false;            //是否有上架商品，默认为false
                    this.selectList.forEach(v => {
                        if (v.status.value === "上架") {
                            hasUp = true;
                        }
                    });
                    if (hasUp) {
                        this.partDialogVisible = true;
                    } else {
                        //直接把选中的产品删除
                        this.$message({
                            message: "删除成功，被删除的产品可在回收站中找回",
                            type: "success"
                        });
                    }
                }).catch(() => {

                });
            },

            //删除商品(跳过上架产品,只删除选中的列表中已经下架的商品)
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

            //表格check状态改变
            handleCheckChange(e) {
                console.log(e);
            },

            check(e) {
                console.log(e);
            },

            addNewProduct() {
                this.$windowOpen({
                    url: "/product/addNewProduct"
                });
            },


            /**
             * 分页操作
             * */
            changePage(e) {
                this.productForm.pn = e;
                this.getData();
            },
            changeSize(e) {
                this.productForm.ps = e;
                this.getData();
            }
        },
        created() {
            this.$ajax.post(this.$apis.get_partUnit, ["SKU_SALE_STATUS", "WT_UNIT", "ED_UNIT", "VE_UNIT", "LH_UNIT", "SKU_UNIT"], { cache: true }).then(res => {
                res.forEach(v => {
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
                    }
                });
                //国家
                this.$ajax.get(this.$apis.get_country, {}, { cache: true }).then(res => {
                    this.countryOption = res;
                    this.getData();
                    this.getCategoryId();
                }).catch(err => {

                });
            }).catch(err => {

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
        watch: {
            hideBody(n) {
                if (n) {
                    this.btnInfo = this.$i.product.advanced;
                } else {
                    this.btnInfo = this.$i.product.hideTheAdvanced;
                }
            },
            selectList(n) {
                if (n.length >= 1) {
                    this.disabledDeleteGoods = false;
                } else {
                    this.disabledDeleteGoods = true;
                }
            }
        }
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
