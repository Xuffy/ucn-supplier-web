<template>
  <div>
    <div class="hd" v-if="showHd"></div>
    <div class="hd active">{{ title }}</div>
    <el-row :gutter="10">
      <el-col :xs="gap" :sm="gap" :md="gap" :lg="gap" :xl="gap" v-for="a of listData" :key="'el-col-' + a.label">
        <div class="input-item">
          <span>{{ a.label }}</span>
          <span v-if="!edit || disabledFields.includes(a.key)">{{ textFilter(a) }}</span>
          <div v-else>
            <el-input placeholder="请输入内容" v-model="a.value" v-if="a.type === 'input'"/>
            <el-select v-model="a.value" placeholder="请输入内容" v-if="a.type === 'selector'" :clearable="true">
              <el-option :label="item.name" :value="item.code" v-for="item of selectArr[a.key]" :key="'el-option-' + item.code" v-if="selectArr[a.key]"/>
            </el-select>
            <el-date-picker v-if="a.type === 'date'" v-model="a.value" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions"/>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { disabledFields } from '@/database/logistic/plan/staticData'

export default {
  props: {
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
  data () {
    return {
      disabledFields,
      paymentList: [],
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
  // compited: {
  //   planId () {
  //     return this.$route.query.id
  //   }
  // },
  methods: {
    textFilter (a) {
      if (a.type === 'input') return a.value
      if (a.type === 'date') return a.value ? this.$dateFormat(a.value, 'yyyy-mm-dd') : null
      if (a.type === 'selector' && this.selectArr[a.key]) {
        let obj = this.selectArr[a.key].find(item => item.code == a.value)
        return obj ? obj.name : null
      }
    }
  }
}
</script>
<style lang="less" scoped>
.hd-top {
  font-size: 18px;
  color:#666;
  height: 50px;
  line-height:50px;
  border-bottom:1px solid #ccc;
  padding:0 15px;
}
.hd {
  height: 40px;
  line-height:40px;
  border-bottom:1px solid #ccc;
  padding:0 15px;
  font-weight: bold;
  &.active {
    border:none;
  }
}
.input-item {
  display:flex;
  align-items: center;
  padding:10px 0;
  span {
    width: 200px;
    white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
    display:inline-block;
    font-size:12px;
    text-align: right;
    padding-right:10px;
    box-sizing: border-box;
  }
  .el-select, .el-input {
    flex:1;
  }
}
</style>
