const { NAME_OR_PASSWORD_IS_NOT_NULL, USER_ALREADY_EXISTS } = require('../constants/error-types')
const service = require('../service/user.service')
const md5password = require('../utils/passwordEncryption')

// 密码验证中间件
const verifyUser = async (ctx, next) => {
  //获取用户名和密码
  const { name, password } = ctx.request.body

  // 判断用户名和密码不能为空
  if (!name || !password) {
    const err = new Error(NAME_OR_PASSWORD_IS_NOT_NULL)
    return ctx.app.emit('error', err, ctx)
  }

  // 判断用户是否重复注册
  const result = await service.getUserByname(name)
  if (result.length) {
    const err = new Error(USER_ALREADY_EXISTS)
    return ctx.app.emit('error', err, ctx)
  }

  await next()
}

// 密码加密中间件
const passwordEncryption = async (ctx, next) => {
  //获取密码
  const { password } = ctx.request.body
  ctx.request.body.password = md5password(password)

  await next()
}

module.exports = { verifyUser, passwordEncryption }
