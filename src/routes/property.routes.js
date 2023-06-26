const express = require('express')
const router = express.Router()
const propertyController = require('../controllers/property.controller');
// Retrieve all propertys
router.get('/', propertyController.findAll);
// Create a new property
router.post('/', propertyController.create);
// Retrieve a single property with id
router.get('/:id', propertyController.findById);
// Update a property with id
router.put('/:id', propertyController.update);
// Delete a property with id
router.delete('/:id', propertyController.delete);
module.exports = router