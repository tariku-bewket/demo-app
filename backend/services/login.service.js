// Import the bcrypt module
const bcrypt = require("bcrypt");
// Import the db connection file
const pool = require("../config/db.config");

// A function to handle the login request
const logIn = async (employeeData) => {
  // console.log("Inside login service");

  const { email, password } = employeeData;
  // Write a parameterized SQL query to fetch the employee from the database
  const sql = `SELECT * FROM employee_test WHERE email = ?`;

  try {
    // Execute the query
    const rows = await pool.query(sql, [email]);

    if (rows.length > 0) {
      const employee = rows[0];

      // Compare the provided password with the hashed password stored in the database
      const isMatch = await bcrypt.compare(password, employee.password);

      // If the password matches, return the employee details (excluding password)
      if (isMatch) {
        // Exclude the password from the returned object
        const { password, ...employeeWithoutPassword } = employee;
        return employeeWithoutPassword;
      } else {
        return {
          status: "failed",
          message: "Login failed: Incorrect password",
        };
      }
    } else {
      // Return invalid email response
      return {
        status: "failed",
        message: "Login failed: Incorrect email",
      };
    }
  } catch (err) {
    console.error("Error executing the query: ", err);
    throw new Error("Database query failed");
  }
};

module.exports = {
  logIn,
};
