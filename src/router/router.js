import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router = new Router({
  routes: [{
      path: "*",
      redirect: "/404"
    },
    {
      path: "/404",
      name: "404",
      component: () => import("views/404/404.vue")
    },
    {
      path: '/',
      name: 'Home',
      component: () => import("views/home/home"),
      meta: {
        paths: [{
          name: '首页',
          link: ''
        }],
        requireAuth: true
      }
    }, {
      path: '/login',
      name: 'Login',
      component: () => import("views/login/login")
    }, {
      path: '/postlist',
      name: 'PostList',
      component: () => import("views/postlist/postlist"),
      meta: {
        paths: [{
            name: '首页',
            link: '/'
          },
          {
            name: '文章列表',
            link: ''
          }
        ],
        requireAuth: true
      }
    }, {
      path: '/edit',
      name: 'Add',
      component: () => import("views/edit/edit"),
      meta: {
        paths: [{
            name: '首页',
            link: '/'
          },
          {
            name: '新增文章',
            link: ''
          }
        ],
        requireAuth: true
      },
      children: [{
        path: ':id',
        name: 'Edit',
        component: () => import("views/edit/edit"),
        meta: {
          paths: [{
              name: '首页',
              link: '/'
            },
            {
              name: '编辑文章',
              link: ''
            }
          ],
          requireAuth: true
        }
      }]
    }, {
      path: '/category',
      name: 'Category',
      component: () => import("views/category/category"),
      meta: {
        paths: [{
            name: '首页',
            link: '/'
          },
          {
            name: '分类管理',
            link: ''
          }
        ],
        requireAuth: true
      }
    }, {
      path: '/tag',
      name: 'Tag',
      component: () => import("views/tag/tag"),
      meta: {
        paths: [{
            name: '首页',
            link: '/'
          },
          {
            name: '标签管理',
            link: ''
          }
        ],
        requireAuth: true
      }
    }, {
      path: '/itemlist',
      name: 'Itemlist',
      component: () => import("views/itemlist/itemlist"),
      meta: {
        paths: [{
            name: '首页',
            link: '/'
          },
          {
            name: '个人项目',
            link: ''
          }
        ],
        requireAuth: true
      }
    }
  ]
})
export default router