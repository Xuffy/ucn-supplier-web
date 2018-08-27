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
                           v-for='(v,index) in $db.supplier.overview'
                           :key="index+'j'">
                            <el-form-item class="speWidth" :prop="v.key"  :label="v.label + ':' ">
                              <div v-if="v.type==='input'">
                                <el-input
                                  size="mini"
                                  :placeholder="$i.common.inputkeyWordToSearch"
                                  v-model="params[v.key]">
                                </el-input>
                              </div>
                              <div v-if="v.type==='select'">
                                {{params[v.country]}}
                                <el-select class="speWidth" v-model="params[v.key]" :placeholder="$i.common.inputSearch">
                                  <el-option
                                    size="mini"
                                    v-for="item in options[v.key]"
                                    :key="item.code"
                                    :label="item.name"
                                    :value="item.code">
                                  </el-option>
                                </el-select>
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
              </div>
              <div>

              </div>
        </div>
<!--        表格-->
       <v-table
              code="udata_supply_supplier_customer_overview"
              @change-sort="sort"
              :height=500
              :loading='loading'
              :data="tabData"
              :buttons="[{label: $i.common.detail, type: 1}]"
              @action="detail"
              @change-checked='checked'
              style='marginTop:10px'>
            <template slot="header">
              <div style="margin-top: 20px;" v-authorize="'CUSTOMER:OVERVIEW:READ_ONLY'">
                <el-button @click="deleteCustomer" type="danger" :disabled='!selectNumber.length>0'
                v-authorize="'CUSTOMER:OVERVIEW:ARCHIVE'">
                  {{$i.common.archive}}({{selectNumber.length}})</el-button>
                <el-button @click="downloadCustomer" type="primary" v-authorize="'CUSTOMER:OVERVIEW:DOWNLOAD'"
                           :disabled='!tabData.length>0'>{{$i.button.download}}
                  ({{selectNumber.length===0?$i.common.all:selectNumber.length}})</el-button>
              </div>
            </template>
       </v-table>
        <page
          :page-data="pageData"
          @change="handleSizeChange"
          @size-change="pageSizeChange"></page>


      <div v-show='!isButton'  style='display:flex; justify-content: center'>
                <el-button @click='emitData'>{{$i.common.ok}}</el-button>
                <el-button type="primary">{{$i.common.cancel}}</el-button>
            </div>

    </div>
</template>

