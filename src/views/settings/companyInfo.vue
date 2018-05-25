<template>
    <div class="company-info">
        <div class="title">
            <span><span style="color:red;font-weight: bold"></span>{{$i.setting.companyInfo}}</span>
        </div>
        <div class="summary">
            <el-form ref="summary" :model="companyInfo" :rules="companyInfoRules" label-width="190px">
                <!-- <v-upload ref="uploadFile"/> -->
                <el-row class="speZone">
                    <el-col :class="{speCol:v.key!=='description'}" v-if="v.belong==='summary'" v-for="v in $db.setting.companyInfo" :key="v.key" :xs="24" :sm="v.fullLine?24:12" :md="v.fullLine?24:12" :lg="v.fullLine?24:8" :xl="v.fullLine?24:8">
                        <el-form-item class="speWidth" :prop="v.key" :label="v.label">
                            <div v-if="v.type==='input'">
                                <el-input
                                        :disabled="v.key==='code'?true:summaryDisabled"
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
                                            :value="item.code">
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
                    <el-table
                            v-if="companyInfo.address.length"
                            :data="companyInfo.address"
                            border
                            style="width: 100%">
                        <el-table-column
                                prop="orderNo"
                                align="center"
                                :label="$i.setting.orderNumber">
                        </el-table-column>
                        <el-table-column
                          prop="country"
                          align="center"
                          :label="$i.setting.country">
                        </el-table-column>
                        <el-table-column
                          prop="province"
                          align="center"
                          :label="$i.setting.province">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                :label="$i.setting.action">
                            <template slot-scope="scope">
                                <el-button @click="modifyAddreess(scope.row)" type="text">{{$i.button.modify}}</el-button>
                                <el-button @click="deleteAddress(scope.row)" type="text">{{$i.button.delete}}</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane :label="$i.setting.contactInfo">
                    <div class="section-btn">
                        <el-button @click="addContact" type="primary">{{$i.button.add}}</el-button>
                    </div>
                    <el-table
                            v-if="companyInfo.concats.length"
                            :data="companyInfo.concats"
                            border
                            style="width: 100%">
                        <el-table-column
                                prop="name"
                                align="center"
                                :label="$i.setting.name">
                        </el-table-column>
                        <el-table-column
                                prop="deptName"
                                align="center"
                                :label="$i.setting.department">
                        </el-table-column>
                        <el-table-column
                                prop="gender"
                                align="center"
                                :label="$i.setting.gender">
                        </el-table-column>
                        <el-table-column
                                prop="cellphone"
                                align="center"
                                :label="$i.setting.mobileNumber">
                        </el-table-column>
                        <el-table-column
                                prop="telphone"
                                align="center"
                                :label="$i.setting.telNumber">
                        </el-table-column>
                        <el-table-column
                                prop="fax"
                                align="center"
                                :label="$i.setting.faxNumber">
                        </el-table-column>
                        <el-table-column
                                prop="email"
                                align="center"
                                :label="$i.setting.emailAddress">
                        </el-table-column>
                        <el-table-column
                          prop="skype"
                          align="center"
                          :label="$i.setting.skype">
                        </el-table-column>
                        <el-table-column
                          prop="qq"
                          align="center"
                          :label="$i.setting.qq">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                :label="$i.setting.action">
                            <template slot-scope="scope">
                                <el-button @click="modifyContact(scope.row)" type="text">{{$i.button.modify}}</el-button>
                                <el-button @click="deleteContact(scope.row)" type="text">{{$i.button.delete}}</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>

                <el-tab-pane :label="$i.setting.documentRequired">
                    <div class="section-btn">
                        <el-button @click="addDocument(documentData)" type="primary">{{$i.button.modify}}</el-button>
                    </div>
                  <el-form label-width="200px" :model="documentData">
                    <el-row>
                      <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10">
                        <el-form-item  :label="$i.setting.documentRequired">
                          <el-input size="mini" v-model="documentData.document"  placeholder="请输入内容"></el-input>
                        </el-form-item>
                        <el-form-item :label="$i.setting.factoryInspectionReport">
                          <el-input size="mini" v-model="documentData.aduitDetails" placeholder="请输入内容"></el-input>
                        </el-form-item>
                        <el-form-item  :label="$i.setting.packingList">
                          <el-input size="mini"  v-model="documentData.packingList" placeholder="请输入内容"></el-input>
                        </el-form-item>
                        <el-form-item :label="$i.setting.invoice">
                          <el-input size="mini" v-model="documentData.invoice" placeholder="请输入内容"></el-input>
                        </el-form-item>
                        <el-form-item :label="$i.setting.examiningReport">
                          <el-input size="mini" v-model="documentData.examiningReport" placeholder="请输入内容"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-form>
                </el-tab-pane>

                <el-tab-pane :label="$i.setting.attachment">
                  <div class="section-btn">
                    <el-button @click="upload" type="primary">{{$i.button.upload}}</el-button>
                  </div>
                  <!-- <v-upload></v-upload> -->
                </el-tab-pane>
            </el-tabs>
        </div>

        <el-dialog width="70%" :title="$i.setting.address" :visible.sync="addressDialogVisible">
            <el-form label-width="150px" :model="addressData">
                <el-row>
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                    <el-form-item prop="orderNo" :label="$i.setting.orderNumber">
                      <el-input size="mini" v-model="addressData.orderNo" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                  <el-form-item prop="country" :label="$i.setting.country">
                    <el-select  v-model="addressData.country" placeholder="请选择"  style="width: 285px;">
                      <el-option
                        v-for="item in options.country"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                    <el-form-item prop="province" :label="$i.setting.province">
                      <el-input size="mini" v-model="addressData.province" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                    <el-form-item prop="city" :label="$i.setting.city">
                      <el-input size="mini" v-model="addressData.city" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                    <el-form-item prop="address" :label="$i.setting.companyAddress">
                      <el-input size="mini" v-model="addressData.address" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                    <el-form-item prop="receiveCountry" :label="$i.setting.receiveCountry">
                        <el-select  v-model="addressData.receiveCountry" placeholder="请选择"  style="width: 285px;">
                          <el-option
                            v-for="item in options.country"
                            :key="item.code"
                            :label="item.name"
                            :value="item.code">
                          </el-option>
                        </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                    <el-form-item prop="receiveProvince" :label="$i.setting.receiveProvince">
                      <el-input size="mini" v-model="addressData.receiveProvince" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                    <el-form-item prop="receiveCity" :label="$i.setting.receiveCity">
                      <el-input size="mini" v-model="addressData.receiveCity" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                    <el-form-item prop="receiveAddress" :label="$i.setting.receiverAddress">
                      <el-input size="mini" v-model="addressData.receiveAddress" placeholder="请输入内容"></el-input>
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
            <el-form label-width="150px" :model="contactData">
                <el-row>
                    <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                        <el-form-item prop="name" :label="$i.setting.name">
                            <el-input size="mini" v-model="contactData.name" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                      <el-form-item prop="deptId" :label="$i.setting.department">
                        <el-select  v-model="contactData.deptId" placeholder="请选择"  style="width: 285px;">
                          <el-option
                            v-for="item in department"
                            :key="item.code"
                            :label="item.name"
                            :value="item.code">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                        <el-form-item prop="gender" :label="$i.setting.gender">
                          <el-select  v-model="contactData.gender" placeholder="请选择"  style="width: 285px;">
                            <el-option
                              v-for="item in options.country"
                              :key="item.code"
                              :label="item.name"
                              :value="item.code">
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-col>
                    <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                        <el-form-item prop="cellphone" :label="$i.setting.mobileNumber">
                            <el-input size="mini" v-model="contactData.cellphone" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                        <el-form-item prop="telphone" :label="$i.setting.telNumber">
                            <el-input size="mini" v-model="contactData.telphone" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                        <el-form-item prop="fax" :label="$i.setting.faxNumber">
                            <el-input size="mini" v-model="contactData.fax" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                        <el-form-item prop="email" :label="$i.setting.emailAddress">
                            <el-input size="mini" v-model="contactData.email" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                    <el-form-item prop="skype" :label="$i.setting.skype">
                      <el-input size="mini" v-model="contactData.skype" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                    <el-form-item prop="qq" :label="$i.setting.qq">
                      <el-input size="mini" v-model="contactData.qq" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="accountDialogVisible=false">取 消</el-button>
                <el-button :loading="allowAddAccount" type="primary" @click="sureAddContact">确 定</el-button>
            </div>
        </el-dialog>

      <el-dialog width="70%" :title="$i.setting.accountInfo" :visible.sync="documentDialogVisible">
        <el-form label-width="200px" :model="documentData">
          <el-row>
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
              <el-form-item  :label="$i.setting.documentRequired">
                <el-input size="mini" v-model="documentData.document" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
              <el-form-item :label="$i.setting.factoryInspectionReport">
                <el-input size="mini" v-model="documentData.aduitDetails" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <el-form-item  :label="$i.setting.packingList">
                  <el-input size="mini" v-model="documentData.packingList" placeholder="请输入内容"></el-input>
                </el-form-item>
            </el-col>
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <el-form-item  :label="$i.setting.invoice">
                  <el-input size="mini" v-model="documentData.invoice" placeholder="请输入内容"></el-input>
                </el-form-item>
            </el-col>
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <el-form-item  :label="$i.setting.examiningReport">
                  <el-input size="mini" v-model="documentData.examiningReport" placeholder="请输入内容"></el-input>
                </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="documentDialogVisible=false">取 消</el-button>
          <el-button :loading="allowAddAccount" type="primary" @click="modifyDocument">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
    import { VTable} from '@/components/index'
    export default {
        name: "companyInfo",
        components:{
          VTable,
        },
        data(){
            return{
                summaryDisabled:true,
                addressDialogVisible:false,
                accountDialogVisible:false,
                contactDialogVisible:false,
                documentDialogVisible:false,
                customDialogVisible:false,
                exchangerateDialogVisible:false,
                //页面page绑定
                companyInfo:{
                    logo:'',
                    code:'',            //供应商编号
                    name:'',            //供应商名称
                    type:'',            //供应商类别
                    country:'',         //国家
                    city:'',
                    incoterm:'',
                    exportLicense:'',   //出口资质
                    currency:'',        //币种
                    payment:'',         //付款方式
                    shortName:'',       //简称
                    description:'',            //供应商描述
                },
                cloneData:{},                   //用于克隆存储的对象
                //验证规则
                companyInfoRules:{

                },

                //弹出框data
                addressData:{
                    address: "",
                    city: "",
                    country: "",
                    customerId: 0,
                    id: "",
                    orderNo: "",
                    province: "",
                    receiveAddress: "",
                    receiveCity: "",
                    receiveCountry: "",
                    receiveProvince: "",
                    version: ""
                },
                contactData:{
                  cellphone: "",
                  customerId: 0,
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
                    name:'',
                    deptName:'',
                    gender:'',
                    cellphone:'',
                    telphone:'',
                    fax:'',
                    email:'',
                    skype:'',
                    qq:''
                },
              documentData:{
                  aduitDetails: "",
                  customerId: "",
                  document: "",
                  examiningReport: "",
                  id: "",
                  invoice: "",
                  packingList: "",
                  version: ""
              },
              customData:{
                customerId: "",
                exchangeRateUSD: "",
                id:"",
                insuranceExpensesUSD40HC: "",
                oceanFreightUSD40HC: "",
                portWarehousePrice40HC: "",
                version: ""
              },
              exchangerateData: {
                id: "",
                fromCurrency: "",
                toCurrency: "",
                price: "",
                symbol: ""
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
                this.companyInfo.address=[];
                this.companyInfo.concats=[];
                this.$ajax.get(this.$apis.get_supplierWhile).then(res=>{
                    this.companyInfo=res;
                    this.documentData = res.documents[0];
                    this.customList = res.custom
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
               console.log(this.$refs.uploadFile.getFiles())
                let params={
                    city: this.companyInfo.city,
                    code: this.companyInfo.code,
                    companyId: this.companyInfo.companyId,
                    country: this.companyInfo.country,
                    currency: this.companyInfo.currency,
                    exportLicense: this.companyInfo.exportLicense,
                    id:this.companyInfo.id,
                    incoterm: this.companyInfo.incoterm,
                    logo: this.$refs.uploadFile.getFiles()[0],
                    name: this.companyInfo.name,
                    ownerId: this.companyInfo.ownerId,
                    payment: this.companyInfo.payment,
                    recycle: this.companyInfo.recycle,
                    shortName: this.companyInfo.shortName,
                    status: this.companyInfo.status,
                    tenantId: this.companyInfo.tenantId,
                    type: this.companyInfo.type
                };
                this.allowModifySummary=true;
                this.$ajax.post(`${this.$apis.post_purchase_customer}/${this.companyInfo.id}`,params).then(res=>{
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                    this.allowModifySummary=false;
                    this.summaryDisabled=true;
                }).catch(err=>{
                    this.allowModifySummary=false;
                    this.summaryDisabled=true;
                });
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
            sureAddAddress(){
                this.allowAddAddress=true;
                this.addressData.customerId=this.companyInfo.id;
                if(this.isModifyAddress){
                    //表示是在修改地址
                    this.$ajax.post(`${this.$apis.post_purchase_customer_address_id}/${this.addressData.id}`,this.addressData).then(res=>{
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
                    this.$ajax.post(this.$apis.post_purchase_customer_address,this.addressData).then(res=>{
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
            modifyAddreess(e){
                this.isModifyAddress=true;      //标识正在修改地址
                this.addressData=Object.assign({}, e);
                this.addressDialogVisible=true;
            },
            deleteAddress(e){
                this.$confirm('确定删除该地址?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$ajax.post(this.$apis.post_purchase_customer_deleteAddress,{id:e.id}).then(res=>{
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
            sureAddContact(){
                this.allowAddContact=true;
                this.contactData.customerId=this.companyInfo.id;

                if(this.isModifyContact){
                    //表示是在修改account
                    this.$ajax.post(`${this.$apis.post_purchase_customer_concat_id}/${this.contactData.id}`,this.contactData).then(res=>{
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
                    this.$ajax.post(this.$apis.post_purchase_customer_concat,this.contactData).then(res=>{
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
            modifyContact(e){
                this.isModifyContact=true;      //标识正在修改contact
                this.contactData=Object.assign({}, e);
                this.accountDialogVisible=true;
            },
            deleteContact(e){
                this.$confirm('确定删除该联系人?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$ajax.post(this.$apis.post_purchase_customer_deleteConcat,{id:e.id}).then(res=>{
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
           * document操作
           * */
          addDocument(e){
              this.documentData = Object.assign({}, e);
              this.documentDialogVisible = true;
          },
          modifyDocument(){
            this.documentDialogVisible = false;
            this.documentData.customerId=this.companyInfo.id;
            this.$ajax.post(`${this.$apis.post_purchase_customer_document_id}/${this.documentData.id}`,this.documentData).then(res=>{
              this.$message({
                message: '修改成功',
                type: 'success'
              });
              this.getWholeData();
              this.documentDialogVisible = false;
            }).catch(err=>{
              this.$message({
                message: err,
                type: 'success'
              });
              this.documentDialogVisible=false;
            });
          },
          /**
           * custom操作
           * */
          addCustom(){
            this.customDialogVisible = true;

          },
          modifyCustom(){
            this.customDialogVisible = false;
            this.customData.customerId=this.companyInfo.id;
            this.$ajax.post(`${this.$apis.post_purchase_customer_custom_id}/${this.customData.id}`,this.customData).then(res=>{
              this.$message({
                message: '修改成功',
                type: 'success'
              });
              this.getWholeData();
              this.customDialogVisible = false;
            }).catch(err=>{
              this.$message({
                message: err,
                type: 'success'
              });
              this.customDialogVisible=false;
            });
          },

          /**
           * Trade exchange rate操作
           * */
          getGridfavoritePartData(){
            this.$ajax.get(this.$apis.get_customcurrencyexchangerate_query).then(res=>{
                this.currencyList = res;
            }).catch(err=>{
              this.$message({
                message: err,
                type: 'success'
              });
            });
          },
          updateExchangerate(e){
            this.exchangerateDialogVisible = true;
            this.exchangerateData=Object.assign({}, e);
          },
          modifyExchangerate(){
            this.$ajax.post(this.$apis.post_exchangerate_update,this.exchangerateData).then(res=>{
              this.$message({
                message: '修改成功',
                type: 'success'
              });
              this.getGridfavoritePartData();
              this.exchangerateDialogVisible = false;
            }).catch(err=>{
              this.exchangerateDialogVisible = false;
              this.$message({
                message: err,
                type: 'success'
              });
            });
          },
          upload(){

          }

        },
        created(){
            // this.supplierWhole();
               this.getWholeData();
               this.getCurrency();
               this.getCountryAll();
               this.getCodePart();
               this.getDepartment();
               this.getGridfavoritePartData();

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
    }
    .section-btn{
        margin-bottom: 10px;
    }

    .section{
        margin-top: 20px;
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
