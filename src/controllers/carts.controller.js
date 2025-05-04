const CartService = require('../services/cartService');

const createCart = async (req, res) => {
  try {
    const newCart = await CartService.createCart();
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el carrito' });
  }
};

const getCart = async (req, res) => {
  try {
    const cart = await CartService.getCart(parseInt(req.params.cid));
    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json({ error: 'Carrito no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el carrito' });
  }
};

const addProductToCart = async (req, res) => {
  try {
    const cart = await CartService.addProductToCart(
      parseInt(req.params.cid),
      parseInt(req.params.pid),
      req.body.quantity
    );
    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json({ error: 'Carrito o producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el producto al carrito' });
  }
};

module.exports = { createCart, getCart, addProductToCart };
