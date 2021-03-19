//Import modules
const express = require('express')
const router = express.Router();
const { login, loginClient } = require('../controllers/Login');

router.route('/')
    .post(login) //Login

router.route('/user')
    .post(loginClient) //Login Client


module.exports = router;