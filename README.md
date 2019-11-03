# 后台管理系统

## 技术栈

1. vue/vue-router/vuex/webpack4
2. koa
3. mysql
4. redis
5. websocket
6. element-ui

## 如何使用

```bash
# 安装依赖
npm install
# 开启redis服务
npm run redis
# 开启后端服务 http://127.0.0.1:9001
npm run server
# 开启前端服务 http://127.0.0.1:9002
npm run dev
```

## 版本

`v2.1`

## 更新记录

1. 2019-03-16
   - 增加 github 授权认证
2. 2019-03-24
   - 增加留言功能
3. 2019-03-31
   - 帐号登录时前端密码加密
4. 2019-06-02
   - 升级到 vue-cli3
   - 优化页面
   - 修复已知的 bug
   - 增加了 vuex 状态管理
5. 2019-11-03
   - 优化项目，项目 UI 使用 element ui
   - 修复已知的 bug
   - 不仅仅是博客后台
   - css 预编译改用 sass

## 完成的功能

1. 登录页面
2. 文章列表，文章的编辑，发布，下线，socket 实时保存
3. 新增文章编辑
4. 分类列表，分类的删除，编辑，新增
5. 标签列表，标签的删除，编辑，新增
6. 项目列表，项目的删除，编辑，新增
7. 留言板与 github 认证

### 待完成的功能

1. ~~github 认证~~
2. ~~评论管理~~
3. 编辑器的优化
4. ~~首页增加可视化图表~~
5. 获取用户位置
6. 留言管理功能
7. ...

## 注意事项

1. vue.socket.io 版本必须是`^2.1.1-a`
2. 安装 mysql，用 `navicat` 连接 mysql，导入项目中 sql 文件，`my_vue_blog` 是有数据和结构的文件，`my_vue_blog2` 是只有结构，注意数据库名字和数据库登录的帐号密码
3. 安装 redis, 用 `RedisDesktopManager` 连接 redis，前提是开启了 redis 服务（如果配置环境变量，则 cmd 中输入 `redis-server`，否则进入 redis 安装的目录里输入 `redis-server.exe` `redis.windows.conf`）
4. 登录帐号是 `admin/123456`

## 常见问题

```
1. Warning: no config file specified, using the default config. In order to specify a config file use redis-server.exe /path/to/redis.conf

解决方法：在redis目录下输入redis-server.exe  redis.windows.conf

2. Creating Server TCP listening socket 127.0.0.1:6379: bind: No error

解决方法：
在redis目录下输入
redis-cli.exe
shutdown
exit
然后重新运行redis-server.exe redis.windows.conf

```

## 目录

