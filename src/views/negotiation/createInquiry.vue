<template>
    <div class="create-inquiry">
        <h3 class="hd">{{ $route.query.id?`${$i.inquiry.inquiryNo}${fromArg.inquiryNo}`:$i.common.createInquiry }}</h3>
        <div class="select-wrap">
            <h4 class="content-hd">{{ $i.inquiry.basicInfo }}</h4>
            <el-form ref="ruleform" :model="fromArg">
                <el-row :gutter="10">                    
                    <el-col 
                            v-for="(item, index) in $db.inquiry.basicInfo" 
                            :key="index" 
                            :xs="item.xs || 8" 
                            :sm="item.sm || 8" 
                            :md="item.md || 8" 
                            :lg="item.lg || 8"
                            v-if="!item._inquiryHide && !item._hide"
                        >
                        <el-form-item  
                                :label="item.label" 
                                :prop="item.key" 
                                :rules="item.rules" 
                                :label-width="item.width || '150px'"
                            >
                            <el-input 
                                v-model="fromArg[item.key]" 
                                :size="item.size || 'mini'"
                                :placeholder="item.placeholder" 
                                v-if="item.type === 'String' && !item._hide && item.types !== 'textarea'" 
                                :disabled="item.disabled"
                            />
                            <el-select
                                    v-model="fromArg[item.key]" 
                                    value-key="id"
                                    :size="item.size || 'mini'"
                                    :placeholder="item.placeholder" 
                                    v-if="item.key === 'destinationCountry' || item.key === 'departureCountry'"
                                    style="width:100%;"
                                >
                                <el-option
                                    v-for="items in selectAll[item.key]"
                                    :key="items.id"
                                    :label="items.name"
                                    :value="items.code"
                                    :id="items.id"
                                />
                            </el-select>

                            <el-select
                                    v-model="fromArg[item.key]" 
                                    value-key="id"
                                    :size="item.size || 'mini'"
                                    :placeholder="item.placeholder" 
                                    v-if="item.type === 'select' && item.key !== 'destinationCountry' && item.key != 'departureCountry'"
                                    style="width:100%;"
                                >
                                <el-option
                                    v-for="items in selectAll[item.key]"
                                    :key="items.id"
                                    :label="items.name"
                                    :value="items.code"
                                    :id="items.id"
                                />
                            </el-select>
                            <el-select
                                style="width:100%;"
                                v-if="item.type === 'manySelect'"
                                v-model="fromArg.suppliers"
                                multiple
                                filterable
                                remote
                                reserve-keyword
                                value-key="id"
                                :size="item.size || 'mini'"
                                placeholder="请输入关键词"
                                :remote-method="remoteMethod"
                                :loading="loading">
                                <el-option
                                    v-for="items in selectAll[item.key]"
                                    :key="items.id"
                                    :label="items.name"
                                    :value="items"
                                    :id="items.id"
                                />
                            </el-select>
                            <el-input
                                type="textarea"
                                v-model="fromArg[item.key]"
                                :rows="item.rows || 4"
                                :size="item.size || 'mini'"
                                :placeholder="item.placeholder"
                                v-if="item.types === 'textarea'"
                                resize="none"
                                :disabled="item.disabled"
                            />
                            <span v-if="item.type === 'Number'" style="display:flxe;">
                                <el-input-number v-model="fromArg[item.key]" :min="0" :max="100" controls-position="right" size="mini" :controls="false" style="width:100%; padding-right:10px;" /> <i style="position:absolute; right:5px; top:50%;transform: translate(0, -50%); font-size:12px;">%</i>
                            </span>
                            <v-up-load v-if="item.type === 'attachment' || item.type === 'upData'"/>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <h4 class="content-hd">{{ $i.common.productInfo }}</h4>
        <div class="status">
            <div class="btn-wrap">
                <el-button @click="addProduct">{{ $i.common.addProduct }}</el-button>
                <el-button type="danger" :disabled="checkedAll.length <= 0" @click="removeList">{{ `${$i.common.remove}(${checkedAll.length})` }}</el-button>
            </div>
            <!-- <select-search :options="[]" @inputEnter="inputEnter" /> -->
        </div>
        <v-table 
            :data.sync="tabData"
            :buttons="productInfoBtn"
            :loading="tableLoad"
            :height="500"
            @action="producInfoAction"
            @change-checked="changeChecked"
            :parId="'skuId'"
            :rowspan="2"
            :hideFilterColumn="true"
        />
        <div class="bom-btn-wrap">
            <el-button @click="submitForm()">{{ $i.common.submit }}</el-button>
            <el-button @click="submitForm('draft')">{{ $i.common.saveAsDraft }}</el-button>
        </div>
        <div class="bom-btn-wrap-station"></div>
        <el-dialog
                title="Add Product"
                :visible.sync="dialogTableVisible"
                width="80%"
                lock-scroll>
            <el-radio-group v-model="radio" @change="fromChange">
                <el-radio-button label="product">{{$i.common.fromNewSearch}}</el-radio-button>
                <el-radio-button label="bookmark">{{$i.common.FromMyBookmark}}</el-radio-button>
            </el-radio-group>
            <v-product 
                :hideBtns="true"
                :hideBtn="true"
                :disabledLine="disabledLine"
                @handleOK="getList"
                @handleCancel="handleCancel"
                :forceUpdateNumber="trig" 
                :type="radio"
                :isInquiry="true"
            ></v-product>
        </el-dialog>
        <v-history-modify
                @save="save"
                ref="HM"
            >
        </v-history-modify>
    </div>
