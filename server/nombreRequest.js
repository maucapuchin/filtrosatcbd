const view = require('../view/nombreView');
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

    
   
}