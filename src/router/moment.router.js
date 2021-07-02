const Router = require('koa-router')
const momentRouter = new Router({ prefix: '/moment' })
const { verifyAuth, verifyPermission } = require('../middleware/auth.middleware')
const { verifyLabelExists } = require('../middleware/label.middleware.js')
const {
  create,
  detail,
  list,
  update,
  remove,
  addlabels,
  fileInfo,
} = require('../controller/moment.controller')

momentRouter.post('/', verifyAuth, create)
momentRouter.get('/', list)
momentRouter.get('/:momentId', detail)
momentRouter.patch('/:momentId', verifyAuth, verifyPermission, update)
momentRouter.delete('/:momentId', verifyAuth, verifyPermission, remove)
// 动态标签接口
momentRouter.post('/:momentId/labels', verifyAuth, verifyPermission, verifyLabelExists, addlabels)
momentRouter.get('/images/:filename', fileInfo)
module.exports = momentRouter
