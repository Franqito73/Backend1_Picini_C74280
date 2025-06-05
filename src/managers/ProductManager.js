const Product = require('../models/Product');

class ProductManager {
  
  static async getAllProducts() {
    try {
      return await Product.find({});
    } catch (error) {
      throw new Error('Error al leer los productos');
    }
  }

  static async getProductById(id) {
    try {
      return await Product.findById(id);
    } catch (error) {
      throw new Error('Error al obtener el producto');
    }
  }

  static async addProduct(productData) {
    try {
      const product = new Product(productData);
      await product.save();
      return product;
    } catch (error) {
      throw new Error('Error al agregar el producto');
    }
  }

  static async updateProduct(id, updatedProduct) {
    try {
      const product = await Product.findByIdAndUpdate(id, updatedProduct, { new: true });
      return product; // null si no existe
    } catch (error) {
      throw new Error('Error al actualizar el producto');
    }
  }

  static async deleteProduct(id) {
    try {
      const result = await Product.findByIdAndDelete(id);
      return result !== null; // true si se eliminó, false si no existe
    } catch (error) {
      throw new Error('Error al eliminar el producto');
    }
  }
}

module.exports = ProductManager;
