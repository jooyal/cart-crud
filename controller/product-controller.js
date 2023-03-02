const {} = require('../model/product-helper.js')

module.exports = {
    getAddProduct : (req, res)=>{
        res.render('add-product', { title: 'Add Product | Ocean Technologies Task' });
    },

    postAddProduct : (req, res)=>{
        console.log(req.body);
    }
}