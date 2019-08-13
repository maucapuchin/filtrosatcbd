//objeto que guarda los datos de MySQL
const mysqlObject = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'atcbd',
    port: 3306
};

//Objeto para conectar a Mongo
const mongoObject = {
    database: 'mongodb://localhost:27017/'
}

//Objeto para acceder a un servidor

let phpObject = {
    hostname: '187.189.152.4',
    port: 80,
    path: '/test/testSecurity.php',
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
};

exports.mongoObject = mongoObject;
exports.mysqlObject = mysqlObject;
exports.phpObject = phpObject
