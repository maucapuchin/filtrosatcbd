const view = require ('../view/mysqlView');

module.exports = (app) => {
    //Peticion GET para los carriers

    app.get('/carriers', (request, respond) => {
        view.getCarriers(request, respond);
    });

    app.get('/clientes', (request, respond) => {
        view.getClientes(request, respond);
    });

    app.get('/reporte', (request, respond) => {
        view.getReporte(request, respond);
    });

    app.post('/carrier', (request, respond) => {
        //Obtenemos el valor del cuerpo de request
        let carrier = request.body;
        if(carrier.nombre)
            view.setCarrier({nombre: carrier.nombre}, request, respond);
        else
            respond.status(400).send({'mensaje': 'coloque un nombre a insertar'});
    
    });
    //Peticion PUT para actualizar datos
    app.put('/carrier',(request, respond)=> {

        //obtenemos los valores
        let id = request.query.id;
        let object = request.body;
        
        if(object.id && object.nombre && object.activo)
        {
           
            view.updateCarrier({'id': object.id, 'nombre': object.nombre, 'activo':object.activo}, request, respond);
        }
        else
            respond.status(400).send({'mensaje': 'coloque los datos completos para actualizar'});
        
        });
        //Peticion DELETE para borrar un registro
        app.delete('/carrier', (request, respond) => {

            //Obtenemos el id
            let id = request.query.id;
            if(id)
            view.deleteCarrier({'id': id}, request, respond);
            else
            respond.status(400).send({'mensaje': 'Coloque el id para borrar'});
        });
    }
