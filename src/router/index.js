import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: sub-menu only appear when route children.length >= 1
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  // 404页
  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true
  },
  { path: "*", redirect: "/404", hidden: true },
  // 登录页
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  },
  // 仪表盘
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "仪表盘", icon: "dashboard" }
      }
    ]
  },
  // 博客后台
  {
    path: "/blog",
    component: Layout,
    redirect: "/blog/articleList",
    name: "博客后台",
    meta: {
      title: "博客后台",
      icon: "example",
      activeMenu: "/blog/articleList"
    },
    children: [
      // 文章列表
      {
        path: "articleList",
        name: "ArticleList",
        component: () => import("@/views/articleList/index"),
        meta: { title: "文章列表", icon: "list" }
      },
      // 编辑文章
      {
        path: "editArticle",
        name: "EditArticle",
        component: () => import("@/views/editArticle/index"),
        meta: { title: "编辑文章", icon: "list" }
      },
      // 分类管理
      {
        path: "sortManager",
        name: "SortManager",
        component: () => import("@/views/sortManager/index"),
        meta: { title: "分类管理", icon: "list" }
      },
      // 标签管理
      {
        path: "labelManager",
        name: "LabelManager",
        component: () => import("@/views/labelManager/index"),
        meta: { title: "标签管理", icon: "list" }
      },
      // 个人项目
      {
        path: "myProject",
        name: "MyProject",
        component: () => import("@/views/myProject/index"),
        meta: { title: "个人项目", icon: "list" }
      }
    ]
  }
];

const createRouter = () =>
  new Router({
    mode: "hash", // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
