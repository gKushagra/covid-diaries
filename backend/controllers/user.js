const User = require("./../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtkey } = require("./../../config");

// Register a user
exports.signup = (req, res, next) => {
  User.find({ username: req.body.username })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "User exists",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              username: req.body.username,
              password: hash,
            });
            user
              .save()
              .then((result) => {
                res.status(201).json({
                  message: "User created",
                });
              })
              .catch((err) => {
                res.status(500).json({
                  error: err,
                });
              });
            //   res.status(200).json({
            //     user: user,
            //   });
          }
        });
      }
    });
};

// Signin the user
exports.signin = (req, res, next) => {
  User.find({ username: req.body.username })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth Failed.",
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth Failed.",
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              username: user[0].username,
            },
            jwtkey,
            {
              expiresIn: "1h",
            }
          );
          res.status(200).json({
            message: "Auth successful.",
            token: token,
          });
        }
        res.status(401).json({
          message: "Auth Failed.",
        });
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

// Delete a user
exports.delete = (req, res, next) => {
  User.deleteOne({ username: req.params.username })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "User Deleted",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
