<template>
  <div class="ucn-image" ref="image"
       @click="val => {$emit('click', val)}"
       :style="{height:height, width:width}">

    <div class="image" :style="{backgroundImage:'url('+ src +')'}"></div>

    <i class="iconfont icon-tupiantujpg" :style="{fontSize:iconSize + 'px'}"></i>
    <!---->
    <!-- <img style="width: 100px;height: 100px" :src="src" onerror="this.src='https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1527578482&di=b0fbda4d9a1d6c30fc7bfec6da62fcb7&src=http://img.zcool.cn/community/01767058be2833a801219c77c0b81a.png@1280w_1l_2o_100sh.png';this.onerror=null"/>-->
  </div>
</template>

<script>
  export default {
    name: 'VImage',
    props: {
      src: {
        type: String,
        default: '',
      },
      height: {
        type: String,
        default: '100%',
      },
      width: {
        type: String,
        default: '100%',
      },
    },
    data() {
      return {
        iconSize: 0
      }
    },
    watch: {},
    mounted() {
      let {clientHeight, clientWidth} = this.$refs.image;
      this.iconSize = clientHeight <= clientWidth ? clientHeight : clientWidth;
    },
    methods: {}
  }
</script>

<style scoped>
  .ucn-image {
    position: relative;
    background-color: #F5F5F5;
  }

  .ucn-image .image {
    position: relative;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    z-index: 2;
  }

  .ucn-image > i {
    position: absolute;
    top: 50%;
    left: 50%;
    color: #cacaca;
    transform: translate(-50%, -50%);
  }
</style>
