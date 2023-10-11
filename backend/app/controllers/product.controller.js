const Product = require('../models/product.model.js');
const Category = require('../models/category.model.js');
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const { off } = require('process');

//create
const createProduct = asyncHandler(async (req, res) => {

    const productData = {
        name: req.body.name || null,
        price: req.body.price || 0,
        description: req.body.description || null,
        images: req.body.images,
        img: req.body.img || null,
        id_cat: req.body.id_cat || null,
    };

    const id_cat = req.body.id_cat;
    
    const category = await Category.findOne({id_cat}).exec();

    if (!category) {
        res.status(400).json({message: "Ha ocurrido un error al buscar la categoria"});
    }

    const nuevoProducto = await new Product(productData);
    await nuevoProducto.save();

    if (!nuevoProducto) {
        res.status(400).json({message: "Ha ocurrido un error"});
    }

    await category.addProduct(nuevoProducto._id);

    return res.status(200).json({
        product: await nuevoProducto.toProductResponse()
    })
});

//findALL
const findAllProduct = asyncHandler(async (req, res) => {

    let products = {};
    let query = {};
    let offset = req.query.offset;
    let limit = req.query.limit;
    let id_category = req.query.id_cat;
    let min = req.query.min_price;
    let max = req.query.max_price;

    // Between del Preu
    if (max != undefined && min != undefined) {
        query = { price: { $gte: min, $lte: max } }
    }
    if (min != undefined && max == undefined) {
        query = { price: { $gte: min } }
    }
    if (min == undefined && max != undefined) {
        query = { price: { $lte: max } }
    }

    // Filtro per categoria
    if (id_category) {
        query.id_cat = id_category;
    }

    if ( query.id_cat || query.price ) {
        products = await Product.find(query).limit(limit).skip(offset);
        const product_count = await Product.find(query).countDocuments();
    } else {
        products = await Product.find().limit(limit).skip(offset);
        const product_count = await Product.find().countDocuments();
    }

    if (!products) {
        res.send("Product not found")
    }

    return res.send({
        products: await Promise.all(products.map(async products => {
            return await products.toProductResponse();
        }))
    });
});

const findOneProduct = asyncHandler(async (req, res) => {
    const products = await Product.findOne(req.params)
    if (!products) {
        return res.status(401).json({
            message: "Product Not Found"
        });
    }
    return res.status(200).json({
        products: await products.toProductResponse()
    })
});

//DELETE ONE
const deleteOneProduct = asyncHandler(async (req, res) => {

    const slug = req.params;

    // res.send(slug);
    const product = await Product.findOne(slug).exec();

    // res.send(product);
    if (!product) {
        res.status(400).json({message: "Producto no encontrado"});
    }

    const id_cat = product.id_cat
    // res.send(id_cat);
    const category = await Category.findOne({id_cat}).exec();

    if (!category) {
        res.status(400).json({message: "Ha ocurrido un error"});
    }

    await category.removeProduct(product._id)

});


const GetProductsByCategory = asyncHandler(async (req, res) => {
    const slug = req.params;
    
    // console.log(slug);

    const category = await Category.findOne(slug).exec();
    // res.send(category);
    if (!category) {
        res.status(400).json({message: "Categoria no encontrada"});
    }

    return await res.status(200).json({
        products: await Promise.all(category.products.map(async productId => {
            const productObj = await Product.findById(productId).exec();
            return await productObj.toProductResponse();
        }))
    })
    
});

module.exports = {
    createProduct,
    findAllProduct,
    findOneProduct,
    deleteOneProduct,
    GetProductsByCategory
}