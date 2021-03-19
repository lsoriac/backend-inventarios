//Import modules
const express = require('express')
const router = express.Router();
const { getStores, createStore, getAStore, updateStore, deleteStore, getAStoreForName } = require('../controllers/Store');

router.route('/')
    .get(getStores) //list Users
    .post(createStore) //create new User

router.route('/:id')
    .get(getAStore) //query
    .put(updateStore) //update by id mongodb
    .delete(deleteStore) //delet by id mongodb

router.route('/find/:name')
    .get(getAStoreForName)

module.exports = router;