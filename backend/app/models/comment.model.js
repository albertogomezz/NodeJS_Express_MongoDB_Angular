const mongoose = require('mongoose');
const User = require("./user.model");

const commentSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }
},
    {
        timestamps: true
    });


commentSchema.methods.toCommentResponse = async function (user) {
    const authorObj = await User.findById(this.author).exec();
    if (user !== null) {
    return {
        id: this._id,
        body: this.body,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
        author: authorObj.toProfileJSON(user)
    }
}
else {
    return {
        id: this._id,
        body: this.body,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
        author: authorObj.toProfileUnloggedJSON()
    }
}
}

module.exports = mongoose.model('Comment', commentSchema);