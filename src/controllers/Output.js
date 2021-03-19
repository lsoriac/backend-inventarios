const OutputControl = {};
const Output_model = require('../models/Output');



OutputControl.getOutputs = async(req, res) => {
    try {
        const outputs = await Output_model.find({ /*state: true*/ })
        res.json({
            ok: true,
            message: "Salidas Encontradas",
            outputs
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            message: 'Error al obtener salidas de productos de la Base de datos',
            error
        })
    }
}

OutputControl.createOutput = async(req, res) => {
    try {
        const { num_factura, factura, total_factura } = req.body
        const id_output = await Output_model.countDocuments({ /* google: true*/ }) + 1
        let state = true
        const newOutput = new Output_model({ id_output, num_factura, factura, total_factura, state })

        //Save on DB
        try {
            await newOutput.save()

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
            message: "Egreso registrado", ///////////status
            output: newOutput
        })

        //console.log(req.body);
    } catch (error) {
        res.status(400).json({
            ok: false,
            error
        })
    }
}



module.exports = OutputControl