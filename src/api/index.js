import category from "./blog/category";
import project from "./blog/project";
import post from "./blog/post";
import user from "./blog/user";
import tag from "./blog/tag";
export default {
  ...category,
  ...project,
  ...post,
  ...user,
  ...tag
};
