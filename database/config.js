//*ESTAS SON CONFIGURACIONES PARA MONGOOSE
//importacion a un manejador de base de datos en MongoDB
const mongoose = require('mongoose');


const dbConnection = async () => {

    try {

        await mongoose.connect(process.env.DB_CNN);

        console.log('DB Online');
        


    } catch (error) {
        console.error(error.message);
        throw new Error('Error a la hora de inicializar BD')
    }
}

module.exports = {
    dbConnection,
}