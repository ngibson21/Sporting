import Category from "./../../models/Category";
import Product from "./../../models/Product";

export default class ShopifyNetworkRequest {
  static allCategories = null;

  constructor(client) {
    this.client = client;
  }

  async loadCategories() {
    try {
      if (this.allCategories != null) {
        return { allCategories: this.allCategories, success: true };
      }

      const collections = await this.client.collection.fetchAllWithProducts();

      const response = collections.map(collection => {
        const { id, title, image } = collection;
        const photo = image && image.src ? image.src : "";

        return new Category(
          id,
          title,
          photo,
          this.processProducts(collection.products)
        );
      });

      this.allCategories = response;

      return { response, success: true };
    }
 catch (error) {
      return { error, success: false };
    }
  }

  async loadProducts() {
    try {
      const products = await this.client.product.fetchAll();

      return { response: this.processProducts(products), success: true };
    }
 catch (error) {
      return { error, success: false };
    }
  }

  processProducts(products) {
    return products.map(product => {
      const images = this.getImages(product);

      return new Product(
        product.id,
        product.title,
        product.variants[0].price,
        product.description,
        images[0],
        images
      );
    });
  }

  getImages(product) {
    return product.images.map(image => {
      return image.src;
    });
  }
}
