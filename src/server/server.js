//import var
require('./config/config')
const mongoose = require('mongoose');
const express = require('express')
const morgan = require('morgan')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
    //const session = require('express-session');

//comunicate between  backend and frontend servers

//conexión con Mongo db
mongoose.connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, res) => {
    if (err) throw err
    console.log("Base de datos Online")
})

// parse application/json
app.use(bodyParser.json())

//settings
//app.set('port', process.env.PORT || 4000)

//Midlewares
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
    //server can understand json format
    //app.use(express.json());
app.use(bodyParser.json())
    //app.use(express.bodyParser());


//login
app.use('/login', require('../routes/Login'))

//#Users
app.use('/users', require('../routes/Users'))

//#Products
app.use('/products', require('../routes/Products'))

//#Stores
app.use('/store', require('../routes/Store'))

//#Facturas
app.use('/facturas', require('../routes/Factura'))
    //##Output
app.use('/output', require('../routes/Output'))

//##Providers
app.use('/provider', require('../routes/Provider'))

//#Purchase Order (orden de Compra)
app.use('/purchase-order', require('../routes/PurchaseOrder'))

//##Input
app.use('/input', require('../routes/Input'))

//##Clients
app.use('/client', require('../routes/Clients'))

//Static Files
//app.use(express.static(path.join(__dirname, 'public')))
//app.use('/public', express.static(`${__dirname}/public/img/uploads`))

//Starting server
app.listen(process.env.PORT, () => {
    console.log("Escuchando el puerto", process.env.PORT);
})