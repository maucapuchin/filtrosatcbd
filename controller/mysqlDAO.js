const mysql = require('mysql');
const constants = require ('../model/constant');

//Obtenemos todos los valores de una tabla

function obtenerReporte()
{
    //Armamos nuestra promesa de respuesta
    return new Promise((resolve, reject) => {

        //conexion a Mysql
        let connection = mysql.createConnection(constants.mysqlObject);

        //Conectamos
        connection.connect((error) => {
            if(error)
            reject({'error': error, 'mensaje': 'Sin conexion a la base de datos', 'codigo': 501});
            else
            {
                //Armamos la consulta
                let consulta = "SELECT o.id AS ID,o.folio AS FOLIO,"
                consulta += " CONCAT(pv.abreviatura, '-', cl.clave) AS CLIENTE,"
                consulta += " CONCAT(cp.nombre, ' ', ma.nombre, ' ', md.nombre) AS DESCRIPCION,"
                consulta += " co.nombre AS COLOR,od.cantidad AS CANTIDAD,"
                consulta += " od.precioFinal AS PRECIO,od.cantidad* od.precioFinal as TOTAL,"
                consulta += " od.ganancia AS GANANCIA,IFNULL(odcom.cantidad, 0) AS COMISION,"
                consulta += " IFNULL(tv.tipo, IF((SELECT id FROM creditoorden WHERE orden_id = o.id > 0), 'Pedido Credito', 'Pedido Contado')) AS TIPO,"
                consulta += " oc.fecha AS FECHA,pv.nombre AS RUTA,u.nombre AS VENDEDOR,cp.id AS CATEGORIA,"
                consulta += " ifnull((select distinct if(ord.id is null,'Total', 'Parcial') AS Cancelacion"
                consulta += " from ordencompleta oc"
                consulta += " LEFT JOIN orden ord ON oc.orden_id = ord.id"
                consulta += " LEFT JOIN ordendescripcion od ON od.orden_id = ord.id"
                consulta += " LEFT JOIN ordendescripcioncontable odc ON odc.ordendescripcion_id = od.id"
                consulta += " LEFT JOIN inventarioventa iv ON odc.inventarioventa_id = iv.id"
                consulta += " LEFT JOIN producto p on iv.producto_id = p.id"
                consulta += " LEFT JOIN categoriaproducto cp ON p.categoriaproducto_id = cp.id "
                consulta += " where od.cantidad = 0"
                consulta += " AND od.ganancia = 0"
                consulta += " AND ord.id = o.id"
                consulta += " AND cp.nombre != 'Chip'),'Completo') AS MAU"
                consulta += " FROM ordendescripcioncontable odc LEFT JOIN ordendescripcion od ON odc.ordenDescripcion_id = od.id"
                consulta += " LEFT JOIN inventarioventa iv ON odc.inventarioVenta_id = iv.id"
                consulta += " LEFT JOIN producto p ON iv.producto_id = p.id"
                consulta += " LEFT JOIN categoriaproducto cp ON p.categoriaProducto_id = cp.id"
                consulta += " LEFT JOIN productomodelo pm ON pm.producto_id = p.id"
                consulta += " LEFT JOIN modelo md ON pm.modelo_id = md.id"
                consulta += " LEFT JOIN marca ma ON md.marca_id = ma.id"
                consulta += " LEFT JOIN color co ON iv.color_id = co.id"
                consulta += " LEFT JOIN orden o ON od.orden_id = o.id"
                consulta += " LEFT JOIN ordencompleta oc ON oc.orden_id = o.id"
                consulta += " LEFT JOIN personalventa pvt ON oc.personalVenta_id = pvt.id"
                consulta += " LEFT JOIN usuario u ON pvt.usuario_id = u.id"
                consulta += " LEFT JOIN cliente cl ON o.cliente_id = cl.id"
                consulta += " LEFT JOIN puntoventa pv ON cl.puntoVenta_id = pv.id"
                consulta += " LEFT JOIN ordendescripcioncomision odcom ON odcom.ordenDescripcion_id = od.id"
                consulta += " LEFT JOIN creditoorden cor ON cor.orden_id = o.id"
                consulta += " LEFT JOIN tipoorden tor ON tor.orden_id = o.id"
                consulta += " LEFT JOIN tipoventa tv ON tor.tipoventa_id = tv.id"
                consulta += " WHERE od.cantidad > 0"
                consulta += " AND o.activo = true"
                consulta += " AND DATE(oc.fecha) >= '2018-07-16'"
                consulta += " AND DATE(oc.fecha) <= '2019-08-13'"
                consulta += " ORDER BY RUTA ASC, pvt.asignacion_id ASC, VENDEDOR ASC, FECHA ASC, CLIENTE ASC, DESCRIPCION ASC";
               
                connection.query(consulta, (error, resultado) => {
                    if(error)
                        reject({
                        'error': error, 
                        'mensaje': 'No es posible realizar la consulta',
                        'codigo': 501});
                    else
                    var noComision = resultado;
                    var filtro = noComision.filter(function (item) {
                        return item.COMISION == 0;
                    });
                    var ruta = filtro;
                    var porRuta = ruta.filter(function (item) {
                        return item.RUTA == "R1";
                    });
                    var ruta = porRuta;
                    var porRutaespecifica = ruta.filter(function (item) {
                        return item.CLIENTE == "R1-230";
                    });
                    resolve(porRutaespecifica);
                            
                    connection.end();
                });
            }
        });
        //resolve({'mensaje': 'Conexion a la BD exitosa', 'codigo': 200});
        //connection.end();
    });
}

