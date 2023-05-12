const Post = require('../models/post');
const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');

exports.new_post_get = (req, res, next) => {
    res.render('new-post', {
        title: 'Create Post',
        user: req.user
    })
};

exports.new_post_post = [
    body('post_title', 'Post title is required')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('post_content', 'Post content is required')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    
    asyncHandler(async(req, res, next) => {
        const errors = validationResult(req);
        const date = new Date();

        const newPost = new Post ({
            title: req.body.post_title,
            content: req.body.post_content,
            author: req.user,
            date: date
        });

        if (!errors.isEmpty()) {
            res.render('new-post', {
                title: 'Create Post',
                errors: errors.array(),
                new_post: newPost,
                user: req.user
            })
            return;
        } else {
            await newPost.save();
            res.redirect('/')
        }
    })
]