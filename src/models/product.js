import mongoose, { Schema } from "mongoose";

export const ProductSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    count : {
        type : Number,
        required : true
    },
    category_id : {
        type : Schema.Types.ObjectId,
        ref : 'Category'
    }
})

export const Product = mongoose.model('Product',ProductSchema)