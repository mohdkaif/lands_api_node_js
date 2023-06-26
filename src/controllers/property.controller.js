'use strict';
const Property = require('../models/property.model');
exports.findAll = function (req, res) {
    Property.findAll(function (err, property) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', property);
        res.send(property);
    });
};
exports.create = function (req, res) {
    const new_property = new Property(req.body);
    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        Property.create(new_property, function (err, property) {
            if (err)
                res.send(err);
            res.json({ error: false, message: "property added successfully!", data: property });
        });
    }
};
exports.findById = function (req, res) {
    Property.findById(req.params.id, function (err, property) {
        if (err)
            res.send(err);
        res.json(property);
    });
};
exports.update = function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        Property.update(req.params.id, new Property(req.body), function (err, property) {
            if (err)
                res.send(err);
            res.json({ error: false, message: 'property successfully updated' });
        });
    }
};
exports.delete = function (req, res) {
    Property.delete(req.params.id, function (err, property) {
        if (err)
            res.send(err);
        res.json({ error: false, message: 'property successfully deleted' });
    });
};