<template>
    <div class="souringDetail">
        <div class="head">
            <div class="title">
                <span>{{basicDate.name}}</span>
            </div>
            <div class="detail">
                 <el-form  label-width="190px">
                   <el-row>
                     <el-col :span="4" class="img-box">
                       <v-image :src="basicDate.logo" style="height: 230px"/>
                     </el-col>
                     <el-col :span="20">
                       <el-form>
                         <el-row>
                           <el-col
                             v-for='(item,index) in $db.supplier.detail'
                             :key='index'
                             :xs="24" :sm="item.fullLine?24:24" :md="item.fullLine?24:12" :lg="item.fullLine?24:12" :xl="item.fullLine?24:8"
                           >
                             <el-form-item label-width="260px" :prop="item.key" :label="item.label+' :'">
                               {{basicDate[item.key]}}
                             </el-form-item>
                           </el-col>
                         </el-row>
                       </el-form>
                     </el-col>
                   </el-row>
                  </el-form>
                <div class="btns" v-if="noEdit">
                  <el-button @click="deleteCustomer" type="danger" v-show="$route.query.type==='read'"
                  v-authorize="'CUSTOMER:DETAIL:ARCHIVE'">
                    {{$i.common.archive}}
                  </el-button>
                  <el-button @click="downloadCustomer" type="primary" v-authorize="'CUSTOMER:DETAIL:DOWNLOAD'">
                    {{$i.button.download}}
                  </el-button>
                </div>
            </div>
        </div>
        <div class="body">
            <el-tabs v-model="tabName" type="card" @tab-click="handleClick">
                <el-tab-pane :label="$i.supplier.address" name="address">
                    <v-table  :data="address"  :selection="false"  style='marginTop:10px'/>
                </el-tab-pane>

                <el-tab-pane :label="$i.supplier.contactInfo"  name="concats">
                    <v-table  :data="concats"  :selection="false"  style='marginTop:10px'/>
                </el-tab-pane>

                <el-tab-pane :label="$i.supplier.documentRequired" name="document">
                  <el-form label-width="200px">
                    <el-row>
                      <el-col :span="24">
                        <div class="documentBox">
                          <ul class="documentBoxCon">
                            <li class="documentBoxCon1" v-for="(item,index) in documentTypeClone" >
                              <el-checkbox
                                disabled
                                :checked="item.checked"
                                @change="handleCheckedDocument(item,index)">
                                {{item.name}}
                              </el-checkbox>
                              <div class="uploadBox" disabled="item.checked">
                                <v-upload
                                  oss-private
                                  :ref="'uploadDocument'+item.code"
                                  :limit="20"
                                  :list="item.attachments"
                                  :readonly="true"
                                />
                              </div>
                            </li>
                          </ul>
                        </div>
                      </el-col>
                    </el-row>
                  </el-form>
                </el-tab-pane>

                <el-tab-pane :label="$i.supplier.orderHistory" name="order">
                    <v-table  :data="tradeHistory"  :selection="false"  style='marginTop:10px'/>
                </el-tab-pane>

                <el-tab-pane :label="$i.supplier.inquiryHistory"  name="inquiry">
                    <v-table  :data="inquiryData"  :selection="false"  style='marginTop:10px'/>
                </el-tab-pane>

                <el-tab-pane :label="$i.supplier.attachment" name="attchment">
                    <v-upload ref="uploadAttachment" :limit="20"  :list="basicDate.attachments" readonly/>
                    <div class="attachment" v-show="!basicDate.attachments" style="margin-top:40px;">
                      <div>
                        No Attachment
                      </div>
                    </div>
                </el-tab-pane>

                 <el-tab-pane :label="$i.supplier.remark" name="remark">
                    <div class="section-btn">
                    <el-button  @click="createRemark"   type="primary">{{$i.button.add}}</el-button>
                    </div>
                  <v-table
                    :data="remarkData"
                    style='marginTop:10px'
                    :buttons="[{label: $i.common.modify, type: 2},{label: $i.common.delete, type: 3}]"
                    @action="remarkAction"
                    :selection="false"/>
                </el-tab-pane>

            </el-tabs>
        </div>
        <el-dialog :title="$i.supplier.addRemark" :visible.sync="addRemarkFormVisible" center width="600px">
            <el-form :model="addRemarkData">
              <el-form-item  :label-width="formLabelWidth">
                <el-input
                  type="textarea"
                  :rows="4"
                  v-model="addRemarkData.remark">
                </el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button :loading="disableCreateRemark" type="primary" @click="createRemarkSubmit">{{$i.button.submit}}</el-button>
              <el-button @click="addRemarkFormVisible = false">{{$i.button.cancel}}</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import { mapActions} from 'vuex';
    import VCompareList from '../product/compareList';
    import VAttachment from './attachment';
    import {
        VTable,VUpload,VImage
    } from '@/components/index';

    export default {
        name: "customerDetail",
        components: {
          VTable,
          VCompareList,
          VAttachment,
          VUpload,
          VImage
        },
        data() {
            return {
                noEdit: true,
                id:this.$route.query.id,
                tabName: 'address', //默认打开的tab
                basicDate: [],
                accounts: [],
                concats: [],
                address: [],
                document:[],
                tradeHistory:[],
                remarkData: [],
                inquiryData:[],
                incoterm:[],
                payment:[],
                type:[],
                country:[],
                currency:[],
                documentType:[],
                addRemarkData:{
                  customerId: null,
                  id: null,
                  remark: "",
                  supplierCustomerId: null,
                  version: null
                },
                orderHistoryData:{
                    customerCompanyId: null,
                    pn: 1,
                    ps: 50,
                },
                inquiryHistoryData:{
                    companyId: '',
                    pn: 1,
                    ps: 50,
                },
                documents:[],
                documentTypeClone:[],
                compareConfig: {
                    showCompareList: false, //是否显示比较列表
                },
                code: '',
                loading: false,
                addRemarkFormVisible:false,
                disableCreateRemark:false,
                lookRemarkFormVisible:false,
                isModifyAddress:false,
                formLabelWidth:'80px',
                disableClickDeleteBtn: false,
            }
        },
        methods: {
            ...mapActions([
              'setMenuLink'
            ]),
            handleClick(tab, event) {
                switch(Number(tab.index)){
                    case 3:
                    this.getOrderHistory();
                    break;
                    case 4:
                    this.getInquiryHistory();
                    break;
                    case 6:
                    this.getListRemark();
                    break;
                }
            },
            getListRemark(){
                const remark ={
                  pn: 1,
                  ps: 50,
                }
                this.$ajax.post(`${this.$apis.post_getCustomerListRemark}/${this.id}`,remark)
                .then(res => {
                    this.remarkData = this.$getDB(this.$db.supplier.remark, res.datas, item=>{
                        _.mapObject(item, val => {
                            val.type === 'textDate' && val.value && (val.value = this.$dateFormat(val.value, 'yyyy-mm-dd'))
                            return val
                        })
                    });
                })
                .catch((res) => {
                    console.log(res)
                });
            },
            modifyRemark(e){
               var result = {}
               result.remark = e.remark.value;
               result.version = e.version.value;
               result.id = e.id.value;
               this.isModifyAddress=true;      //标识正在修改地
               this.addRemarkData=Object.assign({}, result);
               this.addRemarkFormVisible=true;
            },
            createRemark(){
              this.addRemarkFormVisible=true;
              this.addRemarkData = {}
            },
            remarkAction(item,type){
              switch(type) {
                case 2:
                  this.modifyRemark(item);
                  break;
                case 3:
                  this.deleteRemark(item);
                  break;
              }
            },
            createRemarkSubmit(){
                this.disableCreateRemark = true;
                this.addRemarkData.supplierCustomerId = Number(this.$route.query.id);
                this.addRemarkData.customerId = Number(this.$route.query.customerId);
                if (this.isModifyAddress){
                this.$ajax.post(`${this.$apis.post_customerUpdataRmark}/${this.addRemarkData.id}`,this.addRemarkData)
                    .then(res => {
                    this.$message({
                        message: this.$i.common.modifySuccess,
                        type: 'success'
                    });
                    this.getListRemark();
                    this.disableCreateRemark = false;
                    this.addRemarkFormVisible = false;
                    })
                    .catch((res) => {
                    this.disableCreateRemark = false;
                    this.addRemarkFormVisible = false;
                    });
                }else{
                this.$ajax.post(this.$apis.post_addCustomerListRemark,this.addRemarkData)
                    .then(res => {
                        this.$message({
                        message: this.$i.common.addSuccess,
                        type: 'success'
                        });
                        this.getListRemark();
                        this.disableCreateRemark = false;
                        this.addRemarkFormVisible = false;
                    })
                    .catch((res) => {
                        this.disableCreateRemark = false;
                        this.addRemarkFormVisible = false;
                    });
                }
                },
                deleteRemark(e){
                this.$confirm(this.$i.common.sureToDeleteRemark, this.$i.common.prompt, {
                    confirmButtonText: this.$i.common.confirm,
                    cancelButtonText: this.$i.common.cancel,
                    type: 'warning'
                }).then(() => {
                    this.$ajax.post(this.$apis.post_deleteCustomerRemark,{id:e.id.value}).then(res=>{
                    this.$message({
                        type: 'success',
                        message: this.$i.common.deleteTheSuccess
                    });
                    this.getListRemark();
                    }).catch(err=>{
                    });
                })
            },
            addToBookmark() {
                this.$ajax.post(this.$apis.post_supplier_addbookmark, [this.id])
                    .then(res => {
                        this.$message({
                            message: 'success',
                            type: 'success',
                            onClose: (() => {
                                this.$router.push({
                                    path: '/supplier/bookmark',
                                    query: {
                                        id: this.id
                                    }
                                })
                            })
                        });
                    })
                    .catch((res) => {
                        console.log(res)
                    });
            },
            //获取国家
            getCountryAll(){
              this.$ajax.get(this.$apis.GET_COUNTRY_ALL).then(res=>{
                this.country = res
              }).catch(err=>{
                console.log(err)
              });
            },
            //获取币种
            getCurrency(){
              this.$ajax.get(this.$apis.get_currency_all).then(res=>{
                this.currency = res
              }).catch(err=>{
                console.log(err)
              });
            },
            //获取字典
            getCodePart(){
              this.$ajax.post(this.$apis.POST_CODE_PART,["ITM","PMT","CUSTOMER_TYPE","EL_IS","SEX","DOCUMENT_TYPE"]).then(res=>{
                this.payment = _.findWhere(res, {'code': 'PMT'}).codes;
                this.incoterm = _.findWhere(res, {'code': 'ITM'}).codes;
                this.type = _.findWhere(res, {'code': 'CUSTOMER_TYPE'}).codes;
                this.sex = _.findWhere(res, {'code': 'SEX'}).codes;
                this.documentType = _.findWhere(res, {'code': 'DOCUMENT_TYPE'}).codes;
              }).catch(err=>{
                console.log(err)
              });
            },
            //..................获取数据
            get_data() {
                this.loading = true
                this.$ajax.post(this.$apis.post_customerDetail, {
                    id: this.id
                })
                .then(res => {
                    this.code = res.code
                    this.basicDate = res;
                    this.basicDate.filingDate = this.$dateFormat(this.basicDate.filingDate, 'yyyy-mm-dd');
                    let country,type,payment;
                    country = _.findWhere(this.country, {code: this.basicDate.country}) || {};
                    type = _.findWhere(this.type, {code: (this.basicDate.type)+''}) || {};
                    payment = _.findWhere(this.payment, {code: (this.basicDate.payment)+''}) || {};
                    this.basicDate.type = type.name || '';
                    this.basicDate.country = country.name || '';
                    this.basicDate.payment = payment.name || '';

                    this.accounts = this.$getDB(this.$db.supplier.detailTable, res.accounts);
                    this.address = this.$getDB(this.$db.supplier.detailTable, res.address, e => {
                      let country,receiveCountry;
                      country = _.findWhere(this.country, {code: e.country.value}) || {};
                      receiveCountry = _.findWhere(this.country, {code: e.receiveCountry.value}) || {};
                      e.country._value = country.name || '';
                      e.receiveCountry._value = receiveCountry.name || '';
                      const province = e.province.value || '';
                      const city = e.city.value || '';
                      const address = e.address.value || ''
                      const receiveProvince = e.receiveProvince.value || '';
                      const receiveCity = e.receiveCity.value || '';
                      const receiveAddress = e.receiveAddress.value || '';
                      e.companyAddress.value = e.country._value+' '+province+' '+city+' '+address;
                      e.receiverAddress.value = e.receiveCountry._value+' '+receiveProvince+' '+receiveCity+' '+receiveAddress
                      return e;
                    });
                    this.concats = this.$getDB(this.$db.supplier.supplierConcats, res.concats , e => {
                      let gender;
                      gender = _.findWhere(this.sex, {code: e.gender.value+''}) || {};
                      e.gender._value = gender.name || '';
                      return e;
                    });
                    this.documentTypeClone = this.$depthClone(this.documentType)
                    this.documentTypeClone.forEach(v=>{
                      res.documents.forEach(m =>{
                        if (v.code === m.code){
                          v.attachments= m.attachments,
                          v.checked= m.checked,
                          v.code= m.code,
                          v.newId= m.id,
                          v.version= m.version
                        }
                      })
                  });
                    this.loading = false
                })
                .catch((res) => {
                    this.loading = false
                });
            },
            getOrderHistory(){
                this.loading = true;
                this.orderHistoryData.customerCompanyId = Number(this.$route.query.companyId);
                this.$ajax.post(this.$apis.post_supply_supplier_orderHistory,this.orderHistoryData).then(res=>{
                    this.tradeHistory = this.$getDB(this.$db.supplier.orderHistory, res.datas, item =>{
                         _.mapObject(item, val => {
                            val.type === 'textDate' && val.value && (val.value = this.$dateFormat(val.value, 'yyyy-mm-dd'))
                            return val
                        })
                    });
                   this.loading = false
                })
                .catch((res) => {
                    this.loading = false
                    console.log(res)
                });
            },
            getInquiryHistory(){
                this.inquiryHistoryData.companyId = Number(this.$route.query.companyId);
                this.loading = true;
                this.$ajax.post(this.$apis.post_supply_supplier_getInquiryHistory,this.inquiryHistoryData).then(res=>{
                   this.inquiryData = this.$getDB(this.$db.supplier.inquiryHistory, res.datas, item => {
                        _.mapObject(item, val => {
                            val.type === 'textDate' && val.value && (val.value = this.$dateFormat(val.value, 'yyyy-mm-dd'))
                            return val
                        })
                   });
                   this.loading = false
                })
                .catch((res) => {
                    this.loading = false
                    console.log(res)
                });
            },
              /**
           * Attachment操作
           * */
          upload(){
            console.log(this.$refs.uploadAttachment.getFiles())
              //ATTACHMENT,文件 PICTURE 图片
            const uploadParams = {
              id: this.id,
              type: "ATTACHMENT",
              url: this.$refs.uploadAttachment.getFiles()[0]
            };
            const batchUploadParams = {
              id: this.id,
              type: "ATTACHMENT",
              urls: this.$refs.uploadAttachment.getFiles()
            };
            if (this.$refs.uploadAttachment.getFiles().length === 1){
              this.$ajax.post(this.$apis.post_oss_company_upload,uploadParams).then(res=>{
                this.get_data();
                this.$message({
                  message: this.$i.common.uploadedSuccess,
                  type: 'success'
                });
              })

            }else{
              this.$ajax.post(this.$apis.post_oss_company_batchUpload,batchUploadParams).then(res=>{
                this.get_data();
                this.$message({
                  message:  this.$i.common.uploadedSuccess,
                  type: 'success'
                });
              })
            }
          },
          //删除
          deleteCustomer(){
            this.$confirm(this.$i.common.sureDelete, this.$i.common.prompt, {
              confirmButtonText: this.$i.common.sure,
              cancelButtonText: this.$i.common.cancel,
              type: 'warning'
            }).then(() => {
              this.disableClickDeleteBtn = true;
              const params = []
              params.push(this.basicDate.id)
              this.$ajax.post(this.$apis.post_supply_batchDelete, params).then(res => {
                this.disableClickDeleteBtn = false;
                this.$message({
                  type: 'success',
                  message: this.$i.common.deleteTheSuccess,
                  onClose: (() => {
                    this.$router.push({
                      path: '/customer/overview',
                    })
                  })

                });
              }).finally(() => {
                this.disableClickDeleteBtn = false;
              });
            })
          },
          //下载
          downloadCustomer(){
            let ids = [];
            ids.push(this.basicDate.id)
            this.$fetch.export_task('UDATA_SUPPLIER_EXPORT_CUSTOMER_IDS',{ids:ids});

          },
        },
        created() {
          this.get_data();
          this.getCountryAll();
          this.getCodePart();
          this.getCurrency();
        },
      mounted(){
        this.setMenuLink({
            path: 'customerArchive',
            type: 10,
            label: this.$i.common.archive,
            auth:''
          });
      },
    }

