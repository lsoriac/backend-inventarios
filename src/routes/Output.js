//Import modules
const express = require('express')
const router = express.Router();
const { createOutput, getOutputs } = require('../controllers/Output');

router.route('/')
    .get(getOutputs)
    .post(createOutput)

module.exports = router;