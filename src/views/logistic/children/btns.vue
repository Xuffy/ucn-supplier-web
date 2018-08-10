<template>
  <el-row class="btns" :style="{ width: '100%', paddingLeft: hideMune ? '65px' : '195px' }">
    <div v-if="!edit">
      <div v-if="logisticsStatus.supplierRecived==0&&(logisticsStatus.status!=4&&logisticsStatus.status!=5)">
        <el-button size="mini" type="primary" @click.stop="$emit('switchEdit','receive')">{{ $i.logistic.receive }}</el-button>
        <el-button size="mini" type="primary" @click.stop="$emit('switchEdit','refuse')">{{ $i.logistic.refuse }}</el-button>
      </div>
      <div v-if="logisticsStatus.supplierRecived!=0">
        <!-- plan modify-->
        <el-button size="mini" v-authorize="auth[pageType]&&auth[pageType].MODIFY||''" type="primary" v-if="pageType=='logisticPlanDetail'&&(logisticsStatus.status==1||logisticsStatus.status==3)&&logisticsStatus.recived!=0"
          @click.stop="$emit('switchEdit', 'modify')">{{ $i.logistic.modify }}</el-button>
        
        <!-- loading modify-->
        <el-button size="mini" v-authorize="auth[pageType]&&auth[pageType].MODIFY||''" type="primary" v-if="pageType=='loadingListDetail'&&(logisticsStatus.status==0||logisticsStatus.status==1||logisticsStatus.status==3)&&isShow"
          @click.stop="$emit('switchEdit', 'modify')">{{ $i.logistic.modify }}</el-button>

        <!-- <el-button size="mini" v-authorize="auth[pageType]&&auth[pageType].MODIFY||''" type="primary" v-if="pageType=='loadingListDetail'&&logisticsStatus.status==2&&!DeliveredEdit"
          @click.stop="$emit('switchEdit','DeliveredEdit')">{{ $i.logistic.modify }}</el-button> -->

        <el-button size="mini" v-authorize="auth[pageType]&&auth[pageType].Confirm||''" type="primary" v-if="pageType!='loadingListDetail'&&logisticsStatus.status==1&&logisticsStatus.recived!=0"
          @click.stop="$emit('switchEdit','confirm')">{{ $i.logistic.confirm }}</el-button>

        <!-- plan generateList -->
        <el-button size="mini" type="primary" v-if="!DeliveredEdit && logisticsStatus.status==3&&pageType=='logisticPlanDetail'&&logisticsStatus.recived!=0&&beShipper==1"
          :disabled="logisticsStatus.recived==0" @click.stop="$emit('switchEdit','generateList')">{{ $i.logistic.generateList }}</el-button>

        <!-- <el-button size="mini" type="danger" v-if="logisticsStatus.status==2&&DeliveredEdit" @click.stop="$emit('switchEdit','DeliveredEditExit')">{{ $i.logistic.cancelModify }}</el-button>
        <el-button size="mini" type="danger" v-if="logisticsStatus.status==2&&DeliveredEdit" @click.stop="$emit('sendData', 'send')">{{ $i.logistic.confirmModify }}</el-button> -->

        <el-button size="mini" v-authorize="auth[pageType]&&auth[pageType].DOWNLOAD||''" type="primary" v-if="!edit&&!DeliveredEdit"
          @click.stop="$emit('switchEdit','download')">{{ $i.logistic.download }}</el-button>

        <!-- plan cancel-->
        <el-button size="mini" v-authorize="auth[pageType]&&auth[pageType].CANCEL||''" type="primary" v-if="pageType=='logisticPlanDetail'&&!DeliveredEdit &&logisticsStatus.status!=5"
          @click.stop="$emit('switchEdit','cancel')">{{ $i.logistic.cancel }}</el-button>
          
        <!-- <el-button size="mini" v-authorize="auth[pageType]&&auth[pageType].CANCEL_LOADINGLIST||''" type="primary" v-if="pageType=='loadingListDetail'&&!DeliveredEdit &&logisticsStatus.status!=4"
          @click.stop="$emit('switchEdit','cancelLoadingList')">{{ $i.logistic.cancelLoadingList }}</el-button> -->
      </div>
    </div>
    <div v-else>
      <el-button size="mini" type="danger" @click.stop="$emit('switchEdit', 'cancelModify')">{{ $i.logistic.cancelModify }}</el-button>
      <el-button size="mini" type="danger" @click.stop="$emit('sendData', 'send')">{{ $i.logistic.confirmModify }}</el-button>
      <el-checkbox v-model="isDelay" @change="isDelayFun">{{$i.logistic.isDelay}}</el-checkbox>
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
      beShipper: [Boolean,Number,],
      basicInfoArr: [Array],
      listData: Array,
      selectArr: [Array, Object],
      btnModifyTime:[Array,Object],
      shipmentStatus:[Number,String],
      edit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isDelay: false,
        btnWidth: 0,
        scale: 1,
        auth: {
          logisticPlanDetail: {
            DRAFT: 'LOGISTICS:PLAN_DETAIL:DRAFT',
            MODIFY: 'LOGISTICS:PLAN_DETAIL:MODIFY',
            DOWNLOAD: 'LOGISTICS:PLAN_DETAIL:DOWNLOAD',
            CANCEL: 'LOGISTICS:PLAN_DETAIL:CANCEL',
            Confirm: 'LOGISTICS:PLAN_DETAIL:Confirm'
          },
          loadingListDetail: {
            READ: 'LOADING_LIST:DETAIL:READ',
            DOWNLOAD: 'LOADING_LIST:DETAIL:DOWNLOAD',
            CANCEL_LOADINGLIST: 'LOADING_LIST:DETAIL:CANCEL'
          }
        },
      }
    },
    methods: {
      isDelayFun(v) {
        let status = 0;
        if (v) {
          status = 6;
          this.changeShipmentStatusOption(status);
        } else {
          this.modifyTime();
        }
      },
      CompareDate(d1, d2) {
        return ((new Date(d1.replace(/-/g, "\/"))) - (new Date(d2.replace(/-/g, "\/"))));
      },
      modifyTime() {
        let _shipmentStatus = this.basicInfoArr.find(el => el.key == 'shipmentStatus').value;
        let BookingTime;
        let LoadingTime;
        let cleanceTime;
        if (!_.isEmpty(this.btnModifyTime)) {
          BookingTime = this.$dateFormat(new Date(this.btnModifyTime.BookingTime), 'yyyy-mm-dd');
          LoadingTime = this.$dateFormat(new Date(this.btnModifyTime.LoadingTime), 'yyyy-mm-dd');
          cleanceTime = this.$dateFormat(new Date(this.btnModifyTime.cleanceTime), 'yyyy-mm-dd');
        } else {
          BookingTime = this.$dateFormat(new Date(this.listData[0].bookingDate.value), 'yyyy-mm-dd');
          LoadingTime = this.$dateFormat(new Date(this.listData[0].actContainerStuffingDate.value), 'yyyy-mm-dd');
          cleanceTime = this.$dateFormat(new Date(this.listData[0].actCustomsCleanceDate.value), 'yyyy-mm-dd');
        }
        let currTime = this.$dateFormat(new Date(), 'yyyy-mm-dd');
        let status = this.$depthClone(this.shipmentStatus);
        if (BookingTime && this.CompareDate(BookingTime, currTime) <= 0 && [0].includes(this.shipmentStatus)) {
          status = 1;
        }
        if (LoadingTime && this.CompareDate(LoadingTime, currTime) <= 0 && [0, 1, 2, 3].includes(this.shipmentStatus)) {
          status = 4;
        }
        if (cleanceTime && this.CompareDate(cleanceTime, currTime) <= 0 && [0, 1, 2, 3, 4].includes(this.shipmentStatus)) {
          status = 5;
        }
        this.changeShipmentStatusOption(status);
      },
      changeShipmentStatusOption(status) {
        this.basicInfoArr.find(el => el.key == 'shipmentStatus').disabled = true;
        let arr = this.$depthClone(this.selectArr.shipmentStatus).map(el => {
          el.disabled = true;
          return el;
        });
        if (status == 0 || status == 1) {
          this.basicInfoArr.find(el => el.key == 'shipmentStatus').disabled = false;
          arr = this.$depthClone(arr).map(el => {
            if (el.code == 2 || el.code == 3) {
              el.disabled = false;
            }
            return el;
          });
        } else if (status == 0 || status == 1 || status == 2) {
          this.basicInfoArr.find(el => el.key == 'shipmentStatus').disabled = false;
          arr = this.$depthClone(arr).map(el => {
            if (el.code == 3) {
              el.disabled = false;
            }
            return el;
          });
        }
        this.$set(this.selectArr, 'shipmentStatus', arr);
        this.$emit('shipmentStatus', status);
      }
    },
    computed: {
      isShow(){
        let flag = false;
        if(this.beShipper==1){
          if(this.$route.name=='loadingListDetail'){
            flag = true;
          }else{
           flag = false;  
          }
        }else{
          flag = false;
        }
        return flag;
      },
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
