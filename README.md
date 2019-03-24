# vue-blog 后台管理系统

---

## 技术栈

vue+vue-router+node+koa+mysql+redis+socket

## 版本

`v1.0.2`

## 更新记录

1. 2019-03-16
   - 增加 github 授权认证
2. 2019-03-24
   - 增加留言功能

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
4. 首页增加可视化图表
5. 获取用户位置
6. 留言管理功能
7. ...

## 注意事项

1. vue.socket.io 版本必须是`^2.1.1-a`
2. 安装 mysql，用 `navicat` 连接 mysql，导入项目中 sql 文件，`my_vue_blog` 是有数据和结构的文件，`my_vue_blog2` 是只有结构，注意数据库名字和数据库登录的帐号密码
3. 安装 redis,用 `RedisDesktopManager` 连接 redis，前提是开启了 redis 服务（如果配置环境变量，则 cmd 中输入 `redis-server`，否则进入 redis 安装的目录里输入 `redis-server.exe` `redis.windows.conf`）
4. 登录帐号是 `admin/123456`

## 如何使用

1. npm install
2. npm run redis
3. npm run server
4. npm run dev

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

## 实现效果

![效果1](https://github.com/dirkhe1051931999/vue-blog-management/blob/master/screenshot/1.png) ![效果2](https://github.com/dirkhe1051931999/vue-blog-management/blob/master/screenshot/2.png) ![效果3](https://github.com/dirkhe1051931999/vue-blog-management/blob/master/screenshot/3.png) ![效果4](https://github.com/dirkhe1051931999/vue-blog-management/blob/master/screenshot/4.png) ![效果5](https://github.com/dirkhe1051931999/vue-blog-management/blob/master/screenshot/5.png) ![效果6](https://github.com/dirkhe1051931999/vue-blog-management/blob/master/screenshot/6.png) ![效果7](https://github.com/dirkhe1051931999/vue-blog-management/blob/master/screenshot/7.png) ![效果8](https://github.com/dirkhe1051931999/vue-blog-management/blob/master/screenshot/8.png)

## MIT
