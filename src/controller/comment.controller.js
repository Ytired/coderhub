const service = require('../service/comment.service')

class CommentController {
  // 评论
  async commentCreate(ctx, next) {
    // 获取数据
    const { momentId, content } = ctx.request.body
    const { id } = ctx.user
    // 插入评论
    const result = await service.create(momentId, content, id)

    ctx.body = result
  }

  // 回复
  async commentReply(ctx, next) {
    // 获取数据
    const { momentId, content } = ctx.request.body
    const { commentId } = ctx.params
    const { id } = ctx.user

    //插入回复
    const result = await service.reply(momentId, content, id, commentId)

    ctx.body = result
  }

  // 修改
  async commentUpdate(ctx, next) {
    // 获取数据
    const { commentId } = ctx.params
    const { content } = ctx.request.body

    // 修改评论
    const result = await service.update(commentId, content)

    ctx.body = result
  }

  // 删除
  async commentRemove(ctx, next) {
    // 获取数据
    const { commentId } = ctx.params

    const result = await service.remove(commentId)

    ctx.body = result
  }

  // 获取评论列表
  async commentList(ctx, next) {
    // 必须传momentId
    const { momentId } = ctx.query

    const result = await service.getComentsByMomentId(momentId)

    ctx.body = result
  }
}

module.exports = new CommentController()
