<template>
  <div class="view-picture">
    <el-dialog
      :visible.sync="visible"
      :show-close="false"
      custom-class="ucn-view-picture">
      <el-carousel :autoplay="false" height="60vh" class="banner">
        <el-carousel-item v-for="item in data" :key="item">
          <img :src="item" style="width: 100%" alt="">
        </el-carousel-item>
      </el-carousel>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'VViewPicture',
    props: {},
    data() {
      return {
        visible: false,
        data: [],
        // dialogVisible: false,
      }
    },
    methods: {
      show(pictures, split = ',') {
        if (_.isEmpty(pictures)) return false;

        if (_.toString(pictures)) {
          pictures = pictures.split(split);
        }

        this.visible = true;
        this.data = pictures;
      }
    }
  }
</script>

<style scoped>
  .view-picture {

  }

  .view-picture img {
    width: 3rem;
    height: 2rem;
    cursor: pointer;
  }

  .banner img {
    width: 100%;
    height: 100%;
  }
</style>
<style>
  .ucn-view-picture {
    background-color: rgba(0,0,0,0);
    box-shadow: inherit;
  }

  .ucn-view-picture .el-dialog__header {
    display: none;
  }

  .ucn-view-picture .el-carousel__item:before {
    content: '';
    height: 100%;
    width: 0;
    opacity: 0;
    display: inline-block;
    vertical-align: middle;
  }

  .ucn-view-picture .el-carousel__item img {
    max-width: 100%;
    max-height: 100%;
    width: 100%;
    height: 100%;
    display: inline-block;
    vertical-align: middle;
  }

  .ucn-view-picture .el-dialog__body {
    padding: 0;
  }
</style>
