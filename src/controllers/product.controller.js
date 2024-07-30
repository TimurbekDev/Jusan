import { Product } from "../models/product.js";
import { check } from "../utils/db.js";


const getAllProducts = async (_, res) => {
    const products = await Product.find()

    res.status(200).send({
        message: 'ok',
        data: products
    })
}

const addProduct = async (req, res) => {

    const product = new Product(req.body)

    try {
        await product.save();
        res.status(200).send({
            message: 'ok',
            data: [product]
        })
    }
    catch (error) {
        res.status(500).send(error);
    }
}

const getProductById = async (req, res) => {

    const productId = req.params.productId

    if (check(productId)) {
        const foundedProduct = await Product.findById(productId)

        if (!foundedProduct) {
            res.status(404).send({
                message: 'Product not found',
                data: []
            })
            return ;
        }

        res.status(200).send({
            message: 'ok',
            data: [foundedProduct]
        })
        return ;
    }

    res.status(404).send({
        message: 'Product not found',
        data: []
    })
    return ;
}

const deleteProductById = async (req, res) => {

    const productId = req.params.productId

    if (check(productId)) {
        const deletedProduct = await Product.findByIdAndDelete(productId)

        if (!deletedProduct) {
            res.status(404).send({
                message: 'Product not found',
                data: []
            })
            return ;
        }

        res.status(200).send({
            message: 'ok',
            data: [deletedProduct]
        })

        return ;
    }

    res.status(404).send({
        message: 'Product not found',
        data: []
    })

    return ;
}

const updateProductById = async (req, res) => {

    const productId = req.params.productId

    if(check(productId)){

        const updatedProduct = await Product.findByIdAndUpdate(productId,
            req.body,
            { overwriteDiscriminatorKey: true, new: true }
        )
    
        if (!updatedProduct) {
            res.status(404).send({
                message: 'Product not found',
                data: []
            })
            return ;
        }

        res.status(200).send({
            message: 'ok',
            data: [updatedProduct]
        })

        return ;
    }

    res.status(404).send({
        message: 'Product not found',
        data: []
    })

    return ;
}


export { getAllProducts, addProduct, getProductById, deleteProductById, updateProductById }