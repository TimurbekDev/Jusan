import mongoose, { Schema } from "mongoose";

const UserSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    role: {
        type: Schema.Types.ObjectId,
        required: true
    }
})

export const User = mongoose.model('User', UserSchema)