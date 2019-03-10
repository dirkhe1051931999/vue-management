import _axios from './fetch';
import {
  settings
} from "./config"
import apiPost from './api-post';
import apiCategory from './api-category';
import apiTag from './api-tag';
import apiLaboratory from './api-laboratory';
const baseUrl = settings.baseUrl;
export default {
  login(userName, password) {
    return _axios(
      `${baseUrl}/login`, {
        userName: userName,
        password: password
      },
      'post'
    );
  },
  signOut() {
    return _axios(`${baseUrl}/signOut`);
  },
  ...apiPost,
  ...apiCategory,
  ...apiTag,
  ...apiLaboratory
};
