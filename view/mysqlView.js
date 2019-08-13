const controller = require('../controller/mysqlDAO');

function getReporte(request, respond)
{
    //Resolvemos la promesa
    controller.obtenerReporte().then((resultado) => {
        respond.status(200).send(resultado);
    }).catch((error) => {
        let elemento = {'mensaje': error.mensaje, 'error': error.error};
        respond.status(error.codigo).send(JSON.stringify(elemento));
    });
}

//vista que muestra los carriers
function getCarriers(request, respond)
{
    //Resolvemos la promesa
    controller.obtenerCarriers().then((resultado) => {
        respond.status(200).send(resultado);
    }).catch((error) => {
        let elemento = {'mensaje': error.mensaje, 'error': error.error};
        respond.status(error.codigo).send(JSON.stringify(elemento));
    });
}

function getClientes(request, respond)
{
    //Resolvemos la promesa
    controller.obtenerClientes().then((resultado) => {
        respond.status(200).send(resultado);
    }).catch((error) => {
        let elemento = {'mensaje': error.mensaje, 'error': error.error};
        respond.status(error.codigo).send(JSON.stringify(elemento));
    });
}

//Vista que inserta un valor
function setCarrier(carrier, request, respond)
{
    //Resolvemos nuestra promesa
    controller.insertCarrier(carrier).then((resultado) => {
        respond.status(200).send(resultado);
    }).catch((error) => {
        let elemento = {'mensaje': error.mensaje, 'error': error.error};
        respond.status(error.codigo).send(JSON.stringify(elemento));
    });
}

//Vista que actualiza un valor
function updateCarrier(carrier, request, respond)
{
    //resolvemos la promesa
    controller.updateCarrier(carrier).then((resultado) => {
        respond.status(200).send(resultado);
    }).catch((error) => {
        let elemento = {'mensaje': error.mensaje, 'error': error.error};
        respond.status(error.codigo).send(JSON.stringify(elemento));
    });
}

function deleteCarrier(carrier, request, respond)
{
    //Resolvemos las promesas
    controller.deleteCarrier(carrier).then((resultado) =>{
        respond.status(200).send(resultado);
    }).catch((error) => {
        let elemento = {'mensaje': error.mensaje, 'error': error.error};
        respond.status(error.codigo).send(JSON.stringify(elemento));
    });
}

exports.getReporte = getReporte;
exports.getCarriers = getCarriers;
exports.getClientes = getClientes;
exports.setCarrier = setCarrier;
exports.updateCarrier = updateCarrier;
exports.deleteCarrier = deleteCarrier;