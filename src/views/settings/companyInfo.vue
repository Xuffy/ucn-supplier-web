<template>
    <div class="company-info">
        <div class="title">
            <span><span style="color:red;font-weight: bold"></span>{{$i.setting.companyInfo}}</span>
        </div>
        <div class="summary">
            <el-form ref="summary" :model="companyInfo" :rules="companyInfoRules" label-width="190px">
                <el-row class="speZone">
                    <el-col :class="{speCol:v.key!=='description'}" v-if="v.belong==='summary'" v-for="v in $db.setting.companyInfo" :key="v.key" :xs="24" :sm="v.fullLine?24:12" :md="v.fullLine?24:12" :lg="v.fullLine?24:8" :xl="v.fullLine?24:8">
                        <el-form-item class="speWidth" :prop="v.key"  :label="v.label">
                            <div v-if="v.type==='input'">
                                <el-input
                                        :disabled="v.key==='code' ? true :summaryDisabled"
                                        size="mini"
                                        placeholder="请输入内容"
                                        v-model="companyInfo[v.key]">
                                </el-input>
                            </div>
                            <div v-if="v.type==='select'">
                                <el-select :disabled="summaryDisabled" class="speWidth" v-model="companyInfo[v.key]" placeholder="请选择">
                                    <el-option
                                            size="mini"
                                            v-for="item in options[v.key]"
                                            :key="item.code"
                                            :label="item.name"
                                            :value="item.typeCode === 'EL_IS' ? !!parseInt(item.code) : Number(item.code) || item.code">
                                    </el-option>
                                </el-select>
                            </div>
                            <div v-if="v.type==='textarea'">
                                <el-input
                                        :disabled="summaryDisabled"
                                        class="speWidth"
                                        type="textarea"
                                        autosize
                                        placeholder="请输入内容"
                                        v-model="companyInfo[v.key]">
                                </el-input>
                            </div>
                            <div v-if="v.type==='function'">
                                <v-upload 
                                ref="uploadFile" 
                                only-image
                                oss-private 
                                :list="companyInfo.logo"
                                :readonly="summaryDisabled"/>
                            </div>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div class="summary-btn">
                <div v-if="summaryDisabled">
                    <el-button @click="modifySummary">{{$i.common.modify}}</el-button>
                </div>
                <div v-else>
                    <el-button :loading="allowModifySummary" @click="saveModifySummary" type="primary">保存</el-button>
                    <el-button @click="cancelModifySummary">取消</el-button>
                </div>
            </div>
        </div>
        <div class="section">
            <el-tabs type="border-card">
                <el-tab-pane :label="$i.setting.address">
                    <div class="section-btn">
                        <el-button @click="addAddress" type="primary">{{$i.button.add}}</el-button>
                    </div>

                   <div>
                        <v-table
                        :data="addressDatas"
                        :height="500"
                        :buttons="[{label: 'modify', type: 1},{label: 'delete', type: 2}]"
                        @action="btnAddressClick"
                        />
                    </div>
                </el-tab-pane>
                <el-tab-pane :label="$i.setting.accountInfo">
                    <div class="section-btn">
                        <el-button @click="addAccount" type="primary">{{$i.button.add}}</el-button>
                    </div>
                    <div class="main">
                        <div>
                            <v-table
                            :data="accountsData"
                            :height="500"
                            :buttons="[{label: 'modify', type: 1},{label: 'delete', type: 2}]"
                            @action="btnClick"
                            />
                        </div>
                    </div>
                </el-tab-pane>

                <el-tab-pane :label="$i.setting.contactInfo">
                    <div class="section-btn">
                        <el-button @click="addContact" type="primary">{{$i.button.add}}</el-button>
                    </div>
                    <div class="main">
                        <div>
                            <v-table
                            :data="contactDatas"
                            :height="500"
                            :buttons="[{label: 'modify', type: 1},{label: 'delete', type: 2}]"
                            @action="btnContactClick"
                            />
                        </div>
                    </div>
                </el-tab-pane>

                <el-tab-pane :label="$i.setting.attachment">
                  <div class="section-btn">
                    <el-button @click="upload" type="primary" >{{$i.button.save}}</el-button>
                  </div>
                  <v-upload ref="uploadAttachment" :limit="20" oss-private  :list="companyInfo.attachments"/>
                </el-tab-pane>
            </el-tabs>
        </div>

        <el-dialog width="70%" :title="$i.setting.address" :visible.sync="addressDialogVisible">
            <el-form label-width="200px" :model="addressData">
                <el-row>
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                    <el-form-item  :label="$i.setting.factoryName">
                      <el-input size="mini" v-model="addressData.name" placeholder="请输入内容" required="required"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                  <el-form-item  :label="$i.setting.factoryAddress">
                     <el-input size="mini" v-model="addressData.address" placeholder="请输入内容" required="required"></el-input>
                  </el-form-item>
                </el-col>
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                    <el-form-item  :label="$i.setting.exportPort">
                      <el-input size="mini" v-model="addressData.exportPort" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                    <el-form-item  :label="$i.setting.ContacctPerson1">
                      <el-input size="mini" v-model="addressData.contactPerson1" placeholder="请输入内容" required="required"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                    <el-form-item  :label="$i.setting.contactPhoneNo1">
                      <el-input size="mini" v-model="addressData.concatPhone1" placeholder="请输入内容" required="required"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                    <el-form-item  :label="$i.setting.contacctPerson2">
                        <el-input size="mini" v-model="addressData.contactPerson2" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                    <el-form-item  :label="$i.setting.contactPhoneNo2">
                      <el-input size="mini" v-model="addressData.contactPhone2" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addressDialogVisible=false">取 消</el-button>
                <el-button :loading="allowAddAddress" type="primary" @click="sureAddAddress">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog width="70%" :title="$i.setting.accountInfo" :visible.sync="accountDialogVisible">
            <el-form label-width="200px" :model="accountData">
                <el-row>
                    <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                        <el-form-item  :label="$i.setting.beneficiaryName">
                            <el-input size="mini" v-model="accountData.beneficiaryName" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                        <el-form-item  :label="$i.setting.beneficiaryAccount">
                            <el-input size="mini" v-model="accountData.beneficiaryAccount" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                        <el-form-item  :label="$i.setting.beneficiaryAddress">
                            <el-input size="mini" v-model="accountData.beneficiaryAddress" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                        <el-form-item  :label="$i.setting.beneficiaryBankName">
                            <el-input size="mini" v-model="accountData.beneficiaryBankName" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                        <el-form-item  :label="$i.setting.beneficiaryBankSWIFT">
                            <el-input size="mini" v-model="accountData.beneficiaryBankSwift" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                    <el-form-item  :label="$i.setting.accountType">
                      <el-input size="mini" v-model="accountData.accountType" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                    <el-form-item  :label="$i.setting.currency">
                      <el-select  v-model="accountData.currency" placeholder="请选择"  style="width: 230px;">
                        <el-option
                          v-for="item in options.currency"
                          :key="item.code"
                          :label="item.name"
                          :value="item.code">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="accountDialogVisible=false">取 消</el-button>
                <el-button :loading="allowAddAccount" type="primary" @click="sureAddAccount">确 定</el-button>
            </div>
        </el-dialog>

      <el-dialog width="70%" :title="$i.setting.accountInfo" :visible.sync="contactDialogVisible">
        <el-form label-width="200px" :model="contactData">
          <el-row>
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
              <el-form-item  :label="$i.setting.name">
                <el-input size="mini" v-model="contactData.name" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
              <el-form-item :label="$i.setting.department">
                <el-input size="mini" v-model="contactData.deptId" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <el-form-item  :label="$i.setting.gender">
                  <el-select v-model="contactData.gender" placeholder="please input" style="width: 230px">
                    <el-option
                      v-for="item in genderOptions"
                      :key="item.key"
                      :label="item.label"
                      :value="item.key"
                      style="width: 230px">
                    </el-option>
                  </el-select>
                </el-form-item>
            </el-col>
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <el-form-item  :label="$i.setting.mobileNumber">
                  <el-input size="mini" v-model="contactData.cellphone" placeholder="请输入内容"></el-input>
                </el-form-item>
            </el-col>
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <el-form-item  :label="$i.setting.telNumber">
                  <el-input size="mini" v-model="contactData.telphone" placeholder="请输入内容"></el-input>
                </el-form-item>
            </el-col>
             <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <el-form-item  :label="$i.setting.faxNumber">
                  <el-input size="mini" v-model="contactData.fax" placeholder="请输入内容"></el-input>
                </el-form-item>
            </el-col>
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <el-form-item  :label="$i.setting.emailAddress">
                  <el-input size="mini" v-model="contactData.email" placeholder="请输入内容"></el-input>
                </el-form-item>
            </el-col>
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <el-form-item  :label="$i.setting.skype">
                    <el-input size="mini" v-model="contactData.skype" placeholder="请输入内容"></el-input>
                </el-form-item>
            </el-col>
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <el-form-item  :label="$i.setting.QQ">
                    <el-input size="mini" v-model="contactData.qq" placeholder="请输入内容"></el-input>
                </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="contactDialogVisible=false">取 消</el-button>
          <el-button :loading="allowAddAccount" type="primary" @click="sureAddContact">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
    import { VTable,VUpload} from '@/components/index'
    export default {
        name: "companyInfo",
        components:{
          VTable,
          VUpload
        },
        data(){
            return{
                summaryDisabled:true,
                addressDialogVisible:false,
                accountDialogVisible:false,
                contactDialogVisible:false,
                genderOptions:[{
                  value: '男',
                  label: 'Male',
                  key: 1
                }, {
                  value: '女',
                  label: 'Female',
                  key: 0
                }, {
                  value: '未知',
                  label: 'Unknown',
                  key: 2
                }],
                //页面page绑定
                companyInfo:{
                    city: '',
                    country:'',
                    currency: '',
                    description: "",
                    exportLicense:"",
                    id: '',
                    incoterm: '',
                    logo: "",
                    name: "",
                    payment: '',
                    shortName: "",
                    version:'',
                },
                accountsData:[],
                contactDatas:[],
                addressDatas:[],
                cloneData:{},                   //用于克隆存储的对象
                //验证规则
                companyInfoRules:{

                },
                //弹出框data
                addressData:{
                    address: "",
                    companyId: "",
                    concatPhone1: "",
                    contactPerson1: "",
                    contactPerson2: "",
                    contactPhone2: "",
                    exportPort:"",
                    id: "",
                    name: "",
                    ownerId: "",
                    status: "",
                    supplierId: "",
                    tenantId: "",
                    version: "",
                },
                contactData:{
                  cellphone: "",
                  customerId: "",
                  deptId: "",
                  deptName: "",
                  email: "",
                  fax: "",
                  gender: "",
                  id: "",
                  name: "",
                  position: "",
                  qq: "",
                  skype: "",
                  status: "",
                  telphone: "",
                  version: ""
                },
              accountData:{
                    accountType: "",
                    beneficiaryAccount: "",
                    beneficiaryAddress: "",
                    beneficiaryBankName: "",
                    beneficiaryBankSwift: "",
                    beneficiaryName: "",
                    currency: "",
                    id: "",
                    supplierId: "",
                    version: ""
                },
               logoParmas:{
                id: '',
                type: 'PICTURE',
                url: ''
              },
                //btn loading状态
                allowAddAddress:false,
                allowAddAccount:false,
                allowAddContact:false,
                allowModifySummary:false,           //顶部保存按钮
                //是否正在修改地址标识，因为新增和修改都是用的同一个按钮，所以为了区分增加一个标识
                isModifyAddress:false,
                isModifyAccount:false,
                isModifyContact:false,
                options:{},
                department:[],
                currencyList:[]
            }
        },
        methods:{
            //获取整个页面数据
            getWholeData(){
                this.$ajax.get(this.$apis.get_supplierWhile).then(res=>{
                    // this.addressData contactData
                     this.accountsData = this.$getDB(this.$db.setting.supplierAccount, res.accounts);
                     this.contactDatas = this.$getDB(this.$db.setting.supplierContact, res.concats);
                     this.addressDatas = this.$getDB(this.$db.setting.supplierAddress, res.address);
                     res.exportLicense ? res.exportLicense = 'YES' : res.exportLicense = 'NO'
                     this.companyInfo=res;
                }).catch(err=>{
                    console.log(err)
                });
            },
          //获取币种
          getCurrency(){
              this.$ajax.get(this.$apis.get_currency_all).then(res=>{
                  this.options.currency = res
              }).catch(err=>{
                console.log(err)
              });
          },
          //获取字典
          getCodePart(){
            this.$ajax.post(this.$apis.POST_CODE_PART,["ITM","PMT","CUSTOMER_TYPE","EL_IS"]).then(res=>{
              this.options.payment = _.findWhere(res, {'code': 'PMT'}).codes;
              this.options.incoterm = _.findWhere(res, {'code': 'ITM'}).codes;
              this.options.type = _.findWhere(res, {'code': 'CUSTOMER_TYPE'}).codes;
              this.options.exportLicense = _.findWhere(res, {'code': 'EL_IS'}).codes;
            }).catch(err=>{
              console.log(err)
            });
          },
          //获取国家
          getCountryAll(){
            this.$ajax.get(this.$apis.GET_COUNTRY_ALL).then(res=>{
              this.options.country = res
            }).catch(err=>{
              console.log(err)
            });
          },
          //获取部门列表
          getDepartment(){
            this.$ajax.get(this.$apis.GET_DEPARTMENT).then(res=>{
              this.department = res
            }).catch(err=>{
              console.log(err)
            });
          },

          //修改顶部简介信息
            modifySummary(){
                this.summaryDisabled=false;
                this.cloneData=Object.assign({},this.companyInfo);
            },
            saveModifySummary(){
               if( this.companyInfo.exportLicense ==='yes'){
                    this.companyInfo.exportLicense = true;
               }else{
                    this.companyInfo.exportLicense = false;
               }
               let params={
                    city: this.companyInfo.city,
                    country: this.companyInfo.country,
                    currency: this.companyInfo.currency,
                    description:this.companyInfo.description,
                    exportLicense: this.companyInfo.exportLicense, //1 true
                    id:this.companyInfo.id,
                    incoterm: this.companyInfo.incoterm,
                    logo:'',
                    name: this.companyInfo.name,
                    payment: this.companyInfo.payment,
                    shortName: this.companyInfo.shortName,
                    version: this.companyInfo.version
                };
                this.allowModifySummary=true;
                this.$ajax.post(`${this.$apis.post_supplierWhile}/${this.companyInfo.id}`,params).then(res=>{
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                    this.getWholeData()
                    this.allowModifySummary=false;
                    this.summaryDisabled=true;
                }).catch(err=>{
                    this.getWholeData()
                    this.allowModifySummary=false;
                    this.summaryDisabled=true;
                });
                  //logo上传
                this.logoParmas.id = this.companyInfo.id;
                this.logoParmas.url = this.$refs.uploadFile[0].getFiles()[0]
                this.$ajax.post(this.$apis.post_oss_company_upload,this.logoParmas).then(res=>{
                    this.getWholeData();
                })
            },
            cancelModifySummary(){
                this.companyInfo=Object.assign({},this.cloneData);
                this.summaryDisabled=true;
            },


            /**
             * address操作
             * */
            addAddress(){
                this.addressDialogVisible=true;
            },
            btnAddressClick(item, type){
                 switch(type) {
                    case 1:
                      this.modifyAddress(item);
                      break;
                    case 2:
                        this.deleteAddress(item);
                        break;
                }
            },
            sureAddAddress(){
                this.allowAddAddress=true;
                this.addressData.supplierId=this.companyInfo.id;
                if(this.isModifyAddress){
                    //表示是在修改地址
                    this.$ajax.post(`${this.$apis.post_supplier_address_id}/${this.addressData.id}`,this.addressData).then(res=>{
                        this.allowAddAddress=false;
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                        this.getWholeData();
                        this.addressDialogVisible=false;
                    }).catch(err=>{
                        this.allowAddAddress=false;
                    });
                }else{
                    //表示是在新增地址
                    this.$ajax.post(this.$apis.post_supplier_address,this.addressData).then(res=>{
                        this.allowAddAddress=false;
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                        this.getWholeData();
                        this.addressDialogVisible=false;
                    }).catch(err=>{
                        this.allowAddAddress=false;
                        this.$message({
                            message: err,
                            type: 'success'
                        });
                        this.addressDialogVisible=false;
                    });
                }
            },
            modifyAddress(e){
                var result = {}
                for(const i in e){
                    result[e[i].key]= e[i].value
                }
                this.isModifyAddress=true;      //标识正在修改地址
                this.addressData=Object.assign({}, result);
                this.addressDialogVisible=true;
            },
            deleteAddress(e){
                this.$confirm('确定删除该地址?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$ajax.post(this.$apis.post_supplier_delAddress,{id:e.id.value}).then(res=>{
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getWholeData();
                    }).catch(err=>{
                        console.log(err)
                    });
                }).catch(() => {

                });
            },

            /**
             * Account操作
             * */
            btnClick(item, type){
                 switch(type) {
                    case 1:
                      this.modifyAccount(item);
                      break;
                    case 2:
                        this.deleteAccount(item);
                        break;
                }
            },
            addAccount(){
                this.accountDialogVisible=true;
            },
            sureAddAccount(){
                this.allowAddContact=true;
                this.accountData.supplierId=this.companyInfo.id;

                if(this.isModifyContact){
                    //表示是在修改account
                    this.$ajax.post(`${this.$apis.post_supplier_account_id}/${this.accountData.id}`,this.accountData).then(res=>{
                        this.allowAddContact=false;
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                        this.getWholeData();
                        this.accountDialogVisible=false;
                    }).catch(err=>{
                        this.allowAddContact=false;
                        this.accountDialogVisible=false;
                    });
                }
                else{
                    //表示是在新增account
                    this.$ajax.post(this.$apis.post_supplier_account,this.accountData).then(res=>{
                        this.allowAddContact=false;
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                        this.getWholeData();
                        this.accountDialogVisible=false;
                    }).catch(err=>{
                        this.allowAddContact=false;
                        this.$message({
                            message: err,
                            type: 'success'
                        });
                        this.accountDialogVisible=false;
                    });
                }
            },
            modifyAccount(e){
               var result = {}
                for(const i in e){
                    result[e[i].key]= e[i].value
                }
                this.isModifyContact=true;      //标识正在修改contact
                this.accountData=Object.assign({}, result);
                this.accountDialogVisible=true;
            },
            deleteAccount(e){
                this.$confirm('确定删除该账户信息?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$ajax.post(this.$apis.post_supplier_delAccount,{id:e.id.value}).then(res=>{
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getWholeData();
                    }).catch(err=>{
                        console.log(err)
                    });
                }).catch(() => {

                });
            },
              /**
             * contact操作
             * */
            addContact(){
                this.contactDialogVisible=true;
            },
            btnContactClick(item, type){
                 switch(type) {
                    case 1:
                      this.modifyContact(item);
                      break;
                    case 2:
                        this.deleteContact(item);
                        break;
                }
            },
            sureAddContact(){
                this.allowAddContact=true;
                this.contactData.supplierId=this.companyInfo.id;
                if(this.isModifyContact){
                    //表示是在修改account
                    this.$ajax.post(`${this.$apis.post_supplier_contact_id}/${this.contactData.id}`,this.contactData).then(res=>{
                        this.allowAddContact=false;
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                        this.getWholeData();
                        this.contactDialogVisible=false;
                    }).catch(err=>{
                        this.allowAddContact=false;
                        this.contactDialogVisible=false;
                    });
                }
                else{
                    //表示是在新增account
                    this.$ajax.post(this.$apis.post_supplier_contact,this.contactData).then(res=>{
                        this.allowAddContact=false;
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                        this.getWholeData();
                        this.contactDialogVisible=false;
                    }).catch(err=>{
                        this.allowAddContact=false;
                        this.$message({
                            message: err,
                            type: 'success'
                        });
                        this.contactDialogVisible=false;
                    });
                }
            },
            modifyContact(e){
                var result = {}
                for(const i in e){
                    result[e[i].key]= e[i].value
                }
                this.isModifyContact=true;      //标识正在修改contact
                this.contactData=Object.assign({}, result);
                this.contactDialogVisible=true;
            },
            deleteContact(e){
                this.$confirm('确定删除该联系人?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$ajax.post(this.$apis.post_supplier_delContact,{id:e.id.value}).then(res=>{
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getWholeData();
                    }).catch(err=>{
                        console.log(err)
                    });
                }).catch(() => {

                });
            },
             /**
           * logo操作
           * */
          uploadLogo(){
            

          },
           /**
           * Attachment操作
           * */
          upload(){
              //ATTACHMENT,文件 PICTURE 图片
            const uploadParams = {
              id: this.companyInfo.id,
              type: "ATTACHMENT",
              url: this.$refs.uploadAttachment.getFiles()[0]
            };
            const batchUploadParams = {
              id: this.companyInfo.id,
              type: "ATTACHMENT",
              urls: this.$refs.uploadAttachment.getFiles()
            };
            if (this.$refs.uploadAttachment.getFiles().length === 1){
              this.$ajax.post(this.$apis.post_oss_company_upload,uploadParams).then(res=>{
                this.getWholeData();
                this.$message({
                  message: '上传成功',
                  type: 'success'
                });
              })

            }else{
              this.$ajax.post(this.$apis.post_oss_company_batchUpload,batchUploadParams).then(res=>{
                this.getWholeData();
                this.$message({
                  message: '上传成功',
                  type: 'success'
                });
              })
            }
          },
        },
        created(){
            // this.supplierWhole();

               this.getCurrency();
               this.getCountryAll();
               this.getDepartment();
               this.getWholeData();
               this.getCodePart();
            // console.log(this.$db,'db')
        },
        watch:{
            addressDialogVisible(n){
                if(!n){
                    _.map(this.addressData,(v,k)=>{
                        this.$set(this.addressData,k,'');
                    });
                    this.isModifyAddress=false;
                }
            },
            accountDialogVisible(n){
                if(!n){
                    _.map(this.accountData,(v,k)=>{
                        this.$set(this.accountData,k,'');
                    });
                    this.isModifyAccount=false;
                }
            },
            contactDialogVisible(n){
                if(!n){
                    _.map(this.contactData,(v,k)=>{
                        this.$set(this.contactData,k,'');
                    });
                    this.isModifyContact=false;
                }
            },
        }
    }
</script>

<style scoped>
    .title{
        font-weight: bold;
        font-size: 18px;
        height: 32px;
        line-height: 32px;
        color:#666666;
    }
    .speCol{
        height: 51px;
    }
    .speWidth{
        width: 100%;
    }
    .summary-btn{
        text-align: center;
        padding-top: 10px;
    }
    .section-btn{
        margin-bottom: 10px;
    }

    .section{
        margin-top: 20px;
    }
    .logo{
      width: 48px;
      height: 48px;
      float: left;
      margin-left: 15px;
      border: 1px solid #cccccc;
      border-radius: 10%;
    }
    /*表格样式调整*/
    /*.companyInfo >>> .el-table__header-wrapper>table{*/
    /*width: 100% !important;*/
    /*}*/
    /*.companyInfo >>> .el-table__header-wrapper>table thead tr th{*/
    /*width: 12.5% !important;*/
    /*}*/

    /*弹出框样式*/
    .dialog-footer{
        text-align: center;
    }

</style>
