import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
    }
})

export const Role = mongoose.model('Role', RoleSchema)

export const saveRoles = async () => {

    try {
        const roles = await Role.find()

        if (roles.length < 1) {
            await Role.create([
                {
                    name: "staff"
                },
                {
                    name: "seller"
                },
                {
                    name: "admin"
                }
            ])
        }
    }
    catch (error) {
        console.log(error.message);
    }
}