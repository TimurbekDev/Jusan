import mongoose, { Schema } from "mongoose";
import { Product } from "./product.js";

const CategorySchema = new mongoose.Schema({
    name : {
        type : String,
        trim : true,
        minLength : [4,'name length must be greater tahn 4'],
        required : true
    },
    products : [
        {
            type : Schema.Types.ObjectId ,
            ref : 'Product'
        }
    ]
})

CategorySchema.on('remove',async function(category,next){
    
    try{
        await Product.deleteMany({
            category_id : category._id
        })

        next()
    }
    catch(error){
        next(error)
    }
})

export const Category = mongoose.model('Category',CategorySchema)