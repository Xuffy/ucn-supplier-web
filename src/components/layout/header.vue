<template>
  <div class="header-box ucn-header">
    <div class="header">
      <img class="c5-icon logo" src="../../assets/images/logo.png" @click="$router.push('/')">

      <div class="ucn-header-menu" v-if="routerList.length">
        <el-menu :default-active="activeName" class="el-menu-demo" mode="horizontal">


          <template v-for="(item,index) in routerList">

            <el-menu-item v-if="item.children.length && item.noDropdown && !item.hidden && menuAuth(item)"
                          :index="index + ''">
              <router-link class="link"
                           :to="item.path+'/'+item.children[0].path">
                {{item.meta ? item.meta.name : ''}}
              </router-link>
            </el-menu-item>


            <el-submenu
              v-if="!item.noDropdown && !item.hidden && menuAuth(item)" :index="index + ''">
              <template slot="title">
                <span v-if="item.meta" v-text="item.meta.name"></span>
              </template>

              <template v-if="item.children.length && !item.noDropdown && !item.hidden"
                        v-for="(cItem,cIndex) in item.children">
                <el-menu-item class="ucn-header-submenu"
                              v-if="!cItem.hidden && menuAuth(cItem)" :index="index +'-'+cIndex">
                  <router-link class="link" :to="item.path+'/'+cItem.path">
                    {{cItem.meta ? cItem.meta.name : ''}}
                  </router-link>
                </el-menu-item>
              </template>
            </el-submenu>
          </template>

        </el-menu>
      </div>

      <div class="header-right" style="color: #999999!important;">
        <div class="message-box" v-popover:messageBox>
          <el-badge :value="message.list.length || ''">
            <i class="el-icon-bell"></i>
          </el-badge>

          <el-popover
            popper-class="message-popover"
            ref="messageBox"
            placement="bottom-end"
            width="300"
            v-model="message.show"
            trigger="click">
            <div v-loading="message.loading">
              <h3 class="ucn-content-title">{{$i.common.systemMessage}}（{{message.list.length}} {{$i.common.new}} ）</h3>
              <ul class="list" v-if="message.list.length">
                <li class="unread" v-for="item in message.list">
                  <p v-text="item.title"></p>
                  <span v-text="$dateFormat(item.sendTime,'yyyy-mm-dd HH:MM:ss')"></span>
                </li>
              </ul>
              <div v-else style="color: #999999;height: 100px;width: 100%;text-align: center;line-height: 100px">
                {{$i.hintMessage.noLatestNews}}
              </div>
              <el-row>
                <el-col :span="12" style="text-align: left;padding: 5px 10px">
                  <el-button type="text" size="mini" @click="readMessage" v-if="message.list.length">
                    {{$i.common.markAsReaded}}
                  </el-button>
                </el-col>
                <el-col :span="12" style="text-align: right;padding: 5px 10px">
                  <el-button type="text" size="mini" @click="goMessage">{{$i.common.more}}</el-button>
                </el-col>
              </el-row>
            </div>
          </el-popover>
        </div>

        <div style="display: inline-block">
          <el-dropdown trigger="click">
            <a href="javascript:void(0)" class="el-dropdown-link" style="cursor: pointer">
              {{userInfo.userType === 0 ? $i.common.admin : $i.common.user}}&nbsp;&nbsp;|&nbsp;&nbsp;
            </a>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><span @click="clearData">{{$i.common.cleanCache}}</span></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <a href="javascript:void(0)" @click="logout">
            {{$i.common.signOut}}
          </a>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
  import {routerMap} from 'service/router'

  export default {
    name: 'VHeader',
    data() {
      return {
        username: 'User Name',
        userInfo: {},
        routerList: [],
        activeName: null,
        activeOpen: [],
        message: {
          show: false,
          list: [],
          loading: false,
        },
      }
    },
    watch: {
      $route() {
        this.updateMenuActive();
        // this.getMessage();
      },
      'message.show'(val) {
        val && this.getMessage();
      }
    },
    created() {
      this.userInfo = this.$localStore.get('user');

      routerMap.forEach(value => {
        // 判断路由是否显示
        if (!value.hidden) {
          this.routerList.push(value)
        }
      });

      this.updateMenuActive()

      this.getMessage();
    },
    methods: {
      logout() {
        this.$confirm(this.$i.hintMessage.logoutHints, this.$i.hintMessage.systemHints, {
          confirmButtonText: this.$i.button.confirm,
          cancelButtonText: this.$i.button.ccancel,
          type: 'warning'
        }).then(() => {
          this.$localStore.clearAll();
          this.$localStore.clearAll();
          this.$router.push('/login');
        });
      },
      goMessage() {
        this.message.show = false;
        this.$router.push('/message/index');
      },
      updateMenuActive() {
        this.activeOpen = [];
        this.activeName = '';
        _.map(this.routerList, (val, index) => {
          if (val.name === this.$route.matched[0].name) {
            this.activeOpen.push(index.toString());
            _.map(val.children, (cVal, cIndex) => {
              if (this.$route.name === cVal.name || this.$route.path === cVal.redirect) {
                this.activeName = `${index}-${cIndex}`;
              }
            });
            if (!this.activeName) {
              _.map(val.children, (cVal, cIndex) => {
                if (this.$route.matched[1].name === cVal.name) {
                  this.activeName = `${index}-${cIndex}`;
                }
              });
            }
          }
        });
      },
      getMessage() {
        this.message.loading = true;
        this.$ajax.post(this.$apis.UNREADMESSAGE_QUERY, {ps: 8, pn: 1})
          .then(data => {
            this.message.list = data || [];
          })
          .finally(() => {
            this.message.loading = false;
          });
      },
      readMessage() {
        let list = [];
        if (_.isEmpty(this.message.list)) return false;


        this.message.loading = true;


        _.map(this.message.list, val => {
          let {id, type} = val;
          list.push({id, type});
        });
        this.$ajax.post(this.$apis.UNREADMESSAGE_UPDATEUNREAD, list)
          .then(() => {
            this.getMessage();
          })
          .finally(() => {
            this.message.loading = false;
          });
      },
      clearData() {
        this.$sessionStore.remove('request_cache');
        history.go(0);
      },
      menuAuth(item) {
        return !(item.meta && item.meta.auth && !this.$auth(item.meta.auth));
      }
    },
  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '../../assets/style/base.less';

  .header-box {
    height: 60px;
    position: fixed;
    width: 100%;
    z-index: 999;
    min-width: 1366px;
    overflow: hidden;
  }

  .ucn-header .link {
    width: 100%;
    height: 100%;
    display: block !important;
  }

  .header {
    height: 100%;
    line-height: 60px;
    background-color: @header-back;
  }

  .logo {
    /*width: 90px;*/
    /*margin-left: 20px;*/
    margin-left: 20px;
    margin-right: 20px;
    cursor: pointer;
    vertical-align: middle;
  }

  .title {
    font-size: 24px;
    color: #ffffff;
    font-weight: 400;
    cursor: pointer;
  }

  .ivu-dropdown-rel a {
    color: #ffffff;
    font-size: 14px;
  }

  .ivu-dropdown {
    margin-left: 30px;
  }

  .ivu-dropdown-menu {
    text-align: left;
  }

  .ucn-header-menu {
    display: inline-block;
    line-height: 70px;
    vertical-align: middle;
  }

  .ucn-header-menu .ivu-menu {
    background: none;
  }

  .header-right {
    /*text-align: right;*/
    /*padding-right: 20px;*/
    position: absolute;
    right: 20px;
    top: 0;
  }

  .user-box {
    vertical-align: middle;
  }

  .user-box .ivu-icon-person {
    font-size: 20px;
  }

  .el-menu--horizontal {
    border: none;
  }

  .el-menu--horizontal {
    background-color: initial;
  }

  .el-submenu,
  .el-menu-item {
    padding: 0 0 0 2.7vw;
    border: none !important;
  }

  .el-menu-item:hover,
  .el-menu--horizontal > .el-menu-item.is-active,
  .el-menu--horizontal .el-menu-item:not(.is-disabled):focus,
  .el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
    background-color: inherit;
    color: #FFFFFF !important;
    /*background-color: rgba(119, 119, 119, .5);*/
  }

  /*.el-menu-item:hover,
  .el-menu--horizontal > .el-menu-item.is-active,
  .el-menu--horizontal .el-menu-item:focus,
  .el-menu--horizontal .el-menu-item:hover,
  .el-menu--horizontal .el-submenu:focus,
  .el-menu--horizontal .el-submenu:hover {
    background-color: rgba(119, 119, 119, .5);
  }*/

  .message-box {
    position: relative;
    display: inline-block;
    line-height: 20px;
    cursor: pointer;
    margin-right: 10px;
  }

  .message-box i {
    font-size: 20px;
    color: #eeeeee;
  }

  .message-popover .ucn-content-title {
    font-size: 14px;
    width: 100%;
    padding: 15px 10px 10px 10px;
    box-sizing: border-box;
  }

  .message-popover .list {
    width: 100%;
    max-height: 300px;
    overflow: auto;
    border-top: 1px solid #eeeeee;
    border-bottom: 1px solid #eeeeee;
  }

  .message-popover .list li {
    padding: 10px 10px 10px 20px;
    cursor: pointer;
    position: relative;
    border-bottom: 1px solid #eeeeee;
  }

  .message-popover .list li.unread:before {
    content: '';
    width: 8px;
    height: 8px;
    top: 50%;
    left: 5px;
    margin-top: -4px;
    border-radius: 50%;
    background-color: #f56c6c;
    position: absolute;
  }

  .message-popover .list li:last-child {
    border-bottom: none;
  }

  .message-popover .list li:hover {
    background-color: #F7F4F4;
  }

  .message-popover .list li span {
    display: block;
    width: 100%;
    text-align: right;
    color: #CDCDCD;
  }
