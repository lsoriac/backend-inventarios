const InputControl = {};
const Input_model = require('../models/Input');




InputControl.getInputs = async(req, res) => {
    try {
        const inputs = await Input_model.find({ /*state: true*/ })
        res.json({
            ok: true,
            message: "Entradas Encontradas",
            inputs
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            message: 'Error al obtener entradas de productos de la Base de datos',
            error
        })
    }
}

InputControl.createInput = async(req, res) => {
    try {
        const { num_purchase_order, purchase_order, total_purchase_order } = req.body
        const id_input = await Input_model.countDocuments({ /* google: true*/ }) + 1

        const newInput = new Input_model({ id_input, num_purchase_order, purchase_order, total_purchase_order })

        //Save on DB
        try {
            await newInput.save()

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
            message: "Ingreso registrado", ///////////status
            input: newInput
        })

        //console.log(req.body);
    } catch (error) {
        res.status(400).json({
            ok: false,
            error
        })
    }
}

module.exports = InputControl