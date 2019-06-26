const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
var cors = require("cors");

const users = require("../../src/routes/users/user");
require("../../src/middlewares/passport")(passport);

module.exports = function initApi() {
  const app = express();

  app.use(passport.initialize());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use(cors());
  app.options("*", cors());
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
  app.use("/api/users", users);

  app.head("*", cors(), (req, res) => {
    res.sendStatus(204);
  });

  app.get("/", cors(), function(req, res) {
    res.send("hello");
  });

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
  });
};
