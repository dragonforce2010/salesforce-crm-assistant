const { LeadRepository } = require("../repository/leadRepository")

class LeadService  {
  constructor(context, logger) {
    this.context = context
    this.logger = logger
    this.leadRepository = new LeadRepository(context, logger)
  }

  init = async() => {
    await this.leadRepository.init()
  }

  query = async(options) => {
    return this.leadRepository.query(options)
  }

  update = async(data) => {
    return this.leadRepository.update(data)
  }
}

module.exports = {
  LeadService
}