<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import {mapActions, mapState} from 'vuex';

  export default {
    name: 'app',
    components: {},
    computed: {
      ...mapState({
        quickLink: state => state.quickLink,
        layout: state => state.layout,
        menuLink: state => state.menuLink
      }),
    },
    watch: {
      $route(val) {
        this.menuLink.list = [];

        this.layout.paddingRight = 0;
      }
    },
    created() {
      this.menuLink.list = [];
      this.layout.hideMenu = this.$userAction.get('hideMenu');

    }
  }
</script>


<style lang="less">

  #app {
  }
</style>
