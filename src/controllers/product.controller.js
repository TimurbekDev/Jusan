import { isValidObjectId } from "mongoose";
import { Category } from "../models/category.js";
import { Product } from "../models/product.js";
import { CustomException } from "../utils/customException.js";
import { PAGE, LIMIT, SORT } from "../constants/product.constants.js"
import { NotFoundException } from "../exceptions/not-found.exception.js";


class ProductController {
    constructor() { }

    async createProduct(req, res, next) {

        try {
            const product = new Product(req.body)

            const updatedCategory = await Category.findByIdAndUpdate(product.category_id, {
                $push: {
                    products: product
                }
            })

            if (!updatedCategory) throw new NotFoundException(404, 'Category not found')

            await product.save()

            res.status(200).send({
                message: 'Ok',
                data: [product]
            })
        }
        catch (error) { next(error) }
    }

    async getAllProducts(req, res, next) {

        try {
            let query = { ...req.query }
            let page = req.query?.page || PAGE
            let limit = req.query?.limit || LIMIT
            let sort = req.query?.sort || SORT

            const excludedQueries = ['page', 'limit', 'sort']

            excludedQueries.map(eq => delete query[eq])

            query = JSON.stringify(query).replace(
                /\b(lt|lte|gt|gte)\b/g,
                (match) => `$${match}`
            )

            query = JSON.parse(query)
            let products = await Product.find(query)
                .skip(limit * (page - 1))
                .limit(limit)
                .sort(`${sort}`)

            res.send({
                message: 'Ok',
                count: await Product.find(query).sort(`${sort}`),
                page, limit, sort,
                data: products
            })

        }
        catch (error) { next(error) }
    }

    async getProductById(req, res, next) {

        try {
            const product = await Product.findById(req.params.productId)

            if (!product) throw new NotFoundException(404, 'Product not found')

            res.status(200).send({
                message: 'Ok',
                data: [product]
            })
        }
        catch (error) { next(error) }
    }

    async updateProductById(req, res, next) {

        try {
            const updatedProduct = await Product.findByIdAndUpdate(
                req.params.productId,
                req.body,
                { overwriteDiscriminatorKey: true, new: true }
            );

            if (!updatedProduct) throw new NotFoundException(404, "Product not found")

            res.status(200).send({
                message: 'Ok',
                data: updatedProduct
            })
        }
        catch (error) { next(error) }
    }

    async deleteProductById(req, res, next) {

        try {
            const deleteProduct = await Product.findByIdAndDelete(req.params.productId)

            if (!deleteProduct) throw new NotFoundException(404, "Product not found")

            res.status(200).send({
                message: 'Ok',
                data: deleteProduct
            })
        }
        catch (error) { next(error) }
    }
}

export default new ProductController