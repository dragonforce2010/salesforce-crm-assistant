const { salesforceClient } = require("../../../../sdk/salesforce")
const { BaseRepository } = require("../../common/repository/BaseRepository")

class LeadRepository extends BaseRepository{
  constructor(context, logger) {
    super(context, logger, 'lead')
  }
}

module.exports = {
  LeadRepository
}