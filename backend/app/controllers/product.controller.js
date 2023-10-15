const Product = require('../models/product.model.js');
const Category = require('../models/category.model.js');
// const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
// const { off } = require('process');

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

    let query = {};
    let transUndefined = (varQuery, otherResult) => {
        return varQuery != "undefined" && varQuery ? varQuery : otherResult;
    };

    let limit = transUndefined(req.query.limit, 3);
    let offset = transUndefined(req.query.offset, 0);
    let category = transUndefined(req.query.category, "");
    let name = transUndefined(req.query.name, "");
    let price_min = transUndefined(req.query.price_min, 0);
    let price_max = transUndefined(req.query.price_max, Number.MAX_SAFE_INTEGER);
    let nameReg = new RegExp(name);

    query = {
        name: { $regex: nameReg },
        $and: [{ price: { $gte: price_min } }, { price: { $lte: price_max } }],
    };

    if (category != "") {
        query.id_cat = category;
    }

    const products = await Product.find(query).limit(Number(limit)).skip(Number(offset));
    const product_count = await Product.find(query).countDocuments();

    if (!products) {
        res.status(404).json({ msg: "Falló" });
    }

    return res.status(200).json({
        products: await Promise.all(products.map(async product => {
            return await product.toProductResponse();
        })), product_count: product_count
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

    let offset = 0;
    let limit = 3;
    const slug = req.params;
    let product_count = "";

    const category = await Category.findOne(slug).exec();

    if (!category) {
        res.status(400).json({message: "Categoria no encontrada"});
    }

    return await res.status(200).json({
        products: await Promise.all(category.products.map(async productId => {
            const productObj = await Product.findById(productId).skip(offset).limit(limit).exec();
            return await productObj.toProductResponse();
        })),
        product_count : product_count
    })
});

module.exports = {
    createProduct,
    findAllProduct,
    findOneProduct,
    deleteOneProduct,
    GetProductsByCategory
}