//Import module MongoDB
const { Schema, model } = require('mongoose');

//data on DB
const ProviderSchema = new Schema({
    id_provider: {
        type: Number,
        required: false
    },
    name_provider: {
        type: String,
        required: [true, "El nombre es requerido"]
    },
    ruc_provider: {
        type: String,
        required: [true, "El RUC es requerido"]
    },
    direction_provider: {
        type: String,
        required: [true, "La dirección es requerida"]
    },
    telf_provider: {
        type: String,
        required: [true, "El teléfono es requerido"]
    },
    cel_provider: {
        type: String,
        required: [true, "El celular es requerido"]
    },
    state: {
        type: Boolean,
        default: true
    }
})

module.exports = model('Provider', ProviderSchema)