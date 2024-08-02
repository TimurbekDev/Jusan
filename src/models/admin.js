import mongoose, { Schema } from "mongoose";

const UsersSchema = new mongoose.Schema({
    full_name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    created_at : {
        type : Date,
        default : Date.now()
    },
    role : {
        type : String,
        required : true
    }
})