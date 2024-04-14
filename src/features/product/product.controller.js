import { ApplicationError } from "../../errorhandler/applicationError.js";
import productModel from "./product.model.js";
import ProductRepository from "./product.repository.js";
class ProductController{

    constructor(){
        this.productRepo = new ProductRepository()
    }

    async getProducts(req, res){
        try {
            const allProducts = await this.productRepo.getAll();
            res.send(allProducts)
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Internal server error", 500)
        }
    }

    async getOneProduct(req, res){
        try {
            const product = await this.productRepo.get(req.params.id)
            if(!product){
                return res.status(404).send("product not Found")
            }
            res.status(200).send(product)
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Internal server error", 500)
        }
    }

    async addProduct(req, res){
        try {
            const {name, price, sizes} = req.body;
            const newProduct = new productModel(
                name,
                null,
                req.file.filename,
                null,
                parseFloat(price),
                sizes.split(','),
            )
            const newProductInDB  = await this.productRepo.addProduct(newProduct)
            res.send(newProductInDB)
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Internal server error", 500)
        }
    }

    async filterProduct(req, res){
        try {
            const minPrice = parseInt(req.query.minPrice)
            const maxPrice = parseInt(req.query.maxPrice)
            const category = req.query.category

            const result = await this.productRepo.filter(minPrice, maxPrice, category)
            res.send(result)
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Internal server error", 500)
        }
    }

    async rateProduct(req, res, next){
        const {productId, rating} = req.query;
        const userId = req.userId;
        // adding try catch because if something goes wrong while calling the addRating method, using the next() method we can call app level error handler in catch block
        try {
            const updatedProduct = await this.productRepo.rateProduct(userId, productId, rating)
            res.send(updatedProduct);
        } catch (error) {
            next(error)
        }
    }
}

export default ProductController;