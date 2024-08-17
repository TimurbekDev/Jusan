import { Router } from "express";
import categoryController from "../controllers/category.controller.js";
export const categoryRoutes = Router()

categoryRoutes
    .get('/',categoryController.getAllCategories)
    .get('/:categoryId',categoryController.getCategoryById)
    .post('/',categoryController.createCategory)
    .put('/:categoryId',categoryController.updatedCategoryById)
    .delete('/:categoryId',categoryController.deletedCategoryById)