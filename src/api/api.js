import category from "./restfulApi/category"
import laboratory from "./restfulApi/laboratory"
import post from "./restfulApi/post"
import sign from "./restfulApi/sign"
import tag from "./restfulApi/tag"
export default {
  ...category,
  ...laboratory,
  ...post,
  ...sign,
  ...tag
}