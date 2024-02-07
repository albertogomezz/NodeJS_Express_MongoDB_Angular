module.exports = (app) => {
        const categories = require('../controllers/category.controller.js');

        // Create a new Note
        app.post('/categories', categories.create);

        // Retrieve all Notes
        app.get('/categories', categories.findAll);

        // Retrieve all Notes
        app.get('/categories_select_filter', categories.findCategoriesSelect);
}