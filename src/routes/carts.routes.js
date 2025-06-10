const express = require('express');
const router = express.Router();
const cartsController = require('../controllers/carts.controller');


router.post('/', cartsController.createCart);

router.get('/:cid', cartsController.getCart);

router.post('/:cid/products/:pid', cartsController.addProductToCart);

router.delete('/:cid/products/:pid', cartsController.deleteProductFromCart);

router.put('/:cid', cartsController.updateCartProducts);

router.put('/:cid/products/:pid', cartsController.updateProductQuantity);

router.delete('/:cid', cartsController.clearCart);

module.exports = router;
