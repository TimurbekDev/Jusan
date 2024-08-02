import express from 'express'
import { PORT } from './config/app.config.js'
import { connectDb } from './utils/db.js';
import bodyParser from 'body-parser';
import { productRoutes } from './routes/product.routes.js';
import path from 'path';
import { viewsRoutes } from './routes/views.routes.js';
import { categoryRoutes } from './routes/category.routes.js';

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine','ejs')
app.set("views", path.join(process.cwd(), "src", "views"));

app.use("/public", express.static(path.join(process.cwd(), "public")));

connectDb()

app.use('/products',productRoutes)
app.use('/categories',categoryRoutes)
app.use('/',viewsRoutes)

app.listen(PORT, () => {
    console.log('Server listening on port : ', PORT);
})