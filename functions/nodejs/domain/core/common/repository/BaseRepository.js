const { salesforceClient } = require("../../../../sdk/salesforce")

class BaseRepository {
  constructor(context, logger, tableName) {
    this.context = context
    this.logger = logger
    this.tableName = tableName
  }

  init = async () => {
    this.client = await salesforceClient(this.context, this.logger)
  }

  query = async (options) => {
    return this.client.find(this.tableName, options)
  }

  update = async(data) => {
    return this.client.update(this.tableName, data)
  }

  create = async(data) => {
    return this.client.create(this.tableName, data)
  }
}

module.exports = {
  BaseRepository
}