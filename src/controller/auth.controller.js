const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../app/config')

class AuthController {
  async login(ctx, next) {
    // jwt认证
    const { id, name } = ctx.user

    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      // token过期时间
      expiresIn: 60 * 60 * 24,
      // 加密算法
      algorithm: 'RS256',
    })

    ctx.body = {
      id,
      name,
      token,
    }
  }

  async success(ctx, next) {
    ctx.body = '授权成功~'
  }
}

module.exports = new AuthController()
