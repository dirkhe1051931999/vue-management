import _axios from './fetch';
import {
  settings
} from "./config"
const baseUrl = settings.baseUrl;
export default {
  getCategories() {
    return _axios(`${baseUrl}/getCategories`);
  },
  addNewCategory(name) {
    return _axios(`${baseUrl}/addNewCategory/${name}`, {}, 'put');
  },
  updateCategory(id, name) {
    return _axios(`${baseUrl}/updateCategory/${id}?name=${name}`, {}, 'put');
  },
  deleteCategory(id) {
    return _axios(`${baseUrl}/deleteCategory/${id}`, {}, 'delete');
  }
};
