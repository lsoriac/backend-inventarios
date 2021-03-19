//Import module MongoDB
const { Schema, model } = require('mongoose');
require('../server/config/config')
    //const mongooseUniqueValidator = require('mongoose-unique-validator');

let valid_category = {
    values: ['HOMBRE', 'MUJER'],
    message: '{VALUE} no es una categoría válida'
};

//data on DB
const ProductSchema = new Schema({
    id_product: {
        type: String,
        required: false
    },
    place: {
        type: String,
        required: false
    },
    type_place: {
        type: String,
        required: false
    },
    company_provider: {
        type: String,
        required: false
    }, //name, direction
    category: {
        type: String,
        required: [false, "La categoría es requerida"],
        enum: valid_category
    },
    name_product: {
        type: String,
        required: [false, "El nombre del producto es requerido"]
    },
    description_product: {
        type: String,
        required: [false, "La descripción del producto es requerida"]
    },
    image_product: {
        type: String,
        required: [false, "La imagen del producto es requerida"] /////poner en true wee
    },
    purchase_price: {
        type: Number,
        required: [false, "El precio de compra del producto es requerido"]
    }, //include iva etc :v
    gain: {
        type: Number,
        required: false
    },
    sale_price: {
        type: Number,
        required: false
    },
    cant_product: [],
    state: {
        type: Boolean,
        default: true
    }
})


module.exports = model('Product', ProductSchema)