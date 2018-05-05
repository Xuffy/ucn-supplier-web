<template>
    <div>
        <product
                :title="title"
                :type="type"></product>
        <!--<product-->
                <!--:title="title"-->
                <!--:type="type"-->
                <!--:hideBtn="false"-->
                <!--:disabledLine="disabledLine"-->
                <!--@handleOK="getList"-->
                <!--@handleCancel="handleCancel"></product>-->
    </div>
</template>
<script>

    import product from '../addProduct'
    export default {
        name:"sourcing",
        components:{
            product
        },
        data(){
            return{
                title:this.$i.product.title,
                type:'product',
            }
        },
        methods:{

        }
    }
</script>
<style scoped>

</style>