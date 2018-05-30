<template>
   <div class='attachment'>
        <el-form  label-width="230px">
        <el-form-item class="form-list"
            :label="$i.attachment" prop="supplierName">     
            <Upload class='upload' @getres='getres'              :disabled='disabled'></Upload> 
            <div class="order_attchment" >   
                 <div class="attchment_content">
                    <span class='attchment_item' v-for='(item,index) in list'>
                        <span class="attchment_item_name">
                             <i class="el-icon-document" style='color:#BEBEBE'></i>
                             <p>{{item.name}}</p>
                        </span>   
                          <button  class='el_delete' :disabled='disabled' @click.prevent='deleteFile(index)'>     
                                 <i class="el-icon-circle-close" style='color:#f56c6c;fontSize:16px'></i>
                           </button> 
                    </span> 
                       
                </div>      
            </div>
         </el-form-item>    
        </el-form>  
    </div>
</template>
<script>
    /*自己ref拿 上传的url数组*/
    import {
        VUpload
    } from '@/components/index';
    export default {
        name: "attchment",
        props: {
            //....attchment的数据
            list: {
                type: Array,
                default: function() {
                    return []
                }
            },
            disabled: {
                type: Boolean,
                default: true
            }
        },
        components: {
            Upload:VUpload
        },
        data() {
            return {}
        },
        methods: {
            deleteFile(index) {
                this.list.splice(index, 1)

            },
            //上传成功拿到的data //
            getres(data) {
                this.list.push(data)
            },

        },
        created() {

        },
    }

</script>
<style scoped="true">
    .attachment {
        /*        height: 100px;*/
    }

    .order_attchment {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        margin-top: 10px;
    }

    .upload {
        margin-top: 10px;
    }


    .attchment_content {
        width: 100%;
        height: ;
        overflow: auto;
        display: flex;
        flex-wrap: wrap;
    }

    .el-icon-document {
        font-size: 40px;
    }

    .attchment_item {
        height: 40px;
        display: flex;
        justify-content: flex-start;
        padding: 4px;
        margin-right: 10px;
    }

    .attchment_item_name {
        display: flex;
        justify-content: flex-start;
        align-items: flex-end;
        width: 150px;
    }

    .attchment_item_name p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .attchment_title {
        font-size: 14px;
        height: 60px;
        line-height: 60px;
        border-bottom: 1px solid #ccc;
        padding: 0 15px;

    }

    .el_delete {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: white;
        border: 0;
        display: flex;
        justify-content: center;
        align-items: center
    }

</style>
