import bcrypt from 'bcrypt'
import { User } from './user.model.js'
import { isValidObjectId } from 'mongoose';
import { NotFoundException } from '../../exceptions/not-found.exception.js';
import { BadRequestException } from '../../exceptions/bad-request.exception.js';
import { Role } from '../role/role.model.js';
import { ConflictException } from '../../exceptions/conflict.exception.js';
class UserController {

    #_userModel;
    #_roleModel;
    constructor() {
        this.#_userModel = User;
        this.#_roleModel = Role;
    }

    create = async (req, res, next) => {
        try {
            const { email, full_name, password, role_id } = req.body
            const role = await this.#_roleModel.findById(role_id).select('name')            

            if((req.role == 'staff'))
                throw new ConflictException('You have not access to this endpoint')

            if((req.role == 'seller' && role.name == 'admin'))
                throw new ConflictException('You have not access to this endpoint')

            const exsistUser = await  this.#_userModel.findOne({ email })
            if(exsistUser)
                throw new ConflictException('Email is already in use')

            const hashPassword = await bcrypt.hash(password, 12)

            const user = new this.#_userModel({
                email,
                full_name,
                password: hashPassword,
                role_id
            })
            await user.save()

            res.status(201).send({
                message: 'User created',
                data: [user]
            })
        }
        catch (error) {
            next(error)
        }
    }


    getAll = async (req, res, next) => {

        try {
            let users = null

            if (req.role == 'admin') {
                users = await this.#_userModel.find({
                    role_id: {
                        $in: [
                            '66acadd710400d16281d36d4',
                            '66acadd710400d16281d36d5'
                        ]
                    }
                }).populate('role_id')
            }
            else {
                users = await this.#_userModel.find({
                    role_id: {
                        $in: [
                            '66acadd710400d16281d36d4'
                        ]
                    }
                }).populate('role_id')
            }

            res.status(200).send({
                message: 'Ok',
                data: users
            })
        }
        catch (error) {
            next(error)
        }
    }

    getById = async (req,res,next) => {
        try {
            const user = await this.#_userModel.findById(req.id)

            res.status(200).send({
                data : user
            })
        } catch (error) {
            next(error)
        }
    }


    updateById = async (req, res, next) => {

        try {
            const { full_name, email, password } = req.body
            const hashPassword = await bcrypt.hash(password, 12)

            if (!isValidObjectId(req.params?.id))
                throw new BadRequestException('Id is not valid ObjectId')

            const updatedUser = await this.#_userModel.findByIdAndUpdate(req.params?.id, {
                $set: { full_name, email, password: hashPassword }
            }, { new: true })
                .populate('role_id')

            if (!updatedUser)
                throw new NotFoundException('User not found')

            res.status(200).send({
                message: 'User updated',
                data: [updatedUser]
            })
        }
        catch (error) {
            next(error)
        }
    }


    deleteById = async (req, res, next) => {
        try {

            if (!isValidObjectId(req.params?.id))
                throw new BadRequestException('Id is not valid ObjectId')

            const deletedUser = await this.#_userModel.findByIdAndDelete(req.params?.id)

            if (!deletedUser)
                throw new NotFoundException('User not found')

            res.status(200).send({
                message: 'User deleted',
                data: [deletedUser]
            })
        }
        catch (error) {
            next(error)
        }
    }
}

export default new UserController