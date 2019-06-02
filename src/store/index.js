// 操作步骤 state=>getter=>mutation-type=>mutation
import Vue from "vue"
import Vuex from "vuex"
import * as actions from "./actions"
import * as getters from "./getters"
import state from "./state"
import mutations from "./mutations"
// debug
import createLogger from "vuex/dist/logger"
Vue.use(Vuex)
// 提示环境
const debug = process.env.NODE_ENV != 'production'
export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
// import {mapGetters,mapMutations,mapActions} from "vuex"
// 获取状态
// ...mapGetters([
//   'itemlist'
// ])
// 更改vuex状态
// ...mapMutations({
//   setItemList: 'SET_ITEMLIST'
// }),
// ...mapActions([
//   'deleteMyItem',
//   'updateMyItem'
// ]),