import bcrypt from 'bcrypt'
import { NotFoundException } from "../exceptions/not-found.exception.js";
import { User } from "../models/user.js";
import { BadRequestException } from '../exceptions/bad-request.exception.js';
import { generateJwtToken } from '../helpers/jwt.helper.js';

class AuthController{
    constructor(){}

    async login(req,res,next){

        try{
            const user = await User.findOne({ email : req.body.email })
                .populate('role_id')

            if(!user) throw new NotFoundException(404,'Password or Email invalid')
            
            const result = await bcrypt.compare(req.body.password,user.password)

            if(!result) throw new BadRequestException('Password or Email invalid')

            res.status(200).send({
                message : 'Ok',
                data : [user],
                jwtToken : generateJwtToken()
            })
        }
        catch(error){ next(error) }
    }
}

export default new AuthController 