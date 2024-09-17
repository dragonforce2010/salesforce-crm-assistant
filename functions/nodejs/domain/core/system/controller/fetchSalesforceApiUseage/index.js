// 通过 NPM dependencies 成功安装 NPM 包后此处可引入使用
// 如安装 linq 包后就可以引入并使用这个包
// const linq = require("linq");

const { salesforceClient } = require("../../../../../sdk/salesforce")

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
  const client = await salesforceClient(context, logger)
  // 需要触发至少一次api调用，以获得limitInfo
  await client.conn.query('SELECT Id FROM Account limit 1')
  return {
    limit:  client.conn.limitInfo.apiUsage.limit,
    used:  client.conn.limitInfo.apiUsage.used,
    remaining: client.conn.limitInfo.apiUsage.limit - client.conn.limitInfo.apiUsage.used,
    ration: (client.conn.limitInfo.apiUsage.used * 100 / client.conn.limitInfo.apiUsage.limit).toFixed(2)
  }
}