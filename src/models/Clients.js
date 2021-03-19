//Import module MongoDB
const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//data on DB

const ClientSchema = new Schema({
    id_user: {
        type: Number,
        required: false
    }, //operation Here seq
    name_user: {
        type: String,
        required: [true, "El nombre es requerido"]
    },
    email_user: {
        type: String,
        required: [true, "El email es requerido"]
    },
    pass_user: {
        type: String,
        required: [true, "La contraseña es requerida"]
    },
    type_user: {
        type: String,
        default: "USER_ROLE"
    },
    state: {
        type: Number,
        default: 1
    }
}, {
    timestamps: true
})

//validate unique
ClientSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });
//Redefine el método toJSON, se copia el objeto, se elimina el campo password y se devuelve el objeto original:
ClientSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.pass_user;
    return userObject;
}

//newUser.pass_user = await newUser.nombremetodo(envió lectura de teclado pass) y de ahi await model.save();
module.exports = model('Clients', ClientSchema)