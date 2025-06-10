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


  static async removeProductFromCart(cid, pid) {
    return await CartManager.removeProductFromCart(cid, pid);
  }

   static async updateCartProducts(cid, products) {
    return await CartManager.updateCartProducts(cid, products);
  }

  static async updateProductQuantity(cid, pid, quantity) {
    return await CartManager.updateProductQuantity(cid, pid, quantity);
  }

  static async clearCart(cid) {
    return await CartManager.clearCart(cid);
  }
}

module.exports = CartService;