```txt
|-- README.md
|-- babel.config.js
|-- build
|   `-- index.js
|-- dump.rdb
|-- jsconfig.json
|-- package-lock.json
|-- package.json
|-- postcss.config.js
|-- public
|   `-- index.html
|-- server
|   |-- api
|   |   |-- admin
|   |   |   |-- admin.controller.js
|   |   |   |-- admin.js
|   |   |   |-- category.controller.js
|   |   |   |-- laboratory.controller.js
|   |   |   |-- post.controller.js
|   |   |   `-- tag.controller.js
|   |   |-- oauth
|   |   |   |-- github.controller.js
|   |   |   `-- index.js
|   |   |-- post
|   |   |   |-- comment.controller.js
|   |   |   |-- post.controller.js
|   |   |   `-- post.js
|   |   `-- track
|   |       |-- track.controller.js
|   |       `-- track.js
|   |-- app.js
|   |-- config
|   |   |-- environment
|   |   |   |-- development.js
|   |   |   `-- index.js
|   |   |-- koa.js
|   |   `-- src
|   |       |-- tempUploads
|   |       `-- uploads
|   |-- middlreware
|   |   `-- tokenError.js
|   |-- routes
|   |   `-- index.js
|   `-- util
|       |-- admin-account.js
|       |-- draft-redis.js
|       |-- draft-socketio.js
|       |-- helper.js
|       |-- mysql-async.js
|       |-- redis-mysql.js
|       `-- redis-store.js
|-- src
|   |-- App.vue
|   |-- api
|   |   |-- blog
|   |   |   |-- category.js
|   |   |   |-- config.js
|   |   |   |-- post.js
|   |   |   |-- project.js
|   |   |   |-- tag.js
|   |   |   `-- user.js
|   |   `-- index.js
|   |-- assets
|   |   |-- 404_images
|   |   |   |-- 404.png
|   |   |   `-- 404_cloud.png
|   |   `-- user
|   |       |-- admin.png
|   |       `-- user.png
|   |-- components
|   |   |-- Breadcrumb
|   |   |   `-- index.vue
|   |   |-- Hamburger
|   |   |   `-- index.vue
|   |   |-- SvgIcon
|   |   |   `-- index.vue
|   |   |-- markdown
|   |   |   `-- index.vue
|   |   |-- postTable
|   |   |   `-- index.vue
|   |   |-- project
|   |   |   `-- index.vue
|   |   `-- upload
|   |       `-- index.vue
|   |-- icons
|   |   |-- index.js
|   |   |-- svg
|   |   |   |-- add.svg
|   |   |   |-- button.svg
|   |   |   |-- dashboard.svg
|   |   |   |-- delete.svg
|   |   |   |-- edit.svg
|   |   |   |-- example.svg
|   |   |   |-- eye-open.svg
|   |   |   |-- eye.svg
|   |   |   |-- form.svg
|   |   |   |-- link.svg
|   |   |   |-- list.svg
|   |   |   |-- nested.svg
|   |   |   |-- password.svg
|   |   |   |-- table.svg
|   |   |   |-- tree.svg
|   |   |   `-- user.svg
|   |   `-- svgo.yml
|   |-- layout
|   |   |-- components
|   |   |   |-- AppMain.vue
|   |   |   |-- Navbar.vue
|   |   |   |-- Sidebar
|   |   |   |   |-- FixiOSBug.js
|   |   |   |   |-- Item.vue
|   |   |   |   |-- Link.vue
|   |   |   |   |-- Logo.vue
|   |   |   |   |-- SidebarItem.vue
|   |   |   |   `-- index.vue
|   |   |   `-- index.js
|   |   |-- index.vue
|   |   `-- mixin
|   |       `-- ResizeHandler.js
|   |-- main.js
|   |-- permission.js
|   |-- router
|   |   `-- index.js
|   |-- settings.js
|   |-- store
|   |   |-- getters.js
|   |   |-- index.js
|   |   `-- modules
|   |       |-- app.js
|   |       |-- settings.js
|   |       `-- user.js
|   |-- styles
|   |   |-- element-ui.scss
|   |   |-- index.scss
|   |   |-- markdown.css
|   |   |-- mixin.scss
|   |   |-- sidebar.scss
|   |   |-- transition.scss
|   |   `-- variables.scss
|   |-- utils
|   |   |-- auth.js
|   |   |-- axios.js
|   |   |-- get-page-title.js
|   |   `-- validate.js
|   `-- views
|       |-- 404.vue
|       |-- articleList
|       |   `-- index.vue
|       |-- dashboard
|       |   `-- index.vue
|       |-- editArticle
|       |   `-- index.vue
|       |-- labelManager
|       |   `-- index.vue
|       |-- login
|       |   `-- index.vue
|       |-- myProject
|       |   `-- index.vue
|       `-- sortManager
|           `-- index.vue
`-- vue.config.js
```

## 关键技术点

