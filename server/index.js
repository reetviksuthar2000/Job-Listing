const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Auth = require("./routers/Auth");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/health", async (req, res) => {
  res.status(200).json("success is up and running");
});

app.use("/api/auth", Auth);

app.use((req, res, next)=>{
  const err = new Error("not found");
  err.status = 404
  next(err)
})

app.use((err, req, res, next)=> {
  res.status(err.status || 500)
  res.send({
    error: {
      status: err.status || 404,
      message: err.message
      }
  }
   
  )
})
app.listen(process.env.PORT, () => {
  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() =>
      console.log("server running on port http://localhost:${process.env.PORT}")
    )
    .catch((error) => console.log(error));
});
