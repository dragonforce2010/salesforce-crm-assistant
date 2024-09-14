const Opportunity = {
  objectName: "Opportunity",
  comment: "商机",
  allowDelete: true,
  pk: {
    AccountId: { 
      objectApiName: "Account" 
    },
  },
  //假数据中的下拉选项
  mockDataSelect: {},
  customizedFields: [
    {
      fullName: "FollowupCountRecently__c",
      externalId: false,
      label: "近30天跟进次数",
      precision: 6,
      required: false,
      scale: 0,
      trackTrending: false,
      type: "Number",
      unique: false,
      summaryFilterItems: [],
    },
    {
      fullName: "LastFollowupDate__c",
      externalId: false,
      label: "最近跟进日期",
      required: false,
      trackTrending: false,
      type: "Date",
      summaryFilterItems: [],
    },
    {
      fullName: "LostReason__c",
      externalId: false,
      label: "丢单原因",
      length: 32768,
      trackTrending: false,
      type: "LongTextArea",
      visibleLines: 50,
      summaryFilterItems: [],
    },
  ],
  grantFields: [],
}

module.exports = {
  Opportunity,
}