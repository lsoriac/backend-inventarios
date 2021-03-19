//Import modules
const express = require('express')
const router = express.Router();
const { getClients, createClient, getAClient, updateClients, deleteClient } = require('../controllers/Clients');
//const { verificaToken, verificaAdmin_Role } = require('../middlewares/autentication');
router.route('/')
    .get(getClients) //list Users
    .post(createClient) //create new User

router.route('/:id')
    .get(getAClient) //query
    .put(updateClients) //update by id mongodb
    .delete(deleteClient) //delet by id mongodb

module.exports = router;