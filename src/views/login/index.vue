<template>
  <div class="login">
    <iframe :src="loginUrl" style="width: 100%;height: 100%;position: fixed;top: 0;left: 0"></iframe>
  </div>
</template>

<script>
  import config from 'service/config';
  import {Base64} from 'js-base64';
  import Qs from 'qs';

  export default {
    name: 'login',
    data() {
      return {
        loginUrl: ''
      }
    },
    created() {
      let params = Qs.stringify({
        type: 2,
        language: config.LANGUAGE,
        redirect: Base64.encode(`${window.location.origin}/static/authorize/index.html`)
      });
      let redirectUrl = `/#/?${params}`;
      this.$message.closeAll();
      this.loginUrl = `${config.ENV.LOGIN_URL}${redirectUrl}`;
      this.$localStore.clearAll();
      this.$sessionStore.clearAll();

      window.__authorize = this.getUserInfo;
    },
    methods: {
      getUserInfo(token) {
        if (!token) return false;
        token = Base64.decode(token);
        this.$localStore.set('token', token);
        this.$ajax.get(this.$apis.USER_PRIVILEGE).then(data => {
          this.$localStore.set('user', data);
          this.$router.push('/');
        });
      }
    }
  }
</script>
<style scoped lang="less">

</style>
