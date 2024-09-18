const { BaseService } = require("../../common/service/BaseService")
const { LeadRepository } = require("../repository/leadRepository")

class LeadService extends BaseService{
  constructor(context, logger) {
    super(context, logger, new LeadRepository(context, logger))
  }
}

module.exports = {
  LeadService
}