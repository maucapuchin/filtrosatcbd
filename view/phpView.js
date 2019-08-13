const controller = require('../controller/phpDAO');

//Vista que procesa la peticion al servidor

function requestServerPHP(pass, request, respond)
{
    controller.getData(pass).then((data) =>{
        respond.status(200).send({mensaje: data});
    })
    .catch((error) => {
        respond.status(500).send({error: error});
    });
}

exports.requestServerPHP = requestServerPHP;