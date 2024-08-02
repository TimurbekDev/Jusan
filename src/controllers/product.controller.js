import { Category } from "../models/category.js";
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
    const categoryId = product.category_id

    if (check(categoryId)) {

        const foundedCategory = await Category.findById(categoryId)

        if (!foundedCategory) {
            res.status(404).send({
                message: 'Category not found'
            })
            return;
        }

        try {

            await Category.findByIdAndUpdate(categoryId,
                {
                    $push: {
                        products: product
                    }
                },
                { upsert: false, new: true }
            )

            await product.save()
            res.status(200).send({
                message: 'Ok',
                data: [product]
            })

        }
        catch (error) {
            res.status(500).send({
                message: `${error.message}`
            })
        }
        return ;
    }

    res.status(404).send({
        message : "Category doesn't match"
    })
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
            return;
        }

        res.status(200).send({
            message: 'ok',
            data: [foundedProduct]
        })
        return;
    }

    res.status(404).send({
        message: 'Product not found',
        data: []
    })
    return;
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

    return;
}

const updateProductById = async (req, res) => {

    const productId = req.params.productId

    if (check(productId)) {

        const updatedProduct = await Product.findByIdAndUpdate(productId,
            req.body,
            { overwriteDiscriminatorKey: true, new: true }
        )

        if (!updatedProduct) {
            res.status(404).send({
                message: 'Product not found',
                data: []
            })
            return;
        }

        res.status(200).send({
            message: 'ok',
            data: [updatedProduct]
        })

        return;
    }

    res.status(404).send({
        message: 'Product not found',
        data: []
    })

    return ;
}


export { getAllProducts, addProduct, getProductById, deleteProductById , updateProductById }
