import productModel from "./product.model.js";
class ProductController{

    getProducts(req, res){
        res.status(200).send(productModel.getAllProducts())
    }

    getOneProduct(req, res){
        const product = productModel.get(req.params.id)
        if(!product){
            res.status(404).send("product not Found")
        }else{
            res.status(200).send(product)
        }
    }

    addProduct(req, res){
        const {name, price, sizes} = req.body;
        const newProduct = {
            name,
            price,
            sizes : sizes.split(','),
            imageUrl : req.file.filename
        }
        const createdProduct = productModel.addProduct(newProduct);
        res.status(201).send(createdProduct)
    }

    filterProduct(req, res){
        const minPrice = parseInt(req.query.minPrice)
        const maxPrice = parseInt(req.query.maxPrice)
        const category = req.query.category

        const result = productModel.filterProduct(minPrice, maxPrice, category)
        res.send(result)
    }

    rateProduct(req, res){
        const {userID, rating, productID} = req.query;
        productModel.addRating(userID, productID, rating)
        res.send("rating is added.")
    }

}

export default ProductController;