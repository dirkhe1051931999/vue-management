import _axios from "@/utils/axios";
import { settings } from "./config";
const baseUrl = settings.baseUrl;
export default {
  singUp(userName, password) {
    return _axios(
      `${baseUrl}/login`,
      {
        userName: userName,
        password: password
      },
      "post"
    );
  },
  signOut() {
    return _axios(`${baseUrl}/signOut`);
  }
};
