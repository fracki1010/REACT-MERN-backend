const { response } = require("express");
const { validationResult } = require("express-validator");

const validarCampos = (req, res = response, next /*Este es un callback*/) => {

    //manejo de errores
    const errors = validationResult(req);

    //validar los errores
    //SI HAY ERRORES ENTONCES
    if ( !errors.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

    next();
};

module.exports = {
    validarCampos,
}