<script>

    import { mapActions} from 'vuex';
    import {dropDownSingle,VPagination,VTable} from '@/components/index';
    export default {
        name: "SupplierSourcing",
        components: {
            dropDown: dropDownSingle,
            VTable,
            page:VPagination
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
                disableClickDeleteBtn: false,
                loading: false,
                pageData: {},
                endpn: '',
                params: {
                    city: '',
                    companyId: null,
                    country: '',
                    incoterm: null,
                    name: '',
                    payment: null,
                    pn: 1,
                    ps: 50,
                    recycle: false,
                    type: null,
                    sorts:[]
                },
                tabData: [],
                selectedData: [],
                selectNumber: [],
                options:{},
                //Category下拉组件数据
                dropData: [],
                defaultProps: {
                    label: 'name',
                    children: 'children'
                },
            }
        },
        methods: {
               ...mapActions([
                 'setMenuLink'
            ]),
            handleSizeChange(val) {
              this.params.pn = val;
              this.getData();
            },
            pageSizeChange(val) {
              this.params.ps = val;
              this.getData();
            },
            //获取字典
            getCodePart(){
              this.$ajax.post(this.$apis.POST_CODE_PART,["PMT","SP_TYPE","ITM"],{ cache: true }).then(res=>{
                this.options.payment = _.findWhere(res, {'code': 'PMT'}).codes;
                this.options.incoterm = _.findWhere(res, {'code': 'ITM'}).codes;
                this.options.type = _.findWhere(res, {'code': 'SP_TYPE'}).codes;
              }).catch(err=>{
                console.log(err)
              });
            },
              //获取国家
            getCountryAll(){
              this.$ajax.get(this.$apis.GET_COUNTRY_ALL, {}, { cache: true }).then(res=>{
                 this.options.country = res
              }).catch(err=>{
                console.log(err)
              });
            },
          //切换body的收缩展开状态
            switchDisplay() {
                this.hideBody = !this.hideBody;
            },

            //清除填写的表格数据
            clear(name) {
                this.$refs[name].resetFields();
            },
            //当作为主键时
            emitData() {
                this.$emit('handleOkClick', this.selectedData)
            },
            //搜查
            search() {
                this.getData()
            },
            //...........进入detail
            detail(item) {
                this.$windowOpen({
                    url: '/customer/detail',
                    params: {
                        type: 'read',
                        id: item.id.value,
                        companyId: item.companyId.value
                    }

                });
            },
            deleteCustomer(){
              this.$confirm(this.$i.common.sureDelete, this.$i.common.prompt, {
                confirmButtonText: this.$i.common.sure,
                cancelButtonText: this.$i.common.cancel,
                type: 'warning'
              }).then(() => {
                this.disableClickDeleteBtn = true;
                this.$ajax.post(this.$apis.post_supply_batchDelete, this.selectNumber).then(res => {
                  this.disableClickDeleteBtn = false;
                  this.selectNumber =[];
                  this.getData();
                  this.$message({
                    type: 'success',
                    message: this.$i.common.deleteTheSuccess
                  });
                }).finally(() => {
                  this.disableClickDeleteBtn = false;
                });
              })
            },
            //.........checked
            checked(item) {
                this.selectedData = item
                let number = []
                this.selectedData.forEach(item => {
                    number.push(item.id.value);
                });
                this.selectNumber = number

            },
            //.....拿数据
            getData() {
                this.loading = true
                this.$ajax.post(this.$apis.post_getCustomerList, this.params)
                    .then(res => {
                        this.pageData=res;
                        this.loading = false
                        this.tabData = this.$getDB(this.$db.supplier.overviewtable, res.datas,e=>{
                        let country,payment,type,incoterm;
                        country = _.findWhere(this.options.country, {code: e.country.value}) || {};
                        payment = _.findWhere(this.options.payment, {code:(e.payment.value)+''}) || {};
                        type = _.findWhere(this.options.type, {code: (e.type.value)+''}) || {};
                        incoterm=_.findWhere(this.options.incoterm, {code: (e.incoterm.value)+''}) || {};
                        e.country._value = country.name || '';
                        e.payment._value = payment.name || '';
                        e.type._value = type.name || '';
                        e.incoterm._value = incoterm.name || '';
                        return e;
                      });
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
                        console.log(res)
                    });
            },
            getCategoryId() {
                this.$ajax.get(this.$apis.getCategory, {}).then(res => {
                    this.dropData = res;
                }).catch(err => {
                    console.log(err)
                });
            },
          downloadCustomer(){
            let ids=_.pluck(_.pluck(this.selectedData,"id"),'value');
            if(ids.length>0){
              this.$fetch.export_task('UDATA_SUPPLIER_EXPORT_CUSTOMER_IDS',{ids:ids});
            }else{
              let params=this.$depthClone(this.params);
              this.$fetch.export_task('UDATA_SUPPLIER_EXPORT_CUSTOMER_PARAMS',params);
            }
          },
          sort(item){
            this.params.sorts = item.sorts;
            this.getData();
          },
        },
        created() {
            this.getCodePart();
            this.getCountryAll();
            this.getData();
        },
        mounted(){
          this.setMenuLink([{
            path: '',
            query: {code: 'SUPPLIER_CUSTOMER_REMARK'},
            type: 100,
            label: this.$i.common.log
          },
          {
            path: 'customerArchive',
            type: 10,
            label: this.$i.common.archive,
            auth:'CUSTOMER:ARCHIVE'
          },
          ]);
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
