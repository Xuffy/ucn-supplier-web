<template>
  <div>
    <div class="hd"></div>
    <div class="hd active">{{ title }}</div>
		<table border="0" v-if="listData.length>0">
			<tr>
        <th>{{$i.logistic.dateName}}</th>
        <th>{{$i.logistic.EstDate}}</th>
        <th>{{$i.logistic.ActDate}}</th>
      </tr>
      <tr v-if="listData[0].bookingDate">
        <td>{{$i.logistic.Booking}}</td>
        <td>--</td>
        <td>
          <span v-if="!edit||pageTypeCurr=='loadingListDetail'">{{$dateFormat(listData[0].bookingDate.value, 'yyyy-mm-dd')}}</span>
          <el-date-picker @change="modifyTime(listData[0].bookingDate.value,listData[0].bookingDate._key)" v-if="edit&&(pageTypeCurr=='logisticPlanDetail'||pageTypeCurr=='placeLogisticPlan')" format="yyyy-MM-dd" v-model="listData[0].bookingDate.value" align="right" type="date" :placeholder="$i.logistic.placeholder"/>
        </td>
      </tr>
      <tr v-if="listData[0].actContainerStuffingDate">
        <td>{{$i.logistic.Loading}}</td>
        <td>
          <span v-if="!edit||pageTypeCurr=='loadingListDetail'">{{$dateFormat(listData[0].estContainerStuffingDate.value, 'yyyy-mm-dd')}}</span>
          <el-date-picker v-if="edit&&(pageTypeCurr=='logisticPlanDetail'||pageTypeCurr=='placeLogisticPlan')" format="yyyy-MM-dd" v-model="listData[0].estContainerStuffingDate.value" align="right" type="date" :placeholder="$i.logistic.placeholder"/>
        </td>
        <td>
          <span v-if="!edit">{{$dateFormat(listData[0].actContainerStuffingDate.value, 'yyyy-mm-dd')}}</span>
          <el-date-picker v-else @change="modifyTime(listData[0].actContainerStuffingDate.value,listData[0].actContainerStuffingDate._key)" format="yyyy-MM-dd" v-model="listData[0].actContainerStuffingDate.value" align="right" type="date" :placeholder="$i.logistic.placeholder"/>
        </td>
      </tr>
      <tr v-if="listData[0].declareDate">
        <td>{{$i.logistic.declared}}</td>
        <td>
          --
        </td>
        <td>
          <span v-if="!edit">{{$dateFormat(listData[0].declareDate.value, 'yyyy-mm-dd')}}</span>
          <el-date-picker v-if="edit&&(pageTypeCurr=='logisticPlanDetail'||pageTypeCurr=='placeLogisticPlan')" format="yyyy-MM-dd" v-model="listData[0].declareDate.value" align="right" type="date" :placeholder="$i.logistic.placeholder"/>
        </td>
      </tr>
      <tr v-if="listData[0].estDepartureDate">
        <td>{{$i.logistic.shipped}}</td>
        <td>
          <span v-if="!edit||pageTypeCurr=='loadingListDetail'">{{$dateFormat(listData[0].estDepartureDate.value, 'yyyy-mm-dd')}}</span>
          <el-date-picker v-if="edit&&(pageTypeCurr=='logisticPlanDetail'||pageTypeCurr=='placeLogisticPlan')" format="yyyy-MM-dd" v-model="listData[0].estDepartureDate.value" align="right" type="date" :placeholder="$i.logistic.placeholder"/>
        </td>
        <td>
          <span v-if="!edit||pageTypeCurr!='loadingListDetail'">{{$dateFormat(listData[0].actDepartureDate.value, 'yyyy-mm-dd')}}</span>
          <el-date-picker v-else format="yyyy-MM-dd" v-model="listData[0].actDepartureDate.value" align="right" type="date" :placeholder="$i.logistic.placeholder"/>
        </td>
      </tr>
      <tr v-if="listData[0].estCustomsCleanceDate">
        <td>{{$i.logistic.cleance}}</td>
        <td>
          --
        </td>
        <td>
          <span v-if="!edit">{{$dateFormat(listData[0].actCustomsCleanceDate.value, 'yyyy-mm-dd')}}</span>
          <el-date-picker v-else @change="modifyTime(listData[0].actCustomsCleanceDate.value,listData[0].actCustomsCleanceDate._key)" format="yyyy-MM-dd" v-model="listData[0].actCustomsCleanceDate.value" align="right" type="date" :placeholder="$i.logistic.placeholder"/>
        </td>
      </tr>
      <tr v-if="listData[0].estReleaseDate">
        <td>{{$i.logistic.release}}</td>
        <td>
          --
        </td>
        <td>
          <span v-if="!edit">{{$dateFormat(listData[0].actReleaseDate.value, 'yyyy-mm-dd')}}</span>
          <el-date-picker v-else format="yyyy-MM-dd" v-model="listData[0].actReleaseDate.value" align="right" type="date" :placeholder="$i.logistic.placeholder"/>
        </td>
      </tr>
      <tr v-if="listData[0].estArrivalDate">
        <td>{{$i.logistic.arrival}}</td>
        <td>
          <span v-if="!edit||pageTypeCurr=='loadingListDetail'">{{$dateFormat(listData[0].estArrivalDate.value, 'yyyy-mm-dd')}}</span>
          <el-date-picker v-if="edit&&(pageTypeCurr=='logisticPlanDetail'||pageTypeCurr=='placeLogisticPlan')" format="yyyy-MM-dd" v-model="listData[0].estArrivalDate.value" align="right" type="date" :placeholder="$i.logistic.placeholder"/>
        </td>
        <td>
          <span v-if="!edit||pageTypeCurr!='loadingListDetail'">{{$dateFormat(listData[0].actArrivalDate.value, 'yyyy-mm-dd')}}</span>
          <el-date-picker v-else format="yyyy-MM-dd" v-model="listData[0].actArrivalDate.value" align="right" type="date" :placeholder="$i.logistic.placeholder"/>
        </td>
      </tr>
		</table>
  </div>
