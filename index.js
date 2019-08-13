const express = require('express');
const bodyParser = require('body-parser');

//Creamos la instancia de express
const app = express();

//Definimos nuestras propiedades del cuerpo de las peticiones
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//PETICIONES 

require ('./server/mysqlRequest')(app);
//require ('./server/nombreRequest')(app);
require ('./server/mongoRequest')(app);
require ('./server/phpRequest')(app);
require ('./server/request')(app);

//funcion principal de ejecucion
function init()
{
    //Levantamos nuestro servidor
    app.listen(3000, () => {
        console.log('Escuchando en el puerto 3000');
    });
    //console.log('esta linea va primero');
}

//Iniciamos la ejecucion
init();