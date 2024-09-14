const { Account } = require("./account")
const { Contact } = require("./contact")
const { Event } = require("./event")
const { Lead } = require("./lead")
const { Opportunity } = require("./opportunity")

const appInitData = {
  Lead,
  Account,
  Opportunity,
  Contact,
  Event
}

module.exports = {
  appInitData
}