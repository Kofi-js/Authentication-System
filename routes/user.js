const express = require("express");
const router = express.Router();
const {isAdmin,isAuth,isStaff,isManager} = require('../middleware/auth')
// Import the router controller
const {Register} = require("../controllers/");
const { login } = require("../controllers/usersController");
const { logout } = require("../controllers/usersController");

// register user
router.post("/api/auth/register",Register);

// User Login route
router.post(
  "api/auth/login",isAuth,isAdmin,isManager,isStaff,login);

// get logged in  user
router.get("/api/auth", authenticateUser,isAdmin,isManager,isStaff, usersController.getLoggedInUser);

// logout user
router.put("/api/auth/logout", isAuth,isAdmin,isManager,isStaff,logout);



module.exports = router();
