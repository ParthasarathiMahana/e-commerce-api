import express from "express";
import productControllers from "./product.controller.js"
import fileUploadMiddleware from "../../middlewares/fileUpload.middleware.js";

const productController = new productControllers()
const router = express.Router()

router.get('/filter', productController.filterProduct)
router.get('/', productController.getProducts)
router.post('/add-rating', productController.rateProduct)
router.post('/', fileUploadMiddleware.single('imageUrl'), productController.addProduct)
router.get('/:id', productController.getOneProduct)

export default router;