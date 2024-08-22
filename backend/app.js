// Import required modules
require("dotenv").config();

const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const bcrypt = require("bcrypt");

// Create the express app
const app = express();

// Use the express.json() middleware to parse the request body
app.use(express.json());

// Add cors middleware
app.use(cors());

// Define the connection pool parameters for the database
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Test the connection to the database when the server starts
pool
  .getConnection()
  .then((connection) => {
    console.log("Connected to the database successfully!");
    connection.release(); // Release the connection back to the pool
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
    process.exit(1); // Exit the process if unable to connect
  });

// Create a simple get request handler to send a response back
app.get("/", (req, res) => {
  res.status(200).json({ home: "Home" });
});

// POST request handler to add a new employee to the database
app.post("/add-employee", async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  try {
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Write a parameterized SQL query to insert a new employee into the table
    const sql = `INSERT INTO employee_test (first_name, last_name, email, password) VALUES (?, ?, ?, ?)`;

    // Execute the query
    await pool.execute(sql, [first_name, last_name, email, hashedPassword]);

    console.log("1 record inserted successfully");

    res.status(200).json({
      status: "success",
      message: "Employee added successfully",
    });
  } catch (err) {
    console.error("Error executing the query: ", err);
    res.status(500).json({
      status: "error",
      message: "An error occurred while adding the employee!",
    });
  }
});

// Post request handler to login an employee who comes to this route /login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Write a parameterized SQL query to fetch the employee from the database
    const sql = `SELECT * FROM employee_test WHERE email = ?`;

    // Execute the query
    const [rows] = await pool.query(sql, [email]);

    if (rows.length >= 0) {
      const employee = rows[0];

      // Compare the provided password with the hashed password stored in the database
      const isMatch = await bcrypt.compare(password, employee.password);

      if (isMatch) {
        res.status(200).json({
          status: "success",
          message: "Login successful",
        });
      } else {
        res.status(401).json({
          status: "failed",
          message: "Login failed: Incorrect password",
        });
      }
    }
  } catch (err) {
    console.error("Error executing the query: ", err);
    res.status(500).json({
      status: "error",
      message: "An error occurred while logging in",
    });
  }
});

// Set up the port to listen to
const port = 4000;

// Set up the listener
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
