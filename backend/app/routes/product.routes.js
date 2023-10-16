module.exports = (app) => {
    const products = require('../controllers/product.controller.js');

    // Create
    app.post('/products', products.createProduct);

    //GET ALL
    app.get('/products', products.findAllProduct);

    //GET ONE
    app.get('/products/:slug', products.findOneProduct);

    // Delete a Note with noteId
    app.delete('/products/:slug', products.deleteOneProduct);

    //get products by category
    app.get('/categories/:slug', products.GetProductsByCategory);
}