import _axios from './fetch';
import {
  settings
} from "./config"
const baseUrl = settings.baseUrl;
export default {
  getPostById (id) {
    return _axios(`${baseUrl}/getPostById/${id}`);
  },
  addPost (params) {
    return _axios(`${baseUrl}/addPost`, params, 'post');
  },
  updatePost (id, params) {
    return _axios(`${baseUrl}/updatePost/${id}`, params, 'post');
  },
  getPostList (page = 1, pageNum = 10) {
    return _axios(`${baseUrl}/getPostList`, {
      page: page,
      pageNum: pageNum
    });
  },
  getPostTotal () {
    return _axios(`${baseUrl}/getPostTotal`);
  },
  offlinePost (id) {
    return _axios(`${baseUrl}/offlinePost/${id}`, {}, 'put');
  },
  publishPost (id) {
    return _axios(`${baseUrl}/publishPost/${id}`, {}, 'put');
  },
  deletePost (id) {
    return _axios(`${baseUrl}/deletePost/${id}`, {}, 'delete');
  },
  getPostsByCatId (id, page = 1, pageNum = 10) {
    return _axios(`${baseUrl}/getPostsByCatId/${id}`, {
      page: page,
      pageNum: pageNum
    });
  },
  getPostsByTagId (id, page = 1, pageNum = 10) {
    return _axios(`${baseUrl}/getPostsByTagId/${id}`, {
      page: page,
      pageNum: pageNum
    });
  }
};