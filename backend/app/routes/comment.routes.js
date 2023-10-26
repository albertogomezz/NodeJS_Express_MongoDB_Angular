module.exports = (app) => {
    
    const verifyJWT = require('../middleware/verifyJWT');
    const verifyJWTOptional = require('../middleware/verifyJWTOptional');
    const comment = require('../controllers/comment.controller');
    
    //GET COMMENTS OF A PRODUCT
    app.get('/:slug/comments', verifyJWTOptional, comment.getCommentsFromProduct);

    app.post('/:slug/comments', verifyJWT, comment.addCommentsToProduct);

    app.delete('/:slug/comments/:id', verifyJWT, comment.deleteComment)

}

