const Category = require("../models/category.model.js");
const Product = require("../models/product.model.js");
const asyncHandler = require('express-async-handler');

//CATEGORIAS
const get_carousel_category = asyncHandler( async (req, res) => {

    const categories = await Category.find();

    if (!categories) {
        return res.status(401).json({
        message: "Categories not found"
        })
    }
    return res.status(200).json({
        categories: await Promise.all(categories.map( async categories => {
            return await categories.toCategoryCarouselResponse()
        }))
});
});


//PRODUCTOS
const get_carousel_product = asyncHandler(async (req, res) => {
    const products = await Product.findOne(req.params)
    if (!products) {
        return res.status(401).json({
            message: "Product Not Found"
        });
    }
    return res.status(200).json({
        products: await products.toProductCarouselResponse()
    })
});




module.exports = {
    get_carousel_product,
    get_carousel_category
}