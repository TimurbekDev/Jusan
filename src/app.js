import express from 'express'
import { PORT } from './config/app.config.js'
import { connectDb } from './utils/db.js';
import bodyParser from 'body-parser';
import path from 'path';
import { viewsRoutes } from './routes/views.routes.js';
import { mainRouter } from './routes/router.js';
import morgan from 'morgan';

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('tiny'))

app.set('view engine','ejs')
app.set("views", path.join(process.cwd(), "src", "views"));

app.use("/public", express.static(path.join(process.cwd(), "public")));

connectDb()

app.use('/api/v1',mainRouter)
app.use('',viewsRoutes)

app.listen(PORT, () => {
    console.log('Server listening on port : ', PORT);
})