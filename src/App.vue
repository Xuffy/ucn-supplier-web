<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

  export default {
    name: 'app',
    components: {},
    watch: {
      $route(val) {
        this.$store.state.quickLink.draft = {show: val.meta.draft};
        this.$store.state.quickLink.recycleBin = {show: val.meta.recycleBin};
        this.$store.state.quickLink.log = val.meta.log;

        this.$store.state.layout.paddingRight = 0;
        /*if (_.isEmpty(val.meta.messageBoard)) {
          this.$store.state.messageBoard = {};
        } else {
          this.$store.state.messageBoard.module = val.meta.messageBoard.module;
          this.$store.state.messageBoard.code = val.meta.messageBoard.code;
        }*/
      }
    },
  }
</script>


<style lang="less">

  #app {
  }
</style>
