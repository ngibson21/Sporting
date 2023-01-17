//default
import axios from "axios";
import AppConfig from "../SportinggConfig";

//wooCommerce
export * from "./wooCommerce";

//getstream serverless back-end
export * from "./stream";

export default axios.create(AppConfig.stripe_ENV.API);



