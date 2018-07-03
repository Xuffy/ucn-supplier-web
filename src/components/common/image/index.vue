<template>
  <div class="ucn-image" v-if="src && src.indexOf('http') > -1"
       @click="val => {$emit('click', val)}"
       :style="{height:height, width:width}">

    <img class="image" :src="src" ref="image">
    <!--<img class="image" v-else src="holder.js/100px100p?text=%20&amp;outline=yes" ref="defaultImage">-->
    <!--onerror="this.src='holder.js/300x200?theme=red';this.onerror=null"-->
  </div>
</template>

<script>
  // import Holder from 'holderjs';

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
      return {}
    },
    watch: {},
    created() {
    },
    mounted() {
      /*console.log(this.$refs.image)
      this.$refs.image.onerror = () => {
        this.showImage = false;
        this.$refs.image.onerror = null;
      };
      Holder.run({
        images: this.$refs.defaultImage
      });*/
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
