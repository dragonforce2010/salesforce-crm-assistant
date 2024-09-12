const { salesforceClient } = require('../../../../sdk/salesforce')
const {metadata} = require('./metadata/index')
const { profiles } = require('./metadata/profile')

class Initializer {
  constructor(context, logger) {
    this.context = context
    this.logger = logger
  }

  async init() {
    this.client = await salesforceClient(this.context, this.logger)
  }

  async createAllObjectFields() {
    for(let objectApiName of Object.keys(metadata)) {
      this.logger.info(`Creating fields for ${objectApiName}...`)
      await this.client.createObjectFields({
        objectApiName,
        fields: metadata[objectApiName].customizedFields
      })
    }
  }

  async grantAllObjectFieldsPermToProfiles() {
    for(let objectApiName of Object.keys(metadata)) {
      this.logger.info(`Granting fields perm for ${objectApiName}...`)
      await this.client.grantFieldsPermToProfiles({
        objectApiName,
        fields: [
          ...metadata[objectApiName].customizedFields, 
          ...metadata[objectApiName].grantFields
        ],
        profiles
      })
    }
  }
}

module.exports = {
  Initializer,
}