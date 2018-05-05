<template>
  <div >
    <el-col :xs="raster" :sm="raster" :md="raster" :lg="raster" :xl="raster" v-for="(a, i) of exchangeRateList" :key="'list-' + i">
        
      <div class="right">
            <span>
                 <span v-if="a.currency=='CNY|USD'">exchange rate(￥-$)</span>
                 <span v-else-if="a.currency=='USD|CNY'">exchange rate($-￥)</span> 
                 <span v-else-if="a.currency=='CNY|EUR'">exchange rate(￥-€)</span> 
                 <span v-else-if="a.currency=='EUR|CNY'">exchange rate(€-￥)</span> 
                 <span v-else-if="a.currency=='USD|EUR'">exchange rate($-€)</span> 
                 <span v-else-if="a.currency=='EUR|USD'">exchange rate(€-$)</span>           
            </span>
            <el-input  v-model="a.exchangeRate"></el-input>
      </div>
    </el-col>
  </div>
</template>
<script>
    export default {
        name: 'exchange',
        data() {
            return {
                exchangeRateList: [{
                        currency: "CNY|USD",
                        exchangeRate: ''
                    },
                    {
                        currency: "USD|CNY",
                        exchangeRate: ''
                    },
                    {
                        currency: "CNY|EUR",
                        exchangeRate: ''
                    },
                    {
                        currency: "EUR|CNY",
                        exchangeRate: ''
                    },
                    {
                        currency: "USD|EUR",
                        exchangeRate: ''
                    },
                    {
                        currency: "EUR|USD",
                        exchangeRate: ''
                    }
                ],
                raster: 4
            }
        }
    }

</script>
<style lang="less" scoped>
    .right {
        display: flex;
        align-items: center;
        padding: 10px 0;
        span {
            width: 150px;
            white-space: nowrap;
            /*            overflow: hidden;*/
            text-overflow: ellipsis;
            display: inline-block;
            font-size: 12px;
            text-align: right;
            padding-right: 10px;
            box-sizing: border-box;
        }
        .el-select,
        .el-input {
            flex: 1;
        }
    }

</style>
