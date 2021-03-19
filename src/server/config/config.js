   //=======================
   //========PUERTO=========
   //=======================
   //configuramos el puerto
   process.env.PORT = process.env.PORT || 4000

   //=======================
   //========ENTORNO========
   //=======================

   process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

   //===============================
   //============USUARIO============
   //===============================
   process.env.USER_DB = process.env.USER_DB
   process.env.PASS_DB = process.env.PASS_DB

   //=======================
   //=====BASE DE DATOS=====
   //=======================

   let MONGODB_URI = ""
   if (process.env.NODE_ENV === 'dev') {
       MONGODB_URI = 'mongodb://localhost/proyecto-bodega'
   } else {
       MONGODB_URI = `mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@inventariosdb.zoifl.mongodb.net/inventariosDB`
   }
   process.env.MONGODB_URI = MONGODB_URI

   //===============================
   //=====SEED DE AUTENTICACIÓN=====
   //===============================

   process.env.SEED = process.env.SEED || 'seed-desarrollo'
   process.env.HOST = process.env.HOST || "http://localhost"

   process.env.CADUCIDAD_TOKEN = 60 * 60