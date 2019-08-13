const view = require('../view/phpView');

module.exports = (app) => {
    //Peticion que realiza una segunda peticion a un servidor externo
    app.post('/php/pass', (request, respond) => {

        let pass = request.body.pass;

        if(pass)
            view.requestServerPHP(pass, request, respond);
        else
            respond.status(400).send({mensaje: 'Coloque el valor de pass'});
    });
}