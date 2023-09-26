const mongoose = require('mongoose');
const slug = require('slug');

const product_schema = mongoose.Schema({
    slug: { 
        type: String, 
        lowercase: true, 
        unique: true 
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    id_cat: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'categories' }]
});

product_schema.pre('validate', function (next) {
    if (!this.slug) {
        this.slugify();
    }
    next();
});

product_schema.methods.slugify = function () {
    this.slug = slug(this.name) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};

module.exports = mongoose.model('productos', product_schema);