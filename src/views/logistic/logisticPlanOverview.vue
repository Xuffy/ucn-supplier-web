<template>
  <div class="logistic-plan-overview">
    <div class="hd-top">{{ headerText }}</div>
    <div class="status">
      <div class="btn-wrap">
        <div v-if="pageType === 'plan' || pageType === 'loadingList'">
          <span>{{ $i.logistic.status}}:</span>
          <el-radio-group v-model="fillterVal" size="mini" @change="viewByChange(viewBy)">
            <el-radio-button label="all">{{ $i.logistic.all }}</el-radio-button>
            <el-radio-button :label="+a.code" v-for="a of ls_plan" :key="'status-' + a.code">{{a.name}}</el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <div class="select-search-wrap">
        <select-search :options="options" @inputEnter="searchFn"/>
      </div>
    </div>
    <div class="btn-wrap">
      <div class="fn btn">
        <el-button>{{ $i.logistic.download }}({{ selectCount.length || $i.logistic.all }})</el-button>
        <el-button @click.stop="addNew">{{ $i.logistic.placeLogisticPlan }}</el-button>
        <el-button type="danger" :disabled="!!viewBy || !selectCount.length" @click.stop="deleteData">{{ $i.logistic.delete }}</el-button>
      </div>
      <div class="view-by-btn">
        <span>{{ $i.logistic.viewBy }}&nbsp;</span>
        <el-radio-group v-model="viewBy" size="mini">
          <el-radio-button 
            v-for="item in $db.logistic.overviewBtn"
            :key="item.index"
            :label="item.index"
            >
            {{ item.label }}
          </el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <v-table
    :data="tabData"
    :buttons="!viewBy ? [{label: 'detail', type: 'detail'}] : null"
    @action="action"
    @change-checked="changeChecked"
    :loading="tableLoading"
    ref="tab"
    />
    <v-pagination :page-data="pageObj" @page-size-change="sizeChange" @page-change="pageChange"/>
