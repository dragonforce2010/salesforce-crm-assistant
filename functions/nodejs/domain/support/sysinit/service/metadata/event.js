const Event = {
  objectName: "Event",
  comment: "跟进记录2",
  systable: true,
  allowDelete: true,
  pk: {
    WhatId:{ 
      objectApiName: "Account" 
    },
  },
  //假数据中的下拉选项
  mockDataSelect: {},
  customizedFields: [],
  //需要额外授权的系统字段
  grantFields: [
    {
      fullName: "Type",
    },
    {
      fullName: "WhatId",
    },
  ],
};

module.exports = {
  Event,
};
