import { Router } from "express";
import { categoryRoutes } from "./category.routes.js";
import { productRoutes } from "./product.routes.js";
import { userRoutes } from "./user.routes.js";
import { roleRoutes } from "./role.routes.js";

export const mainRouter = Router()

mainRouter
    .use('/categories',categoryRoutes)
    .use('/products',productRoutes)
    .use('/users',userRoutes)
    .use('/roles',roleRoutes)