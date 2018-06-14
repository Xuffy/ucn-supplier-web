<template>
  <div class="peosonalSetting">
    <el-form label-width="190px" :rules="rules" ref="form" :model="form" :inline="true">
        <el-row>
            <el-col :span="12">
                <el-form-item :label="$i.setting.email" prop="email">
                    <el-input type="email" style="max-width:200px;" v-model="form.email" disabled="disabled"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12" >
                <el-form-item :label="$i.setting.userName"  prop="userName">
                    <el-input style="max-width:200px" v-model="form.userName" :disabled="isModify"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item  label="Password">
                    <el-input style="max-width:140px;" type="password" auto-complete="off" :disabled="isModify"></el-input>
                    <span  @click="dialogVisibleO = true">Replace</span>
                    <!-- <el-button style=" " @click="dialogVisible = true">Replace</el-button> -->
                </el-form-item>
            </el-col>
             <el-col :span="12">
                <el-form-item  :label="$i.setting.tel" prop="tel">
                    <el-input style="max-width:200px" v-model="form.tel" :disabled="isModify"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item :label="$i.setting.birthday"  v-if="isVisible" >
                    <div style="display:flex;max-width:200px;">
                        <el-date-picker type="date" placeholder="选择日期" value-format="timestamp" v-model="form.birthday"  style="max-width:300px;" :disabled="isModify"></el-date-picker>
                    </div>
                </el-form-item>
            </el-col>
            <el-col :span="12" >
              <el-form-item  :label="$i.setting.department" v-if="isVisible">
                  <el-input style="max-width:200px"v-model="form.deptName"  disabled="disabled"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item prop="lang" :label="$i.setting.language"  v-if="isVisible">
                    <el-select v-model="form.lang" placeholder="请选择" style="width: 200px" :disabled="isModify">
                        <el-option
                                v-for="item in language"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code"
                                style="width: 200px">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12" >
                <el-form-item prop="role" :label="$i.setting.role" v-if="isVisible">
                  <el-input style="max-width:200px" v-model="form.roleName" disabled="disabled"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item prop="gender" :label="$i.setting.gender"  v-if="isVisible" >
                    <el-select v-model="form.gender" placeholder="please input" style="width: 200px" :disabled="isModify">
                        <el-option
                                v-for="item in genderOptions"
                                :key="item.key"
                                :label="item.label"
                                :value="item.key"
                                style="width: 200px">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
    <div class="button_div">
      <div class="summary-btn">
        <div v-if="summaryDisabled">
          <el-button @click="modifySummary">{{$i.common.modify}}</el-button>
        </div>
        <div v-else>
          <el-button :loading="allowModifySummary" @click="submitFormInfo('form')" type="primary">{{$i.common.modify}}</el-button>
          <el-button @click="cancelModifySummary">{{$i.common.cancel}}</el-button>
        </div>
      </div>
    </div>
    <el-dialog
        class="speDialog"
        :visible.sync="dialogVisibleO"
        width="30%"
        :before-close="handleClose">
        <el-form :rules="rules"  ref="modifyPass" :model="modifyPass">
            <el-form-item :label="$i.setting.oldPassword" prop="password" :label-width="formLabelWidth">
                <el-input type="password" auto-complete="off" v-model="modifyPass.password"></el-input>
            </el-form-item>
            <el-form-item :label="$i.setting.newPassword" prop="newPassword"  :label-width="formLabelWidth">
                <el-input type="password" auto-complete="off" v-model="modifyPass.newPassword"></el-input>
            </el-form-item>
            <el-form-item :label="$i.setting.confirmPassword" prop="comfirmNewPassword" :label-width="formLabelWidth">
                <el-input type="password" auto-complete="off" v-model="modifyPass.comfirmNewPassword"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm('modifyPass')">{{$i.common.ok}}</el-button>
            <el-button @click="dialogVisibleO = false">{{$i.common.cancel}}</el-button>
        </span>
    </el-dialog>
 </div>
</template>

