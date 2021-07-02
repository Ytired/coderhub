const Router = require('koa-router')
const { create, avatarInfo } = require('../controller/user.controller')
const { verifyUser, passwordEncryption } = require('../middleware/user.middleware')

const userRouter = new Router({ prefix: '/users' })

userRouter.post('/', verifyUser, passwordEncryption, create)
userRouter.get('/:userId/avatar', avatarInfo)

module.exports = userRouter
