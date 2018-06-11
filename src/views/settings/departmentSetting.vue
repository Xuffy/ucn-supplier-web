<template>
  <div class="department-setting">
    <div class="title">
      {{$i.setting.departmentSetting}}
    </div>
    <div class="body">
      <el-row :gutter="15">
        <el-col :span="8">
          <div class="card department">
            <div class="title">{{$i.setting.department}}</div>
            <div class="handler">
              <el-row>
                <el-col :span="8">
                  <el-button @click="addDepartment" size="small" type="primary">{{$i.setting.add}}</el-button>
                </el-col>
                <el-col :span="16">
                  <el-input
                    size="small"
                    :placeholder="$i.setting.pleaseInput"
                    v-model="searchDepartment"
                    clearable>
                    <i slot="suffix" class="el-input__icon el-icon-search"></i>
                  </el-input>
                </el-col>
              </el-row>
            </div>
            <div class="list" v-loading="loadingDepartment">
              <div class="list-title">{{$i.setting.all}} <span>({{departmentUserTotal}}人)</span></div>
              <el-tree
                class="departmentTree"
                ref="departmentTree"
                :data="departmentData"
                :props="departmentProps"
                node-key="deptId"
                default-expand-all
                :expand-on-click-node="false"
                :filter-node-method="filterDepartment"
                @node-click="departmentClick">
                <div class="custom-tree-node" slot-scope="{ node, data }"
                     :class="{isAction:node.data.deptId === userData.deptId}">
                  <div v-if="!data.children">
                    <span v-text="node.label + '(' + node.data.deptUserCount + '人)'"></span>
                    <div class="action">
                      <el-button
                        class="treeBtn"
                        type="text"
                        icon="el-icon-edit"
                        @click.stop="modifyDepartment(data,node,$event)">
                      </el-button>
                      <el-button
                        class="treeBtn"
                        type="text"
                        icon="el-icon-delete"
                        @click.stop="deleteDepartment(data,node)">
                      </el-button>
                    </div>
                  </div>
                  <span v-else v-text="node.label"></span>
                </div>
              </el-tree>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="card role">
            <div class="title">{{$i.setting.role}}</div>
            <div class="handler">
              <el-row>
                <el-col :span="8">
                  <el-button :disabled="!userData.deptId" @click="addRole" size="small"
                             type="primary">{{$i.setting.add}}
                  </el-button>
                </el-col>
                <el-col :span="16">
                  <el-input
                    size="small"
                    :placeholder="$i.setting.pleaseInput"
                    v-model="searchRole"
                    clearable>
                    <i slot="suffix" class="el-input__icon el-icon-search"></i>
                  </el-input>
                </el-col>
              </el-row>
            </div>
            <div class="list" v-loading="loadingRole">
              <div class="list-title">{{$i.setting.all}} <span>({{roleUserTotal}}人)</span></div>
              <el-tree
                class="speTree"
                ref="roleTree"
                :data="roleData"
                :props="roleProps"
                show-checkbox
                node-key="roleId"
                default-expand-all
                :expand-on-click-node="false"
                :filter-node-method="filterRole"
                @check="roleCheckClick">
                <div class="custom-tree-node" slot-scope="{ node, data }">
                  <div v-if="!data.children">
                    <span v-text="node.label + '(' + roleUserTotal + '人)'"></span>
                    <div class="action">
                      <el-button
                        class="treeBtn"
                        type="text"
                        icon="el-icon-edit"
                        @click.stop="modifyRole(data,node)">
                      </el-button>
                      <el-button
                        class="treeBtn"
                        type="text"
                        icon="el-icon-delete"
                        @click.stop="deleteRole(data,node)">
                      </el-button>
                    </div>
                  </div>
                  <span v-else v-text="node.label"></span>
                </div>
              </el-tree>
            </div>
          </div>
        </el-col>
        <!--<el-col :span="8">
          <div class="card">
            <div class="title">Privs</div>
            <div class="handler">
              <el-row>
                <el-col :span="24">
                  <el-input
                    size="small"
                    placeholder="请输入"
                    v-model="searchPrivs">
                    <i slot="suffix" class="el-input__icon el-icon-search"></i>
                  </el-input>
                </el-col>
              </el-row>
            </div>
            <div class="list">
              <el-tree
                :data="data2"
                show-checkbox
                node-key="id"
                :default-expand-all="true"
                :props="defaultProps">
              </el-tree>

            </div>
          </div>
        </el-col>-->
      </el-row>
    </div>
    <div class="footer">
      <div class="title">{{$i.setting.belongingUsers}}</div>
      <div class="btns">
        <el-button :disabled="disableAddUser" type="primary" @click="addUsers">{{$i.setting.add}}</el-button>
        <el-button :disabled="selectList.length===0" :loading="inviteUserLoading" type="primary" @click="inviteUser">
          {{$i.setting.invite}}
        </el-button>
      </div>
      <div class="content">
        <el-form ref="userData" :model="userData" label-width="100px">
          <el-row>
            <!--<el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
              <el-form-item prop="email" :label="$i.departmentSetting.email">
                <el-input size="mini" v-model="userData.email"></el-input>
              </el-form-item>
            </el-col>-->
            <!--<el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
              <el-form-item prop="userName" :label="$i.departmentSetting.userName">
                <el-input size="mini" v-model="userData.userName"></el-input>
              </el-form-item>
            </el-col>-->
            <!-- <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
               <el-form-item prop="gender" :label="$i.departmentSetting.gender">
                 <el-select size="mini" v-model="userData.gender" placeholder="请选择">
                   <el-option
                     v-for="item in genderOptions"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
                   </el-option>
                 </el-select>
               </el-form-item>
             </el-col>
             <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
               <el-form-item prop="status" :label="$i.departmentSetting.status">
                 <el-select size="mini" v-model="userData.status" placeholder="请选择">
                   <el-option
                     v-for="item in statusOptions"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
                   </el-option>
                 </el-select>
               </el-form-item>
             </el-col>-->
          </el-row>
        </el-form>
        <!--<div class="btn">
          <el-button @click="searchUser" :loading="disabledSearch" class="serachBtn" type="primary">
            {{$i.departmentSetting.search}}
          </el-button>
        </div>-->
        <v-table
          class="speTable"
          ref="vTable"
          :data="tableDataList"
          :buttons="setButton"
          @change-checked="changeChecked"
          @action="btnClick"></v-table>
      </div>
    </div>

    <el-dialog
      class="speDialog"
      title="修改"
      :visible.sync="editUserVisible"
      width="30%">
      <el-form :model="editUser">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="editUser.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="editUser.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editUserVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserVisible = false">确 定</el-button>
      </div>
      <!--<span slot="footer" class="dialog-footer">-->
      <!--<el-button @click="editUserVisible = false">取 消</el-button>-->
      <!--<el-button type="primary" @click="editUserVisible = false">下架产品</el-button>-->
      <!--</span>-->
    </el-dialog>

    <el-dialog
      class="speDialog"
      title="Add New User"
      :visible.sync="addUserVisible"
      width="50%">
      <el-form :model="addUser">
        <el-row>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item :label="$i.setting.email" :label-width="formLabelWidth">
              <el-input
                class="speInput"
                v-model="addUser.email"
                auto-complete="off"
                :placeholder="$i.setting.pleaseInput"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item :label="$i.setting.userName" :label-width="formLabelWidth">
              <el-input
                class="speInput"
                v-model="addUser.userName"
                auto-complete="off"
                :placeholder="$i.setting.pleaseInput"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item :label="$i.setting.lang" :label-width="formLabelWidth">
              <el-select class="speInput" v-model="addUser.lang" :placeholder="$i.setting.pleaseChoose">
                <el-option
                  v-for="item in languageOption"
                  :key="item.id"
                  :label="item.name"
                  :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item :label="$i.setting.tel" :label-width="formLabelWidth">
              <el-input class="speInput" v-model="addUser.tel" auto-complete="off"
                        :placeholder="$i.setting.pleaseInput"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item :label="$i.setting.gender" :label-width="formLabelWidth">
              <el-select class="speInput" v-model="addUser.gender" :placeholder="$i.setting.pleaseChoose">
                <el-option
                  v-for="item in genderOption"
                  :key="item.id"
                  :label="item.name"
                  :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item :label="$i.setting.birthday" :label-width="formLabelWidth">
              <el-date-picker
                class="speInput"
                :editable="false"
                v-model="addUser.birthday"
                type="date"
                :placeholder="$i.setting.pleaseChoose">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item :label="$i.setting.department" :label-width="formLabelWidth">
              <el-select :disabled="isCreate" class="speInput" v-model="addUser.deptId"
                         :placeholder="$i.setting.pleaseChoose">
                <el-option
                  v-for="item in departmentData"
                  :key="item.deptId"
                  :label="item.deptName"
                  :value="item.deptId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item :label="$i.setting.role" :label-width="formLabelWidth">
              <el-select :disabled="isCreate" class="speInput" v-model="addUser.roleId"
                         :placeholder="$i.setting.pleaseChoose">
                <el-option
                  v-for="item in roleOption"
                  :key="item.roleId"
                  :label="item.roleName"
                  :value="item.roleId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form-item :label="$i.setting.remark" :label-width="formLabelWidth">
              <el-input class="speInput" v-model="addUser.remark" auto-complete="off"
                        :placeholder="$i.setting.pleaseInput"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!--<el-form-item label="活动区域" :label-width="formLabelWidth">-->
        <!--<el-select v-model="addUser.region" placeholder="请选择活动区域">-->
        <!--<el-option label="区域一" value="shanghai"></el-option>-->
        <!--<el-option label="区域二" value="beijing"></el-option>-->
        <!--</el-select>-->
        <!--</el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button type="primary" :loading="addUserLoading" @click="sureAddUser">{{$i.setting.sure}}</el-button>
        <el-button @click="addUserVisible = false">{{$i.setting.cancel}}</el-button>
      </div>
      <!--<span slot="footer" class="dialog-footer">-->
      <!--<el-button @click="editUserVisible = false">取 消</el-button>-->
      <!--<el-button type="primary" @click="editUserVisible = false">下架产品</el-button>-->
      <!--</span>-->
    </el-dialog>
  </div>
