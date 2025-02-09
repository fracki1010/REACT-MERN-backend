//Este es para validar los datos Date
//osea que es para validar fechas con los (check)
//!Revisar el check que tiene el custom

//Este se importa para tranformar fechas y poder validarlas
const moment = require("moment");






const isDate = ( value ) => {

   if ( !value ) {
    //Esto pregunta si el value existe, y si no 
    //es false, y el custom donde se llama entiende
    //Que no es valido
    return false;
   }

   const fecha = moment( value );

   if ( fecha.isValid() ) { //Si la fecha es valida
    return true;
   } else {
    return false;
   }


}

module.exports = { isDate }