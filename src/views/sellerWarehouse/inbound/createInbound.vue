<template>
    <div class="create-inbound">
        <div class="title">
            {{$i.warehouse.basicInfo}}
        </div>
        <el-form :modal="inboundData" ref="basicInfo" class="speForm" label-width="200px" :label-position="labelPosition">
            <el-row>
                <el-col class="speCol" v-for="v in $db.warehouse.inbound" v-if="v.belong==='basicInfo'" :key="v.key" :xs="24" :sm="v.fullLine?24:8" :md="v.fullLine?24:8" :lg="v.fullLine?24:8" :xl="v.fullLine?24:8">
                    <el-form-item :prop="v.key" :label="v.label">
                        <div v-if="v.showType==='input'">
                            <el-input
                                    class="speInput"
                                    size="mini"
                                    :disabled="v.disabled"
                                    v-model="inboundData[v.key]"
                                    placeholder="please input"></el-input>
                        </div>
                        <div v-else-if="v.showType==='select'">
                            <el-select class="speInput" size="mini" v-model="inboundData[v.key]" placeholder="please choose">
                                <el-option
                                        v-for="item in v.options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div v-else-if="v.showType==='textarea'">
                            <el-input
                                    class="speInput"
                                    type="textarea"
                                    autosize
                                    placeholder="please input"
                                    v-model="inboundData[v.key]">
                            </el-input>
                        </div>
                        <div v-else-if="v.showType==='number'">
                            <el-input-number
                                    class="speInput"
                                    size="mini"
                                    v-model="inboundData[v.key]"
                                    :controls="false"
                                    :min="0"
                                    label="please input"></el-input-number>
                        </div>
                        <div v-else-if="v.showType==='dropdown'">
                            <drop-down
                                    class="speInput"
                                    :list="dropData"
                                    :defaultProps="defaultProps"
                                    v-model="inboundData[v.key]"
                                    ref="dropDown"></drop-down>
                        </div>
                        <div v-else-if="v.showType==='date'">
                            <el-date-picker
                                    class="speInput"
                                    size="mini"
                                    v-model="inboundData[v.key]"
                                    align="right"
                                    type="date"
                                    placeholder="选择日期"
                                    :picker-options="pickerOptions1">
                            </el-date-picker>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <div class="title">
            {{$i.warehouse.productInfo}}
        </div>
        <div class="btns">
            <el-button @click="addProduct">{{$i.warehouse.addProduct}}</el-button>
            <el-button @click="removeProduct" :disabled="disableRemoveProduct" type="danger">{{$i.warehouse.removeProduct}}</el-button>
        </div>

        <el-table
                v-loading="loadingProductTable"
                class="product-table"
                :data="productData"
                border
                show-summary
                style="width: 100%">
            <el-table-column
                    type="selection"
                    align="center"
                    class="table-checkbox"
                    width="55">
            </el-table-column>
            <el-table-column
                    v-for="v in $db.warehouse.inboundOrderProductTable"
                    :key="v.key"
                    :label="v.key"
                    align="center"
                    width="180">
                <template slot-scope="scope">
                    <div v-if="v.belong==='skuList'">
                        <div v-if="v.showType==='input'">
                            <el-input
                                    placeholder="请输入内容"
                                    v-model="scope.row.skuList[0][v.key]"
                                    clearable>
                            </el-input>
                        </div>
                        <div v-else>
                            {{scope.row.skuList[0][v.key]}}
                        </div>
                    </div>
                    <div v-else-if="v.showType==='input'">
                        <el-input
                                placeholder="请输入内容"
                                v-model="scope.row[v.key]"
                                clearable>
                        </el-input>
                    </div>
                    <div v-else-if="v.showType==='select'">
                        <el-select v-model="scope.row.skuList[0][v.key]" placeholder="请选择">
                            <el-option
                                    v-for="item in v.options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div v-else-if="v.showType==='number'">
                        <el-input-number
                                :disabled="v.computed"
                                v-model="scope.row[v.key]"
                                @blur="handleBlur(v.key)"
                                :controls="false"
                                label="请输入"></el-input-number>
                    </div>
                    <div v-else-if="v.key==='unqualifiedType'">
                        0
                    </div>
                    <div v-else>
                        {{scope.row[v.key]}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--<v-table-->
                <!--v-loading="loadingProductTable"-->
                <!--:data="productData"-->
                <!--@change-checked="changeProductChecked"></v-table>-->

        <div class="total">
            <div class="title">
                {{$i.warehouse.total}}
            </div>
            <el-form :modal="inboundSummary" label-width="200px" :label-position="labelPosition">
                <el-row>
                    <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                        <el-form-item prop="asd" :label="$i.warehouse.totalCartonQty">
                            <el-input size="mini" class="speInput" :disabled="true" v-model="inboundSummary.totalCartonQty"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                        <el-form-item prop="asd" :label="$i.warehouse.totalGrossWeight">
                            <el-input size="mini" class="speInput" :disabled="true" v-model="inboundSummary.totalCartonQty"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                        <el-form-item prop="asd" :label="$i.warehouse.totalVolume">
                            <el-input size="mini" class="speInput" :disabled="true" v-model="inboundSummary.totalCartonQty"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                        <el-form-item prop="asd" :label="$i.warehouse.totalNetWeight">
                            <el-input size="mini" class="speInput" :disabled="true" v-model="inboundSummary.totalCartonQty"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                        <el-form-item prop="asd" :label="$i.warehouse.totalSkuQty">
                            <el-input size="mini" class="speInput" :disabled="true" v-model="inboundSummary.totalCartonQty"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>

        <div class="footBtn">
            <el-button :loading="disabledSubmit" @click="submit" type="primary">{{$i.warehouse.submit}}</el-button>
            <el-button @click="cancel">{{$i.warehouse.cancel}}</el-button>
        </div>

        <el-dialog
                title="Add Product From Order"
                :visible.sync="addOrderDialogVisible"
                width="70%">

            <el-form :modal="orderProduct" ref="orderProduct" label-width="200px" :label-position="labelPosition">
                <el-row>
                    <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                        <el-form-item prop="orderNo" :label="$i.warehouse.orderNo">
                            <el-input size="mini" class="speInput" v-model="orderProduct.orderNo"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                        <el-form-item prop="skuCode" :label="$i.warehouse.skuCode">
                            <el-input size="mini" class="speInput" v-model="orderProduct.skuCode"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                        <el-form-item prop="skuNameCn" :label="$i.warehouse.nameCn">
                            <el-input size="mini" class="speInput" v-model="orderProduct.skuNameCn"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                        <el-form-item prop="skuBarCode" :label="$i.warehouse.barCode">
                            <el-input size="mini" class="speInput" v-model="orderProduct.skuBarCode"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div class="search-btn">
                <el-button :disabled="disabledSearch" :loading="disabledClickSubmit" @click="searchOrderData" type="primary">{{$i.warehouse.search}}</el-button>
                <el-button :disabled="disabledCancelSearch" @click="clearSearchData">{{$i.warehouse.clear}}</el-button>
            </div>

            <v-table
                    v-loading="loadingTable"
                    :data="tableDataList"
                    @change-checked="changeChecked"></v-table>

            <div slot="footer" class="dialog-footer">
                <el-button :disabled="disabledSearch" type="primary" @click="postData">确 定</el-button>
                <el-button :disabled="disabledCancelSearch" @click="addOrderDialogVisible = false">取 消</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>

    import VTable from '@/components/common/table/index'

    export default {
        name: "createInbound",
        components:{
            VTable
        },
        data(){
            return{
                /**
                 * 页面基础配置
                 * */
                labelPosition:'right',
                disableRemoveProduct:true,
                disabledSubmit:false,
                pickerOptions1: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
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
                addOrderDialogVisible:false,
                productTableData:[],
                selectProductList:[],
                loadingProductTable:false,
                /**
                 * 外部展示数据
                 * */
                productIds:[],                  //用于存储用于外部展示的产品ID
                productData:[],                 //添加到外部用于展示的产品详细信息
                inboundData:{
                    inboundNo:'',       //新建的时候不传
                    inboundDate:'',
                    warehouseNo:'',
                    warehouseName:'',
                    inboundTypeDictCode:'',
                    warehouseManager:'',
                    remark:'',
                    purchaser:'',
                    carrier:'',
                    carrierPhone:'',
                    timeZone:'',
                    attachment:'',
                    inboundSkuBeanCreateParams:[],      //新增的产品数组
                    //新增的产品总计
                    skuTotalCartonQty: 0,
                    skuTotalGrossWeight: 0,
                    skuTotalNetWeight: 0,
                    skuTotalQty: 0,
                    skuTotalVolume: 0,
                },
                //inbound总计
                inboundSummary:{
                    totalCartonQty:0,
                    totalGrossWeight:0,
                    totalVolume:0,
                    totalNetWeight:0,
                    totalSkuQty:0,
                },
                /**
                 * 弹出框数据
                 * */
                selectList:[],
                loadingTable:false,
                tableDataList:[],           //弹出框表格数据

                //btns禁用状态
                disabledSearch:true,
                disabledCancelSearch:true,
                disabledClickSubmit:false,

                //add order product搜索数据
                orderProduct:{
                    orderNo: "",
                    pn: 1,
                    ps: 50,
                    skuCode:"",
                    skuBarCode: "",
                    skuNameCn: "",
                },
            }
        },
        methods:{
            //新增产品
            addProduct(){
                //先把在外部的数据的id取出来，拿到内部去对比
                this.selectList=[];
                this.addOrderDialogVisible=true;
                this.loadingTable=true;
                this.disabledSearch=true;
                this.disabledCancelSearch=true;
                //请求弹出框数据
                this.$ajax.post(this.$apis.get_productInfo,this.orderProduct).then(res=>{
                    this.tableDataList = this.$getDB(this.$db.warehouse.inboundOrderTable, res.datas);
                    // this.productTableData.forEach(v=>{
                    //     this.tableDataList.forEach(m=>{
                    //         if(v.id.value===m.id.value){
                    //             m._disabled=true;
                    //             m._checked=true;
                    //         }
                    //     });
                    // });

                    this.disabledSearch=false;
                    this.disabledCancelSearch=false;
                    this.loadingTable=false;
                }).catch(err=>{
                    this.disabledSearch=false;
                    this.disabledCancelSearch=false;
                    this.loadingTable=false;
                });
            },

            //移除产品
            removeProduct(){
                this.$confirm('确定移除产品?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.productTableData=_.difference(this.productTableData,this.selectProductList);
                    this.disableRemoveProduct=true;
                    this.$message({
                        type: 'success',
                        message: '移除成功!'
                    });
                }).catch(() => {
                });
            },

            //改变product table选中状态时触发的事件
            changeProductChecked(e){
                this.selectProductList=e;
            },

            //提交表单
            submit(){
                this.productData.forEach(v=>{
                    this.inboundData.inboundSkuBeanCreateParams.push({
                        customerName: v.customerName,
                        customerNo: v.customerNo,
                        customerOrderNo: v.customerOrderNo,
                        customerSkuCode: v.skuList[0].skuCustomsCode,
                        factorySkuCode: v.factorySkuCode?v.factorySkuCode:'',
                        inboundOutCartonTotalQty: v.inboundOutCartonTotalQty?v.inboundOutCartonTotalQty:0,
                        inboundSkuTotalGrossWeight: v.inboundSkuTotalGrossWeight?v.inboundSkuTotalGrossWeight:0,
                        inboundSkuTotalNetWeight: v.inboundSkuTotalNetWeight?v.inboundSkuTotalNetWeight:0,
                        inboundSkuTotalQty: v.inboundSkuTotalQty?v.inboundSkuTotalQty:0,
                        inboundSkuTotalVolume: v.inboundSkuTotalVolume?v.inboundSkuTotalVolume:0,
                        innerCartonGrossWeight: v.skuList[0].skuInnerCartonRoughWeight?v.skuList[0].skuInnerCartonRoughWeight:0,
                        innerCartonHeight: v.skuList[0].skuInnerCartonHeight?v.skuList[0].skuInnerCartonHeight:0,
                        innerCartonLength: v.skuList[0].skuInnerCartonLength?v.skuList[0].skuInnerCartonLength:0,
                        innerCartonNetWeight: v.skuList[0].skuInnerCartonWeightNet?v.skuList[0].skuInnerCartonWeightNet:0,
                        innerCartonPackingMethodCn: v.skuList[0].skuInnerCartonMethodCn,
                        innerCartonVolume: v.skuList[0].skuInnerCartonVolume?v.skuList[0].skuInnerCartonVolume:0,
                        innerCartonWidth: v.skuList[0].skuInnerCartonWidth?v.skuList[0].skuInnerCartonWidth:0,
                        /**
                         * inventory,outbound暂时全部传0
                         * */
                        inventoryOutCartonQty: 0,
                        inventorySkuGrossWeight: 0,
                        inventorySkuNetWeight: 0,
                        inventorySkuQty: 0,
                        inventorySkuVolume: 0,
                        orderId: v.id,
                        orderNo: v.orderNo,
                        orderSkuQty: v.totalQty,
                        outboundOutCartonTotalQty: 0,
                        outboundSkuTotalGrossWeight: 0,
                        outboundSkuTotalNetWeight: 0,
                        outboundSkuTotalQty: 0,
                        outboundSkuTotalVolume: 0,
                        outerCartonGrossWeight: v.skuList[0].skuOuterCartonRoughWeight?v.skuList[0].skuOuterCartonRoughWeight:0,
                        outerCartonNetWeight: v.skuList[0].skuOuterCartonNetWeight?v.skuList[0].skuOuterCartonNetWeight:0,
                        outerCartonSkuQty: v.skuList[0].skuOuterCartonQty?v.skuList[0].skuOuterCartonQty:0,
                        outerCartonVolume: v.skuList[0].skuOuterCartonVolume?v.skuList[0].skuOuterCartonVolume:0,
                        packingMethodCn: v.skuList[0].skuMethodPkgCn,
                        skuBarCode: v.skuList[0].skuBarCode,
                        skuBrand: v.skuList[0].skuBrand,
                        skuCode: v.skuList[0].skuCode,
                        skuDescCn: v.skuList[0].skuDescCn,
                        skuDescCustomer: v.skuList[0].skuDescCustomer,
                        skuDescEn: v.skuList[0].skuDescEn,
                        skuHeight: v.skuList[0].skuHeight?v.skuList[0].skuHeight:0,
                        skuId: v.skuList[0].skuId,
                        skuLabel: v.skuList[0].skuLabel,
                        skuLength: v.skuList[0].skuLength?v.skuList[0].skuLength:0,
                        skuMaterialCn: v.skuList[0].skuMaterialCn,
                        skuMaterialEn: v.skuList[0].skuMaterialEn,
                        skuNameCn: v.skuList[0].skuNameCn,
                        skuNameCustomer: v.skuList[0].skuNameCustomer,
                        skuNameEn: v.skuList[0].skuNameEn,
                        skuNetWeight: v.skuList[0].skuNetWeight?v.skuList[0].skuNetWeight:0,
                        skuUnitDictCode: v.skuList[0].skuUnit,
                        skuWidth: v.skuList[0].skuWidth?v.skuList[0].skuWidth:0,
                        supplierId: 0,
                        supplierName: v.supplierName,
                        supplierNo: v.supplierNo,
                        supplierOrderNo: v.supplierOrderNo,
                    });
                })
                console.log(this.inboundData)
                this.disabledSubmit=true;

                this.$ajax.post(this.$apis.add_inbound,this.inboundData).then(res=>{
                    this.disabledSubmit=false;
                    this.$message({
                        message: '新增成功',
                        type: 'success'
                    });
                    this.$router.push('/sellerWarehouse/inbound');
                }).catch(err=>{
                    this.disabledSubmit=false;
                });
            },

            cancel(){
                window.close();
            },



            /**
             * 弹出框事件
             * */
            searchOrderData(){
                this.loadingTable=true;
                this.disabledClickSubmit=true;
                this.$ajax.post(this.$apis.get_productInfo,this.orderProduct).then(res=>{
                    this.tableDataList = this.$getDB(this.$db.warehouse.inboundOrderTable, res.datas);
                    this.loadingTable=false;
                    this.disabledClickSubmit=false;
                }).catch(err=>{
                    this.loadingTable=false;
                    this.disabledClickSubmit=false;
                });
            },
            clearSearchData(){
                this.orderProduct.orderNo='';
                this.orderProduct.skuCode='';
                this.orderProduct.skuBarCode='';
                this.orderProduct.skuNameCn='';
            },
            changeChecked(e){
                this.selectList=e;
            },
            postData(){
                let arr=this.$copyArr(this.selectList);
                arr.forEach(v=>{
                    if(v._checked && !v._disabled){
                        v._checked=false;
                        v._disabled=false;
                        this.productIds.push(v.skuId.value);
                    }
                });
                this.loadingProductTable=true;
                this.$ajax.post(this.$apis.get_orderSku,this.productIds).then(res=>{
                    this.productData=res;
                    console.log(this.productData)
                    this.loadingProductTable=false;
                }).catch(err=>{
                    this.loadingProductTable=false;
                });

                console.log(this.productIds)
                this.addOrderDialogVisible=false;
            },

            /**
             * 页面表格事件
             * */
            handleBlur(){
                console.log(12345)
            },
            handleClick(e){
                // this.$windowOpen({
                //     url:'',
                //     params:{
                //         id:e.skuList[0].skuId
                //     }
                // })
            },

        },
        created(){

        },
        watch:{
            selectProductList(n){
                if(n.length>0){
                    this.disableRemoveProduct=false;
                }else{
                    this.disableRemoveProduct=true;
                }
            }
        }
    }
</script>

<style scoped>
    .title{
        font-weight: bold;
        font-size: 16px;
        height: 32px;
        line-height: 32px;
        color:#666666;
    }

    .btns{
        margin-top: 5px;
    }

    .speInput{
        width: 80%;
    }

    .search-btn{
        text-align: center;
    }

    .total{
        margin-top: 80px;
    }
    .product-table{
        margin-top: 10px;
    }
    .product-table >>> .el-checkbox{
        margin: 0;
    }

    .footer{
        background-color: #ffffff;
        position: fixed;
        bottom: 0;
        /*width: 100%;*/
        padding: 10px;
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
    }
    .dialog-footer{
        text-align: center;
    }


</style>