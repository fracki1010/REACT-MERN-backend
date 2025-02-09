//Este es un doc para guardar en base de datos

//importando el schema y el model
const { Schema, model} = require("mongoose");




const EventoSchema = Schema({

   title: {
    type: String,
    required: true,
   },
   notes: {
    type: String
   },
   start: {
    type: Date,
    required: true,
   },
   end: {
    type: Date,
    required: true,
   },
   user: {
    //Esto le dice que es una referencia a usuario
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
   }

});


//Estas configuraciones son para cambiar el nombre (_id) a otro (id)
// y quitar que venga la informacion del version (__v)
EventoSchema.method('toJSON', function() {
   //Con esto extraemos los datos del objeto EventoSchema
   const { __v, _id, ...object } = this.toObject();
   //ahora modimicamos lo que nos interesa y devolvemos el objeto
   object.id = _id;
   return object;

});


//Esto crea el modelo
module.exports = model('Evento', EventoSchema);