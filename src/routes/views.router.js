const express = require('express');
const router = express.Router();
const ProductManager = require('../managers/ProductManager');
const CartManager = require('../managers/CartManager');

router.get('/products', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const productsData = await ProductManager.getPaginatedProducts(page, limit);

    res.render('products', {
      products: productsData.docs,
      totalPages: productsData.totalPages,
      page: productsData.page,
      hasPrevPage: productsData.hasPrevPage,
      hasNextPage: productsData.hasNextPage,
      prevPage: productsData.prevPage,
      nextPage: productsData.nextPage,
    });
  } catch (error) {
    res.status(500).send('Error al cargar los productos');
  }
});


router.get('/products/:pid', async (req, res) => {
  try {
    const product = await ProductManager.getProductById(req.params.pid);
    if (!product) return res.status(404).send('Producto no encontrado');

    res.render('productDetail', { product });
  } catch (error) {
    res.status(500).send('Error al cargar el detalle del producto');
  }
});


router.get('/carts/:cid', async (req, res) => {
  try {
    const cart = await CartManager.getCartById(req.params.cid);
    if (!cart) return res.status(404).send('Carrito no encontrado');

    res.render('cart', { cart });
  } catch (error) {
    res.status(500).send('Error al cargar el carrito');
  }
});

module.exports = router;

