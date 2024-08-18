import { isValidObjectId } from "mongoose";
import { Category } from "../models/category.js";
import { CustomException } from "../utils/customException.js";
import { Product } from "../models/product.js";

class CategoryController {
    constructor() { }

    //This method create new Category and returuns created category
    async createCategory(req, res, next) {

        try {
            const category = new Category(req.body)
            await category.save()

            res.status(201).send({
                message: 'Ok', 
                data: [category]
            })
        }
        catch (error) {
            next(error)
        }
    }

    //This method returns all categories with products
    async getAllCategories(_, res, next) {

        try {
            const categories = await Category.find().populate('products')

            res.status(200).send({
                message: 'Ok',
                count: categories.length,
                data: categories
            })
        }
        catch (error) {
            next(error)
        }
    }

    //This method return one category with products by id
    async getCategoryById(req, res, next) {

        try{
            const category = await Category.findById(req.params.categoryId)

            if(!category) throw new CustomException(404,'Category not found')

            res.status(200).send({
                message : 'Ok',
                data : [category]
            })
        }
        catch(error){
            next(error)
        }
    }

    //This method update category by id and returns updated category
    async updatedCategoryById(req, res, next) {

        try{
            const updatedCategory = await Category.findByIdAndUpdate(
                    req.params.categoryId,
                    req.body,
                    { overwriteDiscriminatorKey: true, 
                        new: true ,
                        runValidators : true})
                .populate('products')

            if(!updatedCategory) throw new CustomException(404,'Category not found')

            res.status(200).send({
                message : 'Ok',
                data : [updatedCategory]
            })
        }
        catch(error){
            next(error)
        }
    }

    //This method delete category by Id and returns deleted category
    async deletedCategoryById(req, res, next) {

        try{
             const deletedCategory = await Category.findByIdAndDelete(req.params.categoryId)

            await Product.deleteMany({category_id : deletedCategory._id})

             if(!deletedCategory) throw new CustomException(404,'Category not found')

             res.status(200).send({
                message : 'Ok',
                data : deletedCategory
             })
        }
        catch(error){
            next(error)
        }
    }
}

export default new CategoryController