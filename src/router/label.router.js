const Router = require('koa-router')
const { verifyAuth } = require('../middleware/auth.middleware.js')
const { labelCreate, labelList } = require('../controller/label.controller.js')

const labelRouter = new Router({ prefix: '/label' })

labelRouter.post('/', verifyAuth, labelCreate)
labelRouter.get('/', labelList)

module.exports = labelRouter
