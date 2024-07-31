import { ProductType } from "../models/product-type.js";
import { check } from "../utils/db.js";


const getAllProductTypes = async (req, res) => {

    const productTypes = await ProductType.find().populate('products')

    res.status(200).send({
        message: 'Ok',
        data: productTypes
    })
}

const getProducTypeById = async (req,res)=>{

    const product_type_id = req.params.productTypeId

    if(check(product_type_id)){

        const productType = await ProductType.findById(product_type_id).populate('products')

        if(!productType){

            req.status(404).send({
                message : 'Product-Type not found',
                data : []
            })

            return ;
        }

        res.status(200).send({
            message : 'Ok',
            data : [productType]
        })

        return ;
    }
    
    res.status(404).send({
        message : 'doesnt match id'
    })
}

const addProductType = async (req, res) => {

    const product_type = new ProductType(req.body)

    try {
        await product_type.save()
        res.status(200).send({
            message: 'Ok',
            data: [product_type]
        })
    }
    catch (error) {
        res.status(500).send({
            message: `${error.message}`
        })
    }
}


const updatedProductType = async (req,res)=>{

    const product_type_id = req.params.productTypeId

    if(check(product_type_id)){

        const updatedProductType = await ProductType.findByIdAndUpdate(product_type_id,
            req.body,
            { overwriteDiscriminatorKey: true, new: true }
        )

        if (!updatedProductType) {

            res.status(404).send({
                message: 'Product-Type not found',
                data: []
            })

            return ;
        }

        res.status(200).send({
            message: 'ok',
            data: [updatedProductType]
        })

        return ;
    }

    res.status(404).send({
        message : 'Product-Type not found',
        data : []
    })
}

const deletedProductType = async(req,res)=>{
    
    const product_type_id = req.params.productTypeId

    if(check(product_type_id)){

        const deletedProductType = await ProductType.findByIdAndDelete(product_type_id)

        if(!deletedProductType){

            res.status(404).send({
                message: 'Product-Type not found',
                data: []
            })

            return ;
        }

        res.status(200).send({
            message: 'ok',
            data: [deletedProductType]
        })

        return ;
    }

    res.status(404).send({
        message: 'Product-Type not found',
        data: []
    })

    return ;
}

export { getAllProductTypes, addProductType ,getProducTypeById , updatedProductType , deletedProductType}