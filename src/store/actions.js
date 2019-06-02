import * as types from "./mutation-type"
export let deleteMyItem = function ({
  commit,
  state
}, {
  index
}) {
  let itemlist = state.itemlist.slice();
  itemlist.splice(index, 1)
  commit(types.SET_ITEMLIST, itemlist)
}
export let updateMyItem = function ({
  commit,
  state
}, {
  item,
  index
}) {
  item = Object.assign({}, item)
  let itemlist = state.itemlist.slice();
  itemlist[index] = item;
  commit(types.SET_ITEMLIST, itemlist)
}