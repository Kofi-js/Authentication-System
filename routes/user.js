const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const {
  authenticateUser,
  checkIfAdmin,
  checkIfManager,
  checkIfStaff,
} = require("../middleware/auth");

// Import the router controller
const usersController = require("../controllers/usersController");

// register user
router.post(
  "/api/auth/register",
  [
    check("firstName", "first name is required").exists(),
    check("lastName", "last name is required").exists(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "A valid password is required").exists(),
  ],
  usersController.registerUser
);

// User Login route
router.post(
  "api/auth/login",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "A valid password is required").exists(),
  ],
  usersController.loginUsers
);

// recover user password
router.post(
  "/api/auth/recover-password",
  [check("email", "Please enter a valid email").isEmail()],
  usersController.recoverPassword
);

// accept password change
router.put("/api/auth/change-password?", usersController.changePassword);

// get logged in  user
router.get("/api/auth", authenticateUser, usersController.getLoggedInUser);

// logout user
router.put("/api/auth/logout", authenticateUser, usersController.logoutUser);

//update user
router.put(
  "/api/user/:user_id/update",
  authenticateUser,
  checkIfManager,
  checkIfAdmin,
  usersController.updateUser
);

// delete user
router.delete(
  "/api/user/:user_id/delete",
  authenticateUser,
  checkIfAdmin,
  usersController.deleteUser
);

// get one user
router.get(
  "/api/user/:user_id",
  authenticateUser,
  checkIfStaff,
  checkIfManager,
  checkIfAdmin,
  usersController.getUser
);

// get all users
router.get(
  "/api/users",
  authenticateUser,
  checkIfStaff,
  checkIfManager,
  checkIfAdmin,
  usersController.getAllUsers
);

module.exports = router();
