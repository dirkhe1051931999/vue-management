const router = require('koa-router')();
const post = require('./post.controller');
const comment = require('./comment.controller');

// 获取文章列表
router.get('/getPostList', post.getPostList);
// 获取文章内容
router.get('/getPost/:id', post.getPost);
// 获取归档
router.get('/getArchive', post.getArchive);
// 根据类型搜索
router.get('/category/:id', post.getPostsByCatId);
// 根据标签搜索
router.get('/tag/:id', post.getPostsByTagId);
// 根据关键字搜索
router.get('/keyword/:keyword', post.getPostsByKeyword);
// 获取个人项目内容
router.get('/getLaboratory', post.getLaboratory);
// 添加评论
router.post('/addComment', comment.addComment);
// 获取文章评论
router.get('/getCommentsByPostId/:postId', comment.getCommentsByPostId);

module.exports = router;