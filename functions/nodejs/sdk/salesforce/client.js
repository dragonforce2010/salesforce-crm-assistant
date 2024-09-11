const jsforce = require('jsforce')

class Client {
  conn = new jsforce.Connection()
  constructor(conn) {
    this.conn = conn
  }

  async find(objectApiName, options = {}) {
    let { fields, limit, skip, sortBy, condition = {}, pagination} = options
    const result = await this.conn.sobject(objectApiName)
      .find(condition, fields)
      .limit(limit)
      .skip(skip)
      .sort(sortBy)
      .execute()

    return result
  }
}

module.exports = {
  Client
}