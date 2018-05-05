<template>
  <div class="orderOverview">
    <h3 class="hd">Order Overview</h3>
    <div class="status">
      <div class="btn-wrap">
        <span>Status&nbsp</span>
        <el-radio-group v-model="params.skuInventoryStatusDictCode" size="mini" @change="getdata()">
          <!--<el-radio-button label=" ">{{($i.common.all)}}</el-radio-button>-->
          <el-radio-button label="WAIT_FOR_QC"> {{ $i.common.waitingQC }}</el-radio-button>
          <el-radio-button label="APPLY_FOR_REWORK">{{($i.common.applyRework)}}</el-radio-button>
          <el-radio-button label="CONFIRMATION_OF_REWORK">{{($i.common.confirmedRework)}}</el-radio-button>
          <el-radio-button label="APPLY_FOR_RETURN">{{($i.common.applyReturn)}}</el-radio-button>
          <el-radio-button label="CONFIRMATION_OF_RETURN">{{($i.common.confirmedReturn)}}</el-radio-button>
          <el-radio-button label="CONFIRMED">{{($i.common.confirmed)}}</el-radio-button>
        </el-radio-group>
      </div>
      <div class="select-wrap">
        <selectSearch
          :options=options
          @selectChange="selectChange"
          @inputEnter="inputEnter"
          v-model="warehouseSearch"
        ></selectSearch>
      </div>
    </div>
    <div class="fn">
      <div class="btn-wrap">
        <el-button @click='download'>{{($i.common.download)}}({{selectedDate.length}})</el-button>
      </div>
    </div>
    <!--form-->
    <v-table
      ref='vtable'
      :data="tabData"
      :buttons="[{label: 'detail', type: 1}]"
      @action="onAction"
      :loading='loading'
      @change-checked='checked'
      :height="450"
      style='marginTop:10px'/>
      <v-pagination
        :page-data.sync="params"
        @change="handleSizeChange"
        @size-change="pageSizeChange"
      />

  </div>
</template>
<script>
  /**
   * @param selectChange 下拉框 值发生变更触发
   * @param keyWord search框 值
   * @param options 下拉框 原始数据
   * @param value 下拉框 选中值
   */

  import { VTable,VPagination,dropDown,selectSearch } from '@/components/index';
  export default {
    name: 'orderOverview',
    components: {
      dropDown,
      VTable,
      selectSearch,
      VPagination
    },
    data() {
      return {
        value: '',
        keyWord: '',
        tabData: [],
        loading: false,
        warehouseSearch:'',
        rowspan: 1,
        pazeSize: [10, 20, 30, 40, 50, 100],
        options: [{
          id: '1',
          label: 'Order No'
        }, {
          id: '2',
          label: 'Sku Code',
        },{
          id:'3',
          label: 'Inbound No'
        }],
        keyType: '',
        pageTotal: 0,
        params: {
          companyId: 0,
          inboundNo: "",
          orderNo: "",
          outboundNo: "",
          // "ownerIds": [
          //   0
          // ],
          pn: 1,
          ps: 10,
          tc:0,
          qcOrderNo: "",
          skuCode: "",
          skuInventoryStatusDictCode: "WAIT_FOR_QC", //WAIT_FOR_QC
          sorts: [
            {
              nativeSql: true,
              orderBy: "inboundDate", //入库时间
              orderType: "ASC", //升序
              resultMapId: ""
            }
          ],
          tenantId: ''
        },
        selectedDate: [],
        selectedNumber: []
      }
    },
    methods: {
      onAction(item, type) {
      //点击后跳转到此SKU的产品详情页
        this.$windowOpen({
          url: 'product/sourcingDetail',
          params: {
             id:item.skuId
          }
        });
      },
      handleSizeChange(val) {
        this.params.pn = val;
      },
      pageSizeChange(val) {
        this.params.ps = val;
      },
      selectChange(val) {
        this.keyType = val;
      },
      checked(item) {
        this.selectedDate = item
        var obj=[]
        this.selectedDate.forEach(item => {
          obj.push(item.id.value);
        });
        this.selectedNumber=obj
      },
      inputEnter(val) {
        if (!val.keyType) return this.$message('请选中搜索类型');
        if (!val.key) return this.$message('搜索内容不能为空');
        if (val.keyType == '1') {
          this.params.orderNo = val.key
          console.log(this.params.orderNo)
        } else if (val.keyType == '2'){
          this.params.skuCode = val.key
        }else{
          this.params.inboundNo = val.key
        }
        this.getdata()
      },
      download() {
        this.$ajax.post(this.$apis.download_order, {ids:this.selectedNumber})
          .then((res) => {
            console.log(res)
          })
          .catch((res) => {
            console.log(res)
          });
      },
      //get_orderlist数据
      getdata() {
        this.loading = true
        this.$ajax.post(this.$apis.post_warehouse_page, this.params)
          .then((res) => {
            res.tc ? this.params.tc = res.tc : this.params.tc = this.params.tc;
            this.tabData = this.$getDB(this.$db.warehouse.warehouseTable, res.datas, item => {
              _.mapObject(item, val => {
                val.type === 'textDate' && val.value && (val.value = this.$dateFormat(val.value, 'yyyy-mm-dd'))
                return val
              })
            })
            this.loading = false
          })
          .catch((res) => {
            this.loading = false
          });
      }
    },
    computed: {

    },
    created() {
      this.getdata()
    },
    mounted() {
      this.loading = false
    },
    updated() {

    },
    watch: {
      status(){
         console.log(1)
      },
      params: {
        handler(val, oldVal) {
          this.getdata();
        },
        deep: true
      }

    }
  }

</script>
<style scoped>
  >>>.el-input-group__append {
    padding: 0 !important;
  }

</style>
<style lang="less" scoped>
  .orderOverview {
  .hd {
    height: 50px;
    line-height: 50px;
    color: #666;
    border-bottom: 1px solid #ccc;
    font-size: 18px;
    color: #666666;
  }
  .status {
    display: flex;
    height: 60px;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    box-sizing: border-box;
  .btn-wrap {
    display: flex;
    align-items: center;
  span {
    font-size: 14px;
  }
  button {
    padding: 2px 5px;
    cursor: pointer;
    border: 1px solid #108ee9;
    background-color: #fff;
    margin-left: 10px;
    border-radius: 5px;
    transition: all .5s ease;
  &:hover,
  &.active {
     background-color: #108ee9;
     color: #fff;
   }
  }
  }
  .select-wrap {
    display: flex;
    align-items: center;
  .select {
    width: 110px;
    margin-right: 5px;
  input {}
  }
  }

  }
  .fn {
    display: flex;
    justify-content: space-between;
    padding: 10px 15px;
    box-sizing: border-box;
  .viewBy {
    display: flex;
    align-items: center;
  span {
    font-size: 14px;
    color: #666;
  }

  .set {
    cursor: pointer;
    padding-left: 40px;
  /*                    color: #999;*/
  i {
    font-size: 25px;
  }
  .speDropdown {
    position: absolute;
    right: 40px;
    background-color: #ffffff;
    z-index: 2000;
    display: none
  }
  .speDropdownshow {
    position: absolute;
    right: 40px;
    background-color: #ffffff;
    z-index: 2000;

  }
  }
  }
  }

  }

</style>
