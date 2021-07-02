const connection = require('../app/database')

class FileService {
  async createAvatar(mimetype, filename, size, userId) {
    const statement = `INSERT INTO avatar (filename, mimetype, size, user_id) VALUES (?, ?, ?, ?);`

    const [result] = await connection.execute(statement, [filename, mimetype, size, userId])

    return result
  }

  async getAvatarByUserId(userId) {
    const statement = `SELECT * FROM avatar WHERE user_id = ?;`

    const [result] = await connection.execute(statement, [userId])

    return result
  }

  async createFile(filename, mimetype, size, userId, momentId) {
    console.log(filename, mimetype, size, userId, momentId)
    const statement = `INSERT INTO file (filename, mimetype, size, user_id, moment_id) VALUES (?, ?, ?, ?, ?);`

    const [result] = await connection.execute(statement, [
      filename,
      mimetype,
      size,
      userId,
      momentId,
    ])

    return result
  }

  async getFileByFilename(filename) {
    const statement = `SELECT * FROM file WHERE filename = ?;`

    const [result] = await connection.execute(statement, [filename])

    return result
  }
}

module.exports = new FileService()
