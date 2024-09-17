const { Client } = require("./client");
const jsforce = require("jsforce");
const {
  LOGIN_URL,
  SALESFORCE_INSTANCE_URL,
  CLIENT_ID,
  CLIENT_SECRET,
  SALESFORCE_USERNAME,
  SALESFORCE_PASSWORD,
  TOKEN_REDIS_KEY_PREFIX,
} = require("./constant");

const salesforceClient = async (context, logger) => {
  const accessToken = await getTokenFromRedis(context, logger);
  const { loginUrl, instanceUrl, clientId, clientSecret, userName, password } =
    await getSalesforceConfig();
  const conn = new jsforce.Connection({
    oauth2: {
      clientId,
      clientSecret,
      loginUrl,
    },
    instanceUrl,
    accessToken,
    refreshFn: async (conn, callback) => {
      try {
        const userInfo = await conn.login(userName, password);
        logger.info(
          `token refreshed using user account ${JSON.stringify(userInfo)}`
        );
        callback(null, conn.accessToken);
        await saveTokenToRedis(context, logger, conn.accessToken);
      } catch (error) {
        logger.error("error occurred! error = ", error);
      }
    },
  });
  const client = new Client(context, logger, conn);
  return client;
};

const getTokenFromRedis = async (context, logger) => {
  const tokenData = await baas.redis.get(
    `${TOKEN_REDIS_KEY_PREFIX}_${context.user._id}`
  );
  return tokenData;
};

const saveTokenToRedis = async (context, logger, token) => {
  await baas.redis.set(`${TOKEN_REDIS_KEY_PREFIX}_${context.user._id}`, token);
};

/* const getSalesforceConfig = async() => {
  const loginUrl = await application.globalVar.getVar(LOGIN_URL)
  const instanceUrl = await application.globalVar.getVar(SALESFORCE_INSTANCE_URL)
  const clientId = await application.globalVar.getVar(CLIENT_ID)
  const clientSecret = await application.globalVar.getVar(CLIENT_SECRET)
  const userName = await application.globalVar.getVar(SALESFORCE_USERNAME)
  const password = await application.globalVar.getVar(SALESFORCE_PASSWORD)

  return {
    loginUrl,
    instanceUrl,
    clientId,
    clientSecret,
    userName,
    password
  }
} */
const getSalesforceConfig = async () => {
  const currentSalesforceEnvironment = await baas.redis.get(
    "currentSalesforceEnvironment"
  );
  const { loginUrl, instanceUrl, clientId, clientSecret, userName, password } =
    JSON.parse(currentSalesforceEnvironment || {});
  return {
    loginUrl,
    instanceUrl,
    clientId,
    clientSecret,
    userName,
    password,
  };
};

module.exports = {
  salesforceClient,
};
