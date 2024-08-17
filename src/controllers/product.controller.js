import { isValidObjectId } from "mongoose";
import { Category } from "../models/category.js";
import { Product } from "../models/product.js";
import { CustomException } from "../utils/customException.js";


class ProductController{
    constructor(){}

    async createProduct(req,res,next){

        const product = new Product(req.body)
        const category  = isValidObjectId(product.category_id)
            ? await Category.findById(product.category_id)
            : (function(){throw new CustomException(300,'aaaaa')})

        if(category){
            try{
                await Category.findByIdAndUpdate(product.category_id,
                    { $push : {products : product}}
                )
                await product.save()
    
                return res.status(200).send({
                    message: 'Ok',
                    data: [product]
                })
            }
            catch(error){
                next(new CustomException(500,error.message))
            }
        }

        (function(){throw new CustomException(300,'aaaaa')})
    }

    async getAllProducts(_,res,__){

        const products = await Product.find()

        res.status(200).send({
            message : 'Ok',
            count : products.length,
            data : products
        })
    }

    async getProductById(req,res,next){

        const productId = req.params?.productId
        const product = isValidObjectId(productId)
            ? await Product.findById(productId)
            : next(new CustomException(400,"Doesn't match it"))
        
        if(product){

            return res.status(200).send({
                message : 'Ok',
                data : [product]
            })
        }

        next(new CustomException(404,'Product not found'))
    }

    async updateProductById(req,res,next){

        const productId = req.params?.productId

        const updatedProduct = isValidObjectId(productId)
            ? await Product.findByIdAndUpdate(productId,
                req.body,
                {overwriteDiscriminatorKey : true , new : true})
            : next(new CustomException(400,"Doesn't match id"))
        
        if(updatedProduct){

            return res.status(200).send({
                message : 'Ok',
                data : [updatedProduct]
            })
        }

        next(new CustomException(404,"Product not found"))
    }

    async deleteProductById(req,res,next){

        const productId = req.params?.productId
        const product = isValidObjectId(productId)
            ? await Product.findByIdAndDelete(productId)
            : next(new CustomException(400,"Doesn't match id"))

        if(product){

            return res.status(200).send({
                message : 'Ok',
                data : [product]
            })
        }

        next(new CustomException(404,"Product not found"))
    }
}

export default new ProductController