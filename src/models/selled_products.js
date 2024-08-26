import { model, Schema, SchemaTypes } from "mongoose";

const SelledProductsSchema = new Schema({
    product_id : {
        type : SchemaTypes.ObjectId,
        ref : 'Product',
        required : true
    },
    user_id : {
        type : SchemaTypes.ObjectId,
        ref : 'User',
        required : true
    },
    selled_price : {
        type : Number,
        required : true
    },
    original_price : {
        type : Number,
    },
    count : {
        type : Number,
        min: [0, 'Count must be a non-negative number'],
        required : true
    }
},{
    timestamps : true,
    versionKey : false
})


export const SelledProduct = model('Selled-Product',SelledProductsSchema)