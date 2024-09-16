const Lead = {
  objectName: "Lead",
  comment: "线索表",
  allowDelete: true,
  pk: {
    AccountId__c: { 
      objectApiName: "Account" 
    },
  },
  //假数据中的下拉选项
  mockDataSelect: {
    Rating: ["Hot", "Warm", "Cold"],
    LeadSource: ["Web", "Phone Inquiry", "Partner Referral"],
    Industry: ["Agriculture", "Banking", "Chemicals", "Education", "Finance"],
    Status: ["Open - Not Contacted", "Working - Contacted", "Closed - Converted", "Closed - Not Converted"]
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
  grantFields: [{
    fullName: 'Rating'
  },{
    fullName: 'LeadSource'
  }, {
    fullName: 'Industry'
  }, {
    fullName: 'Status'
  }],
}

module.exports = {
  Lead,
}