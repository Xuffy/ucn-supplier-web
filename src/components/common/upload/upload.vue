<template>
  <div class='upload'>
    <el-upload 
             :action="action" 
             :accept="accept"
             :maxsize='maxsize'  
             :multiple='multiple'
             :on-progress='handleProgress'
             :on-success="handleSuccess"
             :on-error='handleError'
             :show-file-list="uploadList"           
             :before-upload='handelBefore'
             :disabled='disabled'
            >
        <el-button size="small" type="primary" :loading="loadingStatus">
        <i class="el-icon-upload2"></i>{{ loadingStatus ? 'Uploading' : 'Upload files' }}</el-button>
    </el-upload>  
  </div>
</template>

<script>
    export default {
        name: 'upload',
        props: {
            //默认大小2048
            maxsize: {
                type: Number,
                default: 2048
            },
            //格式 (application/vnd.openxmlformats-officedocument.spreadsheetml.sheet xlsl,image/jpeg img)
            accept: {
                type: String,
                default: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet xlsl,application/msexcel,application/msword'
            },
            // 文件地址
            action: {
                type: String,
                default: 'https://jsonplaceholder.typicode.com/posts/'
            },
            //禁止上传状态
            disabled: {
                type: Boolean,
                default: false
            },
            //是否批量上传
            multiple: {
                type: Boolean,
                default: false
            }
        },
        components: {

        },
        data() {
            return {
                uploadList: false,
                loadingStatus: false,
                fileName: '',
                isuploadsuccess: false //是否上传成功
            }
        },
        created() {

        },
        methods: {
            //.......................上传前做的一些格式 大小的限制
            handelBefore(file) {
                this.fileName = file.name
                const isType = this.accept === 'all' || this.accept.indexOf(file.type) != -1;
                const isSize = file.size / 1024 / 1024 < this.maxsize;
                if (!isType) {
                    console.log('in')
                    this.$message.error('上传格式不对!');
                }
                if (!isSize) {
                    this.$message.error('上传头像图片大小不能超过 !' + this.maxsize);
                }
                return isType && isSize;
            },
            //........................上传成功的回调函数 
            //........................$emit uploadsuccess通知父组件上传成功，父组件根据这个成功做相应处理(messageboard根据这个值做相应数据更新)
            //........................$emit getres函数 response,response, file, fileList参数 后台返回参数 
            handleSuccess(response, file, fileList) {
                this.$notify.success({
                    title: 'success',
                    message: 'File format of ' + this.fileName + ' is success',
                    duration: 1000
                });
                this.loadingStatus = false;
                this.isuploadsuccess = true;
                //.............................这里我只发送了一个是否成功的值
                this.$emit('uploadsuccess', this.isuploadsuccess)
                //............................这里发送的是后台返回的response            
                this.$emit('getres', file)
            },
            //...............上传进行中 这里给按钮了一个加载loading
            handleProgress(file) {
                this.loadingStatus = true;
            },
            //................上传失败
            handleError(file) {
                this.$notify.warning({
                    title: 'failed',
                    message: 'File format of ' + this.fileName + ' is failed',
                    duration: 1000
                });
                this.loadingStatus = false
            },
        },
        mounted() {},
    }

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>


</style>
