import Vue from "vue";
// CSS重置的现代替代方法
import "normalize.css/normalize.css";
// ElementUI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// global css
import "@/styles/index.scss";
import App from "./App";
import store from "./store";
import router from "./router";
// socket
import VueSocketio from "vue-socket.io";
import socketio from "socket.io-client";
// VCharts
import VCharts from "v-charts";
// icon
import "@/icons";
// 权限验证
import "@/permission";
Vue.use(ElementUI);
Vue.use(
  VueSocketio,
  socketio("http://127.0.0.1:9001", {
    path: "/testsocketiopath"
  })
);
Vue.use(VCharts);
Vue.config.productionTip = false;
new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
