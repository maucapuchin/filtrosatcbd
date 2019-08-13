const controller = require('../controller/nombreDAO');

//Vista que inserta un usuario
function leeArchivo(file)
        {
            var archivo = new XMLHttpRequest();
            archivo.open("GET", file, false);
            archivo.onreadystatechange = function ()
            {
                
            }
            archivo.send(null);
        }

        leeArchivo("../resources/nombres.txt");