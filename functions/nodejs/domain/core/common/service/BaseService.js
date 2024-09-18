class BaseService {
  constructor(context, logger, repository) {
    this.context = context
    this.logger = logger
    this.repository = repository
  }

  init = async() => {
    await this.repository.init()
  }

  query = async(options) => {
    return this.repository.query(options)
  }

  update = async(data) => {
    return this.repository.update(data)
  }

  create = async(data) => {
    return this.repository.create(data)
  }
}

module.exports = {
  BaseService
}