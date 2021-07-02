const Router = require('koa-router')
const authRouter = new Router()

const { verifyLogin, verifyAuth } = require('../middleware/auth.middleware')
const { login, success } = require('../controller/auth.controller')

authRouter.post('/login', verifyLogin, login)
authRouter.get('/test', verifyAuth, success)

module.exports = authRouter
