//importando la libreria para trabajar con tokens
const jwt = require("jsonwebtoken");

//generar promesas ya que jwt no trabaja con ellas
const generarJWT = ( uid, name ) => {

    return new Promise( (resolve, reject) => {

        //lo que vamos a enviar dentro del token
        const payload = { uid, name};

        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            //FIRMAR LA DURACION DEL TOKEN
            expiresIn: '2h'
        }, ( err, token ) => {
            //Este callback se va a disparar si no se pudo firmar 

            if ( err) {
                console.log(err);
                reject( 'No se pudo generar el token' );
            }

            resolve( token );

        });



    });

}

module.exports = {
    generarJWT
}

