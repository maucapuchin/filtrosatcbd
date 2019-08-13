const http = require('http');
const querystring = require('querystring');
const constants =  require('../model/constant');

//Ffuncion que hara la petiion al servidor php

function getData(pass)
{
    //Creams nuestra promesa del proceso
    return new Promise((resolve, reject) => {

        //Creamos el objeto q enviar por POST
        const datos = querystring.stringify({'pass': pass});

        //Obtenemos los datos para la peticion u los agregamos la emoria que se quiere
        let params  = constants.phpObject;
        params.headers['Content-Length'] = Buffer.byteLength(datos);
     
        //Armamos la peticion

        let peticion = http.request(params, (respond) => {
            console.log(params);
        console.log('STATUS: ' + respond.statusCode);

        //Convertimos la informacion de la respuesta a UTF8
        respond.setEncoding('utf8');

        //Obtenemos la respuesta de la peticion

        respond.on('data', (info) => {
            resolve(info);
            });
        });

        //Si hubo un error al intentar conectar al servidor
        peticion.on('error', (error) => {
            reject({mensaje: 'Error al mandar la peticion', 'error': error});
        });
        //Mandamos la peticion
        peticion.write(datos);
        peticion.end();
    });
}

exports.getData = getData;