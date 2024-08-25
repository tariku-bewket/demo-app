// Import the login service
const loginService = require("../services/login.service");
// A function to handle the login request
const logIn = async (req, res, next) => {
  try {
    // Call the login service to check if the employee exists in the database
    const employee = await loginService.logIn(req.body);
    // If login is successful, send a success response
    if (employee) {
      res.status(200).json({
        status: "success",
        message: "Login successful",
      });
    } else {
      // If login failed, send an error response
      res.status(401).json({
        status: "failed",
        message: employee.message,
      });
    }
  } catch (err) {
    // Handle any errors that occur during the login process
    console.error("Error in login controller: ", err);
    res.status(500).json({
      status: "error",
      message: "An internal server error occurred",
    });
  }
};

module.exports = {
  logIn,
};