<script>
export default {
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请输入密码'));
            } else {
            if (this.modifyPass.comfirmNewPassword.length !== '') {
                this.$refs.modifyPass.validateField('comfirmNewPassword');
            }
            callback()
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请再次输入密码'));
            } else if (value !== this.modifyPass.newPassword) {
            callback(new Error('两次输入密码不一致!'));
            } else {
            callback();
            }
        };
      return {
          summaryDisabled:true,
          allowModifySummary:false,
           form: {
              email:'',
              userName:'',
              password:'',
              tel:'',
              gender:'', //0：男，1：女，2：未知性
              birthday:'',
              lang:'',
              deptName:'',
              roleName:'',
              deptId:'',
              roleId:''
            },
            modifyPass:{
              password:'',
              newPassword:'',
              comfirmNewPassword:''
            },
            modifyEmail:{
              newEmail:''
            },
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
            rules: {
              email: [
                { required: true, message: '请输入邮箱地址', trigger: 'blur' },
              ],
              userName: [
                { required: true, message: '请输入用户名称', trigger: 'blur' },
              ],
              tel: [
                { required: true, message: '请输入联系方式', trigger: 'blur' },
              ],
              gender: [
                { required: true, message: '请输入性别', trigger: 'blur' },
              ],
              lang: [
                { required: true, message: '请输入语言', trigger: 'blur' },
              ],
              password:[
                {min:6, message:'密码长度不少于6位', trigger: 'blur' },
              ],
              newPassword: [
                {min:6, message:'密码长度不少于6位', trigger: 'blur' },
                { validator: validatePass, trigger: 'blur' }
              ],
              comfirmNewPassword: [
                {min:6, message:'密码长度不少于6位', trigger: 'blur' },
                { validator: validatePass2, trigger: 'blur' }
              ],
            },
            dialogVisibleO:false,
            formLabelWidth: '140px',
            language:[],
            isVisible:false,
            isModify:true
        };
    },
    methods: {
          submitForm(formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                this.putUserPassword()
              } else {
                console.log('error submit!!');
                return false;
              }
            });
          },
        submitFormInfo(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.putUserProfile()
              this.isModify = true;
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        getUserPrivilege(){
          this.$ajax.get(this.$apis.get_user_privilege)
            .then(res => {
              //用户类型：0 管理员，1 普通用户  2 english 1 chinese
              if (res.userType === 1 ){
                this.isVisible = true;
              }else{
                this.isVisible = false;
              }
            })
        },
        postLanguage(){
            this.$ajax.post(this.$apis.POST_CODE_PART,['LANGUAGE'])
            .then(res => {
                this.language = res[0].codes
            });
        },
        getUserProfile(){
            this.$ajax.get(this.$apis.get_user_profile)
            .then(res => {
                this.form = res
            })
        },
        modifySummary(){
          this.summaryDisabled=false;
          this.isModify = false;
        },
        cancelModifySummary(){
          this.summaryDisabled=true;
          this.isModify = true;
        },
        putUserProfile(){
          const params = {
            userName: this.form.userName,
            tel: this.form.tel,
            gender: this.form.gender,
            birthday: this.form.birthday,
            lang: this.form.lang
          }
          if (!this.isVisible){
            params.birthday = new Date().getTime();
            params.lang = '1';
          }

          this.allowModifySummary=true;
            this.$ajax.put(this.$apis.put_user_profile,params)
            .then(res => {
                this.$message({
                    type: 'success',
                    message: '修改成功!'
                });
              this.summaryDisabled=true;
              this.allowModifySummary=false;
              this.getUserProfile();
            }).catch(err=>{
              this.allowModifySummary=false;
              this.summaryDisabled=true;
              this.getUserProfile();
            });
        },
        putUserPassword(){
            //校验新旧密码
            if(this.modifyPass.password == this.modifyPass.comfirmNewPassword){
                this.$message({
                    type: 'error',
                    message: '新密码不能与旧密码相同!'
                });
                return false;
            }

           this.$ajax.put(this.$apis.put_user_profile_password,this.modifyPass)
             .then(res => {
               this.dialogVisibleO = false;
               this.$message({type: 'success', message: '修改成功!'});
               this.modifyPass = {}
             });
        },
        handleClose(){
            this.dialogVisibleO = false;
        }
    },
    created(){
       this.getUserPrivilege();
       this.getUserProfile();
       this.postLanguage();

    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .button_div{
        display: flex;
        justify-content: center;
        margin-top: 60px;
        margin-bottom: 80px;
    }
    span {
        cursor:pointer;
    }
  .dialog-footer{
    padding-top: 30px;
  }
</style>
