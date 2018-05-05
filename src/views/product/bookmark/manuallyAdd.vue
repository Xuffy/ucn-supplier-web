<template>
    <div class="manually-add">
        <div class="title">
            {{$i.product.basicInformation}}
        </div>
        <div class="addPic">
            <div class="name">
                Pic:
            </div>
            <div class="imgGroup">
                <img-handler :data="imgGroup"></img-handler>
            </div>
            <div class="btns">
                <up-load></up-load>
                <!--<el-button @click="addPic">Add</el-button>-->
            </div>
        </div>
        <el-form :modal="productForm" ref="basicInfo" class="speForm" label-width="290px" :label-position="labelPosition">
            <el-row>
                <el-col class="speCol" v-for="v in $db.product.detailTab" v-if="v.belongTab==='basicInfo'" :key="v.key" :xs="24" :sm="v.fullLine?24:12" :md="v.fullLine?24:12" :lg="v.fullLine?24:12" :xl="v.fullLine?24:12">
                    <el-form-item :prop="v.key" :label="v.label">
                        <div v-if="v.showType==='input'">
                            <el-input class="speInput" size="mini" v-model="productForm[v.key]" placeholder="please choose"></el-input>
                        </div>
                        <div v-else-if="v.showType==='select'">
                            <el-select class="speInput" size="mini" v-model="productForm[v.key]" placeholder="please choose">
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
                                    v-model="productForm[v.key]">
                            </el-input>
                        </div>
                        <div v-else-if="v.showType==='number'">
                            <el-input-number
                                    class="speInput"
                                    size="mini"
                                    v-model="productForm[v.key]"
                                    :controls="false"
                                    :min="0"
                                    label="please input"></el-input-number>
                        </div>
                        <div v-else-if="v.showType==='dropdown'">
                            <drop-down
                                    class="speInput"
                                    :list="categoryList"
                                    :defaultProps="defaultProps"
                                    v-model="productForm[v.key]"
                                    ref="dropDown"></drop-down>
                        </div>

                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <div class="title">
            {{$i.product.customerInfo}}
        </div>
        <el-form :modal="productForm" ref="customerInfo" class="speForm" label-width="290px" :label-position="labelPosition">
            <el-row>
                <el-col class="speCol" v-for="v in $db.product.detailTab" v-if="v.belongTab==='customerInfo'" :key="v.key" :xs="24" :sm="v.fullLine?24:12" :md="v.fullLine?24:12" :lg="v.fullLine?24:12" :xl="v.fullLine?24:12">
                    <el-form-item :prop="v.key" :label="v.label">
                        <div v-if="v.showType==='input'">
                            <el-input class="speInput" size="mini" v-model="productForm[v.key]" placeholder="please choose"></el-input>
                        </div>
                        <div v-else-if="v.showType==='select'">
                            <el-select class="speInput" size="mini" v-model="productForm[v.key]" placeholder="please choose">
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
                                    v-model="productForm[v.key]">
                            </el-input>
                        </div>
                        <div v-else-if="v.showType==='number'">
                            <el-input-number
                                    class="speInput"
                                    size="mini"
                                    v-model="productForm[v.key]"
                                    :controls="false"
                                    :min="0"
                                    label="please input"></el-input-number>
                        </div>
                        <div v-else-if="v.showType==='dropdown'">
                            <drop-down
                                    class="speInput"
                                    :list="dropData"
                                    ref="dropDown"></drop-down>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <div class="title">
            {{$i.product.priceInfo}}
        </div>
        <el-form :modal="productForm" ref="priceInfo" class="speForm" label-width="290px" :label-position="labelPosition">
            <el-row>
                <el-col class="speCol" v-for="v in $db.product.detailTab" v-if="v.belongTab==='priceInfo'" :key="v.key" :xs="24" :sm="v.fullLine?24:12" :md="v.fullLine?24:12" :lg="v.fullLine?24:12" :xl="v.fullLine?24:12">
                    <el-form-item :prop="v.key" :label="v.label">
                        <div v-if="v.showType==='input'">
                            <el-input class="speInput" size="mini" v-model="productForm.price[0][v.key]" placeholder="please choose"></el-input>
                        </div>
                        <div v-else-if="v.showType==='select'">
                            <el-select class="speInput" size="mini" v-model="productForm.price[0][v.key]" placeholder="please choose">
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
                                    v-model="productForm.price[0][v.key]">
                            </el-input>
                        </div>
                        <div v-else-if="v.showType==='number'">
                            <el-input-number
                                    class="speInput"
                                    size="mini"
                                    v-model="productForm.price[0][v.key]"
                                    :controls="false"
                                    :min="0"
                                    label="please input"></el-input-number>
                        </div>
                        <div v-else-if="v.showType==='dropdown'">
                            <drop-down
                                    class="speInput"
                                    :list="dropData"
                                    ref="dropDown"></drop-down>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <div class="title">
            {{$i.product.packingInfo}}
        </div>
        <el-form :modal="productForm" ref="packingInfo" class="speForm" label-width="300px" :label-position="labelPosition">
            <el-row>
                <el-col class="speCol" v-for="v in $db.product.detailTab" v-if="v.belongTab==='packingInfo'" :key="v.key" :xs="24" :sm="v.fullLine?24:12" :md="v.fullLine?24:12" :lg="v.fullLine?24:12" :xl="v.fullLine?24:12">
                    <el-form-item :prop="v.key" :label="v.label">
                        <div v-if="v.showType==='input'">
                            <el-input class="speInput" size="mini" v-model="productForm[v.key]" placeholder="please choose"></el-input>
                        </div>
                        <div v-else-if="v.showType==='select'">
                            <el-select class="speInput" size="mini" v-model="productForm[v.key]" placeholder="please choose">
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
                                    v-model="productForm[v.key]">
                            </el-input>
                        </div>
                        <div v-else-if="v.showType==='number'">
                            <el-input-number
                                    class="speInput"
                                    size="mini"
                                    v-model="productForm[v.key]"
                                    :controls="false"
                                    :min="0"
                                    label="please input"></el-input-number>
                        </div>
                        <div v-else-if="v.showType==='dropdown'">
                            <drop-down
                                    class="speInput"
                                    :list="dropData"
                                    ref="dropDown"></drop-down>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <div class="title">
            {{$i.product.logisticInfo}}
        </div>
        <el-form :modal="productForm" ref="logisticInfo" class="speForm" label-width="300px" :label-position="labelPosition">
            <el-row>
                <el-col class="speCol" v-for="v in $db.product.detailTab" v-if="v.belongTab==='logisticInfo'" :key="v.key" :xs="24" :sm="v.fullLine?24:12" :md="v.fullLine?24:12" :lg="v.fullLine?24:12" :xl="v.fullLine?24:12">
                    <el-form-item :prop="v.key" :label="v.label">
                        <div v-if="v.showType==='input'">
                            <el-input class="speInput" size="mini" v-model="productForm[v.key]" placeholder="please choose"></el-input>
                        </div>
                        <div v-else-if="v.showType==='select'">
                            <el-select class="speInput" size="mini" v-model="productForm[v.key]" placeholder="please choose">
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
                                    v-model="productForm[v.key]">
                            </el-input>
                        </div>
                        <div v-else-if="v.showType==='number'">
                            <el-input-number
                                    class="speInput"
                                    size="mini"
                                    v-model="productForm[v.key]"
                                    :controls="false"
                                    :min="0"
                                    label="please input"></el-input-number>
                        </div>
                        <div v-else-if="v.showType==='dropdown'">
                            <drop-down
                                    class="speInput"
                                    :list="dropData"
                                    ref="dropDown"></drop-down>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <div class="title">
            {{$i.product.otherInfo}}
        </div>
        <el-form :modal="productForm" ref="otherInfo" class="speForm" label-width="300px" :label-position="labelPosition">
            <el-row>
                <el-col class="speCol" v-for="v in $db.product.detailTab" v-if="v.belongTab==='otherInfo'" :key="v.key" :xs="24" :sm="v.fullLine?24:12" :md="v.fullLine?24:12" :lg="v.fullLine?24:12" :xl="v.fullLine?24:12">
                    <el-form-item :prop="v.key" :label="v.label">
                        <div v-if="v.showType==='input'">
                            <el-input class="speInput" size="mini" v-model="productForm[v.key]" placeholder="please choose"></el-input>
                        </div>
                        <div v-else-if="v.showType==='select'">
                            <el-select class="speInput" size="mini" v-model="productForm[v.key]" placeholder="please choose">
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
                                    v-model="productForm[v.key]">
                            </el-input>
                        </div>
                        <div v-else-if="v.showType==='number'">
                            <el-input-number
                                    class="speInput"
                                    size="mini"
                                    v-model="productForm[v.key]"
                                    :controls="false"
                                    :min="0"
                                    label="please input"></el-input-number>
                        </div>
                        <div v-else-if="v.showType==='dropdown'">
                            <drop-down
                                    class="speInput"
                                    :list="dropData"
                                    ref="dropDown"></drop-down>
                        </div>
                        <div v-else-if="v.showType==='date'">
                            <el-date-picker
                                    class="speInput"
                                    v-model="productForm[v.key]"
                                    align="right"
                                    type="date"
                                    :editable="false"
                                    placeholder="please choose"
                                    :picker-options="pickerOptions1">
                            </el-date-picker>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <div class="title">
            {{$i.product.attachment}}
        </div>



        <!--<input style="display: none" id="pic" name="file" type="file" accept="image/*" @change="uploadPic">-->

        <div class="footBtn">
            <el-button @click="finish" :loading="disabledSubmit" type="primary">{{$i.product.finishEn}}</el-button>
        </div>
    </div>
