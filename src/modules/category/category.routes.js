import { Router } from "express";
import { checkAuthGuard } from "../../guards/check-auth.guard.js";
import { CheckRolesGuard } from "../../guards/check-role.guard.js";
import categoryController from "./category.controller.js";
import { ValidationMiddleware } from "../../middlewares/validation.middleware.js";
import categoryDto from "./category.dto.js";

export const categoryRoutes = Router()

categoryRoutes
    .post('/',
        ValidationMiddleware(categoryDto.create()),
        checkAuthGuard(true),
        CheckRolesGuard('seller'),
        categoryController.create)
    .get('/',
        checkAuthGuard(false),
        categoryController.getAll)
    .get('/:id',
        checkAuthGuard(false),
        categoryController.getById)
    .put('/:id',
        ValidationMiddleware(categoryDto.update()),
        checkAuthGuard(true),
        CheckRolesGuard('seller'),
        categoryController.updateById)
    .delete('/:id',
        checkAuthGuard(true),
        CheckRolesGuard('seller'),
        categoryController.deleteById)