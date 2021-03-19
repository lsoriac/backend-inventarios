//Import module MongoDB
const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//data on DB
let valid_role = {
    values: ['GERENTE_ROLE', 'JEFE_BODEGA_ROLE', 'ENCARGADO_BODEGA_ROLE'],
    message: '{VALUE} no es un rol válido'
};

const UserSchema = new Schema({
        id_user: {
            type: Number,
            required: false
        }, //operation Here seq
        place: {},
        /*{
            type: String,
            required: [true, "El lugar es requerido"]
        }, //cambiar por el código 
        name 
        type
        */
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
            required: [true, "El Rol del usuario es requerido"],
            enum: valid_role
        },
        state: {
            type: Boolean,
            default: true
        }
    }, {
        timestamps: true
    })
    //name, Structure
    //.sort({tag: 1})
    //model.find().limits(number)
    //model.count()
    //model.find().forEach(p=> print("Product Name"+ p.name))
    //agregar un nuevo atributo
    //model.update({"name": "hola"}, {$set: {"nuevo": "holaaaaaa"}})
    //$inc incrementar
    //$rename 

//MONGODB ATLAS
//MLAB
//BOOTSWATCH --- CAMBIA ESTILO BOOTSTRAP(TEMA)
/*
UserSchema.methods.encryptPass = async pass_user => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(pass_user, salt)
}
*/
//validate unique
UserSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });
//Redefine el método toJSON, se copia el objeto, se elimina el campo password y se devuelve el objeto original:
UserSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.pass_user;
    return userObject;
}

//newUser.pass_user = await newUser.nombremetodo(envió lectura de teclado pass) y de ahi await model.save();
module.exports = model('User', UserSchema)