const mongoose = require('mongoose');

const FollowerFollowSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    });
    

module.exports = mongoose.model('Follower', FollowerFollowSchema);
