const { Initializer } = require("./initializer");

class InitService {
  constructor(context, logger) {
    this.context = context;
    this.logger = logger;
    this.initializer = new Initializer(context, logger)
  }

  async init() {
    await this.initializer.init()
  }

  async initMetaData() {
    await this.initializer.createAllObjectFields()
    await this.initializer.grantAllObjectFieldsPermToProfiles()    
  } 
  
  async initAppData() {

  }
}

module.exports = {
  InitService
}