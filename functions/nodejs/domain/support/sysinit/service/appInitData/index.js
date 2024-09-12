const { AccountInitData } = require("./account")
const { ContactInitData } = require("./contact")
const { EventInitData } = require("./event")
const { LeadInitData } = require("./lead")
const { OpportunityInitData } = require("./opportunity")

const appInitData = {
  LeadInitData,
  AccountInitData,
  OpportunityInitData,
  ContactInitData,
  EventInitData
}

module.exports = {
  appInitData
}