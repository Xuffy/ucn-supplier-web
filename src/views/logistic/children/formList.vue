<template>
  <div>
    <div class="hd" v-if="showHd"></div>
    <div class="hd active">{{ title }}</div>
    <el-row :gutter="10">
      <el-form label-width="300px" label-position="right" class="form" >
        <el-col :xs="gap" :sm="gap" :md="gap" :lg="gap" :xl="gap" v-for="a of listData" :key="'el-col-' + a.label">

          <el-form-item v-if="DeliveredEdit&&a.key=='actDepartureDate'&&a.type === 'date'" :required="a._rules&&a._rules.required" :show-message="false" :label="a.label+'：'">
              <el-date-picker v-model="a.value" :class="{ definedStyleClass : fieldDisplay&&fieldDisplay.hasOwnProperty(a.key)}" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions" @change="selectChange(a.value,a.key)"/>
          </el-form-item>
          <!-- <el-form-item v-if="DeliveredEdit&&a.key=='logisticsStatus'&&a.type === 'selector'" :required="a._rules&&a._rules.required" :show-message="false" :label="a.label+'：'">
              <el-select v-model="a.value" :class="{ definedStyleClass : fieldDisplay&&fieldDisplay.hasOwnProperty(a.key)}" placeholder="请输入内容" :disabled="a.disabled" @change="selectChange(a.value,a.key)">
                <el-option :label="item.name" :value="Number(item.code) || item.code" v-for="item of selectArr[a.key]" :key="'el-option-' + item.code"
                  v-if="selectArr[a.key]" />
              </el-select>
          </el-form-item> -->

          <el-form-item v-if="!edit&&!(DeliveredEdit&&a.key=='actDepartureDate')" :label="a.label+'：'">
            <p class="textFilter" :style="fieldDisplay&&fieldDisplay.hasOwnProperty(a.key) ? definedStyle : ''">{{ textFilter(a) }}</p>
          </el-form-item>
          <div v-if="edit">
            <el-form-item :required="a._rules&&a._rules.required" :show-message="false" :label="a.label+'：'" v-if="a.type === 'input'">
              <el-input placeholder="请输入内容" :class="{ definedStyleClass : fieldDisplay&&fieldDisplay.hasOwnProperty(a.key)}" v-model="a.value" :disabled="a.disabled" @change="selectChange(a.value,a.key)"/>
            </el-form-item>

            <el-form-item :required="a._rules&&a._rules.required" :show-message="false" :label="a.label+'：'" v-if="a.type === 'selector'">
              <el-select v-model="a.value" :class="{ definedStyleClass : fieldDisplay&&fieldDisplay.hasOwnProperty(a.key)}" placeholder="请输入内容" :disabled="a.disabled" @change="selectChange(a.value,a.key)">
                <el-option :label="item.name" :value="Number(item.code) || item.code" v-for="item of selectArr[a.key]" :key="'el-option-' + item.code"
                  v-if="selectArr[a.key]" />
              </el-select>
            </el-form-item>

            <el-form-item :required="a._rules&&a._rules.required" :show-message="false" :label="a.label+'：'" v-if="a.type === 'date'">
              <el-date-picker format="yyyy-MM-dd" v-model="a.value" :class="{ definedStyleClass : fieldDisplay&&fieldDisplay.hasOwnProperty(a.key)}" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions" @change="selectChange(a.value,a.key)"/>
            </el-form-item>
          </div>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>
<script>
  export default {
    props: {
      DeliveredEdit:[Boolean],
      name:String,
      definedStyle:{
        type:Object,
        default (){
          return {
            color: '#f56c6c',
            'text-shadow': '2px 1px 2px'
          }
        }
      },
      fieldDisplay:Object,
      title: String,
      showHd: {
        type: Boolean,
        default: true
      },
      edit: {
        type: Boolean,
        default: false
      },
      gap: {
        type: Number,
        default: 8
      },
      listData: {
        type: Array,
        default () {
          return []
        }
      },
      selectArr: {
        type: Object,
        default: () => {}
      }
    },
    data() {
      return {
        paymentList: [],
        hightLightModify:{},
        pickerOptions: {
          // disabledDate(time) {
          //   return time.getTime() > Date.now();
          // },
          shortcuts: [{
            text: 'Today',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: 'Yesterday',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: 'A week ago',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        }
      }
    },
    methods: {
      selectChange(value,key){
        if(key=='exchangeCurrency'){
          this.$emit('selectChange',value); 
        }
        this.$set(this.hightLightModify,key,value);
        this.$emit('hightLightModifyFun',this.hightLightModify,this.name);
      },
      textFilter(a) {
        if (a.type === 'input' || a.type === 'text') return a.value
        if (a.type === 'date') return a.value ? this.$dateFormat(a.value, 'yyyy-mm-dd') : null
        if (a.type === 'selector' && this.selectArr[a.key]) {
          let obj = this.selectArr[a.key].find(item => item.code == a.value)
          return obj ? obj.name : null
        }
      }
    },
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
  .form {
    /deep/.el-form-item p{
      min-width: 150px;
    }
    /deep/.el-input,
    /deep/.el-input__inner {
      width: 100%;
      min-width: 150px;
    }
    /deep/.el-select{
      width: 100%;
      min-width: 150px;
    }
    /deep/.definedStyleClass input{
      background:#f56c6c;
      color:#fff;
    }
  }

</style>
