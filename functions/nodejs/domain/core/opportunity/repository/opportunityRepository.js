const { BaseRepository } = require("../../common/repository/BaseRepository");

class OpportunityRepository extends BaseRepository {
  constructor(context, logger) {
    super(context, logger, 'Opportunity')
  }
}

module.exports = {
  OpportunityRepository
}