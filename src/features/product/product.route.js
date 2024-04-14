import express from "express";
import productControllers from "./product.controller.js"
import fileUploadMiddleware from "../../middlewares/fileUpload.middleware.js";

const productController = new productControllers()
const router = express.Router()

router.get('/filter', (req, res)=>{
    productController.filterProduct(req, res)
})
router.get('/', (req, res)=>{
    productController.getProducts(req, res)
})
router.post('/add-rating', (req, res, next)=>{
    productController.rateProduct(req, res, next)
})
router.post('/', fileUploadMiddleware.single('imageUrl'), (req, res)=>{
    productController.addProduct(req, res)
})
router.get('/:id', (req, res)=>{
    productController.getOneProduct(req, res)
})

export default router;