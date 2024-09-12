const Lead = {
  objectName: "Lead",
  comment: "线索表",
  pk: {
    AccountId__c: [{ table: "Account" }],
    // Opportunity__c:[{table:"Opportunity"}],
  },
  //假数据中的下拉选项
  mockDataSelect: {
    Rating: ["normal", "important", "extremelyImportant"],
    LeadSource: ["marketingCampaign", "productLaunchEvent", "newMedia"],
  },
  customizedFields: [
      {
        fullName: "AccountId__c",
        externalId: false,
        label: "客户",
        length: 20,
        required: false,
        trackTrending: false,
        type: "Text",
        unique: false,
      },
      {
        fullName: "LastFollowupDate__c",
        externalId: false,
        label: "最近跟进时间",
        required: false,
        trackTrending: false,
        type: "Date",
      },
      {
        fullName: "Opportunity__c",
        externalId: false,
        label: "商机",
        length: 20,
        required: false,
        trackTrending: false,
        type: "Text",
        unique: false,
      },
  ],
  grantFields: [],
}

module.exports = {
  Lead,
}