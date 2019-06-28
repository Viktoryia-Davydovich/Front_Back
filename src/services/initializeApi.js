const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
var cors = require("cors");

const users = require("../../src/routes/users/user");
require("../../src/middlewares/passport")(passport);

module.exports = function initApi() {
  const app = express();

  app.use(cors());

  app.use(passport.initialize());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use("/api/users", users);

  app.get("/", function(req, res, next) {
    res.send("running");
  });

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
  });
};
