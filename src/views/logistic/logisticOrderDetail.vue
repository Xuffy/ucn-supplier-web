<template>
    <div class="place-logistic-plan">
        <div class="hd-top">{{ $t('logistic.text.placeNewLogisticOrder') }}</div>
        <div class="hd active">{{ $t('logistic.text.basicInfo') }}</div>
        <el-row :gutter="10">
            <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="input-item">
                    <span>{{ $t('logistic.basicInfo.invoiceNumber')}}</span>
                    <el-input :placeholder="$i.logistic.pleaseChoose"></el-input>
                </div>
            </el-col>
            <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="input-item">
                    <span>{{ $t('logistic.basicInfo.logisticsID')}}</span>
                    <el-input :placeholder="$i.logistic.pleaseChoose"></el-input>
                </div>
            </el-col>
            <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="input-item">
                    <span>{{ $t('logistic.basicInfo.shipmentStatus') }}</span>
                    <el-input :placeholder="$i.logistic.pleaseChoose"></el-input>
                </div>
            </el-col>
            <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="input-item">
                    <span>{{ $t('logistic.basicInfo.billDate') }}</span>
                    <el-date-picker
                        v-model="DateOfArrival"
                        align="right"
                        type="date"
                        :placeholder="$i.logistic.pleaseChoose"
                        :picker-options="CarrierOptions" 
                    />
                </div>
            </el-col>
             <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="input-item">
                    <span>{{ $t('logistic.basicInfo.declareType') }}</span>
                    <el-select v-model="Carrier" placeholder="请选择">
                        <el-option
                        v-for="item in CarrierOptions"
                        :key="item.id"
                        :label="item.label"
                        :value="item.id" />
                    </el-select>
                </div>
            </el-col>
            <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="input-item">
                    <span>{{ $t('logistic.basicInfo.declareDate') }}</span>
                    <el-date-picker
                        v-model="DateOfArrival"
                        align="right"
                        type="date"
                        :placeholder="$i.logistic.pleaseChoose"
                        :picker-options="CarrierOptions" 
                    />
                </div>
            </el-col>
            <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="input-item">
                    <span>{{ $t('logistic.basicInfo.bookingDate') }}</span>
                    <el-date-picker
                        v-model="DateOfArrival"
                        align="right"
                        type="date"
                        :placeholder="$i.logistic.pleaseChoose"
                        :picker-options="CarrierOptions" 
                    />
                </div>
            </el-col>
             <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="input-item">
                    <span>{{ $t('logistic.basicInfo.containerStuffingDate') }}</span>
                    <el-date-picker
                        v-model="DateOfArrival"
                        align="right"
                        type="date"
                        :placeholder="$i.logistic.pleaseChoose"
                        :picker-options="CarrierOptions" 
                    />
                </div>
            </el-col>    
            <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="input-item">
                    <span>{{ $t('logistic.basicInfo.customsCleanceDate') }}</span>
                    <el-date-picker
                        v-model="DateOfArrival"
                        align="right"
                        type="date"
                        :placeholder="$i.logistic.pleaseChoose"
                        :picker-options="CarrierOptions" 
                    />
                </div>
            </el-col>
            <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="input-item">
                    <span>{{ $t('logistic.basicInfo.sailDate') }}</span>
                    <el-date-picker
                        v-model="DateOfArrival"
                        align="right"
                        type="date"
                        :placeholder="$i.logistic.pleaseChoose"
                        :picker-options="CarrierOptions" 
                    />
                </div>
            </el-col>
            <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="input-item">
                    <span>{{ $t('logistic.basicInfo.arrivalDate') }}</span>
                    <el-date-picker
                        v-model="DateOfArrival"
                        align="right"
                        type="date"
                        :placeholder="$i.logistic.pleaseChoose"
                        :picker-options="CarrierOptions" 
                    />
                </div>
            </el-col>
            <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="input-item">
                    <span>{{ $t('logistic.basicInfo.releaseDate') }}</span>
                    <el-date-picker
                        v-model="DateOfArrival"
                        align="right"
                        type="date"
                        :placeholder="$i.logistic.pleaseChoose"
                        :picker-options="CarrierOptions" 
                    />
                </div>
            </el-col>
            <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="input-item">
                    <span>{{ $t('logistic.basicInfo.companyName') }}</span>
                    <el-select v-model="Incoterm" placeholder="请选择">
                        <el-option
                        v-for="item in IncotermOptions"
                        :key="item.id"
                        :label="item.label"
                        :value="item.id" />
                    </el-select>
                </div>
            </el-col>
            <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="input-item">
                    <span>{{ $t('logistic.basicInfo.customerShortName') }}</span>
                    <el-select v-model="Incoterm" placeholder="请选择">
                        <el-option
                        v-for="item in IncotermOptions"
                        :key="item.id"
                        :label="item.label"
                        :value="item.id" />
                    </el-select>
                </div>
            </el-col>
             <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="input-item">
                    <span>{{ $t('logistic.basicInfo.receiptCompany') }}</span>
                    <el-input :placeholder="$i.logistic.pleaseChoose"></el-input>
                </div>
            </el-col>  
             <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="input-item">
                    <span>{{ $t('logistic.basicInfo.shippingAgentCompany') }}</span>
                    <el-select v-model="Incoterm" placeholder="请选择">
                        <el-option
                        v-for="item in IncotermOptions"
                        :key="item.id"
                        :label="item.label"
                        :value="item.id" />
                    </el-select>
                </div>
            </el-col>   
             <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="input-item">
                    <span>{{ $t('logistic.basicInfo.priceTerms') }}</span>
                    <el-select v-model="Incoterm" placeholder="请选择">
                        <el-option
                        v-for="item in IncotermOptions"
                        :key="item.id"
                        :label="item.label"
                        :value="item.id" />
                    </el-select>
                </div>
            </el-col>
             <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="input-item">
                    <span>{{ $t('logistic.basicInfo.currency') }}</span>
                    <el-select v-model="Incoterm" placeholder="请选择">
                        <el-option
                        v-for="item in IncotermOptions"
                        :key="item.id"
                        :label="item.label"
                        :value="item.id" />
                    </el-select>
                </div>
            </el-col>
             <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="input-item">
                    <span>{{ $t('logistic.basicInfo.paymentMethod') }}</span>
                    <el-select v-model="Incoterm" placeholder="请选择">
                        <el-option
                        v-for="item in IncotermOptions"
                        :key="item.id"
                        :label="item.label"
                        :value="item.id" />
                    </el-select>
                </div>
            </el-col>
             <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="input-item">
                    <span>{{ $t('logistic.basicInfo.paymentTerm') }}</span>
                    <el-input :placeholder="$i.logistic.pleaseChoose"></el-input>
                </div>
            </el-col>
             <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="input-item">
                    <span>{{ $t('logistic.basicInfo.transportationWay') }}</span>
                    <el-select v-model="Incoterm" placeholder="请选择">
                        <el-option
                        v-for="item in ['海运']"
                        :key="item.id"
                        :label="item.label"
                        :value="item.id" />
                    </el-select>
                </div>
            </el-col>
             <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="input-item">
                    <span>{{ $t('logistic.basicInfo.batchForLogistics') }}</span>
                    <el-select v-model="Incoterm" placeholder="请选择">
                        <el-option
                        v-for="item in ['是', '否']"
                        :key="item.id"
                        :label="item.label"
                        :value="item.id" />
                    </el-select>
                </div>
            </el-col>
             <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="input-item">
                    <span>{{ $t('logistic.basicInfo.permitedOrNotPrmitedForTransshipment') }}</span>
                    <el-select v-model="Incoterm" placeholder="请选择">
                        <el-option
                        v-for="item in ['是', '否']"
                        :key="item.id"
                        :label="item.label"
                        :value="item.id" />
                    </el-select>
                </div>
            </el-col>
             <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="input-item">
                    <span>{{ $t('logistic.basicInfo.BLType') }}</span>
                    <el-select v-model="Incoterm" placeholder="请选择">
                        <el-option
                        v-for="item in []"
                        :key="item.id"
                        :label="item.label"
                        :value="item.id" />
                    </el-select>
                </div>
            </el-col>
             <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="input-item">
                    <span>{{ $t('logistic.basicInfo.BLQuantity') }}</span>
                    <el-input placeholder="请填写" type="number" />
                </div>
            </el-col>
             <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="input-item">
                    <span>{{ $t('logistic.basicInfo.BLNumber') }}</span>
                    <el-input placeholder="请填写" />
                </div>
            </el-col>
             <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="input-item">
                    <span>{{ $t('logistic.basicInfo.shipper') }}</span>
                    <el-input placeholder="请填写" />
                </div>
            </el-col>
             <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="input-item">
                    <span>{{ $t('logistic.basicInfo.consignee') }}</span>
                    <el-input placeholder="请填写" />
                </div>
            </el-col>
             <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="input-item">
                    <span>{{ $t('logistic.basicInfo.notify') }}</span>
                    <el-input placeholder="请填写" />
                </div>
            </el-col>
             <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="input-item">
                    <span>{{ $t('logistic.basicInfo.transportCompany') }}</span>
                    <el-input placeholder="请填写" />
                </div>
            </el-col>
             <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="input-item">
                    <span>{{ $t('logistic.basicInfo.vesselName') }}</span>
                    <el-input placeholder="请填写" />
                </div>
            </el-col>
             <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="input-item">
                    <span>{{ $t('logistic.basicInfo.vesselNo') }}</span>
                    <el-input placeholder="请填写" />
                </div>
            </el-col>
             <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="input-item">
                    <span>{{ $t('logistic.basicInfo.departCountry') }}</span>
                    <el-select v-model="Incoterm" placeholder="请选择">
                        <el-option
                        v-for="item in []"
                        :key="item.id"
                        :label="item.label"
                        :value="item.id" />
                    </el-select>
                </div>
            </el-col>
             <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="input-item">
                    <span>{{ $t('logistic.basicInfo.departPort') }}</span>
                    <el-select v-model="Incoterm" placeholder="请选择">
                        <el-option
                        v-for="item in []"
                        :key="item.id"
                        :label="item.label"
                        :value="item.id" />
                    </el-select>
                </div>
            </el-col>
             <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="input-item">
                    <span>{{ $t('logistic.basicInfo.destinationCountry') }}</span>
                    <el-select v-model="Incoterm" placeholder="请选择">
                        <el-option
                        v-for="item in []"
                        :key="item.id"
                        :label="item.label"
                        :value="item.id" />
                    </el-select>
                </div>
            </el-col>
             <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="input-item">
                    <span>{{ $t('logistic.basicInfo.destinationPort') }}</span>
                    <el-select v-model="Incoterm" placeholder="请选择">
                        <el-option
                        v-for="item in []"
                        :key="item.id"
                        :label="item.label"
                        :value="item.id" />
                    </el-select>
                </div>
            </el-col>
        </el-row>
        <div class="hd">{{ $t('logistic.text.containerInfo') }}</div>
        <el-table
            ref="multipleTable"
            :data="tableData"
            height="200"
            show-summary
            :summary-method="getSummaries"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" />
            <el-table-column label="集装箱号" prop="ContainerNumber" />
            <el-table-column prop="sealNo" label="铅封号" />
            <el-table-column prop="weight" label="集装箱重量" show-overflow-tooltip />
            <el-table-column prop="type" label="货柜类型" />
            <el-table-column prop="VGM" label="VGM" />
            <el-table-column prop="number" label="产品数量" />
            <el-table-column prop="volume" label="体积" />
            <el-table-column prop="NetWeight" label="净重" />
            <el-table-column prop="theNumber" label="箱数" />
            <el-table-column prop="value" label="货值" />
            <el-table-column prop="Total" label="总报关合计" />
        </el-table>
        <div class="hd">费用</div>
        <div class="cost-wrap">
            <div class="thead">
                <div class="tr">
                    <div class="td">拖柜费</div>
                    <div class="td"><el-input placeholder="input"></el-input></div>
                </div>
            </div>
        </div>
        <div class="hd">Payment</div>
        <!-- <div class="Payment-hd">
            <span>服务付款</span>
            <el-button>申请服务付款</el-button>
        </div> -->
        <payment-table btnInfo="申请付款" :columns="PaymentColumns" :data="PaymentData" />
        <div class="hd">Ship Info</div>
        <el-row :gutter="10">
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <div class="input-item">
                    <span>运输公司</span>
                    <el-input :placeholder="$i.logistic.pleaseChoose"></el-input>
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
            <i class="el-icon-setting"></i>
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
    import { VSimpleTable, paymentTable } from '@/components/index';
    export default {
        name: 'placeLogisticPlan',
        data() {
            return {
                PaymentColumns: [],
                PaymentData: {
                    type: 'payment',
                    data: [{
                        paymentNumber: "232",
                        paymentItem: 222,
                        estPayDate: "2018-09-08",
                        estAmount: 2323,
                        actPayDate: "2018-09-07",
                        actAmount: 2323,
                        avilable: 2323
                    },{
                        paymentNumber: "232",
                        paymentItem: 222,
                        estPayDate: "2018-09-08",
                        estAmount: 2323,
                        actPayDate: "2018-09-07",
                        actAmount: 2323,
                        avilable: 2323
                    },{
                        paymentNumber: "232",
                        paymentItem: 222,
                        estPayDate: "2018-09-08",
                        estAmount: 2323,
                        actPayDate: "2018-09-07",
                        actAmount: 2323,
                        avilable: 2323
                    }]
                },
                tabColumn: [],
                tabData: [],
                data:[],
                columns:'',
                pickerOptions:{
                    disabledDate(time) {
                        return time.getTime() > Date.now();
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
                },
                DateOfArrival:'',
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
                departure:'',
                Cost: [
                    {
                        
                    }
                ],
                tableData: [{
                    ContainerNumber: 'YUWEIE',
                    sealNo: 'REWQIO',
                    weight: '21345',
                    type: '',
                    VGM: '12590.85',
                    number: '282480',
                    volume: '66.099',
                    NetWeight: '11827.6',
                    theNumber: '2',
                    value: '354198.8',
                    Total: '354198.8'
                },
                {
                    ContainerNumber: 'YUWEIE',
                    sealNo: 'REWQIO',
                    weight: '21345',
                    type: '',
                    VGM: '12590.85',
                    number: '282480',
                    volume: '66.099',
                    NetWeight: '11827.6',
                    theNumber: '2',
                    value: '354198.8',
                    Total: '354198.8'
                },
                {
                    ContainerNumber: 'YUWEIE',
                    sealNo: 'REWQIO',
                    weight: '21345',
                    type: '',
                    VGM: '12590.85',
                    number: '282480',
                    volume: '66.099',
                    NetWeight: '11827.6',
                    theNumber: '2',
                    value: '354198.8',
                    Total: '354198.8'
                },
                {
                    ContainerNumber: 'YUWEIE',
                    sealNo: 'REWQIO',
                    weight: '21345',
                    type: '',
                    VGM: '12590.85',
                    number: '282480',
                    volume: '66.099',
                    NetWeight: '11827.6',
                    theNumber: '2',
                    value: '354198.8',
                    Total: '354198.8'
                }]
            }
        },
        components: {
            'v-simple-table': VSimpleTable,
            'payment-table': paymentTable
        },
        created() {
            this.ajax({
                url: '/viewByInquiry',
                method: 'get'
            }).then(res => {
                this.tabData = res.inquiry;
                this.tabColumn = this.$getTableColumn(res.inquiry, 'negotiation.tableViewByInquiry');
            });
            
            for(let key in this.$t('logistic.payment')) {
                this.PaymentColumns.push(
                    {
                        label: this.$t('logistic.payment')[key], 
                        type: this.$t('logistic.paymentTableData')[key],
                        prop: key,
                        width: 150
                    }
                );
            }
        },
        methods: {
            handleSelectionChange(val) {
                this.data = val;
                let params = {
                    columns: this.columns,
                    data: val
                }
                this.getSummaries(params);
            },
            getSummaries(param) {
                this.columns = param.columns;
                const sums = [];
                this.columns.forEach((column, index) => {
                    if (index === 0) return sums[index] = '总计';
                    const values = this.data.map(item => Number(item[column.property]));
                    if (!values.every(value => isNaN(value))) {
                        sums[index] = values.reduce((prev, curr) => {
                        const value = Number(curr);
                        if (!isNaN(value)) {
                            return prev + curr;
                        } else {
                            return prev;
                        }
                        }, 0);
                        sums[index];
                    } else {
                        sums[index] = '';
                    }
                });

                return sums;
            }
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
                border-bottom:none;
            }
        }   
        .cost-wrap {
            width:100%;
            overflow-x: auto;
            .thead, .tbody {
                display:flex;
                .td {
                    padding:10px 5px;
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
                display:inline-block;
                font-size:12px;
                padding-right:10px;
                box-sizing: border-box;
                display:flex;
                justify-content: flex-end;
                line-height: 16px;
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
