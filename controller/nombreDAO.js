const mongodb = require('mongodb').MongoClient;
const constants = require('../model/constant');
const readline = require('./../resources');
fs = require ("fs"), nombres = "nombres.txt"

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

function getNombres()
{
    //Regresamos la promesa con el proceso
    return new Promise((resolve, reject) => {

        //Obtenemos el cliente de mongo
        connectDB().then((client) => {
            //Hacemos conexion a la BD
            //Realizamos la consulta con todos los elementos de la colección (SELECT * FROM user)
            db.collection('resources').find({}).toArray((error, resultado)=>{
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

exports.getCollectionUser = getCollectionUser;