import { Category } from "../models/category.js";
import { check } from "../utils/db.js";


const getAllCategories = async (req, res) => {

    const categories = await Category.find().populate('products')

    res.status(200).send({
        message: 'Ok',
        data: categories
    })
}

const getCategoryById = async (req,res)=>{

    const categoryId = req.params.categoryId

    if(check(categoryId)){

        const category = await Category.findById(categoryId).populate('products')

        if(!category){

            res.status(404).send({
                message : 'Category not found',
                data : []
            })

            return ;
        }

        res.status(200).send({
            message : 'Ok',
            data : [category]
        })

        return ;
    }
    
    res.status(404).send({
        message : 'doesnt match id'
    })
}

const addCategory = async (req, res) => {

    const category = new Category(req.body)

    try {
        await category.save()
        res.status(200).send({
            message: 'Ok',
            data: [category]
        })
    }
    catch (error) {
        res.status(500).send({
            message: `${error.message}`
        })
    }
}


const updatedCategoryById = async (req,res)=>{

    const categoryId = req.params.categoryId

    if(check(categoryId)){

        const updatedCategory = await Category.findByIdAndUpdate(categoryId,
            req.body,
            { overwriteDiscriminatorKey: true, new: true }
        )

        if (!updatedCategory) {

            res.status(404).send({
                message: 'Category not found',
                data: []
            })

            return ;
        }

        res.status(200).send({
            message: 'ok',
            data: [updatedCategory]
        })

        return ;
    }

    res.status(404).send({
        message : 'Category not found',
        data : []
    })
}

const deletedCategoryById = async(req,res)=>{
    
    const categoryId = req.params.categoryId

    if(check(categoryId)){

        const deletedCategory = await Category.findByIdAndDelete(categoryId)

        if(!deletedCategory){

            res.status(404).send({
                message: 'Category not found',
                data: []
            })

            return ;
        }

        res.status(200).send({
            message: 'ok',
            data: [deletedCategory]
        })

        return ;
    }

    res.status(404).send({
        message: 'Category not found',
        data: []
    })

    return ;
}

export { getAllCategories, addCategory ,getCategoryById , updatedCategoryById , deletedCategoryById}