const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../db/products.json');

class ProductManager {
  
  static async getAllProducts() {
    try {
      const data = await fs.promises.readFile(productsFilePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      throw new Error('Error al leer los productos');
    }
  }


  static async getProductById(id) {
    try {
      const products = await this.getAllProducts();
      return products.find(product => product.id === id);
    } catch (error) {
      throw new Error('Error al obtener el producto');
    }
  }

  static async addProduct(product) {
    try {
      const products = await this.getAllProducts();
      const newProduct = { id: this.generateId(products), ...product };
      products.push(newProduct);

      await fs.promises.writeFile(productsFilePath, JSON.stringify(products, null, 2));
      return newProduct;
    } catch (error) {
      throw new Error('Error al agregar el producto');
    }
  }


  static async updateProduct(id, updatedProduct) {
    try {
      const products = await this.getAllProducts();
      const index = products.findIndex(product => product.id === id);
      if (index !== -1) {
        products[index] = { ...products[index], ...updatedProduct };
        await fs.promises.writeFile(productsFilePath, JSON.stringify(products, null, 2));
        return products[index];
      } else {
        return null; 
      }
    } catch (error) {
      throw new Error('Error al actualizar el producto');
    }
  }

 
  static async deleteProduct(id) {
    try {
      const products = await this.getAllProducts();
      const updatedProducts = products.filter(product => product.id !== id);
      if (updatedProducts.length !== products.length) {
        await fs.promises.writeFile(productsFilePath, JSON.stringify(updatedProducts, null, 2));
        return true;
      }
      return false;
    } catch (error) {
      throw new Error('Error al eliminar el producto');
    }
  }

  
  static generateId(products) {
    const maxId = products.reduce((max, product) => Math.max(max, product.id), 0);
    return maxId + 1;
  }
}

module.exports = ProductManager;
