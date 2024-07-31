import mongoose, { Schema } from "mongoose";

const ProductTypeSchema = new mongoose.Schema({
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

export const ProductType = mongoose.model('Product-Type',ProductTypeSchema)