const FacturaControl = {};
const Factura_model = require('../models/Factura');

FacturaControl.getFacturas = async(req, res) => {
    try {
        const facturas = await Factura_model.find({ /*state: false*/ })
        res.json({
            ok: true,
            message: "Facturas Encontradas",
            facturas
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            message: 'Error al obtener facturas de la Base de datos',
            error
        })
    }
}

FacturaControl.createFacturas = async(req, res) => {
    //days to send products on factura
    let waiting_days = 3
    const { sale_product, client } = req.body
    const id_factura = await Factura_model.countDocuments({ /* google: true*/ }) + 1
    let sumaTotales = 0
    let send_date = new Date()
    send_date.setDate(send_date.getDate() + waiting_days);
    let totales = sale_product.map(op => op.total)
    totales.forEach(tot => {
            ////////////////////////////OJOOOOOOOO ESTE PÁRSEINT SOLO ES MOMENTANEO
            sumaTotales += parseFloat(tot)
        })
        //console.log(suma)
    const newFactura = new Factura_model({
        id_factura,
        client,
        total: sumaTotales,
        send_date,
        sale_product
    })

    //const val = await SoldProducts_model.countDocuments({ /* google: true*/ })
    //si no hay productos en el carrito 
    if (sale_product.length == 0) {
        console.log('no elements on factura')
    } else {
        //Save on DB
        await newFactura.save()
            //Response 
        res.json({ status: "Factura o venta Registrado" });
        //console.log(req.body);
    }
}

FacturaControl.getAFactura = async(req, res) => {
    try {
        const factura = await Factura_model.findById(req.params.id)
        res.json({
            ok: true,
            message: 'Orden de compra no encontrada',
            factura
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            message: 'Error al obtener Orden de Compra de la Base de datos',
            error
        })
    }
}

FacturaControl.updateFactura = async(req, res) => {
    try {
        const factura = await Factura_model.findOneAndUpdate({ id_factura: req.params.id }, { state: true }, {
            new: true,
            runValidators: true,
            context: 'query'
        });
        //console.log(req.params.id)
        res.json({
            ok: true,
            message: 'Estado Factura Modificada',
            factura
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            message: 'Error al Modificar el estado de la Factura',
            error
        })
    }
}


module.exports = FacturaControl