import authDeviceStorage from "./AuthDeviceStorage";

export default class WooCommerceDataManagerModel {
  constructor(networkManager) {
    this.networkManager = networkManager;
  }

  async createCustomer(params) {
    try {
      const customer = await this.networkManager.post("customers", params);

      authDeviceStorage.setEmailLoginCredentials(params.email, params.password);

      return {
        response: customer.response,
        success: true
      };
    } catch (error) {
      return { error, success: false };
    }
  }

  async authCustomer(params) {
    try {
      const customer = await this.networkManager.post("token", params);

      authDeviceStorage.setEmailLoginCredentials(
        params.username,
        params.password
      );

      return {
        response: customer.response,
        success: true
      };
    } catch (error) {
      return { error, success: false };
    }
  }

  async retrievePersistedAuthUser() {
    try {
      const {
        email,
        password
      } = await authDeviceStorage.getEmailLoginCredentials();

      if (email && password) {
        const customer = await this.authCustomer({ username: email, password });

        return {
          response: customer.response,
          success: true
        };
      } else {
        return { success: false };
      }
    } catch (error) {
      return { error, success: false };
    }
  }

  async getCustomer(params) {
    try {
      const customer = await this.networkManager.get("customers", params);

      return {
        response: customer.response,
        success: true
      };
    } catch (error) {
      return { error, success: false };
    }
  }

  async updateCustomer(id, params) {
    try {
      const customer = await this.networkManager.put(`customers/${id}`, params);

      return {
        response: customer.response,
        success: true
      };
    } catch (error) {
      return { error, success: false };
    }
  }
}
