const { Client } = require('./client')
const jsforce = require('jsforce')

const salesforceClient = async(logger, context) => {
  const conn = new jsforce.Connection({
    oauth2: {
      clientId: '3MVG9k02hQhyUgQDLqXDVQVzvg.ns2L3OfrYnfLtQNbOlzJSpVGMoDUUSCduVVRELL2RC4f8lBM8BpIs27Lb1',
      clientSecret: 'B55AE749CA7F9DEB0471046EAB128F22AE5BB47AC5C8E687C56A81B634742772',
      loginUrl: 'https://login.salesforce.com'
    },
    instanceUrl: 'https://personalaction-dev-ed.develop.my.salesforce.com',
    refreshFn: async (conn, callback) => {
      try{
        const userInfo = await conn.login('michael.zhang@apaas.com', 'apaastraining920')
        logger.info(`token refreshed using user account ${userInfo}`)
        callback(null, conn.accessToken)
      } catch(error) {
        logger.error('error occurred! error = ', error)
      }
    }
  })
  const client = new Client(conn)
  return client
}

module.exports = {
  salesforceClient
}