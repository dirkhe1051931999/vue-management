import * as types from "./mutation-type"
const mutations = {
  // 文章列表
  [types.SET_POSTLIST](state, postlist) {
    state.postlist = postlist
  },
  // 项目列表
  [types.SET_ITEMLIST](state, itemlist) {
    state.itemlist = itemlist
  }
}
export default mutations