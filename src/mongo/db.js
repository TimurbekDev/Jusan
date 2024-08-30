import mongoose from "mongoose";
import { dbConfig } from "../config/db.config.js";
import { saveRoles } from "../modules/role/role.model.js";

export const connectDb = () => {

    try {
        mongoose.connect(dbConfig.url)
        saveRoles()
    }
    catch (error) {
        console.error(error.message)
        process.exit(1)
    }

    const dbConnection = mongoose.connection;

    dbConnection.once('open', (_) => {
        console.log('Database connected : ', dbConfig.url);
    })

    dbConnection.on('error', (error) => {
        console.log('Database connection error : ', error.message);
    })
}