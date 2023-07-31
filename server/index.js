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

app.get("/health", (req, res) => {
  res.status(200).send("server is up and running");
});

app.listen(process.env.PORT, () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() =>
      console.log("server running on port http://localhost:${process.env.PORT}")
    )
    .catch((error) => console.log(error));
});
