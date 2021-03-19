//Import modules
const express = require('express')
const router = express.Router();
const { getPurchaseOrder, createPurchaseOrder, getAPurchaseOrder, updatePurchaseOrder } = require('../controllers/PurchaseOrder');

router.route('/')
    .get(getPurchaseOrder) //list products
    .post(createPurchaseOrder) //create new Product

router.route('/:id')
    .get(getAPurchaseOrder) //query
    .put(updatePurchaseOrder)
    /*
    router.route('/:id')
        .get(getAProduct) //query
        .put(updateProduct) //update by id mongodb
        .delete(deleteProduct) //delet by id mongodb
    */
module.exports = router;