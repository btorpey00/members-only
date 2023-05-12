const Post = require('../models/post');

const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');

exports.post_list = asyncHandler(async(req, res, next) => {
    res.render('/');
});