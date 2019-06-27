const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
var cors = require("cors");

module.exports = function initApi() {
  const app = express();

  app.use(cors());

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

  app.use(passport.initialize());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  /*
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
    );
    next();
  });
*/

  const users = require("../../src/routes/users/user");

  app.use("/api/users", users);

  app.get("/", function(req, res, next) {
    res.send("running");
  });

  app.post("*", function(req, res, next) {
    console.log("cors post");
  });

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
  });
};

require("../../src/middlewares/passport")(passport);
