const express = require('express');
const router = express.Router();

const { getAddProduct, postAddProduct, getAllProducts, getEditProduct, postEditProduct } = require('../controller/product-controller.js');

/* GET home page. */
router.get('/', getAddProduct);
router.post('/', postAddProduct)
router.get('/all-products', getAllProducts)
router.get('/edit-product/:id', getEditProduct)
router.post('/edit-product', postEditProduct)


module.exports = router;
