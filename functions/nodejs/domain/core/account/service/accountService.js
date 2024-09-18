const { BaseService } = require("../../common/service/BaseService")
const { AccountRepository } = require("../repository/accountRepository")

class AccountService extends BaseService {
  constructor(context, logger) {
    super(context, logger, new AccountRepository(context, logger))
  }
}

module.exports = {
  AccountService
}