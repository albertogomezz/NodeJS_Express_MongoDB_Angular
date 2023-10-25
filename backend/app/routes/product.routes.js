module.exports = (app) => {
    
    const products = require('../controllers/product.controller.js');
    const verifyJWT = require('../middleware/verifyJWT');
    const verifyJWTOptional = require('../middleware/verifyJWTOptional.js');

    // Create
    app.post('/products', products.createProduct);

    //GET ALL
    app.get('/products', verifyJWTOptional , products.findAllProduct);

    //GET ONE
    app.get('/products/:slug', verifyJWTOptional , products.findOneProduct);

    // Delete a Note with noteId
    app.delete('/products/:slug', products.deleteOneProduct);

    //get products by category
    app.get('/categories/:slug', verifyJWTOptional, products.GetProductsByCategory);

    //Favorite
    app.post('/:slug/favorite', verifyJWT, products.favouriteProduct);

    //Unfavorite
    app.delete('/:slug/favorite', verifyJWT, products.unfavoriteProduct);

    // app.put('/:slug', verifyJWT, products.updateProduct);
}