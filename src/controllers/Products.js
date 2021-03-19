const ProductControl = {};
const Product_model = require('../models/Products');
const Store_model = require('../models/Store');
const _ = require('underscore')
const fs = require('fs');
ProductControl.getProducts = async(req, res) => {
    try {
        const products = await Product_model.find({ state: true })
        res.json({
            ok: true,
            message: "Productos Encontrados",
            products
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            message: 'Error al obtener productos de la Base de datos',
            error
        })
    }
}

ProductControl.getProductsAll = async(req, res) => {
    try {
        const products = await Product_model.find( /*{ state: true }*/ )
        res.json({
            ok: true,
            message: "Productos Encontrados",
            products
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            message: 'Error al obtener productos de la Base de datos',
            error
        })
    }
}

ProductControl.getProductsForCategory = async(req, res) => {
    const category = req.params.name.toUpperCase()
    try {
        const products = await Product_model.find({ state: true, category })
        res.json({
                ok: true,
                message: "Productos Encontrados",
                products
            })
            //COntrolar el caso contrario, si no encuentra ??? sirve pero debo hacerlo 

    } catch (error) {
        res.status(400).json({
            ok: false,
            message: 'Error al obtener productos de la Base de datos',
            error
        })
    }
}


ProductControl.createProduct = async(req, res) => {

    const { id_product, place, type_place, company_provider, category, name_product, description_product, purchase_price, gain } = req.body
    let cant_product = []
    const stores = await Store_model.find( /*{ state: true }*/ )
    let plac = stores.map(pla => [{ name: pla.place_store, type: pla.type_store, id_store: pla.id_store }])
    let unicos = Array.from(new Set(plac))
    for (let i = 0; i < unicos.length; i++) {
        cant_product.push({
            place: unicos[i][0].name,
            cant: 0
        })
    }
    const sale_price = purchase_price / (1 - (gain / 100))
    let id = await Product_model.countDocuments({}) + 1
    let newProduct = 0
    const file = req.file.buffer.toString('base64')
    if (id_product) {
        newProduct = Product_model({
            id_product,
            place,
            type_place,
            company_provider,
            category,
            name_product,
            description_product,
            image_product: file,
            purchase_price,
            gain,
            cant_product,
            sale_price: parseFloat(sale_price).toFixed(2)
        })
    } else {
        newProduct = Product_model({
            id_product: id,
            place,
            type_place,
            company_provider,
            category,
            name_product,
            description_product,
            image_product: file,
            purchase_price,
            gain,
            cant_product,
            sale_price: parseFloat(sale_price).toFixed(2)
        })
    }



    await newProduct.save()

    res.json({
        ok: true,
        message: "Producto Registrado", ///////////status
        product: newProduct
    })
}


ProductControl.getAProduct = async(req, res) => {
    try {
        const product = await Product_model.findById(req.params.id)
        res.json({
            ok: true,
            message: "Producto Encontrado",
            product
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            message: 'Error al obtener el usuario de la Base de datos',
            error
        })
    }
}

ProductControl.getAProductForName = async(req, res) => {
    try {
        const product = await Product_model.findOne({ name_product: req.params.name.toLowerCase() })
        if (product) {
            res.json({
                ok: true,
                message: "Producto Encontrado",
                product
            })
        } else {
            res.json({
                ok: false,
                message: "Producto No Encontrado",
            })
        }

    } catch (error) {
        res.status(400).json({
            ok: false,
            message: 'Error al obtener el usuario de la Base de datos',
            error
        })
    }
}

ProductControl.updateProduct = async(req, res) => {
    //can edit these parameters
    /*
    let body = _.pick(req.body, ['place', 'company_provider', 'category', 'name_product', 'description_product', 'image_product', 'purchase_price', 'gain', 'state']);
    try {
        const product = await Product_model.findByIdAndUpdate({ _id: req.params.id }, body, {
            new: true,
            runValidators: true,
            context: 'query'
        });
        res.json({
            ok: true,
            message: 'Producto Modificado',
            product
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            message: 'Error al Modificar el producto',
            error
        })
    }*/
    //can edit these parameters
    //  let body = _.pick(req.body, ['place', 'category', 'name_product', 'description_product', 'image_product', 'purchase_price', 'gain', 'state']);

    const { place, type_place, company_provider, category, name_product, description_product, purchase_price, gain } = req.body
    console.log(req.body);
    //const sale_price = purchase_price / (1 - (gain / 100)) //parse float ?
    let img = ''
    if (req.file) {
        const { filename } = req.file
        img = `${ process.env.HOST}:${process.env.PORT}/public/${filename}`
    }
    const newProduct = {
        place,
        type_place,
        company_provider,
        category,
        name_product,
        description_product,
        purchase_price,
        image_product: img,
        gain,
        // sale_price
    }

    //try {
    const product = await Product_model.findByIdAndUpdate({ _id: req.params.id }, newProduct, {
        new: true,
        runValidators: true,
        context: 'query'
    });
    res.json({
            ok: true,
            message: 'Producto Modificado',
            product
        })
        /*} catch (error) {
            res.status(400).json({
                ok: false,
                message: 'Error al Modificar el producto',
                error
            })
        }*/
}

ProductControl.deleteProduct = async(req, res) => {
    let change_state = {
        state: false
    }
    try {
        let product = await Product_model.findByIdAndUpdate(req.params.id, change_state, {
            new: true,
            context: 'query',
            useFindAndModify: false
        })

        //Response 
        res.json({
            ok: true,
            message: "Producto Eliminado", ///////////status
            product
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            message: "Producto No Encontrado",
            error
        })
    }
}

ProductControl.updateStockProduct = async(req, res) => {
    const arr = req.body
    console.log("awdawd", arr);
    const prod = await Product_model.findOne({ id_product: req.params.id })
    console.log("holaaa", prod.cant_product[0]);
    ///ya tengo mi pinche objeto ahora debo hacer una busqueda de la cantidad actual y sumarlo a arr.cant
    //if arr.place
    let cant_product = []
    const stores = await Store_model.find( /*{ state: true }*/ )
    let plac = stores.map(pla => [{ name: pla.place_store, type: pla.type_store, id_store: pla.id_store }])
        //delete duplicates once a place
    let unicos = Array.from(new Set(plac))
        //init cantproduct with 0 on all stores
    for (let i = 0; i < prod.cant_product.length; i++) {
        if (prod.cant_product[i].place === arr.place) {
            cant_product.push({
                place: unicos[i][0].name,
                cant: (parseInt(arr.cant) + parseInt(prod.cant_product[i].cant))
            })
        } else {
            cant_product.push({
                place: unicos[i][0].name,
                cant: (parseInt(prod.cant_product[i].cant))
            })
        }
    }
    console.log("llllllll", cant_product);
    try {

        const product = await Product_model.findOneAndUpdate({ id_product: req.params.id }, { cant_product }, {
            new: true,
            runValidators: true,
            context: 'query'
        });
        //console.log(req.params.id)
        res.json({
            ok: true,
            message: 'Stock Producto Actualizado',
            product
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            message: 'Error al actualizar stock',
            error
        })
    }
}

module.exports = ProductControl