</template>

<script>
    import upLoad from '@/components/common/upload/upload'
    import imgHandler from './imgHandler'
    import {dropDownSingle} from '@/components/index'

    export default {
        name: "manually-add",
        components:{
            imgHandler,
            upLoad,
            dropDown:dropDownSingle
        },
        data(){
            return{
                /**
                 * 页面基础配置
                 * */
                labelPosition:'left',
                imgGroup:[],
                pickerOptions1: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [
                        {
                            text: '今天',
                            onClick(picker) {
                                picker.$emit('pick', new Date());
                            }
                        },
                        {
                            text: '昨天',
                            onClick(picker) {
                                const date = new Date();
                                date.setTime(date.getTime() - 3600 * 1000 * 24);
                                picker.$emit('pick', date);
                            }
                        },
                        {
                            text: '一周前',
                            onClick(picker) {
                                const date = new Date();
                                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                                picker.$emit('pick', date);
                            }
                        }
                    ]
                },
                disabledSubmit:false,
                defaultProps:{
                    label:'name',
                    children:'children'
                },
                //categoryID配置
                categoryList:[
                    {
                        id:123,
                        name:"系统分类",
                        children:[]
                    },
                    {
                        id:5125,
                        name:"自己的分类",
                        children:[]
                    },
                ],
                //整个页面数据配置
                productForm:{
                    adjustPackage: true,
                    applicableAge: 0,
                    availableQty: 0,

                    barcode: "",
                    brand: "",
                    brandRelated: "",
                    brandRemark: "",
                    categoryId: 0,
                    certificat: "",
                    code: "",
                    colourCn: "",
                    colourEn: "",
                    comments: "",
                    commodityInspectionCn: "",
                    commodityInspectionEn: "",
                    customerCreate: true,
                    customerSkuCode: "",
                    customsCode: "",
                    customsNameCn: "",
                    customsNameEn: "",
                    declareElement: "",
                    deliveryDates: 0,
                    descCn: "",
                    descCustomer: "",
                    descEn: "",
                    design: "",
                    displayBoxQty: 0,
                    expireDates: 0,
                    expireUnit: null,
                    formation: "",
                    gp20SkuQty: 0,
                    gp40SkuQty: 0,
                    height: 0,
                    hq40SkuQty: 0,
                    id: null,
                    innerCartonDesc: "",
                    innerCartonHeight: 0,
                    innerCartonLength: 0,
                    innerCartonMethodCn: "",
                    innerCartonMethodEn: "",
                    innerCartonOuterNum: 0,
                    innerCartonQty: 0,
                    innerCartonRoughWeight: 0,
                    innerCartonUnit: "",
                    innerCartonVolume: 0,
                    innerCartonWeightNet: 0,
                    innerCartonWidth: 0,
                    inspectQuarantineCategory: "",
                    inventory: 0,
                    inventoryCostMethod: "",
                    length: 0,
                    lengthWidthHeight: "",
                    logisticId: null,
                    mainSaleArea: "",
                    mainSaleCountry: 0,
                    materialCn: "",
                    materialEn: "",
                    methodPkgCn: "",
                    methodPkgEn: "",
                    minInventory: 0,
                    minOrderQty: 0,
                    nameCn: "",
                    nameCustomer: "",
                    nameEn: "",
                    netWeight: 0,
                    noneSellCountry: 0,
                    oem: true,
                    origin: "",
                    otherPackInfoCn: "",
                    otherPackInfoEn: "",
                    outerCartonDesc: "",
                    outerCartonHeight: 0,
                    outerCartonLength: 0,
                    outerCartonMethodCn: "",
                    outerCartonMethodEn: "",
                    outerCartonNetWeight: 0,
                    outerCartonQty: 0,
                    outerCartonRoughWeight: 0,
                    outerCartonUnit: "",
                    outerCartonVolume: 0,
                    outerCartonWidth: 0,
                    pic: "what the fuck",
                    pkgId: null,
                    price: [
                        {
                            //新增的
                            cifArea: "",
                            cifCurrency: 0,
                            cifPrice: 0,
                            dduArea: "",
                            dduCurrency: 0,
                            dduPrice: 0,
                            refCifPrice: 0,
                            refDduPrice: 0,
                            refFobPrice: 0,
                            //旧的
                            exwCurrency: 0,
                            exwPrice: 0,
                            fobCurrency: 0,
                            fobPort: "",
                            fobPrice: 0,
                            id: null,
                            otherIncoterm: 0,
                            otherIncotermArea: 0,
                            otherIncotermCurrency: 0,
                            otherIncotermPrice: 0,
                            status: 2,          //1:基础报价，2:成本价
                        }
                    ],
                    productionDates: 0,
                    qualityStander: "",
                    rateValueAddedTax: 0,
                    readilyAvailable: true,
                    recycle: false,
                    safeInventory: 0,
                    skuQtyPerTray: 0,
                    specialTransportRequire: "",
                    status: 0,
                    supplierCode: "",
                    supplierId: null,
                    supplierName: "",
                    taxRefundRate: 0,
                    tradeMarkCn: "",
                    tradeMarkEn: "",
                    tryDimension: 0,
                    unit: null,
                    unitLength: 0,
                    unitVolume: 0,
                    unitWeight: 0,
                    useDisplayBox: true,
                    volume: 0,
                    warehourceDefault: "",
                    width: 0,
                    yearListed: "2018-04-21T03:45:53.903Z"
                },

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

            //获取类别数据
            getCategoryId(){
                this.$ajax.get(this.$apis.get_buyer_sys_category,{}).then(res=>{
                    this.categoryList[0].children=res;
                }).catch(err=>{

                });
                // this.$ajax.get(this.$apis.get_my_category,{}).then(res=>{
                //     this.categoryList[1].children=res;
                // }).catch(err=>{
                //
                // });
                // this.$ajax.get(this.$apis.get_productCategory,{}).then(res=>{
                //     this.dropData=res;
                // }).catch(err=>{
                //     console.log(err)
                // });
            },

            //完成新增
            finish(){
                this.disabledSubmit=true;
                this.$ajax.post(this.$apis.add_customerSku,this.productForm).then(res=>{
                    this.disabledSubmit=false;
                    this.$router.push('/product/bookmark');
                }).catch(err=>{
                    this.disabledSubmit=false;
                });
            },
        },
        created(){
            this.getCategoryId();
        },
    }
</script>

<style scoped>
    .manually-add{
        position: relative;
    }
    .title{
        font-weight: bold;
        font-size: 18px;
        height: 32px;
        line-height: 32px;
        color:#666666;
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
    .speCol{
        min-height: 51px;
    }
    .speInput{
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
        text-align: left;
    }
</style>