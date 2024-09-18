const { BaseService } = require("../../common/service/BaseService");
const { FollowupNoteRepository } = require("../repository/followupNoteRepository");

class FollowupNoteService extends BaseService {
  constructor(context, logger) {
    super(context, logger, new FollowupNoteRepository(context, logger))
  }
}

module.exports = {
  FollowupNoteService
}