const { addProduct, checkIfProductExist, fetchAllProducts, fetchProductDetails, updateProductAmount } = require('../model/product-helper.js')

const color = ['Blue', 'Pink', 'Yellow', 'Red']
const size = ['Small', 'Medium', 'Large']

module.exports = {
    getAddProduct : (req, res)=>{
        res.status(200).render('add-product', { title: 'Add Product | Ocean Technologies Task' });
    },

    postAddProduct : async (req, res)=>{
        try {
            // console.log(req.body);

                const productCombinations = [];

                for(let i=0; i<color.length; i++){
                    for(let j=0; j<size.length; j++){
                        const product = {
                            name: req.body.productName,
                            phone: req.body.shopMobile,
                            email: req.body.shopEmail,
                            amount: parseFloat(req.body.productAmount),
                            color: color[i],
                            size: size[j]
                        }
                        productCombinations.push(product);
                    }
                }
                
                // add products to database
                let response = await addProduct(productCombinations)
                
                if(response.status){
                    res.status(201).redirect('/all-products')
                }else {
                    res.status(500).render('error', {error})
                }

        } catch (error) {
            res.status(500).render('error', {error})
        }
    },

    getAllProducts : async (req, res)=>{
        try {
            let products = await fetchAllProducts()
            if(products.status){
                res.render('all-products', { title: 'All Products | Ocean Technologies Task', products:products.data });

            }else {
                res.status(500).render('error', {error})
            }
            
        } catch (error) {
            res.status(500).render('error', {error})
        }
    },

    getEditProduct : async (req, res)=>{
        try {
            let productId = req.params.id
            let product = await fetchProductDetails(productId)
            
            if(product){
                res.render('edit-product', { title: 'Edit Product | Ocean Technologies Task', product:product.data });

            }else {
                res.send({message:'product with product id not found'})
            }

        } catch (error) {
            res.status(500).render('error', {error})
        }
    },

    postEditProduct : async (req, res)=>{
        try {
            let productId = req.body.productId
            let newAmount = req.body.amount

            let response = await updateProductAmount(productId, newAmount)

            if(response.status){
                res.redirect('/all-products')
            }else {
                res.send({message:'Could not update the amount for the product.'})
            }
            
        } catch (error) {
            res.status(500).render('error', {error})
        }
    }
}