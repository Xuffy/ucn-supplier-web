<template>
  <el-row class="btns" :style="{ width: '100%', paddingLeft: hideMune ? '65px' : '195px' }">
    <div v-if="!edit">
      <el-button size="mini" type="primary" @click.stop="$emit('switchEdit')">{{ $i.logistic.modify }}</el-button>
      <el-button size="mini" type="primary">{{ $i.logistic.confirm }}</el-button>
      <el-button size="mini" type="primary">{{ $i.logistic.cancel }}</el-button>
      <el-button size="mini" type="primary">{{ $i.logistic.copy }}</el-button>
      <el-button size="mini" type="primary">{{ $i.logistic.placeLogisticsPlan }}</el-button>
      <el-button size="mini" type="primary">{{ $i.logistic.download }}</el-button>
      <el-button size="mini" type="danger">{{ $i.logistic.delete }}</el-button>
    </div>
    <div v-else>
      <el-button size="mini" type="primary" @click.stop="$emit('saveAsDraft')" v-if="!planId">{{ $i.logistic.saveAsDraft }}</el-button>
      <el-button size="mini" type="primary" @click.stop="$emit('savePlan')">{{ $i.logistic.send }}</el-button>
      <el-button size="mini" type="danger" @click.stop="$emit('toExit')">{{ $i.logistic.exit }}</el-button>
    </div>
  </el-row>
</template>
<script>
export default {
  props: {
    planId: {
      type: String,
      default: ''
    },
    edit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      btnWidth: 0,
      scale: 1
    }
  },
  computed: {
    hideMune () {
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
