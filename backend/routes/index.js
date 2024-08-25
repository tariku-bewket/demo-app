// Import the express module
const express = require("express");
// Import the router module
const router = express.Router();
// Import the login route module
const loginRoute = require("./login.routes");
// Import the employee route module
const employeeRoute = require("./employee.routes");

// Add the login router to the middleware chain of the app
router.use(loginRoute);
// Add the employee route to the middleware chain of the app
router.use(employeeRoute);

// Export the router
module.exports = router;
