const mongodb = require('mongodb').MongoClient;
const constants = require('../model/constant');

//Funcion que nos conecta a MongoDB

function connectDB()
{
    return new Promise((resolve, reject) =>{
        mongodb.connect(constants.mongoObject.database, {useNewUrlParser: true}, (error, cliente) =>{

            if(error)
            reject({'mensaje': 'Error al acceder a MongoDB', 'error':error});
            else
            resolve(cliente);
        });
    });
}
//Inserta un nuevo usuario  a Mongo
function setUserMongo(usuario)
{
    //Regresa una promesa con nuestro proceso
        return new Promise ((resolve, reject) => {
            //hacemos nuestra conexion a Mongo
            connectDB().then((client) => {
                //conectamos a la BD (si no existe la crea)
                let db = client.db('morpheus');
                
                //Inserta un usuario en la coleccion (si no existe la coleccion, la crea)
                db.collection('user').insertOne(usuario, (error, resultado) => {
                    if(error)
                    reject({'mensaje': 'error al insertar el usuario', 'error': error});
                    else
                    resolve(resultado);
                    client.close();
                    });
                }).catch((error) => {
                    reject(error);
                

            });
       
    });    
}

//Leer todos los datos en Mongo de una coleccion

function getCollectionUser()
{
    //Regresamos la promesa con el proceso
    return new Promise((resolve, reject) => {

        //Obtenemos el cliente de mongo
        connectDB().then((client) => {
            //Hacemos conexion a la BD
            let db = client.db('morpheus');
            //Realizamos la consulta con todos los elementos de la colección (SELECT * FROM user)
            db.collection('user').find({}).toArray((error, resultado)=>{
                if(error)
                reject(error);
                else
                resolve(resultado);

            client.close();
            });
        }).catch((error) =>{
            reject(error);
        });
    });

}
/* function getAUser() 
{
    //Regresamos la promesa con el proceso
    return new Promise((resolve, reject) =>{
    
        //Obtenemos el cliente de mongo
        connectDB().then((client)=>{
            //Hacemos la conexion a la BD
            let db = client.db('morpheus');
            //Realizamos la consulta del elemento
            db.collection('user').find({}).toArray((error, resultado) =>{
                if(error)
                reject(error);
                else
                resolve(resultado);

            client.close();
            });
        }).catch((error) => {
        reject(error);
           

        });
    });
} */

//Actualiza un registro
function updateUser(user, values)
{
    return new Promise((resolve, reject) => {
        //conexion a la BD
        connectDB.then((client) => {

            let db = client.db('morpheus');

            db.collection('user').updateOne(user,  {$set: values}, (error, resultado) => {
                if(error)
                    reject(error);
                else
                    resolve(result);

            client.close();
            });
            
        })
        .catch((error) => {
            reject(error);

        });
    });
}

function deleteUser(user)
{
    return new Promise ((resolve, reject) => {
        //conexion a la base de datos
    connectDB().then((client) =>{

        let db = client.db('morpheus');

        //Borramos un registro
        db.collection('user').deleteOne(user, (error, result) =>{
            if(error)
            reject(error);
            else
            resolve(result);

            client.close();
        });
    }).catch((error) => {
        reject(error);
        
        });
    });
    
}


exports.setUserMongo = setUserMongo;
exports.getCollectionUser = getCollectionUser;
//exports.getAUser = getAUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;