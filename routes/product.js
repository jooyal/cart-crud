const express = require('express');
const router = express.Router();

const {} = require('../controller/product-controller.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
