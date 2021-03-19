const { Schema, model } = require('mongoose');

//data on DB
const StoreSchema = new Schema({
    id_store: {
        type: Number,
        required: false
    },
    type_store: {
        type: String,
        required: [true, "El tipo es requerido"]
    },
    place_store: {
        type: String,
        required: [true, "El nombre es requerido"]
    },
    direction_store: {
        type: String,
        required: [true, "La dirección es requerida"]
    },
    telf_store: {
        type: String,
        required: [true, "El teléfono es requerido"]
    },
    cel_store: {
        type: String,
        required: [true, "El celular es requerido"]
    },
    state: {
        type: Boolean,
        default: true
    }
})

module.exports = model('Store', StoreSchema)