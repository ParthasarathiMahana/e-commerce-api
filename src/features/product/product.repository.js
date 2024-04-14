import { getDb, mongoConnection } from "../../config/mongodb.js";
import { ApplicationError } from "../../errorhandler/applicationError.js";
import {ObjectId} from "mongodb";

class ProductRepository{

    constructor(){
        this.collection = "products"
    }

    async addProduct(newProduct){
        try {
            const db = getDb();
            const collection = db.collection(this.collection);
            await collection.insertOne(newProduct)
            return newProduct;
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong", 400)
        }
    }

    async getAll(){
        try {
            const db = getDb();
            const collection = db.collection(this.collection);
            const allProducts = await collection.find().toArray()
            return allProducts;
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong", 400)
        }
    }

    async get(id){
        try {
            const db = getDb();
            const collection = db.collection(this.collection);
            const product = await collection.findOne({_id: new ObjectId(id)});
            return product;
        } catch (error) {
            throw new ApplicationError("Something went wrong", 400)
        }
    }

    async filter(minPrice, maxPrice, category){
        try {
            const db = getDb();
            const collection = db.collection(this.collection);
            let filterObject = {}

            if(minPrice){
                filterObject.price = {$gte: parseFloat(minPrice)}
            }
            if(maxPrice){
                filterObject.price = {...filterObject.price, $lte: parseFloat(maxPrice)}
            }
            if(category){
                filterObject.category = category
            }

            const filteredProducts = await collection.find(filterObject).toArray();
            return filteredProducts;
        } catch (error) {
            console.log(error);
            throw new ApplicationError("something went wrong", 400)
        }
    }

    async rateProduct(userId, productId, rating){
        try {
            const db = getDb();
            const collection = db.collection(this.collection);
            // new ObjectId(productId) is deprecated, find a new method to compare the _id
            // const productForChecking = await collection.findOne({_id: new ObjectId(productId)});
            // const ratingWithUserFound = productForChecking?.ratings.find(r=> {
            //     return r.userId == userId
            // });
            // if(ratingWithUserFound){
            //     await collection.updateOne({_id: new ObjectId(productId), "ratings.userId": new ObjectId(userId)},{
            //         $set:{
            //             "ratings.$.rating": rating
            //         }
            //     })
            //     return "product updated successfully"
            // }else{
            //     const updatedProduct = await collection.updateOne({_id: new ObjectId(productId)},{
            //         $push: {ratings:{userId: new ObjectId(userId), rating}}
            //     });
            //     return updatedProduct
            // }
            // 1. removing the existing rating with the specific user
            await collection.updateOne({_id: new ObjectId(productId)},{
                $pull: {ratings:{userId: new ObjectId(userId)}}
            });
            // 2. adding the new rating
            const updatedProduct = await collection.updateOne({_id: new ObjectId(productId)},{
                $push: {ratings:{userId: new ObjectId(userId), rating}}
            });
            return updatedProduct
        } catch (error) {
            console.log(error);
            throw new ApplicationError("something went wrong", 400)
        }
    }
}

export default ProductRepository;