</style>
<style>
  .message-popover {
    padding: 0;
  }

  .ucn-header-submenu a {
    width: 100%;
    height: 100%;
    display: block !important;
  }

  .ucn-header .router-link-active {
    color: #FFFFFF !important;
  }

  .ucn-header-submenu.is-active,
  .ucn-header-submenu:hover {
    background-color: #f5f7fa !important;
  }

  .ucn-header-menu .el-menu--horizontal > .el-submenu .el-submenu__title:hover {
    background-color: inherit !important;
    color: #FFFFFF !important;
  }

  .ucn-header-menu .el-menu--horizontal > .el-submenu .el-submenu__title {
    color: #909399;
    font-size: 12px;
    padding: 0;
    padding-right: 5px;
  }

  .ucn-header-menu .el-menu--horizontal > .el-menu-item a {
    font-size: 12px;
    display: inline;
  }

  .ucn-header-menu .el-menu--horizontal > .el-submenu.is-active .el-submenu__title,
  .ucn-header-menu .el-menu--horizontal > .el-menu-item.is-active {
    border-bottom: none;
  }

  .ucn-header-menu .is-active .el-submenu__title span {
    color: #ffffff;
  }

  .ucn-header .el-menu--horizontal > .el-submenu .el-submenu__icon-arrow {
    display: inline;
  }

  .ucn-header .el-menu--horizontal > .el-submenu:focus .el-submenu__title,
  .ucn-header .el-menu--horizontal > .el-submenu:hover .el-submenu__title {
    color: #909399;
  }
</style>