</div>
</template>
<script>
import { selectSearch, VTable, VPagination } from '@/components/index';
export default {
  name: 'logisticPlanOverview',
  props: {
    pageType: String
  },
  data () {
    return {
      pageObj: {},
      tableLoading: false,
      ls_plan: [],
      pageParams: {
        pn: 1,
        ps: 10
      },
      totalCount: 0,
      selectCount: [],
      fillterVal: 'all',
      tabColumn: [],
      tabData: [],
      viewBy: 0,
      options: [
        {
          id: 'logisticsNo',
          label: 'logistic Plan No'
        },
        {
          id: 'skuCode',
          label: 'SKU Code'
        },
        {
          id: 'orderNo',
          label: 'Order No'
        }
      ]
    }
  },
  components: {
    selectSearch,
    VTable,
    VPagination
  },
  watch: {
    viewBy (newVal) {
      this.selectCount = []
      this.viewByChange(newVal)
    },
    pageType () {
      this.fetchData()
    }
  },
  computed: {
    headerText () {
      return this.pageType === 'plan' ? this.$i.logistic.logisticsPlanOverview : this.pageType === 'loadingList' ? this.$i.logistic.loadingListOverview : this.pageType === 'draft' ? this.$i.logistic.draftOverview : this.$i.logistic.archiveOverview
    }
  },
  mounted () {
    this.fetchData()
    this.registerRoutes()
  },
  methods: {
    registerRoutes () {
      this.$store.commit('SETDRAFT', {
        name: 'overviewDraft',
        show: true
      })
      this.$store.commit('SETRECYCLEBIN', {
        name: 'overviewArchive',
        show: true
      })
    },
    fetchData () {
      if (this.pageType === 'plan') {
        this.getDictionary(['LS_PLAN'])
        this.getContainerType()
        this.viewByChange(this.viewBy)
      }
      if (this.pageType === 'loadingList') {
        this.getDictionary(['LS_STATUS'])
      }
    },
    deleteData () {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$ajax.post(this.$apis.delete_by_ids, {ids: this.selectCount.map(a => a.id.value)}).then(res => {
          this.viewByChange(this.viewBy)
          this.selectCount = []
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      })
    },
    changeChecked (arr) {
      this.selectCount = arr
    },
    action (e) {
      this.$router.push({path: '/logistic/planDetail', query: {id: e.id.value}})
    },
    searchFn (obj) {
      const { pn, ps } = this.pageParams
      this.pageParams = {pn, ps, [obj.keyType]: obj.key}
      this.viewByChange(this.viewBy)
    },
    sizeChange (e) {
      this.pageParams.ps = e
      this.viewByChange(this.viewBy)
    },
    pageChange (e) {
      this.pageParams.pn = e
      this.viewByChange(this.viewBy)
    },
    addNew () {
      this.$router.push('/logistic/placeLogisticPlan')
    },
    viewByChange (viewId) {
      viewId === 0 ? this.getPlanList() : viewId === 1 ? this.getTransportationList() : this.getSKUList()
    },
    getDictionary (keyCode) {
      this.$ajax.post(this.$apis.get_dictionary, keyCode).then(res => {
        this.ls_plan = res[0].codes
      })
    },
    getContainerType () {
      this.$ajax.get(this.$apis.get_container_type, '_cache').then(res => {
        this.containerType = res
      })
    },
    getPlanList () {
      this.tableLoading = true
      const lgStatus = this.fillterVal === 'all' ? [] : [this.fillterVal]

      this.$ajax.post(this.$apis.gei_plan_list, {lgStatus, ...this.pageParams}).then(res => {
        if (!res) return (this.tableLoading = false)
        this.totalCount = res.tc
        this.tabData = this.$getDB(this.$db.logistic.planList, res.datas, item => {
          _.mapObject(item, val => {
            val.type === 'textDate' && val.value && (val.value = this.$dateFormat(val.value, 'yyyy-mm-dd'))
            return val
          })
        })
        this.pageObj = res
        this.tableLoading = false
      })
    },
    getTransportationList () {
      this.tableLoading = true
      const lgStatus = this.fillterVal === 'all' ? [] : [this.fillterVal]

      this.$ajax.post(this.$apis.get_transportation_list, {lgStatus, ...this.pageParams}).then(res => {
        if (!res) return (this.tableLoading = false)
        this.totalCount = res.tc
        this.tabData = this.$getDB(this.$db.logistic.transportationList, res.datas, item => {
          _.mapObject(item, val => {
            if (val.type === 'select' && val.value) {
              let obj = this.containerType.find(a => a.code === val.value)
              val.value = obj ? obj.name : null
            }
            val.type === 'textDate' && val.value && (val.value = this.$dateFormat(val.value, 'yyyy-mm-dd'))
            return val
          })
        })
        this.pageObj = res
        this.tableLoading = false
      })
    },
    getSKUList () {
      this.tableLoading = true
      const lgStatus = this.fillterVal === 'all' ? [] : [this.fillterVal]

      this.$ajax.post(this.$apis.get_SKU_list, {lgStatus, ...this.pageParams}).then(res => {
        if (!res) return (this.tableLoading = false)
        this.totalCount = res.tc
        this.tabData = this.$getDB(this.$db.logistic.sku, res.datas, item => {
          _.mapObject(item, val => {
            val.type === 'textDate' && val.value && (val.value = this.$dateFormat(val.value, 'yyyy-mm-dd'))
            return val
          })
        })
        this.pageObj = res
        this.tableLoading = false
      })
    }
  }
}
</script>
<style lang="less" scoped>
.logistic-plan-overview {
  margin-top: 20px;
  .hd-top {
    font-size: 18px;
    color: #666;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #ccc;
    padding: 0 15px;
  }
  .btn-wrap {
    padding:10px;
    display:flex;
    justify-content: space-between;
    .view-by-btn {
      display:flex;
      align-items: center;
      span {
        font-size:14px;
        color:#999;
      }
      button {
        padding:3px 5px;
      }
    }
  }
  .status {
    display:flex;
    height: 60px;
    align-items: center;
    justify-content:space-between;
    padding:0 15px;
    box-sizing: border-box;
    .btn-wrap {
      display:flex;
      align-items: center;
      span {
        font-size:14px;
        margin-right:10px;
      }
      button {
        padding:2px 5px;
        cursor: pointer;
        transition: all .5s ease;
      }
    }
    .select-wrap {
      display:flex;
      align-items:center;
      .select {
        width: 110px;
        margin-right:5px;
        input {}
      }
    }
  }
}
</style>