</template>
<script>
    import { selectSearch, VTable, Upload, VHistoryModify } from '@/components/index';
    import product from '@/views/product/addProduct';
    export default {
        name:'createInquiry',
        data() {
            return {
                disabledLine: [],
                checkedAll: [],
                trig: 0,
                tableLoad: false,
                selectAll: {
                    paymentMethod: [],
                    transport: [],
                    incoterm: [],
                    currency: [],
                    supplierName: [],
                    exportLicense: [],
                    destinationCountry: [],
                    departureCountry: []
                },
                loading: false,
                fromArg: {
                    paymentTerm: 0,
                    timeZone: 1,
                    inquiryAmount: 1,
                    skuQty: 1
                },
                radio: 'product',   //Add Product status
                dialogTableVisible: false, //Add Product switch
                
                tabColumn: '', //tab top
                tabData: [], //tab Data
                textarea:'',
                pickerOptions:{
                    disabledDate(time) {
                        return time.getTime() < Date.now();
                    },
                    shortcuts: [{
                        text: 'Today',
                        onClick(picker) {
                        picker.$emit('pick', new Date());
                        }
                    }, {
                        text: 'Yesterday',
                        onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24);
                        picker.$emit('pick', date);
                        }
                    }, {
                        text: 'A week ago',
                        onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', date);
                        }
                    }]
                }
            }
        },
        components: {
            'select-search': selectSearch,
            'v-table': VTable,
            'v-product': product,
            'v-up-load': Upload,
            VHistoryModify
        },
        created() {
            this.getDictionaries();
            this.remoteMethod('');
            if(this.$route.query.id) this.getFefault();
        },
        computed: {
            
        },
        methods: {
            getFefault() {
                this.$ajax.get(`${this.$apis.GET_INQIIRY_DETAIL}/{id}`, {
                    id: this.$route.query.id
                })
                .then(res => {
                    if(res.exportLicense) {
                        res.exportLicense = 1;
                    } else {
                        res.exportLicense = 0;
                    }
                    if(res.suppliers && res.suppliers.length && _.isObject(res.suppliers)) {
                        res.suppliers.forEach(items => {
                            _.mapObject(items, (val, k) => {
                                if(/^supplier/.test(k)) items[k.substring(8, k.length).toLowerCase()] = val;
                            });
                        });
                    } else {
                        res.suppliers = [];
                    };
                    delete res.companyId;
                    delete res.id;
                    this.fromArg = res;
                    this.tabData = this.$getDB(this.$db.inquiry.productInfo, this.$refs.HM.getFilterData(res.details, 'skuId'))
                });
            },
            handleCancel() {
                this.dialogTableVisible = false;
            },
            addProduct() {
                let arr = [];
                _.map(this.tabData, item => {
                    if(!item._disabled) arr.push(item);
                });
                this.disabledLine = arr;
                this.trig = new Date().getTime();
                this.dialogTableVisible = true;
            },
            removeList() {
                let arr = [];
                _.map(this.tabData, (item, index) => {
                    if(_.indexOf(_.pluck(_.pluck(this.checkedAll, 'skuId'), 'value'), Number(item.skuId.value)) !== -1) arr.push(item);
                });
                this.tabData = _.difference(this.tabData, arr);
                this.checkedAll = [];
            },
            inputEnter(val) {

            },
            save(data) { //modify 编辑完成反填数据
                this.tabData = _.map(this.tabData, val => {
                    if(_.findWhere(val, {'key': 'skuId'}).value === _.findWhere(data[0], {'key': 'skuId'}).value && !val._remark && !data[0]._remark) {
                        val = data[0];
                        val._modify = true;
                        val.displayStyle = 1;
                        _.mapObject(val, (item, k) => {
                            if(item.length) this.$set(item, '_style', 'color:#27b7b6')
                        })
                    } else if(_.findWhere(val, {'key': 'skuId'}).value === _.findWhere(data[1], {'key': 'skuId'}).value && val._remark && data[1]._remark) {
                        val = data[1];
                        val._modify = true;
                        val.displayStyle = 1;
                        _.mapObject(val, (item, k) => {
                            if(item.length) this.$set(item, '_style', 'color:#27b7b6')
                        })
                    }
                    return val;
                });
            },
            getDictionaries() {
                this.$ajax.post(this.$apis.POST_CODE_PART, ['PMT', 'ITM', 'CY_UNIT', 'EL_IS', 'MD_TN'], '_cache')
                .then(res => {
                    this.selectAll.paymentMethod = _.findWhere(res, {'code': 'PMT'}).codes
                    this.selectAll.transport = _.findWhere(res, {'code': 'MD_TN'}).codes;
                    this.selectAll.incoterm = _.findWhere(res, {'code': 'ITM'}).codes;
                    this.selectAll.currency = _.findWhere(res, {'code': 'CY_UNIT'}).codes;
                    this.selectAll.exportLicense = _.map(_.findWhere(res, {'code': 'EL_IS'}).codes, item => {
                        item.code = Number(item.code);
                        return item;
                    });
                });

                this.$ajax.get(this.$apis.GET_COUNTRY_ALL, '', '_cache')
                .then(res => {
                    this.selectAll.destinationCountry = res;
                    this.selectAll.departureCountry = res;
                });

            },
            getProduct() {

            },
            fromChange(val) {
                this.trig = new Date().getTime();
            },
            submitForm(type) { //提交
                if(type === 'draft') { //是否保存为草稿
                    this.fromArg.draft = 1;
                } else {
                    this.fromArg.draft = 0;
                }
                this.$refs.ruleform.validate((valid) => {
                    if(!valid) return this.$message({
                        message: '请完成填写',
                        type: 'warning'
                    });
                });
                let arr = [];
                _.map(this.fromArg.suppliers, item => {
                    let json = {};
                    _.mapObject(item, (val, k) => {
                        if(!/^supplier/.test(k)) json[`supplier${k.substring(0, 1).toUpperCase()}${k.substring(1, k.length)}`] = val;
                    });
                    arr.push(json);
                });
                let upData = _.clone(this.fromArg);
                if(arr.length) upData.suppliers = arr;
                upData.details = this.dataFilter(this.tabData);
                this.$ajax.post(this.$apis.POST_INQUIRY_SAVE, this.$filterModify(upData))
                .then(res => {
                    if(!this.fromArg.draft) return this.$router.push('/negotiation/inquiry');
                    this.$router.push({
                        name: 'negotiationDraft',
                        params: {
                            type: 'inquiry'
                        }
                    });
                });
            },
            dataFilter (data) {
                let arr = [], jsons = {}, json = {};
                data.forEach(item => {
                    jsons = {};
                    if(item._remark) { //拼装remark 数据
                        for(let k in item) {
                            jsons[k] = item[k].value;
                        }
                        json.fieldRemark = jsons;
                    } else {
                        json = {};
                        for(let k in item) {
                            if(json[k] === 'fieldRemark') {
                                json[k] = jsons;
                            } else {
                                json[k] = item[k].value;
                            }
                        };
                        arr.push(json);
                    }
                });
                return arr;
            },
            changeChecked(item) {
                this.checkedAll = item;
            },
            getList(item) {
                this.$ajax.post(this.$apis.POST_INQUIRY_SKUS, item)
                .then(res => {
                    _.map(res, item => {
                        item.displayStyle = 0;
                    });
                    this.tabData = this.tabData.concat(this.$getDB(this.$db.inquiry.productInfo, this.$refs.HM.getFilterData(res, 'skuId')));
                    this.dialogTableVisible = false;
                });
            },
            productInfoBtn (item) { //Product info 按钮创建
                return [{label: 'negotiate', type: 'modify'}, {label: 'Detail', type: 'detail'}];
            },
            fnBasicInfoHistoty(item, type, config) { //查看历史记录
                let column;
                this.$ajax.get(this.$apis.GET_INQUIRY_HISTORY, {
                    id: item.skuId.value
                })
                .then(res => {
                    let arr = [];
                    _.map(this.tabData, items => {
                        if(_.findWhere(items, {'key': 'skuId'}).value+'' === config.data+'' && !items._disabled) arr.push(items)
                    });
                    if(config.type === 'histoty') {
                        this.$refs.HM.init(arr, this.$getDB(this.$db.inquiry.productInfo, this.$refs.HM.getFilterData(res, 'skuId')), false);
                    } else {
                        this.$refs.HM.init(arr, this.$getDB(this.$db.inquiry.productInfo, this.$refs.HM.getFilterData(res, 'skuId')), true);
                    }
                });
           },
           producInfoAction(data, type) { //Produc info 按钮操作
                this.id_type = 'producInfo';
                switch(type) {
                        case 'histoty':
                            this.fnBasicInfoHistoty(data, 'productInfo', { type: 'histoty', data: data.skuId.value});
                            break;
                        case 'modify':
                            this.oSwitch = true;
                            this.fnBasicInfoHistoty(data, 'productInfo', { type:'modify', data: data.skuId.value });
                            break;
                }
           },
           remoteMethod(keyWord) {
               this.$ajax.get(`${this.$apis.PURCHASE_SUPPLIER_LISTSUPPLIERBYNAME}?name=${keyWord}`)
               .then(res => {
                   this.selectAll.supplierName = res;
               })
           }
        }
    }
