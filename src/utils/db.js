import mongoose from "mongoose";
import { DB_URI } from "../config/app.config.js";

export const connectDb = ()=>{

    try{
        mongoose.connect(DB_URI)
    }
    catch(error){
        console.error(error.message)
        process.exit(1)
    }

    const dbConnection = mongoose.connection;

    dbConnection.once('open',(_)=>{
        console.log('Database connected : ',DB_URI);
    })
    
    dbConnection.on('error',(error)=>{
        console.log('Database connection error : ',error.message);
    })
}