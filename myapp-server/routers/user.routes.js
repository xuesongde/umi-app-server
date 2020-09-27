const { authJwt, verifySignUp } = require("../middlewares");
const authController = require("../controllers/auth.controller.js");
module.exports = (app) => {
  const users = require("../controllers/user.controller.js");

  const userSqueController = require("../controllers/userSeque.controller.js");

  var router = require("express").Router();

  // Retrieve all users
  router.get("/allUsers", [authJwt.verifyToken], userSqueController.findAll);

  // Retrieve all published users
  router.get(
    "/published",
    [authJwt.verifyToken],
    userSqueController.findAllPublished
  );

  // Create userSque
  router.post(
    "/createUsersque",
    [authJwt.verifyToken],
    userSqueController.create
  );

  app.use("/usersSque", router);

  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  // Create a new user
  app.post(
    "/signup",
    // [authJwt.verifyToken, verifySignUp.checkDuplicateUsers],
    [verifySignUp.checkDuplicateUsers],
    authController.signup
  );

  // user login
  app.post(
    "/signin",
    // [authJwt.verifyToken, verifySignUp.checkDuplicateUsers],
    authController.signin
  );

  // Retrieve all users
  app.get("/users", [authJwt.verifyToken], users.findAll);

  // Retrieve a single user with userId
  app.get("/users/:userId", [authJwt.verifyToken], users.findOne);

  // Update a user with userId
  app.put("/users/:userId", [authJwt.verifyToken], users.update);

  // Delete a user with userId
  app.delete("/deleteByUserName/:userId", [authJwt.verifyToken], users.delete);

  // Create a new user
  app.delete("/deleteAll", [authJwt.verifyToken], users.deleteAll);
};
