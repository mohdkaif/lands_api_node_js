const express = require('express');
const jwt = require('jsonwebtoken');
//const passport = require('passport');
const router = express.Router();
//require('../config/passport')(passport);
const User = require('../models/user');
// const Role = require('../models').Role;
const AuthController = require('../controllers/auth.controller');
const { body, check, validationResult } = require('express-validator');



const validationSignup = [
    body('name').notEmpty().withMessage('Name field is required'),
    check('email', 'Email length should be 10 to 30 characters')
        .isEmail().withMessage('Invalid email format').isLength({ min: 10, max: 30 }),


    check('name', 'Name length should be 10 to 20 characters')
        .isLength({ min: 10, max: 20 }),
    check('phone', 'Mobile number should contains 10 digits')
        .isLength({ min: 10, max: 10 }),
    check('password', 'Password length should be 8 to 10 characters')
        .isLength({ min: 8, max: 10 })
];


router.post('/signup', validationSignup, AuthController.signUp);

router.post('/signin', function (req, res) {
    User
        .findOne({
            where: {
                email: req.body.email
            }
        })
        .then((user) => {
            if (!user) {
                return res.status(401).send({
                    message: 'Authentication failed. User not found.',
                });
            }
            user.comparePassword(req.body.password, (err, isMatch) => {
                if (isMatch && !err) {
                    var token = jwt.sign(JSON.parse(JSON.stringify(user)), 'nodeauthsecret', {
                        expiresIn: 86400 * 30
                    });
                    jwt.verify(token, 'nodeauthsecret', function (err, data) {
                        console.log(err, data);
                    })
                    res.json({
                        success: true,
                        token: 'JWT ' + token
                    });
                } else {
                    res.status(401).send({
                        success: false,
                        msg: 'Authentication failed. Wrong password.'
                    });
                }
            })
        })
        .catch((error) => res.status(400).send(error));
});

module.exports = router;