</template>

<script>
  export default {
     data() {
      return {
        BookingTime:'',
        LoadingTime:'',
        cleanceTime:''
      }
    },
    props: {
      title: String,
      listData: Array,
      basicInfoArr: Array,
      edit:Boolean,
      selectArr:Object,
      shipmentStatus:[Number,String]
    },
    computed: {
      pageTypeCurr(){
        return this.$route.name;
      }
    },
    methods:{
      CompareDate(d1,d2)
      {
        return ((new Date(d1.replace(/-/g,"\/"))) - (new Date(d2.replace(/-/g,"\/"))));
      },
      modifyTime(arg,key){
        let _shipmentStatus = this.basicInfoArr.find(el=> el.key == 'shipmentStatus').value
        this.BookingTime = this.$dateFormat(new Date(this.listData[0].bookingDate.value),'yyyy-mm-dd');
        this.LoadingTime = this.$dateFormat(new Date(this.listData[0].actContainerStuffingDate.value),'yyyy-mm-dd');
        this.cleanceTime = this.$dateFormat(new Date(this.listData[0].actCustomsCleanceDate.value),'yyyy-mm-dd');
        let currTime = this.$dateFormat(new Date(),'yyyy-mm-dd');
        let status = 0;
        if(_shipmentStatus!=6){
          // let shipmentStatusCode = this.selectArr.shipmentStatus.find(el=> el.name == key).code;
          if(this.BookingTime&&this.CompareDate(this.BookingTime,currTime)<=0&&[0].includes(this.shipmentStatus)){
            status=1;
          }
          if(this.LoadingTime&&this.CompareDate(this.LoadingTime,currTime)<=0&&[0,1,2,3].includes(this.shipmentStatus)){
            status=4;
          }
          if(this.cleanceTime&&this.CompareDate(this.cleanceTime,currTime)<=0&&[0,1,2,3,4].includes(this.shipmentStatus)){
            status=5;
          }
          this.changeShipmentStatusOption(status);
          this.$emit('modifyTime',{BookingTime:this.BookingTime,LoadingTime:this.LoadingTime,cleanceTime:this.cleanceTime});
        }
      },
      changeShipmentStatusOption(status){
        this.basicInfoArr.find(el=> el.key=='shipmentStatus').disabled = true;
        let arr = this.$depthClone(this.selectArr.shipmentStatus).map(el=> {
          el.disabled = true;
          return el;
        });
        if(status==0||status==1){
          this.basicInfoArr.find(el=> el.key=='shipmentStatus').disabled = false;
          arr = this.$depthClone(arr).map(el=> {
            if(el.code==2||el.code==3){
              el.disabled = false;
            }
            return el;
          });
        }else if(status==0||status==1||status==2){
          this.basicInfoArr.find(el=> el.key=='shipmentStatus').disabled = false;
          arr = this.$depthClone(arr).map(el=> {
            if(el.code==3){
              el.disabled = false;
            }
            return el;
          });
        }
        this.$set(this.selectArr,'shipmentStatus',arr);
        this.$emit('shipmentStatus',status);
      }
    }
  }

</script>

<style lang="less" scoped>
  .hd-top {
    font-size: 18px;
    color: #666;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #ccc;
    padding: 0 15px;
  }

  .hd {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ccc;
    padding: 0 15px;
    font-weight: bold;
    &.active {
      border: none;
    }
  }
  table{
    width: 100%;
    table-layout: fixed;
    th,td{
      text-align: center;
      padding: 6px 0;
      line-height: 23px;
      padding-left: 10px;
      padding-right: 10px;
      font-size: 12px;
      color: #1d1007;
      line-height: 24px;
      font-weight: 400;
    }
  }
  table,th, td{
    border: 1px solid #ebeef5;
  }
</style>
