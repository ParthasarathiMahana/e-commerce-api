import CartModel from "./cart.model.js";

class CartController{
    addItemToCart(req, res){
        const userId = req.userId;
        const productId = req.body.productId;
        const qty = req.body.qty;

        if(!userId){
            return res.send("unauthorized access.")
        }

        const resultOfAttemptingItemAdd = CartModel.add(productId, userId, qty)
        const addedItems = CartModel.get(userId)
        res.status(201).json({message: resultOfAttemptingItemAdd, addedItems})
    }

    getItem(req, res){
        const userId = req.userId;
        const result = CartModel.get(userId)
        res.send(result);
    }

    deleteItem(req, res){
        const userId = req.userId;
        const productId = req.params.Id;
        const result = CartModel.delete(productId, userId)
        res.send(result)
    }
}

export default CartController