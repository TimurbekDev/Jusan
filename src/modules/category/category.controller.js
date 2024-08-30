import { NotFoundException } from "../../exceptions/not-found.exception.js"
import { Product } from "../product/product.model.js"
import { Category } from "./category.model.js"


class CategoryController {
    constructor() { }

    //This method create new Category and returuns created category
    async create(req, res, next) {

        try {
            const category = new Category(req.body)
            await category.save()

            res.status(201).send({
                message: 'Ok',
                data: [category]
            })
        }
        catch (error) { next(error) }
    }

    //This method returns all categories with products
    async getAll(_, res, next) {

        try {
            const categories = await Category.find().populate('products')

            res.status(200).send({
                message: 'Ok',
                count: categories.length,
                data: categories
            })
        }
        catch (error) { next(error) }
    }

    //This method return one category with products by id
    async getById(req, res, next) {

        try {
            const category = await Category.findById(req.params.id)

            if (!category) throw new NotFoundException('Category not found')

            res.sendFile()

            res.status(200).send({
                message: 'Ok',
                data: [category]
            })
        }
        catch (error) { next(error) }
    }

    //This method update category by id and returns updated category
    async updatedById(req, res, next) {

        try {
            const updatedCategory = await Category.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    overwriteDiscriminatorKey: true,
                    new: true,
                    runValidators: true
                })
                .populate('products')

            if (!updatedCategory) throw new NotFoundException('Category not found')

            res.status(200).send({
                message: 'Ok',
                data: [updatedCategory]
            })
        }
        catch (error) { next(error) }
    }

    //This method delete category by Id and returns deleted category
    async deleteById(req, res, next) {

        try {
            const deletedCategory = await Category.findByIdAndDelete(req.params.id)

            await Product.deleteMany({ category_id: deletedCategory._id })

            if (!deletedCategory) throw new NotFoundException(404, 'Category not found')

            res.status(200).send({
                message: 'Ok',
                data: deletedCategory
            })
        }
        catch (error) { next(error) }
    }
}

export default new CategoryController