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
router.get('/datos', (req, res) => {
  var json1 = {}; //variable para almacenar cada registro que se lea, en
  var arreglo = []; //variable para almacenar todos los datos, en formato
  connection.getConnection(function(error, tempConn) { //conexion a mysql
    if (error) {
      throw error; //si no se pudo conectar
    } else {
      console.log('Conexion correcta.');
      //ejecución de la consulta
      tempConn.query('SELECT * FROM datos', function(error, result) {
        var resultado = result; //se almacena el resultado de la
        if (error) {
          throw error;
          res.send("error en la ejecución del query");
        } else {
          tempConn.release(); //se librea la conexión
          for (i = 0; i < resultado.length; i++) { //se lee
            json1 = {
              "id": resultado[i].id,
              "temperatura": resultado[i].temperatura,
              "pulso": resultado[i].pulso,
              "orientacion": resultado[i].orientacion,
              "timestamp": resultado[i].timestamp,
              "idbebe": resultado[i].idbebe
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
router.post('/datos', (req, res) => {
  console.log(req.body); //mustra en consola el json que llego
  json1 = req.body; //se almacena el json recibido en la variable json1
  connection.getConnection(function(error, tempConn) { //conexion a mysql
    if (error) {
      throw error; //en caso de error en la conexion
    } else {
      console.log('Conexion correcta.');
      tempConn.query('INSERT INTO datos VALUES(null, ?, ?,?,?,?)',
        [json1.temperatura, json1.pulso,json1.orientacion, json1.timestamp,json1.idbebe],
        function(error, result) { //se ejecuta la inserción
          if (error) {
            res.send("error al ejecutar el query");
          } else {
            tempConn.release();
            res.send("datos almacenados"); //mensaje de respuesta
          }
        });

        tempConn.query('SELECT * FROM bebe', function(error,result) {

         var json2={};
          var resultado = result; //se almacena el resultado de la
            for (i = 0; i < resultado.length; i++) { //se lee
              json2 = {
            "nombre": resultado[i].nombre,
            "peso": resultado[i].peso,
            "temperatura_max": resultado[i].temperatura_max,
            "temperatura_min": resultado[i].temperatura_min,
            "orientacion_segura": resultado[i].orientacion_segura,
            "pulso_min": resultado[i].pulso_min
          };
            }

            if (json1.temperatura>json2.temperatura_max || json1.temperatura<json2.temperatura_min){

              tempConn.query('INSERT INTO alerta VALUES(null, ?, ?,?,?)',
                ['Temperature alert',json1.temperatura , json1.timestamp,json1.idbebe]);

                var nodemailer = require('nodemailer');

                var transporter = nodemailer.createTransport({
                  service: 'gmail',
                  auth: {
                    user: 'babysmartiot@gmail.com',
                    pass: 'sabzlatdmhhhzcoy'
                  }
                });

                var mailOptions = {
                  from: 'babysmartiot@gmail.com',
                  to: 'jorge12202001@gmail.com',
                  subject: 'Your baby feels bad',
                  text: 'The temperature in your baby is dangerous'
                };

                transporter.sendMail(mailOptions, function(error, info){
                  if (error) {
                    console.log(error);
                  } else {
                    console.log('Email sent: ' + info.response);
                  }
                });


            }

            var or="On Back";

            if (json1.orientacion>= 130 && json1.orientacion<= 210 || json1.orientacion<= -130 && json1.orientacion>= -210 ) {

              or="Face Down";

            }

            if (or=="Face Down") {

              tempConn.query('INSERT INTO alerta VALUES(null, ?, ?,?,?)',
                ['Position alert', json1.orientacion, json1.timestamp,json1.idbebe]);

                var nodemailer = require('nodemailer');

                var transporter = nodemailer.createTransport({
                  service: 'gmail',
                  auth: {
                    user: 'babysmartiot@gmail.com',
                    pass: 'sabzlatdmhhhzcoy'
                  }
                });

                var mailOptions = {
                  from: 'babysmartiot@gmail.com',
                  to: 'jorge12202001@gmail.com',
                  subject: 'Your baby feels bad',
                  text: 'The position in your baby is dangerous'
                };

                transporter.sendMail(mailOptions, function(error, info){
                  if (error) {
                    console.log(error);
                  } else {
                    console.log('Email sent: ' + info.response);
                  }
                });

            }

            if (json1.pulso<json2.pulso_min ) {

              tempConn.query('INSERT INTO alerta VALUES(null, ?, ?,?,?)',
                ['BPM alert',json1.pulso, json1.timestamp,json1.idbebe]);

                var nodemailer = require('nodemailer');

                var transporter = nodemailer.createTransport({
                  service: 'gmail',
                  auth: {
                    user: 'babysmartiot@gmail.com',
                    pass: 'sabzlatdmhhhzcoy'
                  }
                });

                var mailOptions = {
                  from: 'babysmartiot@gmail.com',
                  to: 'jorge12202001@gmail.com',
                  subject: 'Your baby feels bad',
                  text: 'The BPM in your babe is dangerous'
                };

                transporter.sendMail(mailOptions, function(error, info){
                  if (error) {
                    console.log(error);
                  } else {
                    console.log('Email sent: ' + info.response);
                  }
                });

            }

        });

    }
  });
});

//función delete en la ruta /datos que recibe datos
router.delete('/datos', (req, res) => {
  console.log(req.body); //mustra en consola el json que llego
  json1 = req.body; //se almacena el json recibido en la variable json1
  connection.getConnection(function(error, tempConn) { //conexion a mysql
    if (error) {
      throw error; //en caso de error en la conexion
    } else {
      console.log('Conexion correcta.');

      var del="DELETE FROM datos WHERE ";
      var key=Object.keys(json1);
      var equal=" = ";
      var value=Object.values(json1);

      var comand=del+key+equal+value;

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
router.put('/datos', (req, res) => {
  console.log(req.body); //mustra en consola el json que llego
  json1 = req.body; //se almacena el json recibido en la variable json1
  connection.getConnection(function(error, tempConn) { //conexion a mysql
    if (error) {
      throw error; //en caso de error en la conexion
    } else {
      console.log('Conexion correcta.');

      var put="UPDATE datos SET ";
      var key=Object.keys(json1);
      var value=Object.values(json1);

      var comand=put + key[0] + "=" + value[0] + "," + key[1] + "=" + value[1] + "," + key[2] + "=" + value[2] + "," + key[3] + "=" + value[3] + "," + key[4] + "='" + value[4] + " WHERE " +  key[5] + "=" + value[5];

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
