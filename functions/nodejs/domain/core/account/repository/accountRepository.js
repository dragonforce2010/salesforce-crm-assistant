const { salesforceClient } = require("../../../../sdk/salesforce")
const { BaseRepository } = require("../../common/repository/BaseRepository")

class AccountRepository extends BaseRepository{
  constructor(context, logger) {
    super(context, logger, 'Account')
  }
}

module.exports = {
  AccountRepository
}