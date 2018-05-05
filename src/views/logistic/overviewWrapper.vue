<template>
  <overview :pageType="pageType"/>
</template>
<script>
import overview from './logisticPlanOverview'
export default {
  components: {
    overview
  },
  computed: {
    pageType () {
      const arr = this.$route.fullPath.split('/')
      return arr[arr.length - 1]
    }
  }
}
</script>
