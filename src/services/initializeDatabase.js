const mongoose = require("mongoose");

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
