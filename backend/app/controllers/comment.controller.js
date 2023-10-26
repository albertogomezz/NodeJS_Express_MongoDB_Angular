const Product = require('../models/product.model');
const User = require('../models/user.model');
const Comment = require('../models/comment.model');
const asyncHandler = require('express-async-handler');
const { json } = require('body-parser');

const addCommentsToProduct = asyncHandler(async (req, res) => {
    // return res.json("HOLAA");
    const id = req.userId;
    // return res.json(id)
    const commenter = await User.findById(id).exec();
        // return res.json(commenter)
    if (!commenter) {
        return res.status(401).json({
            message: "User Not Found"
        });
    }
    const { slug } = req.params;

    const product = await Product.findOne({slug}).exec();
    // return res.json(product)
    if (!product) {
        return res.status(401).json({
            message: "product Not Found"
        });
    }
    // return res.json(req.body.comment)
    var body = req.body.comment;
    // return res.json(body)
    const newComment = await Comment.create({
        body: body,
        author: commenter._id,
        article: product._id
    });
    // return res.json(newComment)
    await product.addComment(newComment._id);

    return res.status(200).json({
        comment: await newComment.toCommentResponse(commenter)
    })
});

const getCommentsFromProduct = asyncHandler(async (req, res) => {
    // return res.json('HOLAAAAA');
    // return req.params;
    const { slug } = req.params;
    const product = await Product.findOne({slug}).exec();
    // return res.json(product)

    if (!product) {
        return res.status(401).json({
            message: "product Not Found"
        });
    }

    const loggedin = req.loggedin;
    // return res.json(loggedin)

    if (loggedin) {
        const loginUser = await User.findById(req.userId).exec();
        // return res.json(loginUser);
        return await res.status(200).json({
            comments: await Promise.all(product.comments.map(async commentId => {
                // return await res.json(comments);
                const commentObj = await Comment.findById(commentId).exec();
                // return res.json(commentObj);
                return await commentObj.toCommentResponse(loginUser);
            }))
        })
    } else {
        // return res.json("not logged")
        return await res.status(200).json({
            comments: await Promise.all(product.comments.map(async (commentId) => {
                const commentObj = await Comment.findById(commentId).exec();
                // return res.json(commentObj)
                // console.log(commentObj);
                const temp =  await commentObj.toCommentResponse(false);
                // console.log(temp);
                return temp;
            }))
        })
    }
});

const deleteComment = asyncHandler(async (req, res) => {
    const userId = req.userId;

    const commenter = await User.findById(userId).exec();

    if (!commenter) {
        return res.status(401).json({
            message: "User Not Found"
        });
    }
    const { slug, id } = req.params;

    const product = await Product.findOne({slug}).exec();

    if (!product) {
        return res.status(401).json({
            message: "product Not Found"
        });
    }

    const comment = await Comment.findById(id).exec();

    if (comment.author.toString() === commenter._id.toString()) {
        await product.removeComment(comment._id);
        await Comment.deleteOne({ _id: comment._id });
        return res.status(200).json({
            message: "comment has been successfully deleted!!!"
        });
    } else {
        return res.status(403).json({
            error: "only the author of the comment can delete the comment"
        })
    }
});

module.exports = {
    addCommentsToProduct,
    getCommentsFromProduct,
    deleteComment
}