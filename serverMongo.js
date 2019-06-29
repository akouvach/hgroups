//mongodb://<dbuser>:<dbpassword>@ds141434.mlab.com:41434/participemos-arg

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
 
// Connection URL
// local: const url = 'mongodb://localhost:27017';
//const url = 'mongodb://akouvach:mafalda2003@ds141434.mlab.com:41434';
const url = 'mongodb://pepe:mafalda2003@ds141434.mlab.com:41434/participemos-arg';
 
// Database Name
const dbName = 'participemos-arg';

var express = require("express");
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const dotenv = require('dotenv');
dotenv.config();


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
    
      res.json({"modo":process.env.NODE_ENV, "port": process.env.PORT});
      
});

//Le indico donde estan mis archivos estáticos
// y el nombre del archivo por default que quiero que muestre:
// datos.html
app.use("/",express.static('www',{index:"datos.html"}));

console.log(process.env.NODE_ENV, process.env.PORT);
app.listen(process.env.PORT, () => {
 console.log("Server running on port ",process.env.PORT);
});





const findDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(docs)
      callback(docs);
    });
  }

 
const insertDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
 
    // Insert some documents
    collection.insertMany([
      {a : 1}, {a : 2}, {a : 3}
    ], function(err, result) {
      assert.equal(err, null);
      assert.equal(3, result.result.n);
      assert.equal(3, result.ops.length);
      console.log("Inserted 3 documents into the collection");
      callback(result);
    });
}
  

/*

  // Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  // for (const prop in err){
  //   console.log(prop, err[prop]);
  // }

  console.log("Connected successfully to server");
 
  const db = client.db(dbName);

  insertDocuments(db, function() {
      findDocuments(db, function() {
            client.close();
        });
  });


});

*/
