const { BaseRepository } = require("../../common/repository/BaseRepository");

class FollowupNoteRepository extends BaseRepository{
  constructor(context, logger) {
    super(context, logger, 'Event') 
  }
}

module.exports = {
  FollowupNoteRepository
}