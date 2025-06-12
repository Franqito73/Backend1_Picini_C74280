const express = require('express');
const router = express.Router();
const CartService = require('../services/cartService');
const ProductService = require('../services/productService');
const mongoose = require('mongoose');

router.get('/products', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const filter = {}; 
     const options = { page: parseInt(page), limit: parseInt(limit), lean: true };
    const productsData = await ProductService.getAllProducts(filter, options);

    res.render('products', {
      products: productsData.docs,
      totalPages: productsData.totalPages,
      page: productsData.page,
      hasPrevPage: productsData.hasPrevPage,
      hasNextPage: productsData.hasNextPage,
      prevPage: productsData.prevPage,
      nextPage: productsData.nextPage
    });
  } catch (error) {
    res.status(500).send('Error al cargar los productos');
  }
});


router.get('/products/:pid', async (req, res) => {
  try {
    const product = await ProductService.getProductById(req.params.pid);
    if (!product) return res.status(404).send('Producto no encontrado');

    res.render('productDetail', { product });
  } catch (error) {
    res.status(500).send('Error al cargar el detalle del producto');
  }
});


router.get('/carts/:cid', async (req, res) => {
  try {
    const { cid } = req.params;

    if (!mongoose.Types.ObjectId.isValid(cid)) {
      return res.status(400).send('ID de carrito inválido');
    }

    const cart = await CartService.getCart(req.params.cid);
    if (!cart) return res.status(404).send('Carrito no encontrado');
    

    res.render('cart', { cart });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cargar el carrito');
  }
});

router.get('/', (req, res) => {
  res.render('home');
});

module.exports = router;

