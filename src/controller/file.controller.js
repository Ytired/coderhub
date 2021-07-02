const service = require('../service/file.service')
const userService = require('../service/user.service')
const { AVATAR_PATH } = require('../constants/file-path')
const { APP_HOST, APP_PORT } = require('../app/config')

class FileController {
  /**
   * 保存头像信息
   */
  async saveAvatarInfo(ctx, next) {
    // 获取图像相关的信息
    const { mimetype, filename, size } = ctx.req.file
    const { id } = ctx.user

    // 把信息存储到数据库
    const result = await service.createAvatar(mimetype, filename, size, id)

    const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`

    await userService.updateAvatarUrlById(avatarUrl, id)
    ctx.body = '用户上传头像成功'
  }

  /**
   * 保存配图信息
   */
  async savePictureInfo(ctx, next) {
    const files = ctx.req.files
    const { id } = ctx.user
    const { momentId } = ctx.query

    for (let file of files) {
      const { filename, mimetype, size } = file
      await service.createFile(filename, mimetype, size, id, momentId)
    }

    ctx.body = '动态配图上传完成~'
  }
}

module.exports = new FileController()
