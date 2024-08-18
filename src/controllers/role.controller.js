import { isValidObjectId } from "mongoose";
import { Role } from "../models/role.js"
import { User } from "../models/user.js";
import { CustomException } from "../utils/customException.js";

class RoleController {
    constructor(){}

    async getRolesByUserId(req,res,next){
        
        try{
            const user  = await User.findById(req.params.userId).populate('role_id')

            if(!user){
                throw new CustomException(404,'User not found')
            } 

            let roles = []
            switch(user.role_id?.name){

                case 'seller' : roles.push(await Role.findOne({ name : 'staff' })) ; break;
                case 'admin'  : roles.push(await Role.findOne({name : 'seller'})) ; break ;
            }
            
            res.status(200).send({
                message : 'Ok',
                data : roles
            })
        }
        catch(err){
            next(err)
        }
    }
}

export default new RoleController