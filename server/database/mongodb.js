const MongoClient = require('mongodb').MongoClient;
let db;

const localURI = 'mongodb://localhost:27017/';
const dbName = 'connect4DB' 

module.exports = {
  connectDB: () => {
    MongoClient.connect(localURI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then((client) => {
        db = client.db('connect4DB');
        console.log(`Database connected on port: ${localURI}`);
      })
      .catch(((err) => {
        console.log(`An error occurs: ${err}`);
      }));
  },
  dbURI: localURI + dbName,
}
