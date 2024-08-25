// Import required modules
require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Create the express app
const app = express();

// Use the express.json() middleware to parse the request body
app.use(express.json());

// Import the routes (index file)
const routes = require("./routes");

// Allow cross-origin resource sharing (CORS) for all routes
app.use(cors());

// Add the routes index file to the middleware chain
app.use("/api", routes);

// Set up the port and listener
const port = process.env.PORT || 3500;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
