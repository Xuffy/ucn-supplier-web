<template>
    <el-button
            :loading="showCountDown || loading"
            @click="handleClick"
            :type="type"
            :disabled="disabled"
            class="ucn-count-button">
        <span v-if="$slots.default"><slot></slot></span>
        <span v-if="showCountDown">
            {{second}}
        </span>
    </el-button>
</template>

<script>

    /**
     *  timescale:"时间间隔(默认1s)"
     *  seconds:"倒计时总时间(默认60s)"
     *
     * */

    export default {
        name: "CButton",
        props:{
            type:{
                type:String,
                default:''
            },
            disabled:{
                type:Boolean,
                default:false
            },
            timescale:{
                type:Number,
                default:1000
            },
            seconds:{
                type:Number,
                default:60
            },
            loading:{
                type:Boolean,
                default:false,
            },
        },
        data(){
            return{
                second:this.seconds,
                showCountDown:false,        //是否显示倒计时
                timeInterval:''
            }
        },
        methods:{
            handleClick(){
                this.$emit('click');
            },
            start(){
                this.showCountDown=true;
                this.timeInterval=setInterval(()=>{
                    this.second--;
                },this.timescale);
            },
        },
        watch:{
            second(n){
                if(n===0){
                    clearInterval(this.timeInterval);
                    this.showCountDown=false;
                    this.second=60;
                }
            }
        },
        beforeDestroy(){
            clearInterval(this.timeInterval);
        },

    };
</script>

<style scoped>

</style>