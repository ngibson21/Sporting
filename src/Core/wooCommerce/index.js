import WooCommerceNetworkRequestModel from "./WooCommerceNetworkRequestModel";
import WooCommerceDataManagerModel from "./WooCommerceDataManagerModel";

class WooCommerceManager {
  constructor() {
    this.wooCommerceNetworkRequestAuth;
    this.wooCommerceNetworkRequestData;
    this.wooCommerceDataManager;
    this.wooCommerceAuthManager;
  }
  configWooCommerceAuth(wooCommerceConfig) {
    this.wooCommerceNetworkRequestAuth = new WooCommerceNetworkRequestModel(
      wooCommerceConfig,
      "jwt-auth/v1"
    );
    this.wooCommerceAuthManager = new WooCommerceDataManagerModel(
      this.wooCommerceNetworkRequestAuth
    );
    return this;
  }

  configWooCommerceData(wooCommerceConfig) {
    this.wooCommerceNetworkRequestData = new WooCommerceNetworkRequestModel(
      wooCommerceConfig
    );
    this.wooCommerceDataManager = new WooCommerceDataManagerModel(
      this.wooCommerceNetworkRequestData
    );
    return this;
  }
}

export default new WooCommerceManager();
