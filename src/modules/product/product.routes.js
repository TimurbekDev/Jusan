import { Router } from "express";
import productController from "./product.controller.js";

export const productRoutes = Router()

productRoutes
    .get('/',productController.getAll)
    .get('/:id',productController.getById)
    .put('/:id',productController.updateById)
    .post('/',productController.create)
    .delete('/:id',productController.deleteById)