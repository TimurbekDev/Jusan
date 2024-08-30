import { Schema, model } from "mongoose";

export const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    count: {
        type: Number,
        min: [0, 'Count must be a non-negative number'],
        required: true
    },
    category_id: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }
})

export const Product = model('Product', ProductSchema)