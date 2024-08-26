import { Router } from "express";
import { ValidationMiddleware } from "../middlewares/validation.middleware.js";
import SelledProductDto from "../DTOs/selled_products.dto.js";
import SelledProductController from "../controllers/selled_product.controller.js";

export const selledProductRoutes = Router()

selledProductRoutes
    .post('/',
        ValidationMiddleware(SelledProductDto.create()),
        SelledProductController.create)
    .get('/',SelledProductController.getAll)
    .get('/:id',SelledProductController.getById)
    .post('/:id',
        ValidationMiddleware(SelledProductDto.update()),
        SelledProductController.updateById)