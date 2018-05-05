<template>
    <div>
        <product
                :title="title"
                :type="type"
                :hideBtn="true"></product>
    </div>
</template>

<script>

    import product from '../../../views/product/addProduct'

    export default {
        name: "recycle-bin",
        components:{
            product
        },
        data(){
            return{
                title:'Product Recycle Bin',
                type:'recycle'
            }
        },
        methods:{

        },
    }
</script>

<style scoped>

</style>