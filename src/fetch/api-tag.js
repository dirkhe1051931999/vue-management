import _axios from './fetch';
import {
  settings
} from "./config"
const baseUrl = settings.baseUrl;

export default {
  getTags () {
    return _axios(`${baseUrl}/getTags`);
  },
  addNewTagWhenPost (name) {
    return _axios(`${baseUrl}/addNewTagWhenPost/${name}`, {}, 'put');
  },
  addNewTag (name) {
    return _axios(`${baseUrl}/addNewTag/${name}`, {}, 'put');
  },
  updateTag (id, name) {
    return _axios(`${baseUrl}/updateTag/${id}?name=${name}`, {}, 'put');
  },
  deleteTag (id) {
    return _axios(`${baseUrl}/deleteTag/${id}`, {}, 'delete');
  },
  searchTagByName (name) {
    return _axios(`${baseUrl}/searchTagByName/${name}`);
  }
};
