const view = require('../view/mongoView');
const ObjectID = require('mongodb').ObjectID;

module.exports = (app) => {
    //Peticion que inserta el usuario
    app.post('/mongo/user', (request, respond) => {
        let object = request.body;
        if(object.nombre && object.direccion && object.telefono){
        view.setUser({nombre: object.nombre, direccion: object.direccion, telefono: object.telefono},request, respond);

        }else{
            respond.status(400).send({'mensaje': 'Coloque los elementos necesarios'});
        }
    });

    //Peticion que muestra los usuarios en Mongo
    app.get('/mongo/user', (request, respond) => {
        view.getUsers(request, respond);
    });

    //Peticion que actualiza un usuario en Mongo
    app.put('/mongo/user', (request, respond) =>
    {
        let object = request.body;

        if(object.id && object.nombre && object.direccion && object.telefono)
        {
            let user = {_id: ObjectID(object.id)};
            let values = {nombre: object.nombre, direccion: object.direccion, telefono: object.telefono};

            view.updateUser(user, values, request, respond);
        }
        else
        respond.status(400).send({'mensaje': 'Coloque los elementos necesarios'});
    });

    //Peticion que borra un usuario
    app.delete('/mongo/user', (request, respond) => {

        let id = request.body.id;

        if(id)
            view.deleteUser({_id: ObjectID(id)}, request, respond);
        else
            respond.status(400).send({mensaje: 'Coloque el ID del registro a borrar'});
    });
}