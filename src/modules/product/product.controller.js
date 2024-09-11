import path from 'path';
import fs from 'fs'
import { FEILD, LIMIT, PAGE, SORT } from "../../constants/api-feature.constants.js";
import { NotFoundException } from "../../exceptions/not-found.exception.js"
import { ApiFeature } from "../../utils/api-feature.utils.js";
import { Category } from "../category/category.model.js";
import { Product } from "./product.model.js"

class ProductController {

    #_productModel;
    #_categoryModel;
    #_apiFeature;
    constructor() {
        this.#_productModel = Product;
        this.#_categoryModel = Category;
        this.#_apiFeature = ApiFeature;
    }

    create = async (req, res, next) => {

        try {
            const { name, price, count, category_id } = req.body
            const product = new this.#_productModel({
                name,
                price,
                count,
                category_id,
                image_url: req.file.filename
            })


            const updatedCategory = await this.#_categoryModel.findByIdAndUpdate(product.category_id, {
                $push: {
                    products: product
                }
            })

            if (!updatedCategory) throw new NotFoundException('Category not found')

            await product.save()

            res.status(200).send({
                message: 'Ok',
                data: [product]
            })
        }
        catch (error) { next(error) }
    }

    getAll = async (req, res, next) => {
        try {
            const feature = new this.#_apiFeature(this.#_productModel.find(), req.query)
                .filter()
                .sort()
                .limitFields()

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
            const feature = new this.#_apiFeature(this.#_productModel.findById(req.params.id), req.query)
                .limitFields()
            const product = await feature.query

            if (!product) throw new NotFoundException('Product not found')

            res.status(200).send({
                message: 'Ok',
                data: [product]
            })
        }
        catch (error) { next(error) }
    }

    updateById = async (req, res, next) => {

        try {
            const updatedProduct = await this.#_productModel.findByIdAndUpdate(
                req.params.id,
                req.body,
                { overwriteDiscriminatorKey: true, new: true }
            );

            if (!updatedProduct) throw new NotFoundException("Product not found")

            res.status(200).send({
                message: 'Ok',
                data: [updatedProduct]
            })
        }
        catch (error) { next(error) }
    }

    deleteById = async (req, res, next) => {

        try {
            const deleteProduct = await this.#_productModel.findByIdAndDelete(req.params.id)

            if (!deleteProduct) throw new NotFoundException("Product not found")

            fs.unlinkSync(path.join(process.cwd(), 'src', 'uploads', deleteProduct.image_url))

            res.status(200).send({
                message: 'Ok',
                data: [deleteProduct]
            })
        }
        catch (error) { next(error) }
    }
}

export default new ProductController