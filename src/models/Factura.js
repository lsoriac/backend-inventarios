//Import module MongoDB
const { Schema, model } = require('mongoose');

//data on DB
const FacturaSchema = new Schema({
        id_factura: { type: String, required: true },

        client: {},
        total: { type: Number, required: true },
        sale_product: [],

        state: {
            type: Boolean,
            default: false
        },
        //to send client: {
        send_date: {
            type: Date,
            required: false
        }

    }, {
        timestamps: true
    })
    //name, Structure
module.exports = model('Factura', FacturaSchema)