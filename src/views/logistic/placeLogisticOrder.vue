<template>
    <div class="place-logistic-plan">
        <div class="hd-top">Place New Logistic Order</div>
        <div class="hd active">Basic Information</div>
        <el-row :gutter="10">
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="input-item">
                    <span>logistics plan No</span>
                    <el-input placeholder="请输入内容"></el-input>
                </div>
            </el-col>
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="input-item">
                    <span>Est depature date</span>
                    <el-select v-model="depature" placeholder="请选择">
                        <el-option
                        v-for="item in depatureOptions"
                        :key="item.id"
                        :label="item.label"
                        :value="item.id" />
                    </el-select>
                </div>
            </el-col>
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="input-item">
                    <span>预计出运日期</span>
                    <el-date-picker
                    v-model="date"
                    align="right"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions" />
                </div>
            </el-col>
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="input-item">
                    <span>集装箱类型2</span>
                    <el-select v-model="Container" placeholder="请选择">
                        <el-option
                        v-for="item in ContainerOptions"
                        :key="item.id"
                        :label="item.label"
                        :value="item.id" />
                    </el-select>
                </div>
            </el-col>
             <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="input-item">
                    <span>Shipping method</span>
                    <el-input placeholder="请输入内容"></el-input>
                </div>
            </el-col>
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="input-item">
                    <span>Carrier</span>
                    <el-select v-model="Carrier" placeholder="请选择">
                        <el-option
                        v-for="item in CarrierOptions"
                        :key="item.id"
                        :label="item.label"
                        :value="item.id" />
                    </el-select>
                </div>
            </el-col>
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="input-item">
                    <span>预计到港日期</span>
                    <el-date-picker
                    v-model="DateOfArrival"
                    align="right"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="CarrierOptions" />
                </div>
            </el-col>
             <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="input-item">
                    <span>集装箱数量</span>
                    <el-input placeholder="请输入内容"></el-input>
                </div>
            </el-col>    
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="input-item">
                    <span>Est departure port</span>
                    <el-select v-model="departure" placeholder="请选择">
                        <el-option
                        v-for="item in departureOptions"
                        :key="item.id"
                        :label="item.label"
                        :value="item.id" />
                    </el-select>
                </div>
            </el-col>
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="input-item">
                    <span>Bill type</span>
                    <el-select v-model="BillType" placeholder="请选择">
                        <el-option
                        v-for="item in BillTypeOptions"
                        :key="item.id"
                        :label="item.label"
                        :value="item.id" />
                    </el-select>
                </div>
            </el-col>
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="input-item">
                    <span>Container type 1</span>
                    <el-select v-model="Container1" placeholder="请选择">
                        <el-option
                        v-for="item in ContainerOptions1"
                        :key="item.id"
                        :label="item.label"
                        :value="item.id" />
                    </el-select>
                </div>
            </el-col>
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="input-item">
                    <span>集装箱类型3</span>
                    <el-select v-model="Container3" placeholder="请选择">
                        <el-option
                        v-for="item in ContainerOptions3"
                        :key="item.id"
                        :label="item.label"
                        :value="item.id" />
                    </el-select>
                </div>
            </el-col>
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="input-item">
                    <span>Commodit Inspectioy</span>
                    <el-date-picker
                    v-model="CommoditInspectioy"
                    align="right"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="CarrierOptions" />
                </div>
            </el-col>
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="input-item">
                    <span>Incoterm</span>
                    <el-select v-model="Incoterm" placeholder="请选择">
                        <el-option
                        v-for="item in IncotermOptions"
                        :key="item.id"
                        :label="item.label"
                        :value="item.id" />
                    </el-select>
                </div>
            </el-col>
             <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="input-item">
                    <span>集装箱数量1</span>
                    <el-input placeholder="请输入内容"></el-input>
                </div>
            </el-col>  
             <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="input-item">
                    <span>集装箱数量3</span>
                    <el-input placeholder="请输入内容"></el-input>
                </div>
            </el-col>  
        </el-row>
        <div class="hd">Container Info</div>
        <v-container-info 
            :tableData="tableData" 
            @tabAppend="tabAppend" 
            @tailBtnCancel="tailBtnCancel"
            @tailBtnOk="tailBtnOk"
            @tabSplite="tabSplite"
        />
        <div class="hd">费用</div>
        <div class="cost-wrap">
            <div class="thead">
                <div class="td">拖柜费</div>
                <div class="td">拖柜费币种</div>
                <div class="td">代理费美元</div>
                <div class="td">代理费美元</div>
                <div class="td">代理费币种</div>
                <div class="td">港杂费</div>
                <div class="td">港杂费币种</div>
                <div class="td">海运费</div>
                <div class="td">海运费币种</div>
                <div class="td">保险费</div>
                <div class="td">保险费币种</div>
                <div class="td">其他费用1</div>
                <div class="td">其他费用1币种</div>
                <div class="td">其他费用1汇率</div>
                <div class="td">其他费用2</div>
                <div class="td">其他费用2币种2</div>
                <div class="td">其他费用2备注</div>
                <div class="td">佣金</div>
            </div>
            <div class="tbody">
                <div class="td"><el-input placeholder="input"></el-input></div>
                <div class="td"><el-input placeholder="input"></el-input></div>
                <div class="td"><el-input placeholder="input"></el-input></div>
                <div class="td"><el-input placeholder="input"></el-input></div>
                <div class="td"><el-input placeholder="input"></el-input></div>
                <div class="td"><el-input placeholder="input"></el-input></div>
                <div class="td"><el-input placeholder="input"></el-input></div>
                <div class="td"><el-input placeholder="input"></el-input></div>
                <div class="td"><el-input placeholder="input"></el-input></div>
                <div class="td"><el-input placeholder="input"></el-input></div>
                <div class="td"><el-input placeholder="input"></el-input></div>
                <div class="td"><el-input placeholder="input"></el-input></div>
                <div class="td"><el-input placeholder="input"></el-input></div>
                <div class="td"><el-input placeholder="input"></el-input></div>
                <div class="td"><el-input placeholder="input"></el-input></div>
                <div class="td"><el-input placeholder="input"></el-input></div>
                <div class="td"><el-input placeholder="input"></el-input></div>
                <div class="td"><el-input placeholder="input"></el-input></div>
            </div>
        </div>
        
        <div class="hd">Ship Information</div>
        <el-row :gutter="10">
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="input-item">
                    <span>运输公司</span>
                    <el-input placeholder="请输入内容"></el-input>
                </div>
            </el-col>
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="input-item">
                    <span>航船次号</span>
                    <el-select v-model="ShipNumber" placeholder="请选择">
                        <el-option
                        v-for="item in ShipNumberOptions"
                        :key="item.id"
                        :label="item.label"
                        :value="item.id" />
                    </el-select>
                </div>
            </el-col>
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="input-item">
                    <span>Country of origin</span>
                    <el-select v-model="CountryOfOrigin" placeholder="请选择">
                        <el-option
                        v-for="item in CountryOfOriginOptions"
                        :key="item.id"
                        :label="item.label"
                        :value="item.id" />
                    </el-select>
                </div>
            </el-col>
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="input-item">
                    <span>DestinationCountry</span>
                    <el-select v-model="DestinationCountry" placeholder="请选择">
                        <el-option
                        v-for="item in DestinationCountryOptions"
                        :key="item.id"
                        :label="item.label"
                        :value="item.id" />
                    </el-select>
                </div>
            </el-col>
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="input-item">
                    <span>出运口岸</span>
                    <el-select v-model="shipment" placeholder="请选择">
                        <el-option
                        v-for="item in shipmentOptions"
                        :key="item.id"
                        :label="item.label"
                        :value="item.id" />
                    </el-select>
                </div>
            </el-col>
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="input-item">
                    <span>目的口岸</span>
                    <el-select v-model="destination" placeholder="请选择">
                        <el-option
                        v-for="item in destinationOptions"
                        :key="item.id"
                        :label="item.label"
                        :value="item.id" />
                    </el-select>
                </div>
            </el-col>
        </el-row>
        <div class="hd">Product Information</div>
        <div class="btn-wrap">
            <div>
                <el-button>Add product</el-button>
                <el-button type="danger">Remove</el-button>
            </div>
        </div>
        <v-simple-table :column="tabColumn" :data.sync="tabData" />
        <div class="fix-btn">
            <el-button>Modify</el-button>
            <el-button>Accept</el-button>
            <el-button type="info">Cancle Order</el-button>    
            <el-button type="danger">Delete</el-button>
        </div>
        <div class="fix-btn-station"></div>
    </div>
