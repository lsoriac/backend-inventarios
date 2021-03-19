//Import modules
const express = require('express')
const router = express.Router();
const { createInput, getInputs } = require('../controllers/Input');

router.route('/')
    .get(getInputs)
    .post(createInput)

module.exports = router;