</script>
<style lang="less" scoped>
    .create-inquiry {
        position: relative;
        .hd {
            padding-left:15px;
            height: 50px;
            line-height:50px;
            color:#666;
            border-bottom:1px solid #ccc;
        }
        .content-hd {
            font-size:14px;
            line-height:40px;
            padding-left:20px;
        }
        .status {
            display:flex;
            height: 60px;
            box-sizing: border-box;
            padding-left:25px;
            padding-right:25px;
            align-items: center;
            justify-content:space-between;
            .btn-wrap {
                display:flex;
                align-items: center;
                span {
                    font-size:14px;
                }
            }
            .select-wrap {
                display:flex;
                align-items:center;
                .select {
                    width: 110px;
                    margin-right:5px;
                }
                .set {
                    cursor: pointer;
                    padding-left:18px;
                    color:#999;
                    i {
                        font-size:25px;
                    }
                }
            }
        }
        .bom-btn-wrap {
            background:#fff;
            position:fixed;
            left:0;
            bottom:0;
            z-index:9;
            width:100%;
            padding: 10px 200px 10px;
            box-shadow: 0 -1px 5px #ccc;
        }
        .bom-btn-wrap-station {
            height: 52px;
            width:100%;
        }
    }
</style>
<style scoped>
    .select-wrap .el-form {
        padding: 10px;
    }
    .select-wrap .el-form-item >>> .el-form-item__label {
        display:flex;
        justify-content:flex-end;
        text-align: left;
    }
</style>

