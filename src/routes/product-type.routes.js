import { Router } from "express";
import { addProductType, deletedProductType, getAllProductTypes, getProducTypeById, updatedProductType } from "../controllers/product-type.controller.js";

export const productTypeRoutes = Router()

productTypeRoutes
    .get('/',getAllProductTypes)
    .get('/:productTypeId',getProducTypeById)
    .post('/',addProductType)
    .put('/:productTypeId',updatedProductType)
    .delete('/:productTypeId',deletedProductType)