<template>
  <div class='uploadDialog'>  
     <div class='address'>
         Address&nbsp :&nbsp 
         <upload></upload>
     </div>   
      <div class='download'>
         Template : 
         <span class="filename">{{filename}}</span>    
         <el-button type="primary" icon="el-icon-download" > download</el-button>

     </div>
     <div class="uploadDialog_text">
         <p>Operating Instructions:</p>
         <p>1.Please upload this files with the same format with our template.</p>
         <p>2.if you don't know what kind of files are acceptable,please download our template to instruct yourself.</p>
     </div>
  </div>
</template>

<script>
    import upload from '@/components/common/upload/upload.vue'
    export default {
        name: 'uploadDialog',
        props:{
            //文件名字
            filename:{
                type:String,
                default:'filename'
            },
            //下载地址
            fileUrl:{
                type:String,
                default:'www.baidu.com'
            },
        },
        components: {
            upload,
        },
        data() {
            return {}
        },
        watch: {},
        created() {},
        methods: {

        }
    }

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    .uploadDialog {
        width: 400px;
        word-wrap: break-word;
        font-size: 13px;
    }

    .uploadDialog_text {
        margin-top: 20px;
    }

    .download {
        margin-top: 6px;
    }

    .address {
        display: flex;
        justify-content: flex-start;
        align-items: center
    }

    .filename {
        text-decoration: underline;
        margin-right: 5px;
    }

</style>
