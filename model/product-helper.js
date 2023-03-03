const db = require('./dbConnection/connection.js')
const { PRODUCT_COLLECTION } = require('./dbConnection/collection.js')
const { ObjectId } = require('mongodb')

module.exports = {
    
    addProduct : async(products)=>{
        try {
            let response = await db.get().collection(PRODUCT_COLLECTION).insertMany(products)
            
            if(response.acknowledged === true){
                return({ status:true, message:'Products inserted successfully!'})
            }else {
                throw new Error("Couldn't insert the products.");
            }

        } catch (error) {
            throw new Error(error)
        }
    },

    fetchAllProducts : async()=>{
        try {
            let products = await db.get().collection(PRODUCT_COLLECTION).find().toArray()
            
            if(products.length !== 0){
                return({status:true, data:products})
            }else {
                throw new Error('No products exist in database')
            }
            
        } catch (error) {
            throw new Error(error)
        }
    },

    fetchProductDetails : async (productId)=>{
        try {
            let details = await db.get().collection(PRODUCT_COLLECTION).findOne({_id: new ObjectId(productId)})
            if(details){
                return({status:true, data:details})

            }else {
                throw new Error('Product with passed id does not exist in database')
            }
            
        } catch (error) {
            console.log(error);
            throw new Error(error)
        }
    },

    updateProductAmount : async (productId, amount)=>{
        try {
            let response = await db.get().collection(PRODUCT_COLLECTION).updateOne({_id: new ObjectId(productId)},
            {$set:{amount : parseFloat(amount)}});

            if(response.modifiedCount === 1){
                return({status:true, message:'Amount updated successfully!'})

            }else {
                throw new Error('Could not update the amount')
            }
            
        } catch (error) {
            throw new Error(error)
        }
    }
}