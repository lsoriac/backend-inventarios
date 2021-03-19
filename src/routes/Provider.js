//Import modules
const express = require('express')
const router = express.Router();
const { getProviders, createProvider, getAProvider, updateProvider, deleteProvider, getAProviderForName } = require('../controllers/Provider');

router.route('/')
    .get(getProviders) //list Users
    .post(createProvider) //create new User

router.route('/:id')
    .get(getAProvider) //query
    .put(updateProvider) //update by id mongodb
    .delete(deleteProvider) //delet by id mongodb

router.route('/find/:name')
    .get(getAProviderForName)

module.exports = router;