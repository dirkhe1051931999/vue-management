const router = require('koa-router')();
const post = require('../api/post/post');
const admin = require('../api/admin/admin');
const oauth = require('../api/oauth/index');
// const track = require('../api/track/track');

// 获取已经发布的内容
router.use('/blogapi/post', post.routes(), post.allowedMethods());
// 后台管理系统正在修改内容
router.use('/backapi/admin', admin.routes(), admin.allowedMethods());
// github吊起权限
router.use('/blogapi/oauth', oauth.routes(), oauth.allowedMethods());
// 获取用户地址
// router.use('/blogapi/track', track.routes(), track.allowedMethods());
module.exports = router;
