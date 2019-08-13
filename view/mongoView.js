const controller = require('../controller/mongoDAO');

//Vista que inserta un usuario
function setUser(usuario, request, respond){
    controller.setUserMongo(usuario).then((resultado) => {
        respond.status(200).send({'mensaje': 'Elemento insertado', 'Respuesta': resultado})
          
    }).catch((error) => {
        respond.status(400).send(error);
    
});
}

//Vista que muestra un arreglo de usuarios
function getUsers(request, respond)
{
    controller.getCollectionUser().then((resultado) =>{
        respond.status(200).send(resultado);
    }).catch((error) => {
        respond.status(500).send(error);
    });    
}

/* function getUser(request, respond)
{
    controller.getAUser().then((resultado) =>{
        respond.status(200).send(resultado);
    }).catch((error) => {
        respond.status(500).send(error);
    });  
} */

//Vista que actualiza el usuario

function updateUser(user, values, request, respond)
{
    controller.updateUser(user, values).then((result) => 
    {
        respond.status(200).send({mensaje: 'Actualizado correctamente', resultado: result});
    }).catch((error) => {
        respond.status(500).send(error);
    });
}
//vista que elimina un usuario
function deleteUser(user, request, respond)
{
    controller.deleteUser(user).then((result) => {
        respond.status(200).send({mensaje: 'Eliminado correctamente', resultado: result});
    }).catch((error) => {
        respond.status(500).send(error)
    });
}

exports.setUser = setUser;
exports.getUsers = getUsers;
//exports.getUser = getUser
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;