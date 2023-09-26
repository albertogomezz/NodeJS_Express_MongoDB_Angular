const Product = require('../models/product.model.js');

// Create and Save a new Note ESTE ES EL VIEJO
// exports.create = (req, res) => {

//     const product = new Product({
//         name: req.body.nombre, 
//         price: req.body.descripcion,
//         description: req.body.precio,

//     });
//     // Save Note in the database
//     product.save()
//     .then(data => {
//         res.send(data);
//     }).catch(err => {
//         res.status(500).send({
//             message: err.message || "Some error occurred while creating the Note."
//         });
//     });
// };

//NUEVO
exports.create_product = async (req, res) => {
try {
    const product_data = {
        name: req.body.name || null,
        price: req.body.price || 0,
        description: req.body.description || null,
        id_cat: req.body.id_category || null,
    };
    const product = new Product(product_data);
    const category = await category.updateOne({slug: product.id_category}, {$push: {products: product._id}})
    const new_product = await product.save();
    res.json(new_product.toJSONFor());
} catch (error) {
    res.status(500).send({message: error.message || "Some error occurred while creating the Product."});
}
};

// Retrieve and return all notes from the database.
exports.findAll = async (req, res) => {
    Product.find()
    .then(products => {
        res.send(products);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Product.findById(req.params.id)
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.id
            });            
        }
        res.send(product);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.id
        });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.precio) {
        return res.status(400).send({
            message: "Price content can not be empty"
        });
    }

    // Find note and update it with the request body
    Product.findByIdAndUpdate(req.params.id, {
        nombre: req.body.nombre, 
        descripcion: req.body.descripcion,
        precio: req.body.precio
    }, {new: true})
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.id
            });
        }
        res.send(product);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.id
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    // res.json(req.params.id);
    Product.findByIdAndRemove(req.params.id)
    .then(product => {
        // res.json(product);
        if(!product) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.id
            });
        }
        res.send({message: "Note deleted successfully!"});
    }).catch(err => {
        res.json('esta dentro del catch');
    });
};

exports.deleteAll = (req, res) => {
    Product.deleteMany({})
    .then(() => {
        res.send({ message: "All products deleted successfully!" });
    })
    .catch(err => {
        res.status(500).send({
            message: "Some error occurred while deleting all products."
        });
    });
};
