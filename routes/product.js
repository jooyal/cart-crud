const express = require('express');
const router = express.Router();

const { getAddProduct, postAddProduct } = require('../controller/product-controller.js');

/* GET home page. */
router.get('/', getAddProduct);

router.post('/', postAddProduct)

module.exports = router;
