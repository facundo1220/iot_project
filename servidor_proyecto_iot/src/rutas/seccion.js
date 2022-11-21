const {
  Router
} = require('express');
const router = Router();
const mysql = require('mysql');

// se crea la conexión a mysql
const connection = mysql.createPool({
  connectionLimit: 500,
  host: 'localhost',
  user: 'root',
  password: '', //el password de ingreso a mysql
  database: 'proyecto_iot',
  port: 3306
});
//function get en la ruta /datos, que trae todos los datos almacenados en la
router.get('/seccion', (req, res) => {
  var json1 = {}; //variable para almacenar cada registro que se lea, en
  var arreglo = []; //variable para almacenar todos los datos, en formato
  connection.getConnection(function(error, tempConn) { //conexion a mysql
    if (error) {
      throw error; //si no se pudo conectar
    } else {
      console.log('Conexion correcta.');
      //ejecución de la consulta
      tempConn.query('SELECT * FROM seccion', function(error, result) {
        var resultado = result; //se almacena el resultado de la
        if (error) {
          throw error;
          res.send("error en la ejecución del query");
        } else {
          tempConn.release(); //se librea la conexión
          for (i = 0; i < resultado.length; i++) { //se lee
            json1 = {
              "user": resultado[i].user
            };
            console.log(json1); //se muestra el json en la consola
            arreglo.push(json1); //se añade el json al arreglo
          }
          res.json(arreglo); //se retorna el arreglo
        }
      });
    }
  });
});

//función post en la ruta /datos que recibe datos
router.post('/seccion', (req, res) => {
  console.log(req.body); //mustra en consola el json que llego
  json1 = req.body; //se almacena el json recibido en la variable json1
  connection.getConnection(function(error, tempConn) { //conexion a mysql
    if (error) {
      throw error; //en caso de error en la conexion
    } else {
      console.log(json1);
      tempConn.query('INSERT INTO seccion VALUES(?)',
        [json1.user],
        function(error, result) { //se ejecuta la inserción
          if (error) {
            res.send("error al ejecutar el query");
          } else {
            tempConn.release();
            res.send("datos almacenados"); //mensaje de respuesta
          }
        });
    }
  });
});

//función delete en la ruta /datos que recibe datos
router.delete('/seccion', (req, res) => {
  console.log(req.body); //mustra en consola el json que llego
  json1 = req.body; //se almacena el json recibido en la variable json1
  connection.getConnection(function(error, tempConn) { //conexion a mysql
    if (error) {
      throw error; //en caso de error en la conexion
    } else {
      console.log('Conexion correcta.');

      var del="DELETE FROM seccion WHERE ";
      var key=Object.keys(json1);
      var equal=" = ";
      var value=Object.values(json1);

      var comand=del+key+equal+"'"+value+"'";

      tempConn.query(comand,
        function(error, result) { //se ejecuta la inserción
          if (error) {
            res.send("error en el query");
          } else {
            tempConn.release();
            res.send("datos borrados"); //mensaje de respuesta
          }
        });
    }
  });
});

//función put en la ruta /datos que recibe datos
router.put('/seccion', (req, res) => {
  console.log(req.body); //mustra en consola el json que llego
  json1 = req.body; //se almacena el json recibido en la variable json1
  connection.getConnection(function(error, tempConn) { //conexion a mysql
    if (error) {
      throw error; //en caso de error en la conexion
    } else {
      console.log('Conexion correcta.');

      var put="UPDATE seccion SET ";
      var key=Object.keys(json1);
      var value=Object.values(json1);

      var comand=put + key[0] + "='" + value[0] + "' WHERE " +  key[1] + "='" + value[1]+"'";

      tempConn.query(comand,
        function(error, result) { //se ejecuta la inserción
          if (error) {
            res.send("error en el query");
          } else {
            tempConn.release();
            res.send("datos actualizados"); //mensaje de respuesta
          }
        });
    }
  });
});

module.exports = router;
