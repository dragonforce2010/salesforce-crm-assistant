const { AccountRepository } = require("../repository/accountRepository")

class AccountService  {
  constructor(context, logger) {
    this.context = context
    this.logger = logger
    this.accountRepository = new AccountRepository(context, logger)
  }

  init = async() => {
    await this.accountRepository.init()
  }

  query = async(options) => {
    return this.accountRepository.query(options)
  }

  update = async(data) => {
    return this.accountRepository.update(data)
  }
}

module.exports = {
  AccountService
}