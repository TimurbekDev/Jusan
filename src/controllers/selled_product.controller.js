import { isValidObjectId } from "mongoose";
import { FEILD, LIMIT, PAGE, SORT } from "../constants/product.constants.js";
import { BadRequestException } from "../exceptions/bad-request.exception.js";
import { NotFoundException } from "../exceptions/not-found.exception.js";
import { Product } from "../models/product.js";
import { SelledProduct } from "../models/selled_products.js";
import { User } from "../models/user.js";
import { ApiFeature } from "../utils/ApiFeature.js";

class SelledProductController {

    #_selledProductModel;
    #_productModel;
    #_userModel;
    #_apiFeature;
    constructor() {
        this.#_selledProductModel = SelledProduct;
        this.#_productModel = Product;
        this.#_userModel = User;
        this.#_apiFeature = ApiFeature
    }

    create = async (req, res, next) => {
        try {

            const { product_id, user_id, selled_price, count } = req.body
            const selledProduct = new this.#_selledProductModel({ product_id, user_id, selled_price, count })

            const foundedUser = await this.#_userModel.findById(selledProduct.user_id)
            if (!foundedUser)
                throw new NotFoundException('User not found')


            const foundedProduct = await this.#_productModel.findById(selledProduct.product_id)
            if (!foundedProduct)
                throw new NotFoundException('Product not found')

            if (foundedProduct.count - selledProduct.count < 0)
                throw new BadRequestException('selledProduct count mustbe lte than product count')

            await this.#_productModel.findByIdAndUpdate(selledProduct.product_id,
                { $inc: { count: -selledProduct.count } })

            selledProduct.original_price = foundedProduct.price
            await selledProduct.save()

            res.status(201).send({
                message: 'Ok',
                data: [selledProduct]
            })
        } catch (error) {
            next(error)
        }
    }

    getAll = async (req, res, next) => {

        try {
            const feature = new this.#_apiFeature(this.#_selledProductModel.find(), req.query)
                .filter()
                .sort()
                .limitFields()
                .paginate();

            res.send({
                page: req.query?.page || PAGE,
                limit: req.query?.limit || LIMIT,
                sort: req.query?.sort || SORT,
                feilds: req.query?.feilds || FEILD,
                total: await feature.count(),
                message: 'Ok',
                data: await feature.query
            })
        } catch (error) {
            next(error)
        }
    }

    getById = async (req, res, next) => {

        try {
            if (!isValidObjectId(req.params.id))
                throw new BadRequestException('Id is not valid ObjectId')

            const feature = new this.#_apiFeature(
                this.#_selledProductModel.findById(req.params.id),
                req.query)
                .limitFields()

            const selledProduct = await feature.query

            if (!selledProduct)
                throw new NotFoundException('SelledProduct not found')

            res.status(200).send({
                feilds: req.query?.feilds || FEILD,
                message: 'Ok',
                data: [selledProduct]
            })
        } catch (error) {
            next(error)
        }
    }

    updateById = async (req, res, next) => {

        try {
            const selled_product_id = req.params.id
            const { selled_price, count } = req.body

            if (!isValidObjectId(selled_product_id))
                throw new BadRequestException('Id is not valid ObjectId')

            const foundedSelledProduct = await this.#_selledProductModel.findById(selled_product_id)
            if (!foundedSelledProduct)
                throw new NotFoundException('SelledProduct not found')

            const refProduct = await this.#_productModel.findById(foundedSelledProduct.product_id)
            if (!refProduct)
                throw new BadRequestException('Product not found')

            if ((refProduct.count + (foundedSelledProduct.count - count)) < 0)
                throw new BadRequestException('selledProduct count mustbe lte than product count')

            await this.#_productModel.findByIdAndUpdate(refProduct._id,
                { $inc: { count: (foundedSelledProduct.count - count) } })

            const result = await this.#_selledProductModel.findByIdAndUpdate(selled_product_id, {
                $set: { selled_price, count }
            }, { new: true })

            res.status(200).send({
                message: 'Ok',
                data: [result]
            })
        } catch (error) {
            next(error)
        }
    }

    deleteById = async (req,res,next) => {
        try {
            
            const selled_product_id = req.params.id

            
        } catch (error) {
            next(error)
        }
    }
}

export default new SelledProductController