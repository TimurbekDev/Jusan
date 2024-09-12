import { Router } from "express";
import { checkAuthGuard } from "../../guards/check-auth.guard.js";
import { CheckRolesGuard } from "../../guards/check-role.guard.js";
import { upload } from "../../utils/multer.utils.js";
import { ValidationMiddleware } from "../../middlewares/validation.middleware.js";
import productDto from "./product.dto.js";
import productController from "./product.controller.js";

export const productRoutes = Router()

productRoutes
    .post('/',
        checkAuthGuard(true),
        CheckRolesGuard('seller'),
        upload.single('image'),
        ValidationMiddleware(productDto.create()),
        productController.create)
    .get('/',
        checkAuthGuard(false),
        productController.getAll)
    .get('/:id',
        checkAuthGuard(false),
        productController.getById)
    .put('/:id',
        checkAuthGuard(true),
        CheckRolesGuard('seller'),
        productController.updateById)
    .delete('/:id',
        checkAuthGuard(true),
        CheckRolesGuard('seller'),
        productController.deleteById)