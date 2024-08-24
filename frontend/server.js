// Import modules
const express = require("express");
const path = require("path");

// Create the express app
const app = express();

// Use the express.static() middleware to serve static files
app.use(express.static(path.join(__dirname, "dist")));

// Redirect all requests to index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Listen on port 80
app.listen(80);
