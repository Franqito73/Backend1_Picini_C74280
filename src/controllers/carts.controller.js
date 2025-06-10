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
    const cart = await CartService.getCart(req.params.cid);
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
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    const cart = await CartService.addProductToCart(cid, pid, quantity);
    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json({ error: 'Carrito o producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el producto al carrito' });
  }
};

const deleteProductFromCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const updatedCart = await CartService.removeProductFromCart(cid, pid);
    if (!updatedCart) {
      return res.status(404).json({ message: 'Carrito o producto no encontrado' });
    }
    res.status(200).json({ message: 'Producto eliminado del carrito', cart: updatedCart });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto del carrito' });
  }
};


const updateCartProducts = async (req, res) => {
  try {
    const { cid } = req.params;
    const { products } = req.body;
    const updatedCart = await CartService.updateCartProducts(cid, products);
    if (!updatedCart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }
    res.status(200).json({ message: 'Productos del carrito actualizados', cart: updatedCart });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el carrito' });
  }
};


const updateProductQuantity = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const updatedCart = await CartService.updateProductQuantity(cid, pid, quantity);
    if (!updatedCart) {
      return res.status(404).json({ message: 'Carrito o producto no encontrado' });
    }
    res.status(200).json({ message: 'Cantidad de producto actualizada', cart: updatedCart });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la cantidad' });
  }
};


const clearCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const result = await CartService.clearCart(cid);
    if (!result) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }
    res.status(200).json({ message: 'Carrito vaciado correctamente', cart: result });
  } catch (error) {
    res.status(500).json({ error: 'Error al vaciar el carrito' });
  }
};


module.exports = {createCart, getCart, addProductToCart, deleteProductFromCart, updateCartProducts, updateProductQuantity, clearCart,
};
