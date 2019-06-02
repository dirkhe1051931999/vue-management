import Vue from 'vue'
import App from './App.vue'
// message参数
import {
  _message
} from "./config/messge"
// axios
import axios from "axios"
// 路由
import router from "./router/router"
// vuex
import store from './store/index'
// socket
import VueSocketio from 'vue-socket.io';
// socket-client
import socketio from 'socket.io-client';
// message
import Message from './components/message/index';
// MessageBox
import MessageBox from './components/messageBox/index';
Vue.config.productionTip = false
// 给window上挂一个message
window._msg_ = _message
// socket
Vue.use(VueSocketio, socketio('http://127.0.0.1:9000', {
  path: '/testsocketiopath'
}));
// message
Vue.use(Message);
// messageBox
Vue.use(MessageBox);
// 权限验证
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 401) {
      Vue.prototype.$msgBox.showMsgBox(_msg_.messagebox.loseToken).then((val) => {
        router.push('/login');
      }).catch(() => {
        console.log('cancel');
      });
    } else {
      Vue.prototype.$message.showMessage({
        type: 'error',
        content: '系统出现错误'
      });
    }
    return Promise.reject(error);
  }
)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')