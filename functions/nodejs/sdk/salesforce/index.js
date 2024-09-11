const { Client } = require('./client')
const jsforce = require('jsforce')

const salesforceClient = async(context, logger) => {
  const token = await getTokenFromRedis(context, logger)
  const conn = new jsforce.Connection({
    oauth2: {
      clientId: '3MVG9k02hQhyUgQDLqXDVQVzvg.ns2L3OfrYnfLtQNbOlzJSpVGMoDUUSCduVVRELL2RC4f8lBM8BpIs27Lb1',
      clientSecret: 'B55AE749CA7F9DEB0471046EAB128F22AE5BB47AC5C8E687C56A81B634742772',
      loginUrl: 'https://login.salesforce.com'
    },
    instanceUrl: 'https://personalaction-dev-ed.develop.my.salesforce.com',
    accessToken: token,
    refreshFn: async (conn, callback) => {
      try{
        const userInfo = await conn.login('michael.zhang@apaas.com', 'apaastraining920')
        logger.info(`token refreshed using user account ${JSON.stringify(userInfo)}`)
        callback(null, conn.accessToken)
        await saveTokenToRedis(context, logger, conn.accessToken)
      } catch(error) {
        logger.error('error occurred! error = ', error)
      }
    }
  })
  const client = new Client(conn)
  return client
}

const getTokenFromRedis = async (context, logger) => {
  const tokenData = await baas.redis.get(`sfToken_${context.user._id}`)
  return tokenData
}

const saveTokenToRedis = async (context, logger, token) => {
  await baas.redis.set(`sfToken_${context.user._id}`, token)
}

module.exports = {
  salesforceClient
}