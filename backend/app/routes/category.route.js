module.exports = (app) => {
    const categorys = require('../controllers/category.controller.js');

    // Create a new Note
    // app.post('/category', categorys.create);

    // Retrieve all Notes
    app.get('/category', categorys.findAll);

    // Retrieve a single Note with noteId
    app.get('/category/:id', categorys.findOne);

    // Update a Note with noteId
    app.put('/category/:id', categorys.update);

    // Delete a Note with noteId
    app.delete('/category/:id', categorys.delete);

    // Delete todos los mf categorys
    app.delete('/category_all', categorys.deleteAll);
}