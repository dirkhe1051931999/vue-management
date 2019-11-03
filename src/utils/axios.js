import axios from "axios";
import { getToken } from "./auth";
// 需要使用代理来解决跨域问题
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
axios.defaults.timeout = 20000;
const codeMessage = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。"
};
// Add a request interceptor
axios.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      // Bearer是JWT的认证头部信息
      config.headers.common["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
export default async (
  url = "",
  params = {},
  method = "get",
  isUpload = false
) => {
  method = method.toLowerCase();
  if (method === "get") {
    let paramArr = [];
    for (let [key, value] of Object.entries(params)) {
      paramArr.push(key + "=" + value);
    }
    if (paramArr.length > 0) {
      url += "?" + paramArr.join("&").replace(/#/g, "%23");
    }
    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then(
          response => {
            resolve(response.data);
          },
          err => {
            reject(err);
          }
        )
        .catch(error => {
          reject(error);
        });
    });
  } else if (method === "post") {
    let config = {};
    if (isUpload) {
      config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
    }
    return new Promise((resolve, reject) => {
      axios
        .post(url, params, config)
        .then(
          response => {
            resolve(response.data);
          },
          err => {
            reject(err);
          }
        )
        .catch(error => {
          reject(error);
        });
    });
  } else if (method === "put") {
    return new Promise((resolve, reject) => {
      axios
        .put(url, params)
        .then(
          response => {
            resolve(response.data);
          },
          err => {
            reject(err);
          }
        )
        .catch(error => {
          reject(error);
        });
    });
  } else if (method === "delete") {
    return new Promise((resolve, reject) => {
      axios
        .delete(url)
        .then(
          response => {
            resolve(response.data);
          },
          err => {
            reject(err);
          }
        )
        .catch(error => {
          reject(error);
        });
    });
  } else {
    let error = "传递的参数错误";
    return Promise.reject(error);
  }
};
