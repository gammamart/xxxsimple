interface endpointRequest {
  login: string;
  register: string;
  profile: string;
  [key: string]: string;
}

const requests: endpointRequest = {
  login: "account/login/",
  register: "account/register/",
  profile: "account/profile/",

  calculateCost: "service/calculate-cost/",
  sendSingleSMS: "service/send-single-sms/",
  bulkSingleSMS: "service/send-bulk-sms/",
  fundWallet: "account/fund-wallet/",
};

export default requests;
