import express from 'express'
import { PORT } from './config/app.config.js'
import { connectDb } from './utils/db.js';

const app = express()

connectDb()

app.listen(PORT, () => {
    console.log('Server listening on port : ', PORT);
})