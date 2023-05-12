const User = require('../models/user');
// const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');

exports.sign_in_get = asyncHandler(async(req, res, next) => {
    res.render('sign-in');
});

exports.sign_in_post = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/sign-in'
});