// Import the employee service
const employeeService = require("../services/employee.service");

// A function to handle the add employee request
const addEmployee = async (req, res, next) => {
  // Call the employee service to add the employee
  const employeeAdded = await employeeService.addEmployee(req.body);
  // If the employee is added successfully, send a success response
  if (employeeAdded) {
    // Send a success response
    const response = {
      status: "success",
      message: "Employee added successfully",
    };
    res.status(200).json(response);
  } else {
    // send an failure response to the client
    const response = {
      status: "failed",
      message: "Employee could not be added",
    };
    res.status(403).json(response);
  }
};

module.exports = {
  addEmployee,
};
