<template>
    <div class="big-photo">
        <img @click="seeBigPhoto" src="../../../assets/images/login-back.jpg" alt="">

        <el-dialog
                title=""
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <el-carousel height="150px" class="banner">
                <el-carousel-item v-for="item in photoGroup" :key="item">
                    <img :src="item" style="width: 100%" alt="">
                </el-carousel-item>
            </el-carousel>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "big-photo",
        props:{
            photoGroup:{
                type:Array,
                default:[]
            }
        },
        data(){
            return{
                dialogVisible:false,

            }
        },
        methods:{
            seeBigPhoto(){
                this.dialogVisible=true;
            },

            handleClose(done){
                done();
            },
        }
    }
</script>

<style scoped>
    .big-photo{

    }
    .big-photo img{
        width: 3rem;
        height: 2rem;
        cursor: pointer;
    }

    .banner img{
        width: 100%;
        height: 100%;
    }
</style>