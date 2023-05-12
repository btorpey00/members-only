const Post = require('../models/post');
const asyncHandler = require('express-async-handler');

exports.index = asyncHandler(async (req, res, next) => {
    const allPosts = await Post.find().sort({ date: -1 }).populate('author').exec();

    res.render('index', {
        title: 'Members Only',
        user: req.user,
        all_posts: allPosts
    })
});

exports.sign_out = (req, res, next) => {
    req.logout(function(err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
};