import { Router } from "express";
import { addCategory, deletedCategoryById, getAllCategories, getCategoryById, updatedCategoryById } from "../controllers/category.controller.js";

export const categoryRoutes = Router()

categoryRoutes
    .get('/',getAllCategories)
    .get('/:categoryId',getCategoryById)
    .post('/',addCategory)
    .put('/:categoryId',updatedCategoryById)
    .delete('/:categoryId',deletedCategoryById)