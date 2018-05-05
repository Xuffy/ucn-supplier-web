<template>
  <div class="expand">
    <!--<Collapse class="collapse" value="1">
      <Panel name="1">
        史蒂夫·乔布斯
        <p slot="content">
          史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。</p>
      </Panel>
    </Collapse>-->
    <ul>
      <li>Remark</li>
      <li>2016-10-03</li>
      <li>John Brown</li>
      <li>18</li>
    </ul>
  </div>
</template>

<script>

  export default {
    name: 'VExpand',
    data() {
      return {
      }
    },
    watch: {},
    created() {
    },
    methods: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .expand ul li {
    float: left;
    min-width: 200px;
    padding-right: 3px;
    padding-left: 3px;
  }

  .expand ul li:first-child {
    min-width: 60px;
  }

  .expand .collapse {
    border: none;
  }
</style>
<style>
  .ucn-table .expand .ivu-collapse-content {
    background-color: inherit;
  }
</style>
