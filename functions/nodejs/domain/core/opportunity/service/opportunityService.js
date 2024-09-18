const { BaseService } = require("../../common/service/BaseService");
const { OpportunityRepository } = require("../repository/opportunityRepository");

class OpportunityService extends BaseService {
  constructor(context, logger){
    super(context, logger, new OpportunityRepository(context, logger))
  }
}

module.exports = {
  OpportunityService
}