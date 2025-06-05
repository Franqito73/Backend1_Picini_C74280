const Cart = require('../models/Cart');

class CartManager {

  static async createCart() {
    try {
      const newCart = new Cart({ products: [] });
      await newCart.save();
      return newCart;
    } catch (error) {
      throw new Error('Error al crear el carrito');
    }
  }

  static async getAllCarts() {
    try {
      return await Cart.find({}).populate('products.product');
    } catch (error) {
      throw new Error('Error al leer los carritos');
    }
  }

  static async getCart(id) {
    try {
      return await Cart.findById(id).populate('products.product');
    } catch (error) {
      throw new Error('Error al obtener el carrito');
    }
  }

  static async addProductToCart(cid, pid, quantity) {
    try {
      const cart = await Cart.findById(cid);
      if (!cart) return null;

      const productIndex = cart.products.findIndex(p => p.product.toString() === pid);
      if (productIndex !== -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ product: pid, quantity });
      }

      await cart.save();
      return cart;
    } catch (error) {
      throw new Error('Error al agregar el producto al carrito');
    }
  }
}

module.exports = CartManager;

