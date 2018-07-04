<template>
  <el-row class="btns" :style="{ width: '100%', paddingLeft: hideMune ? '65px' : '195px' }">
    <div v-if="!edit">
      <div v-if="logisticsStatus.supplierRecived==0">
        <el-button size="mini" type="primary" @click.stop="$emit('switchEdit','receive')">{{ $i.logistic.receive }}</el-button>
        <el-button size="mini" type="primary" @click.stop="$emit('switchEdit','refuse')">{{ $i.logistic.refuse }}</el-button>
      </div>
      <div v-else>
        <el-button size="mini" type="primary" v-if="pageType!='loadingListDetail'&&(logisticsStatus.status==1||logisticsStatus.status==3)&&logisticsStatus.recived!=0"
          @click.stop="$emit('switchEdit', 'modify')">{{ $i.logistic.modify }}</el-button>
        <el-button size="mini" type="primary" v-if="pageType=='loadingListDetail'&&(logisticsStatus.status==1||logisticsStatus.status==3)"
          @click.stop="$emit('switchEdit', 'modify')">{{ $i.logistic.modify }}</el-button>
        <el-button size="mini" type="primary" v-if="pageType=='loadingListDetail'&&logisticsStatus.status==2&&!DeliveredEdit" @click.stop="$emit('switchEdit','DeliveredEdit')">{{ $i.logistic.modify }}</el-button>
        <el-button size="mini" type="primary" v-if="pageType!='loadingListDetail'&&logisticsStatus.status==1&&logisticsStatus.recived!=0" @click.stop="$emit('switchEdit','confirm')">{{ $i.logistic.confirm }}</el-button>
        <el-button size="mini" type="primary" v-if="!DeliveredEdit && logisticsStatus.status==3&&pageType!='loadingListDetail'&&logisticsStatus.recived!=0" :disabled="logisticsStatus.recived==0"
          @click.stop="$emit('switchEdit','generateList')">{{ $i.logistic.generateList }}</el-button>

        <el-button size="mini" type="danger" v-if="logisticsStatus.status==2&&DeliveredEdit" @click.stop="$emit('switchEdit','DeliveredEditExit')">{{ $i.logistic.cancelModify }}</el-button>
        <el-button size="mini" type="danger" v-if="logisticsStatus.status==2&&DeliveredEdit" @click.stop="$emit('sendData', 'send')">{{ $i.logistic.confirmModify }}</el-button>

        <el-button size="mini" type="primary" v-if="!edit&&!DeliveredEdit" @click.stop="$emit('switchEdit','download')">{{ $i.logistic.download }}</el-button>
        <el-button size="mini" type="primary" v-if="pageType!='loadingListDetail'&&!DeliveredEdit &&logisticsStatus.status!=5" @click.stop="$emit('switchEdit','cancel')">{{ $i.logistic.cancel }}</el-button>
        <el-button size="mini" type="primary" v-if="pageType=='loadingListDetail'&&!DeliveredEdit &&logisticsStatus.status!=4" @click.stop="$emit('switchEdit','cancelLoadingList')">{{ $i.logistic.cancelLoadingList }}</el-button>
      </div>
    </div>
    <div v-else>
      <el-button size="mini" type="danger" @click.stop="$emit('switchEdit', 'cancelModify')">{{ $i.logistic.cancelModify }}</el-button>
      <el-button size="mini" type="danger" @click.stop="$emit('sendData', 'send')">{{ $i.logistic.confirmModify }}</el-button>
    </div>
  </el-row>
</template>
<script>
  export default {
    props: {
      planId: [String, Number],
      isCopy: [String, Number],
      logisticsStatus: [Object],
      DeliveredEdit: [Boolean],
      edit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        btnWidth: 0,
        scale: 1
      }
    },
    computed: {
      pageType() {
        return this.$route.name;
      },
      hideMune() {
        return this.$store.state.layout.hideMenu
      }
    }
  }

</script>
<style lang="less" scoped>
  .btns {
    transition: padding-left .5s;
    border-top: 1px solid #ccc;
    padding: 15px 0;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 100;
  }

</style>
