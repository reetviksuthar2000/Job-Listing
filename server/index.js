const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("node server created successfully");
});

app.get("/health", async (req, res) => {
  
  const health = {
    uptime: process.uptime(),
    message: 'ok',
    timestamp: Date.now()
  };

  try {
    res.send(health)
  }catch (error) {
    health.error = error;
    res.status(503).send(); 
   
  }

});

app.listen(process.env.PORT, () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() =>
      console.log("server running on port http://localhost:${process.env.PORT}")
    )
    .catch((error) => console.log(error));
});
