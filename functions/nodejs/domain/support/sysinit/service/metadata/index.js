const { Account } = require("./account")
const { Activity } = require("./activity")
const { Contact } = require("./contact")
const { Lead } = require("./lead")
const { Opportunity } = require("./opportunity")
const { Event } = require("./event")

const metadata = {
  Lead,
  Account,
  Opportunity,
  Contact,
  Activity,
  Event
}

module.exports = {
  metadata
}