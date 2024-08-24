import { required } from "joi";
import { model, Schema, SchemaTypes } from "mongoose";

const SelledProductsSchema = new Schema({
    product_id : {
        type : SchemaTypes.ObjectId,
        required : true
    },
    user__id : {
        type : SchemaTypes.ObjectId,
        required : true
    },
    selled_price : {
        type : Number,
        required : true
    },
    original_price : {
        type : Number,
        required : true
    },
    count : {
        type : Number,
        required : true
    }
},{
    timestamps : true,
    versionKey : false
})


export const SelledProducts = model('Selled-Products',SelledProductsSchema)