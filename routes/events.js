/*
    Event Routes
    /api/events
*/


//Importacion del router
const express = require('express');
const router = express.Router();

//Importacion del validador de JWT
const { validarJWT } = require('../middlewares/validar-jwt');

//importacion de validador de campos
const { validarCampos } = require('../middlewares/validar-campos');

//exporta las funciones que hacen de controladores
const { getEvents, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { check } = require('express-validator');

//importamos el validador de fechasS
const { isDate } = require('../helpers/isDate');



//Todas tienen que pasar po la validacion del JWT
//Esto le dice a todas las rutas que tienen que ser validades antes de enviarse
router.use( validarJWT );
//TODAS LAS PETICIONES PASAN POR ACA ANTES




//Obtener evento
router.get('/', getEvents);


//Crear un nuevo evento
router.post(
    '/',
    [
        check('title', 'EL titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom( isDate ),
        check('end','Fecha de finalizacion es obligatoria').custom( isDate ),
        //Este validar se llama para poder detener los errores del check
        validarCampos
    ],
     crearEvento
    );



//Actualizar evento
router.put('/:id', actualizarEvento);




//Borrar evento
router.delete('/:id', eliminarEvento);

module.exports = router;