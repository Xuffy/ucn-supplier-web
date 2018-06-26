<template>
  <div class="track">
    <div class="title">
      {{$i.track.trackBySKU}}
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
      code="track"
      :data="dataList"
      :height="500"
      :selection="false"
      :loading='loading' />
    <page
      :page-data="pageData"
      @change="handleSizeChange"
      :page-sizes="[50,100,200]"
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
        searchId:'',
        pageData:{},
        params:{
          "pn": 1,
          "ps": 50,
          "skuCodeLike":'',
          "orderNoLike":''
        },
        options: [{
          id: '1',
          label: 'skuCode'
        },{
          id: '2',
          label: 'orderNo'
        }],
        country:[]
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
        if (!val.label) return this.$message({
          message: 'please choose a type',
          type: 'warning'
        });
        if (val.id == '1') {
          this.params.skuCodeLike= val.value
        }else{
          this.params.orderNoLike= val.value
        }
        this.getList()
      },
      //获取国家
      getCountryAll(){
        this.$ajax.get(this.$apis.GET_COUNTRY_ALL).then(res=>{
          this.country = res
        }).catch(err=>{
          console.log(err)
        });
      },
      getList() {
        this.loading = true;
        this.$ajax.post(this.$apis.get_track_getTrackInfoByPage,this.params).then(res=>{
          this.loading = false;
          this.dataList = this.$getDB(this.$db.track.track, res.datas,item=>{
            let country;
            const one = item.skuCategoryOne.value || '';
            const two = item.skuCategoryTwo.value || '';
            const three = item.skuCategoryThree.value || ''
            const four = item.skuCategoryFour.value || ''
            if (one || two || three || four){
              item.category.value = one+','+two+','+three+','+four
            }
            _.mapObject(item, val => {
              val.type === 'textDate' && val.value && (val.value = this.$dateFormat(val.value, 'yyyy-mm-dd'))
              return val
            })
            return item;
          });
          this.pageData=res;
        }).catch(err=>{
          this.loading = false;
        });
      }
    },
    created(){
      this.getCountryAll();
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
    padding-bottom: 10px;
  }
  .head>div{
    margin-bottom: 10px;
  }
</style>
