import { Router } from "express";
import { categoryRoutes } from "./category.routes.js";
import { productRoutes } from "./product.routes.js";

export const mainRouter = Router()

mainRouter
    .use('/categories',categoryRoutes)
    .use('/products',productRoutes)