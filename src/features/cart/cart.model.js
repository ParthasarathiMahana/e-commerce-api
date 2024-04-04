class CartModel{
    constructor(id, productId, userId, qty){
        this.id = id
        this.productId = productId
        this.userId = userId
        this.qty = qty
    }

    static add(productId, userId, qty){
        const cartId = cart.length+1;
        const newItem = new CartModel(cartId, productId, userId, qty);
        cart.push(newItem);
        return `New Item added with id ${productId}`;
    }

    static get(userId){
        const filteredCartItems = cart.filter((i)=>i.userId == userId)
        return filteredCartItems
    }

    static delete(productId, userId){
        const foundProductIndex = cart.findIndex((cartItem)=> cartItem.productId == productId && cartItem.userId == userId)
        if(foundProductIndex == -1){
            return "Priduct not found"
        }
        const foundProduct = cart[foundProductIndex]
        cart.splice(foundProductIndex, 1)
        console.log(foundProduct)
        return `${foundProduct} is removed`
    }
}

const cart = [
    new CartModel(1, 1, 1, 5),
    new CartModel(1, 2, 1, 5),
    new CartModel(1, 2, 2, 5)
]

export default CartModel;