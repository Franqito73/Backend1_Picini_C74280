const fs = require('fs');
const path = require('path');

const cartsFilePath = path.join(__dirname, '../db/carts.json');

class CartManager {
  
  static async createCart() {
    try {
      const carts = await this.getAllCarts();
      const newCart = { id: this.generateId(carts), products: [] };
      carts.push(newCart);
      await fs.promises.writeFile(cartsFilePath, JSON.stringify(carts, null, 2));
      return newCart;
    } catch (error) {
      throw new Error('Error al crear el carrito');
    }
  }

  
  static async getAllCarts() {
    try {
      const data = await fs.promises.readFile(cartsFilePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      throw new Error('Error al leer los carritos');
    }
  }

  
  static async getCart(id) {
    try {
      const carts = await this.getAllCarts();
      return carts.find(cart => cart.id === id);
    } catch (error) {
      throw new Error('Error al obtener el carrito');
    }
  }

  
  static async addProductToCart(cid, pid, quantity) {
    try {
      const carts = await this.getAllCarts();
      const cart = carts.find(cart => cart.id === cid);
      if (!cart) return null;

      const productIndex = cart.products.findIndex(product => product.id === pid);
      if (productIndex !== -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ id: pid, quantity });
      }

      await fs.promises.writeFile(cartsFilePath, JSON.stringify(carts, null, 2));
      return cart;
    } catch (error) {
      throw new Error('Error al agregar el producto al carrito');
    }
  }
  
  static generateId(carts) {
    const maxId = carts.reduce((max, cart) => Math.max(max, cart.id), 0);
    return maxId + 1;
  }
}

module.exports = CartManager;
