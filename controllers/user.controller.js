'use strict';
const Helper = require('../utils/helper');
const helper = new Helper();
const Role = require('../models').Role;
const User = require('../models').User;

/// Create New User

exports.CreateUser = function (req, res) {
    helper.checkPermission(1, 'user_add').then((rolePerm) => {
        console.log(req.body);
        if (!req.body.role_id || !req.body.email || !req.body.password || !req.body.name || !req.body.phone) {
            res.status(400).send({
                msg: 'Please pass Role ID, email, password, phone or fullname.'
            })
        } else {
            console.log('sadada');
            User.create({
                email: req.body.email,
                password: req.body.password,
                name: req.body.name,
                phone_number: req.body.phone,
                role: req.body.role,
                role_id: req.body.role_id
            })
                .then((user) => res.status(201).send(user))
                .catch((error) => {
                    console.log(error);
                    console.error("An error occurred1:", error);
                    res.status(400).send(error);
                });
        }
    }).catch((error) => {
        console.error("An error occurred2:", error);
        res.status(403).send(error);
    });
}
