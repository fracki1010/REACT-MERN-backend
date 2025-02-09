//Esto es para recuperar el intelliges para autocompletados
const { response } = require('express');

//importando nuestro modelo
const Usuario = require('../models/Usuario');

//importacion del encriptador
const bcryptjs = require('bcryptjs');

//Generador de tokens ya configurado
const { generarJWT } = require('../helpers/jwt');






const crearUsuario = async (req, res = response) => {

    const { email, password } = req.body;
    
    
    try {
        //hacer busquedas en la base de datos
        //para validar si el usuario se repite
        let usuario = await Usuario.findOne({ email });
        
        //validacion personalizada
        if ( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe con ese correo',
            })
        }
        
        //TODO REFERIDO AL USUARIO-------------
        
        //Creando el modelo usuario
        usuario = new Usuario(req.body);

        //Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password, salt);

        //Guardandolo en la base de datos
        await usuario.save();

        //Generar JWT (Json Web Token)
        const token = await generarJWT( usuario.id, usuario.name );

        //---------------------------

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador',
        })

    }

}


const loginUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        
        //hacer busquedas en la base de datos
        //para validar si el usuario se repite
        const usuario = await Usuario.findOne({ email });
        
        //validacion personalizada
        if ( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email',
            })
        }


        //Confirmar las contraseñas
        const validPassword = bcryptjs.compareSync( password, usuario.password );

        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto',
            })
        }


        //Generar nuestro JWT (Json Web Token)
        const token = await generarJWT( usuario.id, usuario.name );

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })



    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador',
        })
    }

}


const revalidarToken = async (req, res = response) => {

    const uid = req.uid;
    const name = req.name;

    //Generando nuevo token para la peticion
    const token = await generarJWT( uid, name );

    res.json({
        ok: true,
        token,
    })
}



module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}