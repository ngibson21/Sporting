import Client from "shopify-buy";
import ShopifyNetworkRequest from "./ShopifyNetworkRequestModel";
import AppConfig from "../../SportinggConfig";

const client = Client.buildClient(AppConfig.SHOPIFY_CONFIG);

export const shopifyDataManager = new ShopifyNetworkRequest(client);
