const { salesforceClient } = require("../../../../sdk/salesforce")

class AccountRepository {
  tableName = 'Account'
  constructor(context, logger) {
    this.context = context
    this.logger = logger
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
}

module.exports = {
  AccountRepository
}