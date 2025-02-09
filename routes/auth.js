/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/


//Exportacion del router
const express = require('express');
const router = express.Router();

//importacion del validador
const { check } = require('express-validator')


//Necesito importar algo para las rutas
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');

//validador de campos por middleware
const { validarCampos } = require('../middlewares/validar-campos');

//importar revalidador de tokes
const { validarJWT } = require('../middlewares/validar-jwt');


router.post(
    '/new',
    [ //middlewares
        check('name', 'El nombre no puede estar vacio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña debe de ser de 6 caracteres ').isLength({min: 6}),
        validarCampos
    ],
    crearUsuario
);


router.post(
    '/',
    [ //middlewares
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña debe tener mas de 6 letras').isLength({min: 6}),
        validarCampos,
    ],
     loginUsuario
    );


router.get('/renew', validarJWT, revalidarToken);



module.exports = router;