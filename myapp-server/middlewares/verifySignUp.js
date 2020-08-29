const Customer = require("../models/user.model.js");
/* check duplicate user name */
checkDuplicateUsers = (req, res, next) => {
  Customer.findById(req.body.userName, (err, data) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (data) {
      res
        .status(200)
        .send({ code: 300000, message: "Failed! Username is already in use!" });
      return;
    }
    next();
  });
};

const verifyUser = {
  checkDuplicateUsers,
};

module.exports = verifyUser;
