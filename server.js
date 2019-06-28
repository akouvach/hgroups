'use strict';
 
/*
1.- Instalar NodeJs desde https://nodejs.org/en/

2.- Crear un directorio (por ejemplo "www" ) para colocar 
los arhivos estáticos :
- html
- js
- css
- imagenes

3.- Instalar los paquetes para utilizar el servidor
y conectar con la base de datos access:

Desde la línea de comandos (cmd) en el directorio de trabajo, 
ejecutar:

npm init
npm install body-parser --save
npm install express --save
npm install node-adodb --save

4.- Ejecuto el servidor web

node server.js
*/


const ADODB = require('node-adodb');
const connection = ADODB.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=data.mdb;');

var express = require("express");
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const dotenv = require('dotenv');
dotenv.config();


/*
Dentro del servidor web existen las rutas... estas rutas son las 
diferentes urls.  Por ejemplo:
localhost/
localhost/insertar
localhost/buscar
localhost/insertar/usuarios


Estas rutas me ayudan a ordenar qué funciones ejecutar cuando se pide algo

Las peticiones al servidor (realizadas a través de las diferentes rutas) 
puedern ser de varios tipos:

GET: Se utilizan para pedir datos
POST: Se utilizan para enviar datos
DELETE: Se utilizan para enviar datos destinados a eliminar

*/



//Esta es una petición de enviar datos 
// y esta direccionada a la ruta "/insertar"

app.post("/insertar", (req, res, next) => {

  var registro = req.body;
  var instruccion = "Insert into usuarios (nombre, apellido, email, pais) values ('" + registro.nombre + 
  "','" + registro.apellido + "','" + registro.email + "','" + registro.pais + "')";

  //Voy a insertar lo que me mandaron por parámetro
    connection
    .execute(instruccion)
    .then(data => {
        console.log(JSON.stringify(data, null, 2));
    })
    .catch(error => {
      res.render(error);
    });

    res.json({mensaje:"insercion exitoas"});  


});

// esta es una petición de borrado
app.delete("/borrarTodo", (req, res, next) => {

  var instruccion = "delete * from usuarios";

  //Voy a insertar lo que me mandaron por parámetro
    connection
    .execute(instruccion)
    .then(data => {
        console.log(JSON.stringify(data, null, 2));
    })
    .catch(error => {
      res.render(error);
    });

    res.json({mensaje:"borrado exitoso"});  


});

// esta es una petición para solicitar información
app.get("/usuarios", (req, res, next) => {
    connection
    .query("SELECT * FROM Usuarios")
    .then(data => {
        res.json(data);
    })
    .catch(error => {
      res.render(error)
    });
});

//Le indico donde estan mis archivos estáticos
// y el nombre del archivo por default que quiero que muestre:
// datos.html
app.use("/",express.static('www',{index:"datos.html"}));

app.listen(process.env.PORT, () => {
 console.log("Server running on port ",process.env.PORT);
});
