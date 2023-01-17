import Category from "./../../models/Category";
import Product from "./../../models/Product";

export default class WooCommerceDataManagerModel {
  constructor(networkManager) {
    this.networkManager = networkManager;
  }

  fetchOrders = async () => {
    try {
      const customers = await this.networkManager.loadMore("orders", 10);

      return {
        response: customers.response,
        success: true
      };
    } catch (error) {
      return { error, success: false };
    }
  };

  async fetchCustomers() {
    try {
      const customers = await this.networkManager.loadMore("customers", 10);

      return {
        response: customers.response,
        success: true
      };
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

  async placeOrder(params) {
    try {
      const order = await this.networkManager.post("orders", params);

      return {
        response: order.response,
        success: true
      };
    } catch (error) {
      return { error, success: false };
    }
  }
  async updateOrder(id, params) {
    try {
      const order = await this.networkManager.put(`orders/${id}`, params);

      return {
        response: order.response,
        success: true
      };
    } catch (error) {
      return { error, success: false };
    }
  }

  async fetchMoreProducts() {
    try {
      const products = await this.networkManager.loadMore("products", 10);

      return {
        response: this.processProducts(products.response),
        success: true
      };
    } catch (error) {
      return { error, success: false };
    }
  }

  async getProductById(id) {
    try {
      const product = await this.networkManager.get(`products/${id}`);

      return {
        response: product.response,
        success: true
      };
    } catch (error) {
      return { error, success: false };
    }
  }

  async fetchCategories() {
    try {
      const categories = await this.networkManager.loadMore(
        "products/categories",
        10
      );

      return {
        response: this.processCategories(categories.response),
        success: true
      };
    } catch (error) {
      return { error, success: false };
    }
  }

  processProducts(products) {
    return products.map(product => {
      const images = this.getImages(product);

      return new Product(
        product.id,
        product.name,
        product.price,
        product.description,
        images[0],
        images,
        this.getCategories(product.categories)
      );
    });
  }

  processCategories(categories) {
    return categories.map(category => {
      const { id, name, image } = category;
      const photo = image && image.src ? image.src : "";

      return new Category(id, name, photo);
    });
  }

  // processOrder(order) {
  //   return
  // }

  getImages(product) {
    return product.images.map(image => {
      return image.src;
    });
  }

  getCategories(categories) {
    return categories.map(category => {
      return category.id;
    });
  }
}
