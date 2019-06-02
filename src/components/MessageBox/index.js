import _index from './index.vue';

// 定义插件对象
const MessageBox = {};

// vue的install方法，用于定义vue插件
MessageBox.install = function (Vue, options) {
  const MessageBoxInstance = Vue.extend(_index);
  let currentMsgBox;
  const initInstance = () => {
    // 实例化vue实例
    currentMsgBox = new MessageBoxInstance();
    let msgBoxEl = currentMsgBox.$mount().$el;
    document.body.appendChild(msgBoxEl);
  };
  // 在Vue的原型上添加实例方法，以全局调用
  Vue.prototype.$msgBox = {
    showMsgBox(options) {
      if (!currentMsgBox) {
        initInstance();
      }
      if (typeof options === 'string') {
        currentMsgBox.content = options;
      } else if (typeof options === 'object') {
        Object.assign(currentMsgBox, options);
      }
      return currentMsgBox.showMsgBox()
        .then(val => {
          currentMsgBox = null;
          return Promise.resolve(val);
        })
        .catch(err => {
          currentMsgBox = null;
          return Promise.reject(err);
        });
    }
  }
}
export default MessageBox;