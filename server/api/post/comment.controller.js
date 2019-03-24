const moment = require('moment');
const jwt = require('jsonwebtoken');
const config = require('../../config/environment');
const util = require('util');
const verify = util.promisify(jwt.verify);

// 添加评论
exports.addComment = async (ctx) => {
  let commentData = ctx.request.body.comment;
  commentData.createdTime = moment().format('YYYY-MM-DD HH:mm:ss');
  try {
    // 解密payload，获取用户名和ID
    let payload = await verify(ctx.request.body.token.split(' ')[1], config.tokenSecret);
    commentData.fromUserId = payload.id;
  } catch (error) {
    ctx.body = {
      success: -1,
      message: '用户登录信息已过期，请重新登录'
    };
    return;
  }
  try {
    let maxData = await ctx.execSql('SELECT IFNULL(max(number), 0) AS maxNumber FROM comments WHERE postId = ?', commentData.postId);
    let maxNumber = maxData[0].maxNumber + 1;
    commentData.number = maxNumber;
    let insert = await ctx.execSql('INSERT INTO comments SET ?', commentData);
    if (insert.affectedRows > 0) {
      ctx.body = {
        success: 1,
        data: {
          fromUserId: commentData.fromUserId,
          toUserId: commentData.toUserId,
          number: maxNumber
        }
      };
    } else {
      ctx.body = {
        success: 0,
        message: '添加评论错误'
      };
    }
  } catch (error) {
    console.log(error);
    ctx.body = {
      success: 0,
      message: '添加评论错误'
    };
  }
}
// 获取文章的评论
exports.getCommentsByPostId = async (ctx) => {
  let postId = ctx.params.postId || 0;
  sql = `SELECT comments.*, user.avatar as fromAvatar, user.userName as fromUserName
        FROM comments
        LEFT JOIN user ON comments.fromUserId = user.id
        WHERE comments.postId = ? ORDER BY comments.createdTime DESC`
  try {
    let comments = await ctx.execSql(sql, postId);
    ctx.body = {
      success: 1,
      message: '',
      comments: comments
    };
  } catch (error) {
    console.log(error)
    ctx.body = {
      success: 0,
      message: '获取评论错误'
    };
  }
}
