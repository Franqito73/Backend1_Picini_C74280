const express = require('express');
const router = express.Router();
const ProductManager = require('../managers/ProductManager');

router.get('/', async (req, res) => {
  try {
    const products = await ProductManager.getAllProducts();
    console.log('Productos obtenidos:', products);
    res.render('home', { products });
  } catch (error) {
    res.status(500).send('Error al cargar la vista principal');
  }
});

router.get('/realTimeProducts', async (req, res) => {
  try {
    const products = await ProductManager.getAllProducts();
    res.render('realTimeProducts', { products });
  } catch (error) {
    res.status(500).send('Error al cargar la vista en tiempo real');
  }
});

module.exports = router;
