import { NotFoundException } from "../exceptions/not-found.exception.js";
import { User } from "../models/user.js";

class AuthController{
    constructor(){}

    async login(req,res,next){

        try{
            const user = await User.findOne({
                email : req.body.email,
                password : req.body.password
            }).populate('role_id')

            if(!user) throw new NotFoundException(404,'User not found')

            res.status(200).send({
                message : 'Ok',
                data : [user]
            })
        }
        catch(error){ next(error) }
    }
}

export default new AuthController