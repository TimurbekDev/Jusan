import { User } from "../models/user.js"
import { CustomException } from "../utils/customException.js"


class UserController {
    constructor(){}

    async getAllUsers(_,res,next){

        try{
            const users = await User.find().populate('role_id')

            res.status(200).send({
                message : 'Ok',
                data : users
            })
        }
        catch(error){
            next(new CustomException(500,error.message))
        }
    }

    async createUser(req,res,next){

        const user = new User(req.body)
        try{
            await user.save()

            res.status(201).send({
                message : 'Ok',
                data : [user]
            })
        }
        catch(error){
            next(new CustomException(400,error.message))
        }
    }
}

export default new UserController