//Import module MongoDB
const { Schema, model } = require('mongoose');

//data on DB
const InputSchema = new Schema({
    id_input: {
        type: Number,
        required: false
    },
    num_purchase_order: {
        type: String,
        required: [false, "El número es requerido"]
    },
    purchase_order: {},
    total_purchase_order: {
        type: String,
        required: [false, "El total es requerido"]
    },
    state: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true //fecha de ingreso
})

module.exports = model('Input', InputSchema)