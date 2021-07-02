const connection = require('../app/database')
// const sqlFragment = `

// `

class MomentService {
  async create(userId, content) {
    const statement = `INSERT INTO moment (content, user_id) VALUES (?, ?);`
    const [result] = await connection.execute(statement, [content, userId])
    return result
  }

  async getMomentById(momentId) {
    const statement = `
      SELECT 
        m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
        JSON_OBJECT('id', u.id, 'name', u.name, 'avatarUrl', u.avatar_url) author,
        IF(COUNT(l.id),JSON_ARRAYAGG(
          JSON_OBJECT('id', l.id, 'name', l.name)
        ),NULL) labels,
        (SELECT IF(COUNT(c.id),JSON_ARRAYAGG(
          JSON_OBJECT('id', c.id, 'content', c.content, 'commentId', c.comment_id, 'createTime', c.createAt,
                      'user', JSON_OBJECT('id', cu.id, 'name', cu.name, 'avatarUrl', cu.avatar_url))
        ),NULL) FROM comment c LEFT JOIN users cu ON c.user_id = cu.id WHERE m.id = c.moment_id) comments,
        (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:3000/moment/images/', file.filename))
        FROM file WHERE m.id = file.moment_id) images
      FROM moment m
      LEFT JOIN users u ON m.user_id = u.id
      LEFT JOIN moment_label ml ON m.id = ml.moment_id
      LEFT JOIN label l ON ml.label_id = l.id
      WHERE m.id = ?
      GROUP BY m.id;
    `
    const [result] = await connection.execute(statement, [momentId])
    return result[0]
  }

  async getMomentList(offset, size) {
    const statement = `
        SELECT
        m.id id, m.content content, m.createAt createTime, m.updateAt updataTime,
        JSON_OBJECT('id', u.id, 'name', u.name) AS author,
				(SELECT COUNT(*) FROM comment AS c WHERE c.moment_id  = m.id) AS commentCount,
        (SELECT COUNT(*) FROM moment_label AS ml WHERE ml.moment_id  = m.id) AS labelCount,
        (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:3000/moment/images/', file.filename))
        FROM file WHERE m.id = file.moment_id) images
        FROM moment m
				LEFT JOIN users u ON m.user_id = u.id LIMIT ?, ?;
    `
    const [result] = await connection.execute(statement, [offset, size])
    return result
  }

  async updateMoment(content, momentId) {
    const statement = `UPDATE moment set content = ? where id = ?;`
    const [result] = await connection.execute(statement, [content, momentId])
    return result
  }

  async removeMoment(momentId) {
    const statement = `DELETE FROM moment WHERE id = ?;`
    const [result] = await connection.execute(statement, [momentId])
    return result
  }

  async hasLabel(momentId, label) {
    const statement = `SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?;`
    const [result] = await connection.execute(statement, [momentId, label])
    return result[0] ? true : false
  }

  async addLabel(momentId, label) {
    const statement = `INSERT INTO moment_label (moment_id, label_id) VALUES (?, ?)`
    const [result] = await connection.execute(statement, [momentId, label])
    return result
  }
}

module.exports = new MomentService()
