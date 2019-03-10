const router = require('koa-router')();
const github = require('./github.controller');

// 获取github认证
router.get('/github/github_oauth', github.githubOAuth);

module.exports = router;
