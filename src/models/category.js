import mongoose, { Schema } from "mongoose";
import { Product } from "./product.js";

const CategorySchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    products : [
        {
            type : Schema.Types.ObjectId ,
            ref : 'Product'
        }
    ]
})

export const Category = mongoose.model('Category',CategorySchema)