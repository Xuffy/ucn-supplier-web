<template>
    <div class="SupplierSourcing">
            <div class="title">
             客户总览
        </div>
<!--        搜索条件-->
            <div style='marginTop:20px;'>
                <el-form ref="params" :model="params" label-width="200px" size="mini">
                    <el-row>
                          <el-col :xs="24" :sm="12" :md="8" :lg="8" 
                           v-for='(item,index) in $db.supplier.overview'
                           :key="index+'j'"
                         
                           >
                            <el-form-item class="form-list" 
                             v-if="item.showType==='text'"
                            :label="item.label" 
                            :prop="item.key"                    
                            >
                                <el-input v-model="params[item.key]" placeholder="Enter something..."></el-input>
                            </el-form-item>
                            <el-form-item class="form-list"  v-if="item.showType==='select'"
                            :label="item.label" 
                            :prop="item.key" >
                                <el-select v-model="params[item.key]"></el-select>
                               </el-form-item>
                               <el-form-item class="form-list"  v-if="item.showType==='dropdown'"
                                :label="item.label" 
                                :prop="item.key">
                                 <div class="speDropdown">
                                     <drop-down
                                      ref="dropDown" 
                                          
                                       v-model="params[item.key]" 
                                     :defaultProps="defaultProps" 
                                     :list="dropData"></drop-down>
                                </div>
                            </el-form-item>
                         </el-col>
                        </el-row>
                </el-form>
            </div>
         
            <div class="btn-group">
            <el-button @click="search" type="primary" class="search" >{{$i.common.search}}</el-button>
            <el-button @click="clear('params')">{{$i.common.clear}}</el-button>
        </div>
<!--      搜索结果  -->
            <div v-show='isButton'>
             <div class="btnline">
<!--
                  <el-button   @click='createInquiry'>{{$i.common.creatInquiry}}({{selectNumber.length}})</el-button>
                  <el-button   @click='createOrder' :disabled='!(selectedData.length==1)'>{{$i.common.creatOrder}}</el-button>
                  <el-button  @click='compare' :disabled='!(selectedData.length>1)'>{{$i.common.compare}}({{selectNumber.length}})</el-button>
                  <el-button  @click='addToBookmark' :disabled='!(selectedData.length)>0'>{{$i.common.addToBookmark}}({{selectNumber.length}})</el-button>
-->
                  <el-button :disabled='!selectedData.length>0'>{{$i.common.downloadSelected}}({{selectNumber.length}})</el-button>
<!--                  <el-button :disabled='!selectedData.length>0'>{{$i.common.delete}}({{selectNumber.length}})</el-button>-->
              </div>  
              <div>
                 
              </div>          
        </div>
<!--        表格-->
             <v-table 
                    :height=360
                    :loading='loading'
                    :data="tabData" 
                    :buttons="[{label: 'detail', type: 1}]"
                    @action="detail" 
                    @change-checked='checked'
                    style='marginTop:10px'/>
              <v-pagination
            :page-data.sync="params"
             @change="handleSizeChange"
            @size-change="pageSizeChange"
        />     
                         
            <div v-show='!isButton'  style='display:flex; justify-content: center'>
                <el-button @click='emitData'>{{$i.common.ok}}</el-button>     
                <el-button type="primary">{{$i.common.cancel}}</el-button>
            </div>        
            
    </div>
</template>