</template>
<script>
    import { VSimpleTable, containerInfo } from '@/components/index';
    export default {
        name: 'placeLogisticPlan',
        data() {
            return {
                tabColumn: [],
                tabData: [],
                data:[],
                date:'',
                columns:'',
                pickerOptions:{
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [
                        {
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
                },
                DateOfArrival:'',
                depatureOptions: [{
                    id:'1',
                    label:'dadada'
                }],
                PaymentData: [],
                ContainerOptions: [],
                CarrierOptions: [],
                departureOptions: [],
                BillTypeOptions: [],
                ContainerOptions1: [],
                ContainerOptions3:[],
                IncotermOptions:[],
                ShipNumberOptions:[],
                CountryOfOriginOptions:[],
                DestinationCountryOptions:[],
                shipmentOptions:[],
                destinationOptions:[],
                destination:'',
                shipment:'',
                DestinationCountry:'',
                CountryOfOrigin:'',
                ShipNumber:'',
                Incoterm:'',
                CommoditInspectioy:'',
                Container3:'',
                Container1:'',
                BillType:'',
                Carrier:'',
                Container: '',
                depature:'',
                departure:'',
                Cost: [
                    {
                        
                    }
                ],
                tableData: []
            }
        },
        components: {
            "v-simple-table": VSimpleTable,
            "v-container-info": containerInfo
        },
        methods: {
            tabAppend() {
                this.tableData.push({})
            },
            tailBtnCancel() {
                this.tableData.pop();
            },
            tailBtnOk(item) {
                this.tableData.pop();
                this.tableData.push(item);
            },
            tabSplite(index) {
                this.tableData.splice(index, 1);
            }
        },
        created() {
            this.ajax({
                url: '/viewByInquiry',
                method: 'get'
            }).then(res => {
                this.tabData = res.inquiry;
                this.tabColumn = this.$getTableColumn(res.inquiry, 'negotiation.tableViewByInquiry');
            });
        }
    }
</script>
<style lang="less" scoped>
    .place-logistic-plan {
        position: relative;
        .hd-top {
            font-size: 18px;
            color:#666;
            height: 50px;
            line-height:50px;
            border-bottom:1px solid #ccc;
            padding:0 15px;
        }
        .Payment-hd {
            padding:10px;
            span {
                font-weight: bold;
            }
        }
        .hd {
            height: 40px;
            line-height:40px;
            border-bottom:1px solid #ccc;
            padding:0 15px;
            font-weight: bold;
            &.active {
                border:none;
            }
        }  
        .cost-wrap {
            width:100%;
            overflow-x: auto;
            .thead, .tbody {
                display:flex;
                .td {
                    padding:0 5px;
                    display:flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    height: 40px;
                    flex-shrink: 0;
                    width: 80px;
                    font-size:12px;
                    line-height:20px;
                }
            }
        }
        .input-item {
            display:flex;
            align-items: center;
            padding:10px 0;
            span {
                width: 180px;
                white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
                display:inline-block;
                font-size:12px;
                text-align: right;
                padding-right:10px;
                box-sizing: border-box;
            }
            .el-select, .el-input {
                flex:1;
            }
        }
        .btn-wrap {
            display:flex;
            align-items: center;
            justify-content: space-between;
            padding:10px 0;
            i {
                font-size:24px;
                color:#999;
            }
        }
        .fix-btn {
            position: fixed;
            z-index:9;
            left:220px;
            bottom:0;
            background:#fff;
            width: 100%;
            padding:10px;
            box-sizing: border-box;
            border-top:1px solid #cdcc;
        }
        .fix-btn-station {
            width: 100%;
            height: 53px;
        }
    }
</style>
