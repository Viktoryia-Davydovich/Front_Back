const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const validateRegisterInput = require("../../validators/register");
const validateLoginInput = require("../../validators/login");
const User = require("../../models/User");
const wrap = require("../../middlewares/wrap");
const async = require("async");

router.post(
  "/register",
  wrap(
    async(function(req, res) {
      const { errors, isValid } = validateRegisterInput(req.body);

      if (!isValid) {
        return res.status(400).json(errors);
      }

      User.findOne({
        email: req.body.email
      }).then(user => {
        debugger;
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
    })
  )
);

router.post(
  "/login",
  wrap(
    async((req, res) => {
      debugger;
      const { errors, isValid } = validateLoginInput(req.body);

      if (!isValid) {
        return res.status(400).json(errors);
      }

      const email = req.body.email;
      const password = req.body.password;

      User.findOne({ email }).then(user => {
        if (!user) {
          errors.email = "User not found";
          return res.status(404).json(errors);
        }
        bcrypt.compare(password, user.password).then(isMatch => {
          if (isMatch) {
            const payload = {
              id: user.id
            };
            jwt.sign(
              payload,
              "secret",
              {
                expiresIn: 3600
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
      });
    })
  )
);

router.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return res.json({
      id: req.user.id,
      email: req.user.email
    });
  }
);

module.exports = router;
