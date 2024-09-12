import { Router } from "express";
import { ValidationMiddleware } from "../../middlewares/validation.middleware.js";
import { checkAuthGuard } from "../../guards/check-auth.guard.js";
import { CheckRolesGuard } from "../../guards/check-role.guard.js";
import userController from "./user.controller.js";
import userDto from "./user.dto.js";

export const userRoutes = Router()

userRoutes
    .post('/',
        ValidationMiddleware(userDto.create()),
        checkAuthGuard(true),
        CheckRolesGuard('admin','seller','staff'),
        userController.create)
    .get('/',
        checkAuthGuard(true),
        CheckRolesGuard('admin','seller'),
        userController.getAll)
    .get('/:id',
        checkAuthGuard(true),
        CheckRolesGuard('admin','seller','staff'),
        userController.getById
    )
    .put('/:id',
        checkAuthGuard(true),
        CheckRolesGuard('admin','seller'),
        userController.updateById)
    .delete('/:id',
        checkAuthGuard(true),
        CheckRolesGuard('admin','seller'),
        userController.deleteById)