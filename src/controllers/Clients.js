const ClientControl = {};
const Client_model = require('../models/Clients');
const bcrypt = require('bcryptjs')
const _ = require('underscore')

ClientControl.getClients = async(req, res) => {
    try {
        const clients = await Client_model.find({ state: true })
        res.json({
            ok: true,
            message: "Clientes Encontrados",
            clients
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            message: 'Error al obtener clientes de la Base de datos',
            error
        })
    }
}

ClientControl.createClient = async(req, res) => {
    try {
        const { name_user, email_user, pass_user } = req.body

        // id incremental de momento (implementar secuencia + optimo )
        const id_user = await Client_model.countDocuments({ /* google: true*/ }) + 1

        //encrypt
        let password = bcrypt.hashSync(pass_user, 10)

        const newClient = new Client_model({ id_user, name_user, email_user, pass_user: password })

        //Save on DB
        try {
            await newClient.save()

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
            client: newClient
        })

        //console.log(req.body);
    } catch (error) {
        res.status(400).json({
            ok: false,
            error
        })
    }
}

ClientControl.getAClient = async(req, res) => {
    try {
        const client = await Client_model.findById(req.params.id)
        res.json({
            ok: true,
            message: 'Cliente Encontrado',
            client
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            message: 'Error al obtener el clientes de la Base de datos',
            error
        })
    }
}

ClientControl.updateClients = async(req, res) => {
    //query 
    //let password = bcrypt.hashSync(pass_user, 10) no vuelveeeeeeeeee a encritar ... esta es la opcion :V
    let body = _.pick(req.body, ['name_user', 'email_user', 'pass_user', 'state']);
    try {
        //const { name_user, email_user, pass_user } = req.body
        const client = await Client_model.findByIdAndUpdate({ _id: req.params.id }, body, {
            new: true,
            runValidators: true,
            context: 'query'
        });
        //console.log(req.params.id)
        res.json({
            ok: true,
            message: 'Cliente Modificado',
            client
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            message: 'Error al Modificar el cliente',
            error
        })
    }
}

ClientControl.deleteClient = async(req, res) => {
    let change_state = {
        state: false
    }
    try {
        let client = await Client_model.findByIdAndUpdate(req.params.id, change_state, {
            new: true,
            context: 'query',
            useFindAndModify: false
        })

        //Response 
        res.json({
            ok: true,
            message: "Cliente Eliminado", ///////////status
            client
        })
    } catch (cliente) {
        res.status(400).json({
            ok: false,
            message: "Cliente No Encontrado",
            error
        })
    }
}



module.exports = ClientControl