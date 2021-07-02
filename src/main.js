const app = require('./app/index')
const cfg = require('./app/config')
require('./app/database')

app.listen(cfg.APP_PORT, () => {
  console.log(`服务器在${cfg.APP_PORT}端口已启动~`)
})
