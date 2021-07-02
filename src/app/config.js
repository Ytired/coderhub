const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')

dotenv.config()

// 读取公钥和私钥
const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, './keys/private.key')).toString()
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, './keys/public.key')).toString()

module.exports = {
  APP_HOST,
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
} = process.env

// 给module.exports对象增加两个属性
module.exports.PRIVATE_KEY = PRIVATE_KEY
module.exports.PUBLIC_KEY = PUBLIC_KEY
