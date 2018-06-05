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
                                    :placeholder="v.sysCreate?'系统生成':'请输入'"></el-input>
                        </div>
                        <div v-else-if="v.showType==='select'">
                            <el-select class="speInput" size="mini" v-model="inboundData[v.key]" placeholder="请选择">
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
                                    autosize
                                    placeholder="请输入"
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
                                    label="请输入"></el-input-number>
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
                                    placeholder="选择日期"
                                    :editable="false"
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
            <el-button type="primary" :disabled="loadingProductTable" @click="addProduct">{{$i.warehouse.addProduct}}</el-button>
            <el-button @click="removeProduct" :disabled="selectOuterProductList.length===0" type="danger">{{$i.warehouse.removeProduct}}</el-button>
        </div>

        <el-table
                v-loading="loadingProductTable"
                class="product-table"
                :data="productData"
                border
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
                    v-for="v in $db.warehouse.inboundOrderProductTable"
                    :key="v.key"
                    :label="$i.warehouse[v.key]"
                    :prop="v.key"
                    align="center"
                    width="180">
                <template slot-scope="scope">
                    <div v-if="v.belong==='skuList'">
                        <div v-if="v.showType==='input'">
                            <el-input
                                    v-if="scope.row.skuList.length>0"
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
                        <!--<div v-if="v.needInput">-->
                            <!--<el-input-->
                                    <!--placeholder="请输入内容"-->
                                    <!--v-model="scope.row[v.key]"-->
                                    <!--@focus="handleBlur"-->
                                    <!--clearable>-->
                            <!--</el-input>-->
                        <!--</div>-->
                        <!--<div v-else>-->
                            <el-input
                                    placeholder="请输入内容"
                                    v-model="scope.row.skuList[0][v.key]"
                                    clearable>
                            </el-input>
                        <!--</div>-->
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
                                @blur="handleBlur(v.key,scope.$index)"
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
                    align="center"
                    width="100">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="total">
            <div class="title">
                {{$i.warehouse.summary}}
            </div>
            <el-form :modal="inboundData" label-width="200px" :label-position="labelPosition">
                <el-row>
                    <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                        <el-form-item prop="asd" :label="$i.warehouse.cartonOfProducts">
                            <el-input size="mini" class="speInput" :disabled="true" v-model="inboundData.skuTotalCartonQty"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                        <el-form-item prop="asd" :label="$i.warehouse.grossWeightOfProducts">
                            <el-input size="mini" class="speInput" :disabled="true" v-model="inboundData.skuTotalGrossWeight"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                        <el-form-item prop="asd" :label="$i.warehouse.volumeOfProducts">
                            <el-input size="mini" class="speInput" :disabled="true" v-model="inboundData.skuTotalVolume"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                        <el-form-item prop="asd" :label="$i.warehouse.netWeightOfProducts">
                            <el-input size="mini" class="speInput" :disabled="true" v-model="inboundData.skuTotalNetWeight"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                        <el-form-item prop="asd" :label="$i.warehouse.quantityOfProducts">
                            <el-input size="mini" class="speInput" :disabled="true" v-model="inboundData.skuTotalQty"></el-input>
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
                title="从订单添加产品"
                :visible.sync="addOrderDialogVisible"
                width="70%">
            <el-form :modal="orderProduct" ref="orderProduct" label-width="200px" :label-position="labelPosition">
                <el-row>
                    <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                        <el-form-item prop="orderNo" :label="$i.warehouse.orderNo">
                            <el-select clearable size="mini" class="speInput" v-model="orderProduct.orderNo" placeholder="请选择">
                                <el-option
                                        v-for="item in orderNoOption"
                                        :key="item.id"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                        <el-form-item prop="skuCode" :label="$i.warehouse.skuCode">
                            <el-input placeholder="请输入" size="mini" class="speInput" v-model="orderProduct.skuCode"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                        <el-form-item prop="skuNameCn" :label="$i.warehouse.skuNameCn">
                            <el-input placeholder="请输入" size="mini" class="speInput" v-model="orderProduct.skuNameCn"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                        <el-form-item prop="skuBarCode" :label="$i.warehouse.skuBarCode">
                            <el-input placeholder="请输入" size="mini" class="speInput" v-model="orderProduct.skuBarCode"></el-input>
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
                <el-button :disabled="disabledCancelSearch" @click="closeDialog">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

    import {VTimeZone,VTable} from '@/components/index'

    export default {
        name: "createInbound",
        components:{
            VTable,
            VTimeZone
        },
        data(){
            return{
                /**
                 * 页面基础配置
                 * */
                labelPosition:'right',
                disabledSubmit:false,
                orderNoOption:[],
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
                inboundTypeOption:[],
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
                selectOuterProductList:[],
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
                    this.orderNoOption=[];
                    _.uniq(_.pluck(res.datas, 'orderNo')).forEach((v,k)=>{
                        this.orderNoOption.push({
                            id:k+1,
                            value:v,
                            label:v
                        });
                    });
                    this.tableDataList = this.$getDB(this.$db.warehouse.inboundOrderTable, res.datas);
                    /**
                     * 每次打开弹窗时进行置灰判断
                     * */
                    this.tableDataList.forEach(v=>{
                        if(v.skuId.value===0){  //id为0的是脏数据，不能选
                            this.$set(v,'_disabled',true);
                        }else{
                            this.productData.forEach(m=>{
                                if(v.skuId.value===m.skuList[0].skuId){
                                    this.$set(v,'_disabled',true);
                                    this.$set(v,'_checked',true);
                                    this.selectList.push(v);
                                }
                            });
                        }
                    });
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
                    this.productData=_.difference(this.productData,this.selectOuterProductList);
                    console.log(this.productData,'data')
                    this.$message({
                        type: 'success',
                        message: '移除成功!'
                    });
                }).catch(() => {
                });
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
                this.disabledSubmit=true;
                this.$ajax.post(this.$apis.add_inbound,this.inboundData).then(res=>{
                    this.disabledSubmit=false;
                    this.$message({
                        message: '新增成功',
                        type: 'success'
                    });
                    this.$router.push('/warehouse/inbound');
                }).catch(err=>{
                    this.disabledSubmit=false;
                });
            },

            cancel(){
                window.close();
            },
            //改变product table选中状态时触发的事件
            changeProductChecked(e){
                this.selectOuterProductList=e;
            },
            //表格统计
            getSummaries(param) {
                const { columns, data } = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = '总价';
                    }else{
                        if(index===13 || index===14 || index===15 || index===16 || index===17){
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
                                // sums[index] += ' 元';
                            } else {
                                sums[index] = 0;
                            }
                            if(index===13){
                                this.inboundData.skuTotalCartonQty=sums[index];
                            }else if(index===14){
                                this.inboundData.skuTotalVolume=sums[index];
                            }else if(index===15){
                                this.inboundData.skuTotalNetWeight=sums[index];
                            }else if(index===16){
                                this.inboundData.skuTotalGrossWeight=sums[index];
                            }else if(index===17){
                                this.inboundData.skuTotalQty=sums[index];
                            }
                        }
                    }
                });

                return sums;
            },

            /**
             * 弹出框事件
             * */
            searchOrderData(){
                this.loadingTable=true;
                this.disabledClickSubmit=true;
                this.$ajax.post(this.$apis.get_productInfo,this.orderProduct).then(res=>{
                    this.tableDataList = this.$getDB(this.$db.warehouse.inboundOrderTable, res.datas);
                    /**
                     * 每次搜索时进行置灰判断
                     * */
                    this.tableDataList.forEach(v=>{
                        if(v.skuId.value===0){  //id为0的是脏数据，不能选
                            this.$set(v,'_disabled',true);
                        }else{
                            this.productData.forEach(m=>{
                                if(v.skuId.value===m.skuList[0].skuId){
                                    this.$set(v,'_disabled',true);
                                    this.$set(v,'_checked',true);
                                }
                            });
                        }
                    });
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
                this.productIds=[];
                let arr=this.$copyArr(this.selectList);
                if(arr.length===0){
                    return this.$message({
                        message: '请至少选择一个产品',
                        type: 'warning'
                    });
                }
                arr.forEach(v=>{
                    if(v._checked && !v._disabled && v.skuId.value!==0){
                        v._checked=false;
                        v._disabled=false;
                        this.productIds.push(v.skuId.value);
                    }
                });
                if(this.productIds.length!==0){
                    //表示有新增产品
                    this.loadingProductTable=true;
                    this.$ajax.post(this.$apis.get_orderSku,this.productIds).then(res=>{
                        res.forEach(v=>{
                            this.productData.push(v);
                        });

                        console.log('哇哈哈')

                        // /**
                        //  * 计算底部summary
                        //  * */
                        // // inboundOutCartonTotalQty
                        //
                        // let skuTotalCartonQty=0,
                        //     skuTotalGrossWeight=0,
                        //     skuTotalNetWeight=0,
                        //     skuTotalQty=0,
                        //     skuTotalVolume=0;
                        //
                        // this.productData.forEach(v=>{
                        //     if(v.inboundOutCartonTotalQty){
                        //         skuTotalCartonQty+=v.inboundOutCartonTotalQty;
                        //     }
                        //     if(v.inboundSkuTotalGrossWeight){
                        //         skuTotalGrossWeight+=v.inboundSkuTotalGrossWeight;
                        //     }
                        //     if(v.inboundSkuTotalNetWeight){
                        //         skuTotalNetWeight+=v.inboundSkuTotalNetWeight;
                        //     }
                        //     if(v.inboundSkuTotalQty){
                        //         skuTotalQty+=v.inboundSkuTotalQty;
                        //     }
                        //     if(v.inboundSkuTotalVolume){
                        //         skuTotalVolume+=v.inboundSkuTotalVolume;
                        //     }
                        // });
                        // this.$set(this.inboundData,'skuTotalCartonQty',skuTotalCartonQty);
                        // this.$set(this.inboundData,'skuTotalGrossWeight',skuTotalGrossWeight);
                        // this.$set(this.inboundData,'skuTotalNetWeight',skuTotalNetWeight);
                        // this.$set(this.inboundData,'skuTotalQty',skuTotalQty);
                        // this.$set(this.inboundData,'skuTotalVolume',skuTotalVolume);
                        this.loadingProductTable=false;
                    }).catch(err=>{
                        this.loadingProductTable=false;
                    });
                }
                this.clearSearchData();
                this.addOrderDialogVisible=false;
            },
            closeDialog(){
                this.addOrderDialogVisible = false;
                this.clearSearchData();
            },

            /**
             * 页面表格事件
             * */
            handleBlur(e,index){
                if(e==='inboundOutCartonTotalQty'){
                    //处理入库产品总箱数输入框
                    if(!this.productData[index][e] || !this.productData[index]['skuOuterCartonQty']){
                        this.productData[index].inboundSkuTotalQty='';
                    }else{
                        this.productData[index].inboundSkuTotalQty=this.productData[index][e]*this.productData[index]['skuOuterCartonQty'];
                    }

                    //处理入库产品总净重
                    if(!this.productData[index][e] || !this.productData[index]['skuOuterCartonNetWeight']){
                        this.productData[index].inboundSkuTotalNetWeight='';
                    }else{
                        this.productData[index].inboundSkuTotalNetWeight=this.productData[index][e]*this.productData[index]['skuOuterCartonNetWeight'];
                    }

                    //处理入库产品总毛重
                    if(!this.productData[index][e] || !this.productData[index]['skuOuterCartonRoughWeight']){
                        this.productData[index].inboundSkuTotalGrossWeight='';
                    }else{
                        this.productData[index].inboundSkuTotalGrossWeight=this.productData[index][e]*this.productData[index]['skuOuterCartonRoughWeight'];
                    }

                    //处理入库产品总体积
                    if(!this.productData[index][e] || !this.productData[index]['skuOuterCartonVolume']){
                        this.productData[index].inboundSkuTotalVolume='';
                    }else{
                        this.productData[index].inboundSkuTotalVolume=this.productData[index][e]*this.productData[index]['skuOuterCartonVolume'];
                    }
                }else if(e==='skuOuterCartonVolume'){
                    //处理外箱体积
                    if(!this.productData[index]['inboundOutCartonTotalQty'] || !this.productData[index]['skuOuterCartonVolume']){
                        this.productData[index].inboundSkuTotalVolume='';
                    }else{
                        this.productData[index].inboundSkuTotalVolume=this.productData[index]['inboundOutCartonTotalQty']*this.productData[index]['skuOuterCartonVolume'];
                    }
                }else if(e==='skuOuterCartonRoughWeight'){
                    //处理外箱毛重
                    if(!this.productData[index]['inboundOutCartonTotalQty'] || !this.productData[index]['skuOuterCartonRoughWeight']){
                        this.productData[index].inboundSkuTotalGrossWeight='';
                    }else{
                        this.productData[index].inboundSkuTotalGrossWeight=this.productData[index]['inboundOutCartonTotalQty']*this.productData[index]['skuOuterCartonRoughWeight'];
                    }
                }else if(e==='skuOuterCartonNetWeight'){
                    //处理外箱净重
                    if(!this.productData[index]['inboundOutCartonTotalQty'] || !this.productData[index]['skuOuterCartonNetWeight']){
                        this.productData[index].inboundSkuTotalNetWeight='';
                    }else{
                        this.productData[index].inboundSkuTotalNetWeight=this.productData[index]['inboundOutCartonTotalQty']*this.productData[index]['skuOuterCartonNetWeight'];
                    }
                }
            },
            handleClick(e){
                // this.$windowOpen({
                //     url:'',
                //     params:{
                //         id:e.skuList[0].skuId
                //     }
                // })
            },

            /**
             * 获取字典
             * */
            getUnit(){
                this.$ajax.post(this.$apis.get_partUnit,['IBD_TYPE'],{_cache:true}).then(res=>{
                    this.inboundTypeOption=res[0].codes;
                });
                // this.$ajax.get(this.$apis.get_allUnit,).then(res=>{
                //     console.log(res)
                // });
            },

        },
        created(){
            this.getUnit();
        },
        watch:{

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
        max-width: 1000px !important;
    }
    .speInput >>> .el-select{
        display: block;
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
        z-index:1000;
    }
    .dialog-footer{
        text-align: center;
    }


</style>