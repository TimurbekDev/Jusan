import { Router } from "express";
import productController from "../controllers/product.controller.js";

export const productRoutes = Router()

productRoutes
    .get('/',productController.getAllProducts)
    .get('/:productId',productController.getProductById)
    .put('/:productId',productController.updateProductById)
    .post('/',productController.createProduct)
    .delete('/:productId',productController.deleteProductById)