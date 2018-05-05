<template>
  <div class="basicInfo">
    <ul>
      <li>
        <i class="el-icon-info"></i>
        Set Department and User
        <el-button type="text">Go set</el-button>
      </li>
      <li>
        <i class="el-icon-info"></i>
        Set Company Info
        <el-button type="text">Go set</el-button>
      </li>
      <li>
        <i class="el-icon-info"></i>
        Set Category
        <el-button type="text">Go set</el-button>
      </li>
    </ul>
    <!--<el-checkbox v-model="" :disabled="true">备选项</el-checkbox>-->
  </div>
</template>

<script>

  export default {
    name: 'VBasicInfo',
    data() {
      return {}
    },
    created() {

    },
    methods: {}
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .basicInfo li {
    line-height: 10px;
  }

  .basicInfo i {
    font-size: 16px;
    vertical-align: middle;
  }
</style>
