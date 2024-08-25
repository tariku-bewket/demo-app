// Import mysql module
const mysql = require("mysql2/promise");

// Define a connection parameters for the database
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  // port: process.env.DB_PORT || 3306,
  connectionLimit: 10,
};

// Create the connection pool
const pool = mysql.createPool(dbConfig);

// Create an async function to execute queries
async function query(sql, params) {
  let connection;

  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(sql, params);
    return rows;
  } catch (err) {
    console.error("Database query error:", err.message);
    throw err; // Rethrow the error after logging
  } finally {
    if (connection) connection.release(); // Ensure the connection is always released
  }
}

// Export the query method for running queries in other files
module.exports = { query };
