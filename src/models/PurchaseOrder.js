//Import module MongoDB
const { Schema, model } = require('mongoose');

//data on DB
const PurchaseOrderSchema = new Schema({
        id_purchase_order: { type: String, required: false },

        company_provider: { type: String, required: true },
        destination_place: { type: String, required: true },
        total: { type: Number, required: false },

        purchased_product: [],
        //id_product: { type: String, required: true },
        //cant_product: { type: Number, required: true },

        state: { type: Boolean, default: false },

        receive_date: {
            type: Date,
            required: false
        }


        //delivery_date: { type: Date, required: false }
    }, {
        timestamps: true
    })
    //name, Structure
module.exports = model('Orden_Compra', PurchaseOrderSchema)