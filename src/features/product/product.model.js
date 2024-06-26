import userModel from '../user/user.model.js'
import { ApplicationError } from '../../errorhandler/applicationError.js'

class productModel{
    constructor(name, description, imageUrl, category, price, sizes, id){
        this._id = id,
        this.name = name,
        this.description = description,
        this.imageUrl = imageUrl,
        this.category = category,
        this.price = price,
        this.sizes = sizes
    }

    static getAllProducts(){
        return products
    }

    static get(id){
        const product = products.find(i=>i.id == id)
        return product
    }

    static addProduct(newProduct){
        newProduct.id = products.length+1
        products.push(newProduct)
        return newProduct
    }

    static filterProduct(minPrice, maxPrice, category){
        const filteredProduct = products.filter((product)=>{
            return ((!minPrice || minPrice <= product.price) && 
            (!maxPrice || maxPrice >= product.price) && 
            (!category || category == product.category))
        })
        return filteredProduct
    }

    static addRating(userID, productID, rating){
        // getting the product to which rating will be added
        const requiredProduct = products.find((p)=>p.id == productID)
        // getting the user who's trying to add rating
        const userExist = userModel.getAllUsers().find((user)=>{
            return user.id == userID
        });

        if(!userExist){
            throw new ApplicationError("No user found.", 400)
        }

        if(!requiredProduct){
            throw new ApplicationError("No product found.", 404)
        }

        // checking if the user exist
        // if(userExist){
        //     // checking if the product exist
        //     if(requiredProduct){ 
                if(!requiredProduct.ratings){
                    requiredProduct.ratings = [];
                    requiredProduct.ratings.push({user: userID, rating: rating})
                }else{
                    const existingRatingWithSameUser = requiredProduct.ratings.findIndex((r)=>r.user == userID)
                    if(existingRatingWithSameUser >= 0){
                        requiredProduct.ratings[existingRatingWithSameUser].rating = rating
                    }else{
                        requiredProduct.ratings.push({user: userID, rating: rating})
                    }
                }
                return "rating added successfully."
        //     }else{
        //         throw new ApplicationError("no product found", 400)
        //     }
        // }else{
        //     throw new ApplicationError("no such user found!", 404)

        // }
    }
}

const products = [
    new productModel(1, "shirt", "levi's", "fddfd", "cloth", 3000, ["s", "m", "xl"]),
    new productModel(2, "jeans", "th", "fddfd", "cloth", 5000, ["s", "m", "xl"]),
    new productModel(3, "shoe", "nike", "fddfd", "cloth", 10000, [10, 12, 9])
]

export default productModel;