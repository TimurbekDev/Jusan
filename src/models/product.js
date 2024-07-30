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
    product_type : {
        type : Schema.Types.ObjectId,
        require : true
    }
})

export const Product = mongoose.model('Product',ProductSchema)