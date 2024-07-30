import express from 'express'
import { PORT } from './config/app.config.js'
import { connectDb } from './utils/db.js';
import bodyParser from 'body-parser';
import { productRoutes } from './routes/product.routes.js';

const app = express()

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())
connectDb()

app.use('/products',productRoutes)

app.listen(PORT, () => {
    console.log('Server listening on port : ', PORT);
})