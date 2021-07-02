const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const useRoutes = require('../router/index')
const errorHandler = require('./error-handle')

const app = new Koa()
app.useRoutes = useRoutes

// 对json/form/text/xml数据进行解析
app.use(bodyParser())
app.useRoutes()

// 错误处理中间件
app.on('error', errorHandler)

module.exports = app
