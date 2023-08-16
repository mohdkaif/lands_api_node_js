'use strict';
const User = require('../models').User;

const { body, check, validationResult } = require('express-validator');


exports.signUp = function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    if (req.body.email) {
        const exists =  User.findOne({ where: { email: req.body.email } })
        //const exists = User.findByEmail(req.body.email);
        .then(user => {
            console.log(user); // Make sure user contains the expected data
          })
          .catch(error => {
            console.error(error);
          });

          console.log(exists);
        if (exists) {
            return res.status(400).json({ "message": "Email Already Exits." });
        }
    }
    //.status(201).send('success')

    User.create({
        email: req.body.email,
        password: req.body.password,
        name: req.body.fullname,
        phone_number: req.body.phone,
        role_id: 1
    }).then((user) => res.status(201).send(user))
        .catch((error) => {
            res.status(400).send(error);
        });


}
