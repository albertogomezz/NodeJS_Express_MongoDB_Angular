const { log } = require('console');
const User = require('../models/user.model');
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const { decode } = require('punycode');

const getProfile = asyncHandler(async (req, res) => {
    
    const { username } = req.params;
    const loggedin = req.loggedin;

    // console.log(`print out username ${username}`)
    const user = await User.findOne({ username }).exec();

    if (!user) {
        return res.status(404).json({
            message: "User Not Found"
        })
    }
    if (!loggedin) {
        return res.status(200).json({
            profile: user.toProfileJSON(false)
        });
    } else {
        const loginUser = await User.findOne({ email: req.userEmail }).exec();
        return res.status(200).json({
            profile: user.toProfileJSON(loginUser)
        })
    }

});

const followUser = asyncHandler(async (req, res) => {
    // return res.json('dentro');
    const { username } = req.params;
    // return res.json(req.params);

    const loginUser = await User.findOne({ email: req.userEmail }).exec();
    const user = await User.findOne({ username }).exec();

    if (!user || !loginUser) {
        return res.status(404).json({
            message: "User Not Found"
        })
    }

    await loginUser.follow(user._id);
    await user.addFollower(loginUser._id);

    return res.status(200).json({
        profile: user.toProfileJSON(loginUser)
    })

});

const unFollowUser = asyncHandler(async (req, res) => {
    const { username } = req.params;

    const loginUser = await User.findOne({ email: req.userEmail }).exec();
    const user = await User.findOne({ username }).exec();

    if (!user || !loginUser) {
        return res.status(404).json({
            message: "User Not Found"
        })
    }
    await loginUser.unfollow(user._id);
    await user.removeFollower(loginUser._id);

    return res.status(200).json({
        profile: user.toProfileJSON(loginUser)
    })

});

const getProfile_User = asyncHandler(async (req, res) => {
    
    const { username } = req.params;

    const user_logged = await User.findOne({ "email": req.userEmail })

    // return res.json(user_logged._id)

    const user = await User.findOne({ username }).exec();

    if (!user) {
        return res.status(404).json({
            message: "User Not Found"
        })
    }

    // //Qui seguix al usuari
    const followers = await User.find({ followingUsers: { $in: [user._id] } })
    .select('username bio image -_id')
    .exec();

    const number_followers = followers.length;
    // return res.json(followers)

    // //A qui seguix el usuari
    const follows = await User.find({ followersUsers: { $in: [user._id] } })
    .select('username bio image')
    .exec();

    const number_follows = follows.length;
    // return res.json(follows)

    return res.json({
        profile: user.toSeeProfileUser(user_logged,followers,number_followers,follows,number_follows)
    })
});

module.exports = {
    getProfile,
    followUser,
    unFollowUser,
    getProfile_User
}