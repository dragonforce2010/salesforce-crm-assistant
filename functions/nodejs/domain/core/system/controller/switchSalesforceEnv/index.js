// 通过 NPM dependencies 成功安装 NPM 包后此处可引入使用
// 如安装 linq 包后就可以引入并使用这个包
// const linq = require("linq");

/**
 * @param {Params}  params     自定义参数
 * @param {Context} context    上下文参数，可通过此参数下钻获取上下文变量信息等
 * @param {Logger}  logger     日志记录器
 *
 * @return 函数的返回数据
 */
module.exports = async function (params, context, logger) {
  // 日志功能
  // logger.info(`${new Date()} 函数开始执行`);

  // 在这里补充业务代码
  const {envId} = params;
  await application.data.object('salesforceEnvironment')
    .select([
      '_id'
    ])
    .findStream(async (records) => {
      await application.data.object('salesforceEnvironment').batchUpdate(records.map(r => {
        return {
          _id: r._id,
          isCurrentEnv: false
        }
      }))
  })

  await application.data.object('salesforceEnvironment').update({
    _id: Number(envId),
    isCurrentEnv: true,
  })

  const env = await application.data.object('salesforceEnvironment')
    .where({
      _id: envId
    })
    .select(['clientId', 'clientSecret', 'instanceUrl', 'loginUrl', 'userName', 'password'])
    .findOne()
  
  if(!env) {
    throw new Error('环境不存在')
  }
  
  await baas.redis.set('currentSalesforceEnvironment', JSON.stringify(env));
}