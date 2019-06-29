//mongodb://<dbuser>:<dbpassword>@ds141434.mlab.com:41434/participemos-arg

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
 
// Connection URL
// local: const url = 'mongodb://localhost:27017';
//const url = 'mongodb://akouvach:mafalda2003@ds141434.mlab.com:41434';
const url = 'mongodb://pepe:mafalda2003@ds141434.mlab.com:41434';
 
// Database Name
const dbName = 'participemos-arg';

// const findDocuments = function(db, callback) {
//     // Get the documents collection
//     const collection = db.collection('documents');
//     // Find some documents
//     collection.find({}).toArray(function(err, docs) {
//       assert.equal(err, null);
//       console.log("Found the following records");
//       console.log(docs)
//       callback(docs);
//     });
//   }

 
// const insertDocuments = function(db, callback) {
//     // Get the documents collection
//     const collection = db.collection('documents');
 
//     // Insert some documents
//     collection.insertMany([
//       {a : 1}, {a : 2}, {a : 3}
//     ], function(err, result) {
//       assert.equal(err, null);
//       assert.equal(3, result.result.n);
//       assert.equal(3, result.ops.length);
//       console.log("Inserted 3 documents into the collection");
//       callback(result);
//     });
// }
  
  // Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  //assert.equal(null, err);
  for (const prop in err){
    console.log(prop, err[prop]);
  }

  console.log("Connected successfully to server");
 
  //const db = client.db(dbName);
/*
  insertDocuments(db, function() {
      findDocuments(db, function() {
            client.close();
        });
  });
*/

  //client.close();
});