module.exports = (app) => {
    const products = require('../controllers/product.controller.js');

    // Create a new Note
    app.post('/productos', products.create);

    // Retrieve all Notes
    app.get('/productos', products.findAll);

    // Retrieve a single Note with noteId
    app.get('/productos/:id', products.findOne);

    // Update a Note with noteId
    app.put('/productos/:id', products.update);

    // Delete a Note with noteId
    app.delete('/productos/:id', products.delete);

    // Delete todos los mf products
    app.delete('/productos_all', products.deleteAll);
}