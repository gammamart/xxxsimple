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
  fundWallet: "account/fund-wallet/",
  fundUSDTWallet: "account/usdt-fund-wallet/",
  accountUpgrade: "account/upgrade/",
  sendFeedback: "account/send-feedback/",
  sc: "account/jsi18n/",

  calculateCost: "service/calculate-cost/",
  sendSingleSMS: "service/send-single-sms/",
  bulkSingleSMS: "service/send-bulk-sms/",
  history: "service/history/",
  serverStatus: "service/server-status/",
};

export default requests;