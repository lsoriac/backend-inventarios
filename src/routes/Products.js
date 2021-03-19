//Import modules
const express = require('express')
const router = express.Router();
const multer = require('multer')
const upload = multer({});

const { getProducts, createProduct, getAProduct, updateProduct, deleteProduct, getAProductForName, getProductsForCategory, getProductsAll, updateStockProduct } = require('../controllers/Products');

router.route('/')
    .get(getProducts) //list products
    .post(upload.single('image_product'), createProduct) //create new Product

router.route('/:id')
    .get(getAProduct) //query
    .put(updateProduct) //update by id mongodb
    .delete(deleteProduct) //delet by id mongodb

router.route('/stock/:id')
    .put(updateStockProduct) //update by id mongodb

router.route('/find/:name')
    .get(getAProductForName)


router.route('/find/category/:name')
    .get(getProductsForCategory)

router.route('/all')
    .get(getProductsAll) //list products

module.exports = router;