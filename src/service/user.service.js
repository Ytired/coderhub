const connection = require('../app/database')

class UserService {
  async create(user) {
    // 处理请求的数据
    const { name, password } = user
    // sql语句
    const statement = `INSERT INTO users (name, password) VALUES (?, ?);`

    // 将user存储到数据库
    const result = await connection.execute(statement, [name, password])

    // 返回数据
    return result[0]
  }

  async getUserByname(name) {
    const statement = `SELECT * FROM users WHERE name = ?;`

    const result = await connection.execute(statement, [name])

    return result[0]
  }

  async updateAvatarUrlById(avatarUrl, userId) {
    const statement = `UPDATE users SET avatar_url = ? WHERE id = ?;`

    const result = await connection.execute(statement, [avatarUrl, userId])

    return result
  }
}

module.exports = new UserService()
