const Account = {
  objectName: "Account",
  comment: "客户",
  mockEnable: true,
  //假数据中的下拉选项
  mockDataSelect: {
    Type: ["ce", "soe", "pe", "jv", "fe", "di", "fi"],
    Industry: [
      "finance",
      "retail",
      "medical_care",
      "internet",
      "manufacturing",
      "others",
    ],
    Rating: ["normal", "important", "extremelyImportant"],
  },
  customizedFields: [
    {
      fullName: "Acronym__c",
      externalId: false,
      label: "客户简称",
      length: 50,
      required: false,
      trackTrending: false,
      type: "Text",
      unique: false,
      summaryFilterItems: [],
    },
    {
      fullName: "ChatId__c",
      externalId: false,
      label: "群ID",
      length: 50,
      required: false,
      trackTrending: false,
      type: "Text",
      unique: false,
      summaryFilterItems: [],
    },
    {
      fullName: "ChatLink__c",
      externalId: false,
      label: "群Link",
      length: 200,
      required: false,
      trackTrending: false,
      type: "Text",
      unique: false,
      summaryFilterItems: [],
    },
    {
      fullName: "CustomerDocument__c",
      externalId: false,
      label: "客户档案",
      length: 200,
      required: false,
      trackTrending: false,
      type: "Text",
      unique: false,
      summaryFilterItems: [],
    },
    {
      fullName: "FollowupCountRecently__c",
      externalId: false,
      label: "近30天跟进次数",
      precision: 4,
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
      type: "DateTime",
      summaryFilterItems: [],
    },
    {
      fullName: "Logo__c",
      externalId: false,
      label: "Logo",
      length: 32768,
      trackTrending: false,
      type: "LongTextArea",
      visibleLines: 50,
      summaryFilterItems: [],
    },
  ],
  grantFields: [],
};

module.exports = {
  Account,
};