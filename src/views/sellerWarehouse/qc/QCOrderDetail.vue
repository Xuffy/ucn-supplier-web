<template>
    <div class="QCOrderDetail">
        <el-form ref="ruleform" :model="fromArg">
            <el-row :gutter="10">                    
                <el-col 
                    v-for="(item, index) in $db.warehouse.qcDetailBasicInfo" 
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
                            v-model="basicInfo[item.key]" 
                            :size="item.size || 'mini'"
                            v-if="item.type === 'String' && !item._hide" 
                            :disabled="true"
                        />
                        <el-input-number v-model="basicInfo[item.key]" :disabled="true" :min="0" :max="100" v-if="item.type === 'phone'" controls-position="right" size="mini" :controls="false" style="width:100%;"/>
                        <el-select
                                v-model="basicInfo[item.key]" 
                                value-key="id"
                                :size="item.size || 'mini'"
                                v-if="item.type === 'Select'"
                                style="width:100%;"
                                :disabled="true"
                            >
                            <el-option
                                v-for="item in []"
                                :key="item.id"
                                :id="item.id"
                            />
                        </el-select>
                        <el-input
                            type="textarea"
                            v-model="basicInfo[item.key]"
                            :rows="item.rows || 4"
                            :size="item.size || 'mini'"
                            :placeholder="item.placeholder"
                            v-if="item.type === 'textarea'"
                            resize="none"
                            :disabled="true"
                        />
                        <v-up-load v-if="item.type === 'attachment' || item.type === 'upData'"/>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <h5 class="solid">付款信息</h5>
        <el-table :data="paymentData" border show-summary style="width: 100%">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column
                v-for="item in $db.warehouse.payment"
                :key="item.id"
                :prop="item.key"
                :label="item.label"
                :width="item.width || 180" 
            />
        </el-table>
        <h5 class="solid">产品信息</h5>
        <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
            <el-tab-pane label="验货结果" name="">
                <el-button @click="dialogClose = true" :disabled="checkedData.length <= 0">接受</el-button>
                <v-table 
                    :data.sync="tabData"
                    :buttons="[{'label': '详情', type: 'detail'}]"
                    @action="producInfoAction"
                    @change-checked="changeChecked"
                    :totalRow="true"
                />
            </el-tab-pane>
            <el-tab-pane label="返工申请" name="APPLY_FOR_REWORK">
                <el-button @click="rework" :disabled="checkedData.length <= 0">接受返工</el-button>
                <v-table 
                    :data.sync="tabData"
                    :buttons="[{'label': '详情', type: 'detail'}]"
                    @action="producInfoAction"
                    @change-checked="changeChecked"
                    :totalRow="true"
                />
            </el-tab-pane>
            <el-tab-pane label="退货申请" name="APPLY_FOR_RETURN">
                <el-button @click="returnGoods" :disabled="checkedData.length <= 0">接受退货</el-button>
                <v-table 
                    :data.sync="tabData"
                    :buttons="[{'label': '详情', type: 'detail'}]"
                    @action="producInfoAction"
                    @change-checked="changeChecked"
                    :totalRow="true"
                />
            </el-tab-pane>
        </el-tabs>
        <h5 class="solid">总结</h5>
        <el-form ref="ruleform" :model="fromArg">
            <el-row :gutter="10">                    
                <el-col 
                    v-for="(item, index) in $db.warehouse.summary" 
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
                            v-model="basicInfo[item.key]" 
                            :size="item.size || 'mini'"
                            v-if="!item._hide" 
                            disabled
                        />
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div class="add-quick-link">
            <el-dialog title="Add Quick Link" :visible.sync="dialogClose">
                <el-checkbox-group v-model="checkedList">
                    <el-row>
                    <el-col :span="8" v-for="item in qcDetailProductInfo" :key="item.key" v-if="!item._hide">
                        <el-checkbox :label="item.key">
                        {{item.label}}
                        </el-checkbox>
                    </el-col>
                    </el-row>
                </el-checkbox-group>

                <div slot="footer" class="dialog-footer">
                    <el-button @click="$store.state.quickLink.show = false">取 消</el-button>
                    <el-button type="primary" @click="accept">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import { Upload, VTable } from '@/components/index';
    export default {
        name: 'QCOrderDetail',
        data() {
            return {
                qcDetailProductInfo: {
                    innerCartonLength: {
                        label: 'innerCartonLength',
                        key: 'innerCartonLength'
                    },
                    innerCartonWidth: {
                        label: 'innerCartonWidth',
                        key: 'innerCartonWidth'
                    },
                    innerCartonHeight: {
                        label: 'innerCartonHeight',
                        key: 'innerCartonHeight'
                    },
                    innerCartonVolume: {
                        label: 'innerCartonVolume',
                        key: 'innerCartonVolume'
                    },
                    innerCartonNetWeight: {
                        label: 'innerCartonNetWeight',
                        key: 'innerCartonNetWeight'
                    },
                    innerCartonGrossWeight: {
                        label: 'innerCartonGrossWeight',
                        key: 'innerCartonGrossWeight'
                    },
                    outerCartonLength: {
                        label: 'outerCartonLength',
                        key: 'outerCartonLength'
                    },
                    outerCartonWidth: {
                        label: 'outerCartonWidth',
                        key: 'outerCartonWidth'
                    },
                    outerCartonHeight: {
                        label: 'outerCartonHeight',
                        key: 'outerCartonHeight'
                    },
                    outerCartonVolume: {
                        label: 'outerCartonVolume',
                        key: 'outerCartonVolume'
                    },
                    outerCartonNetWeight: {
                        label: 'outerCartonNetWeight',
                        key: 'outerCartonNetWeight'
                    },
                    outerCartonGrossWeight:{
                        label: 'outerCartonGrossWeight',
                        key: 'outerCartonGrossWeight'
                    }
                },
                checkedList: [],
                checkedData: [],
                paymentData: [],
                orderType: 20,
                basicInfo: {},
                tabData: [],
                activeName2: '',
                dialogClose: false
            }
        },
        computed: {
            fromArg() {
                let json = {};
                _.mapObject(this.$db.warehouse.qcDetailBasicInfo, (val, k) => {
                    json[k] = '';
                });
                return json;
            }
        },
        components: {
            'v-up-load': Upload,
            'v-table': VTable
        },
        created() {
            this.getDetail();
        },
        methods: {
            rework() {
                this.$ajax.post(this.$apis.POST_REWORK_HANDLE, {
                    qcOrderDetailIds: this.checkedData,
                    accept: true
                })
                .then(res => {
                    
                });
            },
            returnGoods() {
                this.$ajax.post(this.$apis.POST_RETURN_HANDLE, this.checkedData)
                .then(res => {

                });
            },
            accept() {
                this.$ajax.post(this.$apis.POST_QC_RESULT_ACCEPT, {
                    qcOrderDetailIds: this.checkedData,
                    fields: this.checkedList
                })
                .then(res => {
                    this.dialogClose = false;
                })
            },
            getDetail() {
                this.$ajax.get(`${this.$apis.GET_QC_GETBYID}?id=${this.$route.query.id}`)
                .then(res => {
                    this.basicInfo = res;
                    this.getPayment();
                    this.getQcList();
                })
            },
            getQcList(name) {
                let params = {
                    pn: 1,
                    ps: 200,
                    qcOrderId: this.basicInfo.id,
                    skuInventoryStatusDictCode: name || ''
                };
                this.$ajax.post(this.$apis.POST_QC_DETAIL_PAGE, params)
                .then(res => {
                    this.tabData = this.$getDB(this.$db.warehouse.qcDetailProductInfo, res.datas);
                });
            },
            getPayment() {
                this.$ajax.post(this.$apis.post_order_paymentlist, {
                    orderNo: this.basicInfo.qcOrderNo,
                    orderType: this.orderType
                }).then((res) => {
                    this.paymentData = res.datas;
                });
            },
            handleClick(tab, event) {
                this.checkedData = [];
                this.getQcList(tab.name);
            },
            handleSelectionChange() {

            },
            producInfoAction() {

            },
            changeChecked(item) {
                let arr = [];
                _.map(item, items => {
                    _.pick(items, (val, k) => {
                        if(k === 'id') arr.push(val.value);
                    })
                })
                this.checkedData = arr;
            }
        }
    }
</script>
<style scoped>
    .QCOrderDetail .el-form {
        padding: 10px;
    }
    .QCOrderDetail .el-form-item >>> .el-form-item__label {
        display:flex;
        justify-content:flex-end;
        text-align: left;
    }
</style>
<style scoped lang="less">
    .QCOrderDetail h5 {
        font-size:15px;
        font-weight: bold;
        color:#666;
        padding:10px 0;
        margin: 5px 0;
        &.solid {
            border-bottom:1px dotted #ccc;
        }
    }
</style>

