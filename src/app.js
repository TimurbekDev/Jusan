import express from 'express'
import bodyParser from 'body-parser';
import path from 'path';
import { mainRouter } from './routes/router.js';
import morgan from 'morgan';
import { appConfig } from './config/app.config.js';
import { connectDb } from './mongo/db.js';
import { handleCustomExceptions } from './utils/handleException.js';
import cors from 'cors'

const app = express()

//MIDDLEWARES
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('tiny'))
app.use("/public", express.static(path.join(process.cwd(), "public")));
app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST",
}));


//CONNECT TO DB
connectDb()

//ROUTER
app.use('/api/v1',mainRouter)

//CUSTOM MIDDLEWARE TO HANDLE EXCEPTIONS
app.use(handleCustomExceptions)

app.listen(appConfig.port , appConfig.host, () => {
    console.log('Server listening on port : ', appConfig.port);
})