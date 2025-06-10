const ProductManager = require('../managers/ProductManager');
const Product = require('../models/Product');


class ProductService {
  static async getAllProducts (filter, options) {
  return await Product.paginate(filter, options);
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
