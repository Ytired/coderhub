const fs = require('fs')
const userService = require('../service/user.service')
const fileService = require('../service/file.service')
const { AVATAR_PATH } = require('../constants/file-path')

class UserController {
  async create(ctx, next) {
    // 获取用户传递的参数
    const user = ctx.request.body

    // 查询参数
    const result = await userService.create(user)

    // 返回数据
    ctx.body = result
  }

  /**
   * 获取头像信息
   */
  async avatarInfo(ctx, next) {
    // 获取id
    const { userId } = ctx.params

    // 查询
    const [avatarInfo] = await fileService.getAvatarByUserId(userId)

    // 返回数据
    ctx.response.set('content-type', avatarInfo.mimetype)
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`)
  }
}

module.exports = new UserController()
