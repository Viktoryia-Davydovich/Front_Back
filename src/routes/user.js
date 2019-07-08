const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const async = require("async");

const validateRegisterInput = require("../validators/register");
const validateLoginInput = require("../validators/login");
const User = require("../models/User");

router.post("/register", async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const user = await User.findOne({ email: req.body.email });

  if (user) {
    return res.status(400).json({
      email: "Email already exists"
    });
  } else {
    const newUser = new User({
      email: req.body.email,
      password: req.body.password
    });

    bcrypt.genSalt(10, (err, salt) => {
      if (err) console.error("There was an error", err);
      else {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) console.error("There was an error", err);
          else {
            newUser.password = hash;
            newUser.save().then(user => {
              res.json(user);
            });
          }
        });
      }
    });
  }
});

router.post("/login", async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ email });

  if (!user) {
    errors.email = "User not found";
    return res.status(404).json(errors);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (isMatch) {
    const payload = {
      id: user.id
    };

    jwt.sign(
      payload,
      "secret",
      {
        expiresIn: "10h"
      },
      (err, token) => {
        if (err) console.error("There is some error in token", err);
        else {
          res.json({
            success: true,
            token: `Bearer ${token}`
          });
        }
      }
    );
  } else {
    errors.password = "Incorrect Password";
    return res.status(400).json(errors);
  }
});

router.get(
  "/me",
  passport.authenticate("jwt", { session: true }),
  (req, res) => {
    return res.json({
      id: req.user.id,
      email: req.user.email
    });
  }
);

module.exports = router;
