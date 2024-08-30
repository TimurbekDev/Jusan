import { Router } from "express";
import { ValidationMiddleware } from "../../middlewares/validation.middleware.js";
import selledProductDto from "./selled-product.dto.js";
import selledProductController from "./selled-product.controller.js";

export const selledProductRoutes = Router()

selledProductRoutes
    .post('/',
        ValidationMiddleware(selledProductDto.create()),
        selledProductController.create)
    .get('/',selledProductController.getAll)
    .get('/:id',selledProductController.getById)
    .post('/:id',
        ValidationMiddleware(selledProductDto.update()),
        selledProductController.updateById)
    .delete('/:id',selledProductController.deleteById)