1. [nodejs 熟悉,http,fs,path,Buffer 的使用](https://github.com/dirkhe1051931999/hjBlog/blob/master/blog-management/lessons/01.md)
2. [koa 的原理与 koa-static、koa-router 等中间件的实现](https://github.com/dirkhe1051931999/hjBlog/blob/master/blog-management/lessons/02.md)
3. [服务器目录，API 接口管理](https://github.com/dirkhe1051931999/hjBlog/blob/master/blog-management/lessons/03.md)
4. [使用 koa-session 实现用户认证](https://github.com/dirkhe1051931999/hjBlog/blob/master/blog-management/lessons/04.md)
5. [使用 jwt 实现用户认证](https://github.com/dirkhe1051931999/hjBlog/blob/master/blog-management/lessons/05.md)
6. [node+koa 如何连接数据库](https://github.com/dirkhe1051931999/hjBlog/blob/master/blog-management/lessons/06.md)
7. [node+koa 如何连接 redis，mysql 和 redis 联调](https://github.com/dirkhe1051931999/hjBlog/blob/master/blog-management/lessons/07.md)
8. [node+koa+vue+soket 的使用](https://github.com/dirkhe1051931999/hjBlog/blob/master/blog-management/lessons/08.md)
9. [node+koa 的文章的增删改查及文章的表结构](https://github.com/dirkhe1051931999/hjBlog/blob/master/blog-management/lessons/09.md)
10. [node+koa 分类的增删改查及分类的表结构](https://github.com/dirkhe1051931999/hjBlog/blob/master/blog-management/lessons/10.md)
11. [node+koa 标签的增删改查及标签的表结构](https://github.com/dirkhe1051931999/hjBlog/blob/master/blog-management/lessons/11.md)
12. [node+koa 项目的增删改查及项目的表结构](https://github.com/dirkhe1051931999/hjBlog/blob/master/blog-management/lessons/12.md)
13. [node+koa 图片的上传、form 标签的处理和静态服务器](https://github.com/dirkhe1051931999/hjBlog/blob/master/blog-management/lessons/13.md)
14. [vue 实现全局的组件、分页组件](https://github.com/dirkhe1051931999/hjBlog/blob/master/blog-management/lessons/14.md)
15. [vue+koa 实现 github 登录授权](https://github.com/dirkhe1051931999/hjBlog/blob/master/blog-management/lessons/15.md)
16. [留言功能](https://github.com/dirkhe1051931999/hjBlog/blob/master/blog-management/lessons/16.md)
17. [vue 组件通信](https://github.com/dirkhe1051931999/hjBlog/blob/master/blog-vue/lessons/06.md)
18. [vue-cli3.x 的配置文件详细介绍](https://github.com/dirkhe1051931999/hjBlog/tree/master/blog-vue/lessons/11.md)
19. [rem 与 em](https://github.com/dirkhe1051931999/hjBlog/blob/master/blog-css/lessons/03.md)
20. [webpack 优化相关](https://github.com/dirkhe1051931999/common-demo/tree/master/webpack-study-notes)

## 实现效果

![management_1.png](https://i.loli.net/2019/11/03/45zPwF1mWMSuxaA.png)  
![management_2.png](https://i.loli.net/2019/11/03/9Z4XQVTBwUaG3H6.png)
![management_3.png](https://i.loli.net/2019/11/03/DmlxzToWGr47PXi.png)
![management_4.png](https://i.loli.net/2019/11/03/R4ojHfI7D698gW1.png)
![management_5.png](https://i.loli.net/2019/11/03/rPjNQhf7C4X2yWe.png)
![management_6.png](https://i.loli.net/2019/11/03/7REC9DkLGOVgmMu.png)
![management_7.png](https://i.loli.net/2019/11/03/9qNp18nkmhDOevc.png)
![management_8.png](https://i.loli.net/2019/11/03/GYnST3ztLK5al8v.png)
![management_9.png](https://i.loli.net/2019/11/03/e5lSFJWiAtQ6Y2g.png)
![management_10.png](https://i.loli.net/2019/11/03/QX7b63mdGwgfpBO.png)
