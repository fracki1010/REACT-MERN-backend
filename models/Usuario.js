//Este es un doc para guardar en base de datos

//importando el schema y el model
const { Schema, model} = require("mongoose");




const UsuarioSchema = Schema({

    name: {
        type: String,
        //Se queriere si o si
        required: true,
    },
    email: {
        type: String,
        required: true,
        //No pueden haber emails repetidos
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }

});

//Esto crea el modelo
module.exports = model('Usuario', UsuarioSchema);