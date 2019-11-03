import router from "./router";
import api from "@/api";
import { Message } from "element-ui";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import getPageTitle from "@/utils/get-page-title";

NProgress.configure({ showSpinner: true });
const whiteList = ["/login"];
router.beforeEach(async (to, from, next) => {
  NProgress.start();
  document.title = getPageTitle(to.meta.title);
  try {
    const result = await api.getCategories();
    if (to.path === "/login") {
      next({ path: "/" });
      NProgress.done();
    } else {
      next();
    }
  } catch (e) {
    if (e.response.status === 401) {
      if (whiteList.indexOf(to.path) !== -1) {
        next();
      } else {
        next(`/login?redirect=${to.path}`);
        Message.error("无权限访问页面");
        NProgress.done();
      }
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
