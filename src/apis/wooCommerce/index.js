import WooCommerceNetworkRequestModel from "./WooCommerceNetworkRequestModel";
import WooCommerceDataManagerModel from "./WooCommerceDataManagerModel";
import AppConfig from "../../SportinggConfig";

const wooCommerceNetworkRequest = new WooCommerceNetworkRequestModel(
  AppConfig.wooCommerceConfig
);

const wooCommerceNetworkRequestAuth = new WooCommerceNetworkRequestModel(
  AppConfig.wooCommerceConfig,
  "jwt-auth/v1"
);

export const wooCommerceDataManager = new WooCommerceDataManagerModel(
  wooCommerceNetworkRequest
);

export const wooCommerceAuth = new WooCommerceDataManagerModel(
  wooCommerceNetworkRequestAuth
);
