<template>
  <div class="peosonalSetting">
    <el-form label-width="190px" ref="form" :model="form" :inline="true" >
        <el-row>
            <el-col :span="12">
                <el-form-item :label="$i.personalInfo.email">
                    <el-input type="email" style="max-width:200px;" v-model="form.email" disabled="disabled"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12" >
                <el-form-item :label="$i.personalInfo.userName">
                    <el-input style="max-width:200px" v-model="form.userName"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item  label="Password">
                    <el-input style="max-width:140px;" type="password"></el-input>
                    <span  @click="dialogVisibleO = true">Replace</span>
                    <!-- <el-button style=" " @click="dialogVisible = true">Replace</el-button> -->
                </el-form-item>
            </el-col>
             <el-col :span="12">
                <el-form-item  :label="$i.personalInfo.tel">
                    <el-input style="max-width:200px" v-model="form.tel"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item :label="$i.personalInfo.birthday">
                    <div style="display:flex;max-width:200px;">
                        <el-date-picker type="date" placeholder="选择日期" value-format="timestamp" v-model="form.birthday"  style="max-width:300px;"></el-date-picker>
                    </div>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item prop="department" :label="$i.personalInfo.department">
                     <el-select v-model="form.deptName" placeholder="请选择" >
                        <el-option
                                v-for="item in departmentsOptions"
                                :key="item.deptId"
                                :label="item.deptName"
                                :value="item.deptId">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item prop="language" :label="$i.personalInfo.language">
                    <el-select v-model="form.lang" placeholder="请选择">
                        <el-option
                                v-for="item in language"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item prop="role" :label="$i.personalInfo.role">
                    <el-select v-model="form.roleName" placeholder="请选择" >
                        <el-option
                                v-for="item in roleOptions"
                                :key="item.roleId"
                                :label="item.roleName"
                                :value="item.roleId">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item prop="gender" :label="$i.personalInfo.gender">
                    <el-select v-model="form.gender" placeholder="please input" >
                        <el-option
                                v-for="item in genderOptions"
                                :key="item.key"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
    <div class="button_div">
        <el-button @click="putUserProfile">{{$i.common.modify}}</el-button>
        <el-button  type="danger">{{$i.common.cancel}}</el-button>
    </div>
    <el-dialog
        class="speDialog"
        :visible.sync="dialogVisibleO"
        width="30%"
        :before-close="handleClose">
        <el-form :rules="rules"  ref="modifyPass" :model="modifyPass">
            <el-form-item :label="$i.personalInfo.oldPassword" prop="password" :label-width="formLabelWidth">
                <el-input type="password" auto-complete="off" v-model="modifyPass.password"></el-input>
            </el-form-item>
            <el-form-item :label="$i.personalInfo.newPassword" prop="newPassword"  :label-width="formLabelWidth">
                <el-input type="password" auto-complete="off" v-model="modifyPass.newPassword"></el-input>
            </el-form-item>
            <el-form-item :label="$i.personalInfo.confirmPassword" prop="comfirmNewPassword" :label-width="formLabelWidth">
                <el-input type="password" auto-complete="off" v-model="modifyPass.comfirmNewPassword"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="putUserPassword">{{$i.common.ok}}</el-button>
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
                console.log(this.modifyPass.comfirmNewPassword)
                this.$refs.modifyPass.validateField('comfirmNewPassword');
            }
            callback();
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
                label: 'Man',
                key: 0
                }, {
                value: '女',
                label: 'Woman',
                key: 1
                }, {
                value: '未知',
                label: 'Unknown',
                key: 2
           }],
           rules: {
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
            departmentsOptions:[],
            roleOptions:[],
            language:[]
        };
    },
    methods: {
          //获取角色 部门 语言
        getDepartment(){
            this.$ajax.get(this.$apis.get_department)
            .then(res => {
                this.departmentsOptions = res
            });
        },
        getRole(){
            this.$ajax.get(this.$apis.get_role)
            .then(res => {
                this.roleOptions = res
            });
        },
        postLanguage(){
            this.$ajax.post(this.$apis.post_codePart,['LANGUAGE'])
            .then(res => {
                this.language = res[0].codes
            });
        },
        getUserProfile(){
            this.$ajax.get(this.$apis.get_userProfile)
            .then(res => {
                console.log(res)
                this.form = this.$getDB(this.$db.payment.table, res);
            });
        },
        putUserProfile(){
            const params = {
                userName: this.form.userName,
                tel: this.form.tel,
                gender: this.form.gender,
                birthday: this.form.birthday,
                lang: this.form.lang,
                deptId: this.form.deptName,
                roleId: this.form.role
            }
            console.log(params)
            this.$ajax.put(this.$apis.put_userProfile,params)
            .then(res => {
                this.$message({
                    type: 'success',
                    message: '修改成功!'
                });
            });
        },
        putUserPassword(){
            const params = this.modifyPass
            //校验新旧密码
            if(this.modifyPass.password == this.modifyPass.comfirmNewPassword){
                this.$message({
                    type: 'error',
                    message: '新密码不能与旧密码相同!'
                });
                return false;
            }
            this.$ajax.put(this.$apis.put_userProfilePassword,params)
            .then(res => {
                this.$message({
                    type: 'success',
                    message: '修改成功!'
                });
            });
        },
        handleClose(){
            this.dialogVisibleO = false;
        }
    },
    created(){
        // this.getUserProfile()
        // this.getDepartment();
        // this.getRole()
        // this.postLanguage()
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
</style>
