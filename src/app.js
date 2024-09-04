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

const app = express()

//MIDDLEWARES
app.use(morgan('tiny'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:8080',
    optionsSuccessStatus : 200
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