<script>
    import {
        dropDownSingle,
        VPagination
    } from '@/components/index'
    import {
        VTable
    } from '@/components/index';
    export default {
        name: "SupplierSourcing",
        components: {
            dropDown: dropDownSingle,
            VTable,
            VPagination
        },
        props: {
            isButton: {
                type: Boolean,
                default: true
            },
            disabledLine: {
                type: Array,
                default: function() {
                    return []
                }
            },
        },
        data() {
            return {
                value: 1,
                hideBody: true, //是否显示body
                btnInfo: 'Show the Advance',
                loading: false,
                pageTotal: "",
                endpn: "",
                params: {
                    "city": "",
                    "companyId": '',
                    "country": "",
                    "incoterm": '',
                    "name": "",
                    "payment": '',
                    "pn": 1,
                    "ps": 50,
                     tc: 0
                    //                    "sorts": [{
                    //                        "nativeSql": true,
                    //                        "orderBy": "string",
                    //                        "orderType": "string",
                    //                        "resultMapId": "string"
                    //                    }],
                },
                tabData: [],
                selectedData: [],
                selectNumber: [],
                //Category下拉组件数据
                dropData: [],
                defaultProps: {
                    label: 'name',
                    children: 'children'
                },
            }
        },
        methods: {
            //切换body的收缩展开状态
            switchDisplay() {
                this.hideBody = !this.hideBody;
            },

            //清除填写的表格数据
            clear(name) {
                this.$refs[name].resetFields();
                this.params.mainBusiness = ''
            },
            //当作为主键时
            emitData() {
                this.$emit('handleOkClick', this.selectedData)
            },
            //搜查
            search() {
                console.log(this.params)
                this.get_data()
            },
            //...........进入detail
            detail(item) {
                this.$windowOpen({
                    url: '/customer/detail',
                    params: {
                        id: item.id.value
                    }

                });
            },
            //.........checked
            checked(item) {
                console.log(item)
                this.selectedData = item
                let number = []
                this.selectedData.forEach(item => {
                    console.log()
                    number.push(item.id.value);
                });
                this.selectNumber = number
               
            },
            //.....拿数据
            get_data() {
                this.loading = true
                this.$ajax.post(this.$apis.post_getCustomerList, this.params)
                    .then(res => {
                        console.log(res)
                        res.tc ? this.params.tc = res.tc : this.params.tc = this.params.tc;
                        this.pageTotal = res.datas.tc
                        this.loading = false
                        this.tabData = this.$getDB(this.$db.supplier.overviewtable, res.datas);
                    })
                    .catch((res) => {
                        this.loading = false
                    });
            },
            //...........addToBookmark
            addToBookmark() {
                this.$ajax.post(this.$apis.post_supplier_addbookmark, this.selectNumber)
                    .then(res => {
                        console.log(res)
                    })
                    .catch((res) => {
                        console.slog(res)
                    });
            },
            getCategoryId() {
                this.$ajax.get(this.$apis.getCategory, {}).then(res => {
                    this.dropData = res;
                }).catch(err => {
                    console.log(err)
                });
            },
            handleSizeChange(val) {
                this.params.pn = val;
                this.get_data()
            },
            pageSizeChange(val) {
                this.params.ps = val;
                this.get_data()
            },
        },
        created() {
            this.get_data()
            this.getCategoryId()
        },
        watch: {}
    }

</script>

<style scoped>
    .SupplierSourcing {
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

    .title-btn>>>span {
        color: #118ee9;
    }

    .body {
        /*        margin-top: 10px;*/
        overflow: hidden;
        max-height: 1400px;
        display: block;
        transition: max-height .5s cubic-bezier(.445, .05, .55, .95);
    }

    .hide {
        max-height: 0;

    }

    /*.show{*/

    /*height: auto;*/

    /*}*/

    .form-list {
        margin-bottom: 10px;
    }

    .el-input {
        /*        width:200px;*/
    }

    .btn-group {
        text-align: center;
        margin-top: 10px;
    }

    .btn-group .search {
        margin-right: 30px;
    }

    .btnline {
        margin-top: 20px;
        width: 100%;
        border-top: 1px solid black;
    }

    .btnline .el-button {
        margin-right: 8px;
        margin-top: 20px;
    }

    .el-select {
        max-width: 200px
    }

    .el-input {
        max-width: 200px;
    }

    .speDropdown {
        max-width: 200px;
        height: 30px;
    }

    /*
    .vtable {
        margin-top: 20px;
    }
*/

</style>