</script>

<style scoped>
    .title img {
        max-width: 100px;
        max-height: 100px;
        margin-left: 30px;
    }

    .title {
        display: flex;
        align-items: center;
        margin-top: 20px;
    }

    .title span {
        margin-left: 10px;
    }

    .detail {
        padding-top: 20px;
    }

    .souringDetail {
        background-color: #f4f4f4;
    }

    .souringDetail .head {
        background-color: #FFFFFF;
        padding: 0 20px;

    }

    .souringDetail .head .title {
        position: relative;
        height: 40px;
        line-height: 40px;
        font-weight: bold;
        font-size: 18px;
        color: #666666;
    }

    .souringDetail .head .title .title-btn {
        float: right;
    }

    .souringDetail .head .detail {
        margin-top: 8px;
    }

    .souringDetail .head .detail .carousel-img {
        height: 170px;
    }

    .souringDetail .head .detail .carousel-img img {
        width: 100%;
        height: 100%;
    }

    .souringDetail .head .detail .right {
        /*padding-top: 10px;*/
    }

    .souringDetail .head .detail .list {
        padding-left: 30px;
        font-size: 14px;
        line-height: 2.5;
        /*        border-bottom: 1px dotted #e0e0e0;*/
    }

    .souringDetail .head .detail .btns {
        text-align: center;
        padding: 15px 0;
    }

    .souringDetail .head .detail .btns>Button {
        margin-right: 10px;
    }

    .souringDetail .body {
        margin-top: 10px;
        margin-bottom: 20px;
        background-color: #FFFFFF;
    }

    .souringDetail .body .list {
        line-height: 30px;
        font-size: 13px;
    }

    .speForm .el-form-item--small.el-form-item {
        margin-bottom: 0;
    }

    .speForm .el-row .list .el-input {
        width: 80%;
    }
    .attachment{
      max-height: 300px;
      max-width: 100%;
      overflow-y: scroll;
      overflow-x: auto;
      border: 1px solid #ebeef5;
    }
    .attachment div{
      text-align: center;
      color: #999999;
      height: 200px;
      line-height: 200px;
    }
    .documentBoxCon{
      overflow: hidden;
    }
    .documentBoxCon1{
      width: 18%;
      float: left;
    }
    .uploadBox{
      padding-top: 10px;
    }

</style>
