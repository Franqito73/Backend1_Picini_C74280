const CartManager = require('../managers/CartManager');

class CartService {
  static async createCart() {
    return await CartManager.createCart();
  }

  static async getCart(cid) {
    return await CartManager.getCart(cid);
  }

  static async addProductToCart(cid, pid, quantity) {
    return await CartManager.addProductToCart(cid, pid, quantity);
  }
}

module.exports = CartService;
