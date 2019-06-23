const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");

const initDb = require("./src/services/initializeDatabase");
const users = require("./src/routes/users/user");
require("./src/middlewares/passport")(passport);

initDb();

const app = express();

app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/users", users);

app.get("/", function(req, res) {
  res.send("hello");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
