import Vue from 'vue';
import SvgIcon from '@/components/SvgIcon'; // svg component

// main.js中注册一个全局 svg-icon组件，可根据.svg文件生成
Vue.component('svg-icon', SvgIcon);

const req = require.context('./svg', false, /\.svg$/);
const requireAll = requireContext => {
  return requireContext.keys().map(requireContext);
};
requireAll(req);
