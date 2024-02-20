const { trace } = require("joi");
const Product = require("../models/product");
const AppError = require("../utilities/AppError");

const createProduct = async (req, res, next) => {
    const { name, brand, description, price } = req.body;
    const { path, filename } = req.file;
    const image = {
        url: path,
        filename
    }
    try {
       const product = await Product.create({
            name,
            brand,
            description,
            price,
            image
       })
        await product.save()
        return res.json(product)
    } catch (error) {
        next(new AppError('Error creating product', 401))
    }
}

const getProducts = async (req, res, next) => {
    try {
        const products = await Product.find({})
        return res.json(products)
    } catch (error) {
        next(new AppError('Error fetching data', 402))
    }
}
module.exports = {
    createProduct,
getProducts,
}