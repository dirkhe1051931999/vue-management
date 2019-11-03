import Cookies from "js-cookie";

const TokenKey = "management_token";

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, { expires: 1, path: "" });
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}
