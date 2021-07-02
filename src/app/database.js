const mysql = require('mysql2')
const cfg = require('./config')

const connection = mysql.createPool({
  host: cfg.MYSQL_HOST,
  port: cfg.MYSQL_PORT,
  database: cfg.MYSQL_DATABASE,
  user: cfg.MYSQL_USER,
  password: cfg.MYSQL_PASSWORD,
  connectionLimit: 10,
})

connection.getConnection((err, conn) => {
  conn.connect(err => {
    if (err) {
      console.log('连接失败:', err)
    } else {
      console.log('数据库连接成功~')
    }
  })
})

module.exports = connection.promise()
