import { Router } from "express";
import { addProduct, deleteProductById, getAllProducts, getProductById ,updateProductById} from "../controllers/product.controller.js";


export const productRoutes = Router()

productRoutes
    .get('/',getAllProducts)
    .get('/:productId',getProductById)
    .put('/:productId',updateProductById)
    .post('/',addProduct)
    .delete('/:productId',deleteProductById)