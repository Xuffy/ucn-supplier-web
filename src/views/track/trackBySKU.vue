<template>
    <div class="track">
        <div class="title">
            trackBySKU
            <!-- {{$t('track.page.trackBySKU')}} -->
        </div>
        <div class="body">
          <div class="search">
            <select-search
              v-model="searchId"
              class="search"
              :options=options
              @inputEnter="inputEnter"
              :searchLoad="searchLoad">
            </select-search>
          </div>
        </div>
            <v-table 
            :data="dataList" 
            :height="500"
            :loading='loading'></v-table>
             <page
              :page-data="pageData"
              @change="handleSizeChange"
              @size-change="pageSizeChange"></page>
    </div>
</template>

<script>
  import { VTable,selectSearch,VPagination } from '@/components/index'

    export default {
        name: "track-track",
        components:{
          selectSearch,
          VTable,
          page:VPagination
        },
        data(){
            return{
                dataList: [],
                searchLoad: false,
                loading: false,
                searchId:'1',
                pageData:{},
                params:{
                    pn: 1,
                    ps: 10,
                    skuCode:'',
                },
              options: [{
                id: '1',
                label: 'skuCode'
              }],
            }
        },
        methods:{
            pageChange(page) {
                console.log(page)
            },
            getSort(val, key) {
                console.log(val, key)
            },
            handleSizeChange(val) {
                this.params.pn = val;
                this.getList();
            },
            pageSizeChange(val) {
                this.params.ps = val;
                this.getList();
            },
            inputEnter(val) {
              if (!val.keyType) return this.$message('请选中搜索类型');
              if (!val.key) return this.$message('搜索内容不能为空');
              if (val.keyType == '1') {
                this.params.skuCode= val.key
              }
              this.getList()
            },
            getList() {
                this.loading = true;
                this.$ajax.post(this.$apis.get_track_getTrackInfoByPage,this.params).then(res=>{
                    this.loading = false;
                    this.dataList = this.$getDB(this.$db.track.track, res.datas,item=>{
                        return item;
                    });
                this.pageData=res;
              }).catch(err=>{
                this.loading = false;
              });
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
