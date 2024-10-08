import { model, Schema } from "mongoose";

const UserSchema = new Schema({
    full_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role_id: {
        type: Schema.Types.ObjectId,
        ref : 'Role',
        required: true,
    },
},{
    timestamps : true
})

export const User = model('User', UserSchema)