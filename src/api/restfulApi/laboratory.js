import _axios from '../axios';
import {
  settings
} from "./config"
const baseUrl = settings.baseUrl;
export default {
  getLaboratories() {
    return _axios(`${baseUrl}/getLaboratories`);
  },
  createNewLaboratory(params) {
    return _axios(`${baseUrl}/createNewLaboratory`, params, 'post', true);
  },
  updateLaboratory(params) {
    return _axios(`${baseUrl}/updateLaboratory`, params, 'post', true);
  },
  deleteLaboratory(id) {
    return _axios(`${baseUrl}/deleteLaboratory/${id}`, {}, 'delete');
  }
};