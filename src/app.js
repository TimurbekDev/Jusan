import path from 'path';
import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors'
import morgan from 'morgan';
import { mainRouter } from './routes/router.js';
import { appConfig } from './config/app.config.js';
import { connectDb } from './mongo/db.js';
import { ExceptionHandlerMiddleware } from './middlewares/error-handler.middleware.js';
import { NotFoundException } from './exceptions/not-found.exception.js';
import { verifyJwtToken } from './middlewares/jwt.middleware.js';


const app = express()

//MIDDLEWARES
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('tiny'))
app.use("/public", express.static(path.join(process.cwd(), "public")));
app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
}));

//CONNECT TO DB
connectDb()

//ROUTER
app.use('/api/v1', mainRouter)

//CATCH ALL UNAVAILABLE REQUESTS
app.all("*", (_, __, next) => next(new NotFoundException('Given endpoint not found')))

//CUSTOM MIDDLEWARE TO HANDLE EXCEPTIONS
app.use(ExceptionHandlerMiddleware)

app.listen(appConfig.port, appConfig.host, () => {
    console.log('Server listening on port : ', appConfig.port);
})