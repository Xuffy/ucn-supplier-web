<template>
  <div id="app" class="ucn-app" :class="{'ucn-language-zh':$localStore.get('language') === 'zh-CN'}">
    <router-view></router-view>
    <v-view-picture ref="viewPicture"></v-view-picture>
  </div>
</template>

<script>
  import {mapActions, mapState} from 'vuex';
  import {VViewPicture} from 'components/index'

  export default {
    name: 'app',
    components: {VViewPicture},
    computed: {
      ...mapState({
        quickLink: state => state.quickLink,
        layout: state => state.layout,
        menuLink: state => state.menuLink,
        viewPicture: state => state.viewPicture
      }),
    },
    watch: {
      $route(val) {
        this.menuLink.list = [];

        this.layout.paddingRight = 0;
      }
    },
    created() {
      this.menuLink.list = [];
      this.layout.hideMenu = this.$userAction.get('hideMenu');

      this.initWebSocket();
      window.registerWebSocketProcess("test", function (data) {
        console.log(data, "type[test] process")
      })
    },
    mounted() {
      this.viewPicture.vm = this.$refs.viewPicture;
    },
    methods: {
      initWebSocket() { //初始化weosocket
        const wsUrl = "ws://127.0.0.1:12016/websocket?token=" + this.$localStore.get('token');//ws地址,https是使用 wss
        window.websocket = new WebSocket(wsUrl);

        window.websocket.onopen = ev => {
          console.log("WebSocket连接成功");
        };
        window.websocket.onerror = ev => {
          console.log("WebSocket连接发生错误");
        };
        window.websocket.onmessage = ev => {
          let data = JSON.parse(ev.data);

          if (data.type === '_info') {
            console.log(data, "websocket info");
            return;
          }

          let process = window.webSocketProcess[data.type];
          if (process) {
            process(data.data);
          } else {
            console.log("websocket消息类型没有对应的处理方法");
          }
        };
        window.websocket.onclose = ev => {
          console.log("connection closed (" + ev.code + ")");
        };

        // 注册服务器消息处理方法,设为全局的，在任何地方都可用
        window.webSocketProcess = {};
        window.registerWebSocketProcess = (type, callback) => {
          window.webSocketProcess[type] = callback;
        };
        // 向服务器发送消息
        window.webSocketSend = agentData => {
          if (window.websocket.readyState === window.websocket.OPEN) {
            window.websocket.send(agentData);
          } else if (window.websocket.readyState === window.websocket.CONNECTING) { // 若是 正在开启状态，则等待300毫秒
            let that = this;
            setTimeout(function () {
              that.websocket.send(agentData);
            }, 300);
          } else {
            this.initWebSocket();
            let that = this;
            setTimeout(function () {
              that.websocket.send(agentData)
            }, 500);
          }
        };
        window.webSocketClose = () => {//关闭连接，离开页面、退出登录需要调用
          window.websocket.close();
        }
      }
    }
  }
</script>


<style lang="less">

  #app {
  }
</style>
