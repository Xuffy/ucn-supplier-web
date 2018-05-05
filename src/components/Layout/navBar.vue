<template>
  <div class="nav-bar-box">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="(item,index) in navBarList" :key="index"
                          :to="{path:index === navBarList.length - 1 ? null : (item.redirect||item.path)}">
        {{item.meta ? item.meta.name : ''}}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
  export default {
    name: 'NavBar',
    data() {
      return {
        navBarList: null
      }
    },
    created() {
      this.updateBreadcrumb()
    },
    methods: {
      updateBreadcrumb() {
        let matched = this.$route.matched.filter(item => {
          return item.meta ? item.meta.name : '';
        });
        const first = matched[0];
        if (first && first.meta && (first.meta.name !== 'Home' || first.path !== '')) {
          matched = [{meta: {name: 'Home'}, path: '/'}].concat(matched)
        }
        this.navBarList = matched;
      }
    },
    watch: {
      $route() {
        this.updateBreadcrumb()
      }
    }
  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import '../../assets/style/base.less';

  .nav-bar-box {
    line-height: 40px;
    background-color: #F4F4F4;
    width: 100%;
    height: 40px;
    top: 60px;
    position: fixed;
    z-index: 905;
    padding-left: 15px;
  }

  .el-breadcrumb {
    height: 40px;
    line-height: 40px;
  }

</style>
<style>
  .nav-bar-box .el-breadcrumb__inner,
  .nav-bar-box .el-breadcrumb__inner a {
    font-size: 12px;
    font-weight: 400;
    color: #9f9f9f;
  }

  .nav-bar-box .el-breadcrumb__inner a:hover,
  .nav-bar-box .el-breadcrumb__inner:hover {
    color: #666666;
  }
</style>
