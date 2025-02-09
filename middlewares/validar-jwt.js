//Con este middleware se va a validar el token actual del usuario

//importo la response para que me aparezcan ayudas
const { response } = require("express");

//importo libreria de jwt
const jwt = require('jsonwebtoken');

const validarJWT = ( req, res = response, next ) => {

    // x-token headers
    //pedimos los tokens por el header con la key "x-token"

    const token = req.header('x-token');

    //validamos si el usuario tiene token
    //o si esta vencido el mismo
    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }

    try {

        //Verifica que el token este correcto
        const { uid, name } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED,
        );

        //Con le colocamos los datos que tenia el token al usuario
        req.uid = uid;
        req.name = name;

        
    } catch (error) {
        //Si el toque no es valido se expulsa al usuario de la sesion
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido',
        });
    }


    next();
}

module.exports = {
    validarJWT
}