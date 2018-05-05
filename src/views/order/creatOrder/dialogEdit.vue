<template>
    <div class="QuickCreate">
       <div class="select_div">
             <div class="viewBy">
                <span>View by&nbsp</span>
                   <el-radio-group v-model="params.view" size="mini" >
                            <el-radio-button label=1>{{($i.common.order)}}</el-radio-button>
                            <el-radio-button label=2>{{($i.common.SKU)}}</el-radio-button>
                    </el-radio-group>
            </div>
           <selectSearch></selectSearch>
       </div> 
        <div>
             <v-table  :data="tabData" 
              style='marginTop:10px'/>
        </div>
    </div>
</template>

<script>
    import {
        VTable,
        selectSearch
    } from '@/components/index';
    export default {
        name: "dialogEdit",
        components: {
            VTable,
            selectSearch
        },
        props: {

        },
        data() {
            return {
                options: [{
                    value: '选项1',
                    label:'选项1' 
                }, {
                    value: '选项2',
                    label: '选项1'
                }, {
                    value: '选项3',
                    label: '选项1'
                }],
                value: '', //下拉框值
                input: '', //输入框内容
                tabColumn: [],
                tabData: [],
                params:{
                    view:''
                }
            }
        },
        methods: {

        },
        created() {
       
        },
        watch: {

        }
    }

</script>

<style scoped>

    .select_div{
        width: 100%;
        display: flex;
        justify-content: space-between
    }
  
</style>
