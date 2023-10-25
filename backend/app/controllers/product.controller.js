const Product = require('../models/product.model.js');
const Category = require('../models/category.model.js');
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const User = require('../models/user.model.js');

//create
const createProduct = asyncHandler(async (req, res) => {

    const productData = {
        name: req.body.name || null,
        price: req.body.price || 0,
        description: req.body.description || null,
        images: req.body.images,
        img: req.body.img || null,
        id_cat: req.body.id_cat || null,
        author: req.author || null
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
    let favorited = transUndefined(req.query.favorited, null);
    // let id_user = req.auth ? req.auth.id : null;

    query = {
        name: { $regex: nameReg },
        $and: [{ price: { $gte: price_min } }, { price: { $lte: price_max } }],
    };

    if (category != "") {
        query.id_cat = category;
    }

    if (favorited) {
        const favoriter = await User.findOne({ username: favorited });
        query._id = { $in: favoriter.favorites };
    }

    const products = await Product.find(query).limit(Number(limit)).skip(Number(offset));
    const product_count = await Product.find(query).countDocuments();

    // return res.json(products)

    if (!products) {
        res.status(404).json({ msg: "Falló" });
    }

    const user = await User.findById(req.userId);

    // return res.json(user)

    return res.status(200).json({
        products: await Promise.all(products.map(async product => {
            return await product.toProductResponse(user);
        })), product_count: product_count
    });
});

const findOneProduct = asyncHandler(async (req, res) => {

    const products = await Product.findOne(req.params)
    
    const user = await User.findById(req.userId);

    if (!products) {
        return res.status(401).json({
            message: "Product Not Found"
        });
    }
    return res.status(200).json({
        products: await products.toProductResponse(user)
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

    // res.json("holaaa")
    let offset = 0;
    let limit = 3;
    const slug = req.params;
    let product_count = "";

    const category = await Category.findOne(slug).exec();

    if (!category) {
        res.status(400).json({message: "Categoria no encontrada"});
    }

    const user = await User.findById(req.userId);

    return await res.status(200).json({
        products: await Promise.all(category.products.map(async productId => {
            const productObj = await Product.findById(productId).skip(offset).limit(limit).exec();
            return await productObj.toProductResponse(user);
        })),
        product_count : product_count
    })
});

const favouriteProduct = asyncHandler(async (req, res) => {

    const id = req.userId;

    const { slug } = req.params;

    const loginUser = await User.findById(id).exec();

    if (!loginUser) {
        return res.status(401).json({
            message: "User Not Found"
        });
    }

    const product = await Product.findOne({slug}).exec();

    if (!product) {
        return res.status(401).json({
            message: "Product Not Found"
        });
    }

    await loginUser.favorite(product._id);

    // return res.json(loginUser);
    const updatedProduct = await product.updateFavoriteCount();

    // return res.json(updatedProduct);

    return res.status(200).json({
        product: await updatedProduct.toProductResponse(loginUser)
    });
});

const unfavoriteProduct = asyncHandler(async (req, res) => {

    const id = req.userId;

    const { slug } = req.params;

    const loginUser = await User.findById(id).exec();

    if (!loginUser) {
        return res.status(401).json({
            message: "User Not Found"
        });
    }

    const product = await Product.findOne({slug}).exec();

    if (!product) {
        return res.status(401).json({
            message: "Product Not Found"
        });
    }

    await loginUser.unfavorite(product._id);

    await product.updateFavoriteCount();

    return res.status(200).json({
        product: await product.toProductResponse(loginUser)
    });
});

// const updateProduct = asyncHandler(async (req, res) => {

//     const  userId  = req.userId;

//     const { product } = req.body;

//     const { slug } = req.params;

//     const loginUser = await User.findById(userId).exec();

//     const target = await Product.findOne({ slug }).exec();

//     if (product.title) {
//         target.title = product.title;
//     }
//     if (product.description) {
//         target.description = product.description;
//     }
//     if (product.body) {
//         target.body = product.body;
//     }
//     if (product.tagList) {
//         target.tagList = product.tagList;
//     }

//     await target.save();
//     return res.status(200).json({
//         article: await target.toProductResponse(loginUser)
//     })
// });

module.exports = {
    createProduct,
    findAllProduct,
    findOneProduct,
    deleteOneProduct,
    GetProductsByCategory,
    favouriteProduct,
    unfavoriteProduct
    // updateProduct
}