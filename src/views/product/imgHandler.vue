<template>
    <div style="display: inline-block">
        <div class="img-handler" v-for="(v,k) in data">
            <img :src="v" alt="">
            <i @click="deletePic(v,k)" class="el-icon-circle-close-outline"></i>
        </div>
    </div>
</template>

<script>
    export default {
        name: "img-handler",
        props:{
            data:{
                type:Array,
                default:[]
            }
        },
        data(){
            return{
                
            }
        },
        methods:{
            deletePic(e,index){
                this.data.splice(index,1);
            },
        }
    }
</script>

<style scoped>
    .img-handler{
        display: inline-block;
        /*width: 60px;*/
        height: 50px;
        border:1px solid #e0e0e0;
        position: relative;
        margin-left: 15px;
    }
    .img-handler img{
        height: 50px;
        width: 80px;
    }
    .img-handler i{
        position: absolute;
        right: -10px;
        top:-10px;
        font-size: 20px;
    }
</style>