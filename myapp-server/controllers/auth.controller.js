const config = require("../config/auth.config");
const Customer = require("../models/user.model.js");
const _ = require("lodash");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  console.log("signup.......");
  const user = new Customer({
    userName: req.body.userName,
    passWord: bcrypt.hashSync(req.body.passWord),
    isAgreed: req.body.isAgreed,
  });
  // Save Customer in the database
  Customer.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer.",
      });
    else if (!_.isEmpty(data)) {
      res.send({ code: 200000, msg: "success" });
    }
  });
};

exports.signin = (req, res) => {
  Customer.findById(req.body.userName, (err, user) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while sign in.",
      });
    if (!user) {
      return res.status(200).send({ code: 300000, message: "User Not found." });
    }
    var passwordIsValid = bcrypt.compareSync(req.body.passWord, user.passWord);
    if (!passwordIsValid) {
      return res.status(200).send({
        code: 300000,
        accessToken: null,
        message: "Invalid Password!",
      });
    }
    var token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });
    res.status(200).send({
      code: 200000,
      accessToken: token,
      message: "login success",
    });
  });
};
