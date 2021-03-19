const jwt = require('jsonwebtoken');

//======================
//====Verificar Token===
//======================
let verificarToken = (req, res, next) => {
    let token = req.get('token');
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            });
        }
        req.usuario = decoded.usuario;
        next();
    });


};

//======================
//====Verificar Role====
//======================
let verificarGerente = (req, res, next) => {
    let usuario = req.usuario;
    if (usuario.type_user === 'GERENTE_ROLE') {
        next();
    } else {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'El usuario no es GERENTE_ROLE'
            }
        });
    }
};

let verificarJefeBodega = (req, res, next) => {
    let usuario = req.usuario;
    if (usuario.type_user === 'JEFE_BODEGA_ROLE') {
        next();
    } else {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'El usuario no es JEFE_DE_BODEGA'
            }
        });
    }
};

let verificarEncargadoBodega = (req, res, next) => {
    let usuario = req.usuario;
    if (usuario.type_user === 'ENCARGADO_BODEGA_ROLE') {
        next();
    } else {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'El usuario no es ENCARGADO_BODEGA_ROLE'
            }
        });
    }
};

let verificaClient = (req, res, next) => {
    let usuario = req.usuario;
    if (usuario.type_user === 'USER_ROLE') {
        next();
    } else {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'El usuario no es un USER_ROLE registrado'
            }
        });
    }
};


module.exports = {
    verificarToken,
    verificarGerente,
    verificarJefeBodega,
    verificarEncargadoBodega,
    verificaClient
};