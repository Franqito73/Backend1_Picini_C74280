const express = require('express');
const router = express.Router();
const cartsController = require('../controllers/carts.controller');


router.post('/', cartsController.createCart);


router.get('/:cid', cartsController.getCart);


router.post('/:cid/products/:pid', cartsController.addProductToCart);

module.exports = router;
