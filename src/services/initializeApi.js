const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const session = require("express-session");

const users = require("../routes/user");
const notes = require("../routes/note");
require("../../src/middlewares/passport")(passport);

module.exports = function initApi() {
  const app = express();

  app.use(cors());

  app.use(
    session({
      secret: "super secret key",
      resave: true,
      cookie: { maxAge: 60 * 60 * 1000 }, // 1  hr
      saveUninitialized: true
    })
  );

  app.use(passport.initialize());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use("/api/users", users);
  app.use("/api/notes", notes);

  app.get("/", function(req, res, next) {
    res.send("running");
  });

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
  });
};
