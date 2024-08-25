// Import the bcrypt module
const bcrypt = require("bcrypt");
// Import the db connection file
const pool = require("../config/db.config");

// A function to handle the add employee request
const addEmployee = async (employeeAdded) => {
  // console.log("Inside employee service");
  // console.log(employeeAdded);

  // Write a parameterized SQL query to insert a new employee into the table
  const sql = `INSERT INTO employee_test (first_name, last_name, email, password) VALUES (?, ?, ?, ?)`;

  // Destructure the employeeAdded object
  const { first_name, last_name, email, password } = employeeAdded;
  // Execute the query

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(sql, [
      first_name,
      last_name,
      email,
      hashedPassword,
    ]);
    // console.log(result);
    // If the query returns a result, return it . Otherwise, return null
    return result ? result : null;
  } catch (err) {
    // Log the error to the console
    console.error("An error occurred", err);
    return null;
  }
};

module.exports = {
  addEmployee,
};
