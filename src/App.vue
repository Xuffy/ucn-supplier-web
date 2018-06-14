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
        layout: state => state.layout
      }),
    },
    watch: {
      $route(val) {
        this.quickLink.draft = {show: false};
        this.quickLink.recycleBin = {show: false};
        this.quickLink.log = {show: false};

        this.layout.paddingRight = 0;
      }
    },
    created() {
      this.layout.hideMenu = this.$userAction.get('hideMenu');

    }
  }
</script>


<style lang="less">

  #app {
  }
</style>
