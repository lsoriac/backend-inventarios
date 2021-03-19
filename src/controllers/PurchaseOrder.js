const PurchaseOrderControl = {};
const PurchaseOrder_model = require('../models/PurchaseOrder');

PurchaseOrderControl.getPurchaseOrder = async(req, res) => {
    try {
        const purchase_orders = await PurchaseOrder_model.find( /*state: false*/ )
        res.json({
            ok: true,
            message: "Órdenes de Compra Encontradas",
            purchase_orders
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            message: 'Error al obtener Órdenes de Compra de la Base de datos',
            error
        })
    }
}

PurchaseOrderControl.createPurchaseOrder = async(req, res) => {
    const { company_provider, destination_place, purchased_product } = req.body
    let waiting_days = 3
    const id_purchase_order = await PurchaseOrder_model.countDocuments({ /* google: true*/ }) + 1
        //const total_purchase=
    let receive_date = new Date()
    receive_date.setDate(receive_date.getDate() + waiting_days);
    let sumaTotales = 0
    let send_date = new Date()
    send_date.setDate(send_date.getDate() + waiting_days);
    console.log(purchased_product);
    let totales = purchased_product.map(op => op.total)
    totales.forEach(tot => {
        ////////////////////////////OJOOOOOOOO ESTE PÁRSEINT SOLO ES MOMENTANEO
        sumaTotales += parseFloat(tot)
    })
    const newPurchaseOrder = new PurchaseOrder_model({
        id_purchase_order,
        company_provider,
        destination_place,
        receive_date,
        purchased_product,
        //id_product,
        //cant_product,
        total: sumaTotales
    })

    //const val = await SoldProducts_model.countDocuments({ /* google: true*/ })
    //Save on DB
    await newPurchaseOrder.save()

    //Response 
    res.json({ status: "Orden de compra Registrada" });
}

PurchaseOrderControl.getAPurchaseOrder = async(req, res) => {
    try {
        const purchase_order = await PurchaseOrder_model.findById(req.params.id)
        res.json({
            ok: true,
            message: 'Orden de compra no encontrada',
            purchase_order
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            message: 'Error al obtener Orden de Compra de la Base de datos',
            error
        })
    }
}

PurchaseOrderControl.updatePurchaseOrder = async(req, res) => {
    try {
        const purchase_order = await PurchaseOrder_model.findOneAndUpdate({ id_purchase_order: req.params.id }, { state: true }, {
            new: true,
            runValidators: true,
            context: 'query'
        });
        //console.log(req.params.id)
        res.json({
            ok: true,
            message: 'Estado Orden de Compra Modificada',
            purchase_order
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            message: 'Error al Modificar el estado de la Orden de Compra',
            error
        })
    }
}


module.exports = PurchaseOrderControl