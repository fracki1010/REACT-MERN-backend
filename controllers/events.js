const { response } = require("express");
//El modelo para crear eventos
const Evento = require("../models/Evento");






//obtener el evento
const getEvents = async (req, res = response) => {



    const eventos = await Evento
        .find()//El find es para traer todos los eventos
        .populate('user', 'name'); //El populate es para extraer referencias que tenga mi obj
    //si quisiera el password seria
    // .populate('user', 'name password')


    res.status(200).json({
        ok: true,
        // msg: 'obtener evento',
        eventos
    })

}


const crearEvento = async (req, res = response) => {

    //Creacion del evento
    const evento = new Evento(req.body);

    try {
        //Obteniendo el id del usuario
        //El user del evento tiene que ser el id
        //osea que los 2 tienen el mismo uid del usuario actual
        evento.user = req.uid;


        //Guardamos el evento
        const eventoGuardado = await evento.save();

        res.status(201).json({
            ok: true,
            msg: 'crear evento',
            evento: eventoGuardado
        })

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}



const actualizarEvento = async (req, res = response) => {

    //Traer el id enviado por parametros a una variable
    const eventoId = req.params.id;

    //extraemos el usuario que creo el evento
    const uid = req.uid //Se puede extraer el uid si la peticion la hace el usuario

    try {

        //Buscar evento en base de datos
        const evento = await Evento.findById(eventoId);

        //verificar si el evento existe
        if (!evento) {
            res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            })
        }

        //Verifica que sea la persona quien quiera actualizar el
        //evento, sino no puede hacerlo otro user
        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            })
        }

        //Le asigna todos los datos al nuevo evento, tambien el user
        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        //busca el evento, lo actualiza y lo guarda
        const eventoActualizado = await Evento.findByIdAndUpdate(
            eventoId, //enviar el id del evento
            nuevoEvento, // enviar el evento en si
            { new: true } //decirle que regrese el evento actualizado y no el anterior
        );



        res.status(201).json({
            ok: true,
            // msg: 'actualizar evento',
            evento: eventoActualizado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador',
        })

    }


}



const eliminarEvento = async (req, res = response) => {

    //Trae el evento por los params id
    const eventoId = req.params.id;

    //Extraemos el usuario que creo el evento
    const uid = req.uid;

    try {

        //Traemos el evento
        const evento = await Evento.findById(eventoId);

        //Verifica si el evento existe
        if (!evento) {
            return res.status(401).json({
                ok: false,
                msg: 'El evento no existe por este id'
            })
        }


        //Verifica que sea la persona quien quiera eliminar el
        //evento, sino no puede hacerlo otro user
        if ( evento.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios para eliminar el evento'
            })
        }


        //busca el evento y lo borra
        await Evento.findByIdAndDelete(eventoId);





        res.status(201).json({
            ok: true,
        })

    } catch (error) {
        console.log(error);
        res.status(201).json({
            ok: false,
            msg: 'comunicarse con el administrador',
        })

    }

}






module.exports = {
    getEvents,
    crearEvento,
    actualizarEvento,
    eliminarEvento,
}