<template>
    <div class="souringDetail">
        <div class="head">
            <div class="title">
                <img :src='basicDate.logo'/> 
                <span>{{basicDate.name}}</span>
            </div>
            <div class="detail">             
                 <el-form  label-width="190px">          
                    <el-row>             
                        <el-row class="right">
                            <el-col class="list" :xs="24" :sm="12" :md="8" :lg="8" :xl="8"
                                   v-for='(item,index) in $db.supplier.detail'
                                   :key='index'
                                   >                         
                                    <el-form-item label-width="260px" :prop="item.key" :label="item.label+' :'">
                                       {{basicDate[item.key]}}
                                    </el-form-item>
                            </el-col>                          
                        </el-row>

                </el-row>
                  </el-form>
                <div class="btns" v-if="noEdit">
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
                    <el-form label-width="200px" :model="documents">
                    <el-row>
                      <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10">
                        <el-form-item  :label="$i.setting.documentRequired +':'">
                            <span>{{documents.document}}</span>
                        </el-form-item>
                        <el-form-item :label="$i.setting.factoryInspectionReport +':'">
                            <span>{{documents.aduitDetails}}</span>
                        </el-form-item>
                        <el-form-item  :label="$i.setting.packingList +':'">
                            <span>{{documents.packingList}}</span>
                        </el-form-item>
                        <el-form-item :label="$i.setting.invoice +':'">
                            <span>{{documents.invoice}}</span>
                        </el-form-item>
                        <el-form-item :label="$i.setting.examiningReport +':'">
                            <span>{{documents.examiningReport}}</span>
                        </el-form-item>
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

                <el-tab-pane label="attachment" name="attchment">
                    <!-- <div class="section-btn" style="margin-bottom:10px;">
                      <el-button  @click="upload" type="primary">{{$i.button.upload}}</el-button>
                    </div> -->
                    <v-upload ref="uploadAttachment" :limit="20"  readonly/>
                </el-tab-pane>

                 <el-tab-pane :label="$i.supplier.remark" name="remark">
                    <div class="section-btn">
                    <el-button  @click="createRemark"   type="primary">{{$i.button.add}}</el-button>
                    </div>
                  <v-table
                    :data="remarkData"
                    style='marginTop:10px'
                    :buttons="[{label: 'Modify', type: 2},{label: 'Delete', type: 3}]"
                    @action="remarkAction"
                    :selection="false"/>
                </el-tab-pane>

            </el-tabs>
        </div>
        <el-dialog :title="$i.supplier.addRemark" :visible.sync="addRemarkFormVisible" center width="600px">
            <el-form :model="addRemarkData">
              <el-form-item :label="$i.supplier.remark" :label-width="formLabelWidth">
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
    import VCompareList from '../product/compareList'
    import VAttachment from './attachment'
    import {
        VTable,VUpload
    } from '@/components/index';

    export default {
        name: "customerDetail",
        components: {
            VTable,
            VCompareList,
            VAttachment,
            VUpload
        },
        data() {
            return {
                noEdit: true,
                id:Number(this.$route.query.id),
                tabName: 'address', //默认打开的tab
                basicDate: [],
                accounts: [],
                concats: [],
                address: [],
                document:[],
                tradeHistory:[],
                remarkData: [],
                inquiryData:[],
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
                documents:{
                   aduitDetails:null,
                   document:null,
                   examiningReport:null,
                   invoice:null,
                   packingList:null

                },
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
            }
        },
        methods: {
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
                        message: '修改成功',
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
                        message: '添加成功',
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
                this.$confirm('确定删除该备注?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$ajax.post(this.$apis.post_deleteCustomerRemark,{id:e.id.value}).then(res=>{
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
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
            //..................获取数据
            get_data() {
                this.loading = true
                this.$ajax.post(this.$apis.post_customerDetail, {
                    id: this.id
                })
                .then(res => {
                    this.code = res.code
                    this.basicDate = res;
                    this.accounts = this.$getDB(this.$db.supplier.detailTable, res.accounts);                    
                    this.address = this.$getDB(this.$db.supplier.detailTable, res.address);                   
                    this.concats = this.$getDB(this.$db.supplier.detailTable, res.concats);
                    if(res.documents[0]){
                        this.documents = res.documents[0];
                    }                    
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
                    this.tradeHistory = this.$getDB(this.$db.supplier.detailTable, res.datas, item =>{
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
                   this.inquiryData = this.$getDB(this.$db.supplier.detailTable, res.datas, item => {
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
                  message: '上传成功',
                  type: 'success'
                });
              })

            }else{
              this.$ajax.post(this.$apis.post_oss_company_batchUpload,batchUploadParams).then(res=>{
                this.get_data();
                this.$message({
                  message: '上传成功',
                  type: 'success'
                });
              })
            }
          },
        },       
        created() {
             this.get_data();
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

    /*
    .attchment {
        display: flex;
        justify-content: flex-start;
        height: 400px;
    }

    .attchment_item {
        width: 180px;
        height: 60px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border: 1px solid #BEBEBE;
        border-radius: 3px;
        margin-left: 20px;
    }

    .attchment_item_content {
        width: 180px;
        display: flex;
        justify-content: center;
        align-items: baseline;
    }

    .attchment_item p {
        font-size: 14px;
        padding-left: 5px;
        padding-right: 5px;
    }

    .attchment_item i {
        font-size: 40px;
    }
*/

</style>
