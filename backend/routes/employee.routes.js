// Import the express module
const express = require("express");
// Import the router module
const router = express.Router();

// Import the employee controller
const employeeController = require("../controllers/employee.controller");

// Post request handler to add an employee who comes to this route /add-employee
router.post("/add-employee", employeeController.addEmployee);

module.exports = router;
