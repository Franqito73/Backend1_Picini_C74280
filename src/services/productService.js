const ProductManager = require('../managers/ProductManager');

class ProductService {
  static async getAllProducts() {
    return await ProductManager.getAllProducts();
  }

  static async getProductById(id) {
    return await ProductManager.getProductById(id);
  }

  static async createProduct(productData) {
    return await ProductManager.addProduct(productData);
  }

  static async updateProduct(id, updatedData) {
    return await ProductManager.updateProduct(id, updatedData);
  }

  static async deleteProduct(id) {
    return await ProductManager.deleteProduct(id);
  }
}

module.exports = ProductService;
