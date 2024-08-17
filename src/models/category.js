import mongoose, { Schema } from "mongoose";

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

export const Category = mongoose.model('Category',CategorySchema)