</template>

<script>

  import {VTable} from '@/components/index'
  import config from 'service/config'
  import {Base64} from 'js-base64';
  import Qs from 'qs';

  const ACTIVE_TYPE = [
    {name: '未激活', code: 0},
    {name: '已激活', code: 1},
    {name: '禁用', code: 2}
  ];

  export default {
    name: "department-setting",
    components: {
      VTable
    },
    data() {
      return {
        //基础配置
        disabledSearch: false,
        editUserVisible: false,
        addUserVisible: false,
        formLabelWidth: '100px',
        allowRoleGetData: false,             //是否允许切换role的选中状态来获取数据
        loadingDepartment: false,
        loadingRole: false,
        addUserLoading: false,
        inviteUserLoading: false,
        disableAddUser: true,
        disableInviteUser: true,
        isCreate: false,
        selectList: [],

        /**
         * 单位字典
         * */
        languageOption: [],
        genderOption: [
          {
            id: 1,
            code: 0,
            name: '男'
          },
          {
            id: 2,
            code: 1,
            name: '女'
          },
          {
            id: 3,
            code: 2,
            name: '未知'
          },
        ],
        roleOption: [],


        /**
         * Department data定义
         * */
        departmentData: [],
        departmentProps: {
          label: 'deptName',
        },
        departmentUserTotal: 0,          //department总人数

        /**
         * Role data定义
         * */
        roleData: [
          {
            id: 1,
            roleName: '全部',
            children: []
          }
        ],
        roleProps: {
          label: 'roleName'
        },
        roleUserTotal: 0,                //role总人数

        /**
         * 搜索内容
         * */
        searchDepartment: '',            //搜索的部门名称
        searchRole: '',                  //搜索的role名称
        searchPrivs: '',                //搜索的priv的名称

        /**
         * 底部user数据绑定
         * */
        userData: {
          email: '',
          userName: '',
          gender: null,
          status: null,
          ps: 50,
          pn: 1,
          deptId: null,
          roleIds: null
        },
        tableDataList: [],
        editUser: {
          id: 0,
          deptId: 0,
          roleIds: 0,
          userName: "string",
          lang: "string",
          email: "string",
          tel: "string",
          gender: 0,
          birthday: "string",
          remark: "string"
        },
        addUser: {
          deptId: 0,
          roleId: 0,
          userName: "",
          lang: "",
          email: "",
          tel: "",
          gender: 0,
          birthday: "",
          remark: ""
        },
        statusOptions: [
          {
            label: '未激活',
            value: 0,
          },
          {
            label: '已激活',
            value: 1,
          },
          {
            label: '禁用',
            value: 2,
          },
        ],

        data2: [
          {
            id: 1,
            label: '一级 1',
            children: [{
              id: 4,
              label: '二级 1-1',
              children: [{
                id: 9,
                label: '三级 1-1-1'
              }, {
                id: 10,
                label: '三级 1-1-2'
              }]
            }]
          }, {
            id: 2,
            label: '一级 2',
            children: [{
              id: 5,
              label: '二级 2-1'
            }, {
              id: 6,
              label: '二级 2-2'
            }]
          }, {
            id: 3,
            label: '一级 3',
            children: [{
              id: 7,
              label: '二级 3-1'
            }, {
              id: 8,
              label: '二级 3-2'
            }]
          }],

        defaultProps: {
          children: 'children',
          label: 'label'
        },
      }
    },
    methods: {
      /**
       * render按钮生成
       * */
      renderDepartment(h, {node, data, store}) {
        console.log(data)
        if (!data.children) {
          return
        } else {
          return
        }
      },
      renderRole(h, {node, data, store}) {
        if (!data.children) {
          return
        } else {
          return
        }
      },

      /**
       * 获取页面数据
       * */
      getDepartmentData() {
        this.loadingDepartment = true;
        this.$ajax.get(this.$apis.get_departmentOverview).then(res => {
          this.departmentData = res;
          this.departmentData.forEach(v => {
            this.departmentUserTotal += v.deptUserCount;
          });
        }).finally(err => {
          this.loadingDepartment = false;
        });
      },
      getDepartmentUser() {
        let checkedNode = this.$refs.roleTree.getCheckedNodes(true);
        let roleIds = _.pluck(checkedNode, 'roleId');

        this.tableDataList = [];

        if (_.isEmpty(roleIds)) {
          return false;
        }

        this.$ajax.post(this.$apis.get_departmentUser, {
          ps: 50,
          pn: 1,
          deptId: null,
          roleIds,
          userName: '',
          email: '',
          gender: null,
          status: null
        }).then(res => {
          this.tableDataList = this.$getDB(this.$db.setting.department, res.datas, item => {
            item.gender._value = _.findWhere(this.genderOption, {code: item.gender.value}).name;
            item.status._value = _.findWhere(ACTIVE_TYPE, {code: item.status.value}).name;
            return item;
          });
        }).catch(err => {

        });
      },
      setButton(e) {
        return [
          {label: 'Edit', type: 1},
          {label: e.tel.value === '13158687582' ? 'Enable' : 'Disabled', type: 2}
        ]
      },
      getRoleData() {
        this.loadingRole = true;
        this.$ajax.get(this.$apis.get_departmentRole, {
          deptId: this.userData.deptId
        }).then(res => {
          this.roleData[0].children = res;
          if (res) {
            if (res.length === 1) {
              this.disableAddUser = false;
            } else {
              this.disableAddUser = true;
            }
            this.$nextTick(() => {
              this.$refs.roleTree.setCheckedNodes(res);
              this.getDepartmentUser();
            })
          } else {
            this.disableAddUser = true;
          }
          // this.$ajax.post(this.$apis.get_departmentUser, this.userData).then(res => {
          //     console.log(res,'???')
          //     this.tableDataList = this.$getDB(this.$db.setting.department, res.datas);
          //     this.$nextTick(() => {
          //         if(this.roleData[0].children){
          //             this.roleData[0].children.forEach(v => {
          //                 this.$refs.roleTree.setChecked(v, true, false)
          //             });
          //         }
          //     });
          // });

        }).finally(err => {
          this.loadingRole = false;
        });
      },

      /**
       * tree节点点击事件
       * */
      departmentClick(data) {
        //选中部门就让他为false，避免触发全选时的多次重复事件
        this.allowRoleGetData = false;
        this.userData.deptId = data.deptId;
        //清空底部搜索条件
        this.userData.roleIds = null;
        this.userData.pn = 1;
        this.userData.email = '';
        this.userData.userName = '';
        this.userData.gender = null;
        this.userData.status = null;
        this.roleData[0].children = this.$depthClone(data.deptRoles);
        this.roleUserTotal = 0;
        this.departmentData.forEach(v => {
          if (this.userData.deptId === v.deptId) {
            if (v.deptRoles) {
              v.deptRoles.forEach(m => {
                this.roleUserTotal += m.roleUserCount;
              })
            }
          }
        });
        this.getRoleData();
      },
      roleCheckClick() {
        let checkedNode = this.$refs.roleTree.getCheckedNodes(true);
        let id = _.pluck(checkedNode, 'roleId');

        this.getDepartmentUser();

        if (id.length === 1) {
          this.disableAddUser = false;
        } else {
          this.disableAddUser = true;
        }


      },

      /**
       * add事件
       * */
      addDepartment() {
        this.$prompt(this.$i.setting.pleaseInputDepartment, this.$i.setting.addDepartment, {
          confirmButtonText: this.$i.setting.sure,
          cancelButtonText: this.$i.setting.cancel,
          closeOnHashChange: false,
          inputValidator: (data) => {
            if (!data || data === '') {
              return this.$i.setting.pleaseInput;
            }
          }
        }).then(({value}) => {
          let repeat = false;
          this.departmentData.forEach(v => {
            if (v.deptName === value) {
              repeat = true;
            }
          });
          if (repeat) {
            this.$message({
              message: this.$i.setting.canNotRepeatDepartmentName,
              type: 'warning'
            });
          } else {
            this.loadingDepartment = true;
            this.$ajax.post(this.$apis.get_department, {
              deptName: value
            }).then(res => {
              this.$message({
                message: this.$i.setting.createSuccess,
                type: 'success'
              });
              this.$ajax.get(this.$apis.get_departmentOverview).then(res => {
                this.departmentUserTotal = 0;
                this.departmentData = res;
                this.departmentData.forEach(v => {
                  this.departmentUserTotal += v.deptUserCount;
                });
              }).finally(err => {
                this.loadingDepartment = false;
              });
            }).catch(err => {
              this.loadingDepartment = false;
            });
          }
        }).catch(() => {

        });
      },
      addRole() {
        this.$prompt(this.$i.setting.pleaseInputRole, this.$i.setting.addRole, {
          confirmButtonText: this.$i.setting.sure,
          cancelButtonText: this.$i.setting.cancel,
          inputValidator: (data) => {
            if (!data || data === '') {
              return this.$i.setting.pleaseInput;
            }
          }
        }).then(({value}) => {
          let repeat = false;
          if (this.roleData[0].children) {
            this.roleData[0].children.forEach(v => {
              if (v.roleName === value) {
                repeat = true;
              }
            });
          }
          if (repeat) {
            this.$message({
              message: 'role名称不能重复',
              type: 'warning'
            });
          } else {
            this.loadingRole = true;
            this.$ajax.post(this.$apis.add_departmentRole, {
              deptId: this.userData.deptId,
              roleName: value
            }).then(res => {
              this.getRoleData();
            }).catch(err => {
              this.loadingRole = false;
            });
          }
        }).catch(() => {
          /*this.$message({
            type: 'info',
            message: '取消输入'
          });*/
        });
      },

      /**
       * 筛选事件
       * */
      filterDepartment(value, data) {
        if (!value) return true;
        return data.deptName.indexOf(value) !== -1;
      },
      filterRole(value, data) {
        if (!value) return true;
        return data.roleName.indexOf(value) !== -1;
      },

      /**
       * 编辑事件
       * */
      modifyDepartment(e) {
        this.$prompt(this.$i.setting.pleaseInputDepartment, this.$i.setting.prompt, {
          confirmButtonText: this.$i.setting.sure,
          cancelButtonText: this.$i.setting.cancel,
          inputValue: e.deptName,
        }).then(({value}) => {
          let repeat = false;
          this.departmentData.forEach(v => {
            if (v.deptName === value) {
              repeat = true;
            }
          });
          if (repeat) {
            this.$message({
              message: this.$i.setting.canNotRepeatDepartmentName,
              type: 'warning'
            });
          } else {
            this.loadingDepartment = true;
            this.$ajax.put(this.$apis.get_department, {
              deptId: e.deptId,
              deptName: value
            }).then(res => {
              this.$message({
                message: this.$i.setting.modifySuccess,
                type: 'success'
              });
              this.$ajax.get(this.$apis.get_departmentOverview).then(res => {
                this.departmentUserTotal = 0;
                this.departmentData = res;
                this.departmentData.forEach(v => {
                  this.departmentUserTotal += v.deptUserCount;
                });
              }).finally(err => {
                this.loadingDepartment = false;
              });
            }).catch(err => {
              this.loadingDepartment = false;
            });
          }
        }).catch(() => {

        });
      },
      modifyRole(e) {
        this.$prompt(this.$i.setting.pleaseInputRole, this.$i.setting.prompt, {
          confirmButtonText: this.$i.setting.sure,
          cancelButtonText: this.$i.setting.cancel,
          inputValue: e.roleName
        }).then(({value}) => {
          let repeat = false;
          this.roleData[0].children.forEach(v => {
            if (v.roleName === value) {
              repeat = true;
            }
          });
          if (repeat) {
            this.$message({
              message: this.$i.setting.canNotRepeatRole,
              type: 'warning'
            });
          } else {
            this.loadingRole = true;
            this.$ajax.put(this.$apis.update_departmentRole, {
              roleId: e.roleId,
              roleName: value
            }).then(res => {
              this.getRoleData();
            }).catch(err => {
              this.loadingRole = false;
            });


            // this.$ajax.put(this.$apis.get_departmentRole, {
            //     roleId: e.roleId,
            //     roleName: value
            // }).then(res => {
            //     this.$ajax.get(this.$apis.get_departmentOverview).then(res => {
            //         this.departmentUserTotal = 0;
            //         this.departmentData = res;
            //         this.departmentData.forEach(v => {
            //             this.departmentUserTotal += v.deptUserCount;
            //         });
            //
            //
            //         this.roleData[0].children.forEach(v => {
            //             if (v.roleId === e.roleId) {
            //                 v.roleName = value;
            //             }
            //         });
            //         this.$message({
            //             message: '修改成功',
            //             type: 'success'
            //         });
            //     }).catch(err => {
            //
            //     });
            // }).catch(err => {
            //
            // });
          }
        }).catch(() => {

        });
      },

      /**
       * 删除事件
       * */
      deleteDepartment(e) {
        this.$confirm(this.$i.setting.sureDelete, this.$i.setting.prompt, {
          confirmButtonText: this.$i.setting.sure,
          cancelButtonText: this.$i.setting.cancel,
          type: 'warning'
        }).then(() => {
          this.$ajax.get(this.$apis.get_departmentRole, {
            deptId: e.deptId
          }).then(res => {
            if (res && res.length > 0) {
              this.$message({
                message: this.$i.setting.pleaseRemoveRoleUser,
                type: 'warning'
              });
            } else {
              this.loadingDepartment = true;
              this.$ajax.delete(this.$apis.delete_department, {
                deptId: e.deptId
              }).then(res => {
                this.$ajax.get(this.$apis.get_departmentOverview).then(res => {
                  this.departmentUserTotal = 0;
                  this.departmentData = res;
                  this.departmentData.forEach(v => {
                    this.departmentUserTotal += v.deptUserCount;
                  });
                  this.$message({
                    type: 'success',
                    message: this.$i.setting.deleteSuccess
                  });
                }).finally(err => {
                  this.loadingDepartment = false;
                });
              }).catch(err => {

              });
            }
          }).finally(err => {

          })

        }).catch(() => {

        });
      },
      deleteRole(e, node) {
        this.$confirm(this.$i.setting.sureDelete, this.$i.setting.prompt, {
          confirmButtonText: this.$i.setting.sure,
          cancelButtonText: this.$i.setting.cancel,
          type: 'warning'
        }).then(() => {
          this.loadingRole = true;
          this.$ajax.delete(this.$apis.delete_departmentRole, {
            deptId: this.userData.deptId,
            roleId: e.roleId
          }).then(res => {
            this.$message({
              type: 'success',
              message: this.$i.setting.deleteSuccess
            });
            this.getRoleData();
          }).catch(err => {
            this.loadingRole = false;
          })
        }).catch(() => {

        });
      },

      /**
       * 底部user部分事件
       * */
      changeChecked(e) {
        this.selectList = e;
      },
      btnClick(e, type) {
        if (type === 1) {
          //edit
          console.log(e)
          this.editUserVisible = true;
        } else {
          //enable/disabled
        }
      },
      addUsers() {
        //设置基本信息
        this.roleOption = this.$copyArr(this.roleData[0].children);
        let roleId = this.$refs.roleTree.getCheckedKeys();

        roleId = roleId[0] || roleId[1];

        this.addUser.deptId = this.userData.deptId;
        this.addUser.roleId = roleId;
        this.isCreate = true;
        this.addUserVisible = true;
      },
      sureAddUser() {
        this.addUserLoading = true;
        this.$ajax.post(this.$apis.add_departmentUser, this.addUser)
          .then(res => {
            this.getDepartmentUser();
            this.addUserVisible = false;
            this.$message.success('添加成功');
          }).finally(err => {
            this.addUserLoading = false;
          }
        )
      },
      inviteUser() {
        let emails = [];

        this.inviteUserLoading = true;
        _.map(this.selectList, v => {
          emails.push(v.email.value);
        });

        this.$ajax.post(this.$apis.invite_departmentUser,
          {
            emails,
            callback: `${config.ENV.LOGIN_URL}/#/activation?activeToken=%s&email=%s&redirect=${Base64.encode(window.location.origin)}`
          })
          .then(res => {
            this.$message.success('邀请成功');
          }).finally(err => {
          this.inviteUserLoading = false;
        });
      },

      searchUser(roleIds) {
        // let checkedNode = this.$refs.roleTree.getCheckedNodes(true);
        let params = this.$depthClone(this.userData);

        console.log(roleIds)
        this.tableDataList = [];

        if (_.isEmpty(roleIds)) {
          return false;
        }
        params.roleIds = roleIds;
        this.disabledSearch = true;
        this.$ajax.post(this.$apis.get_departmentUser, params).then(res => {
          this.tableDataList = this.$getDB(this.$db.setting.department, res.datas);
          this.disabledSearch = false;
        }).catch(err => {
          this.disabledSearch = false;
        });

      },

      getUnit() {
        // this.$ajax.get(this.$apis.get_allUnit).then(res=>{
        //     console.log(res)
        // })
        this.$ajax.post(this.$apis.get_partUnit, ['LANGUAGE'], {cache: true})
          .then(res => {
            this.languageOption = res[0].codes;
          }).finally(err => {

          }
        );
      },


    },
    created() {
      this.getDepartmentData();
      // this.getDepartmentUser();
      this.getUnit();
    },
    mounted() {

    },
    watch: {
      searchDepartment(val) {
        this.$refs.departmentTree.filter(val);
      },
      searchRole(val) {
        this.$refs.roleTree.filter(val);
      },
    },
  }
