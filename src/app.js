import express from 'express'
import { PORT } from './config/app.config.js'
import { connectDb } from './utils/db.js';
import bodyParser from 'body-parser';
import { productRoutes } from './routes/product.routes.js';
import { productTypeRoutes } from './routes/product-type.routes.js';

const app = express()

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())

connectDb()

app.use('/products',productRoutes)
app.use('/product-types',productTypeRoutes)

app.listen(PORT, () => {
    console.log('Server listening on port : ', PORT);
})