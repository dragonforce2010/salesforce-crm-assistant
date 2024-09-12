const { salesforceClient } = require("../../../../sdk/salesforce")

class LeadRepository {
  tableName = 'Lead'
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
}

module.exports = {
  LeadRepository
}