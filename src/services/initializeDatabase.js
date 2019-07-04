const mongoose = require("mongoose");

const uri =
  "mongodb+srv://admin:8025022@cluster0-v76vh.mongodb.net/test?retryWrites=true&w=majority";

module.exports = function initDb() {
  mongoose.connect(uri, { useNewUrlParser: true }, (err, client) => {
    if (err) {
      console.log("Error connection to MongoDB", err.message, err.stack);
      return;
    }
    console.log("Success connection to MongoDB");
  });
};
