module.exports = (app) => {
    const carousel = require('../controllers/carousel.controller');

    //GET ALL
    app.get('/carousel', carousel.get_carousel_category);
    app.get('/carousel/:slug', carousel.get_carousel_product);

}
