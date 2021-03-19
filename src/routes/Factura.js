//Import modules
const express = require('express')
const router = express.Router();
const { getFacturas, createFacturas, getAFactura, updateFactura } = require('../controllers/Factura');

router.route('/')
    .get(getFacturas) //list products
    .post(createFacturas) //create new Product

router.route('/:id')
    .get(getAFactura)
    .put(updateFactura)
    /*
    router.route('/:id')
        .get(getAProduct) //query
        .put(updateProduct) //update by id mongodb
        .delete(deleteProduct) //delet by id mongodb
    */
module.exports = router;