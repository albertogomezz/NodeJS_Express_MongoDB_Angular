module.exports = (app) => {
    const products = require('../controllers/product.controller.js');

    // Create
    app.post('/products', products.createProduct);

    //GET ALL
    app.get('/products', products.findAllProduct);

    //GET ONE
    app.get('/products/:slug', products.findOneProduct);

    // Update a Note with noteId
    // app.put('/products/:slug', products.update);

    // Delete a Note with noteId
    app.delete('/products/:slug', products.deleteOneProduct);

        //get products by category
        app.get('/categories/:slug', products.GetProductsByCategory);
        
    // Delete todos los mf products
    // app.delete('/products_all', products.deleteAll);
}