</script>

<style scoped>
  .title {
    font-weight: bold;
    font-size: 18px;
    height: 32px;
    line-height: 32px;
    color: #666666;
  }

  .body {
    margin-top: 5px;
  }

  .body .card {
    height: 430px;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    /*box-shadow: 0 0 30px #e0e0e0;*/
  }

  .body .card .title {
    font-weight: normal;
    font-size: 14px;
    padding: 5px 10px;
    border-bottom: 1px solid #f3f3f3;
  }

  .body .card .handler {
    padding: 10px;
    border-bottom: 1px solid #f3f3f3;
  }

  .body .card .handler .speInput {
    width: auto;
    float: right;
  }

  .body .card .list {
    height: 320px;
    overflow-y: scroll;
  }

  .body .card .list .list-title {
    font-weight: bold;
    height: 30px;
    line-height: 30px;
    padding-left: 15px;
    font-size: 18px;
  }

  .body .card .list .list-title span {
    font-weight: normal;
    font-size: 14px;
    margin-left: 10px;
  }

  /*tree样式调整*/
  .departmentTree /deep/ .el-tree-node__expand-icon {
    display: none;
  }

  .departmentTree /deep/ .custom-tree-node {
    padding-left: 20px;
  }

  .departmentTree /deep/ .isAction {
    background-color: #f5f7fa;
  }

  /deep/ .custom-tree-node {
    width: 100%;
    position: relative;
  }

  /deep/ .custom-tree-node span {
    font-size: 14px;
  }

  /deep/ .custom-tree-node .action {
    position: absolute;
    right: 0;
    top: 0;
  }

  /deep/ .el-tree-node__content {
    line-height: 30px;
    height: 30px;
  }

  .footer {
    margin-top: 10px;
    margin-bottom: 20px;
  }

  .footer .content {
    margin-top: 10px;
  }

  .footer .btn {
    text-align: center;
  }

  .footer .btn button {
    padding: 9px 25px !important;
  }

  .footer .btns {
    margin-top: 5px;
  }

  .speInput {
    width: 80%;
  }
</style>
