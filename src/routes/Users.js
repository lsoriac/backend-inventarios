//Import modules
const express = require('express')
const router = express.Router();
const { getUsers, createUser, getAUser, updateUser, deleteUser } = require('../controllers/Users');
const { verificarToken, verificarGerente, verificarJefeBodega, verificarEncargadoBodega, verificaClient } = require('../middlewares/autentication');
router.route('/')
    .get(getUsers) //list Users
    .post([verificarToken, verificarGerente], createUser) //create new User

router.route('/:id')
    .get([verificarToken, verificarGerente], getAUser) //query
    .put([verificarToken, verificarGerente], updateUser) //update by id mongodb
    .delete([verificarToken, verificarGerente], deleteUser) //delete by id mongodb

module.exports = router;