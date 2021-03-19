const ProviderControl = {};
const Provider_model = require('../models/Provider');
const _ = require('underscore')

ProviderControl.getProviders = async(req, res) => {
    try {
        const providers = await Provider_model.find({ state: true })
        res.json({
            ok: true,
            message: "Proveedor Encontrados",
            providers
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            message: 'Error al obtener proveedor de la Base de datos',
            error
        })
    }
}

ProviderControl.createProvider = async(req, res) => {
    try {
        const { name_provider, ruc_provider, direction_provider, telf_provider, cel_provider } = req.body

        const id_provider = await Provider_model.countDocuments({ /* google: true*/ }) + 1
        const newProvider = new Provider_model({ id_provider, name_provider, ruc_provider, direction_provider, telf_provider, cel_provider })
            //Save on DB
        try {
            await newProvider.save()
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
            message: "Proveedor Registrado", ///////////status
            provider: newProvider
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            error
        })
    }
}

ProviderControl.getAProvider = async(req, res) => {
    //implementar que solo busque los estados = true??
    try {
        const provider = await Provider_model.findById(req.params.id)
        res.json({
            ok: true,
            message: 'Proveedor Encontrado',
            provider
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            message: 'Error al obtener el proveedor de la Base de datos',
            error
        })
    }
}

ProviderControl.updateProvider = async(req, res) => {
    let body = _.pick(req.body, ['name_provider', 'ruc_provider', 'direction_provider', 'telf_provider', 'cel_provider']);
    try {
        const provider = await Provider_model.findByIdAndUpdate({ _id: req.params.id }, body, {
            new: true,
            runValidators: true,
            context: 'query'
        });
        res.json({
            ok: true,
            message: 'Proveedor Modificado',
            provider
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            message: 'Error al Modificar el proveedor',
            error
        })
    }
}

ProviderControl.deleteProvider = async(req, res) => {
    let change_state = {
        state: false
    }
    try {
        let provider = await Provider_model.findByIdAndUpdate(req.params.id, change_state, {
            new: true,
            context: 'query',
            useFindAndModify: false
        })

        //Response 
        res.json({
            ok: true,
            message: "Proveedor Eliminado", ///////////status
            provider
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            message: "Proveedor No Encontrado",
            error
        })
    }
}


ProviderControl.getAProviderForName = async(req, res) => {
    try {
        //Other try ???
        const provider = await Provider_model.findOne({ place_store: req.params.name /*.toLowerCase()*/ })
        if (store) {
            res.json({
                ok: true,
                message: "Proveedor Encontrado", ///////////status
                provider
            })
        } else {
            res.json({
                ok: false,
                message: "Proveedor No Encontrado"
            })
        }
    } catch (error) {
        res.status(400).json({
            ok: false,
            message: 'Error al obtener el proveedor de la Base de datos',
            error
        })
    }
}

module.exports = ProviderControl