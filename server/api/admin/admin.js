const router = require('koa-router')();
const admin = require('./admin.controller');
const post = require('./post.controller');
const category = require('./category.controller');
const tag = require('./tag.controller');
const laboratory = require('./laboratory.controller');

// 登录/登出
router.post('/login', admin.login);
router.get('/signOut', admin.signOut);

// 文章路由路由
// 获取文章详情
router.get('/getPostById/:id', post.getPostById);
// 添加文章
router.post('/addPost', post.addPost);
// 更新文章
router.post('/updatePost/:id', post.updatePost);
// 获取文章列表
router.get('/getPostList', post.getPostList);
// 获取文章总数
router.get('/getPostTotal', post.getPostTotal);
// 下架文章
router.put('/offlinePost/:id', post.offlinePost);
// 发布文章
router.put('/publishPost/:id', post.publishPost);
// 删除文章
router.delete('/deletePost/:id', post.deletePost);
// 获取当前的文章的类别
router.get('/getPostsByCatId/:id', category.getPostsByCatId);
// 获取当前文章的标签
router.get('/getPostsByTagId/:id', tag.getPostsByTagId);

// 文章分类路由
// 获取所有类别
router.get('/getCategories', category.getCategories);
// 添加文章类别
router.put('/addNewCategory/:name', category.addNewCategory);
// 更新文章类别
router.put('/updateCategory/:id', category.updateCategory);
// 删除当前文章类别
router.delete('/deleteCategory/:id', category.deleteCategory);

// 文章标签路由
// 获取所有标签
router.get('/getTags', tag.getTags);
// 写文章的时候添加文章标签
router.put('/addNewTagWhenPost/:name', tag.addNewTagWhenPost);
// 添加文章标签
router.put('/addNewTag/:name', tag.addNewTag);
// 更新文章标签
router.put('/updateTag/:id', tag.updateTag);
// 删除文章标签 
router.delete('/deleteTag/:id', tag.deleteTag);
// 搜索文章标签
router.get('/searchTagByName/:name', tag.searchTagByName);

// 个人项目路由
// 获取所有个人项目
router.get('/getLaboratories', laboratory.getLaboratories);
// 添加个人项目
router.post('/createNewLaboratory', laboratory.createNewLaboratory);
// 更新个人项目
router.post('/updateLaboratory', laboratory.updateLaboratory);
// 删除个人项目
router.delete('/deleteLaboratory/:id', laboratory.deleteLaboratory);

module.exports = router;
