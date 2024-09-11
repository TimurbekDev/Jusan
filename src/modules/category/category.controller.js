import { isValidObjectId } from "mongoose";
import { BadRequestException } from "../../exceptions/bad-request.exception.js";
import { NotFoundException } from "../../exceptions/not-found.exception.js"
import { ApiFeature } from "../../utils/api-feature.utils.js";
import { Product } from "../product/product.model.js"
import { Category } from "./category.model.js"
import { FEILD, LIMIT, PAGE, SORT } from "../../constants/api-feature.constants.js";


class CategoryController {

    #_categoryModel;
    #_productModel;
    #_apiFeature;
    constructor() {
        this.#_categoryModel = Category;
        this.#_productModel = Product;
        this.#_apiFeature = ApiFeature;
    }
    //This method create new Category and returuns created category
    create = async (req, res, next) => {
        try {

            const { name } = req.body;
            const category = new this.#_categoryModel({ name })

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
    getAll = async (req, res, next) => {
        try {
            const feature = new this.#_apiFeature(this.#_categoryModel.find(), req.query)
                .filter()
                .sort()
                .limitFields()
                .paginate()

            const categories = await feature.query.populate('products')
            const total = await feature.count()

            res.status(200).send({
                page: req.query?.page || PAGE,
                limit: parseInt(req.query?.limit) || LIMIT,
                sort: req.query?.sort || SORT,
                feilds: req.query?.feilds || FEILD,
                total,
                message: 'Ok',
                data: categories
            })
        }
        catch (error) {
            next(error) 
        }
    }

    //This method return one category with products by id
    getById = async (req, res, next) => {
        try {

            if(!isValidObjectId(req.params?.id)) 
                throw new BadRequestException('Id is not valid ObjectId')

            const feature = new this.#_apiFeature(
                    this.#_categoryModel.findById(req.params.id),
                    req.query)
                .limitFields()

            const category = await feature.query

            if (!selledProduct)
                throw new NotFoundException('SelledProduct not found')

            res.status(200).send({
                feilds: req.query?.feilds || FEILD,
                message: 'Ok',
                data: [category]
            })
        }
        catch (error) { 
            next(error) 
        }
    }

    //This method update category by id and returns updated category
    updateById = async (req, res, next) =>{

        try {
            const { name } = req.body

            if (!isValidObjectId(req.params?.id))
                throw new BadRequestException('Id is not valid ObjectId')

            const updatedCategory = await this.#_categoryModel.findByIdAndUpdate(req.params?.id,{
                    $set: { name }
                    }, { new: true })
                .populate('products')

            if (!updatedCategory) 
                throw new NotFoundException('Category not found')

            res.status(200).send({
                message: 'Ok',
                data: [updatedCategory]
            })
        }
        catch (error) { 
            next(error)
        }
    }

    //This method delete category by Id and returns deleted category
    deleteById = async (req, res, next) => {

        try {

            if (!isValidObjectId(req.params?.id))
                throw new BadRequestException('Id is not valid ObjectId')

            const deletedCategory = await this.#_categoryModel.findByIdAndDelete(req.params?.id)

            await this.#_productModel.deleteMany({ category_id: deletedCategory._id })

            if (!deletedCategory) 
                throw new NotFoundException('Category not found')

            res.status(200).send({
                message: 'Ok',
                data: deletedCategory
            })
        }
        catch (error) { 
            next(error) 
        }
    }
}

export default new CategoryController