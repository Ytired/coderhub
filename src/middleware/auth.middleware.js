const jwt = require('jsonwebtoken')
const {
  NAME_OR_PASSWORD_IS_NOT_NULL,
  USER_DOES_NOT_EXIST,
  WRONG_PASSWORD,
  UNAUTHORIZED,
  NONEXISTENT_TOKEN,
  UNPREMISSION,
} = require('../constants/error-types')
const userService = require('../service/user.service')
const md5password = require('../utils/passwordEncryption')
const { PUBLIC_KEY } = require('../app/config')
const authService = require('../service/auth.service')

const verifyLogin = async (ctx, next) => {
  //获取用户名和密码
  const { name, password } = ctx.request.body

  // 判断用户名和密码不能为空
  if (!name || !password) {
    const err = new Error(NAME_OR_PASSWORD_IS_NOT_NULL)
    return ctx.app.emit('error', err, ctx)
  }

  // 判断用户是否存在
  const result = await userService.getUserByname(name)
  const user = result[0]
  if (!user) {
    const err = new Error(USER_DOES_NOT_EXIST)
    return ctx.app.emit('error', err, ctx)
  }

  // 判断用户密码是否与数据库密码一致
  if (md5password(password) !== user.password) {
    const err = new Error(WRONG_PASSWORD)
    return ctx.app.emit('error', err, ctx)
  }
  // 将user赋值到ctx对象上
  ctx.user = user
  await next()
}

/**
 * 授权验证
 */
const verifyAuth = async (ctx, next) => {
  const authorization = ctx.headers.authorization

  // 验证token是否存在
  if (!authorization) {
    const err = new Error(NONEXISTENT_TOKEN)
    return ctx.app.emit('error', err, ctx)
  }
  // 获取token
  const token = authorization.replace('Bearer ', '')

  // 验证token
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      // 解密算法
      algorithm: ['RS256'],
    })
    ctx.user = result
    await next()
  } catch (error) {
    const err = new Error(UNAUTHORIZED)
    ctx.app.emit('error', err, ctx)
  }
}

/**
 * 权限验证
 */
const verifyPermission = async (ctx, next) => {
  // 获取参数
  const [resourceKey] = Object.keys(ctx.params)
  const tableName = resourceKey.replace('Id', '')
  const resourceId = ctx.params[resourceKey]
  const { id } = ctx.user

  // 查询是否具备修改权限
  try {
    const isPermission = await authService.checkResource(tableName, resourceId, id)
    // 抛出异常
    if (!isPermission) throw new Error()
    // 没有异常就执行下一个中间件
    await next()
  } catch (error) {
    const err = new Error(UNPREMISSION)
    return ctx.app.emit('error', err, ctx)
  }
}

module.exports = { verifyLogin, verifyAuth, verifyPermission }
