const jsforce = require('jsforce')

class Client {
  conn = new jsforce.Connection()
  constructor(context, logger, conn) {
    this.context = context
    this.logger = logger
    this.conn = conn
  }

  async find(objectApiName, options = {}) {
    let { fields, limit, skip, sortBy, condition = {}, pagination} = options
    const result = await this.conn.sobject(objectApiName)
      .find(condition, fields)
      .limit(limit)
      .skip(skip)
      .sort(sortBy)
      .execute()

    return result
  }

  async create(objectApiName, data) {
    return await this.conn.sobject(objectApiName).create(data)
  }

  async update(objectApiName, data) {
    return await this.conn.sobject(objectApiName).update(data)
  }

  async delete(objectApiName, data) {
    return await this.conn.sobject(objectApiName).delete(data)
  }

  // metadata related apis
  async createObject({
    objectApiName,
    fields = [],
    comment
  }) {
    const data = {
      fullName: objectApiName,
      label: comment,
      pluralLabel: '',
      fields,
      nameField: {
        type: 'Text',
        label: comment,
      },
      deploymentStatus: 'Deployed',
      sharingModel: 'ReadWrite',
      visibility: 'Public'
    }

    const result = await this.conn.metadata.create('CustomObject', data)
    
    this.logger.info('createObject result', result)
    return result
  }

  async createObjectFields({
    objectApiName,
    fields = []
  }) {
    if(fields.length <= 0) {
      return []
    }

    const result = await this.conn.metadata.create('CustomField', fields.map(f => ({
      ...f,
      fullName: objectApiName + '.' + f.fullName
    })))

    this.logger.info(`finished creating fields for object ${objectApiName} :`, result)
    return result
  }

  async deleteObject(objectApiName) {
    const result = await this.conn.metadata.delete('CustomObject', objectApiName)

    this.logger.info(`finished deleting object of ${objectApiName}:`, result)
    return result
  }

  async grantFieldsPermToProfiles({
    objectApiName,
    fields = [],
    profiles = []
  }) {
    const fieldsPerm = fields.map(f => ({
      field: objectApiName + '.' +  f.fullName,
      editable: true,
      readable: true
    }))

    const result = await this.conn.metadata.update('Profile', profiles.map(p => ({
      fullName: p.FullName,
      fieldPermissions: fieldsPerm
    })))

    this.logger.info(`finished granting ${objectApiName} Fields Permission to profiles:`, result)
    return result
  }
}

module.exports = {
  Client
}