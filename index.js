// importa express
const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();

//importa cors para manejar rutas
const cors = require('cors');


console.log(process.env);


//*Crear el servidor de express
const app = express();


//*Base de datos
dbConnection();

//* CORS
app.use(cors());


//*Directorio publico
app.use( express.static('public') );
//el use() es una funcion que se ejecuta en el momento que alguien hace una peticion a mi 
//servidor


//*Lectura y parceo del body
app.use( express.json() );



//*Rutas
//tod lo que este archivo vaya a exportar lo va a habilitar en esta ruta (/api/auth)
app.use('/api/auth', require('./routes/auth'));
//rutas de eventos
app.use('/api/events', require('./routes/events'))






//*Escuchar peticiones el puerto donde se va a escuchar
app.listen( process.env.PORT, () => {
    console.log(`Servidor Corriendo en el puerto ${process.env.PORT}`);
    
});







