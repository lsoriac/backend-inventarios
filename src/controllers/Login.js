const express = require('express');
const app = express();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const LoginControl = {};
const User_model = require('../models/Users');
const Client_model = require('../models/Clients');


LoginControl.login = async(req, res) => {
    let body = req.body;
    User_model.findOne({ email_user: body.email_user }, (err, usuarioDB) => {
        //Si existe un error en la BDD u otra cosa en el servidor   
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "(Usuario) o contraseña incorrectos"
                }
            });
        }
        //Verificar si las contraseñas coiciden     
        if (!bcrypt.compareSync(body.pass_user, usuarioDB.pass_user)) {

            return res.status(400).json({
                ok: false,
                err: {
                    message: "Usuario o (contraseña) incorrectos"
                }
            });
        }
        let token = jwt.sign({
            usuario: usuarioDB
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN = 60 * 60 });

        //respuesta correcta
        res.json({
            ok: true,
            user: usuarioDB,
            token
        });

    })
}

LoginControl.loginClient = async(req, res) => {
    let body = req.body;
    Client_model.findOne({ email_user: body.email_user }, (err, usuarioDB) => {
        //Si existe un error en la BDD u otra cosa en el servidor   
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "(Usuario) o contraseña incorrectos"
                }
            });
        }
        //Verificar si las contraseñas coiciden     
        if (!bcrypt.compareSync(body.pass_user, usuarioDB.pass_user)) {

            return res.status(400).json({
                ok: false,
                err: {
                    message: "Usuario o (contraseña) incorrectos"
                }
            });
        }
        let token = jwt.sign({
            client: usuarioDB
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN = 60 * 60 });

        //respuesta correcta
        res.json({
            ok: true,
            client: usuarioDB,
            token
        });

    })



}


module.exports = LoginControl