const jsforce = require("jsforce");
const { RandomColor } = require('../../utils/randomColor')

class Client {
  conn = new jsforce.Connection();
  constructor(context, logger, conn) {
    this.context = context;
    this.logger = logger;
    this.conn = conn;
  }

  async find(objectApiName, options = {}) {
    let { fields, limit, skip, sortBy, condition = {}, pagination } = options;
    try {
      const fetchDataPromise = this.conn
        .sobject(objectApiName)
        .find(condition, fields)
        .limit(limit)
        .skip(skip)
        .sort(sortBy)
        .execute();

      const fetchTotalPromise = this.conn.sobject(objectApiName).count(condition);
      const fetchPicklistFieldsMetaInfoPromise = this.getPicklistFieldsMetadata(objectApiName);
      const [data, total, meta] = await Promise.all([fetchDataPromise, fetchTotalPromise, fetchPicklistFieldsMetaInfoPromise]);

      return {
        data, total, meta
      };
    } catch (error) {
      this.logger.error("find error", error);
      return {
        data: null,
        total: 0,
      };
    }
  }

  async query(soql){
    return this.conn.query(soql)
  }

  async create(objectApiName, data) {
    try {
      return await this.conn.sobject(objectApiName).create(data);
    } catch (error) {
      this.logger.error("create error", error);
      return null;
    }
  }

  async update(objectApiName, data) {
    try {
      return await this.conn.sobject(objectApiName).update(data);
    } catch (error) {
      this.logger.error("update error", error);
      return null;
    }
  }

  async delete(objectApiName, data) {
    try {
      return await this.conn.sobject(objectApiName).delete(data);
    } catch (error) {
      this.logger.error("delete error", error);
      return null;
    }
  }

  async deleteAll(objectApiName) {
    try {
      let total = await this.conn.sobject(objectApiName).count();
      let pageSize = 100
      let index = 0

      while(index <= total) {
        const { data } = await this.find(objectApiName, {
          limit: pageSize,
          skip: index
        })  
        if(data && data.length > 0)
          await this.conn.sobject(objectApiName).deleteBulk(data);
        index += pageSize
      }
      this.logger.info(`deleteAll success, deleted ${total} records`);
    } catch (error) {
      this.logger.error("deleteAll error", error);
      return null;
    }
  }

  // metadata related apis
  async createObject(objectApiName, fields = [], comment) {
    const data = {
      fullName: objectApiName,
      label: comment,
      pluralLabel: "",
      fields,
      nameField: {
        type: "Text",
        label: comment,
      },
      deploymentStatus: "Deployed",
      sharingModel: "ReadWrite",
      visibility: "Public",
    };

    try {
      const result = await this.conn.metadata.create("CustomObject", data);
      this.logger.info("createObject result", result);
      return result;
    } catch (error) {
      this.logger.error("createObject error", error);
      return null;
    }
  }

  async createObjectFields(objectApiName, fields = []) {
    if (fields.length <= 0) {
      return [];
    }

    try {
      const result = await this.conn.metadata.create(
        "CustomField",
        fields.map((f) => ({
          ...f,
          fullName: objectApiName + "." + f.fullName,
        }))
      );

      this.logger.info(
        `finished creating fields for object ${objectApiName} :`,
        result
      );
      return result;
    } catch (error) {
      return null;
    }
  }

  async deleteObject(objectApiName) {
    const result = await this.conn.metadata.delete(
      "CustomObject",
      objectApiName
    );

    try {
      this.logger.info(`finished deleting object of ${objectApiName}:`, result);
      return result;
    } catch (error) {
      this.logger.error(`deleteObject error for ${objectApiName}`, error);
      return null;
    }
  }

  async grantFieldsPermToProfiles(objectApiName, fields = [], profiles = []) {
    const fieldsPerm = fields.map((f) => ({
      field: objectApiName + "." + f.fullName,
      editable: true,
      readable: true,
    }));

    try {
      const result = await this.conn.metadata.update(
        "Profile",
        profiles.map((p) => ({
          fullName: p.FullName,
          fieldPermissions: fieldsPerm,
        }))
      );

      this.logger.info(
        `finished granting ${objectApiName} Fields Permission to profiles:`,
        result
      );
      return result;
    } catch (error) {
      this.logger.error("grantFieldsPermToProfiles error", error);
      return null;
    }
  }

  async getPicklistFieldsMetadata(objectApiName) {
    const meta = await this.conn.sobject(objectApiName).describe()
    const result = {}
    for(let field of meta.fields) {
      if(field.picklistValues && field.picklistValues.length > 0) {
        result[field.name] = field.picklistValues.map(p => {
          return {
            ...p,
            color: RandomColor.getColor(p.value)
          }
        })
      }
    }
    return result
  }
}

module.exports = {
  Client,
};
