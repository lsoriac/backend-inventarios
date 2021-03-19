//Import module MongoDB
const { Schema, model } = require('mongoose');

//data on DB
const OutputSchema = new Schema({
    id_output: {
        type: Number,
        required: false
    },
    num_factura: {
        type: String,
        required: [false, "El número es requerido"]
    },
    factura: {},
    total_factura: {
        type: String,
        required: [false, "El total es requerido"]
    },
    state: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true // fecha de egreso
})

module.exports = model('Output', OutputSchema)