function obtenerCarriers()
{
    //Armamos nuestra promesa de respuesta
    return new Promise((resolve, reject) => {

        //conexion a Mysql
        let connection = mysql.createConnection(constants.mysqlObject);

        //Conectamos
        connection.connect((error) => {
            if(error)
            reject({'error': error, 'mensaje': 'Sin conexion a la base de datos', 'codigo': 501});
            else
            {
                //Armamos la consulta
                let consulta = 'SELECT * FROM numero n INNER JOIN activado a ON n.id = a.numero_id';
                
                connection.query(consulta, (error, resultado) => {
                    if(error)
                        reject({
                        'error': error, 
                        'mensaje': 'No es posible realizar la consulta',
                        'codigo': 501});
                    else
                    
                    var filtro = resultado;
                    var filtroPorId = filtro.filter(function (item) {
                        return item.cliente_id == 180
                    });
                    console.log(filtroPorId);
                    resolve(filtroPorId);
                            
                    connection.end();
                });
            }
        });
        //resolve({'mensaje': 'Conexion a la BD exitosa', 'codigo': 200});
        //connection.end();
    });
}

function obtenerClientes()
{
    //Armamos nuestra promesa de respuesta
    return new Promise((resolve, reject) => {

        //conexion a Mysql
        let connection = mysql.createConnection(constants.mysqlObject);

        //Conectamos
        connection.connect((error) => {
            if(error)
            reject({'error': error, 'mensaje': 'Sin conexion a la base de datos', 'codigo': 501});
            else
            {
                //Armamos la consulta
                let consulta = 'SELECT * FROM cliente';
                
                connection.query(consulta, (error, resultado) => {
                    if(error)
                        reject({
                        'error': error, 
                        'mensaje': 'No es posible realizar la consulta',
                        'codigo': 501});
                    else
                    
                    resolve(resultado);
            
                            
                    connection.end();
                });
            }
        });

    });
}

function insertCarrier(carrier)
{
    //Armamos nuestra promesa
    return new Promise((resolve, reject) => {
        //Obtenemos nuestra conexion a la BD
        connectDB().then((connection) => {

            let insercion = 'INSERT INTO carrier(nombre, activo) VALUES (?, true)';
            connection.query(insercion, [carrier.nombre], (error, resultado) => {
                if(error)
                reject(mensajeError(error));
                else
                resolve(resultado);
            })
        }).catch((error) => {
            reject(error);
        })
    });
}

function updateCarrier(carrier)
{
    return new Promise((resolve, reject) =>
    {
        connectDB().then((connection) => {
            let actualizar = 'UPDATE carrier SET nombre = ?, activo = ? WHERE id = ?';
            connection.query(actualizar, [carrier.nombre, carrier.activo, carrier.id], (error, resultado) => {
                if(error)
                reject(mensajeError(error));
                else
                resolve(resultado);

                connection.end();
            });
        
    }).catch((error) => {
        reject(error);
    });
});
}

function deleteCarrier(carrier)
{
    return new Promise((resolve, reject) => {
        connectDB().then((connection) => {
            let eliminar = 'DELETE FROM carrier WHERE id = ?';
            connection.query(eliminar, [carrier.id], (error, resultado) => {
                if(error)
                reject(mensajeError(error));
                else
                resolve(resultado);

            connection.end();
            });
        }).catch((error) => {
            reject(error);
        });
    });
}
function connectDB()
{
    return new Promise((resolve, reject) => {
        let connection = mysql.createConnection(constants.mysqlObject);

        connection.connect((error) => {
            if(error)
            reject(error);
            else
            resolve(connection);
        });
    });
}

function mensajeError(error)
{
    return {'error': error, 'mensaje': 'No es posible realizar la consulta', 'codigo': 501};
}

exports.obtenerReporte = obtenerReporte;
exports.obtenerCarriers = obtenerCarriers;
exports.obtenerClientes = obtenerClientes;
exports.insertCarrier = insertCarrier;
exports.updateCarrier = updateCarrier;
exports.deleteCarrier = deleteCarrier;
