const StoreControl = {};
const Store_model = require('../models/Store');
const _ = require('underscore')

StoreControl.getStores = async(req, res) => {
    try {
        const stores = await Store_model.find({ state: true })
        res.json({
            ok: true,
            message: "Locales Encontrados",
            stores
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            message: 'Error al obtener locales de la Base de datos',
            error
        })
    }
}

StoreControl.createStore = async(req, res) => {
    try {
        const { type_store, place_store, direction_store, telf_store, cel_store } = req.body
        const id_store = await Store_model.countDocuments({ /* google: true*/ }) + 1
        const newStore = new Store_model({ id_store, type_store, place_store, code_store, direction_store, telf_store, cel_store })
            //Save on DB
        try {
            await newStore.save()
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
            message: "Local Registrado", ///////////status
            store: newStore
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            error
        })
    }
}

StoreControl.getAStore = async(req, res) => {
    //implementar que solo busque los estados = true??
    try {
        const store = await Store_model.findById(req.params.id)
        res.json({
            ok: true,
            message: 'Local Encontrado',
            store
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            message: 'Error al obtener el local de la Base de datos',
            error
        })
    }
}

StoreControl.updateStore = async(req, res) => {
    let body = _.pick(req.body, ['type_store', 'place_store', 'direction_store', 'telf_store', 'cel_store']);
    try {
        const store = await Store_model.findByIdAndUpdate({ _id: req.params.id }, body, {
            new: true,
            runValidators: true,
            context: 'query'
        });
        res.json({
            ok: true,
            message: 'Local Modificado',
            store
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            message: 'Error al Modificar el local',
            error
        })
    }
}

StoreControl.deleteStore = async(req, res) => {
    let change_state = {
        state: false
    }
    try {
        let store = await Store_model.findByIdAndUpdate(req.params.id, change_state, {
            new: true,
            context: 'query',
            useFindAndModify: false
        })

        //Response 
        res.json({
            ok: true,
            message: "Local Eliminado", ///////////status
            store
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            message: "Local No Encontrado",
            error
        })
    }
}


StoreControl.getAStoreForName = async(req, res) => {
    ///mejor por copdeeeeeeeeee
    try {
        //Other try ???
        //console.log(req.params)
        const store = await Store_model.findOne({ place_store: req.params.name /* .toLowerCase() */ })
        if (store) {
            res.json({
                ok: true,
                message: "Local Encontrado",
                store
            })
        } else {
            res.json({
                ok: false,
                message: "Local No Encontrado"
            })
        }


    } catch (error) {
        res.status(400).json({
            ok: false,
            message: 'Error al obtener el local de la Base de datos',
            error
        })
    }
}

module.exports = StoreControl