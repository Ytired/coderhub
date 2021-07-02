const Router = require('koa-router')
const { verifyAuth, verifyPermission } = require('../middleware/auth.middleware.js')
const {
  commentCreate,
  commentReply,
  commentUpdate,
  commentRemove,
  commentList,
} = require('../controller/comment.controller.js')

const commentRouter = new Router({ prefix: '/comment' })

// 创建
commentRouter.post('/', verifyAuth, commentCreate)
// 回复
commentRouter.post('/:commentId/reply', verifyAuth, commentReply)
// 修改
commentRouter.patch('/:commentId', verifyAuth, verifyPermission, commentUpdate)
// 删除
commentRouter.delete('/:commentId', verifyAuth, verifyPermission, commentRemove)
//获取评论列表
commentRouter.get('/', commentList)
module.exports = commentRouter
