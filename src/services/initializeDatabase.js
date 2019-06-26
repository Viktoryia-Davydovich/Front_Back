const mongoose = require("mongoose");
/*
const config = {
  DB: "mongodb://localhost:27017/auth"
};

module.exports = function initDb() {
  mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => {
      console.log("Database is connected");
    },
    err => {
      console.log("Can not connect to the database" + err);
    }
  );
};
*/
module.exports = function initDb() {
  const MongoClient = require("mongodb").MongoClient;
  const uri =
    "mongodb+srv://admin:8025022@cluster0-v76vh.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
  });
};
