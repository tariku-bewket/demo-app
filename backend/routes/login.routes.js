// Import the express module
const express = require("express");
// Import the router module
const router = express.Router();

// Import the login controller
const loginController = require("../controllers/login.controller");

// POST request handler to login an employee who comes to this route /login
router.post("/login", loginController.logIn);

module.exports = router;
