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
    role_id: {
        type: Schema.Types.ObjectId,
        ref : 'Role',
        strictPopulate: false,
        required: true,
    },
})

export const User = mongoose.model('User', UserSchema)