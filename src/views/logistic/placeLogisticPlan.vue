<template>
    <div class="place-logistic-plan">
        <div class="hd-top">{{ $i.common.placeNewLogisticPlan }}</div>
        <div class="hd active">{{ $i.common.basicInfo }}</div>
        <el-form ref="ruleform" :model="fromArg">
            <el-row :gutter="10">                    
                <el-col v-for="(item, index) in $db.logistic.basicInfo" :key="index" :xs="item.xs || 8" :sm="item.sm || 8" :md="item.md || 8" :lg="item.lg || 8">
                    <el-form-item  
                            :label="item.label" 
                            :prop="item.key" 
                            :rules="item.rules" 
                            :label-width="item.width || '150px'"
                            v-if="!item._hide"
                        >
                        <el-input 
                            v-model="fromArg[item.key]" 
                            :size="item.size || 'mini'"
                            :placeholder="item.placeholder || 'Please input'" 
                            v-if="item.type === 'text'" 
                            :disabled="item.disabled"
                        />

                        <el-select
                                v-model="fromArg[item.key]" 
                                :size="item.size || 'mini'"
                                :placeholder="item.placeholder || 'Please choose'" 
                                v-if="item.type === 'select'"
                                style="width:100%;"
                                :disabled="item.disabled"
                            >
                            <el-option
                                v-for="nodes in []"
                                :key="nodes.value"
                                :label="nodes.label"
                                :value="nodes.value"
                            />
                        </el-select>
                        <el-input
                            type="textarea"
                            v-model="fromArg[item.key]"
                            :rows="item.rows || 4"
                            :size="item.size || 'mini'"
                            :placeholder="item.placeholder || 'Please input'"
                            v-if="item.type === 'attachment' || item.type === 'textarea'"
                            resize="none"
                            :disabled="item.disabled"
                        />
                        <el-date-picker
                            style="width:100%;"
                            :size="item.size || 'mini'"
                            type="date"
                            v-if="item.type === 'date'"
                            v-model="fromArg[item.key]"
                            :disabled="item.disabled"
                            :placeholder="item.placeholder || 'Please choose'"
                        />
                        <el-input
                            v-if="item.type === 'textDate'"
                            :size="item.size || 'mini'"
                            :placeholder="item.placeholder || 'Please choose'"
                            suffix-icon="el-icon-date"
                            v-model="fromArg[item.key]"
                            :disabled="true"
                        />

                         <el-input
                            v-if="item.type === 'number'"
                            :size="item.size || 'mini'"
                            type="number"
                            :placeholder="item.placeholder || 'Please choose'"
                            v-model="fromArg[item.key]"
                        />
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div class="hd">{{ $i.common.containerInfo }}</div>
        <!-- <v-container-info 
            :tableData="tableData" 
            @tabAppend="tabAppend" 
            @tailBtnCancel="tailBtnCancel"
            @tailBtnOk="tailBtnOk"
            @tabSplite="tabSplite"
        /> -->
        
        <div class="hd">{{ $i.common.productInfo }}</div>
        <div class="btn-wrap">
            <div>
                <el-button @click="newSearchDialogVisible = true">{{ $i.common.addProduct }}</el-button>
                <el-button type="danger">{{ $i.common.remove }}</el-button>
            </div>
        </div>
        <v-table 
            :data="tabData" 
        />
        <div class="fix-btn">
            <el-button>{{ $i.common.save }}</el-button>
            <el-button>{{ $i.common.sentAsOrder }}</el-button>
            <el-button type="danger">{{ $i.common.delete }}</el-button>
        </div>
        <div class="fix-btn-station"></div>
        <el-dialog
                :title="$i.common.addProduct"
                :visible.sync="newSearchDialogVisible"
                width="80%"
                lock-scroll>
            <v-select-search :options="['1', 0]" />
            <v-table 
                :data="tabData" 
            />
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="newSearchDialogVisible = false">{{ $i.common.ok }}</el-button>
                <el-button @click="newSearchDialogVisible = false">{{ $i.common.cancel }}</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import { VTable, containerInfo, selectSearch } from '@/components/index';
    export default {
        name: 'placeLogisticPlan',
        data() {
            return {
                tabData: [],
                newSearchDialogVisible:false,
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
            }
        },
        created() {
            // this.ajax({
            //     url: '/viewByInquiry',
            //     method: 'get'
            // }).then(res => {
            //     this.tabData = res.inquiry;
            //     this.tabColumn = 'negotiation.tableViewByInquiry';
            // });
            console.log(this.$db.logistic.basicInfo)
        },
        components: {
            "v-table": VTable,
            "v-container-info": containerInfo,
            "v-select-search": selectSearch
        },
        computed: {
            fromArg() {
                let json = {};
                for(let key in this.$db.inquiry.createbBasicInfo) {
                    json[key] = '';
                };
                return json;
            }
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
        .hd {
            height: 40px;
            line-height:40px;
            padding:0 15px;
            font-weight: bold;
            &.active {
                border:none;
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
            left:180px;
            bottom:0;
            background:#fff;
            width: 100%;
            padding:10px;
            box-sizing: border-box;
            border-top:1px solid #cdcc;
            z-index:11;
        }
        .fix-btn-station {
            width: 100%;
            height: 53px;
        }
    }
</style>
