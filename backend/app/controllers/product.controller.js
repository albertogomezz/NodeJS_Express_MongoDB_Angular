const Product = require('../models/product.model.js');
const Category = require('../models/category.model.js');
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');

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
    // let limit = req.query.limit;
    let id_category = req.query.id_cat;
    let min = req.query.min_price;
    let max = req.query.max_price;

    // Between del Preu
    if (max != undefined && min != undefined) {
        query = { price: { $gte: min, $lte: max } }
    }
    if (min != undefined && max == undefined) {
        query = { price: { $gte: min } }
        // res.send(query)
    }
    if (min == undefined && max != undefined) {
        query = { price: { $lte: max } }
        // res.send(query)
    }

    // Filtro per categoria
    if (id_category != "") {
        query.id_cat = id_category;
        // res.send(query.id_cat)
    }

    // res.send(query)

    if ( query != {} ) {
        // const products = await Product.find(query);
        res.send("en filtros")
    }    
    if ( query == {} ){
        // const products = await Product.find().limit(2);
        res.send("sense filtros")
    }
    
    // res.send(products)

    // if (!products) {
    //     res.send("Product not found")
    // }

    // return res.status(200).json({
    //     products: await Promise.all(products.map(async products => {
    //         return await products.toProductResponse();
    //     }))
    // });
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

//     // Find note and update it with the request body
//     Product.findByIdAndUpdate(req.params.id, {
//         nombre: req.body.nombre, 
//         descripcion: req.body.descripcion,
//         precio: req.body.precio
//     }, {new: true})
//     .then(product => {
//         if(!product) {
//             return res.status(404).send({
//                 message: "Note not found with id " + req.params.id
//             });
//         }
//         res.send(product);
//     }).catch(err => {
//         if(err.kind === 'ObjectId') {
//             return res.status(404).send({
//                 message: "Note not found with id " + req.params.id
//             });                
//         }
//         return res.status(500).send({
//             message: "Error updating note with id " + req.params.id
//         });
//     });
// };

// // Delete a note with the specified noteId in the request
// exports.delete = (req, res) => {
//     // res.json(req.params.id);
//     Product.findByIdAndRemove(req.params.id)
//     .then(product => {
//         // res.json(product);
//         if(!product) {
//             return res.status(404).send({
//                 message: "Note not found with id " + req.params.id
//             });
//         }
//         res.send({message: "Note deleted successfully!"});
//     }).catch(err => {
//         res.json('esta dentro del catch');
//     });
// };

// exports.deleteAll = (req, res) => {
//     Product.deleteMany({})
//     .then(() => {
//         res.send({ message: "All products deleted successfully!" });
//     })
//     .catch(err => {
//         res.status(500).send({
//             message: "Some error occurred while deleting all products."
//         });
//     });
// };

module.exports = {
    createProduct,
    findAllProduct,
    findOneProduct,
    deleteOneProduct,
    GetProductsByCategory
}