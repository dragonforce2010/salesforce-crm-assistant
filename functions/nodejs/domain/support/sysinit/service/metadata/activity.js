const Activity = {
  objectName: "Activity",
  comment: "跟进记录-只建表不插入数据",
  allowDelete: false,
  //假数据中的下拉选项
  mockDataSelect: {},
  customizedFields: [
    {
      fullName: "Communicator__c",
      externalId: false,
      label: "沟通对象",
      trackTrending: false,
      type: "TextArea",
      summaryFilterItems: [],
    },
    {
      fullName: "InternalParticipants__c",
      externalId: false,
      label: "内部参会人",
      trackTrending: false,
      type: "TextArea",
      summaryFilterItems: [],
    },
    {
      fullName: "NextStep__c",
      externalId: false,
      label: "下一步",
      trackTrending: false,
      type: "TextArea",
      summaryFilterItems: [],
    },
    {
      fullName: "FollowupTime__c",
      externalId: false,
      label: "线索分配时间",
      required: false,
      trackTrending: false,
      type: "DateTime",
      summaryFilterItems: [],
    },
  ],
  grantFields: [],
};

module.exports = {
  Activity
}
