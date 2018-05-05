<template>
    <div class="track">
        <div class="title">
            trackBySKU
            <!-- {{$t('track.page.trackBySKU')}} -->
        </div>
        <div class="body">
            <v-table :data="dataList"></v-table>            
            <!-- <v-simple-table
                    class="speTable"
                    :data.sync="dataList"
                    :column="dataColumn"
                    @sort-change="getSort"
                    @page-change="pageChange">
            </v-simple-table> -->
        </div>
    </div>
</template>

<script>
    import VTable from '@/components/common/table/index'

    export default {
        name: "track-bySKU",
        components:{
            VSimpleTable
        },
        data(){
            return{
                dataList: [],
                dataColumn: [
                    // {
                    //     label:'id',
                    //     props:'id'
                    // },
                ],
            }
        },
        methods:{
            pageChange(page) {
                console.log(page)
            },
            getSort(val, key) {
                console.log(val, key)
            },
            getList() {
                this.ajax.get('/getTrackList').then((data)=>{
                    this.dataList = data;
                    this.dataColumn = this.$getTableColumn(data, 'track.tableData',{width:200});
                })
                // this.ajax.get('/getList').then((data) => {
                //     this.dataList = data;
                //     this.dataColumn = this.$getTableColumn(data, 'workbench.tableData');
                //     console.log(this.dataList,'yyy');
                //     console.log(this.dataColumn,'xxx');
                // });
            }
        },
        created(){
            this.getList();
        }
    }
</script>

<style scoped>
    .title{
        font-weight: bold;
        font-size: 18px;
        height: 32px;
        line-height: 32px;
        color:#666666;
    }
</style>