const {
  NAME_OR_PASSWORD_IS_NOT_NULL,
  USER_ALREADY_EXISTS,
  USER_DOES_NOT_EXIST,
  WRONG_PASSWORD,
  UNAUTHORIZED,
  NONEXISTENT_TOKEN,
  UNPREMISSION,
} = require('../constants/error-types')

const errorHandle = (err, ctx) => {
  let status, message

  switch (err.message) {
    case NAME_OR_PASSWORD_IS_NOT_NULL:
      status = 400 // bad request
      message = '用户名或者密码不能为空~'
      break
    case USER_ALREADY_EXISTS:
      status = 409 // conflict
      message = '该用户名已经存在~'
      break
    case USER_DOES_NOT_EXIST:
      status = 400 // 参数错误
      message = '用户名不存在~'
      break
    case WRONG_PASSWORD:
      status = 400 // 参数错误
      message = '密码错误~'
      break
    case UNAUTHORIZED:
      status = 401
      message = '无效的token~'
      break
    case NONEXISTENT_TOKEN:
      status = 401
      message = '不存在的token~'
      break
    case UNPREMISSION:
      status = 401
      message = '您不具备操作的权限~'
      break
    default:
      status = 404
      message = '页面未找到~'
      break
  }
  ctx.status = status
  ctx.body = message
}

module.exports = errorHandle
