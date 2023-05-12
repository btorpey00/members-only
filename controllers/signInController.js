const User = require('../models/user');

const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');

exports.sign_in_get = asyncHandler(async(req, res, next) => {
    res.render('sign-in');
});