const User = require('../models/user');

const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

exports.sign_up_get = asyncHandler(async(req, res, next) => {
    res.render('sign-up');
});

exports.sign_up_post = [
    body('username', 'Username is required')
        .trim()
        .isLength({ min: 1 })
        .escape()
        .custom(async value => {
            const existingUser = await User.findOne({ username: value });
            console.log(value);
            if (existingUser) {
                console.log('USER EXISTS')
                throw new Error('This username is already taken');
            }
        }),
    body('first_name', 'First Name is required')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('last_name', 'Last Name is required')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('password', 'Password is required')
        .trim()
        .isLength({ min: 5 })
        .withMessage('Password must be at least 5 characters')
        .escape(),
    body('confirm_password', 'Password must match')
        .custom((value, { req }) => {
            console.log('Password Mismatch')
            return value === req.body.password;
        })
        .escape(),

    asyncHandler(async(req, res, next) => {
        const errors = validationResult(req);
        console.log(errors);

        bcrypt.hash(req.body.password, 10, async(err, hashedPassword) => {
            if(err) {
                return next(err);
            } else {
                const newUser = new User ({
                    username: req.body.username,
                    password: req.body.password,
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                });

                if(!errors.isEmpty()) {
                    res.render('sign-up', {
                        errors: errors.array(),
                        newUser: newUser
                    });
                    return;
                } else {
                    await newUser.save();
                    res.redirect('/');
                }}
        }
        )
    })
];