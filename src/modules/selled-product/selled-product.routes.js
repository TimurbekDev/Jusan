import { Router } from "express";
import { ValidationMiddleware } from "../../middlewares/validation.middleware.js";
import selledProductDto from "./selled-product.dto.js";
import selledProductController from "./selled-product.controller.js";
import { checkAuthGuard } from "../../guards/check-auth.guard.js";
import { CheckRolesGuard } from "../../guards/check-role.guard.js";

export const selledProductRoutes = Router()

selledProductRoutes
    .post('/',
        ValidationMiddleware(selledProductDto.create()),
        checkAuthGuard(true),
        CheckRolesGuard('seller', 'staff'),
        selledProductController.create)
    .get('/',
        checkAuthGuard(false),
        selledProductController.getAll)
    .get('/:id',
        checkAuthGuard(false),
        selledProductController.getById)
    .put('/:id',
        ValidationMiddleware(selledProductDto.update()),
        checkAuthGuard(true),
        CheckRolesGuard('seller', 'staff'),
        selledProductController.updateById)
    .delete('/:id',
        checkAuthGuard(true),
        CheckRolesGuard('seller', 'staff'),
        selledProductController.deleteById)