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
            // console.log(ObjectId(productId));
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