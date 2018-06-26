<template>
  <div class="ucn-image" ref="image"
       @click="val => {$emit('click', val)}"
       :style="{height:height, width:width}">

    <img class="image" :src="src" ref="image" v-holder="{text:'UCN',img:'100px100p'}">

    <!--onerror="this.src='holder.js/300x200?theme=red';this.onerror=null"-->
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
        iconSize: 0,
        errorImage: ''
      }
    },
    watch: {},
    mounted() {
    },
    methods: {}
  }
</script>

<style scoped>
  .ucn-image {
    position: relative;
    background: none;
    background-color: #f9f9f9;
    text-align: center;
  }

  .ucn-image:before {
    content: '';
    height: 100%;
    display: inline-block;
    vertical-align: middle;
  }

  .ucn-image .image {
    max-width: 100%;
    max-height: 100%;
    display: inline-block !important;
    vertical-align: middle;
  }
</style>
