const UserControl = {};
const User_model = require('../models/Users');
const bcrypt = require('bcryptjs')
const _ = require('underscore')

UserControl.getUsers = async(req, res) => {
    try {
        const users = await User_model.find({ state: true })
        res.json({
            ok: true,
            message: "Usuarios Encontrados",
            users
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            message: 'Error al obtener usuarios de la Base de datos',
            error
        })
    }
}

UserControl.createUser = async(req, res) => {
    try {
        const { place, name_user, email_user, pass_user, type_user } = req.body

        // id incremental de momento (implementar secuencia + optimo )
        const id_user = await User_model.countDocuments({ /* google: true*/ }) + 1

        //encrypt
        let password = bcrypt.hashSync(pass_user, 10)

        const newUser = new User_model({ id_user, place, name_user, email_user, pass_user: password, type_user })

        //Save on DB
        try {
            await newUser.save()

        } catch (error) {
            return res.status(400).json({
                ok: false,
                message: 'Error con la Base de Datos',
                error
            })
        }

        //Response 
        res.json({
            ok: true,
            message: "Usuario Registrado", ///////////status
            user: newUser
        })

        //console.log(req.body);
    } catch (error) {
        res.status(400).json({
            ok: false,
            error
        })
    }
}

UserControl.getAUser = async(req, res) => {
    try {
        const user = await User_model.findById(req.params.id)
        res.json({
            ok: true,
            message: 'Usuario Encontrado',
            user
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            message: 'Error al obtener el usuario de la Base de datos',
            error
        })
    }
}

UserControl.updateUser = async(req, res) => {
    //query 
    //let password = bcrypt.hashSync(pass_user, 10) no vuelveeeeeeeeee a encritar ... esta es la opcion :V
    let body = _.pick(req.body, ['place', 'name_user', 'email_user', 'pass_user', 'type_user', 'state']);
    try {
        //const { name_user, email_user, pass_user, type_user } = req.body
        const user = await User_model.findByIdAndUpdate({ _id: req.params.id }, body, {
            new: true,
            runValidators: true,
            context: 'query'
        });
        //console.log(req.params.id)
        res.json({
            ok: true,
            message: 'Usuario Modificado',
            user
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            message: 'Error al Modificar el usuario',
            error
        })
    }
}

UserControl.deleteUser = async(req, res) => {
    let change_state = {
        state: false
    }
    try {
        let user = await User_model.findByIdAndUpdate(req.params.id, change_state, {
            new: true,
            context: 'query',
            useFindAndModify: false
        })

        //Response 
        res.json({
            ok: true,
            message: "Usuario Eliminado", ///////////status
            user
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            message: "Usuario No Encontrado",
            error
        })
    }
}



module.exports = UserControl