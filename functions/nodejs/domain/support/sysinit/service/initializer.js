const { salesforceClient } = require("../../../../sdk/salesforce");
const { metadata } = require("./metadata/index");
const { appInitData } = require("./appInitData/index");
const { profiles } = require("./metadata/profile");
const moment = require("moment");

class Initializer {
  constructor(context, logger) {
    this.context = context;
    this.logger = logger;
  }

  async init() {
    this.client = await salesforceClient(this.context, this.logger);
  }

  async createAllObjectFields() {
    for (let objectApiName of Object.keys(metadata)) {
      this.logger.info(`Creating fields for ${objectApiName}...`);
      await this.client.createObjectFields(
        objectApiName,
        metadata[objectApiName].customizedFields
      );
    }
  }

  async grantAllObjectFieldsPermToProfiles() {
    for (let objectApiName of Object.keys(metadata)) {
      this.logger.info(`Granting fields perm for ${objectApiName}...`);
      await this.client.grantFieldsPermToProfiles(
        objectApiName,
        [
          ...metadata[objectApiName].customizedFields,
          ...metadata[objectApiName].grantFields,
        ],
        profiles
      );
    }
  }

  async createAllObjectData() {
    // 创建对象记录（基础字段信息，不包含引用关系）
    for (let objectApiName of Object.keys(appInitData)) {
      this.logger.info(`Creating ${objectApiName}...`);
      appInitData[objectApiName] = appInitData[objectApiName].map((item) => {
        for (let key in item) {
          if (item[key] === "NOW_DATE") {
            item[key] = moment(Date.now()).format("YYYY-MM-DDTHH:mm:ss.SSSZ");
          }

          let options = metadata[objectApiName].mockDataSelect || []
          for(let optionName in options) {
            const optionValues = options[optionName]
            if (optionValues) {
              const randomIndex = Math.floor(Math.random() * optionValues.length);
              item[optionName] = optionValues[randomIndex];
            }
          }
          
        }
        return item;
      });

      const res = await this.client.create(
        objectApiName,
        appInitData[objectApiName]
      );
      this.logger.info(`Created ${objectApiName}, total: ${res.length}`);
      appInitData[objectApiName].forEach((ele, index) => {
        ele["Id"] = res[index].id;
      });
    }

    // 更新对象记录（主要更新引用关系）
    for (let objectApiName of Object.keys(appInitData)) {
      this.logger.info(
        `Creating ${objectApiName} related object reference ...`
      );
      appInitData[objectApiName] = appInitData[objectApiName].map((item) => {
        for (let key in metadata[objectApiName].pk) {
          const referenceObjectApiName =
            metadata[objectApiName].pk[key].objectApiName;
          const referenceObjectData = appInitData[
            referenceObjectApiName
          ]?.filter((item) => item.Id);
          if (referenceObjectData.length == 0) break;
          const randomIndex = Math.floor(
            Math.random() * referenceObjectData.length
          );
          item[key] = referenceObjectData[randomIndex].Id;
        }
        return item;
      });

      const tobeUpdated =
        appInitData[objectApiName].filter((item) => item.Id) || [];
      if (tobeUpdated.length > 0) {
        await this.client.update(objectApiName, tobeUpdated);
        this.logger.info(
          `Updated ${objectApiName} related object reference, total: ${tobeUpdated.length}`
        );
      }
    }
  }

  async deleteAllObjectData() {
    for (let objectApiName of Object.keys(metadata)) {
      if (!metadata[objectApiName].allowDelete) continue;
      this.logger.info(`Deleting ${objectApiName}...`);
      await this.client.deleteAll(objectApiName);
    }
  }
}

module.exports = {
  Initializer,
};
