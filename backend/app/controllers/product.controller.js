const Product = require('../models/product.model.js');
const category = require('../models/category.model.js');
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');

//create
const createProduct = asyncHandler(async (req, res) => {
    const productData = {
        name: req.body.name || null,
        price: req.body.price || 0,
        description: req.body.description || null,
        id_cat: req.body.id_cat || null,
    };
    const nuevoProducto = await new Product(productData);
    const newproduct = await nuevoProducto.save();
    // const category = await category.updateOne({slug: newproduct.id_cat}, {$push: {products: newproduct.slug}})
    res.status(201).json({ product: newproduct });
});

//findALL
const findAllProduct = asyncHandler(async (req, res) => {
    const products = await Product.find();
    console.log(products);
    res.send(products);
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
    await Product.findOneAndDelete(req.params);
    res.send({message: "Product was deleted successfully!"}); 
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
    deleteOneProduct
}