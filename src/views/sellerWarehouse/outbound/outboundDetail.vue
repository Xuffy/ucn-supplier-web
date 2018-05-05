<template>
    <div class="inbound-detail" v-loading="loadingTable">
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
                                    :disabled="true"
                                    v-model="inboundData[v.key]"
                                    placeholder="please input"></el-input>
                        </div>
                        <div v-else-if="v.showType==='select'">
                            <el-select :disabled="true" class="speInput" size="mini" v-model="inboundData[v.key]" placeholder="please choose">
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
                                    :disabled="true"
                                    class="speInput"
                                    type="textarea"
                                    autosize
                                    placeholder="please input"
                                    v-model="inboundData[v.key]">
                            </el-input>
                        </div>
                        <div v-else-if="v.showType==='number'">
                            <el-input-number
                                    :disabled="true"
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
                                    :disabled="true"
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

        <v-table
                v-loading="loadProductTable"
                class="speTable"
                :data="productTable"
                :buttons="[{label:'Detail',type:1}]"
                @action="btnClick"
                @change-checked="changeChecked"></v-table>

        <div class="footBtn">
            <el-button @click="closeWindow" type="primary">{{$i.warehouse.close}}</el-button>
        </div>

    </div>
</template>

<script>

    import VTable from '@/components/common/table/index'

    export default {
        name: "inboundDetail",
        components:{
            VTable
        },
        data(){
            return{
                /**
                 * 页面基础配置
                 * */
                labelPosition:'right',
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
                loadingTable:false,

                inboundData:{
                    inboundNo:'',
                    inboundDate:'',
                    warehouseNo:'',
                    warehouseName:'',
                    storageType:null,
                    warehouseManager:'',
                    remark:'',
                    purchaser:'',
                    carrier:'',
                    carrierPhone:'',
                    timeZone:'',

                },

                /**
                 * productTable配置
                 * */
                loadProductTable:false,
                productTable:[],

            }
        },
        methods:{
            getData(){
                this.loadingTable=true;
                this.$ajax.get(`${this.$apis.get_inboundDetail}?id=${this.$route.query.id}`).then(res=>{
                    this.inboundData=res;

                    this.$ajax.post(this.$apis.get_inboundSku,{
                        inboundId: this.$route.query.id,
                        pn: 1,
                        ps: 50,

                        // sorts: [
                        //     {
                        //         orderBy: "",
                        //         orderType: "",
                        //     }
                        // ],
                    }).then(res=>{
                        console.log(res)

                        this.productTable = this.$getDB(this.$db.warehouse.inboundDetailProductTable, res.datas,(e)=>{

                        });

                        this.loadingTable=false;
                    }).catch(err=>{
                        this.loadingTable=false;
                    });


                }).catch(err=>{
                    this.loadingTable=false;
                });
            },


            /**
             * product table事件
             * */
            btnClick(e){
                console.log(e)
            },
            changeChecked(e){

            },

            //关闭窗口
            closeWindow(){
                window.close();
            }
        },
        created(){
            this.getData();
        },
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

    .speInput{
        width: 80%;
    }


</style>