import { Router } from "express";
import categoryController from "./category.controller.js";
import { checkAuthGuard } from "../../guards/check-auth.guard.js";
import { CheckRolesGuard } from "../../guards/check-role.guard.js";

export const categoryRoutes = Router()

categoryRoutes
    .get('/',
        checkAuthGuard(false),
        categoryController.getAll)
    .get('/:id',
        checkAuthGuard(false),
        categoryController.getById)
    .post('/',
        checkAuthGuard(true),
        CheckRolesGuard('seller'),
        categoryController.create)
    .put('/:id',
        checkAuthGuard(true),
        CheckRolesGuard('seller'),
        categoryController.updatedById)
    .delete('/:id',
        checkAuthGuard(true),
        CheckRolesGuard('seller'),
        categoryController.deleteById)