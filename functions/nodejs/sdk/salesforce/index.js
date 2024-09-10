const { Client } = require('./client')
const jsforce = require('jsforce')

const salesforceClient = async() => {
  const conn = new jsforce.Connection({
    oauth2: {
      clientId: '',
      clientSecret: '',
      loginUrl: ''
    },
    instanceUrl: ''
  })
  const client = new Client(null)
  return client
}

module.exports = {
  salesforceClient
}