import express from 'express';
import CartController from './cart.controller.js';
const cartRouter = express.Router();

const CartControllers = new CartController()

cartRouter.post('/', CartControllers.addItemToCart)
cartRouter.get('/', CartControllers.getItem)
cartRouter.delete('/delete/:Id', CartControllers.deleteItem)

export default cartRouter;